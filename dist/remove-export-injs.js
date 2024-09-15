"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExportInJS = removeExportInJS;
const console_log_colors_1 = require("console-log-colors");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const c3runtimePath = 'build/addon/c3runtime';
function removeExportStatement(filePath) {
    const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
    const cleanedContent = fileContent.replace(/export\s*{\s*};?\s*$/, '');
    fs_1.default.writeFileSync(filePath, cleanedContent, 'utf8');
}
async function processDirectory(directory) {
    return new Promise((res, rej) => {
        const c3runtimeFiles = fs_1.default.readdirSync(c3runtimePath);
        c3runtimeFiles.forEach(file => {
            const filePath = path_1.default.join(c3runtimePath, file);
            const stats = fs_1.default.statSync(filePath);
            if (stats.isDirectory()) {
                processDirectory(filePath);
            }
            else if (stats.isFile() && path_1.default.extname(file) === '.js') {
                removeExportStatement(filePath);
            }
        });
        res('');
    });
}
async function removeExportInJS() {
    console.log(`Removing ${(0, console_log_colors_1.magenta)('export')} ${(0, console_log_colors_1.yellow)('{}')} from ${(0, console_log_colors_1.yellow)('.js')} files in ${(0, console_log_colors_1.dim)('./c3runtime')} folder...\n`);
    processDirectory(c3runtimePath).then(() => {
        //log(` -- ${magenta('export')} ${yellow('{}')} was ${green('successfully')} removed from ${yellow('.js')} files!\n`, 'white');
    });
}
