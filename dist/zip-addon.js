"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipAddon = zipAddon;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const archiver_1 = __importDefault(require("archiver"));
const console_log_colors_1 = require("console-log-colors");
async function zipAddon(LostConfig) {
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('.c3addon')} file...\n`, 'white');
    return new Promise((res, rej) => {
        const sourceDirectory = "build/addon";
        const outputDirectory = "";
        const fileName = `${LostConfig.AddonId}_${LostConfig.Version}`;
        const c3addonPath = path_1.default.join(outputDirectory, `${fileName}.c3addon`);
        const output = fs_extra_1.default.createWriteStream(c3addonPath);
        const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
        output.on('close', () => {
            // log(` -- ${yellow(`${addonConfig.id}_${addonConfig.version}.c3addon`)} was created in ${dim('build')} folder!\n`, 'white');
            (0, console_log_colors_1.log)(` -- ${(0, console_log_colors_1.yellow)(`${fileName}.c3addon`)} was created!\n`, 'white');
            res('');
        });
        archive.on('error', (err) => {
            rej(err);
        });
        archive.pipe(output);
        archive.directory(sourceDirectory, false);
        archive.finalize();
    });
}
