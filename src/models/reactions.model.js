import mongoose from 'mongoose'

const reactionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'customers'
  }
})

const Reaction = mongoose.model('reactions', reactionSchema)
export { Reaction }
