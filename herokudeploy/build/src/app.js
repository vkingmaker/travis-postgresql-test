'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _authentication = require('./authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _orders = require('./orders');

var _orders2 = _interopRequireDefault(_orders);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();

// View engine setup
app.set('views', _path2.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

// Routes
app.use('/auth', _authentication2.default);
app.use('/orders', _orders2.default);
app.use('/users', _users2.default);
app.use('/menu', _menu2.default);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    message: err.message
  });
});

// export default app;

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === undefined ? 3000 : _process$env$PORT;

app.listen(PORT, function () {
  return console.log('Listening on port ' + PORT);
});

exports.default = app;
module.exports = exports.default;