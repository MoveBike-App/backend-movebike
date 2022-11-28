import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const reserveSchema = new mongoose.Schema({
  reserveNumber: {
    type: Number,
    required: false,
    default: '0001'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  slug: {
    type: String,
    slug: ['reserveNumber', 'totalPrice']
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
    required: false
  },
  finalDate: {
    type: Date,
    required: false
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
