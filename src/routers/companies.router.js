import express from 'express'
import * as companyUseCases from '../useCases/companies.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { accessOwnerAccount } from '../middlewares/ownerAccount.js'

const router = express.Router()

// GET
router.get('/', auth, access('company', 'customer'), async (request, response, next) => {
  try {
    const allCompanies = await companyUseCases.getAll()

    response.json({
      success: true,
      message: 'All companies',
      data: {
        companies: allCompanies
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET
router.get('/:slug', auth, access('company'), async (request, response, next) => {
  try {
    const { slug } = request.params

    const getCompany = await companyUseCases.getBySlug({ slug })

    response.json({
      success: true,
      message: 'Company',
      data: {
        company: getCompany
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST
router.post('/', async (request, response, next) => {
  try {
    const { body: newCompany } = request
    const companyCreated = await companyUseCases.create(newCompany)

    response.json({
      success: true,
      message: 'Company created',
      data: companyCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE
router.delete('/:id', auth, access('company'), accessOwnerAccount, async (request, response, next) => {
  try {
    const { id } = request.params

    const companyDeleted = await companyUseCases.deleteById(id)

    response.json({
      success: true,
      message: 'Company deleted'
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:id', auth, access('company'), accessOwnerAccount, async (request, response, next) => {
  try {
    const { id } = request.params
    const unUpdateCompany = request.body

    const companyUpdated = await companyUseCases.update(id, unUpdateCompany)

    response.json({
      success: true,
      message: 'Company updated',
      data: {
        company: companyUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})

export default router
