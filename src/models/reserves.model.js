import mongoose from 'mongoose'

const reserveSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'motos',
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  initialDate: {
    type: Date,
    default: new Date(Date.now())
    // required: true
  },
  finalDate: {
    type: Date,
    default: new Date(Date.now())
  },
  status: {
    type: String,
    required: true,
    default: 'processing',
    enum: ['processing', 'reserved', 'onWay', 'delivered', 'canceled']
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true
})

export const Reserve = mongoose.model('reserves', reserveSchema)
