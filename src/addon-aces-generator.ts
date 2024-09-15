import { Lost } from 'lost-lib';
import { ComboItemType, ParamType } from 'lost-lib';
import fs from 'fs';
import path from 'path';
import { log, yellow } from 'console-log-colors';

const acesPath = path.join('build/addon/aces.json');

export async function createAcesJSONFile(categories: Lost.ICategory[]) {
    log(`Creating ${yellow('aces.json')} file...`, 'white');
    return new Promise<Lost.AcesJSON.IAcesJSON>((res, rej) => {

        let AcesJSON = {} as Lost.AcesJSON.IAcesJSON;

        categories.forEach(c => {
    
            AcesJSON[c.Id] = {
                "actions": [],
                "conditions": [],
                "expressions": []
            }
    
            c.Actions?.forEach(action => {
    
                let aceAction = {} as Lost.AcesJSON.IAceAction;
    
                aceAction.id = action.Id;
                aceAction.scriptName = action.Options.Script.name;
                aceAction.highlight = (action.Options.Highlight) ? action.Options.Highlight : false;
                aceAction.isDeprecated = (action.Options.IsDeprecated) ? action.Options.IsDeprecated : false;
                aceAction.isAsync = (action.Options.IsAsync) ? action.Options.IsAsync : false;
                
                if (action.Params) {
    
                    aceAction["params"] = [];
    
                    action.Params.forEach(param => {
                        let aceParam = {} as Lost.AcesJSON.IAceParam;
    
                        aceParam.id = param.Options.Id;
                        aceParam.type = param.Type;
    
                        aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                        
                        if (param.Type === ParamType.STRING) {
                            //@ts-ignore
                            aceParam.autocompleteId = (param.Options.AutocompleteId) ? param.Options.AutocompleteId : false;
                        }
                        if (param.Type === ParamType.COMBO) {
                            let items: string[] = [];
                            //@ts-ignore
                            param.Options.Items.forEach((item: ComboItemType) => {
                                items.push(item.Id);
                            })
                            aceParam.items = items;
                            /**
                             * Fix if initial item id is wrong
                             */
                            if (items.indexOf(aceParam.initialValue) === -1) aceParam.initialValue = items[0];
                        }
                        if (param.Type === ParamType.OBJECT) {
                            //@ts-ignore
                            aceParam.allowedPluginIds = (param.Options.AllowedPluginIds) ? param.Options.AllowedPluginIds : false;
                        }
    
                        aceAction.params.push(aceParam);
    
                    })
    
                }
    
                AcesJSON[c.Id]["actions"].push(aceAction);
    
            })
    
            c.Conditions?.forEach(condition => {
    
                let aceCondition = {} as Lost.AcesJSON.IAceCondition;
    
                aceCondition.id = condition.Id;
                aceCondition.scriptName = condition.Options.Script.name;
                aceCondition.highlight = (condition.Options.Highlight) ? condition.Options.Highlight : false;
                aceCondition.isDeprecated = (condition.Options.IsDeprecated) ? condition.Options.IsDeprecated : false;
                aceCondition.isTrigger = condition.Options.IsTrigger;
                aceCondition.isFakeTrigger = (condition.Options.IsFakeTrigger) ? condition.Options.IsFakeTrigger : false;
                aceCondition.isStatic = (condition.Options.IsStatic) ? condition.Options.IsStatic : false;
                aceCondition.isLooping = (condition.Options.IsLooping) ? condition.Options.IsLooping : false;
                aceCondition.isInvertible = (condition.Options.IsInvertible) ? condition.Options.IsInvertible : false;
                aceCondition.isCompatibleWithTriggers = (condition.Options.IsCompatibleWithTriggers) ? condition.Options.IsCompatibleWithTriggers : false;
            
                if (condition.Params) {
    
                    aceCondition["params"] = [];
    
                    condition.Params.forEach(param => {
                        let aceParam = {} as Lost.AcesJSON.IAceParam;
    
                        aceParam.id = param.Options.Id;
                        aceParam.type = param.Type;
    
                        aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                        
                        if (param.Type === ParamType.STRING) {
                            //@ts-ignore
                            aceParam.autocompleteId = (param.Options.AutocompleteId) ? param.Options.AutocompleteId : false;
                        }
                        if (param.Type === ParamType.COMBO) {
                            let items: string[] = [];
                            //@ts-ignore
                            param.Options.Items.forEach((item: ComboItemType) => {
                                items.push(item.Id);
                            })
                            aceParam.items = items;
                        }
                        if (param.Type === ParamType.OBJECT) {
                            //@ts-ignore
                            aceParam.allowedPluginIds = (param.Options.AllowedPluginIds) ? param.Options.AllowedPluginIds : false;
                        }
    
                        aceCondition.params.push(aceParam);
    
                    })
    
                }
    
                AcesJSON[c.Id]["conditions"].push(aceCondition);
    
            })
    
            c.Expressions?.forEach(expression => {
    
                let aceExpression = {} as Lost.AcesJSON.IAceExpression;
    
                aceExpression.id = expression.Id;
                aceExpression.expressionName = expression.Options.Script.name;
                aceExpression.highlight = (expression.Options.Highlight) ? expression.Options.Highlight : false;
                aceExpression.isDeprecated = (expression.Options.IsDeprecated) ? expression.Options.IsDeprecated : false;
                aceExpression.returnType = expression.Options.ReturnType;
                aceExpression.isVariadicParameters = (expression.Options.IsVariadicParameters) ? expression.Options.IsVariadicParameters : false;
            
                if (expression.Params) {
    
                    aceExpression["params"] = [];
    
                    expression.Params.forEach(param => {
                        let aceParam = {} as Lost.AcesJSON.IAceParam;
    
                        aceParam.id = param.Options.Id;
                        aceParam.type = param.Type;
    
                        aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                        
                        if (param.Type === ParamType.STRING) {
                            //@ts-ignore
                            aceParam.autocompleteId = (param.Options.AutocompleteId) ? param.Options.AutocompleteId : false;
                        }
    
                        aceExpression.params.push(aceParam);
    
                    })
    
                }
    
                AcesJSON[c.Id]["expressions"].push(aceExpression);
    
            })
    
        })
    
        fs.writeFileSync(acesPath, JSON.stringify(AcesJSON, null, 4));
        res(AcesJSON)

    })
}
