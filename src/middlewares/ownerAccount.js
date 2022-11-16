import { StatusHttp } from '../libs/statusHttp.js'
import { Reserve } from '../models/reserves.model.js'

function accessOwnerAccount (request, response, next) { /* puede recibir n cantidad de parametros */
  try {
    const { userCurrent } = request

    const idUser = request.params.id /* se cambia de nombre a rutas idCompany a id */

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}

async function accessOwnerReserve (request, response, next) {
  try {
    const { userCurrent } = request

    const id = request.params.id
    if (!id) throw new StatusHttp('Id not found!')
    const ReserveId = await Reserve.findById(id)
    if (!ReserveId) throw new StatusHttp('Request not found!')
    const idUser = ReserveId.customer._id.valueOf()

    if (userCurrent !== idUser) throw new Error('You can only edit your own Account')

    next()
  } catch (error) {
    response.status(403)
    response.json({
      success: false,
      message: error.message
    })
  }
}

export {
  accessOwnerAccount,
  accessOwnerReserve
}
