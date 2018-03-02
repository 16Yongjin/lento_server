"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const configuration_1 = require("configuration");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: String,
    password: {
        type: String,
        required: true
    },
    create_on: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
});
const encrypt = (password) => {
    return crypto
        .createHmac('sha1', configuration_1.default.get('HASH_KEY'))
        .update(password)
        .digest('base64');
};
UserSchema.statics.createUser = function (username, password) {
    password = encrypt(password);
    const user = new this({ username, password });
    return user.save();
};
UserSchema.statics.findOneByUsername = function (username) {
    return this.findOne({ username }).exec();
};
UserSchema.statics.getCount = function () {
    return this.count({}).exec();
};
// verify the password of the User documment
UserSchema.methods.verify = function (password) {
    return this.password === encrypt(password);
};
UserSchema.methods.assignAdmin = function () {
    this.admin = true;
    return this.save();
};
exports.User = mongoose_1.model('User', UserSchema);
exports.default = exports.User;
//# sourceMappingURL=model.js.map