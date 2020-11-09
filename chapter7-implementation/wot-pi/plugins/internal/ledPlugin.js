var resources = require("../../resources/modelII").resources,
    setResource = require("../../resources/modelII").set,
    interval,
    model = resources.pi.actuators,
    pluginName = model.leds[1].name + " & " + model.leds[2].name,
    localParams = {"simulate" : false, "frequency" : 10000};

var gpio = require("onoff").Gpio,
    led1 = new gpio(model.leds["1"].gpio, "out"),
    led2 = new gpio(model.leds["2"].gpio, "out");

exports.start = function(params) {
    console.info(resources.pi.actuators.leds[1].name);
    localParams = params;
    if(localParams.simulate){
        simulate(); //assuming this is used if you don't have a physical Raspberry Pi
    } else {
        connectHardware();
    }
    console.log("%s plugin started!", pluginName)
};

exports.stop = function()
{
    if(localParams.simulate)
    {
        clearInterval(interval);
    } else {
        led1.unexport();
        led2.unexport()
    }
    console.log("%s plugin stopped!", pluginName);
};

// var objProxy = new Proxy(model.leds["2"],{ 
//     set: function(target, prop, value) {
//         console.log({ type: 'set', target, prop, value });
//         return Reflect.set(target, prop, value);
//     }
// });

exports.switchOnOff = function switchOnOff()//This function is called whenever the model is updated
{
    if(!localParams.simulate)
    {
        var value2 = + (model.leds["2"].value);
        console.log("write with value " + value2);
        led2.write(value2, function()
        {
            console.log("Changed LED2 state to: " + model.leds["2"].value);
        });
    }
}

function connectHardware()
{
    interval = setInterval(function()
    {
        var value1 = (led1.readSync() + 1)%2;
        led1.write(value1, function()
        {
            console.log("Changed LED1 state to: " + value1);
            setResource(model.leds["1"], !!value1);
        });
    }, localParams.frequency)
    console.log("Hardware %s plugin started!", pluginName);
};

function simulate()
{
    interval = setInterval(function()
    {
        setResource(model.leds["1"],!model.leds["1"].value);
        setResource(model.leds["2"].value, !model.leds["2"].value);
        showValue();
    }, localParams.frequency);
    console.log("Simulated %s plugin started!", pluginName);
}

function showValue()
{
    console.log("LED 1 value: " + model.leds["1"] + ", LED 2 value: " + model.leds["2"]);
}

// function poll(){
//     console.log("checking if change detection works");
//     if(model.leds["2"].value != oldValue)
//     {
//         switchOnOff(model.leds["2"]);
//         oldValue = !oldValue;
//         console.log("New led 2 value: " + oldValue);
//     }
// } 

