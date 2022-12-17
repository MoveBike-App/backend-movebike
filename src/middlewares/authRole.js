/* middleware que validará el rol
1ero validar que haya iniciado sesión(auth mw) y despues validar el rol que tenga */

function access (...validRoles) { /* puede recibir n cantidad de parametros */
  return (request, response, next) => {
    try {
      if (!validRoles.includes(request.roleCurrent)) throw new Error('not acces')

      next()
    } catch (error) {
      response.json({
        success: false,
        message: error.message
      })
    }
  }
}

export { access }
