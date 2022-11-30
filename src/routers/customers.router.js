import express from 'express'
import * as customersUseCases from '../useCases/customers.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { accessOwnerAccount } from '../middlewares/ownerAccount.js'
import { upload } from '../middlewares/multer.js'

const router = express.Router()

// GET
router.get('/', auth, access('company', 'customer'), async (request, response, next) => {
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
    next(error)
  }
})

// GET
router.get('/:id', auth, access('company', 'customer'), async (request, response, next) => {
  try {
    const { id } = request.params

    const getCustomer = await customersUseCases.getById(id)
    response.json({
      success: true,
      message: 'Customer',
      data: {
        customer: getCustomer
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

    const getCustomer = await customersUseCases.getBySlug({ slug })
    response.json({
      success: true,
      message: 'Customer',
      data: {
        customer: getCustomer
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST
router.post('/', upload.any(), async (request, response, next) => {
  try {
    const { body, files } = request
    const companyId = '638523f3893c75ca3e49dfb9'

    const customerCreated = await customersUseCases.create(body, companyId, files)

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
router.delete('/:id', auth, access('customer'), async (request, response, next) => {
  try {
    const { id } = request.params

    const customerDeleted = await customersUseCases.deleteById(id)

    response.json({
      success: true,
      message: 'Customer deleted'
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:id', auth, access('customer'), upload.any(), async (request, response, next) => {
  try {
    const { id } = request.params
    const { body, files } = request

    const customerUpdated = await customersUseCases.update(id, body, files)
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
