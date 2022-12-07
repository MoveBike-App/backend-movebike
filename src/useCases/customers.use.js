import { Customer } from '../models/customers.model.js'
import { StatusHttp } from '../libs/statusHttp.js'
import { Company } from '../models/company.model.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import { sendConfirmationEmail } from '../libs/sendgrid.js'
import { s3 } from '../libs/s3/index.js'
import config from '../libs/s3/config.js'

async function create (newCustomer, commpanyId, file) {
  const { email, password } = newCustomer
  const customerFound = await Customer.findOne({ email })
  if (customerFound) {
    throw new StatusHttp('This customer already exist!', 400)
  }
  const encryptedPassword = await bcrypt.hash(password)
  const newUser = await Customer.create(
    {
      ...newCustomer,
      password: encryptedPassword,
      identify: file.location,
      keyIdentify: file.key
    })
  await Company.findByIdAndUpdate(commpanyId,
    { $push: { customers: newUser._id } })
  const token = jwt.sign({ id: newUser._id, email: newUser.email }, '1d')
  await sendConfirmationEmail(newCustomer.email, newCustomer.name, token)
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
  const customer = Customer.findById(customerFound).populate({
    path: 'reserve',
    populate: {
      path: 'vehicle',
      select: ['name', 'price', 'image', 'keyImage', 'slug']
    }
  }
  )
  return customer
}

/* async function getBySlug (slugCustomer) {
  const customerFound = await Customer.findOne(slugCustomer)
  if (!customerFound) throw new StatusHttp('Customer not found', 400)
  return Customer.findById(customerFound).populate({
    path: 'reserve',
    populate: {
      path: 'vehicle',
      select: ['name', 'price', 'image', 'keyImage', 'slug']
    }
  }
  )
}
 */
async function update (idCustomer, newData, newFile) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) throw new StatusHttp('Customer not found', 400)

  if (newFile) {
    const identify = newFile.find(field => field.fieldname === 'identify')
    if (identify) {
      const replaceIdentify = s3.deleteObject({ Key: customerFound.keyIdentify, Bucket: config.AWS_BUCKET_NAME }).promise()
      if (!replaceIdentify) throw new StatusHttp('Try again', 400)
      const { location, key } = identify
      newData.identify = location
      newData.keyIdentify = key
    }
  }

  return Customer.findByIdAndUpdate(idCustomer, newData, { new: true })
}

async function deleteById (idCustomer) {
  const customerFound = await Customer.findById(idCustomer)
  if (!customerFound) {
    throw new StatusHttp('Customer not found', 400)
  }
  if (customerFound.identify) {
    const deleteImg = s3.deleteObject({ Key: customerFound.keyIdentify, Bucket: config.AWS_BUCKET_NAME }).promise()
    if (!deleteImg) throw new StatusHttp('Try again!', 400)
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
