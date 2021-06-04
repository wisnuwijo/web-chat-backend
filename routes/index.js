require('dotenv').config();

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var authMiddleware = require('../app/middleware/auth');
var connection = require('../app/helper/connection');
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/protected', authMiddleware.authMiddleware, (req, res) => {
  res.sendStatus(200);
});

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/login', urlencodedParser, function (req, res, next) {
  res.send({ 
    url: req.url,
    body: req.body,
    params: req.params,
    headers: req.headers
  })

  // connection.query('SELECT * FROM users', function (err, rows) {
    // if (req.query('username') === 'admin' && req.query('password') === '123123123') {
    //   var jwtResponse = jwt.sign({
    //     'username': 'admin'
    //   }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

    //   res.send({
    //     'status': 'success',
    //     'data': rows,
    //     'token': jwtResponse
    //   });
    // }

    // res.send({
    //   'status': 'failed',
    //   'data': [],
    //   'token': ''
    // });

    // if (err) {
    //   res.send({
    //     'msg': err
    //   })
    // } else {
    //   var jwtResponse = jwt.sign({
    //     'username': 'username'
    //   }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });

    //   res.send({
    //     'token': jwtResponse,
    //     'data': rows
    //   });
    // }
  // })
});

module.exports = router;
