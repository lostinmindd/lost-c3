"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcesJSONFile = createAcesJSONFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const console_log_colors_1 = require("console-log-colors");
const acesPath = path_1.default.join('build/addon/aces.json');
async function createAcesJSONFile(categories) {
    (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('aces.json')} file...`, 'white');
    return new Promise((res, rej) => {
        let AcesJSON = {};
        categories.forEach(c => {
            AcesJSON[c.Id] = {
                "actions": [],
                "conditions": [],
                "expressions": []
            };
            c.Actions?.forEach(action => {
                let aceAction = {};
                aceAction.id = action.Id;
                aceAction.scriptName = action.Options.Script.name;
                aceAction.highlight = (action.Options.Highlight) ? action.Options.Highlight : false;
                aceAction.isDeprecated = (action.Options.IsDeprecated) ? action.Options.IsDeprecated : false;
                aceAction.isAsync = (action.Options.IsAsync) ? action.Options.IsAsync : false;
                if (action.Params) {
                    aceAction["params"] = [];
                    action.Params.forEach(param => {
                        let aceParam = {};
                        aceParam.id = param.Options.Id;
                        aceParam.type = param.Type;
                        aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                        if (param.Type === "string" /* ParamType.STRING */) {
                            //@ts-ignore
                            aceParam.autocompleteId = (param.Options.AutocompleteId) ? param.Options.AutocompleteId : false;
                        }
                        if (param.Type === "combo" /* ParamType.COMBO */) {
                            let items = [];
                            //@ts-ignore
                            param.Options.Items.forEach((item) => {
                                items.push(item.Id);
                            });
                            aceParam.items = items;
                            /**
                             * Fix if initial item id is wrong
                             */
                            if (items.indexOf(aceParam.initialValue) === -1)
                                aceParam.initialValue = items[0];
                        }
                        if (param.Type === "object" /* ParamType.OBJECT */) {
                            //@ts-ignore
                            aceParam.allowedPluginIds = (param.Options.AllowedPluginIds) ? param.Options.AllowedPluginIds : false;
                        }
                        aceAction.params.push(aceParam);
                    });
                }
                AcesJSON[c.Id]["actions"].push(aceAction);
            });
            c.Conditions?.forEach(condition => {
                let aceCondition = {};
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
                        let aceParam = {};
                        aceParam.id = param.Options.Id;
                        aceParam.type = param.Type;
                        aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                        if (param.Type === "string" /* ParamType.STRING */) {
                            //@ts-ignore
                            aceParam.autocompleteId = (param.Options.AutocompleteId) ? param.Options.AutocompleteId : false;
                        }
                        if (param.Type === "combo" /* ParamType.COMBO */) {
                            let items = [];
                            //@ts-ignore
                            param.Options.Items.forEach((item) => {
                                items.push(item.Id);
                            });
                            aceParam.items = items;
                        }
                        if (param.Type === "object" /* ParamType.OBJECT */) {
                            //@ts-ignore
                            aceParam.allowedPluginIds = (param.Options.AllowedPluginIds) ? param.Options.AllowedPluginIds : false;
                        }
                        aceCondition.params.push(aceParam);
                    });
                }
                AcesJSON[c.Id]["conditions"].push(aceCondition);
            });
            c.Expressions?.forEach(expression => {
                let aceExpression = {};
                aceExpression.id = expression.Id;
                aceExpression.expressionName = expression.Options.Script.name;
                aceExpression.highlight = (expression.Options.Highlight) ? expression.Options.Highlight : false;
                aceExpression.isDeprecated = (expression.Options.IsDeprecated) ? expression.Options.IsDeprecated : false;
                aceExpression.returnType = expression.Options.ReturnType;
                aceExpression.isVariadicParameters = (expression.Options.IsVariadicParameters) ? expression.Options.IsVariadicParameters : false;
                if (expression.Params) {
                    aceExpression["params"] = [];
                    expression.Params.forEach(param => {
                        let aceParam = {};
                        aceParam.id = param.Options.Id;
                        aceParam.type = param.Type;
                        aceParam.initialValue = (param.Options.InitialValue) ? param.Options.InitialValue : "";
                        if (param.Type === "string" /* ParamType.STRING */) {
                            //@ts-ignore
                            aceParam.autocompleteId = (param.Options.AutocompleteId) ? param.Options.AutocompleteId : false;
                        }
                        aceExpression.params.push(aceParam);
                    });
                }
                AcesJSON[c.Id]["expressions"].push(aceExpression);
            });
        });
        fs_1.default.writeFileSync(acesPath, JSON.stringify(AcesJSON, null, 4));
        res(AcesJSON);
    });
}
