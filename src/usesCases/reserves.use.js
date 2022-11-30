import { Reserve } from '../models/reserves.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (newReserve) {
  return await Reserve.create(newReserve)
}

function getAll () {
  return Reserve.find({})
}

async function getById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) throw new StatusHttp('Reserve not found', 400)
  return Reserve.findById(reserveFound)
}

async function update (idReserve, newData) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) throw new StatusHttp('Reserve not found', 400)
  return Reserve.findByIdAndUpdate(idReserve, newData, { new: true })
}

async function deleteById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) throw new StatusHttp('Reserve not found', 400)
  return Reserve.findByIdAndDelete(idReserve)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
