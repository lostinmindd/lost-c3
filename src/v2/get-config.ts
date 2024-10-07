import { PluginConfig, BehaviorConfig } from "lost-c3-lib";
import { CONFIG_PATH } from "./globals";

export async function getConfig() {
    const module = await import(`file://${CONFIG_PATH}`);
    return module.Config as (PluginConfig | BehaviorConfig);
}