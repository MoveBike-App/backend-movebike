import { Feature } from '../models/features.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { s3 } from '../libs/s3/index.js'
import config from '../libs/s3/config.js'

async function create (newFeature, file) {
  const { location, key } = file
  const featureCreated = await Feature.create({ ...newFeature, icon: location, keyIcon: key })
  return featureCreated
}

function getAll () {
  return Feature.find({})
}

async function getBySlug (slugFeature) {
  const featureFound = await Feature.findOne(slugFeature)
  if (!featureFound) throw new StatusHttp('Feature not found', 400)
  return Feature.findById(featureFound)
}

async function update (idFeature, newData, newFile) {
  const featureFound = await Feature.findById(idFeature)
  if (!featureFound) throw new StatusHttp('Feature not found', 400)

  if (featureFound.icon) {
    const replaceImg = s3.deleteObject({ Key: featureFound.keyIcon, Bucket: config.AWS_BUCKET_NAME }).promise()
    if (!replaceImg) throw new StatusHttp('Try again', 400)
  }

  if (newFile) {
    const { location, key } = newFile
    newData.icon = location
    newData.keyIcon = key
  }
  console.log(newFile, newData);
  return Feature.findByIdAndUpdate(idFeature, newData, { new: true })
}

async function deleteById (idFeature) {
  const featureFound = await Feature.findById(idFeature)
  if (!featureFound) throw new StatusHttp('Feature not found', 400)

  if (featureFound.icon) {
    const deleteImg = s3.deleteObject({ Key: featureFound.keyIcon, Bucket: config.AWS_BUCKET_NAME }).promise()
    if (!deleteImg) throw new StatusHttp('Try again!', 400)
  }
  return Feature.findByIdAndDelete(idFeature)
}

export {
  create,
  getAll,
  getBySlug,
  update,
  deleteById
}
