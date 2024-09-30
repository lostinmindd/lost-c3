"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
const globals_1 = require("./globals");
async function getConfig() {
    const module = await import(`file://${globals_1.CONFIG_PATH}`);
    return module.Config;
}
