"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("./controller");
const router = new Router();
router.get('/foods/random', controller_1.default.random);
router.get('/foods/:id', controller_1.default.read);
router.post('/images', controller_1.default.updateImage);
exports.default = router.routes();
//# sourceMappingURL=routes.js.map