import mongoose from 'mongoose'

const motoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  vehiclePlate: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true
  },
  minAge: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['moto', 'scooter'],
    required: true
  },
  securityHold: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inssurance: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  totalReserves: {
    type: Number,
    required: true
  },
  availableDate: {
    type: [Date],
    default: []
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
    required: true
  }
}, {
  timestamps: true
})

export const Moto = mongoose.model('motos', motoSchema)
