import { ADDON_FOLDER, BUILD_FOLDER, SOURCE_FOLDER } from "./globals";
import fs from "fs";
import path from "path";
import { getConfig } from "./get-config";
import { createAddonStructure } from "./create-addon-structure";
import { getPluginProperties } from "./get-plugin-properties";
import { createAddonJSONFile } from "./create-addon-json";
import { getCategories } from "./get-categories";
import { createAcesJSONFile } from "./create-aces-json";
import { createLanguageJSONFile } from "./create-language-json";
import { addAllEntitiesToFiles } from "./add-all-entities";
import { zipAddon } from "./zip-addon";
import { bold, gray, log, magenta, red, redBright, yellow } from "console-log-colors";
import { removePreviousFolder } from "./misc-functions";

export async function build() {
    //await removePreviousFolder(path.resolve(`${ADDON_FOLDER}`));
    fs.mkdirSync(path.resolve(`${SOURCE_FOLDER}/addon/libs`), { recursive: true });
    fs.mkdirSync(path.resolve(`${SOURCE_FOLDER}/addon/files`), { recursive: true });

    log(`Getting Lost config...`, 'white');
    const Config = await getConfig();

    log(`Getting plugin ${red('properties')}...`, 'white');
    const PluginProperties = await getPluginProperties();
    log(`Total properties: ${PluginProperties.length}`, 'white');

    log(`Getting plugin ${redBright('categories')}...\n`, 'white');
    let Categories = await getCategories();
    log(`--------------------\n`, 'white');
    const ids: string[] = [];
    Categories.forEach((category, index) => {
        const actionsCount = category.Actions.length;
        const conditionsCount = category.Conditions.length;
        const expressionsCount = category.Expressions.length;
        if (category.InDevelopment) {
            log(`${yellow(`[${index + 1}]`)} Dev (${bold(gray(category.Name))}), Actions: ${yellow(actionsCount)}, Conditions: ${yellow(conditionsCount)}, Expressions: ${yellow(expressionsCount)}`, 'blackBG');
        } else log(`${yellow(`[${index + 1}]`)} (${bold(gray(category.Name))}), Actions: ${yellow(actionsCount)}, Conditions: ${yellow(conditionsCount)}, Expressions: ${yellow(expressionsCount)}`, 'blackBG');
        
        if (ids.indexOf(category.Id) !== -1) {
            log(`${red(`You have multiple categories with the same Id's`)}`, 'white');
            return;
        } ids.push(category.Id);
    });
    log(`\n--------------------\n`, 'white');

    Categories = Categories.filter(category => category.InDevelopment === false);

    log(`Creating addon structure..`, 'white');
    await createAddonStructure(Config, PluginProperties);

    await removePreviousFolder(path.resolve(`${BUILD_FOLDER}`));
    
    log(`Creating ${yellow('addon.json')} file...`, 'white');
    const AddonJSON = await createAddonJSONFile(Config);

    log(`Creating ${yellow('aces.json')} file...`, 'white');
    const AcesJSON = await createAcesJSONFile(Categories);

    log(`Creating ${yellow('en-US.json')} file...`, 'white');
    await createLanguageJSONFile(Config, Categories, PluginProperties);

    log(`Adding entities to ${yellow('actions.js, conditions.js, expression.js')} file...`, 'white');
    await addAllEntitiesToFiles(Categories);

    log(`Creating ${yellow('.c3addon')} file...`, 'white');
    await zipAddon(Config);

    return true;
}