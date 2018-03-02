"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const routes_1 = require("api/auth/routes");
const routes_2 = require("api/foods/routes");
const routes_3 = require("api/kakao/routes");
const routes_4 = require("api/public/routes");
const routes_5 = require("api/users/routes");
const routes_6 = require("api/docs/routes");
const router = new Router();
router.use('/docs', routes_6.default);
router.use('/public', routes_4.default);
router.use('/users', routes_5.default);
router.use('/auth', routes_1.default);
router.use('/foods', routes_2.default);
router.use('/kakao', routes_3.default);
exports.default = router;
//# sourceMappingURL=index.js.map