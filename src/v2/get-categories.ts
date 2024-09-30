import { Lost } from 'lost-lib';
import { CATEGORIES_FOLDER_PATH } from './globals';
import fs from 'fs';
import path from 'path';

const categories: Lost.Category[] = [];

export async function getCategories() {
    await processDirectory(CATEGORIES_FOLDER_PATH);
    return categories;
}

async function processFile(filePath: string) {

    const module = await import(`file://${filePath}`);
    const Category = module.Category as Lost.Category;
    categories.push(Category);
}

async function processDirectory(directory: string) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile() && path.extname(file) === '.js') {
            await processFile(filePath);
        }
    }
}