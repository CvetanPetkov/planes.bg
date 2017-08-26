const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let commentSchema = new mongoose.Schema({
  comment: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  creator: {
    type: types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

let Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
