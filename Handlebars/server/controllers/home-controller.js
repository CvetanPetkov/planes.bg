const mongoose = require('mongoose')
const User = mongoose.model('User')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  indexGet: (req, res) => {
    console.log('indexGet controller')

    let user = req.user
    if (user) {
      let userId = req.user._id
      console.log(userId)
    } else {
      res.render('home/index')
    }
  },
  latestGet: (req, res) => {

  },
  searchGet: (req, res) => {

  },
  searchPost: (req, res) => {

  },
  articleCreate: (req, res) => {}
}
