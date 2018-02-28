const mongoose = require('mongoose')
const Food = require('api/foods/model')
const { Schema } = mongoose

const UserUpload = new Schema({ 
  to: String,
  name: String,
  images: {
    type: [String],
    required: true
  }
})

UserUpload.statics.read = function (id) {
  if (id) 
    return this.findById(id)
  else
    return this.find({})
}

UserUpload.statics.saveImage = async function (id, image, to) {
  await this.findByIdAndUpdate(id, { 
    $pull: { images: image }
  })
  await Food.updateImages(to, image)
  return this.findById(id)
}

UserUpload.statics.deleteImage = async function (id, image) {
  await this.findByIdAndUpdate(id, { 
    $pull: { images: image }
  })
  const userUpload = await this.findById(id)
  if (userUpload.images.length > 0)
    return userUpload

  await this.findByIdAndRemove(id)
  return null
}

module.exports = mongoose.model('UserUpload', UserUpload)
