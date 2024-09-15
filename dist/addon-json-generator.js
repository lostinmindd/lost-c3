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
const console_log_colors_1 = require("console-log-colors");
const fs = __importStar(require("fs"));
async function createAddonJSONFile(LostConfig) {
    return new Promise((res, rej) => {
        (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.yellow)('addon.json')} file...`, 'white');
        const AddonJSON = {
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
        };
        LostConfig.Scripts.forEach(script => {
            AddonJSON['file-list'].push(`libs/${script.FileName}`);
        });
        fs.writeFileSync("build/addon/addon.json", JSON.stringify(AddonJSON, null, 4));
        res(AddonJSON);
    });
}
