import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { Company } from '../models/company.model.js'
import bcrypt from '../libs/bcrypt.js'
/* import jwt from '../libs/jwt.js'
import { sendConfirmationEmail } from '../libs/sendgrid.js' */

async function create (newCustomer, commpanyId = '636d504cf0e929aea4e753a2') {
  const { email, password } = newCustomer
  const customerFound = await Customer.findOne({ email })
  if (customerFound) {
    throw new StatusHttp('This customer already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  const newUser = await Customer.create({ ...newCustomer, password: encryptedPassword })
  await Company.findByIdAndUpdate(commpanyId,
    { $push: { customers: newUser._id } })
  /*   const token = jwt.sign({ id: newUser._id, role: newUser.role }, '10d')
  await sendConfirmationEmail(newCustomer.email, newCustomer.name) */
  return newUser
}

function getAll () {
  return Customer.find({}).populate('reserve')
}

async function getById (idCustomer) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) {
    throw new StatusHttp('Customer not found', 400)
  }
  const customer = Customer.findById(customerFound).populate('reserve')
  return customer
}

async function update (idCustomer, newData) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) {
    throw new StatusHttp('Customer not found', 400)
  }
  return Customer.findByIdAndUpdate(idCustomer, newData, { new: true })
}

async function deleteById (idCustomer) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) {
    throw new StatusHttp('Customer not found', 400)
  }
  return Customer.findByIdAndDelete(idCustomer)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
