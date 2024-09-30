"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcesJSONFile = createAcesJSONFile;
const globals_1 = require("./globals");
const fs_1 = __importDefault(require("fs"));
async function createAcesJSONFile(categories) {
    let AcesJSON = {};
    categories.forEach(c => {
        AcesJSON[c.Id] = {
            "actions": [],
            "conditions": [],
            "expressions": []
        };
        c.Actions.forEach(action => {
            let aceAction = {};
            aceAction.id = action.Id;
            aceAction.scriptName = action.Options.ScriptName;
            aceAction.highlight = (action.Options.Highlight) ? action.Options.Highlight : false;
            aceAction.isDeprecated = (action.Options.Deprecated) ? action.Options.Deprecated : false;
            aceAction.isAsync = (action.Options.IsAsync) ? action.Options.IsAsync : false;
            if (action.Params) {
                aceAction["params"] = [];
                action.Params.forEach(param => {
                    let aceParam = {};
                    aceParam.id = param.Options.Id;
                    aceParam.type = param.Type;
                    aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                    if (param.Type === "string" /* Lost.ParamType.STRING */) {
                        const Options = param.Options;
                        aceParam.autocompleteId = (Options.AutocompleteId) ? Options.AutocompleteId : false;
                    }
                    if (param.Type === "combo" /* Lost.ParamType.COMBO */) {
                        const Options = param.Options;
                        let items = [];
                        Options.Items.forEach((item) => {
                            items.push(item.Id);
                        });
                        aceParam.items = items;
                        /**
                         * Fix if initial item id is wrong
                         */
                        if (items.indexOf(aceParam.initialValue) === -1)
                            aceParam.initialValue = items[0];
                    }
                    if (param.Type === "object" /* Lost.ParamType.OBJECT */) {
                        const Options = param.Options;
                        if (Options.AllowedPluginIds)
                            aceParam.allowedPluginIds = Options.AllowedPluginIds;
                    }
                    aceAction.params.push(aceParam);
                });
            }
            AcesJSON[c.Id]["actions"].push(aceAction);
        });
        c.Conditions.forEach(condition => {
            let aceCondition = {};
            aceCondition.id = condition.Id;
            aceCondition.scriptName = condition.Options.ScriptName;
            aceCondition.highlight = (condition.Options.Highlight) ? condition.Options.Highlight : false;
            aceCondition.isDeprecated = (condition.Options.Deprecated) ? condition.Options.Deprecated : false;
            aceCondition.isTrigger = condition.Options.IsTrigger;
            aceCondition.isFakeTrigger = (condition.Options.IsFakeTrigger) ? condition.Options.IsFakeTrigger : false;
            aceCondition.isStatic = (condition.Options.IsStatic) ? condition.Options.IsStatic : false;
            aceCondition.isLooping = (condition.Options.IsLooping) ? condition.Options.IsLooping : false;
            aceCondition.isInvertible = (condition.Options.IsInvertible) ? condition.Options.IsInvertible : false;
            aceCondition.isCompatibleWithTriggers = (condition.Options.IsCompatibleWithTriggers) ? condition.Options.IsCompatibleWithTriggers : false;
            if (condition.Params) {
                aceCondition["params"] = [];
                condition.Params.forEach(param => {
                    let aceParam = {};
                    aceParam.id = param.Options.Id;
                    aceParam.type = param.Type;
                    aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                    if (param.Type === "string" /* Lost.ParamType.STRING */) {
                        const Options = param.Options;
                        aceParam.autocompleteId = (Options.AutocompleteId) ? Options.AutocompleteId : false;
                    }
                    if (param.Type === "combo" /* Lost.ParamType.COMBO */) {
                        const Options = param.Options;
                        let items = [];
                        Options.Items.forEach((item) => {
                            items.push(item.Id);
                        });
                        aceParam.items = items;
                        /**
                         * Fix if initial item id is wrong
                         */
                        if (items.indexOf(aceParam.initialValue) === -1)
                            aceParam.initialValue = items[0];
                    }
                    if (param.Type === "object" /* Lost.ParamType.OBJECT */) {
                        const Options = param.Options;
                        if (Options.AllowedPluginIds)
                            aceParam.allowedPluginIds = Options.AllowedPluginIds;
                    }
                    aceCondition.params.push(aceParam);
                });
            }
            AcesJSON[c.Id]["conditions"].push(aceCondition);
        });
        c.Expressions.forEach(expression => {
            let aceExpression = {};
            aceExpression.id = expression.Id;
            aceExpression.expressionName = expression.Options.ScriptName;
            aceExpression.highlight = (expression.Options.Highlight) ? expression.Options.Highlight : false;
            aceExpression.isDeprecated = (expression.Options.Deprecated) ? expression.Options.Deprecated : false;
            aceExpression.returnType = expression.Options.ReturnType;
            aceExpression.isVariadicParameters = (expression.Options.IsVariadicParameters) ? expression.Options.IsVariadicParameters : false;
            if (expression.Params) {
                aceExpression["params"] = [];
                expression.Params.forEach(param => {
                    let aceParam = {};
                    aceParam.id = param.Options.Id;
                    aceParam.type = param.Type;
                    aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                    if (param.Type === "string" /* Lost.ParamType.STRING */) {
                        const Options = param.Options;
                        aceParam.autocompleteId = (Options.AutocompleteId) ? Options.AutocompleteId : false;
                    }
                    aceExpression.params.push(aceParam);
                });
            }
            AcesJSON[c.Id]["expressions"].push(aceExpression);
        });
    });
    fs_1.default.writeFileSync(`${globals_1.ADDON_PATH}/aces.json`, JSON.stringify(AcesJSON, null, 4));
    return AcesJSON;
}
