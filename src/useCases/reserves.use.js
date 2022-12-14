import { Reserve } from '../models/reserves.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { Moto } from '../models/motos.model.js'
import { sendReserveEmail, sendReserveToCompany } from '../libs/sendgrid.js'
import { format, eachDayOfInterval } from 'date-fns'

async function create (newReserve, userCurrent) {
  const userFound = await Customer.findById(userCurrent)

  if (!userFound) {
    throw new StatusHttp('User not found', 404)
  }
  const countReserves = (await Reserve.estimatedDocumentCount()) + 1
  const reserveNo = `MB-00${countReserves}`
  const reserveCreated = await (
    await Reserve.create({
      ...newReserve,
      customer: userCurrent,
      reserveNumber: reserveNo
    })
  ).populate('vehicle')

  const allReservationDates = eachDayOfInterval({
    start: reserveCreated.initialDate,
    end: reserveCreated.finalDate
  })

  await Customer.findByIdAndUpdate(userCurrent, {
    $push: { reserve: reserveCreated._id }
  })

  await sendReserveEmail(
    userFound.email,
    reserveCreated.vehicle.name,
    format(new Date(reserveCreated.initialDate), 'dd-MMM-yyyy H:mm'),
    format(new Date(reserveCreated.finalDate), 'dd-MMM-yyyy H:mm'),
    reserveCreated.totalPrice
  )
  await sendReserveToCompany(
    reserveCreated.reserveNumber,
    reserveCreated.vehicle.name,
    format(new Date(reserveCreated.initialDate), 'dd-MMM-yyyy H:mm'),
    format(new Date(reserveCreated.finalDate), 'dd-MMM-yyyy H:mm'),
    userFound.name,
    userFound.email,
    reserveCreated.totalPrice
  )

  await Reserve.findByIdAndUpdate(reserveCreated._id, {
    $push: { allDates: allReservationDates }
  })

  await Moto.findByIdAndUpdate(reserveCreated.vehicle, {
    $push: { notAvailableDates: allReservationDates }
  })
  return reserveCreated
}

function getAll () {
  return Reserve.find({})
    .populate({
      path: 'customer',
      select: [
        'name',
        'email',
        'phone',
        'identify',
        'keyIdentify',
        'slug',
        'location'
      ]
    })
    .populate({
      path: 'vehicle',
      select: ['name', 'slug', 'image', 'keyImage', 'price']
    })
}

async function getByFilter (initialDate, finalDate, size, operation) {
  const matchOptions = {}
  if (initialDate) {
    matchOptions.createdAt = {
      $gte: new Date(initialDate)
    }
  }
  if (finalDate) {
    matchOptions.createdAt = {
      $lte: new Date(finalDate + 'T23:59:59.999Z')
    }
  }
  let groupField = '$vehicle'
  if (operation && operation === 'total') {
    groupField = null
  }
  const aggregateOptions = [
    {
      $match: matchOptions
    },
    {
      $group: { _id: groupField, count: { $sum: 1 }, totalAmountPrice: { $sum: '$totalPrice' } }
    },
    {
      $sort: { count: -1 } // orden descendente
    }
  ]
  if (size) {
    aggregateOptions.push({
      $limit: size
    })
  }

  let allReserves = await Reserve.aggregate(aggregateOptions)

  if (!operation || operation !== 'total') {
    allReserves = allReserves.map(async (r) => {
      r.vehicle = await Moto.findById(r._id.valueOf())
      return r
    })

    const reserves = Promise.all(allReserves)
    return reserves
  }
  return allReserves
}

async function getByAvailability (initialDate, finalDate) {
  const notAvailableDates = await Reserve.find({
    initialDate: { $gte: new Date(initialDate) },
    finalDate: { $lte: new Date(finalDate) }
  })

  const notAvailableVehicles = notAvailableDates.map((r) =>
    r.vehicle._id.valueOf()
  )

  const availableVehicles = await Moto.find({
    _id: { $nin: notAvailableVehicles }
  })
  return availableVehicles
}

async function getById (idReserve) {
  const reserveFound = await Reserve.findById(idReserve)
  if (!reserveFound) {
    throw new StatusHttp('Reserve not found', 400)
  }
  return Reserve.findById(reserveFound)
    .populate({
      path: 'customer',
      select: [
        'name',
        'email',
        'phone',
        'identify',
        'keyIdentify',
        'slug',
        'location'
      ]
    })
    .populate({
      path: 'vehicle',
      select: ['name', 'slug', 'image', 'keyImage', 'price']
    })
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
  deleteById,
  getByFilter
}
