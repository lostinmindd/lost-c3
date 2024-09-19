import { Lost } from 'lost-lib';
import { ComboItemType, ParamType } from 'lost-lib';
import { LostPluginPropertyType, PropertyType } from 'lost-lib';
import fs from 'fs';
import path from 'path';
import { log, yellow } from 'console-log-colors';

const languagePath = path.join('build/addon/lang/en-US.json');

export async function createLanguageJSONFile(LostConfig: Lost.IConfig, categories: Lost.ICategory[], pluginProperties: LostPluginPropertyType[]) {
    fs.mkdirSync('build/addon/lang', { recursive: true })
    log(`Creating ${yellow('en-US.json')} file...`, 'white');
    return new Promise<Lost.LanguageJSON.enUSJSON>((res, rej) => {
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
        } as Lost.LanguageJSON.enUSJSON;
    
        pluginProperties.forEach(p => {
            let langProperty = {} as Lost.LanguageJSON.ILanguagePluginProperty;
    
            langProperty.name = p.Options.Name;
            langProperty.desc = (p.Options.Description) ? p.Options.Description : "";
    
            if (p.Type === PropertyType.COMBO) {
                langProperty.items = {};
                //@ts-ignore
                p.Options.Items.forEach((item: ComboItemType) => {
                    //@ts-ignore
                    langProperty["items"][item.Id] = item.Name;
                })
            }
    
            LanguageJSON.text.plugins[PLUGIN_ID].properties[p.Options.Id] = langProperty;
        })
    
        categories.forEach(c => {
    
            LanguageJSON.text.plugins[PLUGIN_ID].aceCategories[c.Id] = c.Name;
    
            c.Actions?.forEach(action => {
    
                let languageAction = {} as Lost.LanguageJSON.ILanguageAction;
    
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

                            params[`${param.Options.Id}`]["items"] = {};
                            const param_path = params[`${param.Options.Id}`]["items"];
                            //@ts-ignore
                            param.Options.Items.forEach((item: ComboItemType) => {
                                if (param_path) {
                                    param_path[item.Id] = item.Name;
                                }
                            })

                        }
    
                    })

                    languageAction["params"] = params;
    
                }
    
                LanguageJSON["text"]["plugins"][PLUGIN_ID].actions[action.Id] = languageAction;
    
            })

            c.Conditions?.forEach(condition => {
    
                let languageCondition = {} as Lost.LanguageJSON.ILanguageCondition;
    
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

                            params[param.Options.Id]["items"] = {};
                            const param_path = params[param.Options.Id]["items"];
                            //@ts-ignore
                            param.Options.Items.forEach((item: ComboItemType) => {
                                if (param_path) {
                                    param_path[item.Id] = item.Name;
                                }
                            })

                        }
    
                    })

                    languageCondition["params"] = params;
    
                }
    
                LanguageJSON["text"]["plugins"][PLUGIN_ID].conditions[condition.Id] = languageCondition;
    
            })

            c.Expressions?.forEach(expression => {
    
                let languageExpression = {} as Lost.LanguageJSON.ILanguageExpression;
    
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
    
        fs.writeFileSync(languagePath, JSON.stringify(LanguageJSON, null, 4));
        res(LanguageJSON);
    })
}
