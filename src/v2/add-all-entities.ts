import { Lost } from "lost-c3-lib";
import { ACTIONS_PATH, CONDITIONS_PATH, EXPRESSIONS_PATH } from "./globals";
import * as fs from 'fs';

export async function addAllEntitiesToFiles(categories: Lost.Category[]) {

    let allActions: any = {};
    let allConditions: any = {};
    let allExpressions: any = {};
    // console.log(categories);
    categories.forEach(c => {
        c.Actions.forEach(a => {
            allActions[a.Options.ScriptName] = a.Options.Script;
        })

        c.Conditions.forEach(c => {
            allConditions[c.Options.ScriptName] = c.Options.Script;
        })

        c.Expressions.forEach(e => {
            allExpressions[e.Options.ScriptName] = e.Options.Script;
        })
    })

    fs.readFile(ACTIONS_PATH, 'utf8', (err, data) => {
        if (err) return false;

        const regex = /C3\.Plugins\[Config\.AddonId\]\.Acts\s*=\s*\{\}/g;

        if (regex.test(data)) {

            const updatedContent = data.replace(regex, `C3.Plugins[Config.AddonId].Acts = ${serializeObjectWithFunctions(allActions)}`);
            fs.writeFileSync(ACTIONS_PATH, updatedContent, 'utf8');
        }
        return;
    })

    fs.readFile(CONDITIONS_PATH, 'utf8', (err, data) => {
        if (err) return false;

        const regex = /C3\.Plugins\[Config\.AddonId\]\.Cnds\s*=\s*\{\}/g;

        if (regex.test(data)) {

            const updatedContent = data.replace(regex, `C3.Plugins[Config.AddonId].Cnds = ${serializeObjectWithFunctions(allConditions)}`);
            fs.writeFileSync(CONDITIONS_PATH, updatedContent, 'utf8');

        }
        return;
    })

    fs.readFile(EXPRESSIONS_PATH, 'utf8', (err, data) => {
        if (err) return false;

        const regex = /C3\.Plugins\[Config\.AddonId\]\.Exps\s*=\s*\{\}/g;

        if (regex.test(data)) {

            const updatedContent = data.replace(regex, `C3.Plugins[Config.AddonId].Exps = ${serializeObjectWithFunctions(allExpressions)}`);
            fs.writeFileSync(EXPRESSIONS_PATH, updatedContent, 'utf8');

        }
        return;
    })

    return true;
}

function serializeObjectWithFunctions(obj: any): string {
    let str = '{\n';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'function') {
                // Преобразование функции в строку
                str += `  ${key}: function ${value.toString().replace(/^function\s*\w*\s*/, '')},\n`;
            } else {
                str += `  ${key}: ${JSON.stringify(value, null, 2)},\n`;
            }
        }
    }
    str = str.replace(/,\n$/, '\n'); // Удаляем последнюю запятую
    str += '}';
    return str;
}