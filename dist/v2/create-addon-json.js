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
exports.createAddonJSONFile = createAddonJSONFile;
const globals_1 = require("./globals");
const fs = __importStar(require("fs"));
async function createAddonJSONFile(config) {
    const AddonJSON = {
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
    };
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
            if (script.FileName !== '')
                AddonJSON['file-list'].push(`libs/${script.FileName}`);
        });
    }
    if (config.Files) {
        config.Files.forEach(file => {
            if (file.FileName !== '')
                AddonJSON['file-list'].push(`libs/${file.FileName}`);
        });
    }
    fs.writeFileSync(`${globals_1.ADDON_PATH}/addon.json`, JSON.stringify(AddonJSON, null, 4));
    return AddonJSON;
}
