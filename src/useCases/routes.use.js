import { Route } from '../models/routes.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { s3 } from '../libs/s3/index.js'
import config from '../libs/s3/config.js'

function getAll () {
  return Route.find({})
}

async function create (newRoute, file) {
  const { location, key } = file
  const routeCreated = await Route.create({ ...newRoute, image: location, keyImage: key })
  return routeCreated
}

async function update (idRoute, newData, newFile) {
  const routeFound = await Route.findById(idRoute)
  if (!routeFound) throw new StatusHttp('Route not found', 400)

  if (routeFound.image) {
    const replaceImg = s3.deleteObject({ Key: routeFound.keyImage, Bucket: config.AWS_BUCKET_NAME }).promise()
    if (!replaceImg) throw new StatusHttp('File not found', 400)
  }

  if (newFile) {
    const { location, key } = newFile
    newData.image = location
    newData.keyImage = key
  }

  return Route.findByIdAndUpdate(idRoute, newData, { new: true })
}

async function getByType (route, type) {
  const BY_ID = 'BY_ID'
  const BY_SLUG = 'BY_SLUG'
  let routeFound
  if (type === BY_ID) {
    routeFound = await Route.findById(route)
  } else if (type === BY_SLUG) {
    routeFound = await Route.findOne({ slug: route })
  } else {
    throw new StatusHttp('Search not supported', 400)
  }

  if (!routeFound) throw new StatusHttp('Route not found', 400)

  return routeFound
}

async function deleteById (idRoute) {
  const routeFound = await Route.findById(idRoute)
  if (!routeFound) throw new StatusHttp('Route not found', 400)
  if (routeFound.image) {
    const deleteImg = s3.deleteObject({ Key: routeFound.keyImage, Bucket: config.AWS_BUCKET_NAME }).promise()
    if (!deleteImg) throw new StatusHttp('Try again!', 400)
  }
  return Route.findByIdAndDelete(idRoute)
}

export { getAll, create, update, deleteById, getByType }
