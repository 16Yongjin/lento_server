import Food from 'api/foods/model'
import { adminGuard, saveImages, deleteImageFile, getId } from 'helpers'

const controller = {
  async readAll (ctx: any) {
    // GET /foods/
    ctx.body = await Food.read()
  },
  async read (ctx: any) {
    // GET /foods/:id
    const id = getId(ctx)
    ctx.body = await Food.read(id)
  },
  async create (ctx: any) {
    // POST /foods/
    const { files, data } = ctx.request.body
    if (files) {
      data.images = await saveImages(files)
    }
    ctx.body = Food.create(data)
  },
  async update (ctx: any) {
    // POST /foods/:id
    const id = getId(ctx)
    const { data = {} } = ctx.request.body
    ctx.body = await Food.updateFood(id, data)
  },
  async updateImage (ctx: any) {
    // POST /foods/images/:id
    const id = getId(ctx)
    const files = ctx.request.body.files
    const images = await saveImages(files)
    ctx.body = await Food.updateImages(id, images)
  },
  async delete (ctx: any) {
    // DELETE /foods/:id
    const id = getId(ctx)
    ctx.body = await Food.delete(id)
  },
  async deleteImage (ctx: any) {
    // DELETE /foods/images/:id
    const id = getId(ctx)
    const image = ctx.query.image
    await deleteImageFile(image)
    ctx.body = await Food.deleteImage(id, image)
  },
  async search (ctx: any) {
    const { q, type } = ctx.query
    ctx.body = (q.length < 2) ?
      { error: '두 글자 이상 입력해주세요' } :
      await Food.search(q, type)
  }
}

export default adminGuard(controller)
