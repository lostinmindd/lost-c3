"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginProperties = getPluginProperties;
const globals_1 = require("./globals");
async function getPluginProperties() {
    const module = await import(`file://${globals_1.PLUGIN_PROPERTIES_PATH}`);
    return module.PluginProperties;
}
