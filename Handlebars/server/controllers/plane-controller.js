const mongoose = require('mongoose')
const Plane = mongoose.model('Plane')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  allGet: (req, res) => {},
  singleGet: (req, res) => {},
  createPost: (req, res) => {
    console.log(req.body)
    if (req.body.accessoryData) {
      console.log(req.body.accessoryData)
      console.log(JSON.parse(req.body.accessoryData))
      console.log(JSON.parse(req.body.accessoryData)[0]._id)
    }

    res.redirect('/article/create')
  },
  accessoriesAllGet: (req, res) => {},
  accessoryPost: (req, res) => {},
  ratingsGet: (req, res) => {},
  ratingPost: (req, res) => {},
  commentsGet: (req, res) => {},
  commentPost: (req, res) => {},
  deletePlane: (req, res) => {}
}
