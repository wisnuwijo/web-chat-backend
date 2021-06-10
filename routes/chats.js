import express from 'express';
import chats from '../app/controller/chats.js';
import authenticateToken from '../app/middleware/jwt.js';

// all routes in here are starting with /chats
const router = express.Router();

router.get('/history', authenticateToken, chats.loadChatHistory);
router.post('/reply', authenticateToken, chats.replyChat);
router.get('/:chatRoomId', authenticateToken, chats.loadSpecificChat);

export default router;