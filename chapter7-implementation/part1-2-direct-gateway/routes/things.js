var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/modelI');

router.route('/coapDevice/sensors/:id').get(function (req, res, next) {
  var id = req.params.id;
  req.result = resources.things.coapDevice.sensors[id];
  next();
});


module.exports = router;