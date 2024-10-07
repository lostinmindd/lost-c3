const C3 = globalThis.C3;
const Config = {};
class LInstance extends globalThis.ISDKBehaviorInstanceBase {
    constructor() {
        super();
    }
    _release() {
        super._release();
    }
}
;
C3.Behaviors[Config.AddonId].Instance = LInstance;
export {};
