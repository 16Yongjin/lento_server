"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("config");
exports.default = {
    get: (key) => {
        return process.env[key] || config_1.default[key];
    }
};
//# sourceMappingURL=index.js.map