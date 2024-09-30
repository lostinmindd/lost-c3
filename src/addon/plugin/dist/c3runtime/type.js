const C3 = globalThis.C3;
const Config = {};
C3.Plugins[Config.AddonId].Type = class LType extends globalThis.ISDKObjectTypeBase {
    constructor() {
        super();
    }
    _onCreate() { }
};
export {};
