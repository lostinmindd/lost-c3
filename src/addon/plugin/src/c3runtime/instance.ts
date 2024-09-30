import type { Lost } from "lost-lib";
const C3 = globalThis.C3;

const Config: Lost.Config = {} as Lost.Config;

class LInstance extends globalThis.ISDKInstanceBase {

	constructor() {
		super();
	}
	
	_release() {
		super._release();
	}
	
};

C3.Plugins[Config.AddonId].Instance = LInstance;

export type { LInstance as SDKInstanceClass };

// export {};