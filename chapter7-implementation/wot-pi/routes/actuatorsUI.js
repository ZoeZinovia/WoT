var express = require("express"),
    router = express.Router(),
    resources = require("../resources/model").resources,
    setResource = require("../resources/model").set,
    ledPlugin = require("./../plugins/internal/ledPlugin");

    app.get("/UI/pi/actuators/leds/:id", function(req, res){
        res.sendFile(path.join(__dirname+"./../public/led" + req.params.id + "page.html"));
    });