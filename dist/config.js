"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    'MONGO_DATABASE_NAME': 'lento_dev',
    'MONGO_URL': 'mongodb://localhost:27017',
    'HASH_KEY': '13refds7ujwedf',
    'SECRET': 'SeCrEtKeYfOrHaShIn',
    'JWT_OPTIONS': {
        'expiresIn': '7d',
        'issuer': 'lento.in',
        'subject': 'userInfo'
    }
};
exports.default = exports.config;
//# sourceMappingURL=config.js.map