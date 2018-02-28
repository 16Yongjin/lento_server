const router = require('koa-router')()
const controller = require('./controller')

router.get('/images', controller.readUserimages)

router.post('/images/:id', controller.saveUserImage)

router.delete('/images/:id', controller.deleteUserImage)

module.exports = router.routes()
