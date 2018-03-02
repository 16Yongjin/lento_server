"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_1 = require("api/foods/model");
exports.UserUploadSchema = new mongoose_1.Schema({
    to: String,
    name: String,
    images: {
        type: [String],
        required: true
    }
});
exports.UserUploadSchema.statics.read = function (id) {
    return id ? this.findById(id) : this.find({});
};
exports.UserUploadSchema.statics.saveImage = async function (id, image, to) {
    await this.findByIdAndUpdate(id, {
        $pull: { images: image }
    });
    await model_1.default.updateImages(to, [image]);
    return this.findById(id);
};
exports.UserUploadSchema.statics.deleteImage = async function (id, image) {
    await this.findByIdAndUpdate(id, {
        $pull: { images: image }
    });
    const userUpload = await this.findById(id);
    if (userUpload.images.length > 0) {
        return userUpload;
    }
    await this.findByIdAndRemove(id);
    return null;
};
exports.UserUpload = mongoose_1.model('UserUpload', exports.UserUploadSchema);
exports.default = exports.UserUpload;
//# sourceMappingURL=model.js.map