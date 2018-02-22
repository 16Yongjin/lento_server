const Url = require('./model')

module.exports = {
  find (longUrl) {
    return Url.find({ longUrl }).then(urls => urls[0])
  },
  add (shortUrl, longUrl) {
    console.log('add', shortUrl, longUrl)
    return Url.create({ shortUrl, longUrl })
  }
}

