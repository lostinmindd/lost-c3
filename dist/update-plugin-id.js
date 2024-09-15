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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePluginIdInAllPluginFiles = updatePluginIdInAllPluginFiles;
const console_log_colors_1 = require("console-log-colors");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const misc_functions_1 = require("./misc-functions");
const addonPath = 'build/addon';
const folderToSkip = 'ts-defs';
async function updatePluginIdInAllPluginFiles(addonId) {
    (0, console_log_colors_1.log)(`Changing ${(0, console_log_colors_1.yellow)('PLUGIN_ID')} in all plugin files...\n`, 'white');
    return new Promise((res, rej) => {
        processDirectory(addonPath, addonId).then(() => res(''));
    });
}
async function processDirectory(directoryPath, addonId) {
    return new Promise((res, rej) => {
        const addonFiles = fs.readdirSync(directoryPath);
        addonFiles.forEach(file => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                if (file === folderToSkip) {
                    return;
                }
                processDirectory(filePath, addonId);
            }
            else if (stats.isFile() && path.extname(file) === '.js') {
                (0, misc_functions_1.updateVariableInFile)(filePath, 'PLUGIN_ID', addonId);
            }
        });
        res('');
    });
}
