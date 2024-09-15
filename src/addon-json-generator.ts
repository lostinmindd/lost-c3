import { Lost } from 'lost-lib';
import { log, yellow } from 'console-log-colors';
import * as fs from 'fs';

export async function createAddonJSONFile(LostConfig: Lost.IConfig) {
    return new Promise<Lost.IAddonJSON>((res, rej) => {
        log(`Creating ${yellow('addon.json')} file...`, 'white');
    
        const AddonJSON: Lost.IAddonJSON = {
            "is-c3-addon": true,
            "sdk-version": 2,
            "type": LostConfig.Type,
            "name": LostConfig.AddonName,
            "id": LostConfig.AddonId,
            "version": LostConfig.Version,
            "author": LostConfig.Author,
            "website": LostConfig.WebsiteURL,
            "documentation": LostConfig.DocsURL,
            "description": LostConfig.AddonDescription,
            "editor-scripts": [
                "plugin.js",
                "type.js",
                "instance.js"
            ],
            "file-list": [
                "c3runtime/plugin.js",
                "c3runtime/type.js",
                "c3runtime/instance.js",
                "c3runtime/conditions.js",
                "c3runtime/actions.js",
                "c3runtime/expressions.js",
                "c3runtime/domSide.js",
                "lang/en-US.json",
                "aces.json",
                "addon.json",
                "icon.svg",
                "instance.js",
                "plugin.js",
                "type.js"
            ]
        }

        LostConfig.Scripts.forEach(script => {
            AddonJSON['file-list'].push(`libs/${script.FileName}`)
        })
    
        fs.writeFileSync("build/addon/addon.json", JSON.stringify(AddonJSON, null, 4));
        res(AddonJSON);
    })
}