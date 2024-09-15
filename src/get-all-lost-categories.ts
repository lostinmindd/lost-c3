import { Lost } from 'lost-lib';
import fs from 'fs';
import path from 'path';
import { cyan, log, yellow } from 'console-log-colors';
import { getExportModuleFromJSFile } from './misc-functions';

const categoriesCollection: Lost.ICategory[] = [];
const categoriesPath = path.resolve('build/categories');

export async function getLostCategories(): Promise<Lost.ICategory[]> {
    log(`Get all ${cyan('Lost')} categories...`, 'white');
    return new Promise((res, rej) => {
        processDirectory().then(categories => {
            log(`-----------------`, 'black');
            categories.forEach(c => {
                console.log(` - ${yellow(`${c.Name}`)} | ${cyan('Actions:')} ${c.Actions?.length} | ${cyan('Conditions:')} ${c.Conditions?.length} | ${cyan('Expressions:')} ${c.Expressions?.length} `);
            })
            log('', 'white');
            res(categories);
        }).catch(e => {
            rej(`Error reading directory: ${categoriesPath}`);
        })
    })
}

// Функция для чтения и выполнения JavaScript файлов
async function processFile(filePath: string) {
    try {
        // Преобразование пути в формат для динамического импорта

        const moduleCategory = await getExportModuleFromJSFile(filePath);

        const C = moduleCategory.Category as Lost.ICategory;
        
        if (C) {
            categoriesCollection.push(C);
        }

    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}

async function processDirectory() {
    return new Promise<Lost.ICategory[]>(async (res, rej) => {
        try {
            const files = fs.readdirSync(categoriesPath);
    
            for (const file of files) {
                const filePath = path.join(categoriesPath, file);
                const stats = fs.statSync(filePath);
    
                if (stats.isFile() && path.extname(file) === '.js') {
                    await processFile(filePath);
                }
            }
            res(categoriesCollection);
        } catch (e) {
            rej(`Error reading directory: ${categoriesPath}`)
        }
    })
}