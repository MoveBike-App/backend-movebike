import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'customer'
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
  isVerify: {
    type: Boolean,
    required: true
  },
  identify: {
    type: String,
    required: true
  },
  stripe_id: {
    type: String,
    required: true
  },
  reserve: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reserves'
  }]
}, {
  timestamps: true
})

export const Customer = mongoose.model('customers', customerSchema)
