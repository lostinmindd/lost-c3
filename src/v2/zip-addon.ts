import { Config } from "lost-c3-lib";
import { ADDON_FOLDER } from "./globals";
import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';

export async function zipAddon(config: Config) {
    const sourceDirectory = path.resolve(`${ADDON_FOLDER}`);

    const fileName = `${config.AddonId}_${config.Version}`;
    const addonPath = path.resolve(`build/${fileName}.c3addon`);
    const output = fs.createWriteStream(addonPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
        return false;
    });

    archive.pipe(output);

    archive.directory(sourceDirectory, false);

    await archive.finalize();

    return true;
}