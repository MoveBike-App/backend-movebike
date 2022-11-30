import { Costumer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'

async function create (newCostumer) {
  const { email, password } = newCostumer
  const costumerFound = await Costumer.findOne({ email })
  if (costumerFound) throw new StatusHttp('This costumer already exist!', 400)
  const encryptedPassword = await bcrypt.hash(password)
  return await Costumer.create({ ...newCostumer, password: encryptedPassword })
}

function getAll () {
  return Costumer.find({})
}

async function getById (idCostumer) {
  const costumerFound = await Costumer.findById(idCostumer)
  if (!costumerFound) throw new StatusHttp('Costumer not found', 400)
  return Costumer.findById(costumerFound)
}

async function update (idCostumer, newData) {
  const costumerFound = await Costumer.findById(idCostumer)
  if (!costumerFound) throw new StatusHttp('Costumer not found', 400)
  return Costumer.findByIdAndUpdate(idCostumer, newData, { new: true })
}

async function deleteById (idCostumer) {
  const costumerFound = await Costumer.findById(idCostumer)
  if (!costumerFound) throw new StatusHttp('Costumer not found', 400)
  return Costumer.findByIdAndDelete(idCostumer)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
