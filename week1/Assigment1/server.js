var http = require('http'); // Import Node.js core module

var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/todo') { //check the URL of the current request
        
        const fs = require('fs')
        let rawData = fs.readFileSync('todo.json')
        
        //let data = JSON.parse(rawData)

        // set response header
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        
        // set response content    
        res.write(rawData);
        res.end();
    
    }
    else if (req.url == "/index") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>Sebastian Lara</p><ol><li>I am good dancer</li><li>I am a good listener</li><li>I am a visionary</li></ol><a href="http://localhost:3000/todo">Redirect todo page</a> </br> <a href="http://localhost:3000/read-todo">Redirect read-todo page</a></body></html>')
        res.end();
    
    }
    else if (req.url == "/read-todo") {
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is where the JSON will display as HTML.</p></body></html>');
        res.end();
    
    }
    else
        res.writeHead(301,{'Location':"http://localhost:3000/index"})
        res.end();

});

server.listen(3000); 

console.log('Node.js web server at port 3000 is running..')