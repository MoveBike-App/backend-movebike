import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

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
  validEmail: {
    type: Boolean,
    default: true
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
