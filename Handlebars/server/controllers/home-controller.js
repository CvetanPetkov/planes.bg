const mongoose = require('mongoose')
const User = mongoose.model('User')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  indexGet: (req, res) => {
    let user = req.user
    if (user) {
      let userId = req.user._id
      console.log(userId)
    } else {
      res.render('home/index', {home: true, style: 'selected'})
    }
  },
  latestGet: (req, res) => {
    res.render('home/latest', {latest: true, style: 'selected'})
  },
  searchGet: (req, res) => {
    res.render('home/search', {search: true, style: 'selected'})
  },
  searchPost: (req, res) => {

  },
  articleCreate: (req, res) => {}
}
