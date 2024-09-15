"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFolderContentsRecursiveSync = copyFolderContentsRecursiveSync;
const console_log_colors_1 = require("console-log-colors");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
function copyFolderContentsRecursiveSync(source, target) {
    if (!fs.existsSync(source)) {
        console.error((0, console_log_colors_1.red)(`Папка ${source} не существует`));
        return;
    }
    const items = fs.readdirSync(source);
    items.forEach(item => {
        const currentSource = path_1.default.join(source, item);
        const currentTarget = path_1.default.join(target, item);
        if (fs.lstatSync(currentSource).isDirectory()) {
            // Если это папка, создаем её в целевой директории и рекурсивно копируем её содержимое
            if (!fs.existsSync(currentTarget)) {
                fs.mkdirSync(currentTarget);
            }
            copyFolderContentsRecursiveSync(currentSource, currentTarget);
        }
        else {
            // Копируем файлы в целевую директорию
            fs.copyFileSync(currentSource, currentTarget);
            (0, console_log_colors_1.log)(`Created ${(0, console_log_colors_1.magenta)(`${item}`)} file.`, 'white');
        }
    });
    //log(`Created ${magenta(`${source}`)} file.`, 'white');
}
