const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  creator: {
    type: types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

let Rating = mongoose.model('Rating', ratingSchema)
module.exports = Rating
