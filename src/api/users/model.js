const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  create_on: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
