const mongoose = require('mongoose')
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

    let accessoryIndex = req.params.accessoryIndex

    res.send(JSON.stringify(tempProducts[accessoryIndex]))
    res.end()
  },
  allGet: (req, res) => {},
  singleGet: (req, res) => {},
  createPost: (req, res) => {},
  linkedGet: (req, res) => {},
  accessoryPost: (req, res) => {},
  deleteAccessory: (req, res) => {}
}
