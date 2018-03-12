var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
//-------------------引入自己的路由模块-------------------
var register = require("./routes/register");
var login = require("./routes/login");
var article = require("./routes/article");
var details = require("./routes/details");

//-----------------mongoose----------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pjnode')
var app = express();

//引入session模块
var session = require("express-session");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-----------------注册session模块，配合cookie完成身份验证
app.use(session({
  name:'royNodeSessID',
  secret:'dw3243dw',
  cookie:{maxAge:1000*3600},//1h
  resave:true,
  saveUninitialized:true
}));


app.use('/', index);
app.use('/users', users);
//---------------------注册路由-------------------
app.use('/register',register);
app.use('/login',login);
app.use('/article',article);
app.use('/details',details);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
