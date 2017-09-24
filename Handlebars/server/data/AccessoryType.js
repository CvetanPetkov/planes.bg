const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let accessoryTypeSchema = new mongoose.Schema({
  name: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  accessories: [{
    type: types.ObjectId,
    ref: 'Accessory'
  }]
}, {timestamps: true})

accessoryTypeSchema.statics.pushRefElement = function (id, refEl) {
  return this.findById(id)
    .then((accessoryType) => {
      accessoryType.accessories.push(refEl)
      accessoryType.save()
    })
}

let AccessoryType = mongoose.model('AccessoryType', accessoryTypeSchema)
module.exports = AccessoryType

module.exports.seedAccessoryTypes = () => {
  AccessoryType.find({}).then(acsTypes => {
    if (acsTypes.length > 0) return
    let acsTypesArr = ['Missile', 'Bomb', 'Container']

    for (let acsType of acsTypesArr) {
      AccessoryType.create({
        name: acsType
      })
    }
  })
}
