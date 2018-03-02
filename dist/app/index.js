"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* =======================
    LOAD THE DEPENDENCIES
========================== */
const Koa = require("koa");
const routing_1 = require("routing");
const bodyParser = require("koa-body");
const logger = require("koa-morgan");
const cors = require("koa2-cors");
const serve = require("koa-static");
const mount = require("koa-mount");
const database = require("database");
const jwt = require("koa-jwt");
const configuration_1 = require("configuration");
const swagger = require('koa2-swagger-ui');
const responseTime = require('koa-response-time');
const secret = configuration_1.default.get('SECRET');
/* =====================
    KOA CONFIGURATION
======================== */
const app = new Koa();
app.use(cors());
app.use(bodyParser({
    formidable: { uploadDir: './src/uploads' },
    multipart: true,
    json: true
}));
app.use(swagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        url: '/docs'
    }
}));
app.use(jwt({ secret }).unless({
    path: ['/auth/login', '/auth/register', /^\/kakao/, /^\/public/, '/swagger', /^\/docs/]
}));
app.use(logger('combined'));
app.use(responseTime());
app.use(mount('/public/images', serve('./src/uploads')));
app.use(routing_1.default.routes());
app.use(ctx => { ctx.type = 'json'; });
/* =====================================
    CONNECT TO MONGODB AND START SERVER
========================================*/
exports.start = async () => {
    try {
        await database.connect();
        console.log('Connected to database');
        const port = 3000;
        return app.listen(port, () => {
            console.log(`Connected on port ${port}`);
        });
    }
    catch (error) {
        console.log('Something went wrong');
    }
};
exports.default = app;
//# sourceMappingURL=index.js.map