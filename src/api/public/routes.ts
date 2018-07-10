import * as Router from 'koa-router'
import controller from './controller'

const router = new Router()

export default router

  .get('/foods/random', controller.random)

  .get('/type/:type/:page', controller.paginagteType)

  .get('/type/:type', controller.readType)

  .get('/foods/randomWithImage', controller.randomWithImage)

  .get('/foods/:id', controller.read)

  .get('/hufs', controller.hufs)

  .post('/images', controller.updateImage)

  .routes()
