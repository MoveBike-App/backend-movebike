import express from 'express'
import * as motosUseCases from '../useCases/motos.use.js'
import jwtDecode from 'jwt-decode'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { upload } from '../middlewares/multer.js'

const router = express.Router()

// GET
router.get('/', async (request, response, next) => {
  try {
    const allMotos = await motosUseCases.getAll()

    response.json({
      success: true,
      message: 'All motos',
      data: {
        motos: allMotos
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET
router.get('/:idMoto', async (request, response, next) => {
  try {
    const { idMoto } = request.params

    const getMoto = await motosUseCases.getById(idMoto)

    response.json({
      success: true,
      message: 'Moto',
      data: {
        moto: getMoto
      }
    })
  } catch (error) {
    next(error)
  }
})

// CREATE
router.post('/', auth, access('company'), async (request, response, next) => {
  try {
    const token = request.headers.authorization
    const moto = request.body
    const { id } = jwtDecode(token)
    const motoCreated = await motosUseCases.create(moto, id)
    response.json({
      success: true,
      message: 'New moto created',
      data: {
        motos: motoCreated
      }
    })
  } catch (error) {
    next(error)
  }
})

// DELETE
router.delete('/:id', auth, access('company'), async (request, response, next) => {
  try {
    const { id } = request.params

    const motoDeleted = await motosUseCases.deleteById(id)

    response.json({
      success: true,
      message: 'Moto deleted'
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:id', auth, access('company'), async (request, response, next) => {
  try {
    const { id } = request.params
    const unUpdateMoto = request.body

    const motoUpdated = await motosUseCases.update(id, unUpdateMoto)
    response.json({
      success: true,
      message: 'Moto updated',
      data: {
        moto: motoUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
