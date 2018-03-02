"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const configuration_1 = require("configuration");
mongoose.Promise = global.Promise;
const url = configuration_1.default.get('MONGO_URL');
const db = configuration_1.default.get('MONGO_DATABASE_NAME');
exports.connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(`${url}/${db}`, {
            useMongoClient: true
        })
            .then(() => console.log(''))
            .catch(e => console.log(e));
        const connection = mongoose.connection;
        connection.on('error', reject);
        connection.once('open', resolve);
    });
};
//# sourceMappingURL=index.js.map