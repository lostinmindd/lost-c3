import { LostCategory, AcesJSON, AceAction, AceParam, ParamType, StringParamOptions, ComboParamOptions, ComboItem, ObjectParamOptions, AceCondition, AceExpression } from 'lost-c3-lib';
import { ADDON_PATH } from './globals';
import fs from 'fs';

export async function createAcesJSONFile(categories: LostCategory[]) {
    let AcesJSON = {} as AcesJSON;

    categories.forEach(c => {

        AcesJSON[c.Id] = {
            "actions": [],
            "conditions": [],
            "expressions": []
        }

        c.Actions.forEach(action => {

            let aceAction = {} as AceAction;

            aceAction.id = action.Id;
            aceAction.scriptName = action.Options.ScriptName;
            aceAction.highlight = (action.Options.Highlight) ? action.Options.Highlight : false;
            aceAction.isDeprecated = (action.Options.Deprecated) ? action.Options.Deprecated : false;
            if (c.Deprecated) aceAction.isDeprecated = true;
            aceAction.isAsync = (action.Options.IsAsync) ? action.Options.IsAsync : false;
            
            if (action.Params) {

                aceAction["params"] = [];

                action.Params.forEach(param => {
                    let aceParam = {} as AceParam;

                    aceParam.id = param.Options.Id;
                    aceParam.type = param.Type;

                    aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : '""';
                    if (param.Type === ParamType.NUMBER) aceParam.initialValue = '';
                    
                    if (param.Type === ParamType.STRING) {
                        const Options = (param.Options as StringParamOptions);
                        aceParam.autocompleteId = (Options.AutocompleteId) ? Options.AutocompleteId : false;
                    }
                    if (param.Type === ParamType.COMBO) {
                        const Options = (param.Options as ComboParamOptions);
                        let items: string[] = [];

                        Options.Items.forEach((item: ComboItem) => {
                            items.push(item.Id);
                        })
                        aceParam.items = items;
                        /**
                         * Fix if initial item id is wrong
                         */
                        if (items.indexOf(aceParam.initialValue) === -1) aceParam.initialValue = items[0];
                    }
                    if (param.Type === ParamType.OBJECT) {
                        const Options = (param.Options as ObjectParamOptions);
                        if (Options.AllowedPluginIds) aceParam.allowedPluginIds = Options.AllowedPluginIds;
                    }

                    aceAction.params.push(aceParam);

                })

            }

            AcesJSON[c.Id]["actions"].push(aceAction);

        })

        c.Conditions.forEach(condition => {

            let aceCondition = {} as AceCondition;

            aceCondition.id = condition.Id;
            aceCondition.scriptName = condition.Options.ScriptName
            aceCondition.highlight = (condition.Options.Highlight) ? condition.Options.Highlight : false;
            aceCondition.isDeprecated = (condition.Options.Deprecated) ? condition.Options.Deprecated : false;
            if (c.Deprecated) aceCondition.isDeprecated = true;
            aceCondition.isTrigger = condition.Options.IsTrigger;
            aceCondition.isFakeTrigger = (condition.Options.IsFakeTrigger) ? condition.Options.IsFakeTrigger : false;
            aceCondition.isStatic = (condition.Options.IsStatic) ? condition.Options.IsStatic : false;
            aceCondition.isLooping = (condition.Options.IsLooping) ? condition.Options.IsLooping : false;
            aceCondition.isInvertible = (condition.Options.IsInvertible) ? condition.Options.IsInvertible : true;
            aceCondition.isCompatibleWithTriggers = (condition.Options.IsCompatibleWithTriggers) ? condition.Options.IsCompatibleWithTriggers : false;
        
            if (condition.Params) {

                aceCondition["params"] = [];

                condition.Params.forEach(param => {
                    let aceParam = {} as AceParam;

                    aceParam.id = param.Options.Id;
                    aceParam.type = param.Type;

                    aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : '""';
                    if (param.Type === ParamType.NUMBER) aceParam.initialValue = '';

                    if (param.Type === ParamType.STRING) {
                        const Options = (param.Options as StringParamOptions);
                        aceParam.autocompleteId = (Options.AutocompleteId) ? Options.AutocompleteId : false;
                    }
                    if (param.Type === ParamType.COMBO) {
                        const Options = (param.Options as ComboParamOptions);
                        let items: string[] = [];

                        Options.Items.forEach((item: ComboItem) => {
                            items.push(item.Id);
                        })
                        aceParam.items = items;
                        /**
                         * Fix if initial item id is wrong
                         */
                        if (items.indexOf(aceParam.initialValue) === -1) aceParam.initialValue = items[0];
                    }
                    if (param.Type === ParamType.OBJECT) {
                        const Options = (param.Options as ObjectParamOptions);
                        if (Options.AllowedPluginIds) aceParam.allowedPluginIds = Options.AllowedPluginIds;
                    }

                    aceCondition.params.push(aceParam);

                })

            }

            AcesJSON[c.Id]["conditions"].push(aceCondition);

        })

        c.Expressions.forEach(expression => {

            let aceExpression = {} as AceExpression;

            aceExpression.id = expression.Id;
            aceExpression.expressionName = expression.Options.ScriptName;
            aceExpression.highlight = (expression.Options.Highlight) ? expression.Options.Highlight : false;
            aceExpression.isDeprecated = (expression.Options.Deprecated) ? expression.Options.Deprecated : false;
            if (c.Deprecated) aceExpression.isDeprecated = true;
            aceExpression.returnType = expression.Options.ReturnType;
            aceExpression.isVariadicParameters = (expression.Options.IsVariadicParameters) ? expression.Options.IsVariadicParameters : false;
        
            if (expression.Params) {

                aceExpression["params"] = [];

                expression.Params.forEach(param => {
                    let aceParam = {} as AceParam;

                    aceParam.id = param.Options.Id;
                    aceParam.type = param.Type;

                    aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : '""';
                    if (param.Type === ParamType.NUMBER) aceParam.initialValue = '';
                    
                    if (param.Type === ParamType.STRING) {
                        const Options = (param.Options as StringParamOptions);
                        aceParam.autocompleteId = (Options.AutocompleteId) ? Options.AutocompleteId : false;
                    }

                    aceExpression.params.push(aceParam);

                })

            }

            AcesJSON[c.Id]["expressions"].push(aceExpression);

        })

    })

    fs.writeFileSync(`${ADDON_PATH}/aces.json`, JSON.stringify(AcesJSON, null, 4));

    return AcesJSON;
}
