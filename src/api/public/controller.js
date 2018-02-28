const Food = require('api/foods/model')
const UserUpload = require('api/users/model')
const { saveImages } = require('helpers')

module.exports = {
  async read (ctx) {
    // GET /public/foods/:id
    try {
      const id = ctx.params.id
      const food = id.length > 7 ? await Food.read(id) : await Food.readShortId(id)
      food.menu = food.menu ? food.menu.split(',') : food.menu
      console.log(food)
      ctx.body = food
    } catch (e) {
      console.log('[Error] GET /public/foods/:id', e)
      ctx.status = 404
      ctx.body = { error: '식당이 없어요' }
    }
  },
  async updateImage (ctx) {
    try {

      // POST /public/image
      const { fields, files } = ctx.request.body
      const { id, name } = fields
      console.log(ctx.request.body)
      const images = await saveImages(files)
      ctx.body = await UserUpload.create({ to: id, name, images })
    } catch (e) {
      console.log('[Error] POST /public/image', e)
    }
  },
  async random (ctx) {
    const food = await Food.random()
    food.menu = food.menu ? food.menu.split(',') : food.menu
    ctx.body = food
  }
}
