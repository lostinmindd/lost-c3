import { Lost } from "lost-lib";
import * as fs from 'fs';
import * as path from 'path';


const actionsPath = path.join('build/addon/c3runtime/actions.js');
const conditionsPath = path.join('build/addon/c3runtime/conditions.js');
const expressionsPath = path.join('build/addon/c3runtime/expressions.js');

export async function addAllEntitiesToFiles(categories: Lost.ICategory[]) {

    return new Promise((res, rej) => {

        let allActions: any = {};
        let allConditions: any = {};
        let allExpressions: any = {};
    
        categories.forEach(c => {
            c.Actions?.forEach(a => {
                allActions[a.Options.Script.name] = a.Options.Script;
            })
    
            c.Conditions?.forEach(c => {
                allConditions[c.Options.Script.name] = c.Options.Script;
            })

            c.Expressions?.forEach(e => {
                allExpressions[e.Options.Script.name] = e.Options.Script;
            })
        })

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
        })

        fs.readFile(conditionsPath, 'utf8', (err, data) => {
            if (err) {
                rej(err.message);
            }

            const regex = /C3\.Plugins\[[^\]]+\]\.Cnds\s*=\s*{};/;

            if (regex.test(data)) {

                const updatedContent = data.replace(regex, `C3.Plugins[PLUGIN_ID].Cnds = ${serializeObjectWithFunctions(allConditions)};`);
                fs.writeFileSync(conditionsPath, updatedContent, 'utf8');

            }
        })

        fs.readFile(expressionsPath, 'utf8', (err, data) => {
            if (err) {
                rej(err.message);
            }

            const regex = /C3\.Plugins\[[^\]]+\]\.Exps\s*=\s*{};/;

            if (regex.test(data)) {

                const updatedContent = data.replace(regex, `C3.Plugins[PLUGIN_ID].Exps = ${serializeObjectWithFunctions(allExpressions)};`);
                fs.writeFileSync(expressionsPath, updatedContent, 'utf8');

            }
        })

        res('');

    })

}

function serializeObjectWithFunctions(obj: any): string {
    let str = '{\n';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'function') {
                // Преобразование функции в строку
                str += `  ${key}: function${value.toString().replace(/^function\s*\w*\s*/, '')},\n`;
            } else {
                str += `  ${key}: ${JSON.stringify(value, null, 2)},\n`;
            }
        }
    }
    str = str.replace(/,\n$/, '\n'); // Удаляем последнюю запятую
    str += '}';
    return str;
}