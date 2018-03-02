import Food from 'api/foods/model'
import { adminGuard, saveImages, deleteImageFile } from 'helpers'

const controller = {
  async readAll (ctx: any) {
    // GET /foods/
    console.log('readAll')

    ctx.body = await Food.read()
  },
  async read (ctx: any) {
    // GET /foods/:id
    console.log(ctx.state.user)
    const id = ctx.params.id
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
    const id = ctx.params.id
    const { data = {} } = ctx.request.body
    ctx.body = await Food.updateFood(id, data)
  },
  async updateImage (ctx: any) {
    // POST /foods/images/:id
    const id = ctx.params.id
    const files = ctx.request.body.files
    const images = await saveImages(files)
    ctx.body = await Food.updateImages(id, images)
  },
  async delete (ctx: any) {
    // DELETE /foods/:id
    const id = ctx.params.id
    ctx.body = await Food.delete(id)
  },
  async deleteImage (ctx: any) {
    // DELETE /foods/images/:id
    const id = ctx.params.id
    const image = ctx.query.image
    console.log(id, image)
    await deleteImageFile(image)
    ctx.body = await Food.deleteImage(id, image)
  },
  async search (ctx: any) {
    const query = ctx.query.q
    const type = ctx.query.type
    ctx.body = (query.length < 2) ?
      { error: '두 글자 이상 입력해주세요' } :
      await Food.search(query, type)
  }
}

export default adminGuard(controller)
