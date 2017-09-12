const mongoose = require('mongoose')
const Category = mongoose.model('Category')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  categoryProductsGet: (req, res) => {
    let tempProducts = [[{
      model: 'IRIS-T',
      description: 'air-to-air'
    }, {
      model: 'AIM-120 AMRAAM',
      description: 'air-to-air'
    }, {
      model: 'Kh-35',
      description: 'air-to-surface'
    }], [{
      model: 'GBU-24 Paveway III',
      description: 'laser-guided bomb'
    }, {
      model: 'Mark 82',
      description: 'unguided bomb'
    }], [{
      model: 'AN/AAQ-13 LANTRIN',
      description: 'navigation pod'
    }, {
      model: 'AN/AAQ-14',
      description: 'targeting pod'
    }, {
      model: 'M-TADS/PNVS',
      description: 'targeting and night vision system'
    }, {
      model: 'HMSS',
      description: 'Helmet-Mounted Symbology System'
    }, {
      model: 'AN/AAQ-13 LANTRIN',
      description: 'navigation pod'
    }, {
      model: 'AN/AAQ-14',
      description: 'targeting pod'
    }, {
      model: 'M-TADS/PNVS',
      description: 'targeting and night vision system'
    }, {
      model: 'HMSS',
      description: 'Helmet-Mounted Symbology System'
    }, {
      model: 'AN/AAQ-13 LANTRIN',
      description: 'navigation pod'
    }, {
      model: 'AN/AAQ-14',
      description: 'targeting pod'
    }, {
      model: 'M-TADS/PNVS',
      description: 'targeting and night vision system'
    }, {
      model: 'HMSS',
      description: 'Helmet-Mounted Symbology System'
    }]]

    let categoryIndex = req.params.categoryIndex

    res.send(JSON.stringify(tempProducts[categoryIndex]))
    res.end()
  }
}
