import express from 'express'
import * as companyUseCases from '../useCases/companies.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'

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
router.get('/:idCompany', auth, access('company'), async (request, response, next) => {
  try {
    const { idCompany } = request.params

    const getCompany = await companyUseCases.getById(idCompany)

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
    console.log(error)
    next(error)
  }
})

// DELETE
router.delete('/:idCompany', auth, access('company'), async (request, response, next) => {
  try {
    const { idCompany } = request.params

    const companyDeleted = await companyUseCases.deleteById(idCompany)

    response.json({
      success: true,
      message: 'Company deleted',
      data: {
        company: companyDeleted
      }
    })
  } catch (error) {
    next(error)
  }
})

// PATCH
router.patch('/:idCompany', auth, access('company'), async (request, response, next) => {
  try {
    const { idCompany } = request.params
    const unUpdateCompany = request.body

    const companyUpdated = await companyUseCases.update(idCompany, unUpdateCompany)

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
