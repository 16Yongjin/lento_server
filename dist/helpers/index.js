"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("mz/fs");
const isImage = ({ type }) => type && type.indexOf('image') !== -1;
const isArray = ({ length }) => length && length > 1;
const arrayfy = (arr) => isArray(arr) ? arr : [arr];
const uid = () => Math.random().toString(36).slice(2);
const saveFile = async (file) => {
    const ext = file.name.slice(file.name.lastIndexOf('.'));
    const fileName = uid() + ext;
    const filePath = path.join('src/uploads', fileName);
    await fs.rename(file.path, filePath);
    return fileName;
};
exports.deleteImageFile = async (imagePath) => {
    if (!imagePath)
        return;
    try {
        const filePath = path.join('src/uploads', imagePath);
        await fs.unlink(filePath);
    }
    catch (e) {
        console.log('failed to delete image', e);
    }
};
exports.saveImages = async ({ image }) => {
    console.log(typeof image);
    if (!image)
        return [];
    try {
        return await Promise.all(arrayfy(image)
            .filter(isImage)
            .map(saveFile));
    }
    catch (e) {
        console.log('failed to save images', e);
    }
};
const isAdmin = (mw) => (ctx) => {
    if (!ctx.state.user.admin) {
        return ctx.status = 401;
    }
    return mw(ctx);
};
const check = (cont) => (condition) => {
    for (let k in cont) {
        cont[k] = condition(cont[k]);
    }
    return cont;
};
exports.adminGuard = (controller) => check(controller)(isAdmin);
//# sourceMappingURL=index.js.map