import type { BehaviorConfig } from "lost-c3-lib";

const C3 = globalThis.C3;

const Config = {} as BehaviorConfig;

C3.Behaviors[Config.AddonId] = class LBehavior extends globalThis.ISDKBehaviorBase {
    constructor() {
        super();
    }
};

export {}
