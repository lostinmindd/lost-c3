import type { Lost } from "lost-c3-lib";
const C3 = globalThis.C3;

const Config: Lost.Config = {} as Lost.Config;

class LInstance extends globalThis.ISDKInstanceBase {

	constructor() {
		super({ domComponentId: Config.AddonId });
	}
	
	_release() {
		super._release();
	}
	
};

C3.Plugins[Config.AddonId].Instance = LInstance;

export type { LInstance as SDKInstanceClass };

// export {};