const controllers = require('../controllers')
const auth = require('./auth')
const multer = require('multer')
const fs = require('fs')

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      let newDir = `./public/avatars/${req.body.firstName}_${req.body.lastName}_${Date.now()}`
      fs.mkdir(newDir, (err) => {
        if (err) {
          console.log(err)
        }
      })

      cb(null, newDir)
    } else {
      return console.log('opaa')
    }
  }
})
let upload = multer({storage: storage})

module.exports = (app) => {
  app.get('/', controllers.home.indexGet)
  app.get('/latest', controllers.home.latestGet)
  app.get('/search', controllers.home.searchGet)
  app.post('/search', controllers.home.searchPost)
  app.get('/article/create', auth.isAuthenticated, controllers.home.createGet)
  app.post('/article/create', auth.isAuthenticated, controllers.plane.createPost)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', upload.single('avatar'), controllers.users.registerPost)
  app.post('/users/register/checkCompany', controllers.users.checkCompany)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)
  app.get('/users/profile/:user', auth.isAuthenticated, controllers.users.profileGet)
  app.get('/users/profile/vote', auth.isAuthenticated, controllers.users.votesGet)
  app.post('/users/profile/vote', auth.isAuthenticated, controllers.users.votePost)
  app.get('/users/profile/messages', auth.isAuthenticated, controllers.users.messagesGet)
  app.post('/users/profile/messages', auth.isAuthenticated, controllers.users.messagePost)
  app.get('/users/profile/PurchaseHistory', auth.isAuthenticated, controllers.users.purchHistoryGet)
  app.delete('/users/delete', controllers.users.deleteUser)

  app.get('/category/:categoryIndex', controllers.category.categoryProductsGet)

  app.get('/article/plane/all', controllers.plane.allGet)
  app.get('/article/plane/:plane', auth.isAuthenticated, controllers.plane.singleGet)
  app.post('/article/plane/create', auth.isAuthenticated, upload.array('image', 12), controllers.plane.createPost)
  app.get('/article/plane/:plane/accessories', auth.isAuthenticated, controllers.plane.accessoriesAllGet)
  app.post('/article/plane/:plane/accessories', auth.isAuthenticated, controllers.plane.accessoryPost)
  app.get('/article/plane/:plane/ratings', controllers.plane.ratingsGet)
  app.post('/article/plane/:plane/ratings', auth.isAuthenticated, controllers.plane.ratingPost)
  app.get('/article/plane/:plane/comments', auth.isAuthenticated, controllers.plane.commentsGet)
  app.post('/article/plane/:plane/comments', auth.isAuthenticated, controllers.plane.commentPost)
  app.delete('/article/plane/:plane', auth.isAuthenticated, controllers.plane.deletePlane)

  app.get('/article/accessory/all', controllers.accessory.allGet)
  app.get('/article/accessory/:accessoryIndex', auth.isAuthenticated, controllers.accessory.accessoryProductsGet)
  app.post('/article/accessory/create', auth.isAuthenticated, upload.array('image', 12), controllers.accessory.createPost)
  app.get('/article/accessory/linked', auth.isAuthenticated, controllers.accessory.linkedGet)
  app.delete('/article/accessory/:accessory', auth.isAuthenticated, controllers.accessory.deleteAccessory)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
