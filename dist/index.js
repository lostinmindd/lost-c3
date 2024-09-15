"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAddon = buildAddon;
const console_log_colors_1 = require("console-log-colors");
const update_plugin_id_1 = require("./update-plugin-id");
const child_process_1 = require("child_process");
const remove_export_injs_1 = require("./remove-export-injs");
const get_all_lost_categories_1 = require("./get-all-lost-categories");
const add_all_entities_1 = require("./add-all-entities");
const addon_json_generator_1 = require("./addon-json-generator");
const addon_aces_generator_1 = require("./addon-aces-generator");
const addon_language_generator_1 = require("./addon-language-generator");
const zip_addon_1 = require("./zip-addon");
const add_plugin_libs_to_addon_1 = require("./add-plugin-libs-to-addon");
const misc_functions_1 = require("./misc-functions");
const update_pluginjs_file_1 = require("./update-pluginjs-file");
async function compileAddonFiles() {
    (0, console_log_colors_1.log)(`Compiling addon files to ${(0, console_log_colors_1.yellow)('Javascript')}...\n`, 'white');
    return new Promise((res, rej) => {
        (0, child_process_1.exec)('tsc', (error, stdout, stderr) => {
            if (error) {
                rej(error.message);
                return;
            }
            if (stderr) {
                rej(stderr);
                return;
            }
            res('');
        });
    });
}
async function buildAddon() {
    return new Promise((res, rej) => {
        let LostConfig;
        let LostPluginProperties;
        let LostCategoriesCollection;
        compileAddonFiles().then(async () => {
            const LC = await (0, misc_functions_1.getExportModuleFromJSFile)('build/lost.config.js');
            LostConfig = LC.LostConfig;
            const PP = await (0, misc_functions_1.getExportModuleFromJSFile)('build/plugin.properties.js');
            LostPluginProperties = PP.PluginProperties;
            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.blueBright)('Start building addon...')}\nAddon Id: ${(0, console_log_colors_1.green)(LostConfig.AddonId)} - Author: ${(0, console_log_colors_1.cyanBright)(LostConfig.Author)} - Version: ${(0, console_log_colors_1.yellow)(`${LostConfig.Version}`)}\n`, 'white');
            (0, update_plugin_id_1.updatePluginIdInAllPluginFiles)(LostConfig.AddonId);
            (0, misc_functions_1.updateVariableInFile)('build/addon/plugin.js', 'PLUGIN_CATEGORY', LostConfig.Category);
            (0, misc_functions_1.updateVariableInFile)('build/addon/plugin.js', 'PLUGIN_AUTHOR', LostConfig.Author);
            if (LostConfig.RemoveExportInJSFiles)
                (0, remove_export_injs_1.removeExportInJS)();
            (0, get_all_lost_categories_1.getLostCategories)().then(categories => {
                LostCategoriesCollection = categories;
                (0, add_plugin_libs_to_addon_1.addPluginLibsToAddon)().then(LibsCollection => {
                    LibsCollection.forEach(lib => {
                        const script = LostConfig.Scripts.find(s => s.FileName === lib);
                        if (!script)
                            LostConfig.Scripts.push({
                                FileName: lib,
                                Type: 'external-dom-script'
                            });
                    });
                    (0, update_pluginjs_file_1.updatePluginJSFile)(LostConfig, LostPluginProperties).then(() => {
                        (0, add_all_entities_1.addAllEntitiesToFiles)(LostCategoriesCollection).then(() => {
                            (0, addon_json_generator_1.createAddonJSONFile)(LostConfig).then(() => {
                                (0, addon_aces_generator_1.createAcesJSONFile)(LostCategoriesCollection).then(() => {
                                    (0, addon_language_generator_1.createLanguageJSONFile)(LostConfig, LostCategoriesCollection, LostPluginProperties).then(() => {
                                        (0, misc_functions_1.copyFileAsync)('src/icon.svg', 'build/addon/icon.svg').then(() => {
                                            (0, zip_addon_1.zipAddon)(LostConfig).then(() => {
                                                res({
                                                    Config: LostConfig,
                                                    Properties: LostPluginProperties,
                                                    Categories: LostCategoriesCollection
                                                });
                                            }).catch(reason => {
                                                (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while zipping addon.`), 'white');
                                                (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                                            });
                                        }).catch(reason => {
                                            (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while creating ${(0, console_log_colors_1.magenta)('icon.svg')} file.`), 'white');
                                            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                                        });
                                    }).catch(reason => {
                                        (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while creating ${(0, console_log_colors_1.yellow)('en-US.json')} file.`), 'white');
                                        (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                                    });
                                }).catch(reason => {
                                    (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while creating ${(0, console_log_colors_1.yellow)('aces.json')} file.`), 'white');
                                    (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                                });
                            }).catch(reason => {
                                (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while creating ${(0, console_log_colors_1.yellow)('addon.json')} file.`), 'white');
                                (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                            });
                        }).catch(reason => {
                            (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while adding ${(0, console_log_colors_1.cyan)('Lost')} entities to files.`), 'white');
                            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                        });
                    }).catch(reason => {
                        (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while updating ${(0, console_log_colors_1.yellow)('plugin.js')} file.`), 'white');
                        (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                    });
                }).catch(reason => {
                    (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while adding libraries to addon.`), 'white');
                    (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
                });
            }).catch(reason => {
                (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while getting ${(0, console_log_colors_1.cyan)('Lost')} categories.`), 'white');
                (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
            });
        }).catch(reason => {
            (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while compiling to ${(0, console_log_colors_1.yellow)('Javascript')}.`), 'white');
            (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
        });
    });
}
