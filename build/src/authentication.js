'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pg = require('pg');

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _userModel = require('./userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
// import Client from './config';


var client = new _pg.Client({
  connectionString: process.env.DATABASE || 'postgres://Monday:akubudike1!@localhost/fast-food-fast'
});
client.connect().then(function () {
  return console.log('connected');
}).catch(function (err) {
  return console.error('connection error', err.stack);
});

router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  client.query('SELECT * FROM user_tbl WHERE username = $1', [username], function (error, results) {

    if (error) {
      res.json({ "err": error });
    } else {
      if (results.rows.length && results.rows[0].password == password) {
        _userModel2.default.username = username;
        _userModel2.default.password = password;
        _userModel2.default.admin = results.rows[0].admin;

        var token = _verify2.default.getToken(_userModel2.default);
        res.send({
          "success": "Login successful",
          "token": token
        });
      } else {
        res.send({
          "success": "You must be a Registered user"
        });
      }
    }
  });
});

router.post("/signup", function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  client.query('INSERT INTO user_tbl  (username,password) VALUES ($1,$2)', [username, password], function (error) {
    if (error) {
      res.json({
        "code": 400,
        "failed": 'Please check the credetials and try again'
      });
    } else {
      res.json({
        "code": 200,
        "success": "user registered successfully"
      });
    }
  });
});

exports.default = router;
module.exports = exports.default;