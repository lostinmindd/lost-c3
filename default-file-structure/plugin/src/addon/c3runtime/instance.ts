
const C3 = globalThis.C3;

const PLUGIN_ID = 'lost_'

class LInstance extends globalThis.ISDKInstanceBase {

	readonly PluginConditions = C3.Plugins[PLUGIN_ID].Cnds;

	constructor() {
		super({ domComponentId: PLUGIN_ID });

		const properties = this._getInitProperties();
		if (properties) {

		}
		// Post to the DOM
		// this.runtime.addLoadPromise(
		// 	this._postToDOMAsync("").then(data_ => {
		// 		const data = data_ as JSONObject;
		// 	})
		// );
	}
	
	_release() {
		super._release();
	}
	
};

C3.Plugins[PLUGIN_ID].Instance = LInstance;

export type { LInstance as SDKInstanceClass };