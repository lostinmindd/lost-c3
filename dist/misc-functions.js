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
exports.getExportModuleFromJSFile = getExportModuleFromJSFile;
exports.updateVariableInFile = updateVariableInFile;
exports.copyFileAsync = copyFileAsync;
const child_process_1 = require("child_process");
const os = __importStar(require("os"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const console_log_colors_1 = require("console-log-colors");
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
function getExportModuleFromJSFile(modulePath) {
    return new Promise(async (res, rej) => {
        const _modulePath = path_1.default.resolve(modulePath);
        try {
            const module = await import(`file://${_modulePath}`);
            res(module);
        }
        catch (e) {
            rej(e);
        }
    });
}
function updateVariableInFile(filePath, variableName, newValue) {
    const _filePath = path_1.default.join(filePath);
    const fileContent = fs.readFileSync(_filePath, 'utf8');
    const regex = new RegExp(`${variableName}\\s*=\\s*['"][^'"]*['"]`, 'g');
    const updatedData = fileContent.replace(regex, `${variableName} = '${newValue}'`);
    fs.writeFileSync(_filePath, updatedData, 'utf8');
}
async function copyFileAsync(source, destination) {
    const sourcePath = path_1.default.join(source);
    const destPath = path_1.default.join(destination);
    (0, console_log_colors_1.log)(`Copying ${(0, console_log_colors_1.black)(`${source}`)} file...`, 'white');
    return new Promise(async (res, rej) => {
        try {
            // Копируем файл
            //fs.copyFileSync(path.join(source), path.join(destination));
            fs.copyFile(sourcePath, destPath, (err) => {
                if (err) {
                    rej(err.message);
                }
                //log(` -- ${magenta('icon.svg')} was created!\n`, 'white');
            });
            res('');
        }
        catch (err) {
            rej(err);
        }
    });
}
