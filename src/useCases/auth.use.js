import { Company } from '../models/company.model.js'
import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'

async function login (email, password) {
  const emailFound = await Company.findOne({ email }) || await Customer.findOne({ email })
  if (!emailFound) throw new StatusHttp('User not found')

  const validEmail = emailFound.validEmail
  if (!validEmail) throw new StatusHttp('Verify your account')

  const isValidPassword = await bcrypt.compare(password, emailFound.password)
  if (!isValidPassword) throw new StatusHttp('Invalid credentials', 500)

  return {
    token: jwt.sign({ id: emailFound._id, role: emailFound.role, slug: emailFound.slug }),
    userCurrent: {
      role: emailFound.role,
      id: emailFound._id,
      name: emailFound.name,
      slug: emailFound.slug,
      validEmail: emailFound.validEmail
    }
  }
}

async function validEmail (idCustomer) {
  const custumerId = await Customer.findById(idCustomer)

  if (custumerId) {
    await Customer.findByIdAndUpdate(idCustomer, { validEmail: true })
    return 'Email validado ✓'
  } else {
    return 'Intente de nuevo'
  }
}

export {
  login,
  validEmail
}
