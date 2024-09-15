import { dim, green, log, magenta, yellow } from 'console-log-colors';
import fs from 'fs';
import path from 'path';

const c3runtimePath = 'build/addon/c3runtime';

function removeExportStatement(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const cleanedContent = fileContent.replace(/export\s*{\s*};?\s*$/, '');

    fs.writeFileSync(filePath, cleanedContent, 'utf8');

  }

async function processDirectory(directory: string) {
    return new Promise((res, rej) => {
        const c3runtimeFiles = fs.readdirSync(c3runtimePath);

        c3runtimeFiles.forEach(file => {
            const filePath = path.join(c3runtimePath, file);
    
            const stats = fs.statSync(filePath);
    
            if (stats.isDirectory()) {
                processDirectory(filePath);
            } else if (stats.isFile() && path.extname(file) === '.js') {
                removeExportStatement(filePath);
            }
        })
        
        res('');
    })
}

export async function removeExportInJS() {
    console.log(`Removing ${magenta('export')} ${yellow('{}')} from ${yellow('.js')} files in ${dim('./c3runtime')} folder...\n`);
    processDirectory(c3runtimePath).then(() => {
        //log(` -- ${magenta('export')} ${yellow('{}')} was ${green('successfully')} removed from ${yellow('.js')} files!\n`, 'white');
    })
}