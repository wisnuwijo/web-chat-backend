import express from 'express';
import users from '../app/controller/users.js';
import authenticateToken from '../app/middleware/jwt.js';

// all routes in here are starting with /users
const router = express.Router();

router.post('/register', users.register);
router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/pin', authenticateToken, users.showPin);

export default router;