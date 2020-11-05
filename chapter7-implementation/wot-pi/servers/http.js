var express = require("express"),
    actuatorRoutes = require("./../routes/actuators"),
    sensorRoutes = require("./../routes/sensors"),
    resources = require("../resources/model").resources,
    cors = require("cors"),
    bodyParser = require("body-parser"),
    converter = require("./../middleware/converter"),
    actuatorRoutesUI = require("./../routes/actuatorsUI"),
    sensorRoutesUI = require("./../routes/sensorsUI"),
    path = require("path");

var app  = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/pi/actuators", actuatorRoutes);
app.use("/pi/sensors", sensorRoutes);

app.get("/pi", function(req, res){
    res.send("Welcome to CEOT Raspberry Pi")
});

// app.use("/UI/pi/actuators", actuatorRoutesUI);
// app.use("/UI/pi/sensors", sensorRoutesUI);

app.get("/UI/pi", function(req, res){
    res.sendFile(path.join(__dirname+"./../public/pi.html"));
});

app.get("/UI/pi/sensors/humidity", function(req, res){
    res.sendFile(path.join(__dirname+"./../public/humidityPage.html"));
});

app.get("/UI/pi/sensors/temperature", function(req, res){
    res.sendFile(path.join(__dirname+"./../public/temperaturePage.html"));
});

app.get("/UI/pi/sensors/pir", function(req, res){
    res.sendFile(path.join(__dirname+"./../public/pirPage.html"));
});

app.get("/UI/pi/actuators/leds/:id", function(req, res){
    res.sendFile(path.join(__dirname+"./../public/led" + req.params.id + "page.html"));
});

app.use(converter());

module.exports = app;