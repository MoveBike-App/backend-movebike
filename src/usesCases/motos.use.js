import { Moto } from '../models/motos.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (newMoto) {
  return await Moto.create(newMoto)
}

function getAll () {
  return Moto.find({})
}

async function getById (idMoto) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  return Moto.findById(motoFound)
}

async function update (idMoto, newData) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  return Moto.findByIdAndUpdate(idMoto, newData, { new: true })
}

async function deleteById (idMoto) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  return Moto.findByIdAndDelete(idMoto)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
