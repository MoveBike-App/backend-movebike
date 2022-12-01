import { Reserve } from '../models/reserves.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { sendReserveEmail, sendReserveToCompany } from '../libs/sendgrid.js'

async function create (newReserve, userCurrent) {
  const userFound = await Customer.findById(userCurrent)

  if (!userFound) {
    throw new StatusHttp('User not found', 404)
  }
  const countReserves = await Reserve.estimatedDocumentCount() + 1
  const reserveNo = `MB-00${countReserves}`
  console.log(reserveNo)
  const reserveCreated = await Reserve.create({ ...newReserve, customer: userCurrent, reserveNumber: reserveNo })

  await sendReserveEmail(userFound.email, reserveCreated.vehicle, reserveCreated.totalPrice)

  await Customer.findByIdAndUpdate(userCurrent,
    { $push: { reserve: reserveCreated._id } })

  await sendReserveToCompany(reserveCreated.reserveNumber, reserveCreated.vehicle, reserveCreated.totalPrice, userFound.name, userFound.phone, userFound.location, userFound.identify)
  return reserveCreated
}

function getAll () {
  return Reserve.find({}).populate('customer')
}

async function getById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) {
    throw new StatusHttp('Reserve not found', 400)
  }
  return Reserve.findById(reserveFound).populate({ path: 'customer', select: ['name', 'email', 'phone', 'identify', 'slug'] }).populate({ path: 'vehicle', select: ['name', 'slug', 'image', 'price'] })
}

/* async function getBySlug (slugReserve) {
  const reserveFound = await Reserve.findOne(slugReserve)
  if (!reserveFound) {
    throw new StatusHttp('Reserve not found', 400)
  }
  return Reserve.findById(reserveFound).populate('customer')
} */

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
  getById,
  /* getBySlug, */
  update,
  deleteById
}
