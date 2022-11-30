import express from 'express'
import * as costumersUsesCases from '../usesCases/costumers.use.js'
import { auth } from '../middlewares/auth.js'
import next from 'next'

const router = express.Router()

// GET /costumers
router.get('/', async (request, response, next) => {
  try {
    const allCostumers = await costumersUsesCases.getAll()

    response.json({
      success: true,
      message: 'All Costumers',
      data: {
        costumers: allCostumers
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET /idCostumers
router.get('/:idCostumer', async (request, response, nect) => {
  try {
    const { idCostumer } = request.params

    const getCostomer = await costumersUsesCases.getById(idCostumer)

    response.json({
      success: true,
      message: 'Costumer',
      data: {
        costumer: getCostomer
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST /costumers
router.post('/', async (request, response, next) => {
  try {
    const { body: newCustomer } = request

    const costumerCreated = await costumersUsesCases.create(newCustomer)

    response.json({
      success: true,
      message: 'Costumer created',
      data: costumerCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /idCostumer
router.delete('/:idCostumer', async (request, response, next) => {
  try {
    const { idCostumer } = request.params

    const costumerDeleted = await costumersUsesCases.deleteById(idCostumer)

    response.json({
      success: true,
      message: 'Costumer deleted',
      data: {
        costumer: costumerDeleted
      }
    })
  } catch (error) {
    next(error)
  }
})

// PATCH /idCotumer
router.patch('/:idCostumer', async (request, response, next) => {
  try {
    const { idCostumer } = request.params

    const unUpdateCostumer = request.body

    const costumerUpdated = await costumersUsesCases.update(idCostumer, unUpdateCostumer)

    response.json({
      success: true,
      message: 'Costumer updated',
      data: {
        costumer: costumerUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
