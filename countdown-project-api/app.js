const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const middleware = require('./middleware');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const emailRouter = require('./routes/email');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
// app.use(middleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
mongoose.connect(' mongodb+srv://songpon:pe111333@youpin-0iyxk.gcp.mongodb.net/countdown', { useNewUrlParser: true })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/email', emailRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'domain-a.com')
  res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
  return next()
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
