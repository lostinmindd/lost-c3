const C3 = globalThis.C3;
const Config = {};
class LInstance extends globalThis.ISDKInstanceBase {
    constructor() {
        super({ domComponentId: Config.AddonId });
    }
    _release() {
        super._release();
    }
}
;
C3.Plugins[Config.AddonId].Instance = LInstance;
export {};
// export {};
