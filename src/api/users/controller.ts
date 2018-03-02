import { UserUpload } from 'api/users/model'
import { adminGuard, deleteImageFile } from 'helpers'

const controller = {
  async readUserimages (ctx: any) {
    ctx.body = await UserUpload.read()
  },
  async saveUserImage (ctx: any) {
    // POST /users/Image/:id
    const id = ctx.params.id
    const { image, to } = ctx.request.body
    console.log(id, image, to)
    ctx.body = await UserUpload.saveImage(id, image, to)
  },
  async deleteUserImage (ctx: any) {
    const id = ctx.params.id
    const image = ctx.query.image

    await deleteImageFile(image)
    ctx.body = await UserUpload.deleteImage(id, image)
  }
}

export default adminGuard(controller)
