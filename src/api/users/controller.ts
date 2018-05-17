import { UserUpload } from 'api/users/model'
import { adminGuard, deleteImageFile, getId } from 'helpers'
import * as fs from 'mz/fs'

const controller = {
  async logs (ctx: any) {
    ctx.body = await fs.readFile('./access.log')
  },
  async readUserimages (ctx: any) {
    ctx.body = await UserUpload.read()
  },
  async saveUserImage (ctx: any) {
    // POST /users/Image/:id
    const id = getId(ctx)
    const { image, to } = ctx.request.body
    console.log(id, image, to)
    ctx.body = await UserUpload.saveImage(id, image, to)
  },
  async deleteUserImage (ctx: any) {
    const id = getId(ctx)
    const image = ctx.query.image

    await deleteImageFile(image)
    ctx.body = await UserUpload.deleteImage(id, image)
  }
}

export default adminGuard(controller)
