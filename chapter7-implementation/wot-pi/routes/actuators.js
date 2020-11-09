var express = require("express"),
    router = express.Router(),
    resources = require("../resources/model").resources,
    setResource = require("../resources/model").set,
    ledPlugin = require("./../plugins/internal/ledPlugin");

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
}).put(function(req, res, next){
    var selectedLed = resources.pi.actuators.leds[req.params.id];
    console.log(req.body);
    setResource(selectedLed, req.body.value);
    ledPlugin.switchOnOff();
    console.info("Changed LED %s value to %s", selectedLed.name, selectedLed.value );
    req.result = selectedLed;
    // res.value = true;
    next();
});

module.exports = router;
