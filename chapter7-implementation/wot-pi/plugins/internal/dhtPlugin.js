var resources = require("../../resources/model").resources,
    setResource = require("../../resources/model").set,
    interval,
    sensor,
    model = resources.pi.sensors,
    pluginName = resources.pi.sensors.temperature.name + " and " + resources.pi.sensors.humidity.name,
    localParams = {"simulate" : false, "frequency" : 5000};

exports.start = function(params) {
    localParams = params;
    if(localParams.simulate){
        simulate(); //assuming this is used if you don't have a physical Raspberry Pi
    } else {
        connectHardware();
    }
};

exports.stop = function(){
    if(localParams.simulate){
        clearInterval(interval);
    } else{
        clearTimeout();
    }
    console.log("%s plugin stopped!", pluginName);
};

function connectHardware(){
    var sensorDriver = require("node-dht-sensor");
    sensor = {
        initialize: function(){
            return sensorDriver.initialize(11, model.humidity.gpio);
        },
        read: function(){
            var readout = sensorDriver.read();
            console.log("Model temp: " + model.temperature.value);
            console.log("Readout temp: " + readout.temperature);
            if(model.temperature.value != readout.temperature){
                setResource(model.temperature, parseFloat(readout.temperature));
            }
            if(model.humidity.value != readout.humidity.toFixed(2))
                setResource(model.humidity, parseFloat(readout.humidity.toFixed(2)));
            showValue();
            setTimeout(function(){
                sensor.read();
            }, localParams.frequency);
        }
    };
    if(sensor.initialize()){
        console.log("Hardware %s plugin started!", pluginName);
        sensor.read();
    } else {
        console.log("Error with sensor initialization");
    }
};

function simulate(){
    interval = setInterval(function(){
        model.temperature.value = utils.randomInt(0, 40);
        model.humidity.value = utils.randomInt(0, 100);
        showValue();
    }, localParams.frequency);
    console.log("Simulated %s plugin started!", pluginName);
}

function showValue(){
    console.log('Temperature: %s C, humidity %s \%', model.temperature.value, model.humidity.value);
}

