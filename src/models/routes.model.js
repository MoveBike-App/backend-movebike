import mongoose from 'mongoose'

const routeSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false
  },
  keyImage: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 500,
    trim: true
  },
  description: {
    type: String,
    required: false,
    minLength: 5,
    trim: true
  }
}, {
  timestamps: true
})

const Route = mongoose.model('routes', routeSchema)
export { Route }
