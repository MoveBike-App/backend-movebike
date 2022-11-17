import { Route } from '../models/routes.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

function getAll () {
  return Route.find({})
}

async function create (newRoute, file) {
  const { location, key } = file
  const routeCreated = await Route.create({ ...newRoute, image: location, keyImage: key })
  return routeCreated
}

async function update (idRoute, unupdatedRoute) {
  const routeFound = await Route.findById(idRoute)
  if (!routeFound) {
    throw new StatusHttp('Route not found!')
  }
  const routeUpdated = Route.findByIdAndUpdate(idRoute, {
    ...unupdatedRoute
  })
  return routeUpdated
}

async function getById (idRoute) {
  const routeFound = await Route.findById(idRoute)

  if (!routeFound) {
    throw new StatusHttp('Route not found', 400)
  }
  return Route.findById(idRoute)
}

async function deleteById (idRoute) {
  const routeFound = await Route.findById(idRoute)
  if (!routeFound) {
    throw new StatusHttp('Route not found')
  }
  return Route.findByIdAndDelete(idRoute)
}

export { getAll, create, update, deleteById, getById }
