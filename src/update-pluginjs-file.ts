import { ICheckPropertyOptions, IColorPropertyOptions, IComboPropertyOptions, IFloatPropertyOptions, IFontPropertyOptions, IIntegerPropertyOptions, ILongTextPropertyOptions, IPercentPropertyOptions, ITextPropertyOptions, Lost, LostPluginPropertyType, PropertyType } from 'lost-lib';
import fs from 'fs';
import path from 'path';
import { log, yellow } from 'console-log-colors';

const pluginjsPath = path.join('build/addon/plugin.js');

export async function updatePluginJSFile(lostConfig: Lost.IConfig, pluginProperties: LostPluginPropertyType[]) {
    log(`Updating ${yellow('plugin.js')} file...\n`, 'white');
    return new Promise(async (res, rej) => {

        const pluginProps: string[] = getPluginProps(pluginProperties);
        const dependencies = lostConfig.Scripts;

        const formattedDependencies = dependencies.map(dep => `this._info.AddFileDependency({filename: "${dep.FileName}", type: "${dep.Type}"})`).join('\n');

        const formattedProperties = pluginProps.map(prop => `            ${prop}`).join(',\n');

        const fileContent = fs.readFileSync(pluginjsPath, 'utf8');

        const regexProps = /this\._info\.SetProperties\(\[.*?\]\)/s;
        const regexSingleGlobal = /this\._info\.SetIsSingleGlobal\((true|false)\)/;

        const newFileContent_1 = fileContent.replace(regexProps, `this._info.SetProperties([\n${formattedProperties}\n        ])\n        ${formattedDependencies}`);

        const newFileContent = newFileContent_1.replace(regexSingleGlobal, `this._info.SetIsSingleGlobal(${lostConfig.IsSingleGlobal})`);

        fs.writeFileSync(pluginjsPath, newFileContent, 'utf-8')
        res('');

    })
}

function getPluginProps(pluginProperties: LostPluginPropertyType[]) {

    const props: string[] = [];

    pluginProperties.forEach((p: LostPluginPropertyType) => {

        switch (p.Type) {
            case PropertyType.INTEGER:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${(p.Options as IIntegerPropertyOptions).InitialValue})`);
                break;
            case PropertyType.FLOAT:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${(p.Options as IFloatPropertyOptions).InitialValue})`);
                break;
            case PropertyType.PERCENT:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${(p.Options as IPercentPropertyOptions).InitialValue})`);
                break;
            case PropertyType.TEXT:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", "${(p.Options as ITextPropertyOptions).InitialValue}")`);
                break;
            case PropertyType.LONG_TEXT:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", "${(p.Options as ILongTextPropertyOptions).InitialValue}")`);
                break;
            case PropertyType.CHECK:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", ${(p.Options as ICheckPropertyOptions).InitialValue})`);
                break;
            case PropertyType.FONT:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", "${(p.Options as IFontPropertyOptions).InitialValue}")`);
                break;
            case PropertyType.COMBO:
                const items: string[] = [];
                (p.Options as IComboPropertyOptions).Items.forEach(i => {
                    items.push(`"${i.Id}"`);
                })
                let initialValue = (p.Options as IComboPropertyOptions).InitialValue;
                if (items.indexOf(`"${initialValue}"`) === -1) {
                    initialValue = items[0];
                }
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", {
                initialValue: "${initialValue}",
                items: [${items}]
            })`);
                break;
            case PropertyType.COLOR:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}", [${(p.Options as IColorPropertyOptions).InitialValue}])`);
                break;
            case PropertyType.OBJECT:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}")`);
                break;
            case PropertyType.GROUP:
                props.push(`new SDK.PluginProperty("${p.Type}", "${p.Options.Id}")`);
                break;
        }

    })

    return props;
}