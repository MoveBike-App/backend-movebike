import express from 'express'
import * as routesUseCases from '../useCases/routes.use.js'
import { auth } from '../middlewares/auth.js'
import { access } from '../middlewares/authRole.js'
import { upload } from '../middlewares/multer.js'

const router = express.Router()

// GET /Routes
router.get('/', async (request, response, next) => {
  try {
    const allRoutes = await routesUseCases.getAll()

    response.json({
      success: true,
      message: 'All routes',
      data: {
        routes: allRoutes
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
    const getRoute = await routesUseCases.getById(id)

    response.json({
      success: true,
      message: 'Route',
      data: {
        reserves: getRoute
      }
    })
  } catch (error) {
    next(error)
  }
})

/* // GET /Routes by Id
router.get('/:slug', async (request, response, next) => {
  try {
    const { slug } = request.params
    const getRoute = await routesUseCases.getBySlug({ slug })
    response.json({
      success: true,
      message: 'Ruote found',
      data: {
        post: getRoute
      }
    })
  } catch (error) {
    next(error)
  }
})
 */
// POST /Routes
router.post('/', auth, access('company'), upload.single('image'), async (request, response, next) => {
  try {
    const { body, file } = request
    const newRoute = await routesUseCases.create(body, file)

    response.json({
      success: true,
      message: 'Route published',
      data: newRoute
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /Routes
router.delete('/:id', auth, access('company'), async (request, response, next) => {
  try {
    const { id } = request.params
    const routeDeleted = await routesUseCases.deleteById(id)
    response.json({
      success: true,
      message: 'Route deleted'
    })
  } catch (error) {
    next(error)
  }
})

// EDIT /Routes
router.patch('/:id', auth, access('company'), upload.single('image'), async (request, response, next) => {
  try {
    const { id } = request.params
    const { body, file } = request
    const routeUpdated = await routesUseCases.update(id, body, file)

    response.json({
      success: true,
      message: 'Route updated',
      data: {
        route: routeUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})
export default router
