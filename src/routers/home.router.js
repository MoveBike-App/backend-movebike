import express from 'express'

const router = express.Router()

// GET
router.get('/', async (request, response, next) => {
  try {
    response.json({
      message: 'MOVEBIKE API 🛵'
    })
  } catch (error) {
    next(error)
  }
})

export default router
