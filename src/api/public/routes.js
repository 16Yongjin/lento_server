const router = require('koa-router')()
const controller = require('./controller')

router.get('/foods/random', controller.random)

router.get('/foods/:id', controller.read)

router.post('/images', controller.updateImage)

module.exports = router.routes()