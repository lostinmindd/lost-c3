#!/usr/bin/env node
require('module-alias/register');
import { bgBlack, blueBright, greenBright, log, magentaBG} from 'console-log-colors';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runAddonServer } from './v2/run-server';
import { openUrl } from './v2/misc-functions';
import path from 'path';
import { copyBaseAddonFiles } from './v2/copy-base-addon-files';
import { exec } from 'child_process';
import { build } from './v2';

/**
 * Initialize lost addon file structure
 */
yargs(hideBin(process.argv)).command('init', 'Initialize lost addon file structure', (yargs) => {
    return yargs.option('plugin', 
        {
            alias: 'a',
            type: 'boolean',
            description: 'Create plugin addon structure'
        })
    }, (argv) => {
        let addonType = "plugin";

        if (argv.plugin) addonType = "plugin";

        const sourceFolder = path.resolve(__dirname, `../default-file-structure/${addonType}`)
        const targetDir = process.cwd();

        if (argv.plugin) {
            log(`Creating ${magentaBG('plugin')} file structure...`, 'white');
            copyBaseAddonFiles(sourceFolder, targetDir);
            exec('npm i');
        }
})
.help()
.argv;

/**
 * Build addon
 */
yargs(hideBin(process.argv)).command('build', 'Build addon', () => {}, async () => {
    log('\n' + bgBlack(blueBright('Start building addon...')) + '\n', 'white');
    
    build().then(() => {
        log('\n' + `${bgBlack(greenBright('Addon was built successfully!'))}`, 'bold');
    })
}).help().argv;

/**
 * Run addon dev server
 */
yargs(hideBin(process.argv))
    .command('server', 'Run addon dev server', (yargs) => {
        return yargs
            .option('open', {
                alias: 'o',
                type: 'boolean',
                description: 'Open construct page when server run'
            })
    }, (yargs) => {
        runAddonServer().then(() => {
            if (yargs['open']) {
                setTimeout(() => openUrl("https://editor.construct.net/?safe-mode"), 1000)
            }
        })
    })
.help()
.argv;
