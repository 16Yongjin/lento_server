"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const getMessage_1 = require("./getMessage");
const keyboard_1 = require("./getMessage/keyboard");
const router = new Router();
router.get('/keyboard', ctx => {
    ctx.body = keyboard_1.default;
});
router.post('/message', async (ctx) => {
    const { user_key, type, content } = ctx.request.body;
    if (!(user_key && type && content)) {
        ctx.body = { error: 'invalid request' };
        return console.log('[error] invalid request', { user_key, type, content });
    }
    console.log(content);
    ctx.body = await getMessage_1.default(content);
});
exports.default = router.routes();
//# sourceMappingURL=routes.js.map