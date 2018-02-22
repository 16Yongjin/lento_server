const mongoose = require('mongoose')
const { Schema } = mongoose

const UrlSchema = new Schema({
  shortUrl: {
    type: String,
    required: [true, 'Enter short url']
  },
  longUrl: String
})

const Url = mongoose.model('url', UrlSchema)

module.exports = Url
