const C3 = globalThis.C3;
const Config = {};
C3.Plugins[Config.AddonId] = class LPlugin extends globalThis.ISDKPluginBase {
    constructor() {
        super();
    }
};
export {};
