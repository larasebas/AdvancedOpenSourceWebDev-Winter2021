var http = require("http");
var url = require('url');
var fileSystem = require('fs');

http.createServer(function(request, response){
    var pathName = url.parse(request.url).pathname; 
    var fileName = 'index.html';
    
    // load htm page
    fileSystem.readFile(fileName, callBack);

    function callBack(err, data){
        if(err){
            console.log('error');
            response.writeHead(400, {'Content-Type':'text/html'});
            response.write('<!DOCTYPE HTML><html><body><div>Page not found<div></body></html>');
        }
        else{
            //http header
            // content type: text/html
            response.writeHead(200,{'Content-Type':'text/html'});
            //send response to body
            response.write(data.toString());
        }

        // response complete
        response.end();
    }
    
   
    
}).listen(3000);

console.log('Server is running at http://localhost:3000');

