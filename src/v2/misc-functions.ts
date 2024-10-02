import { exec } from 'child_process';
import * as os from 'os';
import * as fs from 'fs';
import path from 'path';
import { BUILD_FOLDER } from './globals';

export function openUrl(url: string) {
    const platform = os.platform();

    let command: string;

    switch (platform) {
        case 'win32':
            command = `start ${url}`;
            break;
        case 'darwin':
            command = `open ${url}`;
            break;
        case 'linux':
            command = `xdg-open ${url}`;
            break;
        default:
            console.error('Unsupported platform');
            return;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`Error opening URL: ${error.message}`);
        }
    });
}

export function copyFileAsync(source: string, destination: string) {
    const sourcePath = path.join(source);

    const destPath = path.join(destination);

    fs.copyFileSync(sourcePath, destPath);
}

export function copyDirectory(sourceDir: string, destinationDir: string) {
    fs.mkdirSync(destinationDir, { recursive: true });

    const entries = fs.readdirSync(sourceDir, { withFileTypes: true }); 

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        const destinationPath = path.join(destinationDir, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(sourcePath, destinationPath);
        } else {
            fs.copyFileSync(sourcePath, destinationPath);
        }
    }
}
// path.resolve(`${BUILD_FOLDER}`
export async function removePreviousFolder(folderPath: fs.PathLike) {
    fs.rm(folderPath, { recursive: true, force: true }, (err) => { if (!err) { return true } return false });
};