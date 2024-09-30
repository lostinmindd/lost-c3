import { Lost } from "lost-c3-lib";

const Config: Lost.Config = {
    /**
     * Common
     */
    MinConstructVersion: "",
    IsSingleGlobal: true,
    IsDeprecated: false,
    CanBeBundled: true,
    ObjectName: "MyLostAddon",

    /**
     * Info
     */
    AddonId: "addon_id",
    Type: "plugin",
    AddonCategory: "general",
    AddonName: "My First Lost Addon",
    AddonDescription: "My first lost addon is awesome!",
    Version: "1.0.0.0",
    Author: "Lost",
    WebsiteURL: "https://addon.com",
    DocsURL: "https://docs.addon.com",
    Icon: {
        FileName: 'icon.svg',
        Type: 'image/svg+xml'
    },

    /**
     * Files
     */
    // Scripts: [
    //     {FileName: 'library.js', Type: 'external-dom-script', ScriptType: 'module'},
    //     {FileName: 'library.js', Type: 'external-runtime-script'}
    // ],
    // RemoteScripts: [
    //     "https://script/library.js"
    // ],
    // Files: [
    //     {FileName: '', Type: 'external-css'},
    //     {FileName: '', Type: 'copy-to-output'}
    // ]
}

export { Config };