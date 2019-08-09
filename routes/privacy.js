var express = require('express');
var router = express.Router();
var data = {
  page: "Privacy Policy"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.baseUrl === "/privacy"){
    res.render('privacy/index', data);
  }
  else if (req.baseUrl === "/privacy-policy.html" || "/privacy.html") {
    res.redirect(301, "/privacy");
  }
  else {
    next();
  }
});

module.exports = router;
