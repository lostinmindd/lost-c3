import { green, log, magenta, red } from "console-log-colors";
import * as fs from "fs";
import path from "path";

export // Функция для копирования содержимого папки рекурсивно
function copyFolderContentsRecursiveSync(source: string, target: string) {
    if (!fs.existsSync(source)) {
        console.error(red(`Папка ${source} не существует`));
        return;
    }

    const items = fs.readdirSync(source);
    items.forEach(item => {
        const currentSource = path.join(source, item);
        const currentTarget = path.join(target, item);

        if (fs.lstatSync(currentSource).isDirectory()) {
            // Если это папка, создаем её в целевой директории и рекурсивно копируем её содержимое
            if (!fs.existsSync(currentTarget)) {
                fs.mkdirSync(currentTarget, { recursive: true });
            }
            copyFolderContentsRecursiveSync(currentSource, currentTarget);
        } else {
            // Копируем файлы в целевую директорию
            fs.copyFileSync(currentSource, currentTarget);
            log(`Created ${magenta(`${item}`)} file.`, 'white');
        }
    });
    //log(`Created ${magenta(`${source}`)} file.`, 'white');
}