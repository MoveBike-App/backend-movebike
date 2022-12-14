import { Reaction } from '../models/reactions.model.js'
import { Route } from '../models/routes.model.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function addReaction (routeId, userCurrent) {
  const routeFound = await Route.findById(routeId).populate('reactions')
  if (routeFound === undefined) {
    throw new StatusHttp('Route not found!', 400)
  }
  const reactionFound = routeFound.reactions.find(reaction => reaction.author.valueOf() === userCurrent)

  if (reactionFound) {
    throw new StatusHttp('You already like this route!', 400)
  }
  const reactionCreated = await Reaction.create({ ...routeId, author: userCurrent })
  await Route.findByIdAndUpdate(routeId, {
    $push: { reactions: reactionCreated._id }
  })
  return reactionCreated
}

async function getAll () {
  return Reaction.find({}).populate({ path: 'customer', select: ['name'] })
}

async function getById (idReaction) {
  const reactionFound = await Reaction.findById(idReaction)
  if (!reactionFound) {
    throw new StatusHttp('Route not found', 400)
  }
  return Reaction.findById(idReaction).populate({ path: 'customer', select: ['name'] })
}

async function deleteById (idReaction, userCurrent) {
  const reactionFound = await Reaction.findById(idReaction)
  if (!reactionFound) {
    throw new StatusHttp('Reaction not found', 400)
  }
  if (reactionFound.author.valueOf() !== userCurrent) {
    throw new StatusHttp('You cannot delete another reaction', 400)
  }
  return Reaction.findByIdAndDelete(idReaction)
}

export {
  getAll,
  getById,
  addReaction,
  deleteById
}
