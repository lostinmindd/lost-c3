import type { Lost } from "lost-lib";

const C3 = globalThis.C3;

const Config: Lost.Config = {} as Lost.Config;

C3.Plugins[Config.AddonId] = class LPlugin extends globalThis.ISDKPluginBase {
    constructor() {
        super();
    }
};

export {}
