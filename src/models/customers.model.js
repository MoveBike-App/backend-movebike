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
    required: true
  },
  slug: {
    type: String,
    slug: ['name', 'role']
  },
  image: {
    type: String,
    required: false
  },
  keyImage: {
    type: String,
    required: false
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
    required: false
  },
  keyIdentify: {
    type: String,
    required: false
  },
  stripe_id: {
    type: String,
    required: false
  },
  reserve: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reserves'
  }],
  validEmail: {
    type: String,
    default: false
  },
  company: {
    type: String
  }
}, {
  timestamps: true
})

export const Customer = mongoose.model('customers', customerSchema)
