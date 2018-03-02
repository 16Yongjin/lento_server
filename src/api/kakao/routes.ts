import * as Router from 'koa-router'
import getMessage from './getMessage'
import keyboard from './getMessage/keyboard'

const router = new Router()

router.get('/keyboard', ctx => {
  ctx.body = keyboard
})

router.post('/message', async (ctx: any) => {
  const { user_key, type, content } = ctx.request.body
  // if (!(user_key && type && content)) {
  //   ctx.body = { error: 'invalid request' }
  //   return console.log('[error] invalid request', { user_key, type, content })
  // }
  console.log(content)
  ctx.body = await getMessage(content)
})

export default router.routes()
