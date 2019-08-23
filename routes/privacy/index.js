var express = require('express');
var router = express.Router();

module.exports = function() {
  /* GET Privacy Policy page. */
  router.get('/', function(req, res, next) {
    if(req.baseUrl === "/privacy"){
      res.render('privacy', {
        page: "Privacy Policy"
      });
    }
    else if (req.baseUrl === "/privacy-policy.html" || "/privacy.html") {
      res.redirect(301, "/privacy");
    }
    else {
      next();
    }
  });
  return router;
} 
