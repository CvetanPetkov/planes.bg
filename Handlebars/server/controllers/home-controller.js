const mongoose = require('mongoose')
const User = mongoose.model('User')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  indexGet: (req, res) => {
    let user = req.user
    if (user) {
      res.render('home/index', {home: true, style: 'selected'})
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
  createGet: (req, res) => {
    res.render('home/create', {create: true, style: 'selected'})
  },
  createPost: (req, res) => {}
}
