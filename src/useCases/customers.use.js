import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import { sendConfirmationEmail } from '../libs/sendgrid.js'

async function create (newCustomer) {
  const { email, password } = newCustomer
  const customerFound = await Customer.findOne({ email })
  if (customerFound) {
    throw new StatusHttp('This customer already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  console.log(newCustomer.email)
  const newUser = await Customer.create({ ...newCustomer, password: encryptedPassword })
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
