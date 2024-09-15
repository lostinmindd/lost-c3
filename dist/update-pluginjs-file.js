"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePluginJSFile = updatePluginJSFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const console_log_colors_1 = require("console-log-colors");
const pluginjsPath = path_1.default.join('build/addon/plugin.js');
async function updatePluginJSFile(lostConfig, pluginProperties) {
    (0, console_log_colors_1.log)(`Updating ${(0, console_log_colors_1.yellow)('plugin.js')} file...\n`, 'white');
    return new Promise(async (res, rej) => {
        const pluginProps = getPluginProps(pluginProperties);
        const dependencies = lostConfig.Scripts;
        const formattedDependencies = dependencies.map(dep => `this._info.AddFileDependency({filename: "${dep.FileName}", type: "${dep.Type}"})`).join('\n');
        const formattedProperties = pluginProps.map(prop => `            ${prop}`).join(',\n');
        const fileContent = fs_1.default.readFileSync(pluginjsPath, 'utf8');
        const regexProps = /this\._info\.SetProperties\(\[.*?\]\)/s;
        const regexSingleGlobal = /this\._info\.SetIsSingleGlobal\((true|false)\)/;
        const newFileContent_1 = fileContent.replace(regexProps, `this._info.SetProperties([\n${formattedProperties}\n        ])\n        ${formattedDependencies}`);
        const newFileContent = newFileContent_1.replace(regexSingleGlobal, `this._info.SetIsSingleGlobal(${lostConfig.IsSingleGlobal})`);
        fs_1.default.writeFileSync(pluginjsPath, newFileContent, 'utf-8');
        res('');
    });
}
function getPluginProps(pluginProperties) {
    const props = [];
    pluginProperties.forEach((p) => {
        switch (p.Type) {
            case "integer" /* PropertyType.INTEGER */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${p.Options.InitialValue})`);
                break;
            case "float" /* PropertyType.FLOAT */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${p.Options.InitialValue})`);
                break;
            case "percent" /* PropertyType.PERCENT */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${p.Options.InitialValue})`);
                break;
            case "text" /* PropertyType.TEXT */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", "${p.Options.InitialValue}")`);
                break;
            case "longtext" /* PropertyType.LONG_TEXT */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", "${p.Options.InitialValue}")`);
                break;
            case "check" /* PropertyType.CHECK */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${p.Options.InitialValue})`);
                break;
            case "font" /* PropertyType.FONT */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", "${p.Options.InitialValue}")`);
                break;
            case "combo" /* PropertyType.COMBO */:
                const items = [];
                p.Options.Items.forEach(i => {
                    items.push(`"${i.Id}"`);
                });
                let initialValue = p.Options.InitialValue;
                if (items.indexOf(`"${initialValue}"`) === -1) {
                    initialValue = items[0];
                }
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", {
                initialValue: "${initialValue}",
                items: [${items}]
            })`);
                break;
            case "color" /* PropertyType.COLOR */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", [${p.Options.InitialValue}])`);
                break;
            case "object" /* PropertyType.OBJECT */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}")`);
                break;
            case "group" /* PropertyType.GROUP */:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}")`);
                break;
        }
    });
    return props;
}
