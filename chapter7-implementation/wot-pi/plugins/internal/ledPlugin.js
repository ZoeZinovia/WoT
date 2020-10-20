var resources = require("./../../resources/model"),
    interval,
    sensor,
    model = resources.pi.actuators,
    pluginName = model.leds[1].name + " & " + model.leds[2].name,
    localParams = {"simulate" : false, "frequency" : 10000};

exports.start = function(params) {
    localParams = params;
    if(localParams.simulate){
        simulate(); //assuming this is used if you don't have a physical Raspberry Pi
    } else {
        connectHardware();
    }
    console.log("%s plugin started!", pluginName)
};

exports.stop = function(){
    if(localParams.simulate){
        clearInterval(interval);
    } else {
        sensor.unexport()
    }
    console.log("%s plugin stopped!", pluginName);
};

function connectHardware(){
    var gpio = require("onoff").Gpio;
    led1 = new gpio(model.leds["1"].gpio, "out");
    led2 = new gpio(model.leds["2"].gpio, "out");
    interval = setInterval(function(){
        var value1 = (led1.readSync() + 1)%2;
        var value2 = (led1.readSync());
        led1.write(value1, function(){
            console.log("Changed LED1 state to: " + value1);
            model.leds["1"].value = value1;
        });
        led2.write(value2, function(){
            console.log("Changed LED2 state to: " + value2);
            model.leds["2"].value = value2;
        });
    }, localParams.frequency)
    console.log("Hardware %s plugin started!", pluginName);
};

function simulate(){
    interval = setInterval(function(){
        model.leds["1"].value = !model.leds["1"].value;
        model.leds["2"].value = !model.leds["2"].value;
        showValue();
    }, localParams.frequency);
    console.log("Simulated %s plugin started!", pluginName);
}

function showValue(){
    console.log("LED 1 value: " + model.leds["1"] + ", LED 2 value: " + model.leds["2"]);
}

