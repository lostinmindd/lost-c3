"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddonStructure = createAddonStructure;
const globals_1 = require("./globals");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const misc_functions_1 = require("./misc-functions");
const remove_export_injs_1 = require("./remove-export-injs");
async function createAddonStructure(config, pluginProperties) {
    fs_1.default.mkdirSync(globals_1.ADDON_FOLDER, { recursive: true });
    fs_1.default.mkdirSync(`${globals_1.ADDON_FOLDER}/lang`, { recursive: true });
    fs_1.default.mkdirSync(`${globals_1.ADDON_FOLDER}/libs`, { recursive: true });
    fs_1.default.mkdirSync(`${globals_1.ADDON_FOLDER}/files`, { recursive: true });
    (0, misc_functions_1.copyDirectory)(`${globals_1.PLUGIN_BONES_FOLDER_PATH}`, `build/addon`);
    (0, remove_export_injs_1.removeExportInJS)();
    // Copy plugin icon (svg / png);
    const iconPath = `${globals_1.SOURCE_FOLDER}/${config.Icon.FileName}`;
    (0, misc_functions_1.copyFileAsync)(iconPath, `${globals_1.ADDON_FOLDER}/${config.Icon.FileName}`);
    createNewInstanceFile(config);
    replaceConfigInAllFiles(config);
    replacePluginProperties(pluginProperties);
    // Copy all user libraries to addon folder
    (0, misc_functions_1.copyDirectory)(`${globals_1.LIBRARIES_FOLDER_PATH}`, `${globals_1.FINAL_LIBRARIES_FOLDER_PATH}`);
    // Copy all user files to addon folder
    (0, misc_functions_1.copyDirectory)(`${globals_1.FILES_FOLDER_PATH}`, `${globals_1.FINAL_FILES_FOLDER_PATH}`);
    return true;
}
function createNewInstanceFile(config) {
    let NewInstanceFile;
    const regex = /import\s*{\s*Config\s*}\s*from\s*["']\.\.\/lost\.config\.js["'];/g;
    const InstanceFile = fs_1.default.readFileSync(`${globals_1.INSTANCE_PATH}`, 'utf8');
    NewInstanceFile = InstanceFile.replace(regex, `const Config = ${JSON.stringify(config)}`);
    fs_1.default.writeFileSync(`${globals_1.FINAL_INSTANCE_PATH}`, NewInstanceFile);
}
function replaceConfigInAllFiles(config) {
    const regex = /const\s+Config\s*=\s*{};/g; // Регулярное выражение для поиска `const Config = {};`
    function processFile(filePath) {
        const fileContent = fs_1.default.readFileSync(filePath, 'utf8');
        if (regex.test(fileContent)) {
            const updatedContent = fileContent.replace(regex, `const Config = ${JSON.stringify(config)};`);
            fs_1.default.writeFileSync(filePath, updatedContent, 'utf8');
        }
    }
    function processDirectory(currentDir) {
        const entries = fs_1.default.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            const entryPath = path_1.default.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                processDirectory(entryPath);
            }
            else if (entry.isFile() && entry.name.endsWith('.js')) {
                processFile(entryPath);
            }
        }
    }
    processDirectory(`${globals_1.ADDON_FOLDER}`);
}
function replacePluginProperties(pluginProperties) {
    const regex = /const\s+PluginProperties\s*=\s*\[\s*\];/g; // Регулярное выражение для поиска `const PluginProperties = [];`
    const fileContent = fs_1.default.readFileSync(`${globals_1.MAIN_PLUGIN_JS_PATH}`, 'utf8');
    if (regex.test(fileContent)) {
        const updatedContent = fileContent.replace(regex, `const PluginProperties = ${JSON.stringify(pluginProperties)};`);
        fs_1.default.writeFileSync(`${globals_1.MAIN_PLUGIN_JS_PATH}`, updatedContent, 'utf8');
    }
}
