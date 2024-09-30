"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAllEntitiesToFiles = addAllEntitiesToFiles;
const globals_1 = require("./globals");
const fs = __importStar(require("fs"));
async function addAllEntitiesToFiles(categories) {
    let allActions = {};
    let allConditions = {};
    let allExpressions = {};
    categories.forEach(c => {
        c.Actions.forEach(a => {
            allActions[a.Options.ScriptName] = a.Options.Script;
        });
        c.Conditions.forEach(c => {
            allConditions[c.Options.ScriptName] = c.Options.Script;
        });
        c.Expressions.forEach(e => {
            allExpressions[e.Options.ScriptName] = e.Options.Script;
        });
    });
    fs.readFile(globals_1.ACTIONS_PATH, 'utf8', (err, data) => {
        if (err)
            return false;
        const regex = /C3\.Plugins\[Config\.AddonId\]\.Acts\s*=\s*\{\}/g;
        if (regex.test(data)) {
            const updatedContent = data.replace(regex, `C3.Plugins[Config.AddonId].Acts = ${serializeObjectWithFunctions(allActions)}`);
            fs.writeFileSync(globals_1.ACTIONS_PATH, updatedContent, 'utf8');
        }
        return;
    });
    fs.readFile(globals_1.CONDITIONS_PATH, 'utf8', (err, data) => {
        if (err)
            return false;
        const regex = /C3\.Plugins\[Config\.AddonId\]\.Cnds\s*=\s*\{\}/g;
        if (regex.test(data)) {
            const updatedContent = data.replace(regex, `C3.Plugins[Config.AddonId].Cnds = ${serializeObjectWithFunctions(allConditions)}`);
            fs.writeFileSync(globals_1.CONDITIONS_PATH, updatedContent, 'utf8');
        }
        return;
    });
    fs.readFile(globals_1.EXPRESSIONS_PATH, 'utf8', (err, data) => {
        if (err)
            return false;
        const regex = /C3\.Plugins\[Config\.AddonId\]\.Exps\s*=\s*\{\}/g;
        if (regex.test(data)) {
            const updatedContent = data.replace(regex, `C3.Plugins[Config.AddonId].Exps = ${serializeObjectWithFunctions(allExpressions)}`);
            fs.writeFileSync(globals_1.EXPRESSIONS_PATH, updatedContent, 'utf8');
        }
        return;
    });
    return true;
}
function serializeObjectWithFunctions(obj) {
    let str = '{\n';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'function') {
                // Преобразование функции в строку
                str += `  ${key}: function ${value.toString().replace(/^function\s*\w*\s*/, '')},\n`;
            }
            else {
                str += `  ${key}: ${JSON.stringify(value, null, 2)},\n`;
            }
        }
    }
    str = str.replace(/,\n$/, '\n'); // Удаляем последнюю запятую
    str += '}';
    return str;
}
