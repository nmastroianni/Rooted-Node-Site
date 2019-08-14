var express = require('express');
var router = express.Router();

module.exports = function() {
  /* GET Privacy Policy page. */
  router.get('/', function(req, res, next) {
    console.log(req.baseUrl);
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
