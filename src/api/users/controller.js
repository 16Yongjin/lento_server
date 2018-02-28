const Food = require('api/foods/model')
const UserUpload = require('api/users/model')
const { adminGuard, saveImages, deleteImageFile } = require('helpers')

const controller = {
  async readUserimages (ctx) {
    ctx.body = await UserUpload.read()
  },
  async saveUserImage (ctx) {
    // POST /users/Image/:id
    const id = ctx.params.id    
    const { image, to } = ctx.request.body
    console.log(id, image, to)
    ctx.body = await UserUpload.saveImage(id, image, to)
  },
  async deleteUserImage (ctx) {
    const id = ctx.params.id
    const image = ctx.query.image

    await deleteImageFile(image)
    ctx.body = await UserUpload.deleteImage(id, image)
  }
}

module.exports = adminGuard(controller)