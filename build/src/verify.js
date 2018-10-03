'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('./userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    getToken: function getToken(user) {
        return _jsonwebtoken2.default.sign(user, process.env.secretOrPrivateKey, {
            expiresIn: 3600
        });
    },

    verifyAdmin: function verifyAdmin(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token && +_userModel2.default.admin) {
            _jsonwebtoken2.default.verify(token, process.env.secretOrPrivateKey, function (err, decoded) {
                if (err) {
                    var _err = { "status": 401, "message": "You arenot authenticated!" };
                    res.json(_err);
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            var err = { "status": 403, "message": "You must but a verified Admin" };
            res.json(err);
        }
    }
};