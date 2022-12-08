import { Reserve } from '../models/reserves.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { Moto } from '../models/motos.model.js'
import { sendReserveEmail, sendReserveToCompany } from '../libs/sendgrid.js'
import { format } from 'date-fns'

async function create (newReserve, userCurrent) {
  const userFound = await Customer.findById(userCurrent)

  if (!userFound) {
    throw new StatusHttp('User not found', 404)
  }
  const countReserves = await Reserve.estimatedDocumentCount() + 1
  const reserveNo = `MB-00${countReserves}`
  const reserveCreated = await (await Reserve.create({ ...newReserve, customer: userCurrent, reserveNumber: reserveNo })).populate('vehicle')
  await Customer.findByIdAndUpdate(userCurrent,
    { $push: { reserve: reserveCreated._id } })
  await sendReserveEmail(userFound.email, reserveCreated.vehicle.name, format(new Date(reserveCreated.initialDate), 'dd/MM/yyyy H:mm b'), format(new Date(reserveCreated.finalDate), 'dd/MM/yyyy H:mm b'), reserveCreated.totalPrice)
  await sendReserveToCompany(reserveCreated.reserveNumber, reserveCreated.vehicle, reserveCreated.totalPrice, userFound.name, userFound.phone, userFound.location, userFound.identify)
  return reserveCreated
}

function getAll () {
  return Reserve.find({}).populate({ path: 'customer', select: ['name', 'email', 'phone', 'identify', 'keyIdentify', 'slug', 'location'] }).populate({ path: 'vehicle', select: ['name', 'slug', 'image', 'keyImage', 'price'] })
}

async function getByAvailability (initialDate, finalDate) {
  const notAvailableDates = await Reserve.find({
    initialDate: { $gte: new Date(initialDate) },
    finalDate: { $lte: new Date(finalDate) }
  })

  const notAvailableVehicles = notAvailableDates.map((r) => r.vehicle._id.valueOf())

  const availableVehicles = await Moto.find({ _id: { $nin: notAvailableVehicles } })
  return availableVehicles
}

async function getById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) {
    throw new StatusHttp('Reserve not found', 400)
  }
  return Reserve.findById(reserveFound).populate({ path: 'customer', select: ['name', 'email', 'phone', 'identify', 'keyIdentify', 'slug', 'location'] }).populate({ path: 'vehicle', select: ['name', 'slug', 'image', 'keyImage', 'price'] })
}

async function update (idReserve, newData) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) {
    throw new StatusHttp('Reserve not found', 400)
  }
  return Reserve.findByIdAndUpdate(idReserve, newData, { new: true })
}

async function deleteById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) {
    throw new StatusHttp('Reserve not found', 400)
  }
  return Reserve.findByIdAndDelete(idReserve)
}

export {
  create,
  getAll,
  getByAvailability,
  getById,
  update,
  deleteById
}
