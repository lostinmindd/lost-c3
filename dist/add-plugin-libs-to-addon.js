"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPluginLibsToAddon = addPluginLibsToAddon;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const misc_functions_1 = require("./misc-functions");
const libsPath = path_1.default.join('src/libs');
async function addPluginLibsToAddon() {
    fs_1.default.mkdirSync('build/addon/libs', { recursive: true });
    const libs = [];
    return new Promise((res, rej) => {
        const libsFiles = fs_1.default.readdirSync(libsPath);
        libsFiles.forEach(libFile => {
            const libPath = path_1.default.join(libsPath, libFile);
            const stats = fs_1.default.statSync(libPath);
            if (stats.isFile() && path_1.default.extname(libPath) === '.js') {
                libs.push(libFile);
                (0, misc_functions_1.copyFileAsync)(libPath, `build/addon/libs/${libFile}`);
            }
        });
        res(libs);
    });
}
