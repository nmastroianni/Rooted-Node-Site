var express = require('express');
var router = express.Router();

module.exports = function(param) {
  var {locationService} = param;
  /* GET location listing. */
  router.get('/', async function(req, res, next) {
    try {
      var promises = [];
      promises.push(locationService.getLocationShort());

      var results = await Promise.all(promises);

      return res.render('locations', {
        active: "locations",
        page: 'All Locations',
        locationsList: results[0]
      });
    } catch(err) {

    }
    
  });

  router.get('/:name', async (req, res, next) => {
    try {
      var promises = [];
      promises.push(locationService.getLocation(req.params.name));
      var results = await Promise.all(promises);

      if(!results[0]) {
        return next();
      }
      return res.render('locations/detail', {
        active: "locations",
        page: req.params.name,
        location: results[0]
      });
    } catch(err) {
      return next(err)
    }
    
  });
  return router;
}