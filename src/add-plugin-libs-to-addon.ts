import fs from 'fs';
import path from 'path';
import { copyFileAsync } from './misc-functions';

const libsPath = path.join('src/libs');

export type PluginLibsCollection = string[];

export async function addPluginLibsToAddon() {
    fs.mkdirSync('build/addon/libs', { recursive: true })

    const libs: string[] = [];

    return new Promise<PluginLibsCollection>((res, rej) => {

        const libsFiles = fs.readdirSync(libsPath);

        libsFiles.forEach(libFile => {
            const libPath = path.join(libsPath, libFile);

            const stats = fs.statSync(libPath);
            
            if (stats.isFile() && path.extname(libPath) === '.js') {
                libs.push(libFile);
                copyFileAsync(libPath, `build/addon/libs/${libFile}`);
            }
        })
        res(libs);
    })
}