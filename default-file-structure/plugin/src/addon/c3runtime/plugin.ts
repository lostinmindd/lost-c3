
const C3 = globalThis.C3;

const PLUGIN_ID = 'lost_';

C3.Plugins[PLUGIN_ID] = class LPlugin extends globalThis.ISDKPluginBase {
	constructor() {
		super();
	}
};

export {}