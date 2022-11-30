import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const motoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: false
  },
  slug: {
    type: String,
    slug: 'name',
    required: false
  },
  image: {
    type: String,
    required: false
  },
  keyImage: {
    type: String,
    required: false
  },
  vehiclePlate: {
    type: String,
    required: false,
    trim: true
  },
  model: {
    type: String,
    required: true
  },
  minAge: {
    type: Number,
    required: false
  },
  vehicleType: {
    type: String,
    enum: ['moto', 'scooter'],
    required: false
  },
  securityHold: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  inssurance: {
    type: String,
    required: false
  },
  totalReserves: {
    type: Number,
    required: false
  },
  availableDate: {
    type: [Date],
    default: [],
    required: false
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
    required: false
  },
  features: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'features',
    required: false
  }]
}, {
  timestamps: true
})

export const Moto = mongoose.model('motos', motoSchema)
