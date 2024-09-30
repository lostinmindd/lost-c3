import fs from 'fs';
import path from 'path';
import { C3RUNTIME_FOLDER_PATH } from './globals';

function removeExportStatement(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const cleanedContent = fileContent.replace(/export\s*{\s*};?\s*$/, '');

    fs.writeFileSync(filePath, cleanedContent, 'utf8');
}

async function processDirectory(directory: string) {
    const c3runtimeFiles = fs.readdirSync(directory);

    c3runtimeFiles.forEach(file => {
        const filePath = path.join(directory, file);

        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            processDirectory(filePath);
        } else if (stats.isFile() && path.extname(file) === '.js') {
            removeExportStatement(filePath);
        }
    })

    return true;
}

export async function removeExportInJS() {
    processDirectory(C3RUNTIME_FOLDER_PATH);
    return true;
}