import { PluginConfig, BehaviorConfig, AddonJSON } from 'lost-c3-lib';
import { ADDON_PATH } from './globals';
import * as fs from 'fs';

export async function createAddonJSONFile(config: PluginConfig | BehaviorConfig) {
    const AddonJSON: AddonJSON = {
        "is-c3-addon": true,
        "sdk-version": 2,
        "type": config.Type,
        "name": config.AddonName,
        "id": config.AddonId,
        "version": config.Version,
        "author": config.Author,
        "website": config.WebsiteURL,
        "documentation": config.DocsURL,
        "description": config.AddonDescription,
        "editor-scripts": [
            "type.js",
            "instance.js"
        ],
        "file-list": [
            "c3runtime/type.js",
            "c3runtime/instance.js",
            "c3runtime/conditions.js",
            "c3runtime/actions.js",
            "c3runtime/expressions.js",
            "lang/en-US.json",
            "aces.json",
            "addon.json",
            "instance.js",
            "type.js"
        ]
    }

    if (config.Type === 'plugin') {
        AddonJSON["editor-scripts"].push("plugin.js");
        AddonJSON["file-list"].push("c3runtime/plugin.js", "plugin.js");
    }
    if (config.Type === 'behavior') {
        AddonJSON["editor-scripts"].push("behavior.js");
        AddonJSON["file-list"].push("c3runtime/behavior.js", "behavior.js");
    }

    if (config.MinConstructVersion) {
        AddonJSON["min-construct-version"] = config.MinConstructVersion;
    }

    AddonJSON['file-list'].push(`${config.Icon.FileName}`);

    if (config.Scripts) {
        config.Scripts.forEach(script => {
            if (script.FileName !== '') AddonJSON['file-list'].push(`libs/${script.FileName}`);
        })
    }

    if (config.Files) {
        config.Files.forEach(file => {
            if (file.FileName !== '') AddonJSON['file-list'].push(`libs/${file.FileName}`);
        })  
    }

    fs.writeFileSync(`${ADDON_PATH}/addon.json`, JSON.stringify(AddonJSON, null, 4));
    
    return AddonJSON;
}