"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PluginPropertyType;
(function (PluginPropertyType) {
    PluginPropertyType["INTEGER"] = "integer";
    PluginPropertyType["FLOAT"] = "float";
    PluginPropertyType["PERCENT"] = "percent";
    PluginPropertyType["TEXT"] = "text";
    PluginPropertyType["LONG_TEXT"] = "longtext";
    PluginPropertyType["CHECK"] = "check";
    PluginPropertyType["FONT"] = "font";
    PluginPropertyType["COMBO"] = "combo";
    PluginPropertyType["COLOR"] = "color";
    PluginPropertyType["OBJECT"] = "object";
    PluginPropertyType["GROUP"] = "group"; /**
    creates a new group in the Properties Bar. There is no value associated with this property.
    */
})(PluginPropertyType || (PluginPropertyType = {}));
const SDK = globalThis.SDK;
const Config = {};
const PluginProperties = [];
const PLUGIN_CLASS = SDK.Plugins[Config.AddonId] = class LPlugin extends SDK.IPluginBase {
    constructor() {
        super(Config.AddonId);
        SDK.Lang.PushContext("plugins." + Config.AddonId.toLowerCase());
        this._info.SetName(globalThis.lang(".name"));
        this._info.SetDescription(globalThis.lang(".description"));
        this._info.SetCategory(Config.AddonCategory);
        this._info.SetAuthor(Config.Author);
        this._info.SetHelpUrl(globalThis.lang(".help-url"));
        this._info.SetIcon(Config.Icon.FileName, Config.Icon.Type);
        this._info.SetIsDeprecated(Config.IsDeprecated || false);
        this._info.SetCanBeBundled(Config.CanBeBundled || true);
        this._info.SetIsSingleGlobal(Config.IsSingleGlobal || false);
        SDK.Lang.PushContext(".properties");
        this._info.SetDOMSideScripts(["c3runtime/domSide.js"]);
        if (Config.Scripts) {
            Config.Scripts.forEach(script => {
                if (script.Type === 'external-dom-script') {
                    const scriptType = script.ScriptType;
                    if (scriptType) {
                        this._info.AddFileDependency({ filename: 'libs/' + script.FileName, type: script.Type, fileType: scriptType });
                    }
                    else {
                        this._info.AddFileDependency({ filename: 'libs/' + script.FileName, type: script.Type });
                    }
                }
                if (script.Type === 'external-runtime-script') {
                    this._info.AddFileDependency({ filename: 'libs/' + script.FileName, type: script.Type });
                }
            });
        }
        if (Config.Files) {
            Config.Files.forEach(file => {
                this._info.AddFileDependency({ filename: 'files/' + file.FileName, type: file.Type });
            });
        }
        if (Config.RemoteScripts) {
            Config.RemoteScripts.forEach(URL => {
                this._info.AddRemoteScriptDependency(URL);
            });
        }
        const pluginProperties = [];
        PluginProperties.forEach(pp => {
            if (pp.Type === PluginPropertyType.INTEGER) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.FLOAT) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.PERCENT) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.TEXT) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.LONG_TEXT) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.CHECK) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.FONT) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.COMBO) {
                const Options = pp.Options;
                const Items = Options.Items.map(i => i.Id);
                let InitialValue = Options.InitialValue;
                if (Items.indexOf(Options.InitialValue) === -1) {
                    InitialValue = Items[0];
                }
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, {
                    items: Items,
                    initialValue: InitialValue
                }));
            }
            if (pp.Type === PluginPropertyType.COLOR) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: pp.Options.InitialValue }));
            }
            if (pp.Type === PluginPropertyType.OBJECT) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id, { allowedPluginIds: pp.Options.AllowedPluginIds }));
            }
            if (pp.Type === PluginPropertyType.GROUP) {
                pluginProperties.push(new SDK.PluginProperty(pp.Type, pp.Options.Id));
            }
        });
        this._info.SetProperties(pluginProperties);
        SDK.Lang.PopContext();
        SDK.Lang.PopContext();
    }
};
PLUGIN_CLASS.Register(Config.AddonId, PLUGIN_CLASS);
