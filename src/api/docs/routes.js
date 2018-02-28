const router = require('koa-router')()
const fs = require('mz/fs')

router.get('/', async ctx => {
  ctx.body = await fs.readFile('src/api/docs/api.yml')
})

module.exports = router.routes()
