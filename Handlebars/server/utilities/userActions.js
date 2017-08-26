const encryption = require('../utilities/encryption')
const mongoose = require('mongoose')

const User = mongoose.model('User')

module.exports = {
  create: (req) => {
    let reqUser = req.body

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    if (
      reqUser.firstName.length < 1 &&
      reqUser.lastName.length < 1 &&
      reqUser.company.length < 1
    ) {
      let err = 'You must fill at least one of First Name, Last Name or Company'
      return err
    }

    let userObj = {
      firstName: reqUser.firstName ? reqUser.firstName : '',
      lastName: reqUser.lastName ? reqUser.lastName : '',
      company: reqUser.company ? reqUser.company : '',
      location: reqUser.location,
      salt: salt,
      hashedPass: hashedPassword
    }

    if (req.file) {
      userObj.avatar = `/icons/${req.file.filename}`
    }

    return User.create(userObj)
  },
  getUserData: (userQuery) => {
    let userIdentifier = userQuery

    return User.getUserData(userIdentifier)
  },
  update: (req) => {
    let query = req.user._id
    let userData = req.data

    let userObj = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      company: userData.company,
      location: userData.location,
      avatar: userData.avatar
    }

    if (req.file) {
      userObj.avatar = `/icons/${req.file.filename}`
    }

    return User.update(query, userObj)
  },
  delete: (req) => {
    let user = req.user._id

    // TODO note in Messages that the user is deleted
    // TODO delete user Articles

    return User.delete(user)
  },
  getUserVotes: (req) => {
    let userId = req.user._id
    let query = {_id: userId}
    return User.getVotes(query)
  },
  pushVote: (user, vote) => {
    let queryUser = {_id: user._id}
    let voteId = vote._id

    return User.pushVote(queryUser, voteId)
  },
  getUserComments: (req) => {
    let reqUser = {_id: req.user._id}

    return User.getComments(reqUser)
  },
  pushComment: (user, comment) => {
    let queryUser = {_id: user._id}
    let commentId = comment._id

    return User.pushComment(queryUser, commentId)
  }
}
