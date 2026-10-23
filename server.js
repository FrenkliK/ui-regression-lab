const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'app');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };
http.createServer((req, res) => { const pathname = new URL(req.url, 'http://localhost').pathname; const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname)); if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); } fs.readFile(file, (err, data) => { if (err) { res.writeHead(404); return res.end('Not found'); } res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); res.end(data); }); }).listen(4173, '127.0.0.1', () => console.log('Test app at http://127.0.0.1:4173'));


