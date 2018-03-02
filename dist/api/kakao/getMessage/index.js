"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRandom_1 = require("./getRandom");
const getCafeteriaMenu_1 = require("./getCafeteriaMenu");
exports.default = async (content) => {
    switch (content) {
        case '식당 추천':
            return getRandom_1.default();
        case '학식':
            return getCafeteriaMenu_1.cafeteriaKeyboard;
        case '인문관 점심':
        case '인문관 저녁':
        case '교수회관 점심':
        case '교수회관 저녁':
            return getCafeteriaMenu_1.getCafeteriaMessage(content);
    }
};
//# sourceMappingURL=index.js.map