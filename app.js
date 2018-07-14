const WebSocket = require('ws');
const http = require('http');

const server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // Broadcast to everyone else.
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

        
    });
    ws.on('close', function (code, reason) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send("client left:" + code );
            }
        });

    });

});

server.listen(8080);