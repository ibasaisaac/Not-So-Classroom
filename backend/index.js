import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import http from "http"
import { Server } from "socket.io"
dotenv.config(); //for token secret

const app = express();
const PORT = 5000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`));


const server = http.createServer(app);
const STATIC_CHANNELS = [
    {
        id: 1, name: 'Global chat', participants: 0, sockets: []
    },
    {
        id: 2, name: 'project', participants: 0, sockets: []
    }];

app.get('/getChannels', (req, res) => {
    res.json({ channels: STATIC_CHANNELS })
})

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
// Listen for when the client connects via socket.io-client/* socket object may be used to send specific messages to the new connected client */
io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // We can write our socket event listeners in here...
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    })
    socket.on('send-message', message => {
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });

});

server.listen(PORT, () => `Server running at port ${PORT}`);
