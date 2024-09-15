"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLostCategories = getLostCategories;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const console_log_colors_1 = require("console-log-colors");
const misc_functions_1 = require("./misc-functions");
const categoriesCollection = [];
const categoriesPath = path_1.default.resolve('build/categories');
async function getLostCategories() {
    (0, console_log_colors_1.log)(`Get all ${(0, console_log_colors_1.cyan)('Lost')} categories...`, 'white');
    return new Promise((res, rej) => {
        processDirectory().then(categories => {
            (0, console_log_colors_1.log)(`-----------------`, 'black');
            categories.forEach(c => {
                console.log(` - ${(0, console_log_colors_1.yellow)(`${c.Name}`)} | ${(0, console_log_colors_1.cyan)('Actions:')} ${c.Actions?.length} | ${(0, console_log_colors_1.cyan)('Conditions:')} ${c.Conditions?.length} | ${(0, console_log_colors_1.cyan)('Expressions:')} ${c.Expressions?.length} `);
            });
            (0, console_log_colors_1.log)('', 'white');
            res(categories);
        }).catch(e => {
            rej(`Error reading directory: ${categoriesPath}`);
        });
    });
}
// Функция для чтения и выполнения JavaScript файлов
async function processFile(filePath) {
    try {
        // Преобразование пути в формат для динамического импорта
        const moduleCategory = await (0, misc_functions_1.getExportModuleFromJSFile)(filePath);
        const C = moduleCategory.Category;
        if (C) {
            categoriesCollection.push(C);
        }
    }
    catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}
async function processDirectory() {
    return new Promise(async (res, rej) => {
        try {
            const files = fs_1.default.readdirSync(categoriesPath);
            for (const file of files) {
                const filePath = path_1.default.join(categoriesPath, file);
                const stats = fs_1.default.statSync(filePath);
                if (stats.isFile() && path_1.default.extname(file) === '.js') {
                    await processFile(filePath);
                }
            }
            res(categoriesCollection);
        }
        catch (e) {
            rej(`Error reading directory: ${categoriesPath}`);
        }
    });
}
