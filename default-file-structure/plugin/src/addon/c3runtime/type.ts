
import type { SDKInstanceClass } from "./instance.js";

const C3 = globalThis.C3;

const PLUGIN_ID = 'lost_';

C3.Plugins[PLUGIN_ID].Type = class LType extends globalThis.ISDKObjectTypeBase<SDKInstanceClass> {
	constructor() {
		super();
	}
	
	_onCreate() {}
};
