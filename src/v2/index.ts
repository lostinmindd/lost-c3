import { SOURCE_FOLDER } from "./globals";
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
import { log, yellow } from "console-log-colors";

export async function build() {
    fs.mkdirSync(path.resolve(`${SOURCE_FOLDER}/addon/libs`), { recursive: true });
    fs.mkdirSync(path.resolve(`${SOURCE_FOLDER}/addon/files`), { recursive: true });

    log(`Getting Lost config...`, 'white');
    const Config = await getConfig();

    log(`Getting plugin properties...`, 'white');
    const PluginProperties = await getPluginProperties();

    log(`Getting plugin categories...`, 'white');
    const Categories = await getCategories();

    log(`Creating addon structure..`, 'white');
    await createAddonStructure(Config, PluginProperties);

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