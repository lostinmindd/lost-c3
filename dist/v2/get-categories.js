"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = getCategories;
const globals_1 = require("./globals");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const categories = [];
async function getCategories() {
    await processDirectory(globals_1.CATEGORIES_FOLDER_PATH);
    return categories;
}
async function processFile(filePath) {
    const module = await import(`file://${filePath}`);
    const Category = module.Category;
    categories.push(Category);
}
async function processDirectory(directory) {
    const files = fs_1.default.readdirSync(directory);
    for (const file of files) {
        const filePath = path_1.default.join(directory, file);
        const stats = fs_1.default.statSync(filePath);
        if (stats.isFile() && path_1.default.extname(file) === '.js') {
            await processFile(filePath);
        }
    }
}
