import { Lost } from "lost-lib";
import { PLUGIN_PROPERTIES_PATH } from "./globals";

export async function getPluginProperties() {
    const module = await import(`file://${PLUGIN_PROPERTIES_PATH}`);
    return module.PluginProperties as Lost.PluginProperty[];
}