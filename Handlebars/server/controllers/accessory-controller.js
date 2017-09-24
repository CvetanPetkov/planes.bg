const mongoose = require('mongoose')
const normalize = require('normalize-path')

const User = mongoose.model('User')
const AccessoryType = mongoose.model('AccessoryType')
const Accessory = mongoose.model('Accessory')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  accessoryProductsGet: (req, res) => {
    let tempProducts = [[{
      _id: 0,
      model: 'IRIS-T',
      description: 'air-to-air'
    }, {
      _id: 1,
      model: 'AIM-120 AMRAAM',
      description: 'air-to-air'
    }, {
      _id: 2,
      model: 'Kh-35',
      description: 'air-to-surface'
    }], [{
      _id: 3,
      model: 'GBU-24 Paveway III',
      description: 'laser-guided bomb'
    }, {
      _id: 4,
      model: 'Mark 82',
      description: 'unguided bomb'
    }], [{
      _id: 5,
      model: 'AN/AAQ-13 LANTRIN',
      description: 'navigation pod'
    }, {
      _id: 6,
      model: 'AN/AAQ-14',
      description: 'targeting pod'
    }, {
      _id: 7,
      model: 'M-TADS/PNVS',
      description: 'targeting and night vision system'
    }, {
      _id: 8,
      model: 'HMSS',
      description: 'Helmet-Mounted Symbology System'
    }, {
      _id: 9,
      model: 'AN/AAQ-13 LANTRIN',
      description: 'navigation pod'
    }, {
      _id: 10,
      model: 'AN/AAQ-14',
      description: 'targeting pod'
    }, {
      _id: 11,
      model: 'M-TADS/PNVS',
      description: 'targeting and night vision system'
    }, {
      _id: 12,
      model: 'HMSS',
      description: 'Helmet-Mounted Symbology System'
    }, {
      _id: 13,
      model: 'AN/AAQ-13 LANTRIN',
      description: 'navigation pod'
    }, {
      _id: 14,
      model: 'AN/AAQ-14',
      description: 'targeting pod'
    }, {
      _id: 15,
      model: 'M-TADS/PNVS',
      description: 'targeting and night vision system'
    }, {
      _id: 16,
      model: 'HMSS',
      description: 'Helmet-Mounted Symbology System'
    }]]

    let accessoryTypeId = req.params.accessoryType

    Accessory.find({accessoryType: accessoryTypeId})
      .then(accessory => {
        res.send(accessory)
        res.end()
      })

    // res.send(JSON.stringify(tempProducts[accessoryIndex]))
    // res.end()
  },
  allGet: (req, res) => {},
  singleGet: (req, res) => {},
  createPost: (req, res) => {
    let conditions = ['New', 'Used', 'Scrap']

    //  required fields
    let manufacturer = req.body.acsManufacturer.trim() || null
    if (!manufacturer) {
      errorHandler.handleCommonError(req, res, 'Manufacturer is required', 'home/create', 'create')
      return
    }

    let accessoryType = req.body.accessoryType || null
    if (!accessoryType) {
      errorHandler.handleCommonError(req, res, 'Type is required', 'home/create', 'create')
      return
    }

    let model = req.body.acsModel.trim() || null
    if (!model) {
      errorHandler.handleCommonError(req, res, 'Model is required', 'home/create', 'create')
      return
    }

    let description = req.body.acsDescription.trim() || null
    if (description.length < 100) {
      errorHandler.handleCommonError(req, res, 'Description is too short', 'home/create', 'create')
      return
    }
    if (description.length > 1000) {
      errorHandler.handleCommonError(req, res, 'Description is too long', 'home/create', 'create')
      return
    }

    //  TODO require conditions from ext file in plane-controller and home-controller
    let condition = conditions[Number(req.body.condition)] || null
    if (!condition) {
      errorHandler.handleCommonError(req, res, 'Condition is required', 'home/create', 'create')
      return
    }

    let price = req.body.acsPrice || null
    if (!price || price < 0) {
      errorHandler.handleCommonError(req, res, 'Price is required', 'home/create', 'create')
      return
    }

    let accessoryObj = {
      manufacturer: manufacturer,
      accessoryType: accessoryType,
      model: model,
      description: description,
      condition: condition,
      price: price
    }

    //  optional fields
    let images = req.files || null
    if (images) {
      accessoryObj.images = []
      images.forEach(img => {
        img.path = normalize(img.path)
        let startIndex = img.path.indexOf('/')
        let imgPath = img.path.slice(startIndex, img.path.length)
        accessoryObj.images.push(imgPath)
      })
    }

    accessoryObj.creator = req.user._id

    Accessory.create(accessoryObj)
      .then(accessory => {
        User.pushRefElement(req.user._id, 'articlesToSell', accessory._id)
        AccessoryType.pushRefElement(accessoryType, accessory)

        res.redirect(`/article/accessory/${accessory._id}`)
      })
      .catch(err => {
        console.log(err)
        let message = errorHandler.handleMongooseError(err)
        errorHandler.handleCommonError(req, res, message, 'home/create', 'create')
      })
  },
  linkedGet: (req, res) => {},
  accessoryPost: (req, res) => {},
  deleteAccessory: (req, res) => {}
}
