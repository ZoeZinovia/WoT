var express = require("express"),
    router = express.Router(),
    resources = require("../resources/model").resources,
    setResource = require("../resources/model").set,
    ledPlugin = require("./../plugins/internal/ledPlugin");

    router.route("/").get(function(req, res, next){
        res.sendFile(path.join(__dirname+"./../public/actuatorsPage.html"));
        next();
    });

    router.route("/leds/:id").get(function(req, res, next){
        res.sendFile(path.join(__dirname+"./../public/led" + req.params.id + "page.html"));
        next();
    });

   