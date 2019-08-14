var express = require('express');
var router = express.Router();

module.exports = function() {
    /* GET Contact Form page. */
    router.get('/', function(req, res, next) {
        // res.send('Contact Page');
        res.render('contact', {
            page: "Contact Us"
        });
    });
    return router;
  } 
  