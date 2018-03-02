"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("api/foods/model");
const helpers_1 = require("helpers");
const controller = {
    async readAll(ctx) {
        // GET /foods/
        console.log('readAll');
        ctx.body = await model_1.default.read();
    },
    async read(ctx) {
        // GET /foods/:id
        console.log(ctx.state.user);
        const id = ctx.params.id;
        ctx.body = await model_1.default.read(id);
    },
    async create(ctx) {
        // POST /foods/
        const { files, data } = ctx.request.body;
        if (files) {
            data.images = await helpers_1.saveImages(files);
        }
        ctx.body = model_1.default.create(data);
    },
    async update(ctx) {
        // POST /foods/:id
        const id = ctx.params.id;
        const { data = {} } = ctx.request.body;
        ctx.body = await model_1.default.updateFood(id, data);
    },
    async updateImage(ctx) {
        // POST /foods/images/:id
        const id = ctx.params.id;
        const files = ctx.request.body.files;
        const images = await helpers_1.saveImages(files);
        ctx.body = await model_1.default.updateImages(id, images);
    },
    async delete(ctx) {
        // DELETE /foods/:id
        const id = ctx.params.id;
        ctx.body = await model_1.default.delete(id);
    },
    async deleteImage(ctx) {
        // DELETE /foods/images/:id
        const id = ctx.params.id;
        const image = ctx.query.image;
        console.log(id, image);
        await helpers_1.deleteImageFile(image);
        ctx.body = await model_1.default.deleteImage(id, image);
    },
    async search(ctx) {
        const query = ctx.query.q;
        const type = ctx.query.type;
        ctx.body = (query.length < 2) ?
            { error: '두 글자 이상 입력해주세요' } :
            await model_1.default.search(query, type);
    }
};
exports.default = helpers_1.adminGuard(controller);
//# sourceMappingURL=controller.js.map