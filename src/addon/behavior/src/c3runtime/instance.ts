import type { BehaviorConfig } from "lost-c3-lib";
const C3 = globalThis.C3;

const Config = {} as BehaviorConfig;

class LInstance extends globalThis.ISDKBehaviorInstanceBase<IWorldInstance> {

	constructor() {
		super();
	}
	
	_release() {
		super._release();
	}
	
};

C3.Behaviors[Config.AddonId].Instance = LInstance;

export type { LInstance as SDKInstanceClass };