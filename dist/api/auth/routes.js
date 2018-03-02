"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller_1 = require("./controller");
const router = new Router();
router.post('/register', controller_1.default.register);
router.post('/login', controller_1.default.login);
router.get('/check', controller_1.default.check);
exports.default = router.routes();
//# sourceMappingURL=routes.js.map