import express from 'express'
import * as reservesUseCases from '../useCases/reserves.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { accessOwnerReserve } from '../middlewares/ownerAccount.js'

const router = express.Router()

/* // GET
router.get('/', async (request, response, next) => {
  try {
    const allReserves = await reservesUseCases.getAll()

    response.json({
      success: true,
      message: 'All motos',
      data: {
        motos: allReserves
      }
    })
  } catch (error) {
    next(error)
  }
})
*/

// GET
router.get('/', auth, access('company'), async (request, response, next) => {
  try {
    const { initialDate, finalDate } = request.query
    console.log('REQUEST', request.query)
    /*   const initialDate = '2022-12-01'
    const finalDate = '2022-12-11' */
    const availableVehiclesByDate = await reservesUseCases.getByAvailability(initialDate, finalDate)
    response.json({
      success: true,
      message: 'Available vehicles by dates',
      data: {
        reserves: availableVehiclesByDate
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET
router.get('/:id', auth, access('company', 'customer'), async (request, response, next) => {
  try {
    const { id } = request.params
    const getReserve = await reservesUseCases.getById(id)

    response.json({
      success: true,
      message: 'Reserve',
      data: {
        reserves: getReserve
      }
    })
  } catch (error) {
    next(error)
  }
})

/* // GET
router.get('/:slug', auth, access('company', 'customer'), async (request, response, next) => {
  try {
    const { slug } = request.params
    const getReserve = await reservesUseCases.getBySlug({ slug })

    response.json({
      success: true,
      message: 'Reserve',
      data: {
        reserves: getReserve
      }
    })
  } catch (error) {
    next(error)
  }
}) */

// POST
router.post('/', auth, access('customer'), async (request, response, next) => {
  try {
    const reserve = request.body
    const { userCurrent } = request
    const reserveCreated = await reservesUseCases.create(reserve, userCurrent)

    response.json({
      success: true,
      message: 'Reserve completed',
      data: reserveCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE
router.delete('/:id', auth, async (request, response, next) => {
  try {
    const { id } = request.params
    const reserveDeleted = await reservesUseCases.deleteById(id)

    response.json({
      success: true,
      message: 'Reserve deleted'
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:id', auth, access('customer', 'company'), async (request, response, next) => {
  try {
    const { id } = request.params
    const unUpdateReserve = request.body
    const reserveUpdated = await reservesUseCases.update(id, unUpdateReserve)

    response.json({
      success: true,
      message: 'Reserve updated',
      data: {
        reserve: reserveUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
