'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import user from "./userModel"


module.exports = {
    getToken: function getToken(user) {
        return _jsonwebtoken2.default.sign(user, process.env.secretOrPrivateKey, {
            expiresIn: 3600
        });
    },

    verifyAdmin: function verifyAdmin(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            _jsonwebtoken2.default.verify(token, process.env.secretOrPrivateKey, function (err, decoded) {

                if (decoded.admin) {
                    console.log('We got here');
                    req.decoded = decoded;
                    next();
                }

                if (err) {
                    var _err = { "status": 401, "message": "You are not authenticated!" };
                    res.json(_err);
                }
            });
        } else {
            var err = { "status": 403, "message": "You must but a verified Admin" };
            res.json(err);
        }
    }
};