"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("api/foods/controller");
const router = new Router();
// search name
router.get('/search', controller_1.default.search);
// read items
router.get('/', controller_1.default.readAll);
// read item
router.get('/:id', controller_1.default.read);
// create item
router.post('/', controller_1.default.create);
// update item
router.post('/:id', controller_1.default.update);
// update images
router.post('/images/:id', controller_1.default.updateImage);
// delete item
router.delete('/:id', controller_1.default.delete);
// delete image
router.delete('/images/:id', controller_1.default.deleteImage);
exports.default = router.routes();
//# sourceMappingURL=routes.js.map