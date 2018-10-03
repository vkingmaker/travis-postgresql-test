'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _verify = require('./verify');

var _verify2 = _interopRequireDefault(_verify);

var _pg = require('pg');

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

router.get('/', function (req, res) {

    client.query('SELECT * FROM menu', function (error, results) {
        if (error) {
            res.json({
                "code": 400,
                "failed": 'The order Table was not Generated'
            });
        } else {
            res.json({
                "code": 200,
                "success": 'Fetched the list all the food in the menu',
                "table": results.rows
            });
        }
        // client.end();
    });
});

router.route('/').post(_verify2.default.verifyAdmin, function (req, res, next) {
    // client.connect();
    var food = req.body.food;

    client.query('INSERT INTO menu (food) VALUES ($1)', [food], function (error) {
        if (error) {
            res.json({
                "code": 400,
                "failed": error
            });
        } else {
            res.json({
                "code": 200,
                "success": "the food has been added to the menu table"
            });
        }
        // client.end();
    });
});

exports.default = router;
module.exports = exports.default;