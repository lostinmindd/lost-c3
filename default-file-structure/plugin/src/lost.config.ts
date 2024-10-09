import { AddonType, PluginConfig } from "lost-c3-lib";

const Config: PluginConfig = {
    /**
     * Common
     */
    // SupportsWorkerMode: false,
    // MinConstructVersion: "",
    IsSingleGlobal: true,
    IsDeprecated: false,
    CanBeBundled: true,
    ObjectName: "MyLostAddon",

    /**
     * Info
     */
    AddonId: "addon_id",
    Type: AddonType.PLUGIN,
    Category: "general",
    AddonName: "My First Lost Addon",
    AddonDescription: "My first awesome addon created with Lost Library!",
    Version: "1.0.0.0",
    Author: "lostinmind.",
    WebsiteURL: "https://addon.com",
    DocsURL: "https://docs.addon.com",
    Icon: {
        FileName: 'icon.svg',
        Type: 'image/svg+xml'
    },

    /**
     * Remote scripts
     */
    // RemoteScripts: [
    //     "https://script/library.js"
    // ],

    /**
     * Files
     */
    // Scripts: [
    //     {FileName: 'library.js', Type: 'external-dom-script'},
    // ],
    // Files: [
    //     {FileName: '', Type: 'external-css'},
    // ]
}

export { Config };