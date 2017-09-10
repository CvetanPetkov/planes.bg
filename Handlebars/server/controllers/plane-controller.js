const mongoose = require('mongoose')
const Plane = mongoose.model('Plane')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  allGet: (req, res) => {},
  singleGet: (req, res) => {},
  createPost: (req, res) => {},
  accessoriesAllGet: (req, res) => {},
  accessoryPost: (req, res) => {},
  ratingsGet: (req, res) => {},
  ratingPost: (req, res) => {},
  commentsGet: (req, res) => {},
  commentPost: (req, res) => {},
  deletePlane: (req, res) => {}
}
