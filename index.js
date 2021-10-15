const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const notFound = (req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Error 404: ' + req.method + 
    ' not supported</h1></body></html>');
}
const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method : ' + req.method);
    
    if (req.method == 'GET') {
        let fileUrl;
        
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        
        let filePath = path.resolve('public' + fileUrl);
        const fileExt = path.extname(filePath);
        
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    notFound(req, res);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            notFound(req, res);
        }
    } else {
        notFound(req, res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running to http://${hostname}:${port}/`);
});