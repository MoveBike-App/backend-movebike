import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

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
  slug: {
    type: String,
    slug: 'title'
  },
  description: {
    type: String,
    required: false,
    minLength: 5,
    trim: true
  },
  hashtags: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  ZIP: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
})

const Route = mongoose.model('routes', routeSchema)
export { Route }
