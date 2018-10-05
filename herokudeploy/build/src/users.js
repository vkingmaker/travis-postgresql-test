'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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

router.get('/:id/orders', function (req, res) {
    var id = void 0;

    var idPattern = /[0-9]+/;
    if (idPattern.test(req.body.id)) {
        id = req.body.id;
    }

    client.query('SELECT * FROM order_tbl WHERE uid = $1', [id], function (error, results) {
        if (results.rows[0] === void 0) {
            res.json({
                "code": 200,
                "failed": "The user has not place any order Yet"
            });
        }
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
    });
});

exports.default = router;
module.exports = exports.default;