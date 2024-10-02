#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const console_log_colors_1 = require("console-log-colors");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const run_server_1 = require("./v2/run-server");
const misc_functions_1 = require("./v2/misc-functions");
const path_1 = __importDefault(require("path"));
const copy_base_addon_files_1 = require("./v2/copy-base-addon-files");
const child_process_1 = require("child_process");
const v2_1 = require("./v2");
/**
 * Initialize lost addon file structure
 */
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command('init', 'Initialize lost addon file structure', (yargs) => {
    return yargs.option('plugin', {
        alias: 'a',
        type: 'boolean',
        description: 'Create plugin addon structure'
    });
}, (argv) => {
    let addonType = "plugin";
    if (argv.plugin)
        addonType = "plugin";
    const sourceFolder = path_1.default.resolve(__dirname, `../default-file-structure/${addonType}`);
    const targetDir = process.cwd();
    if (argv.plugin) {
        (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.magentaBG)('plugin')} file structure...`, 'white');
        (0, copy_base_addon_files_1.copyBaseAddonFiles)(sourceFolder, targetDir);
        (0, child_process_1.exec)('npm i');
    }
})
    .help()
    .argv;
/**
 * Build addon
 */
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).command('build', 'Build addon', () => { }, async () => {
    (0, console_log_colors_1.log)('\n' + (0, console_log_colors_1.bgBlack)((0, console_log_colors_1.blueBright)('Start building addon...')) + '\n', 'white');
    (0, v2_1.build)().then(() => {
        (0, console_log_colors_1.log)('\n' + `${(0, console_log_colors_1.bgBlack)((0, console_log_colors_1.greenBright)('Addon was built successfully!'))}`, 'bold');
    });
}).help().argv;
/**
 * Run addon dev server
 */
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('server', 'Run addon dev server', (yargs) => {
    return yargs
        .option('open', {
        alias: 'o',
        type: 'boolean',
        description: 'Open construct page when server run'
    });
}, (yargs) => {
    (0, run_server_1.runAddonServer)().then(() => {
        if (yargs['open']) {
            setTimeout(() => (0, misc_functions_1.openUrl)("https://editor.construct.net/?safe-mode"), 1000);
        }
    });
})
    .help()
    .argv;
