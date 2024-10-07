"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
