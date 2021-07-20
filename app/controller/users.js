import connection from '../services/db.js';
import util from 'util';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import jwt from '../services/jwt.js';
import random from '../services/random.js';
import validateRequest from '../services/validateRequest.js';

dotenv.config();

// enable built in asynchronus function using mysql DB
const query = util.promisify(connection.query).bind(connection);

var userHelper = {
    isUsernameValid: function (username) {
        var regExOnlyAlphanumeric = /^[a-z0-9]+$/i;
        var isValid = regExOnlyAlphanumeric.test(username);

        return isValid;
    },
    isUsernameUnique: async function (res, username) {
        const rows = await query("SELECT * FROM users WHERE username = ?", username);
        
        return rows.length == 0;
    },
    isEmailValid: function (email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    isEmailUnique: async function (res, email) {
        const rows = await query("SELECT * FROM users WHERE email = ?", email);
        
        return rows.length == 0;
    },
    isEmailOrUsername: async function (emailOrUsername) {
        const emailCheck = await query("SELECT * FROM users WHERE email = ?", emailOrUsername);
        const usernameChech = await query("SELECT * FROM users WHERE username = ?", emailOrUsername);

        if (emailCheck.length > 0) return 'EMAIL';
        if (usernameChech.length > 0) return 'USERNAME';
        
        return 'NOT_FOUND';
    },
    getUserData: async function(field, value) {
        const rows = await query(`SELECT * FROM users WHERE ${field} = ?`, value);

        if (rows.length > 0) {
            return rows[0];
        }

        return;
    }
}

var users = {
    register: async function (req, res) {
        var validateReq = validateRequest(req, [
            'username',
            'password',
            'name',
            'email'
        ]);

        if (validateReq.isValid) {
            const username = req.body.username;
            const password = req.body.password;
            const fullname = req.body.name;
            const email = req.body.email;

            var usernameValid = userHelper.isUsernameValid(username);
            var usernameUnique = await userHelper.isUsernameUnique(res, username);
            var emailValid = userHelper.isEmailValid(email);
            var emailUnique = await userHelper.isEmailUnique(res, email);

            if (!emailValid) return res.send({
                message: "Failed! please enter valid email"
            });

            if (!usernameValid) return res.send({
                message: "Failed! Only alphanumeric characters allowed for username"
            });

            if (!usernameUnique) return res.send({
                message: "Username is taken, please use another"
            });

            if (!emailUnique) return res.send({
                message: "Email is taken, please use another"
            });

            bcrypt.hash(password, parseInt(process.env.HASH_SALTROUND), async function (err, hashedPassword) {
                if (err) throw err;

                const pin = random(5);
                await query("INSERT INTO `users` (`id`, `username`, `pin`, `password`, `name`, `email`) VALUES (NULL, ?, ?, ?, ?, ?);", [username, pin, hashedPassword, fullname, email]);

                const token = jwt.generateAccessToken(username);
                await query("UPDATE users SET token = ? WHERE username = ?", [token, username]);

                res.send({
                    message: "Success",
                    token: token
                });
            });
        } else {
            return res.send({
                message: validateReq.requiredField + ' is required'
            });
        }
    },
    login: async function (req, res) {
        var validateReq = validateRequest(req, [
            'username_or_email',
            'password'
        ]);

        if (validateReq.isValid) {
            const usernameOrEmail = req.body.username_or_email;
            const password = req.body.password;
    
            var determineType = await userHelper.isEmailOrUsername(usernameOrEmail);
            if (determineType == 'NOT_FOUND') return res.send({
                message: 'Failed! Credential not found'
            });

            var userdata = await userHelper.getUserData(determineType.toLowerCase(), usernameOrEmail);
            
            bcrypt.compare(password, userdata.password, async function (err, result) {
                if (result) {
                    const token = jwt.generateAccessToken(userdata.username);

                    await query("UPDATE users SET token = ? WHERE username = ?", [token, userdata.username]);

                    return res.send({
                        message: "Success",
                        token: token,
                        user: {
                            id: userdata.id,
                            name: userdata.name,
                            username: userdata.username,
                            email: userdata.email,
                            pin: userdata.pin
                        }
                    });
                }

                return res.send({
                    message: "Invalid credential, please try again"
                });
            });
        } else {
            return res.send({
                message: validateReq.requiredField + ' is required'
            });
        }
    },
    logout: function (req, res) {
        var validateReq = validateRequest(req, [
            'token'
        ]);

        if (validateReq.isValid) {
            jsonwebtoken.verify(req.body.token, process.env.TOKEN_SECRET, async function (err, decoded) {
                
                if (decoded) {
                    // refresh token
                    const newToken = jwt.generateAccessToken(decoded.data + Date.now());
                    await query("UPDATE users SET token = ? WHERE username = ?", [null, decoded.data]);
                    
                    return res.send({
                        message: "Logout success",
                        token: newToken
                    });
                } else {
                    return res.send({
                        message: "Error! Invalid token"
                    });
                }
            });
        } else {
            return res.send({
                message: validateReq.requiredField + ' is required'
            });
        }
    },
    showPin: async function (req, res) {
        const senderId = req.user.id;
        const sqlQuery = `SELECT
            username,
            name,
            pin,
            email
        FROM users
        WHERE id = ?`;
        
        const rows = await query(sqlQuery, senderId);
        
        var data = {};
        if (rows.length > 0) data = rows[0];

        return res.send({
            data: data
        });
    }
}

export default users;