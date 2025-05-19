// server/server.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

let clients = [];

wss.on('connection', (ws) => {
  console.log('🔌 New client connected');
  clients.push(ws);

  // Optionally send a welcome/history message
  ws.send(
    JSON.stringify({
      type: 'system',
      data: 'Welcome to Zypher!',
    })
  );

  ws.on('message', (message) => {
    const parsed = JSON.parse(message);

    if (parsed.type === 'chat') {
      const payload = JSON.stringify({
        type: 'chat',
        data: parsed.data,
      });

      // Broadcast to all clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clients = clients.filter((c) => c !== ws);
  });
});

console.log('✅ Zypher WebSocket server running on ws://localhost:4000');
