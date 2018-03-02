import * as Router from 'koa-router'
import controller from './controller'

const router = new Router()

router.get('/images', controller.readUserimages)

router.post('/images/:id', controller.saveUserImage)

router.delete('/images/:id', controller.deleteUserImage)

export default router.routes()
