import mongoose from 'mongoose'

const reserveSchema = new mongoose.Schema({
  customer: { /* reference ready */
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  vehicle: { /* help */
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

    // required: true
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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: false
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

export const Reserve = mongoose.model('reserves', reserveSchema)
