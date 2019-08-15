var express = require('express');
var router = express.Router();

const cliniciansRoute = require('./clinicians');
const locationsRoute  = require('./locations');
const privacyRoute    = require('./privacy');
const contactRoute    = require('./contact');

/* GET home page. */

module.exports = function(param) {
  const { clinicianService } = param;
  router.get('/', function(req, res, next) {
    res.render('index', {
      page: "Home"
    });
  });

  router.use('/clinicians', cliniciansRoute(param));
  router.use('/locations', locationsRoute(param));
  router.use('/contact', contactRoute());
  router.use('/privacy*', privacyRoute());
  

  return router;
};
