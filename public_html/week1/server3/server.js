var http = require("http");
var url = require('url');

http.createServer(function(request, response){
var pathName = url.parse(request.url).pathname    
    //http header
    // content type: text/plain

    response.writeHead(200,{'Content-Type':'text/html'});
    //send response to body
    response.write('<!DOCTYPE HTML><html><body><div>Request for '+ pathName +' received<div></body></html>')
    response.end();
}).listen(3000);

console.log('Server is running at http://localhost:3000');

