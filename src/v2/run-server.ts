import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { log, magenta } from 'console-log-colors';
import { ADDON_FOLDER } from './globals';

const port = 49152;

export async function runAddonServer() {
    const server = http.createServer((req, res) => {
        const filePath = path.join(ADDON_FOLDER, req.url === '/' ? 'index.html' : req.url || '');

        const extname = path.extname(filePath);

        let contentType = 'text/html';

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

        res.setHeader('Access-Control-Allow-Origin', '*');

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`Server error: ${error.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    server.listen(port, () => {
        log(`\nServer is running on ${magenta(`http://localhost:${port}/addon.json`)}`, 'bold');
        return true;
    });

    return true;
}
