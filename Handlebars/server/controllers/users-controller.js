const normalize = require('normalize-path')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const encryption = require('../utilities/encryption')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register', {register: true, style: 'selected'})
  },
  registerPost: (req, res) => {
    //  Required fields
    let firstName = req.body.firstName.trim() || null
    if (!firstName) {
      errorHandler.handleCommonError(req, res, 'First name is required', 'users/register', 'register')
      return
    }

    let lastName = req.body.lastName.trim() || null
    if (!lastName) {
      errorHandler.handleCommonError(req, res, 'Last name is required', 'users/register', 'register')
      return
    }

    let company = req.body.company.trim() || null
    if (!company) {
      errorHandler.handleCommonError(req, res, 'Company is required', 'users/register', 'register')
      return
    }

    let password = req.body.password || null
    if (!password || password.length < 4) {
      errorHandler.handleCommonError(req, res, 'Password is required or too short', 'users/register', 'register')
      return
    }

    let confirmPassword = req.body.confirmPassword || null
    if (!confirmPassword) {
      errorHandler.handleCommonError(req, res, 'Confirm password is required', 'users/register', 'register')
      return
    }

    let salt = null
    let hashedPassword = null
    if (password === confirmPassword) {
      salt = encryption.generateSalt()
      hashedPassword = encryption.generateHashedPassword(salt, req.body.password)
    } else {
      errorHandler.handleCommonError(req, res, 'Passwords don`t match', 'users/register', 'register')
      return
    }

    let userObj = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      salt: salt,
      hashedPass: hashedPassword
    }

    //  Optional fields!
    let location = req.body.location.trim() || null
    if (location) {
      userObj.location = location
    }

    if (req.file) {
      req.file.path = normalize(req.file.path)
      let startIndex = req.file.path.indexOf('/')
      let avatarPath = req.file.path.slice(startIndex, req.file.path.length)
      userObj.avatar = avatarPath
    }

    User.create(userObj)
      .then(user => {
        req.logIn(user, (err, user) => {
          if (err) {
            errorHandler.handleCommonError(req, res, err, 'users/register', 'register')
          }
          console.log('Login Success')
          res.redirect('/')
        })
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        errorHandler.handleCommonError(req, res, message, 'users/register', 'register')
      })
  },
  checkCompany: (req, res) => {
    let company = req.body.company

    User.findOne({company: company})
      .then(user => {
        if (!user) {
          res.sendStatus(200)
          res.end()
        } else {
          res.sendStatus(226)
        }
      })
  },
  loginGet: (req, res) => {
    res.render('users/login', {login: true, style: 'selected'})
  },
  loginPost: (req, res) => {
    let firstName = req.body.firstName || null
    if (!firstName) {
      errorHandler.handleCommonError(req, res, 'First name is required', 'users/login', 'login')
      return
    }

    let lastName = req.body.lastName.trim() || null
    if (!lastName) {
      errorHandler.handleCommonError(req, res, 'Last name is required', 'users/login', 'login')
      return
    }

    let company = req.body.company.trim() || null
    if (!company) {
      errorHandler.handleCommonError(req, res, 'Company is required', 'users/login', 'login')
      return
    }

    let password = req.body.password || null
    if (!password || password.length < 4) {
      errorHandler.handleCommonError(req, res, 'Password is required or too short', 'users/login', 'login')
      return
    }

    let userObj = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      password: password
    }

    User.findOne({firstName: userObj.firstName, lastName: userObj.lastName, company: userObj.company})
      .then((user) => {
        if (!user || !user.authenticate(userObj.password)) {
          errorHandler.handleCommonError(req, res, 'Invalid user data', 'users/login')
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            errorHandler.handleCommonError(req, res, err, 'users/login', 'login')
          }

          console.log('Login Success')
          res.redirect('/')
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    console.log('Logout Success')

    res.redirect('/')
  },
  profileGet: (req, res) => {
    res.render('users/profile', {profile: true, style: 'selected'})
  },
  votesGet: (req, res) => {},
  votePost: (req, res) => {},
  messagesGet: (req, res) => {},
  messagePost: (req, res) => {},
  purchHistoryGet: (req, res) => {},
  deleteUser: (req, res) => {}
}
