const mongoose = require('mongoose')
const normalize = require('normalize-path')

const Plane = mongoose.model('Plane')
const User = mongoose.model('User')

const errorHandler = require('../utilities/error-handler')

module.exports = {
  allGet: (req, res) => {},
  singleGet: (req, res) => {},
  createPost: (req, res) => {
    let conditions = ['New', 'Used', 'Scrap']
    let engines = ['No engine', 'Shaft', 'Turbine', 'Reaction', 'Rocket']

    // console.log(req.body)
    // console.log('----------------------------')
    // console.log(req.files)
    // if (req.body.accessoryData) {
    //   console.log(req.body.accessoryData)
    //   console.log('---------------------------------')
    //   console.log(JSON.parse(req.body.accessoryData))
    //   console.log('---------------------------------')
    //   console.log(JSON.parse(req.body.accessoryData)[0]._id)
    //   console.log('---------------------------------')
    // }

    //  required fields
    let manufacturer = req.body.manufacturer.trim() || null
    if (!manufacturer) {
      errorHandler.handleCommonError(req, res, 'Manufacturer is required', 'home/create', 'create')
      return
    }

    let model = req.body.model.trim() || null
    if (!model) {
      errorHandler.handleCommonError(req, res, 'Model is required', 'home/create', 'create')
      return
    }

    let description = req.body.description.trim() || null
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

    let airHours = req.body.airHours || null
    if (!airHours || airHours < 0) {
      errorHandler.handleCommonError(req, res, 'Air hours is required', 'home/create', 'create')
      return
    }

    let price = req.body.price || null
    if (!price || price < 0) {
      errorHandler.handleCommonError(req, res, 'Price is required', 'home/create', 'create')
      return
    }

    let planeObj = {
      manufacturer: manufacturer,
      model: model,
      description: description,
      condition: condition,
      airHours: airHours,
      price: price
    }

    //  optional fields
    let category = req.body.category || null
    if (category) {
      planeObj.category = []
      planeObj.category.push(category)
    }

    //  TODO require engines from ext file in plane-controller and home-controller
    let engine = engines[Number(req.body.engine)] || null
    if (engine) {
      planeObj.engine = engine
    }

    let hoursToMaintenance = req.body.hoursToMaintenance || null
    if (hoursToMaintenance) {
      if (hoursToMaintenance < 0 || hoursToMaintenance > 10000) {
        errorHandler.handleCommonError(req, res, 'Invalid value for Hours to maintenance', 'home/create', 'create')
        return
      } else {
        planeObj.hoursToMaintenance = hoursToMaintenance
      }
    }

    let inStock = req.body.inStock || null
    if (inStock) {
      if (inStock < 0 || inStock > 1000) {
        errorHandler.handleCommonError(req, res, 'Invalid value for Available quantity', 'home/create', 'create')
        return
      } else {
        planeObj.inStock = inStock
      }
    }

    let crew = req.body.crew || null
    if (crew) {
      if (crew < 0 || crew > 100) {
        errorHandler.handleCommonError(req, res, 'Invalid value for Crew quantity', 'home/create', 'create')
        return
      } else {
        planeObj.crew = crew
      }
    }

    let enginesCount = req.body.enginesCount || null
    if (enginesCount) {
      if (enginesCount < 0 || enginesCount > 100) {
        errorHandler.handleCommonError(req, res, 'Invalid value for Engines count', 'home/create', 'create')
        return
      } else {
        planeObj.enginesCount = enginesCount
      }
    }

    let passengersCount = req.body.passengersCount || null
    if (passengersCount) {
      if (passengersCount < 0 || enginesCount > 1000) {
        errorHandler.handleCommonError(req, res, 'Invalid value for Passengers count', 'home/create', 'create')
        return
      } else {
        planeObj.passengersCount = passengersCount
      }
    }

    let radar = req.body.radar || false
    if (radar) {
      planeObj.radar = true
    }

    let transponder = req.body.transponder || false
    if (transponder) {
      planeObj.transponder = true
    }

    if (req.body.accessoryData) {
      planeObj.accessories = []
      let accessories = JSON.parse(req.body.accessoryData)
      accessories.forEach(a => {
        planeObj.accessories.push(a._id)
      })
    }

    let images = req.files || null
    if (images) {
      planeObj.images = []
      images.forEach(img => {
        img.path = normalize(img.path)
        let startIndex = img.path.indexOf('/')
        let imgPath = img.path.slice(startIndex, img.path.length)
        planeObj.images.push(imgPath)
      })
    }

    planeObj.creator = req.user._id

    Plane.create(planeObj)
      .then(plane => {
        User.pushRefElement(req.user._id, 'articlesToSell', plane._id)

        res.redirect(`/article/plane/${plane._id}`)
      })
      .catch(err => {
        console.log(err)
        let message = errorHandler.handleMongooseError(err)
        errorHandler.handleCommonError(req, res, message, 'home/create', 'create')
      })
  },
  accessoriesAllGet: (req, res) => {},
  accessoryPost: (req, res) => {},
  ratingsGet: (req, res) => {},
  ratingPost: (req, res) => {},
  commentsGet: (req, res) => {},
  commentPost: (req, res) => {},
  deletePlane: (req, res) => {}
}
