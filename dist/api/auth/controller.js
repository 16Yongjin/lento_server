"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const model_1 = require("./model");
const configuration_1 = require("configuration");
const secret = configuration_1.default.get('SECRET');
const jwtOpts = configuration_1.default.get('JWT_OPTIONS');
exports.default = {
    async register(ctx) {
        try {
            const { username, password } = ctx.request.body;
            const existingUser = await model_1.default.findOneByUsername(username);
            if (existingUser) {
                throw new Error('username exists');
            }
            const newUser = await model_1.default.create(username, password);
            const count = await model_1.default.getCount();
            if (count === 1) {
                newUser.assignAdmin();
            }
            ctx.body = { message: 'registered successfully' };
        }
        catch (err) {
            console.log(err);
            ctx.status = 409;
            ctx.body = { message: err.message };
        }
    },
    async login(ctx) {
        try {
            const { username, password } = ctx.request.body;
            const user = await model_1.default.findOneByUsername(username);
            if (!user || !user.verify(password)) {
                throw new Error('login failed');
            }
            const payload = {
                _id: user._id,
                username
            };
            if (user.admin) {
                Object.assign(payload, { admin: true });
            }
            const token = jwt.sign(payload, secret, jwtOpts);
            ctx.body = {
                message: 'logged in successfully',
                token
            };
        }
        catch (err) {
            console.log(err);
            ctx.status = 403;
            ctx.body = { message: err.message };
        }
    },
    async check(ctx) {
        ctx.body = ctx.state.user;
    }
};
//# sourceMappingURL=controller.js.map