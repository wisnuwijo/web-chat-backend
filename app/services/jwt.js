import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

// get config vars
dotenv.config();

function generateAccessToken(payload) {
    return jsonwebtoken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
        data: payload
    }, process.env.TOKEN_SECRET);
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