const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let categorySchema = new mongoose.Schema({
  name: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  planes: [{
    type: types.ObjectId,
    ref: 'Plane'
  }],
  creator: {
    type: types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true})

let Category = mongoose.model('Category', categorySchema)
module.exports = Category
