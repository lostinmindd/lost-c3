"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const globals_1 = require("./globals");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const get_config_1 = require("./get-config");
const create_addon_structure_1 = require("./create-addon-structure");
const get_plugin_properties_1 = require("./get-plugin-properties");
const create_addon_json_1 = require("./create-addon-json");
const get_categories_1 = require("./get-categories");
const create_aces_json_1 = require("./create-aces-json");
const create_language_json_1 = require("./create-language-json");
const add_all_entities_1 = require("./add-all-entities");
const zip_addon_1 = require("./zip-addon");
const console_log_colors_1 = require("console-log-colors");
const misc_functions_1 = require("./misc-functions");
async function build() {
    //await removePreviousFolder(path.resolve(`${ADDON_FOLDER}`));
    fs_1.default.mkdirSync(path_1.default.resolve(`${globals_1.SOURCE_FOLDER}/addon/libs`), { recursive: true });
    fs_1.default.mkdirSync(path_1.default.resolve(`${globals_1.SOURCE_FOLDER}/addon/files`), { recursive: true });
    (0, console_log_colors_1.log)(`Getting Lost config...`, 'white');
    const Config = await (0, get_config_1.getConfig)();
    (0, console_log_colors_1.log)(`Getting plugin properties...`, 'white');
    const PluginProperties = await (0, get_plugin_properties_1.getPluginProperties)();
    (0, console_log_colors_1.log)(`Total properties: ${PluginProperties.length}`, 'white');
    (0, console_log_colors_1.log)(`Getting plugin categories...\n`, 'white');
    let Categories = await (0, get_categories_1.getCategories)();
    (0, console_log_colors_1.log)(`--------------------\n`, 'white');
    const ids = [];
    Categories.forEach((category, index) => {
        const actionsCount = category.Actions.length;
        const conditionsCount = category.Conditions.length;
        const expressionsCount = category.Expressions.length;
        if (category.Options.InDevelopment) {
            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.yellow)(`[${index + 1}]`)} Dev (${(0, console_log_colors_1.bold)((0, console_log_colors_1.gray)(category.Name))}), Actions: ${(0, console_log_colors_1.yellow)(actionsCount)}, Conditions: ${(0, console_log_colors_1.yellow)(conditionsCount)}, Expressions: ${(0, console_log_colors_1.yellow)(expressionsCount)}`, 'blackBG');
        }
        else
            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.yellow)(`[${index + 1}]`)} (${(0, console_log_colors_1.bold)((0, console_log_colors_1.gray)(category.Name))}), Actions: ${(0, console_log_colors_1.yellow)(actionsCount)}, Conditions: ${(0, console_log_colors_1.yellow)(conditionsCount)}, Expressions: ${(0, console_log_colors_1.yellow)(expressionsCount)}`, 'blackBG');
        if (ids.indexOf(category.Id) !== -1) {
            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.red)(`You have multiple categories with the same Id's`)}`, 'white');
            return;
        }
        ids.push(category.Id);
    });
    (0, console_log_colors_1.log)(`\n--------------------\n`, 'white');
    Categories = Categories.filter(category => category.Options.InDevelopment === false);
    (0, console_log_colors_1.log)(`Creating addon structure..`, 'white');
    await (0, create_addon_structure_1.createAddonStructure)(Config, PluginProperties);
    await (0, misc_functions_1.removePreviousFolder)(path_1.default.resolve(`${globals_1.BUILD_FOLDER}`));
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('addon.json')} file...`, 'white');
    const AddonJSON = await (0, create_addon_json_1.createAddonJSONFile)(Config);
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('aces.json')} file...`, 'white');
    const AcesJSON = await (0, create_aces_json_1.createAcesJSONFile)(Categories);
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('en-US.json')} file...`, 'white');
    await (0, create_language_json_1.createLanguageJSONFile)(Config, Categories, PluginProperties);
    (0, console_log_colors_1.log)(`Adding entities to ${(0, console_log_colors_1.yellow)('actions.js, conditions.js, expression.js')} file...`, 'white');
    await (0, add_all_entities_1.addAllEntitiesToFiles)(Categories);
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('.c3addon')} file...`, 'white');
    await (0, zip_addon_1.zipAddon)(Config);
    return true;
}
