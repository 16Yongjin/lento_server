const router = require('koa-router')()
const controller = require('api/foods/controller')

// search name
router.get('/search', controller.search)

// read items
router.get('/', controller.readAll)

// read item
router.get('/:id', controller.read)

// create item
router.post('/', controller.create)

// update item
router.post('/:id', controller.update)

// update images
router.post('/images/:id', controller.updateImage)

// delete item
router.delete('/:id', controller.delete)

// delete image
router.delete('/images/:id', controller.deleteImage)


module.exports = router.routes()
