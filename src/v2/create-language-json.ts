import { 
    PluginConfig, BehaviorConfig, LostCategory, PluginProperty, 
    type LanguagePluginProperty, type LanguageJSON, ComboPropertyOptions,
    PluginPropertyType, ComboItem, LanguageAction, ComboParamOptions,
    ParamType, LanguageCondition, LanguageExpression
} from 'lost-c3-lib';
import { ADDON_PATH } from './globals';
import fs from 'fs';

export async function createLanguageJSONFile(config: PluginConfig | BehaviorConfig, categories: LostCategory[], pluginProperties: PluginProperty[]) {
    const PLUGIN_ID = (config.AddonId).toLowerCase();
    const ADDON_TYPE = `${config.Type}s`
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
    } as LanguageJSON;

    pluginProperties.forEach(p => {
        let langProperty = {} as LanguagePluginProperty;

        langProperty.name = p.Options.Name;
        langProperty.desc = (p.Options.Description) ? p.Options.Description : "";

        if (p.Type === PluginPropertyType.COMBO) {
            const Options = p.Options as ComboPropertyOptions;
            langProperty["items"] = {};

            Options.Items.forEach((item: ComboItem) => {
                if (langProperty["items"]) langProperty["items"][item.Id] = item.Name;
            })
        }

        LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].properties[p.Options.Id] = langProperty;
    })

    categories.forEach(c => {

        LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].aceCategories[c.Id] = c.Name;

        c.Actions.forEach(action => {

            let languageAction = {} as LanguageAction;

            languageAction["list-name"] = action.Name;
            languageAction["display-text"] = action.DisplayText;
            languageAction["description"] = (action.Description) ? action.Description : "";

            if (action.Params) {

                let params: any = {};

                action.Params.forEach(param => {

                    params[param.Options.Id] = {
                        "name": param.Options.Name,
                        "desc": (param.Options.Description) ? param.Options.Description : ""
                    }
                    
                    if (param.Type === ParamType.COMBO) {
                        const Options = param.Options as ComboParamOptions;
                        params[Options.Id]["items"] = {};

                        Options.Items.forEach((item: ComboItem) => {
                            if (params[`${Options.Id}`]["items"]) params[`${Options.Id}`]["items"][item.Id] = item.Name;
                        })
                    }

                })

                languageAction["params"] = params;

            }

            LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].actions[action.Id] = languageAction;

        })

        c.Conditions.forEach(condition => {

            let languageCondition = {} as LanguageCondition;

            languageCondition["list-name"] = condition.Name;
            languageCondition["display-text"] = condition.DisplayText;
            languageCondition["description"] = (condition.Description) ? condition.Description : "";

            if (condition.Params) {

                let params: any = {};

                condition.Params.forEach(param => {

                    params[param.Options.Id] = {
                        "name": param.Options.Name,
                        "desc": (param.Options.Description) ? param.Options.Description : ""
                    }
                    
                    if (param.Type === ParamType.COMBO) {
                        const Options = param.Options as ComboParamOptions;
                        params[Options.Id]["items"] = {};

                        Options.Items.forEach((item: ComboItem) => {
                            if (params[`${Options.Id}`]["items"]) params[`${Options.Id}`]["items"][item.Id] = item.Name;
                        })
                    }

                })

                languageCondition["params"] = params;

            }

            LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].conditions[condition.Id] = languageCondition;

        })

        c.Expressions.forEach(expression => {

            let languageExpression = {} as LanguageExpression;

            languageExpression["translated-name"] = expression.DisplayText;
            languageExpression["description"] = (expression.Description) ? expression.Description : "";

            if (expression.Params) {

                let params: any = {};

                expression.Params.forEach(param => {

                    params[param.Options.Id] = {
                        "name": param.Options.Name,
                        "desc": (param.Options.Description) ? param.Options.Description : ""
                    }

                })

                languageExpression["params"] = params;
            }

            LanguageJSON["text"][ADDON_TYPE][PLUGIN_ID].expressions[expression.Id] = languageExpression;

        })

    })

    fs.writeFileSync(`${ADDON_PATH}/lang/en-US.json`, JSON.stringify(LanguageJSON, null, 4));

    return LanguageJSON;
}
