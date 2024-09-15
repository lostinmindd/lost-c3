import { log, yellow } from 'console-log-colors';
import * as fs from 'fs';
import * as path from 'path';
import { updateVariableInFile } from './misc-functions';

const addonPath = 'build/addon';
const folderToSkip = 'ts-defs'

export async function updatePluginIdInAllPluginFiles(addonId: string) {
    log(`Changing ${yellow('PLUGIN_ID')} in all plugin files...\n`, 'white');
    return new Promise((res, rej) => {
        processDirectory(addonPath, addonId).then(() => res(''));
    })
}

async function processDirectory(directoryPath: string, addonId: string) {
    return new Promise((res, rej) => {
        const addonFiles = fs.readdirSync(directoryPath);

        addonFiles.forEach(file => {
            const filePath = path.join(directoryPath, file);

            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                if (file === folderToSkip) {
                    return;
                }
                processDirectory(filePath, addonId);
            } else if (stats.isFile() && path.extname(file) === '.js') {
                updateVariableInFile(filePath, 'PLUGIN_ID', addonId);
            }
        })

        res('');
    })
}