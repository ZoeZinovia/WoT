var resources = require("../../resources/modelWoT").resources,
    setResource = require("../../resources/modelWoT").set, 
    interval,
    sensor,
    model = resources.pi.sensors.pir,
    pluginName = resources.pi.sensors.pir.name,
    localParams = {"simulate" : false, "frequency" : 2000};

exports.start = function(params) {
    localParams = params;
    if(localParams.simulate){
        simulate(); //assuming this is used if you don't have a physical Raspberry Pi
    } else{
        connectHardware();
    }
};

exports.stop = function(){
    if(localParams.simulate){
        clearInterval(interval);
    } else{
        sensor.unexport();
    }
    console.log("%s plugin stopped!", pluginName);
};

function connectHardware(){
    var gpio = require("onoff").Gpio;
    sensor = new gpio(model.gpio, "in", "both");
    sensor.watch(function(err, value){
        if(err)
            exit(err);
        if(model.value != !!value)
        {
            setResource(model, !!value);
            showValue();
        }
    });
    console.log("Hardware %s plugin started!", pluginName);
};

function simulate(){
    interval = setInterval(function(){
        setResource(model, !model.value);
        showValue();
    }, localParams.frequency);
    console.log("Simulated %s plugin started!", pluginName);
}

function showValue(){
    console.log(model.value? "There is someone" : "Noone here");
}

