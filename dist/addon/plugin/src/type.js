"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SDK = globalThis.SDK;
const Config = {};
const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];
PLUGIN_CLASS.Type = class LPluginType extends SDK.ITypeBase {
    constructor(sdkPlugin, iObjectType) {
        super(sdkPlugin, iObjectType);
    }
};
