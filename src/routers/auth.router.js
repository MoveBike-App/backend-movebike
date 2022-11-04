import express from 'express'
import * as authUseCases from '../useCases/auth.use.js'

const router = express.Router()

router.post('/login', async (request, response, next) => {
  try {
    const { email, password } = request.body
    const token = await authUseCases.login(email, password)
    console.log(token)
    response.json({
      message: 'successful login',
      succes: true,
      token
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

/* router.post('/validEmail', async(request, response, next) {
  try{
    const { id } = request.newUser
    const valid = await authUseCases.validEmail(id)
    response.json({
      succes:true,
      data: {
        message : valid
      }
    })
  } catch(error) {
    console.log(error)
    next(error)
  }
})
 */
export default router
