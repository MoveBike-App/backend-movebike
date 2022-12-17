import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
mongoose.plugin(slug)

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: false
  },
  slug: {
    type: String,
    slug: 'name'
  },
  icon: {
    type: String,
    required: false
  },
  keyIcon: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

export const Feature = mongoose.model('features', featureSchema)
