import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { openUrl } from './misc-functions';
import { log, magenta } from 'console-log-colors';

const port = 49152;
const addonDirectory = "build/addon/";
// Функция для создания и запуска сервера
export async function runAddonServer() {

    return new Promise((res, rej) => {

        const server = http.createServer((req, res) => {
            // Определяем путь к файлу
            const filePath = path.join(addonDirectory, req.url === '/' ? 'index.html' : req.url || '');
    
            // Определяем расширение файла
            const extname = path.extname(filePath);
    
            // Устанавливаем тип содержимого по умолчанию
            let contentType = 'text/html';
    
            // Определяем тип содержимого в зависимости от расширения файла
            switch (extname) {
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.jpg':
                    contentType = 'image/jpg';
                    break;
                case '.wav':
                    contentType = 'audio/wav';
                    break;
            }
    
            // Добавляем заголовки CORS
            res.setHeader('Access-Control-Allow-Origin', '*');
    
            // Читаем файл из файловой системы
            fs.readFile(filePath, (error, content) => {
                if (error) {
                    if (error.code === 'ENOENT') {
                        // Если файл не найден, отправляем 404
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    } else {
                        // Любая другая ошибка
                        res.writeHead(500);
                        res.end(`Ошибка сервера: ${error.code}`);
                    }
                } else {
                    // Успешное чтение файла
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        });
    
        // Запуск сервера
        server.listen(port, () => {
            log(`Server is running on ${magenta(`http://localhost:${port}/addon.json`)}`, 'bold');
            res(port);
        });

    })

}
