import jwt from 'jsonwebtoken';
import connection from '../services/db.js';
import util from 'util';

// enable built in asynchronus function using mysql DB
const query = util.promisify(connection.query).bind(connection);

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    var dbToken = "";

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        const username = user.data;
        const getUserdata = await query("SELECT * FROM users WHERE username = ? LIMIT 1", [username]);
        if (getUserdata.length > 0) {
            dbToken = getUserdata[0].token;
        }

        if (err) return res.sendStatus(403);
        
        // prevent user from using old token
        if (dbToken != token) return res.sendStatus(403);

        req.user = getUserdata[0];

        next();
    })
}

export default authenticateToken;