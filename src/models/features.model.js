import mongoose from 'mongoose'

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: false
  },
  icon: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

export const Feature = mongoose.model('features', featureSchema)
