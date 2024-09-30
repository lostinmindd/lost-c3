import type { Lost } from "lost-c3-lib";
import type { SDKInstanceClass } from "./instance.js";

const C3 = globalThis.C3;

const Config: Lost.Config = {} as Lost.Config;

C3.Plugins[Config.AddonId].Type = class LType extends globalThis.ISDKObjectTypeBase<SDKInstanceClass> {
	constructor() {
		super();
	}
	
	_onCreate() {}
};
