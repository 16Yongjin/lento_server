const mongoose = require('mongoose')
const { Schema } = mongoose

const Food = new Schema({
  name: {
      type: String,
      required: [true, '음식점 이름을 입력해주세요.']
    },
  type: String,
  time: String,
  menu: String,
  lat: Number,
  lng: Number,
  images: {
    type: [String],
    default: []
  }
})

Food.statics.read = function (id) {
  if (id) 
    return this.findById(id)
  else
    return this.find()
}

Food.statics.update = async function (id, data) {
  await this.findByIdAndUpdate(id, data)
  return this.findById(id)
}

Food.statics.updateImages = async function (id, imagePaths) {
  imagePaths = Array.isArray(imagePaths) ? imagePaths : [imagePaths]
  await this.findByIdAndUpdate(id, { 
    $push: { images: { $each: imagePaths } }
  })
  return this.findById(id)
}

Food.statics.delete = function (id) {
  return this.findByIdAndRemove(id)
}

Food.statics.deleteImage = async function (id, imagesPath) {
  await this.findByIdAndUpdate(id, { 
    $pull: { images: imagesPath }
  })
  return this.findById(id)
}

Food.statics.random = function () {
  return this.aggregate().sample(1).exec().then(r => r[0])
}

Food.statics.search = function (query, type = 'name') {
  return this.find({ [type]: { $regex: new RegExp(query),  $options: 'i' } })
    .limit(10)
    .exec()
}

let IdPrefix = ''
Food.statics.readShortId = async function (shortId) {
  if (!IdPrefix) {
    await this.find({}).then(foods => {
      IdPrefix = foods[0]._id.toString().slice(0, -5) })
    console.log('id prefix is', IdPrefix)
  }

  return this.findById(IdPrefix + shortId)
}

Food.statics.randomShortId = async function () {
  const food = await this.aggregate().sample(1).exec().then(r => r[0])
  food._id = food._id.toString().slice(-5)
  return food
}



module.exports = mongoose.model('food', Food)
