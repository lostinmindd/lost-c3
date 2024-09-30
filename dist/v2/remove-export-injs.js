"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeExportInJS = removeExportInJS;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const globals_1 = require("./globals");
function removeExportStatement(filePath) {
    const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
    const cleanedContent = fileContent.replace(/export\s*{\s*};?\s*$/, '');
    fs_1.default.writeFileSync(filePath, cleanedContent, 'utf8');
}
async function processDirectory(directory) {
    const c3runtimeFiles = fs_1.default.readdirSync(directory);
    c3runtimeFiles.forEach(file => {
        const filePath = path_1.default.join(directory, file);
        const stats = fs_1.default.statSync(filePath);
        if (stats.isDirectory()) {
            processDirectory(filePath);
        }
        else if (stats.isFile() && path_1.default.extname(file) === '.js') {
            removeExportStatement(filePath);
        }
    });
    return true;
}
async function removeExportInJS() {
    processDirectory(globals_1.C3RUNTIME_FOLDER_PATH);
    return true;
}
