// const http = require('http')
// const PORT = 3000
// const HOST = "localhost"

// let server = http.createServer((req, res) => {

// })

// server.listen(PORT, HOST, () => {
//     console.log('сервер запущен: http://${HOST}:${PORT}')
// })


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let count = 0;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('updateCount', count);

    socket.on('increment', () => {
        count += 1;
        io.emit('updateCount', count);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});