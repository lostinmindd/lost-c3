const C3 = globalThis.C3;
const Config = {};
class LType extends globalThis.ISDKBehaviorTypeBase {
    constructor() {
        super();
    }
    _onCreate() { }
}
;
C3.Behaviors[Config.AddonId].Type = LType;
export {};
