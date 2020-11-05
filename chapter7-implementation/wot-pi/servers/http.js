var express = require("express"),
    actuatorRoutes = require("./../routes/actuators"),
    sensorRoutes = require("./../routes/sensors"),
    resources = require("../resources/model").resources,
    cors = require("cors"),
    bodyParser = require("body-parser"),
    converter = require("./../middleware/converter"),
    actuatorRoutesUI = require("./../routes/actuatorsUI"),
    sensorRoutesUI = require("./../routes/sensorsUI");

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
    // res.render("./../public/pi.html");
    res.send("User Interface Page");
});

app.use(converter());

module.exports = app;