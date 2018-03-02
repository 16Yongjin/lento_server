"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("./controller");
const router = new Router();
router.get('/images', controller_1.default.readUserimages);
router.post('/images/:id', controller_1.default.saveUserImage);
router.delete('/images/:id', controller_1.default.deleteUserImage);
exports.default = router.routes();
//# sourceMappingURL=routes.js.map