import type { Lost } from "lost-lib";

enum PluginPropertyType {
    INTEGER = "integer", /**
     * an integer number property, always rounded to a whole number.
     */
    FLOAT = "float", /**
     * a floating-point number property.
     */
    PERCENT = "percent", /**
     * a floating-point number in the range [0-1] represented as a percentage. 
    For example if the user enters 50%, the property will be set to a value of 0.5.
     */
    TEXT = "text", /**
     * a field the user can enter a string in to.
     */
    LONG_TEXT = "longtext", /**
     * the same as "text", but a button with an ellipsis ("...") appears on the right side of the field. 
    The user can click this button to open a dialog to edit a long string more conveniently. 
    This is useful for potentially long content like the project description, or the main text of the Text object.
     */
    CHECK = "check", /**
     * a checkbox property, returning a boolean.
     */
    FONT = "font", /**
     * a field which displays the name of a font and provides a button to open a font picker dialog. 
    The property is set to a string of the name of the font.
     */
    COMBO = "combo", /**
     * a dropdown list property. 
    The property is set to the zero-based index of the chosen item. 
    The items field of the options object must be used to specify the available items.
     */
    COLOR = "color", /**
     * For plugins only — a color picker property. 
    The initial value must be an array, e.g. [1, 0, 0] for red.
     */
    OBJECT = "object", /**
    For plugins only — an object picker property allowing the user to pick an object class. 
    Note: At runtime, this passes a SID (Serialization ID) for the chosen object class, or -1 if none was picked.
     Use the runtime method GetObjectClassBySID to look up the corresponding ObjectClass. 
     */
    GROUP = "group" /**
    creates a new group in the Properties Bar. There is no value associated with this property. 
    */
}
const SDK = globalThis.SDK;

const Config: Lost.Config = {} as Lost.Config;
const PluginProperties: Lost.PluginProperty[] = [];

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

        if (Config.Scripts) {
            Config.Scripts.forEach(script => {
                if (script.Type === 'external-dom-script') {
                    const scriptType = (script as Lost.ExternalDomScript).ScriptType;
                    if (scriptType) {
                        this._info.AddFileDependency({filename: 'libs/' +  script.FileName, type: script.Type, fileType: scriptType});
                    } else {
                        this._info.AddFileDependency({filename: 'libs/' + script.FileName, type: script.Type});
                    }
                }
                if (script.Type === 'external-runtime-script') {
                    this._info.AddFileDependency({filename: 'libs/' + script.FileName, type: script.Type});
                }
            })
        }
        
        if (Config.Files) {
            Config.Files.forEach(file => {
                this._info.AddFileDependency({filename:  'files/' + file.FileName, type: file.Type})
            })
        }

        if (Config.RemoteScripts) {
            Config.RemoteScripts.forEach(URL => {
                this._info.AddRemoteScriptDependency(URL);
            })
        }

        const pluginProperties: SDK.PluginProperty[] = [];
        PluginProperties.forEach(pp => {
            if (pp.Type === PluginPropertyType.INTEGER) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.IntegerPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.FLOAT) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.FloatPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.PERCENT) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.PercentPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.TEXT) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.TextPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.LONG_TEXT) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.LongTextPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.CHECK) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.CheckPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.FONT) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.FontPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.COMBO) {
                const Options = (pp.Options as Lost.ComboPropertyOptions);
                const Items: string[] = Options.Items.map(i => i.Id);

                let InitialValue = Options.InitialValue;
                if (Items.indexOf(Options.InitialValue) === -1) {
                    InitialValue = Items[0];
                }
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, {
                        items: Items,
                        initialValue: InitialValue
                    })
                );
            }
            if (pp.Type === PluginPropertyType.COLOR) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { initialValue: (pp.Options as Lost.ColorPropertyOptions).InitialValue })
                );
            }
            if (pp.Type === PluginPropertyType.OBJECT) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id, { allowedPluginIds: (pp.Options as Lost.ObjectPropertyOptions).AllowedPluginIds })
                );
            }
            if (pp.Type === PluginPropertyType.GROUP) {
                pluginProperties.push(
                    new SDK.PluginProperty(pp.Type, pp.Options.Id)
                );
            }
        })
        this._info.SetProperties(pluginProperties);

        SDK.Lang.PopContext();
        SDK.Lang.PopContext();
    }
};

PLUGIN_CLASS.Register(Config.AddonId, PLUGIN_CLASS);

export {};
