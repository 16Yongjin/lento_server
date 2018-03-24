import * as Router from 'koa-router'
import controller from './controller'
const router = new Router()

export default router

  .post('/register', controller.register)

  .post('/login', controller.login)

  .get('/check', controller.check)

  .routes()
