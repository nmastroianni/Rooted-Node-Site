var express = require('express');
var router = express.Router();

module.exports = function(param) {
  var {clinicianService} = param;
  /* GET clinician listing. */
  router.get('/', async function(req, res, next) {
    try {
      var promises = [];
      promises.push(clinicianService.getClinicianShortApi());

      var results = await Promise.all(promises);

      return res.render('clinicians', {
        page: 'All Clinicians',
        cliniciansList: results[0]
      });
    } catch(err) {

    }
    
  });

  router.get('/:name', async (req, res, next) => {
    try {
      var promises = [];
      promises.push(clinicianService.getClinicianApi(req.params.name));
      var results = await Promise.all(promises);

      if(!results[0]) {
        return next();
      }
      return res.render('clinicians/detail', {
        page: req.params.name,
        clinician: results[0]
      });
    } catch(err) {

    }
    
  });
  return router;
}