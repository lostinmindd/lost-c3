const SDK = globalThis.SDK;
const Config = {};
const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];
PLUGIN_CLASS.Instance = class LCInstance extends SDK.IInstanceBase {
    constructor(sdkType, inst) {
        super(sdkType, inst);
    }
    Release() { }
    OnCreate() { console.log(`%c Lost addon loaded! `, `background: #222; color: #bada55`); }
    OnPropertyChanged(id, value) { }
};
export {};
