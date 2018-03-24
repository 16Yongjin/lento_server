import * as Router from 'koa-router'
import controller from 'api/foods/controller'
const router = new Router()

export default router

  .get('/search', controller.search) // search name

  .get('/', controller.readAll) // read items

  .get('/:id', controller.read) // read item

  .post('/', controller.create) // create item

  .post('/:id', controller.update) // update item

  .delete('/:id', controller.delete) // delete item

  .post('/images/:id', controller.updateImage) // update images

  .delete('/images/:id', controller.deleteImage) // delete image

  .routes()
