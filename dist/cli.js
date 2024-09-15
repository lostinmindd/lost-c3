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
const _1 = require(".");
const server_1 = require("./server");
const misc_functions_1 = require("./misc-functions");
const path_1 = __importDefault(require("path"));
const copy_folder_recursive_1 = require("./misc/copy-folder-recursive");
const child_process_1 = require("child_process");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('create-addon', 'Create addon structure', (yargs) => {
    return yargs
        .option('plugin', {
        alias: 'p',
        type: 'boolean',
        description: 'Create plugin addon structure'
    });
}, (argv) => {
    const sourceFolder = path_1.default.resolve(__dirname, '../default-file-structure');
    const targetDir = process.cwd();
    if (argv.plugin) {
        (0, console_log_colors_1.log)(`Creating ${(0, console_log_colors_1.magentaBG)('plugin')} file structure...`, 'white');
        (0, copy_folder_recursive_1.copyFolderContentsRecursiveSync)(path_1.default.join(sourceFolder, 'plugin'), targetDir);
        (0, child_process_1.exec)('npm i');
    }
})
    .help()
    .argv;
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('build', 'Build addon', () => { }, () => {
    (0, _1.buildAddon)().then(data => {
        (0, console_log_colors_1.log)(`${(0, console_log_colors_1.green)('Addon was built successfully!')}`, 'bold');
        return;
    }).catch(reason => {
        (0, console_log_colors_1.log)((0, console_log_colors_1.red)(` -- Error occured while building addon.`), 'white');
        (0, console_log_colors_1.log)(`${(0, console_log_colors_1.cyan)(' -- Reason:')} ${reason}`, 'white');
    });
})
    .help()
    .argv;
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command('server', 'Run test server', (yargs) => {
    return yargs
        .option('open', {
        alias: 'o',
        type: 'boolean',
        description: 'Open construct page when server run'
    });
}, (yargs) => {
    (0, _1.buildAddon)().then(data => {
        (0, server_1.runAddonServer)().then((port) => {
            if (yargs['open']) {
                setTimeout(() => (0, misc_functions_1.openUrl)("https://editor.construct.net/?safe-mode"), 1000);
            }
        });
    });
})
    .help()
    .argv;
