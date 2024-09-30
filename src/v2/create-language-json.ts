import { Lost } from 'lost-c3-lib';
import { ADDON_PATH } from './globals';
import fs from 'fs';

export async function createLanguageJSONFile(config: Lost.Config, categories: Lost.Category[], pluginProperties: Lost.PluginProperty[]) {
    const PLUGIN_ID = (config.AddonId).toLowerCase();

    let LanguageJSON = {
        "languageTag": "en-US",
        "fileDescription": `Strings for ${config.AddonName} addon.`,
        "text": {
            "plugins": {
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
    } as Lost.LanguageJSON;

    pluginProperties.forEach(p => {
        let langProperty = {} as Lost.LanguagePluginProperty;

        langProperty.name = p.Options.Name;
        langProperty.desc = (p.Options.Description) ? p.Options.Description : "";

        if (p.Type === Lost.PluginPropertyType.COMBO) {
            const Options = p.Options as Lost.ComboPropertyOptions;
            langProperty["items"] = {};

            Options.Items.forEach((item: Lost.ComboItem) => {
                if (langProperty["items"]) langProperty["items"][item.Id] = item.Name;
            })
        }

        LanguageJSON.text.plugins[PLUGIN_ID].properties[p.Options.Id] = langProperty;
    })

    categories.forEach(c => {

        LanguageJSON.text.plugins[PLUGIN_ID].aceCategories[c.Id] = c.Name;

        c.Actions.forEach(action => {

            let languageAction = {} as Lost.LanguageAction;

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
                    
                    if (param.Type === Lost.ParamType.COMBO) {
                        const Options = param.Options as Lost.ComboParamOptions;
                        params[Options.Id]["items"] = {};

                        Options.Items.forEach((item: Lost.ComboItem) => {
                            if (params[`${Options.Id}`]["items"]) params[`${Options.Id}`]["items"][item.Id] = item.Name;
                        })
                    }

                })

                languageAction["params"] = params;

            }

            LanguageJSON["text"]["plugins"][PLUGIN_ID].actions[action.Id] = languageAction;

        })

        c.Conditions.forEach(condition => {

            let languageCondition = {} as Lost.LanguageCondition;

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
                    
                    if (param.Type === Lost.ParamType.COMBO) {
                        const Options = param.Options as Lost.ComboParamOptions;
                        params[Options.Id]["items"] = {};

                        Options.Items.forEach((item: Lost.ComboItem) => {
                            if (params[`${Options.Id}`]["items"]) params[`${Options.Id}`]["items"][item.Id] = item.Name;
                        })
                    }

                })

                languageCondition["params"] = params;

            }

            LanguageJSON["text"]["plugins"][PLUGIN_ID].conditions[condition.Id] = languageCondition;

        })

        c.Expressions.forEach(expression => {

            let languageExpression = {} as Lost.LanguageExpression;

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

            LanguageJSON["text"]["plugins"][PLUGIN_ID].expressions[expression.Id] = languageExpression;

        })

    })

    fs.writeFileSync(`${ADDON_PATH}/lang/en-US.json`, JSON.stringify(LanguageJSON, null, 4));

    return LanguageJSON;
}
