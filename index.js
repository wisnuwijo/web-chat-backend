import express from 'express';
import usersRoutes from './routes/users.js';
import chatsRoutes from './routes/chats.js';
import contactsRoutes from './routes/contacts.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', usersRoutes);
app.use('/chats', chatsRoutes);
app.use('/contacts', contactsRoutes);

app.get('/', (req, res) => res.send('Hello from homepage!'));

app.listen(PORT, () => console.log(`>> server running on : http://localhost:${PORT}`))