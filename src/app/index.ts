/* =======================
    LOAD THE DEPENDENCIES
========================== */
import * as Koa from 'koa'
import router from 'routing'
import * as bodyParser from 'koa-body'
import * as logger from 'koa-morgan'
import * as cors from 'koa2-cors'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'
import * as database from 'database'
import * as jwt from 'koa-jwt'
import config from 'configuration'
import * as fs from 'fs'
const accessLogStream = fs.createWriteStream(`./access.log`, { flags: 'a' })

const swagger = require('koa2-swagger-ui')
const responseTime = require('koa-response-time')
const secret = config.get('SECRET')
/* =====================
    KOA CONFIGURATION
======================== */
const app = new Koa()
app.use(cors())
app.use(bodyParser({
  formidable: { uploadDir: './src/uploads' },
  multipart: true,
  json: true
}))
app.use(swagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/docs'
  }
}))
app.use(jwt({ secret }).unless({
  path: ['/auth/login', '/auth/register', /^\/kakao/, /^\/public/, '/swagger', /^\/docs/]
}))
app.use(logger('combined', { stream: accessLogStream }))
app.use(responseTime())
app.use(mount('/public/maps', serve('./src/maps')))
app.use(mount('/public/images', serve('./src/uploads')))
app.use(router.routes())
app.use(ctx => { ctx.type = 'json' })

/* =====================================
    CONNECT TO MONGODB AND START SERVER
========================================*/
export const start = async () => {
  try {
    await database.connect()
    console.log('Connected to database')
    const port = 3000
    return app.listen(port, () => {
      console.log(`Connected on port ${port}`)
    })
  } catch (error) {
    console.log('Something went wrong')
  }
}

export default app
