const Food = require('api/foods/model')
const UserUpload = require('api/users/model')
const { saveImages } = require('helpers')

module.exports = {
  async read (ctx) {
    // GET /public/foods/:id
    const id = ctx.params.id
    ctx.body = id.length > 7 ? await Food.read(id) : await Food.readShortId(id)
  },
  async updateImage (ctx) {
    // POST /public/image
    const { fields, files } = ctx.request.body
    const { id, name } = fields
    console.log(ctx.request.body)
    const images = await saveImages(files)
    ctx.body = await UserUpload.create({ to: id, name, images })
  },
  async random (ctx) {
    ctx.body = await Food.random()
  }
}
