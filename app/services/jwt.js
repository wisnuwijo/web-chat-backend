import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

// get config vars
dotenv.config();

function generateAccessToken(payload) {
    return jsonwebtoken.sign({
        data: payload
    }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jsonwebtoken.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

export default {generateAccessToken, authenticateToken};