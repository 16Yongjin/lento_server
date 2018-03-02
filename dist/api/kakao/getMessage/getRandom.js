"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("api/foods/model");
const keyboard_1 = require("./keyboard");
const getRandom = async () => {
    try {
        const { _id, name, type, time, menu } = await model_1.default.randomShortId();
        const message = {
            text: `${name} ${type ? `(${type})` : ''}

      ${time ? `영업시간: ${time}` : ''}
      ${menu ? `메뉴: ${menu}` : ''}
      https://lento.in/foods/${_id}`
                .split('\n').map(s => s.trim()).join('\n').replace(/\n{3,}/g, '\n\n')
        };
        return { message, keyboard: keyboard_1.default };
    }
    catch (e) {
        console.log('getRandom', e);
        return { error: '에러. ㅎㅎ;; ㅈㅅ.. ㅋㅋ!!' };
    }
};
exports.default = getRandom;
//# sourceMappingURL=getRandom.js.map