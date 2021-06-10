import express from 'express';
import contacts from '../app/controller/contacts.js';
import authenticateToken from '../app/middleware/jwt.js';

// all routes in here are starting with /contacts
const router = express.Router();

router.post('/store', authenticateToken, contacts.store);
router.get('/find', authenticateToken, contacts.find);
router.get('/load', authenticateToken, contacts.load);

export default router;