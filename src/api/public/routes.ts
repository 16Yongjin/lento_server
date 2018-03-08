import * as Router from 'koa-router'
import controller from './controller'

const router = new Router()

router.get('/foods/random', controller.random)

router.get('/foods/:id', controller.read)

router.get('/hufs', controller.hufs)

router.post('/images', controller.updateImage)

export default router.routes()
