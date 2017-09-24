const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let categorySchema = new mongoose.Schema({
  name: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  planes: [{
    type: types.ObjectId,
    ref: 'Plane'
  }]
}, {timestamps: true})

let Category = mongoose.model('Category', categorySchema)
module.exports = Category

module.exports.seedCategories = () => {
  Category.find({}).then(categories => {
    if (categories.length > 0) return
    let categoriesArr = ['Glider', 'Civil', 'Military', 'Passenger', 'Transport', 'Other']

    for (let category of categoriesArr) {
      Category.create({
        name: category
      })
    }
  })
}
