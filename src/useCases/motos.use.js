import { Moto } from '../models/motos.model.js'
import { Company } from '../models/company.model.js'
import { Reserve } from '../models/reserves.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { s3 } from '../libs/s3/index.js'
import config from '../libs/s3/config.js'

async function create (newMoto, userCurrent, file) {
  const { location, key } = file
  const motoCreated = await Moto.create({
    ...newMoto,
    company: userCurrent,
    image: location,
    keyImage: key
  })
  await Company.findByIdAndUpdate(userCurrent, {
    $push: { motos: motoCreated._id }
  })
  return motoCreated
}

function getAll () {
  return Moto.find({})
    .populate({ path: 'company', select: ['name'] })
    .populate({ path: 'features', select: ['name', 'icon', 'keyIcon'] })
}

function getByAvailability () {
  return Reserve.find({
    initialDate: { $gt: new Date('2022-11-01') },
    finalDate: { $lt: new Date('2022-12-03') }
  })
}

/* async function getById (idMoto) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  return Moto.findById(motoFound).populate({ path: 'company', select: ['name'] })
} */

/* async function getBySlug (slugMoto) {
  const motoFound = await Moto.findOne(slugMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  return Moto.findById(motoFound).populate({ path: 'company', select: ['name'] }).populate({ path: 'features', select: ['name', 'icon', 'keyIcon'] })
} */

async function getByType (moto, type) {
  const BY_ID = 'BY_ID'
  const BY_SLUG = 'BY_SLUG'
  let motoFound
  if (type === BY_ID) {
    motoFound = await Moto.findById(moto)
      .populate({ path: 'company', select: ['name'] })
      .populate({ path: 'features', select: ['name', 'icon', 'keyIcon'] })
  } else if (type === BY_SLUG) {
    motoFound = await Moto.findOne({ slug: moto })
      .populate({ path: 'company', select: ['name'] })
      .populate({ path: 'features', select: ['name', 'icon', 'keyIcon'] })
  } else {
    throw new StatusHttp('Search not supported', 400)
  }

  if (!motoFound) throw new StatusHttp('Moto not found', 400)

  return motoFound
}

async function update (idMoto, newData, newFile) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)

  if (motoFound.image) {
    const replaceImg = s3
      .deleteObject({ Key: motoFound.keyImage, Bucket: config.AWS_BUCKET_NAME })
      .promise()
    if (!replaceImg) throw new StatusHttp('Try again', 400)
  }

  if (newFile) {
    const { location, key } = newFile
    newData.image = location
    newData.keyImage = key
  }

  return Moto.findByIdAndUpdate(idMoto, newData, { new: true })
}

async function deleteById (idMoto) {
  const motoFound = await Moto.findById(idMoto)
  if (!motoFound) throw new StatusHttp('Moto not found', 400)
  if (motoFound.image) {
    const deleteImg = s3
      .deleteObject({ Key: motoFound.keyImage, Bucket: config.AWS_BUCKET_NAME })
      .promise()
    if (!deleteImg) throw new StatusHttp('Try again!', 400)
  }
  return Moto.findByIdAndDelete(idMoto)
}

export { create, getAll, getByAvailability, getByType, update, deleteById }
