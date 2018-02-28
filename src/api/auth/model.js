const mongoose = require('mongoose')
const { Schema } = mongoose
const crypto = require('crypto')
const config = require('configuration')

const encrypt = (password) => {
  return crypto
    .createHmac('sha1', config.get('HASH_KEY'))
    .update(password)
    .digest('base64')
}

const User = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  create_on: {
    type: Date,
    default: Date.now
  },
  admin: { 
    type: Boolean, 
    default: false 
  }
})

User.statics.create = function (username, password) {
  password = encrypt(password)
  const user = new this({ username, password })
  return user.save()
}

User.statics.findOneByUsername = function (username) {
  return this.findOne({ username }).exec()
}

User.statics.getCount = function (username) {
  return this.count({}).exec()
}

// verify the password of the User documment
User.methods.verify = function(password) {
  return this.password === encrypt(password)
}

User.methods.assignAdmin = function() {
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('User', User)
