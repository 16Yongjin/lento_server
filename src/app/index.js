const Koa = require('koa')
const router = require('routing')
const bodyParser = require('koa-body')
const logger = require('koa-morgan')
const responseTime = require('koa-response-time')
const cors = require('koa2-cors')
const serve = require('koa-static')
const database = require('database')

const app = new Koa()
app.use(cors())
app.use(responseTime())
app.use(logger('combined'))
app.use(bodyParser({
  formidable: {uploadDir: './src/uploads'},
  multipart: true,
  json: true
}))
app.use(serve('./src/uploads'))
app.use(router.routes())
app.use(ctx => { ctx.type = 'json' })

exports.start = async () => {
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

exports.app = app


