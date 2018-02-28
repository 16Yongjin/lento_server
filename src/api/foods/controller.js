const Food = require('api/foods/model')
const { adminGuard, saveImages, deleteImageFile } = require('helpers')

const controller = {
  async readAll (ctx) {
    // GET /foods/
    console.log('readAll')
    
    ctx.body = await Food.read()
  },
  async read (ctx) {
    // GET /foods/:id
    console.log(ctx.state.user)
    const id = ctx.params.id  
    ctx.body = await Food.read(id)
  },
  async create (ctx) {
    // POST /foods/
    const { files, data } = ctx.request.body
    if (files)
      data.images = await saveImages(files) 
    ctx.body = Food.create(data)
  },
  async update (ctx) {
    // POST /foods/:id
    const id = ctx.params.id
    const { data = {} } = ctx.request.body
    ctx.body = await Food.update(id, data)
  },
  async updateImage (ctx) {
    // POST /foods/images/:id
    const id = ctx.params.id
    const files = ctx.request.body.files
    const images = await saveImages(files)
    ctx.body = await Food.updateImages(id, images)
  },
  async delete (ctx) {
    // DELETE /foods/:id
    const id = ctx.params.id
    ctx.body = await Food.delete(id)
  },
  async deleteImage (ctx) {
    // DELETE /foods/images/:id
    const id = ctx.params.id
    const image = ctx.query.image
    console.log(id, image)
    await deleteImageFile(image)
    ctx.body = await Food.deleteImage(id, image)
  },
  async search (ctx) {
    const query = ctx.query.q
    const type = ctx.query.type
    if (query.length < 2) 
      return ctx.body = { error: '두 글자 이상 입력해주세요' }
    ctx.body = await Food.search(query, type)

  }
}

module.exports = adminGuard(controller)
