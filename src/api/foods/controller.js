const Food = require('./model')

module.exports = {
  read (id) {
    if (id) 
      return Food.findById(id)
    else
      return Food.find()
  },
  create (data) {
    return Food.create(data)
  },
  async update (id, data) {
    await Food.findByIdAndUpdate(id, data)
    return Food.findById(id)
  },
  async updateImages (id, imagePaths) {
    await Food.findByIdAndUpdate(id, { 
      $push: { images: { $each: imagePaths } }
    })
    return Food.findById(id)
  },
  delete (id) {
    return Food.findByIdAndRemove(id)
  },
  async deleteImage (id, imagesPath) {
    await Food.findByIdAndUpdate(id, { 
      $pull: { images: imagesPath }
    })
    return Food.findById(id)
  },
  random () {
    return Food.aggregate().sample(1).exec().then(r => r[0])
  }
}

