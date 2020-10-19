var express = require("express"),
    actuatorRoutes = require("./../routes/actuators"),
    sensorRoutes = require("./../routes/sensors"),
    resources = require("./../resources/model"),
    cors = require("cors"),
    app  = express();

app.use(cors());

app.use("/pi/actuators", actuatorRoutes);
app.use("/pi/sensors", sensorRoutes);

app.get("/pi", function(req, res){
    res.send("Welcome to CEOT Raspberry Pi")
});

module.exports = app;