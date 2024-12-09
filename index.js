const http = require('http');
const fs = require('fs');
const path   = require('path');

const server   = http.createServer((req,res)=>{
    const staticPath = path.join(__dirname,'public');

    let filePath = path.join(staticPath, req.url === '/' ? 'index.html' : req.url);

    const ext = path.extname(filePath);

    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
    };

    const contentType = mimeTypes[ext] || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
        } else {
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});