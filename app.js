var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var configs = require('./config');
var ClinicianService = require('./services/ClinicianService');

var indexRouter = require('./routes/index');
var privacyRouter = require('./routes/privacy');
var cliniciansRouter = require('./routes/clinicians');

var app = express();

var config = configs;
var clinicianService = new ClinicianService(config.data.clinicians);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.sitename = config.siteName;
app.locals.pretty = true;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( async function(req,res,next) {
  try {
    var names = await clinicianService.getNames();
    res.locals.clinicianNames = names;
    return next();
  } catch(err) {
    return next(err);
  }
});

app.use('/', indexRouter);
app.use('/privacy*', privacyRouter);
app.use('/clinicians', cliniciansRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
