import express from 'express';
import usersRoutes from './routes/users.js';
import chatsRoutes from './routes/chats.js';
import contactsRoutes from './routes/contacts.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

// configure cors request
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRoutes);
app.use('/chats', chatsRoutes);
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => res.send('Hello from homepage!'));

app.listen(PORT, () => console.log(`>> server running on : http://localhost:${PORT}`))