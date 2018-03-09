"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("api/foods/model");
const model_2 = require("api/users/model");
const helpers_1 = require("helpers");
const getCafeteriaMenu_1 = require("api/kakao/getMessage/getCafeteriaMenu");
exports.default = {
    async read(ctx) {
        // GET /public/foods/:id
        try {
            const id = ctx.params.id;
            let food = (id.length > 7 ? await model_1.default.read(id) : await model_1.default.readShortId(id)).toObject();
            food.menu = food.menu ? food.menu.split(',') : food.menu;
            ctx.body = food;
        }
        catch (e) {
            console.log('[Error] GET /public/foods/:id', e);
            ctx.status = 404;
            ctx.body = { error: '식당이 없어요' };
        }
    },
    async updateImage(ctx) {
        // POST /public/image
        try {
            const { fields, files } = ctx.request.body;
            const { id, name } = fields;
            const images = await helpers_1.saveImages(files);
            ctx.body = await model_2.default.create({ to: id, name, images });
        }
        catch (e) {
            console.log('[Error] POST /public/image', e);
        }
    },
    async random(ctx) {
        console.log(model_1.default.random);
        const random = await model_1.default.random();
        const food = {};
        Object.assign(food, random);
        food.menu = random.menu ? random.menu.split(',') : random.menu;
        console.log(food);
        ctx.body = food;
    },
    async hufs(ctx) {
        const [inLunch, kyoLunch, inDinner, kyoDinner] = await Promise.all([getCafeteriaMenu_1.getCafeteriaObj('인문관 점심'), getCafeteriaMenu_1.getCafeteriaObj('교수회관 점심'), getCafeteriaMenu_1.getCafeteriaObj('인문관 저녁'), getCafeteriaMenu_1.getCafeteriaObj('교수회관 저녁')]);
        const menus = [
            {
                time: '점심',
                inmun: inLunch,
                kyosu: kyoLunch
            },
            {
                time: '저녁',
                inmun: inDinner,
                kyosu: kyoDinner
            }
        ];
        ctx.body = menus;
    }
};
//# sourceMappingURL=controller.js.map