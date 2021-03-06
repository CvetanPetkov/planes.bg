const mongoose = require('mongoose')
const User = require('../data/User')
const Category = require('../data/Category')
const AccessoryType = require('../data/AccessoryType')

require('../data/Accessory')
require('../data/Category')
require('../data/Comment')
require('../data/Message')
require('../data/Plane')
require('../data/Rating')
require('../data/Vote')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('MongoDB ready!')

    User.seedAdminUser()
    Category.seedCategories()
    AccessoryType.seedAccessoryTypes()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
