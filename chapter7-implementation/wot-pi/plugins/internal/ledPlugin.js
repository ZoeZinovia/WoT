var resources = require("./../../resources/model"),
    onChange = require("on-change"),
    interval,
    sensor,
    model = resources.pi.actuators,
    pluginName = model.leds[1].name + " & " + model.leds[2].name,
    localParams = {"simulate" : false, "frequency" : 10000};

exports.start = function(params) {
    localParams = params;
    onChange(model.leds["2"], function(){
        console.info("Change detected for %s...", pluginName);
        switchOnOff(model.leds["2"]);
    });
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

function observe(object){
    console.log("checking if change detection works");
    onChange(object, function(change){
        console.info("Change detected for %s...", pluginName);
        switchOnOff(model.leds["2"]);
    });
} 

function switchOnOff(led2){
    if(!localParams.simulate){
        led2.write(led2.value, function(){
            console.log("Changed LED2 state to: " + led2.value);
        });
    }
}

function connectHardware(){
    var gpio = require("onoff").Gpio;
    led1 = new gpio(model.leds["1"].gpio, "out");
    led2 = new gpio(model.leds["2"].gpio, "out");
    interval = setInterval(function(){
        var value1 = (led1.readSync() + 1)%2;
        var value2 = false;
        led1.write(value1, function(){
            console.log("Changed LED1 state to: " + value1);
            model.leds["1"].value = !!value1;
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

