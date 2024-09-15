import { Lost, LostPluginPropertyType } from "lost-lib";
import { blueBright, cyan, cyanBright, green, log, magenta, red, yellow } from "console-log-colors";
import { updatePluginIdInAllPluginFiles } from "./update-plugin-id";
import { exec } from "child_process";
import { removeExportInJS } from "./remove-export-injs";
import { getLostCategories } from "./get-all-lost-categories";
import { addAllEntitiesToFiles } from "./add-all-entities";
import { createAddonJSONFile } from "./addon-json-generator";
import { createAcesJSONFile } from "./addon-aces-generator";
import { createLanguageJSONFile } from "./addon-language-generator";
import { zipAddon } from "./zip-addon";
import { addPluginLibsToAddon } from "./add-plugin-libs-to-addon";
import { copyFileAsync, getExportModuleFromJSFile, updateVariableInFile } from "./misc-functions";
import { updatePluginJSFile } from "./update-pluginjs-file";

interface IBuildDataResponse {
    Config: Lost.IConfig;
    Properties: LostPluginPropertyType[];
    Categories: Lost.ICategory[];
}

async function compileAddonFiles() {
    log(`Compiling addon files to ${yellow('Javascript')}...\n`, 'white');
    return new Promise((res, rej) => {
        exec('tsc', (error, stdout, stderr) => {
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
    })
}

export async function buildAddon() {

    return new Promise<IBuildDataResponse>((res, rej) => {

        let LostConfig: Lost.IConfig;
        let LostPluginProperties: LostPluginPropertyType[];
        let LostCategoriesCollection: Lost.ICategory[];

        compileAddonFiles().then(async () => {

            const LC  = await getExportModuleFromJSFile('build/lost.config.js'); LostConfig = LC.LostConfig;
            const PP  = await getExportModuleFromJSFile('build/plugin.properties.js'); LostPluginProperties = PP.PluginProperties;

            log(`${blueBright('Start building addon...')}\nAddon Id: ${green(LostConfig.AddonId)} - Author: ${cyanBright(LostConfig.Author)} - Version: ${yellow(`${LostConfig.Version}`)}\n`, 'white');
            
            updatePluginIdInAllPluginFiles(LostConfig.AddonId);
            updateVariableInFile('build/addon/plugin.js', 'PLUGIN_CATEGORY', LostConfig.Category);
            updateVariableInFile('build/addon/plugin.js', 'PLUGIN_AUTHOR', LostConfig.Author);

            if (LostConfig.RemoveExportInJSFiles) removeExportInJS();

            getLostCategories().then(categories => {

                LostCategoriesCollection = categories;

                addPluginLibsToAddon().then(LibsCollection => {

                    LibsCollection.forEach(lib => {
                        const script = LostConfig.Scripts.find(s => s.FileName === lib);
                        if (!script) LostConfig.Scripts.push({
                            FileName: lib,
                            Type: 'external-dom-script'
                        })
                    })
                    updatePluginJSFile(LostConfig, LostPluginProperties).then(() => {

                        addAllEntitiesToFiles(LostCategoriesCollection).then(() => {
    
                            createAddonJSONFile(LostConfig).then(() => {

                                createAcesJSONFile(LostCategoriesCollection).then(() => {

                                    createLanguageJSONFile(LostConfig, LostCategoriesCollection, LostPluginProperties).then(() => {

                                        copyFileAsync('src/icon.svg', 'build/addon/icon.svg').then(() => {

                                            zipAddon(LostConfig).then(() => {

                                                res({
                                                    Config: LostConfig,
                                                    Properties: LostPluginProperties,
                                                    Categories: LostCategoriesCollection
                                                });
                                
                                            }).catch(reason => {
                                                log(red(` -- Error occured while zipping addon.`), 'white')
                                                log(`${cyan(' -- Reason:')} ${reason}`, 'white')
                                            })

                                        }).catch(reason => {
                                            log(red(` -- Error occured while creating ${magenta('icon.svg')} file.`), 'white');
                                            log(`${cyan(' -- Reason:')} ${reason}`, 'white');    
                                        })

                                    }).catch(reason => {
                                        log(red(` -- Error occured while creating ${yellow('en-US.json')} file.`), 'white');
                                        log(`${cyan(' -- Reason:')} ${reason}`, 'white');    
                                    })

                                }).catch(reason => {
                                    log(red(` -- Error occured while creating ${yellow('aces.json')} file.`), 'white');
                                    log(`${cyan(' -- Reason:')} ${reason}`, 'white');    
                                })

                            }).catch(reason => {
                                log(red(` -- Error occured while creating ${yellow('addon.json')} file.`), 'white');
                                log(`${cyan(' -- Reason:')} ${reason}`, 'white');    
                            })

                        }).catch(reason => {
                            log(red(` -- Error occured while adding ${cyan('Lost')} entities to files.`), 'white');
                            log(`${cyan(' -- Reason:')} ${reason}`, 'white'); 
                        })

                    }).catch(reason => {
                        log(red(` -- Error occured while updating ${yellow('plugin.js')} file.`), 'white');
                        log(`${cyan(' -- Reason:')} ${reason}`, 'white');
                    })

                }).catch(reason => {
                    log(red(` -- Error occured while adding libraries to addon.`), 'white');
                    log(`${cyan(' -- Reason:')} ${reason}`, 'white');
                })
                
            }).catch(reason => {
                log(red(` -- Error occured while getting ${cyan('Lost')} categories.`), 'white');
                log(`${cyan(' -- Reason:')} ${reason}`, 'white');
            })

        }).catch(reason => {
            log(red(` -- Error occured while compiling to ${yellow('Javascript')}.`), 'white');
            log(`${cyan(' -- Reason:')} ${reason}`, 'white');
        })

    })

}