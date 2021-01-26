var http = require("http")

http.createServer(function(request, response){
    var url = request.url
    
    //http header
    // content type: text/plain

    response.writeHead(200,{'Content-Type':'text/plain'});
    //send response to body
    response.end('URL requested\n' + url)
}).listen(3000);

console.log('Server is running at http://localhost:3000');

