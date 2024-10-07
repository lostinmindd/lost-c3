import type { PluginConfig } from "lost-c3-lib";

const SDK = globalThis.SDK;

const Config = {} as PluginConfig;

const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];

PLUGIN_CLASS.Type = class LPluginType extends SDK.ITypeBase {
	constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType) {
		super(sdkPlugin, iObjectType);
	}
};

export {}