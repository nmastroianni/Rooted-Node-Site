var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
const bodyParser = require('body-parser');
var configs = require('./config');
var ClinicianService = require('./services/ClinicianService');
var LocationService = require('./services/LocationService');

// var indexRouter = require('./routes/index');
// var privacyRouter = require('./routes/privacy');
// var cliniciansRouter = require('./routes/clinicians');

dotenv.config();

var app = express();

var config = configs;
var clinicianService = new ClinicianService(config.data.clinicians);
var locationService = new LocationService(config.data.locations);
var routes = require('./routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.sitename = config.siteName;
app.locals.pretty = true;

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( async function(req,res,next) {
  try {
    var promises = [];
    promises.push(clinicianService.getNames());
    promises.push(locationService.getLocationNames());
    var results = await Promise.all(promises);
    res.locals.clinicianNames = results[0];
    res.locals.locationNames  = results[1];
    return next();
  } catch(err) {
    return next(err);
  }
});

app.use('/', routes({clinicianService,locationService}));
// app.use('/privacy*', privacyRouter());
// app.use('/clinicians', cliniciansRouter({clinicianService}));

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
