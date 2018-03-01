const router = require('koa-router')()
const getMessage = require('./getMessage')
const keyboard = require('./getMessage/keyboard')

router.get('/keyboard', ctx => {
  ctx.body = keyboard
})

router.post('/message', async ctx => {
  const { user_key, type, content } = ctx.request.body

  // if (!(user_key && type && content)) {
  //     ctx.body = { error: 'invalid request' }
  //     return console.log('[error] invalid request', { user_key, type, content })
  // }
  console.log(content)
  ctx.body = await getMessage(content)
});

module.exports = router.routes()