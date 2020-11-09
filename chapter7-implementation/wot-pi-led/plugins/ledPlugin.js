var resources = require("./../resources/model").resources,
    model = resources.pi.actuators,
    pluginName = model.leds[1].name + " & " + model.leds[2].name,
    localParams = {"simulate" : false, "frequency" : 10000};

var gpio = require("onoff").Gpio,
    led2 = new gpio(model.leds["2"].gpio, "out");

exports.start = function(params) {
    console.log("%s plugin started!", pluginName)
};

exports.stop = function()
{
        led2.unexport()
    console.log("%s plugin stopped!", pluginName);
};


exports.switchOnOff = function switchOnOff(value)//This function is called whenever the model is updated
{
    if(!localParams.simulate)
    {
        // var value2 = + (model.leds["2"].value);
        var value2 = value;
        console.log("write with value " + value2);
        led2.write(value2, function()
        {
            console.log("Changed LED2 state to: " + model.leds["2"].value);
        });
    }
}


