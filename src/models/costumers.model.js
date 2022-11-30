import mongoose from 'mongoose'

const costumerSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'company', 'superadmin'],
    default: 'user'
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true
    // match: /.*@\..*/
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
  }
})

export const Costumer = mongoose.model('costumer', costumerSchema)
