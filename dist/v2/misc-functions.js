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
exports.openUrl = openUrl;
exports.copyFileAsync = copyFileAsync;
exports.copyDirectory = copyDirectory;
exports.removePreviousFolder = removePreviousFolder;
const child_process_1 = require("child_process");
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
function openUrl(url) {
    const platform = os.platform();
    let command;
    switch (platform) {
        case 'win32':
            command = `start ${url}`;
            break;
        case 'darwin':
            command = `open ${url}`;
            break;
        case 'linux':
            command = `xdg-open ${url}`;
            break;
        default:
            console.error('Unsupported platform');
            return;
    }
    (0, child_process_1.exec)(command, (error) => {
        if (error) {
            console.error(`Error opening URL: ${error.message}`);
        }
    });
}
function copyFileAsync(source, destination) {
    const sourcePath = path_1.default.join(source);
    const destPath = path_1.default.join(destination);
    fs.copyFileSync(sourcePath, destPath);
}
function copyDirectory(sourceDir, destinationDir) {
    fs.mkdirSync(destinationDir, { recursive: true });
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
        const sourcePath = path_1.default.join(sourceDir, entry.name);
        const destinationPath = path_1.default.join(destinationDir, entry.name);
        if (entry.isDirectory()) {
            copyDirectory(sourcePath, destinationPath);
        }
        else {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
}
// path.resolve(`${BUILD_FOLDER}`
async function removePreviousFolder(folderPath) {
    fs.rm(folderPath, { recursive: true, force: true }, (err) => { if (!err) {
        return true;
    } return false; });
}
;
