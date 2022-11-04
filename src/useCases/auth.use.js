import { Company } from '../models/company.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'

async function login (email, password) { /* la company podrá ingresar con su email a la cuenta de usuario? */
  const emailFound = await Company.findOne({ email }) || await Customer.findOne({ email })
  if (!emailFound) throw new StatusHttp('invalid!')
  const isValidPassword = await bcrypt.compare(password, emailFound.password)
  console.log(isValidPassword)
  if (!isValidPassword) throw new StatusHttp('try again!')
  return (jwt.sign({ id: emailFound._id, role: emailFound.role }))
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
