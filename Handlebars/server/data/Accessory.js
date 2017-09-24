const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let accessorySchema = new mongoose.Schema({
  manufacturer: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  accessoryType: {
    type: types.ObjectId,
    ref: 'AccessoryType',
    required: REQUIRED_VALIDATION_MESSAGE
  },
  model: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  description: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  images: [{
    type: types.String,
    default: '/articleImages/default-image_450.png'
  }],
  condition: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  price: {
    type: Number,
    min: 0,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  planes: [{
    type: types.ObjectId,
    ref: 'Plane'
  }],
  creator: {
    type: types.ObjectId,
    ref: 'User',
    required: REQUIRED_VALIDATION_MESSAGE
  }
}, {timestamps: true})

let Accessory = mongoose.model('Accessory', accessorySchema)
module.exports = Accessory
