var express = require("express"),
    router = express.Router(),
    resources = require("./../resources/model");

router.route("/").get(function(req, res, next){
    req.result = resources.pi.actuators;
    next();
    // res.send(resources.pi.actuators);
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
});

router.route("/leds/:id").post(function(req, res, next){
    var selectedLed = resources.pi.actuators.leds[req.params.id];
    console.log(req.body);
    selectedLed.value = true;
    console.info("Changed LED %s value to %s", selectedLed.name, selectedLed.value );
    req.result = selectedLed;
    next();
});

module.exports = router;
