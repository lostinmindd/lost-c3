"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipAddon = zipAddon;
const globals_1 = require("./globals");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const archiver_1 = __importDefault(require("archiver"));
async function zipAddon(config) {
    const sourceDirectory = path_1.default.resolve(`${globals_1.ADDON_FOLDER}`);
    const fileName = `${config.AddonId}_${config.Version}`;
    const addonPath = path_1.default.resolve(`build/${fileName}.c3addon`);
    const output = fs_extra_1.default.createWriteStream(addonPath);
    const archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
    // output.on('close', () => {
    //     return true;
    // })
    archive.on('error', (err) => {
        return false;
    });
    archive.pipe(output);
    archive.directory(sourceDirectory, false);
    archive.finalize();
    return true;
}
