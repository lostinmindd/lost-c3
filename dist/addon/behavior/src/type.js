"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDK = globalThis.SDK;
const Config = {};
const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];
PLUGIN_CLASS.Type = class LBehaviorType extends SDK.IBehaviorTypeBase {
    constructor(sdkBehavior, iBehaviorType) {
        super(sdkBehavior, iBehaviorType);
    }
};
