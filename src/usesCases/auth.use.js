import { Company } from '../models/company.model.js'
import { Costumer } from '../models/costumerss.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'

async function loginCompany (email, password) {
  const companyFound = await Company.findOne({ email })
  if (!companyFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, companyFound.password)
  if (!isValidPassword) throw new StatusHttp('try again!')
  return jwt.sign({ id: companyFound._id })
}

async function loginCostumer (email, password) {
  const costumerFound = await Costumer.findOne({ email })
  if (!costumerFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, costumerFound.password)
  if (!isValidPassword) throw new StatusHttp('try again!')
  return jwt.sign({ id: costumerFound._id })
}

export {
  loginCompany,
  loginCostumer
}
