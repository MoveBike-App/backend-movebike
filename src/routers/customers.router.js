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
router.get('/:idCustomer', auth, access('company', 'customer'), async (request, response, next) => {
  try {
    const { idCustomer } = request.params

    const getCustomer = await customersUseCases.getById(idCustomer)
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
    const companyId = '636d504cf0e929aea4e753a2'

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
router.delete('/:id', auth, access('customer'), accessOwnerAccount, async (request, response, next) => {
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
router.patch('/:id', auth, access('customer'), accessOwnerAccount, async (request, response, next) => {
  try {
    const { id } = request.params

    const unUpdateCustomer = request.body

    const customerUpdated = await customersUseCases.update(id, unUpdateCustomer)

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
