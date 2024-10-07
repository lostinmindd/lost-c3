import type { PluginConfig } from "lost-c3-lib";

const C3 = globalThis.C3;

const Config = {} as PluginConfig;

C3.Plugins[Config.AddonId] = class LPlugin extends globalThis.ISDKPluginBase {
    constructor() {
        super();
    }
};

export {}
