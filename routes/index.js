var express = require('express');
var router = express.Router();

const cliniciansRoute = require('./clinicians');
const privacyRoute = require('./privacy');

/* GET home page. */

module.exports = function(param) {
  const { clinicianService } = param;
  router.get('/', function(req, res, next) {
    res.render('index', {
      page: "Home"
    });
  });

  router.use('/clinicians', cliniciansRoute(param));
  router.use('/privacy', privacyRoute());

  return router;
};
