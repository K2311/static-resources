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

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    //check file exist and readble before read file
    fs.access(filePath,fs.constants.F_OK | fs.constants.R_OK,(err)=>{
        if(err){
            if(err.code==='ENOENT'){
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>404 - File Not Found</h1>');
            }else{
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>500 - Internal Server Error</h1>');
            }
            return;
        }


        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html');
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            } 
                res.statusCode = 200;
                res.setHeader('Content-Type', contentType);
    
                //cache to improve performance
                res.setHeader('Cache-Control', 'public, max-age=3600');
                res.end(content);
           
        });

       
    });

    

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});