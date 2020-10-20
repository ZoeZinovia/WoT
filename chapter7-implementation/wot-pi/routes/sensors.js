var express = require("express"),
    router = express.Router(),
    resources = require("./../resources/model");

router.route("/").get(function(req, res, next){
    req.result = resources.pi.sensors;
    next();
    // res.send(resources.pi.sensors);
});

router.route("/pir").get(function(req, res, next){
    req.result = resources.pi.sensors.pir;
    next();
    // res.send(resources.pi.sensors.pir);
});

router.route("/temperature").get(function(req, res, next){
    req.result = resources.pi.sensors.temperature;
    next();
    // res.send(resources.pi.sensors.temperature);
});

router.route("/humidity").get(function(req, res, next){
    req.result = resources.pi.sensors.humidity;
    next();
    // res.send(resources.pi.sensors.humidity);
});

module.exports = router;
