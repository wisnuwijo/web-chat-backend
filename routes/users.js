import express from 'express';
import users from '../app/controller/users.js';

// all routes in here are starting with /users
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome!');
});

router.post('/register', users.register);
router.post('/login', users.login);
router.post('/logout', users.logout);

export default router;