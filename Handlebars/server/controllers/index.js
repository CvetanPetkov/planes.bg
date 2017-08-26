const home = require('./home-controller')
const users = require('./users-controller')
const category = require('./category-controller')
const plane = require('./plane-controller')
const accessory = require(('./accessory-controller'))

module.exports = {
  home: home,
  users: users,
  category: category,
  plane: plane,
  accessory: accessory
}
