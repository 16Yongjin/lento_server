"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const fs_1 = require("mz/fs");
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = await fs_1.readFile('src/api/docs/api.yml');
});
exports.default = router.routes();
//# sourceMappingURL=routes.js.map