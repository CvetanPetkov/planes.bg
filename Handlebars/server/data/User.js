const mongoose = require('mongoose')
const types = mongoose.Schema.Types
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!'

let userSchema = new mongoose.Schema({
  firstName: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  lastName: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  company: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  location: {
    type: types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  avatar: {
    type: types.String,
    default: '/avatars/avatar-default1.png'
  },
  ratings: [{  //  Ratings sent for articles
    type: types.ObjectId,
    ref: 'Rating'
  }],
  comments: [{  //  Comments sent for articles
    type: types.ObjectId,
    ref: 'Comment'
  }],
  votesSend: [{  //  Votes sent for users
    type: types.ObjectId,
    ref: 'Vote'
  }],
  votesReceived: [{  //  Votes received from other users
    type: types.ObjectId,
    ref: 'Vote'
  }],
  messagesSent: [{
    type: types.ObjectId,
    ref: 'Message'
  }],
  messagesReceived: [{
    type: types.ObjectId,
    ref: 'Message'
  }],
  articlesToSell: [{
    type: types.ObjectId,
    ref: 'Article'
  }],
  shoppingCart: [{
    type: types.ObjectId,
    ref: 'Article'
  }],
  purchaseHistory: [{
    type: types.ObjectId,
    ref: 'Article'
  }],
  salt: types.String,
  hashedPass: types.String,
  roles: [types.String]
}, {timestamps: true})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

// userSchema.statics.create = function (userObj) {
//   return this.create(userObj)
// }

userSchema.query.getUser = function (user) {
  return this.findOne(user)
}

userSchema.query.getRefElement = function (user, ref) {
  return this.findOne(user).populate(ref)
}

// userSchema.statics.update = function (query, userObj) {
//   return this.findOneAndUpdate(query, userObj)
// }

// userSchema.statics.deleteUser = function (user) {
//   return this.findOneAndRemove(user)
// }

userSchema.statics.pushRefElement = function (user, refName, refEl) {
  return this.findOne(user)
    .then((user) => {
      user[refName].push(refEl)
      user.save()
    })
}

userSchema.statics.deleteRefElement = function (user, refName, refEl) {
  return this.findOne(user)
    .then((user) => {
      user[refName].pull(refEl)
      user.save()
    })
}

let User = mongoose.model('User', userSchema)

module.exports = User

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, '11')

    User.create({
      firstName: 'Admin',
      lastName: 'Admin',
      location: 'Admin',
      company: 'Admin',
      salt: salt,
      hashedPass: hashedPass,
      roles: ['Admin']
    })
  })
}
