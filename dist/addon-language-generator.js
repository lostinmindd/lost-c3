"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguageJSONFile = createLanguageJSONFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const console_log_colors_1 = require("console-log-colors");
const languagePath = path_1.default.join('build/addon/lang/en-US.json');
async function createLanguageJSONFile(LostConfig, categories, pluginProperties) {
    fs_1.default.mkdirSync('build/addon/lang', { recursive: true });
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('en-US.json')} file...`, 'white');
    return new Promise((res, rej) => {
        const PLUGIN_ID = (LostConfig.AddonId).toLowerCase();
        let LanguageJSON = {
            "languageTag": "en-US",
            "fileDescription": `Strings for ${LostConfig.AddonName} addon.`,
            "text": {
                "plugins": {
                    [PLUGIN_ID]: {
                        "name": LostConfig.ObjectName,
                        "description": LostConfig.AddonDescription,
                        "help-url": LostConfig.DocsURL,
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
            if (p.Type === "combo" /* PropertyType.COMBO */) {
                langProperty.items = {};
                //@ts-ignore
                p.Options.Items.forEach((item) => {
                    //@ts-ignore
                    langProperty["items"][item.Id] = item.Name;
                });
            }
            LanguageJSON.text.plugins[PLUGIN_ID].properties[p.Options.Id] = langProperty;
        });
        categories.forEach(c => {
            LanguageJSON.text.plugins[PLUGIN_ID].aceCategories[c.Id] = c.Name;
            c.Actions?.forEach(action => {
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
                            params[`${param.Options.Id}`]["items"] = {};
                            const param_path = params[`${param.Options.Id}`]["items"];
                            //@ts-ignore
                            param.Options.Items.forEach((item) => {
                                if (param_path) {
                                    param_path[item.Id] = item.Name;
                                }
                            });
                        }
                    });
                    languageAction["params"] = params;
                }
                LanguageJSON["text"]["plugins"][PLUGIN_ID].actions[action.Id] = languageAction;
            });
            c.Conditions?.forEach(condition => {
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
                            params[param.Options.Id]["items"] = {};
                            const param_path = params[param.Options.Id]["items"];
                            //@ts-ignore
                            param.Options.Items.forEach((item) => {
                                if (param_path) {
                                    param_path[item.Id] = item.Name;
                                }
                            });
                        }
                    });
                    languageCondition["params"] = params;
                }
                LanguageJSON["text"]["plugins"][PLUGIN_ID].conditions[condition.Id] = languageCondition;
            });
            c.Expressions?.forEach(expression => {
                let languageExpression = {};
                languageExpression["translated-name"] = expression.DisplayText;
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
                LanguageJSON["text"]["plugins"][PLUGIN_ID].expressions[expression.Id] = languageExpression;
            });
        });
        fs_1.default.writeFileSync(languagePath, JSON.stringify(LanguageJSON, null, 4));
        res(LanguageJSON);
    });
}
