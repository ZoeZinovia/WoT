var express = require("express"),
    router = express.Router(),
    resources = require("./../resources/model");

router.route("/").get(function(req, res, next){
    // req.result = resources.pi.actuators;
    // next();
    res.send(resources.pi.actuators);
});

router.route("/leds").get(function(req, res, next){
    req.result = resources.pi.actuators.leds;
    next();
    // res.send(resources.pi.actuators.leds);
});

router.route("/leds/:id").get(function(req, res, next){
    req.result = resources.pi.actuators.leds[req.params.id];
    next();
    // res.send(resources.pi.actuators.leds[req.params.id]);
}).put(function(req, res, next){
    var selectedLed = resources.pi.actuators.leds[req.params.id];
    selectedLed.value = req.body.value;
    req.result = selectedLed;
    next();
});

module.exports = router;
