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
    // connectionString:'postgres://victor:akubudike1!@localhost/fast-food-fast'
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
    });
});

router.route('/').post(_verify2.default.verifyAdmin, function (req, res) {
    var food = req.body.food;
    var description = req.body.description;
    var price = +req.body.price;
    var pic_url = req.body.pic_url;

    client.query('INSERT INTO menu (food,description,price,pic_url) VALUES ($1,$2,$3,$4)', [food, description, price, pic_url], function (error) {
        if (error) {
            res.json({
                "code": 400,
                "failed": error.detail
            });
        } else {
            res.json({
                "code": 200,
                "success": "the food has been added to the menu table"
            });
        }
    });
});

exports.default = router;
module.exports = exports.default;