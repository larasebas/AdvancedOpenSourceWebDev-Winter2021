var http = require("http")

http.createServer(function(request, response){
    //http header
    // content type: text/plain

    response.writeHead(200,{'Content-Type':'text/plain'});
    //send response to body
    response.end('Hello World\n')
}).listen(3000);

console.log('Server running on port 3000');

