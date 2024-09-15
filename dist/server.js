"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAddonServer = runAddonServer;
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const console_log_colors_1 = require("console-log-colors");
const port = 49152;
const addonDirectory = "build/addon/";
// Функция для создания и запуска сервера
async function runAddonServer() {
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
                    }
                    else {
                        // Любая другая ошибка
                        res.writeHead(500);
                        res.end(`Ошибка сервера: ${error.code}`);
                    }
                }
                else {
                    // Успешное чтение файла
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        });
        // Запуск сервера
        server.listen(port, () => {
            (0, console_log_colors_1.log)(`Server is running on ${(0, console_log_colors_1.magenta)(`http://localhost:${port}/addon.json`)}`, 'bold');
            res(port);
        });
    });
}
