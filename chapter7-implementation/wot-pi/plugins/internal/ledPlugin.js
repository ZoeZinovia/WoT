var resources = require("./../../resources/model"),
    onChange = require("on-change"),
    interval,
    // actuator,
    // model,
    model = resources.pi.actuators,
    pluginName = model.leds[1].name + " & " + model.leds[2].name,
    localParams = {"simulate" : false, "frequency" : 10000};

const Observable = require('object-observable').Observable;
const observableModel = Observable.from(model.leds["2"]);

// var CorePlugin = require('./../corePlugin').CorePlugin,
//     util = require('util'),
//     utils = require('./../../utils/utils.js');

// var LedsPlugin = exports.LedsPlugin = function (params) { //#A
//     CorePlugin.call(this, params, 'leds',
//         stop, simulate, ['ledState'], switchOnOff); //#B
//     model = this.model;
//     this.addValue(false);
// };
// util.inherits(LedsPlugin, CorePlugin); //#C

exports.start = function(params) {
    localParams = params;
    observableModel.observe(changes => {
        changes.forEach(change => {
            console.log(change);
        });
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

function observe(myModel){
    console.log("checking if change detection works");
    var change = onChange(myModel, function(){
        console.info("Change detected for %s...", pluginName);
        switchOnOff(model.leds["2"]);
    });
    change.value = true;
} 

function switchOnOff(myModel){
    if(!localParams.simulate){
        var gpio = require("onoff").Gpio;
        var led2 = new gpio(myModel.gpio, "out");
        led2.write(myModel.value, function(){
            console.log("Changed LED2 state to: " + myModel.value);
        });
    }
}

function connectHardware(){
    var gpio = require("onoff").Gpio;
    var led1 = new gpio(model.leds["1"].gpio, "out");
    interval = setInterval(function(){
        var value1 = (led1.readSync() + 1)%2;
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

