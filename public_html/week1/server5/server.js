var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port:3000}),
clients = [],
messages = []

wss.on('connection', function(ws){
    var index = clients.push(ws) - 1;

    var msgText = messages.join('<br>');
    ws.send(msgText);

    ws.on('message', function(message){
        messages.push(message);
        console.log('Received: %s from %s', message, index);

        wss.clients.forEach(function(conn){
            conn.send(message);
        })
    })

})
console.log('Server is running at http://localhost:3000');