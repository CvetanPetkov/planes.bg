const mongoose = require('mongoose')
const User = mongoose.model('User')

const encryption = require('../utilities/encryption')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register', {register: true, style: 'selected'})
  },
  registerPost: (req, res) => {
    console.log(req.body)

    //  Required fields
    // TODO common function to init fields
    let firstName = req.body.firstName || null
    if (!firstName) {
      errorHandler.handleValidationError(req, res, 'First name is required', 'users/register')
      return
    }

    let lastName = req.body.lastName || null
    if (!lastName) {
      errorHandler.handleValidationError(req, res, 'Last name is required', 'users/register')
      return
    }

    let location = req.body.location || null
    if (!location) {
      errorHandler.handleValidationError(req, res, 'Location is required', 'users/register')
      return
    }

    let password = req.body.password || null
    if (!password) {
      errorHandler.handleValidationError(req, res, 'Password is required', 'users/register')
      return
    }

    let confirmPassword = req.body.confirmPassword || null
    if (!confirmPassword) {
      errorHandler.handleValidationError(req, res, 'Confirm password is required', 'users/register')
      return
    }

    let hashedPassword = null
    if (password === confirmPassword) {
      let salt = encryption.generateSalt()
      hashedPassword = encryption.generateHashedPassword(salt, req.body.password)
    } else {
      errorHandler.handleValidationError(req, res, 'Passwords don`t match', 'users/register')
      return
    }

    //  Optional fields
    let company = req.body.company || null
    let avatar = req.body.avatar || null

    let userObj = {
      firstName: firstName,
      lastName: lastName,
      location: location,
      hashedPass: hashedPassword,
      company: company,
      avatar: avatar
    }

    // UserActions
    //   .create(req)
    //   .then((user) => {
    //     req.login(user, (err, user) => {
    //       if (err) {
    //         let message = errorHandler.handleMongooseError(err)
    //         console.log(message)
    //       }
    //
    //       res.redirect('/')
    //     })
    //   })
    //   .catch((err) => {
    //     let message = errorHandler.handleMongooseError(err)
    //     console.log(message)
    //   })
  },
  loginGet: (req, res) => {
    res.render('users/login', {login: true, style: 'selected'})
  },
  loginPost: (req, res) => {
    console.log('loginPost')
    console.log(req.body)

    let reqUser = req.body

    User.findOne({company: reqUser.company})
      .then((user) => {
        if (!user) {
          let message = 'Invalid user data'
          console.log(message)
          return
        }

        if (!user.authenticate(reqUser.password)) {
          let message = 'Invalid user data'
          console.log(message)
          return
        }

        req.logIn(user, (err, user) => {
          if (err) {
            let message = err
            console.log(message)
          }

          let message = 'Login Success'
          console.log(message)
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    let message = 'Logout Success'
    console.log(message)
  },
  profileGet: (req, res) => {},
  votesGet: (req, res) => {},
  votePost: (req, res) => {},
  messagesGet: (req, res) => {},
  messagePost: (req, res) => {},
  purchHistoryGet: (req, res) => {},
  deleteUser: (req, res) => {}
  // getUserVotes: (req, res) => {
  //   UserActions
  //     .getUserVotes(req)
  //     .then((votes) => {
  //       console.log(votes)
  //     })
  //     .catch((err) => {
  //       let message = errorHandler.handleMongooseError(err)
  //       console.log(message)
  //     })
  // },
  // pushVote: (user, vote) => {
  //   UserActions
  //     .pushVote(user, vote)
  //     .then((response) => { console.log(response) })
  //     .catch((err) => {
  //       let message = errorHandler.handleMongooseError(err)
  //       console.log(message)
  //     })
  // },  // TODO move to vote-controller
  // getUserComments: (req, res) => {
  //   UserActions
  //     .getUserComments(req)
  //     .then((comments) => {
  //       console.log(comments)
  //     })
  //     .catch((err) => {
  //       let message = errorHandler.handleMongooseError(err)
  //       console.log(message)
  //     })
  // },
  // pushComment: (user, comment) => {
  //   UserActions
  //     .pushComment(user, comment)
  //     .then((response) => { console.log(response) })
  //     .catch((err) => {
  //       let message = errorHandler.handleMongooseError(err)
  //       console.log(message)
  //     })
  // }  //  TODO move to comment-controller
}
