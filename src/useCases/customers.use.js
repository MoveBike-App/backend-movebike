import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'
import { sendConfirmationEmail } from '../libs/sendgrid.js'

async function create (newCustomer) {
  const { email, password } = newCustomer
  const customerFound = await Customer.findOne({ email })
  if (customerFound) throw new StatusHttp('This customer already exist!', 400)
  const encryptedPassword = await bcrypt.hash(password)
  await sendConfirmationEmail(newCustomer.email, newCustomer.name)
  console.log(newCustomer.email)
  return await Customer.create({ ...newCustomer, password: encryptedPassword })
}

function getAll () {
  return Customer.find({})
}

async function getById (idCustomer) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) throw new StatusHttp('Customer not found', 400)
  return Customer.findById(customerFound)
}

async function update (idCustomer, newData) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) throw new StatusHttp('Customer not found', 400)
  return Customer.findByIdAndUpdate(idCustomer, newData, { new: true })
}

async function deleteById (idCustomer) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) throw new StatusHttp('Customer not found', 400)
  return Customer.findByIdAndDelete(idCustomer)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
