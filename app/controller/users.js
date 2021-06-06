import connection from '../services/db.js';
import util from 'util';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import jwt from '../services/jwt.js';

dotenv.config();

// enable built in asynchronus function using mysql DB
const query = util.promisify(connection.query).bind(connection);

var userHelper = {
    validateRequest: function (req, requiredBodyArr) {
        for (let i = 0; i < requiredBodyArr.length; i++) {
            const element = requiredBodyArr[i];
            if (!req.body.hasOwnProperty(element)) {
                return {
                    isValid: false,
                    requiredField: element
                };
            }
        }

        return {
            isValid: true,
            requiredField: ''
        };
    },
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

        bcrypt.hash(password, parseInt(process.env.HASH_SALTROUND), function (err, hashedPassword) {
            if (err) throw err;

            connection.query("INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`) VALUES (NULL, ?, ?, ?, ?);", [username, hashedPassword, fullname, email], function (error, results, fields) {
                if (error) {
                    return connection.rollback(function () {
                        throw error;
                    });
                };

                res.send({
                    message: "Success",
                    token: jwt.generateAccessToken(username)
                });
            });
        });
    },
    login: async function (req, res) {
        var validateReq = userHelper.validateRequest(req, [
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
            
            bcrypt.compare(password, userdata.password, function (err, result) {
                if (result) {
                    const token = jwt.generateAccessToken(userdata.id + Date.now());
                    return res.send({
                        message: "Success",
                        token: token,
                        user: {
                            name: userdata.name,
                            username: userdata.username,
                            email: userdata.email
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
        var validateReq = userHelper.validateRequest(req, [
            'token'
        ]);

        if (validateReq.isValid) {
            jsonwebtoken.verify(req.body.token, process.env.TOKEN_SECRET, function (err, decoded) {
                console.log('decoded', decoded);
                console.log('err', err);
                
                if (decoded) {
                    // refresh token
                    const newToken = jwt.generateAccessToken(decoded.data + Date.now());
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
    }
}

export default users;