import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const reserveSchema = new mongoose.Schema({
  reserveNumber: {
    type: String,
    required: false
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers',
    required: true
  },
  address: {
    type: String,
    required: false
  },
  coordinates: [{
    latitude: String,
    longitude: String
  }],
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
  allDates: [{
    type: Date,
    required: false
  }],
  totalDays: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: 'processing',
    enum: ['processing', 'reserved', 'onWay', 'delivered', 'canceled', 'backInStock']
  },
  isPaid: {
    type: Boolean,
    default: false,
    required: true
  },
  payment_id: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

export const Reserve = mongoose.model('reserves', reserveSchema)
