import express from 'express'
import * as authUseCases from '../useCases/auth.use.js'

const router = express.Router()

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body
    const userCurrent = await authUseCases.login(email, password)
    response.json({
      message: 'successful login',
      success: true,
      userCurrent
    })
  } catch (error) {
    next(error)
  }
})

/* router.post('/validEmail', async(request, response, next) {
  try{
    const { id } = request.newUser
    const valid = await authUseCases.validEmail(id)
    response.json({
      success:true,
      data: {
        message : valid
      }
    })
  } catch(error) {
    next(error)
  }
})
 */
export default router
