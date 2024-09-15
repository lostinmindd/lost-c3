
const SDK = globalThis.SDK;

const PLUGIN_ID = 'lost_';

const PLUGIN_CLASS = SDK.Plugins[PLUGIN_ID];

PLUGIN_CLASS.Type = class LPluginType extends SDK.ITypeBase {
	constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType) {
		super(sdkPlugin, iObjectType);
	}
};

export {}