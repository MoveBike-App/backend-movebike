import express from 'express'
import * as featuresUseCases from '../useCases/features.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { upload } from '../middlewares/multer.js'

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
router.post('/', auth, access('company'), upload.single('icon'), async (request, response, next) => {
  try {
    const { body, file } = request
    const featureCreated = await featuresUseCases.create(body, file)
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
router.patch('/:id', auth, access('company'), upload.single('icon'), async (request, response, next) => {
  try {
    const { id } = request.params
    const { body, file } = request
    const featureUpdated = await featuresUseCases.update(id, body, file)
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
