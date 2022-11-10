import { Company } from '../models/company.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'

async function login (email, password) { /* la company podrá ingresar con su email a la cuenta de usuario? */
  const emailFound = await Company.findOne({ email }) || await Customer.findOne({ email })
  if (!emailFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, emailFound.password)
  if (!isValidPassword) throw new StatusHttp('try again!')
  console.log({
    token: jwt.sign({ id: emailFound._id }),
    role: emailFound.role,
    id: emailFound._id,
    name: emailFound.name
  })
  return {
    token: jwt.sign({ id: emailFound._id }),
    role: emailFound.role,
    id: emailFound._id,
    name: emailFound.name
  }
}

/* async function validEmail (idUser) {
  const custumerId = await Customer.findById(idUser)

  if (custumerId) {
    await Customer.findByIdAndUpdate(idUser, { validEmail: true })
  }
} */

export {
  login
}
