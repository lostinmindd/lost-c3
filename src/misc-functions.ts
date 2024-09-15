import { exec } from 'child_process';
import * as os from 'os';
import * as fs from 'fs';
import path from 'path';
import { black, log } from 'console-log-colors';

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

export function getExportModuleFromJSFile(modulePath: string) {
    return new Promise<any>( async (res, rej) => {
        const _modulePath = path.resolve(modulePath);

        try {
            const module = await import(`file://${_modulePath}`)
            res(module);
        } catch (e) {
            rej(e);
        }
    })
}

export function updateVariableInFile(filePath: string, variableName: string, newValue: string) {
    const _filePath = path.join(filePath);

    const fileContent = fs.readFileSync(_filePath, 'utf8');

    const regex = new RegExp(`${variableName}\\s*=\\s*['"][^'"]*['"]`, 'g');

    const updatedData = fileContent.replace(regex, `${variableName} = '${newValue}'`);

    fs.writeFileSync(_filePath, updatedData, 'utf8');
}

export async function copyFileAsync(source: string, destination: string) {
    const sourcePath = path.join(source);
    const destPath = path.join(destination);

    log(`Copying ${black(`${source}`)} file...`, 'white');
    return new Promise( async (res, rej) => {
        try {
            // Копируем файл
            //fs.copyFileSync(path.join(source), path.join(destination));
            fs.copyFile(sourcePath, destPath, (err) => {
                if (err) {
                    rej(err.message);
                }
                //log(` -- ${magenta('icon.svg')} was created!\n`, 'white');
            })
            res('');
        } catch (err) {
            rej(err);
        }
    })
}