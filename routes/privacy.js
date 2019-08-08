var express = require('express');
var router = express.Router();
var data = {
  title: "Rooted Psychotherapy & Counseling - Privacy Policy"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('privacy/index', data);
});

module.exports = router;
