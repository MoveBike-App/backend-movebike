import { Moto } from '../models/motos.model.js'
import { Company } from '../models/company.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (newMoto, userCurrent) {
  console.log({ ...newMoto, company: userCurrent })
  const motoCreated = await Moto.create({ ...newMoto, company: userCurrent })
  console.log(newMoto, userCurrent)
  await Company.findByIdAndUpdate(userCurrent,
    { $push: { motos: motoCreated._id } })

  return motoCreated
}
function getAll () {
  return Moto.find({}).populate({ path: 'company', select: ['name'] })
}

async function getById (idMoto) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  return Moto.findById(motoFound).populate({ path: 'company', select: ['name'] })
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
