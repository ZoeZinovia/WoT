var express = require("express"),
    actuatorRoutes = require("./../routes/actuators"),
    sensorRoutes = require("./../routes/sensors"),
    resources = require("./../resources/model"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    converter = require("./../middleware/converter");

var app  = express();

app.use(bodyParser.json());


app.use(cors());

app.use("/pi/actuators", actuatorRoutes);
app.use("/pi/sensors", sensorRoutes);

app.get("/pi", function(req, res){
    res.send("Welcome to CEOT Raspberry Pi")
});

// app.use(converter());

module.exports = app;