
import jwt from '../libs/jwt.js'

function auth (request, response, next) {
  try {
    const { authorization: token } = request.headers
    console.log(request)
    const tokenDecoded = jwt.verify(token)
    if (!tokenDecoded) throw new Error('No autorizado D:')
    request.userCurrent = tokenDecoded.id
    request.roleCurrent = tokenDecoded.role

    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'No autorizado',
      error: error.message
    })
  }
}

export { auth }
/* valida si ya tiene una credencial (login) */
