import * as Router from 'koa-router'
import controller from './controller'
const router = new Router()

export default router

  .get('/images', controller.readUserimages)

  .post('/images/:id', controller.saveUserImage)

  .delete('/images/:id', controller.deleteUserImage)

  .routes()
