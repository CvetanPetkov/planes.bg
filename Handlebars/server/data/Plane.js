const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let planeSchema = new mongoose.Schema({
  manufacturer: {
    type: types.String,
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
  category: [{
    type: types.ObjectId,
    ref: 'Category'
  }],
  condition: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  airHours: {
    type: Number,
    min: 0,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  hoursToMaintenance: {
    type: Number,
    default: 0,
    min: 0,
    max: 10000
  },
  price: {
    type: Number,
    min: 0,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  inStock: {
    type: Number,
    min: 0,
    max: 100
  },
  crew: {
    type: Number,
    min: 0
  },
  engine: {
    type: types.String,
    default: 'No'
  },
  radar: {
    type: Boolean,
    default: false
  },
  transponder: {
    type: Boolean,
    default: false
  },
  enginesCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  passengersCount: {
    type: Number,
    default: 0,
    min: 0,
    max: 1000
  },
  accessories: [{
    type: types.ObjectId,
    ref: 'Accessory'
  }],
  ratings: [{
    type: types.ObjectId,
    ref: 'Rating'
  }],
  comments: [{
    type: types.ObjectId,
    ref: 'Comment'
  }],
  creator: {
    type: types.ObjectId,
    ref: 'User',
    required: REQUIRED_VALIDATION_MESSAGE
  }
}, {timestamps: true})

let Plane = mongoose.model('Plane', planeSchema)
module.exports = Plane
