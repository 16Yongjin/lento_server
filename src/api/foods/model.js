const mongoose = require('mongoose')
const { Schema } = mongoose

const FoodSchema = new Schema({
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

const Food = mongoose.model('food', FoodSchema)

module.exports = Food
