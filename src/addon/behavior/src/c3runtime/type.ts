import type { BehaviorConfig } from "lost-c3-lib";

const C3 = globalThis.C3;

const Config = {} as BehaviorConfig;

class LType extends globalThis.ISDKBehaviorTypeBase {
	constructor() {
		super();
	}
	
	_onCreate() {}
};

C3.Behaviors[Config.AddonId].Type = LType;
