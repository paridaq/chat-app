import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const port = 8080;

const app = express();
app.use(cors());
const server = http.createServer(app);

app.get('/', (req: Request, res: Response) => {
    res.send(`Hi Hi`);
});
server.listen(port, () => {
    console.log('server is listening on port 8080');
});

const io = new Server(server, {
    cors: {
        origin: 'https://chat-app-ten-eta-53.vercel.app/', // Replace with your frontend's URL
        methods: ['GET', 'POST'],
    },
});

const users: { [key: string]: string } = {};

io.on("connection", (socket) => {
    console.log(`A new user connected`, socket.id);

    socket.on('joined', (data) => {
        const user = data.username;
        if (!user) {
            console.log(`Invalid username for socket ${socket.id}`);
            return;
        }
        users[socket.id] = user;
        console.log(`${user} joined`);
        console.log(users);
        socket.broadcast.emit('userjoined', { user: "Admin", message: `${user} has joined` });
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat ${user}` });
    });

    socket.on('message', ({ message, id }) => {
        if (users[socket.id]) {
            io.emit('sendmessage', { user: users[socket.id], message, id });
        }
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            socket.broadcast.emit('leave', { user: "Admin", message: `${username} has left` });
            delete users[socket.id];
            console.log(`${username} left`);
        }
    });
});