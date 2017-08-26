const mongoose = require('mongoose')
const Accessory = mongoose.model('Accessory')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  allGet: (req, res) => {},
  singleGet: (req, res) => {},
  createPost: (req, res) => {},
  linkedGet: (req, res) => {},
  accessoryPost: (req, res) => {},
  deleteAccessory: (req, res) => {}
}
