
const SDK = globalThis.SDK;

const PLUGIN_ID = 'addon_id';
const PLUGIN_CATEGORY = "general";
const PLUGIN_AUTHOR = "author";

const PLUGIN_CLASS = SDK.Plugins[PLUGIN_ID] = class LPlugin extends SDK.IPluginBase
{
	constructor()
	{
		super(PLUGIN_ID);
		SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
		this._info.SetName(globalThis.lang(".name"));
		this._info.SetDescription(globalThis.lang(".description"));
		this._info.SetCategory(PLUGIN_CATEGORY);
		this._info.SetAuthor(PLUGIN_AUTHOR);
		this._info.SetHelpUrl(globalThis.lang(".help-url"));
		this._info.SetIsSingleGlobal(true);

		// Set the domSide.js script to run in the context of the DOM
		this._info.SetDOMSideScripts(["c3runtime/domSide.js"]);
		
		SDK.Lang.PushContext(".properties");
		
		this._info.SetProperties([]);
		
		SDK.Lang.PopContext();
		
		SDK.Lang.PopContext();
	}
};

PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);

export {}