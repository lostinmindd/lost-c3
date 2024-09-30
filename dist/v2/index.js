"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const get_config_1 = require("./get-config");
const create_addon_structure_1 = require("./create-addon-structure");
const get_plugin_properties_1 = require("./get-plugin-properties");
const create_addon_json_1 = require("./create-addon-json");
const get_categories_1 = require("./get-categories");
const create_aces_json_1 = require("./create-aces-json");
const create_language_json_1 = require("./create-language-json");
const add_all_entities_1 = require("./add-all-entities");
const zip_addon_1 = require("./zip-addon");
async function build() {
    const Config = await (0, get_config_1.getConfig)();
    const PluginProperties = await (0, get_plugin_properties_1.getPluginProperties)();
    const Categories = await (0, get_categories_1.getCategories)();
    await (0, create_addon_structure_1.createAddonStructure)(Config, PluginProperties);
    const AddonJSON = await (0, create_addon_json_1.createAddonJSONFile)(Config);
    const AcesJSON = await (0, create_aces_json_1.createAcesJSONFile)(Categories);
    await (0, create_language_json_1.createLanguageJSONFile)(Config, Categories, PluginProperties);
    await (0, add_all_entities_1.addAllEntitiesToFiles)(Categories);
    await (0, zip_addon_1.zipAddon)(Config);
    return true;
}
