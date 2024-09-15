#!/usr/bin/env node
require('module-alias/register');
import { cyan, green, log, magentaBG, red } from 'console-log-colors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { buildAddon } from '.';
import { runAddonServer } from './server';
import { openUrl } from './misc-functions';
import path from 'path';
import { copyFolderContentsRecursiveSync } from './misc/copy-folder-recursive';
import { exec } from 'child_process';

yargs(hideBin(process.argv))
    .command('create-addon', 'Create addon structure', (yargs) => {
        return yargs
            .option('plugin', {
                alias: 'p',
                type: 'boolean',
                description: 'Create plugin addon structure'
            })
    }, (argv) => {
        const sourceFolder = path.resolve(__dirname, '../default-file-structure')
        const targetDir = process.cwd();

        if (argv.plugin) {
            log(`Creating ${magentaBG('plugin')} file structure...`, 'white');
            copyFolderContentsRecursiveSync(path.join(sourceFolder, 'plugin'), targetDir);
            exec('npm i');
        }
    })
    .help()
    .argv;

yargs(hideBin(process.argv))
    .command('build', 'Build addon', () => {}, () => {
        buildAddon().then(data => {
            log(`${green('Addon was built successfully!')}`, 'bold');
            return;
        }).catch(reason => {
            log(red(` -- Error occured while building addon.`), 'white');
            log(`${cyan(' -- Reason:')} ${reason}`, 'white');
        })
    })
    .help()
    .argv;


yargs(hideBin(process.argv))
    .command('server', 'Run test server', (yargs) => {
        return yargs
            .option('open', {
                alias: 'o',
                type: 'boolean',
                description: 'Open construct page when server run'
            })
    }, (yargs) => {
        buildAddon().then(data => {
            runAddonServer().then((port) => {
                if (yargs['open']) {
                    setTimeout(() => openUrl("https://editor.construct.net/?safe-mode"), 1000)
                }
            })
        })
    })
    .help()
    .argv;
