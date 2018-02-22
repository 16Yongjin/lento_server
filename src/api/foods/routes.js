const router = require('koa-router')()
const controller = require('./controller')
const { saveImages, deleteImageFile } = require('helpers')

// read items
router.get('/', async ctx => {
  ctx.body = await controller.read()
})

// read items
router.get('/:id', async ctx => {
  const id = ctx.params.id  
  ctx.body = await controller.read(id)
})

// create item
router.post('/', async ctx => {
  const { files, data } = ctx.request.body
  if (files)
    data.images = await saveImages(files) 
  ctx.body = controller.create(data)
})

// update item
router.post('/:id', async ctx => {
  const id = ctx.params.id
  const { data = {} } = ctx.request.body
  ctx.body = await controller.update(id, data)
})

// update images
router.post('/images/:id', async ctx => {
  const id = ctx.params.id
  const files = ctx.request.body.files
  const imagePaths = await saveImages(files)
  ctx.body = await controller.updateImages(id, imagePaths)
})

// delete item
router.delete('/:id', async ctx => {
  const id = ctx.params.id
  ctx.body = await controller.delete(id)
})

// delete image
router.delete('/images/:id', async ctx => {
  const id = ctx.params.id
  const image = ctx.query.image
  console.log(id, image)
  await deleteImageFile(image)
  ctx.body = await controller.deleteImage(id, image)
})

module.exports = router.routes()
