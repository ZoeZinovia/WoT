var resources = require('./resources.json'),
    ledPlugin = require("./../plugins/internal/ledPlugin");
var set = function(resource, value){
    resources.pi.actuators.leds["2"] = value;
    ledPlugin.switchOnOff();
}
module.exports = resources, set;