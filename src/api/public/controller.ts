import Food from 'api/foods/model'
import UserUpload from 'api/users/model'
import { saveImages } from 'helpers'
import { getCafeteriaObj } from 'api/kakao/getMessage/getCafeteriaMenu'

export default {
  async read (ctx: any) {
    // GET /public/foods/:id
    try {
      const id = ctx.params.id
      let food = (id.length > 7 ? await Food.read(id) : await Food.readShortId(id)).toObject()
      food.menu = food.menu ? food.menu.split(',') : food.menu
      ctx.body = food
    } catch (e) {
      console.log('[Error] GET /public/foods/:id', e)
      ctx.status = 404
      ctx.body = { error: '식당이 없어요' }
    }
  },
  async updateImage (ctx: any) {
    // POST /public/image
    try {
      const { fields, files } = ctx.request.body
      const { id, name } = fields
      const images = await saveImages(files)
      ctx.body = await UserUpload.create({ to: id, name, images })
    } catch (e) {
      console.log('[Error] POST /public/image', e)
    }
  },
  async random (ctx: any) {
    console.log(Food.random)
    const random = await Food.random()
    const food: any = {}
    Object.assign(food, random)
    food.menu = random.menu ? random.menu.split(',') : random.menu
    console.log(food)
    ctx.body = food
  },
  async hufs (ctx: any) {
    const [ inLunch, kyoLunch, inDinner, kyoDinner ] =
      await Promise.all([getCafeteriaObj('인문관 점심'), getCafeteriaObj('교수회관 점심'), getCafeteriaObj('인문관 저녁'), getCafeteriaObj('교수회관 저녁')])
    ctx.body = [[inLunch, kyoLunch], [inDinner, kyoDinner]]
    // ctx.body = {
    //   lunch: {
    //     inmun: inLunch,
    //     kyosu: kyoLunch
    //   },
    //   dinner: {
    //     inmun: inDinner,
    //     kyosu: kyoDinner
    //   }}
  }
}
