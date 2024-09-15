
const SDK = globalThis.SDK;

const PLUGIN_ID = 'lost_';

const PLUGIN_CLASS = SDK.Plugins[PLUGIN_ID];

PLUGIN_CLASS.Instance = class LCInstance extends SDK.IInstanceBase
{
	constructor(sdkType: SDK.ITypeBase, inst: SDK.IObjectInstance) {
		super(sdkType, inst);
	}

	Release() {}

	OnCreate() {}
	
	OnPropertyChanged(id: string, value: EditorPropertyValueType) {}
};

export {}