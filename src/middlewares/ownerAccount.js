
function accessOwnerAccount (request, response, next) { /* puede recibir n cantidad de parametros */
  try {
    const { userCurrent } = request

    const idUser = request.params.id /* se cambia de nombre a rutas idCompany a id */
    console.log('id del usuario logeado', userCurrent)
    console.log('id del usuario a editar ', idUser)

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    console.log(error)
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}

export { accessOwnerAccount }
