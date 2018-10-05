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
    // connectionString: 'postgres://victor:akubudike1!@localhost/fast-food-fast'
});
client.connect().then(function () {
    return console.log('connected');
}).catch(function (err) {
    return console.error('connection error', err.stack);
});

router.route('/').get(_verify2.default.verifyAdmin, function (req, res) {
    client.query(' SELECT user_tbl.id,order_tbl.order_id, username , address,instruction,status,phone,food,createdate,modifiedate FROM user_tbl INNER JOIN order_tbl ON uid = user_tbl.id', function (error, results) {

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
    });
});

router.route('/:id').get(_verify2.default.verifyAdmin, function (req, res) {
    var id = +req.params.id;

    client.query('SELECT * FROM order_tbl WHERE order_id = $1', [id], function (error, results) {
        if (error) {
            res.json({
                "code": 400,
                "failed": 'The order Table was not Generated, ' + id + ' must be an interger'
            });
        } else {
            var successMessage = results.rows.length ? 'The order related to the id ' + id + ' was fetched' : 'There is no order related to the provided id ' + id;
            res.json({
                "code": 200,
                "success": successMessage,
                "table": results.rows
            });
        }
    });
});

router.route('/:id').put(_verify2.default.verifyAdmin, function (req, res) {
    var orderId = +req.params.id;
    var status = req.body.status;
    var statusPattern = /(completed|new|processing|cancelled)/i;

    if (statusPattern.test(status)) status = req.body.status;

    client.query('UPDATE order_tbl SET (status,modifiedate) = ($1,current_timestamp) WHERE order_id = $2', [status, orderId], function (error) {
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
    });
});

router.post('/', function (req, res) {
    var phone = void 0;
    var uid = +req.body.uid;
    var address = req.body.address;
    var instruction = req.body.instruction;
    var Originalfood = req.body.food;

    var phonePattern = /[0-9]{11}/;
    if (phonePattern.test(req.body.phone) && req.body.phone.length === 11) {
        phone = req.body.phone;
    }

    var food = Originalfood.map(function (value) {
        return value + "";
    });
    client.query('INSERT INTO order_tbl (uid,address,instruction,phone,food,createdate,modifiedate) VALUES ($1,$2,$3,$4,ARRAY [$5],current_timestamp,current_timestamp)', [uid, address, instruction, phone, food], function (error, results) {

        if (error) {
            res.json({
                "code": 400,
                "failed": error.detail
            });
        } else {
            var addedOrder = { uid: uid, address: address, instruction: instruction, phone: phone, food: food };
            res.json({
                "code": 200,
                "message": "Your order has been placed!",
                addedOrder: addedOrder
            });
        }
    });
});

exports.default = router;
module.exports = exports.default;