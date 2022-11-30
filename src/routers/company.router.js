import express from 'express'
import * as companyUsesCases from '../usesCases/company.use.js'

const router = express.Router()

// GET /companies
router.get('/', async (request, response, next) => {
  try {
    const allCompanies = await companyUsesCases.getAll()

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

// GET /idMoto
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params

    const getCompany = await companyUsesCases.getById(id)

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

// POST /companies
router.post('/', async (request, response, next) => {
  try {
    const { body: newCompany } = request
    const companyCreated = await companyUsesCases.create(newCompany)

    response.json({
      success: true,
      message: 'Company created',
      data: companyCreated
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /idCompany
router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params

    const companyDeleted = await companyUsesCases.deleteById(id)

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

// PATCH /idCompany
router.patch('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const unUpdateCompany = request.body

    const companyUpdated = await companyUsesCases.update(
      id,
      unUpdateCompany
    )

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
