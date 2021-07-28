import express from 'express';
import usersRoutes from './routes/users.js';
import chatsRoutes from './routes/chats.js';
import chats from './app/controller/chats.js';
import contactsRoutes from './routes/contacts.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = 5000;

const server = http.createServer(app);
// configure server and cors request at socketio
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

// configure cors request expressjs
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRoutes);
app.use('/chats', chatsRoutes);
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => res.send('Hello from homepage!'));
io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.emit('connection', null);
    
    // listen on any event name dynamically
    socket.onAny((eventName, data) => {
        chats.storeChat(eventName, data.sender_id, data.message)
            .then(io.emit(eventName, data));
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// app.listen(PORT, () => console.log(`>> server running on : http://localhost:${PORT}`))
server.listen(process.env.PORT || PORT, () => {
    console.log(`>> server running on : http://localhost:${process.env.PORT || PORT}`)
});