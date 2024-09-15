import { Lost } from "lost-lib";
import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';
import { dim, log, yellow } from "console-log-colors";

export async function zipAddon(LostConfig: Lost.IConfig) {
    log(`Creating ${yellow('.c3addon')} file...\n`, 'white');
    return new Promise((res, rej) => {
        const sourceDirectory = "build/addon";
        const outputDirectory = "";
    
        const fileName = `${LostConfig.AddonId}_${LostConfig.Version}`;
        const c3addonPath = path.join(outputDirectory, `${fileName}.c3addon`);
        const output = fs.createWriteStream(c3addonPath);
        const archive = archiver('zip', { zlib: { level: 9 } });
    
        output.on('close', () => {
            // log(` -- ${yellow(`${addonConfig.id}_${addonConfig.version}.c3addon`)} was created in ${dim('build')} folder!\n`, 'white');
            log(` -- ${yellow(`${fileName}.c3addon`)} was created!\n`, 'white');
            res('');
        })
    
        archive.on('error', (err) => {
            rej(err)
          });
    
        archive.pipe(output);
    
        archive.directory(sourceDirectory, false);
    
        archive.finalize();
    })

}