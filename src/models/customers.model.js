import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const customerSchema = new mongoose.Schema({
  role: {
    type: String,
    default: 'customer'
  },
  name: {
    type: String,
    trim: true,
    required: false
  },
  slug: {
    type: String,
    slug: ['name', 'role']
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
    required: false
  },
  phone: {
    type: String,
    required: true
  },
  identify: {
    type: String,
    required: true
  },
  keyIdentify: {
    type: String,
    required: false
  },
  reserve: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reserves'
  }],
  validEmail: {
    type: Boolean,
    default: false
  },
  company: {
    type: String
  }
}, {
  timestamps: true
})

export const Customer = mongoose.model('customers', customerSchema)
