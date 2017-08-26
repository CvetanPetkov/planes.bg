const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let voteSchema = new mongoose.Schema({
  vote: {
    type: types.String,  //  ['Positive', 'Neutral', 'Negative']
    required: REQUIRED_VALIDATION_MESSAGE
  },
  creator: {
    type: types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

let Vote = mongoose.model('Vote', voteSchema)
module.exports = Vote
