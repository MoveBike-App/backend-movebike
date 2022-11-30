import express from 'express'
import * as reservesUseCases from '../useCases/reserves.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { accessOwnerReserve } from '../middlewares/ownerAccount.js'

const router = express.Router()

// GET
router.get('/', auth, access('company'), async (request, response, next) => {
  try {
    const allReserves = await reservesUseCases.getAll()

    response.json({
      success: true,
      message: 'All reserves',
      data: {
        reserves: allReserves
      }
    })
  } catch (error) {
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

// GET
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
})

// POST
router.post('/', auth, access('customer'), async (request, response, next) => {
  try {
    const reserve = request.body
    const { userCurrent } = request
    const reserveNumber = 'MB-0' + Math.floor(Math.random() * 1000)
    const reserveCreated = await reservesUseCases.create(reserve, userCurrent, reserveNumber)

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
router.delete('/:id', auth, access('customer'), accessOwnerReserve, async (request, response, next) => {
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
router.patch('/:id', auth, access('customer', 'company'), accessOwnerReserve, async (request, response, next) => {
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
