const controllers = require('../controllers')
const auth = require('./auth')
const multer = require('multer')

let upload = multer({dest: './public/avatars'})

module.exports = (app) => {
  app.get('/', controllers.home.indexGet)
  app.get('/search', controllers.home.searchGet)

  app.post('/users/register', upload.single('avatar'), controllers.users.registerPost)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)
  app.get('/users/profile/:user', auth.isAuthenticated, controllers.users.profileGet)
  app.get('/users/profile/vote', auth.isAuthenticated, controllers.users.votesGet)
  app.post('/users/profile/vote', auth.isAuthenticated, controllers.users.votePost)
  app.get('/users/profile/messages', auth.isAuthenticated, controllers.users.messagesGet)
  app.post('/users/profile/messages', auth.isAuthenticated, controllers.users.messagePost)
  app.get('/users/profile/PurchaseHistory', auth.isAuthenticated, controllers.users.purchHistoryGet)
  app.delete('/users/delete', controllers.users.deleteUser)

  app.get('/category/:category', controllers.category.categoryProductsGet)

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
  app.get('/article/accessory/:accessory', auth.isAuthenticated, controllers.accessory.singleGet)
  app.post('/article/accessory/create', auth.isAuthenticated, upload.array('image', 12), controllers.accessory.createPost)
  app.get('/article/accessory/linked', auth.isAuthenticated, controllers.accessory.linkedGet)
  app.delete('/article/accessory/:accessory', auth.isAuthenticated, controllers.accessory.deleteAccessory)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
