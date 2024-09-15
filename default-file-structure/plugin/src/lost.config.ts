import { Lost } from "lost-lib";

export const LostConfig: Lost.IConfig = {
    RemoveExportInJSFiles: true,

    AddonId: "addon_id",
    Type: "plugin",
    Category: "general",
    IsSingleGlobal: true,
    AddonName: "Addon for Construct 3",
    AddonDescription: "Addon description...",
    Version: "1.0.0.0",
    Author: "lostinmind",
    WebsiteURL: "https://addon.com",
    DocsURL: "https://docs.addon.com",
    ObjectName: "MyLostPlugin",
    Scripts: []
}