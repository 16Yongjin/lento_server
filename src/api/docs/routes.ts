import * as Router from 'koa-router'
import { readFile } from 'mz/fs'

const router = new Router()

router.get('/', async ctx => {
  ctx.body = await readFile('src/api/docs/api.yml')
})

export default router.routes()
