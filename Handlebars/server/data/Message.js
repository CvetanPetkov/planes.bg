const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let MessageSchema = new mongoose.Schema({
  message: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  creator: {
    type: types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

let Message = mongoose.model('Message', MessageSchema)
module.exports = Message
