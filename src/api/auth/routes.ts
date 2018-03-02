import * as Router from 'koa-router'
import controller from './controller'

const router = new Router()

router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('/check', controller.check)

export default router.routes()
