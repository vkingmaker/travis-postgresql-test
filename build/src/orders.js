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

router.route('/').get(_verify2.default.verifyAdmin, function (req, res, next) {
    client.query(' SELECT user_tbl.id,order_tbl.order_id, username , address,instruction,status,phone,food,createdat,modifiedat FROM user_tbl INNER JOIN order_tbl ON uid = user_tbl.id', function (error, results) {

        if (error) {
            res.json({
                "code": 400,
                "failed": 'The order Table was not Generated'
            });
        } else {
            res.json({
                "code": 200,
                "success": "The order Table was Generated",
                "table": results.rows
            });
        }
        // client.end();
    });
});

router.route('/:id').get(_verify2.default.verifyAdmin, function (req, res, next) {
    var id = +req.params.id;

    client.query('SELECT * FROM order_tbl WHERE order_id = $1', [id], function (error, results) {
        if (error) {
            res.json({
                "code": 400,
                "failed": 'The order Table was not Generated'
            });
        } else {
            res.json({
                "code": 200,
                "success": 'The order related to the id ' + id + ' was fetched',
                "table": results.rows
            });
        }
        // client.end();
    });
});

router.route('/:id').put(_verify2.default.verifyAdmin, function (req, res, next) {
    var orderId = +req.params.id;
    var status = req.body.status;
    client.query('UPDATE order_tbl SET status = $1 WHERE order_id = $2', [status, orderId], function (error) {
        if (error) {
            res.json({
                "code": 400,
                "failed": error
            });
        } else {
            res.json({
                "code": 200,
                "success": "Order Status has been updated"
            });
        }
        // client.end();
    });
});

router.post('/', function (req, res) {
    client.connect();
    var uid = +req.body.uid;
    var address = req.body.address;
    var instruction = req.body.instruction;
    var phone = req.body.phone;
    var food = req.body.food;
    var today = new Date();

    client.query('INSERT INTO order_tbl (uid,address,instruction,phone,food,createdat,modifiedat) VALUES ($1,$2,$3,$4,$5,$6,$7)', [uid, address, instruction, phone, food, today, today], function (error, results) {
        if (error) {
            res.json({
                "code": 400,
                "failed": error
            });
        } else {
            var addedOrder = { uid: uid, address: address, instruction: instruction, phone: phone, food: food, today: today };
            res.json({
                "code": 200,
                "message": "Your order has been placed!",
                addedOrder: addedOrder
            });
        }
        // client.end();
    });
});

exports.default = router;
module.exports = exports.default;