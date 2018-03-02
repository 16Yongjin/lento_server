"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.FoodSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, '음식점 이름을 입력해주세요.']
    },
    type: String,
    time: String,
    menu: String,
    lat: Number,
    lng: Number,
    images: {
        type: [String],
        default: []
    }
});
exports.FoodSchema.statics.read = function (id) {
    return id ? this.findById(id) : this.find();
};
exports.FoodSchema.statics.updateFood = async function (id, data) {
    await this.findByIdAndUpdate(id, data);
    return this.findById(id);
};
exports.FoodSchema.statics.updateImages = async function (id, imagePaths) {
    await this.findByIdAndUpdate(id, {
        $push: { images: { $each: imagePaths } }
    });
    return this.findById(id);
};
exports.FoodSchema.statics.delete = function (id) {
    return this.findByIdAndRemove(id);
};
exports.FoodSchema.statics.deleteImage = async function (id, imagesPath) {
    await this.findByIdAndUpdate(id, {
        $pull: { images: imagesPath }
    });
    return this.findById(id);
};
exports.FoodSchema.statics.random = function () {
    return this.aggregate().sample(1).exec().then((r) => r[0]);
};
exports.FoodSchema.statics.search = function (query, type = 'name') {
    return this.find({ [type]: { $regex: new RegExp(query), $options: 'i' } })
        .limit(10)
        .exec();
};
let IdPrefix = '';
exports.FoodSchema.statics.readShortId = async function (shortId) {
    if (!IdPrefix) {
        await this.find({}).then((foods) => {
            IdPrefix = foods[0]._id.toString().slice(0, -5);
        });
        console.log('id prefix is', IdPrefix);
    }
    return this.findById(IdPrefix + shortId);
};
exports.FoodSchema.statics.randomShortId = async function () {
    const food = await this.aggregate().sample(1).exec().then((r) => r[0]);
    food._id = food._id.toString().slice(-5);
    return food;
};
exports.Food = mongoose_1.model('food', exports.FoodSchema);
exports.default = exports.Food;
//# sourceMappingURL=model.js.map