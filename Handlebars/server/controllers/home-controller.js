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
    let conditions = ['New', 'Used', 'Scrap']
    let imagesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let categories = ['Glider', 'Civil', 'Military', 'Passenger', 'Transport', 'Other']
    let engines = ['No', 'Shaft', 'Turbine', 'Reaction', 'Rocket']

    let viewObj = {
      create: true,
      style: 'selected',
      conditions: conditions,
      imagesCount: imagesCount,
      categories: categories,
      engines: engines
    }

    res.render('home/create', viewObj)
  }
}
