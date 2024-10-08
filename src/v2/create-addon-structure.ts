import { PluginConfig, BehaviorConfig, PluginProperty} from "lost-c3-lib";
import { 
    ADDON_FOLDER, FINAL_INSTANCE_PATH, FINAL_LIBRARIES_FOLDER_PATH, 
    INSTANCE_PATH, LIBRARIES_FOLDER_PATH, PLUGIN_BONES_FOLDER_PATH, 
    SOURCE_FOLDER, MAIN_PLUGIN_JS_PATH, FILES_FOLDER_PATH, 
    FINAL_FILES_FOLDER_PATH, BEHAVIOR_BONES_FOLDER_PATH,
    MAIN_BEHAVIOR_JS_PATH
} from "./globals";
import fs from "fs";
import path from "path";
import { copyDirectory, copyFileAsync } from "./misc-functions";
import { removeExportInJS } from "./remove-export-injs";

export async function createAddonStructure(config: PluginConfig | BehaviorConfig, pluginProperties: PluginProperty[]) {
    let BONES_FOLDER_PATH = PLUGIN_BONES_FOLDER_PATH;

    if (config.Type === 'behavior') BONES_FOLDER_PATH = BEHAVIOR_BONES_FOLDER_PATH;

    fs.mkdirSync(ADDON_FOLDER, { recursive: true });

    fs.mkdirSync(`${ADDON_FOLDER}/lang`, { recursive: true });
    fs.mkdirSync(`${ADDON_FOLDER}/libs`, { recursive: true });
    fs.mkdirSync(`${ADDON_FOLDER}/files`, { recursive: true });

    copyDirectory(`${BONES_FOLDER_PATH}`, `build/addon`)

    removeExportInJS();

    // Copy plugin icon (svg / png);
    const iconPath = `${SOURCE_FOLDER}/${config.Icon.FileName}`;
    copyFileAsync(iconPath, `${ADDON_FOLDER}/${config.Icon.FileName}`);

    createNewInstanceFile(config);
    
    replaceConfigInAllFiles(config);

    replacePluginProperties(config, pluginProperties);

    // Copy all user libraries to addon folder
    copyDirectory(`${LIBRARIES_FOLDER_PATH}`, `${FINAL_LIBRARIES_FOLDER_PATH}`);

    // Copy all user files to addon folder
    copyDirectory(`${FILES_FOLDER_PATH}`, `${FINAL_FILES_FOLDER_PATH}`);

    return true;
}

function createNewInstanceFile(config: PluginConfig | BehaviorConfig) {
    let NewInstanceFile: string;
    const regex = /import\s*{\s*Config\s*}\s*from\s*["']\.\.\/lost\.config\.js["'];/g;
    const InstanceFile = fs.readFileSync(`${INSTANCE_PATH}`, 'utf8');
    NewInstanceFile = InstanceFile.replace(regex, `const Config = ${JSON.stringify(config)}`);
    fs.writeFileSync(`${FINAL_INSTANCE_PATH}`, NewInstanceFile);
}

function replaceConfigInAllFiles(config: PluginConfig | BehaviorConfig) {
    const regex = /const\s+Config\s*=\s*{};/g;  // Регулярное выражение для поиска `const Config = {};`

    function processFile(filePath: string) {
        const fileContent = fs.readFileSync(filePath, 'utf8');

        if (regex.test(fileContent)) {
            const updatedContent = fileContent.replace(regex, `const Config = ${JSON.stringify(config)};`);
            fs.writeFileSync(filePath, updatedContent, 'utf8');
        }
    }

    function processDirectory(currentDir: string) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                processDirectory(entryPath);
            } else if (entry.isFile() && entry.name.endsWith('.js')) {
                processFile(entryPath);
            }
        }
    }

    processDirectory(`${ADDON_FOLDER}`);

}

function replacePluginProperties(config: PluginConfig| BehaviorConfig, pluginProperties: PluginProperty[]) {
    const regex = /const\s+PluginProperties\s*=\s*\[\s*\];/g;  // Регулярное выражение для поиска `const PluginProperties = [];`

    const fileContent = fs.readFileSync(`${(config.Type === 'behavior') ? MAIN_BEHAVIOR_JS_PATH : MAIN_PLUGIN_JS_PATH}`, 'utf8');

    if (regex.test(fileContent)) {
        const updatedContent = fileContent.replace(regex, `const PluginProperties = ${JSON.stringify(pluginProperties)};`);

        fs.writeFileSync(`${(config.Type === 'behavior') ? MAIN_BEHAVIOR_JS_PATH : MAIN_PLUGIN_JS_PATH}`, updatedContent, 'utf8');
    }

}