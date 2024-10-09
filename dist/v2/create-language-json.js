"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguageJSONFile = createLanguageJSONFile;
const lost_c3_lib_1 = require("lost-c3-lib");
const globals_1 = require("./globals");
const fs_1 = __importDefault(require("fs"));
async function createLanguageJSONFile(config, categories, pluginProperties) {
    const PLUGIN_ID = (config.AddonId).toLowerCase();
    const ADDON_TYPE = `${config.Type}s`;
    let LanguageJSON = {
        "languageTag": "en-US",
        "fileDescription": `Strings for ${config.AddonName} addon.`,
        "text": {
            [ADDON_TYPE]: {
                [PLUGIN_ID]: {
                    "name": config.ObjectName,
                    "description": config.AddonDescription,
                    "help-url": config.DocsURL,
                    "properties": {},
                    "aceCategories": {},
                    "conditions": {},
                    "actions": {},
                    "expressions": {}
                }
            }
        }
    };
    pluginProperties.forEach(p => {
        let langProperty = {};
        langProperty.name = p.Options.Name;
        langProperty.desc = (p.Options.Description) ? p.Options.Description : "";
        if (p.Type === lost_c3_lib_1.PluginPropertyType.COMBO) {
            const Options = p.Options;
            langProperty["items"] = {};
            Options.Items.forEach((item) => {
                if (langProperty["items"])
                    langProperty["items"][item.Id] = item.Name;
            });
        }
        LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].properties[p.Options.Id] = langProperty;
    });
    categories.forEach(c => {
        LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].aceCategories[c.Id] = c.Name;
        c.Actions.forEach(action => {
            let languageAction = {};
            languageAction["list-name"] = action.Name;
            languageAction["display-text"] = action.DisplayText;
            languageAction["description"] = (action.Description) ? action.Description : "";
            if (action.Params) {
                let params = {};
                action.Params.forEach(param => {
                    params[param.Options.Id] = {
                        "name": param.Options.Name,
                        "desc": (param.Options.Description) ? param.Options.Description : ""
                    };
                    if (param.Type === "combo" /* ParamType.COMBO */) {
                        const Options = param.Options;
                        params[Options.Id]["items"] = {};
                        Options.Items.forEach((item) => {
                            if (params[`${Options.Id}`]["items"])
                                params[`${Options.Id}`]["items"][item.Id] = item.Name;
                        });
                    }
                });
                languageAction["params"] = params;
            }
            LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].actions[action.Id] = languageAction;
        });
        c.Conditions.forEach(condition => {
            let languageCondition = {};
            languageCondition["list-name"] = condition.Name;
            languageCondition["display-text"] = condition.DisplayText;
            languageCondition["description"] = (condition.Description) ? condition.Description : "";
            if (condition.Params) {
                let params = {};
                condition.Params.forEach(param => {
                    params[param.Options.Id] = {
                        "name": param.Options.Name,
                        "desc": (param.Options.Description) ? param.Options.Description : ""
                    };
                    if (param.Type === "combo" /* ParamType.COMBO */) {
                        const Options = param.Options;
                        params[Options.Id]["items"] = {};
                        Options.Items.forEach((item) => {
                            if (params[`${Options.Id}`]["items"])
                                params[`${Options.Id}`]["items"][item.Id] = item.Name;
                        });
                    }
                });
                languageCondition["params"] = params;
            }
            LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].conditions[condition.Id] = languageCondition;
        });
        c.Expressions.forEach(expression => {
            let languageExpression = {};
            languageExpression["translated-name"] = expression.Name;
            languageExpression["description"] = (expression.Description) ? expression.Description : "";
            if (expression.Params) {
                let params = {};
                expression.Params.forEach(param => {
                    params[param.Options.Id] = {
                        "name": param.Options.Name,
                        "desc": (param.Options.Description) ? param.Options.Description : ""
                    };
                });
                languageExpression["params"] = params;
            }
            LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].expressions[expression.Id] = languageExpression;
        });
    });
    fs_1.default.writeFileSync(`${globals_1.ADDON_PATH}/lang/en-US.json`, JSON.stringify(LanguageJSON, null, 4));
    return LanguageJSON;
}
