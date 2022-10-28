import { Company } from '../models/company.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import bcrypt from '../libs/bcrypt.js'

async function create (newCompany) {
  const { email, password } = newCompany
  const companyFound = await Company.findOne({ email })
  if (companyFound) throw new StatusHttp('This company is already registered', 400)
  const encryptedPassword = await bcrypt.hash(password)
  return Company.create({ ...newCompany, password: encryptedPassword })
}

function getAll () {
  return Company.find({}).populate({ path: 'motos', select: ['name'] }).populate({ path: 'customers', select: ['name'] })
}

async function getById (idCompany) {
  const companyFound = await Company.findById(idCompany)
  if (!companyFound) throw new StatusHttp('Company not found', 400)
  return Company.findById(companyFound).populate('motos').populate('customers')
}

async function update (idCompany, newData) {
  const companyFound = await Company.findById(idCompany)
  if (!companyFound) throw new StatusHttp('Company not found', 400)
  return Company.findByIdAndUpdate(idCompany, newData, { new: true })
}

async function deleteById (idCompany) {
  const companyFound = await Company.findById(idCompany)
  if (!companyFound) throw new StatusHttp('Company not found', 400)
  return Company.findByIdAndDelete(idCompany)
}

export {
  create,
  getAll,
  getById,
  update,
  deleteById
}
