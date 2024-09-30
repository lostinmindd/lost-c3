import { getConfig } from "./get-config";
import { createAddonStructure } from "./create-addon-structure";
import { getPluginProperties } from "./get-plugin-properties";
import { createAddonJSONFile } from "./create-addon-json";
import { getCategories } from "./get-categories";
import { createAcesJSONFile } from "./create-aces-json";
import { createLanguageJSONFile } from "./create-language-json";
import { addAllEntitiesToFiles } from "./add-all-entities";
import { zipAddon } from "./zip-addon";

export async function build() {

    const Config = await getConfig();
    const PluginProperties = await getPluginProperties();
    const Categories = await getCategories();

    await createAddonStructure(Config, PluginProperties);

    const AddonJSON = await createAddonJSONFile(Config);
    const AcesJSON = await createAcesJSONFile(Categories);
    await createLanguageJSONFile(Config, Categories, PluginProperties);

    await addAllEntitiesToFiles(Categories);

    await zipAddon(Config);

    return true;
}