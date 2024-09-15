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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const actionsPath = path.join('build/addon/c3runtime/actions.js');
const conditionsPath = path.join('build/addon/c3runtime/conditions.js');
const expressionsPath = path.join('build/addon/c3runtime/expressions.js');
async function addAllEntitiesToFiles(categories) {
    return new Promise((res, rej) => {
        let allActions = {};
        let allConditions = {};
        let allExpressions = {};
        categories.forEach(c => {
            c.Actions?.forEach(a => {
                allActions[a.Options.Script.name] = a.Options.Script;
            });
            c.Conditions?.forEach(c => {
                allConditions[c.Options.Script.name] = c.Options.Script;
            });
            c.Expressions?.forEach(e => {
                allExpressions[e.Options.Script.name] = e.Options.Script;
            });
        });
        fs.readFile(actionsPath, 'utf8', (err, data) => {
            if (err) {
                rej(err.message);
            }
            // Регулярное выражение для поиска строки C3.Plugins[PLUGIN_ID].Acts = {};
            const regex = /C3\.Plugins\[[^\]]+\]\.Acts\s*=\s*{};/;
            if (regex.test(data)) {
                const updatedContent = data.replace(regex, `C3.Plugins[PLUGIN_ID].Acts = ${serializeObjectWithFunctions(allActions)};`);
                fs.writeFileSync(actionsPath, updatedContent, 'utf8');
            }
        });
        fs.readFile(conditionsPath, 'utf8', (err, data) => {
            if (err) {
                rej(err.message);
            }
            const regex = /C3\.Plugins\[[^\]]+\]\.Cnds\s*=\s*{};/;
            if (regex.test(data)) {
                const updatedContent = data.replace(regex, `C3.Plugins[PLUGIN_ID].Cnds = ${serializeObjectWithFunctions(allConditions)};`);
                fs.writeFileSync(conditionsPath, updatedContent, 'utf8');
            }
        });
        fs.readFile(expressionsPath, 'utf8', (err, data) => {
            if (err) {
                rej(err.message);
            }
            const regex = /C3\.Plugins\[[^\]]+\]\.Exps\s*=\s*{};/;
            if (regex.test(data)) {
                const updatedContent = data.replace(regex, `C3.Plugins[PLUGIN_ID].Exps = ${serializeObjectWithFunctions(allExpressions)};`);
                fs.writeFileSync(expressionsPath, updatedContent, 'utf8');
            }
        });
        res('');
    });
}
function serializeObjectWithFunctions(obj) {
    let str = '{\n';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'function') {
                // Преобразование функции в строку
                str += `  ${key}: function${value.toString().replace(/^function\s*\w*\s*/, '')},\n`;
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
