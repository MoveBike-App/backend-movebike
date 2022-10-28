import express from 'express'
import * as customersUseCases from '../useCases/customers.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'

const router = express.Router()

// GET
router.get('/', auth, access('company'), async (request, response, next) => {
  try {
    const allCustomers = await customersUseCases.getAll()

    response.json({
      success: true,
      message: 'All Customers',
      data: {
        customers: allCustomers
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET
router.get('/:idCustomer', auth, access('company'), async (request, response, next) => {
  try {
    const { idCustomer } = request.params

    const getCostomer = await customersUseCases.getById(idCustomer)

    response.json({
      success: true,
      message: 'Customer',
      data: {
        customer: getCostomer
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST
router.post('/', async (request, response, next) => {
  try {
    const { body: newCustomer } = request

    const customerCreated = await customersUseCases.create(newCustomer)

    response.json({
      success: true,
      message: 'Customer created',
      data: customerCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE
router.delete('/:idCustomer', async (request, response, next) => {
  try {
    const { idCustomer } = request.params

    const customerDeleted = await customersUseCases.deleteById(idCustomer)

    response.json({
      success: true,
      message: 'Customer deleted',
      data: {
        customer: customerDeleted
      }
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:idCustomer', async (request, response, next) => {
  try {
    const { idCustomer } = request.params

    const unUpdateCustomer = request.body

    const customerUpdated = await customersUseCases.update(idCustomer, unUpdateCustomer)

    response.json({
      success: true,
      message: 'Customer updated',
      data: {
        customer: customerUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
