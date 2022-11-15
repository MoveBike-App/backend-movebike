import express from 'express'
import * as featuresUseCases from '../useCases/features.use.js'
import jwtDecode from 'jwt-decode'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'

const router = express.Router()

// GET
router.get('/', async (request, response, next) => {
  try {
    const allFeatures = await featuresUseCases.getAll()

    response.json({
      success: true,
      message: 'All features',
      data: {
        features: allFeatures
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET
router.get('/:idFeature', async (request, response, next) => {
  try {
    const { idFeature } = request.params

    const getFeature = await featuresUseCases.getById(idFeature)

    response.json({
      success: true,
      message: 'Feature',
      data: {
        feature: getFeature
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
    const feature = request.body
    const { id } = jwtDecode(token)
    const featureCreated = await featuresUseCases.create(feature, id)
    response.json({
      success: true,
      message: 'New feature created',
      data: {
        features: featureCreated
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

    const featureDeleted = await featuresUseCases.deleteById(id)

    response.json({
      success: true,
      message: 'Feature deleted'
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:id', auth, access('company'), async (request, response, next) => {
  try {
    const { id } = request.params
    const unUpdateFeature = request.body

    const featureUpdated = await featuresUseCases.update(id, unUpdateFeature)
    response.json({
      success: true,
      message: 'Feature updated',
      data: {
        feature: featureUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
