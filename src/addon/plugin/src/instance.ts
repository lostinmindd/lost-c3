import type { PluginConfig } from "lost-c3-lib";

const SDK = globalThis.SDK;

const Config = {} as PluginConfig;

const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];

PLUGIN_CLASS.Instance = class LCInstance extends SDK.IInstanceBase
{
	constructor(sdkType: SDK.ITypeBase, inst: SDK.IObjectInstance) {
		super(sdkType, inst);
	}

	Release() {}

	OnCreate() { console.log(`%c Lost addon loaded! `, `background: #222; color: #bada55`); }
	
	OnPropertyChanged(id: string, value: EditorPropertyValueType) {}
};

export {}