import type { BehaviorConfig } from "lost-c3-lib";

const SDK = globalThis.SDK;

const Config = {} as BehaviorConfig;

const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];

PLUGIN_CLASS.Instance = class LCInstance extends SDK.IBehaviorInstanceBase
{
	constructor(sdkBehType: SDK.IBehaviorTypeBase, behInst: SDK.IBehaviorInstance) {
		super(sdkBehType, behInst);
	}

	Release() {}

	OnCreate() { console.log(`%c Lost addon loaded! `, `background: #222; color: #bada55`); }
	
	OnPropertyChanged(id: string, value: EditorPropertyValueType) {}
};

export {}