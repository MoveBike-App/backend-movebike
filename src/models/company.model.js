import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'company'
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /.*@.*\..*/
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  motos: [{ /* reference ready */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'motos'
  }],
  customers: [{ /* help */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers'
  }]
}, {
  timestamps: true
})

export const Company = mongoose.model('companies', companySchema)
