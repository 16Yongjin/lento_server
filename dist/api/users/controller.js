"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("api/users/model");
const helpers_1 = require("helpers");
const controller = {
    async readUserimages(ctx) {
        ctx.body = await model_1.UserUpload.read();
    },
    async saveUserImage(ctx) {
        // POST /users/Image/:id
        const id = ctx.params.id;
        const { image, to } = ctx.request.body;
        console.log(id, image, to);
        ctx.body = await model_1.UserUpload.saveImage(id, image, to);
    },
    async deleteUserImage(ctx) {
        const id = ctx.params.id;
        const image = ctx.query.image;
        await helpers_1.deleteImageFile(image);
        ctx.body = await model_1.UserUpload.deleteImage(id, image);
    }
};
exports.default = helpers_1.adminGuard(controller);
//# sourceMappingURL=controller.js.map