import type { BehaviorConfig } from "lost-c3-lib";

const SDK = globalThis.SDK;

const Config = {} as BehaviorConfig;

const PLUGIN_CLASS = SDK.Plugins[Config.AddonId];

PLUGIN_CLASS.Type = class LBehaviorType extends SDK.IBehaviorTypeBase {
	constructor(sdkBehavior: SDK.IBehaviorBase, iBehaviorType: SDK.IBehaviorType) {
		super(sdkBehavior, iBehaviorType);
	}
};

export {}