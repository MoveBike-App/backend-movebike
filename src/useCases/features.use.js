import { Feature } from '../models/features.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function create (newFeature) {
  const featureCreated = await Feature.create(newFeature)
  return featureCreated
}

function getAll () {
  return Feature.find({})
}

async function getById (idFeature) {
  const featureFound = await Feature.findById(idFeature)
  if (!featureFound) throw new StatusHttp('Feature not found', 400)
  return Feature.findById(featureFound)
}

async function update (idFeature, newData) {
  const featureFound = await Feature.findById(idFeature)
  if (!featureFound) throw new StatusHttp('Feature not found', 400)
  return Feature.findByIdAndUpdate(idFeature, newData, { new: true })
}

async function deleteById (idFeature) {
  const featureFound = await Feature.findById(idFeature)
  if (!featureFound) throw new StatusHttp('Feature not found', 400)
  return Feature.findByIdAndDelete(idFeature)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
