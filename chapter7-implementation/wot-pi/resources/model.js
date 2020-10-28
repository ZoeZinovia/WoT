var resources = require('./resources.json');
var notifyChange = require("./../servers/websockets").notifyChange;

var set = function(thing, val){
    thing.value  = val;
    notifyChange(thing);
    console.log("Change made to: " + thing.name + ", new value: " + thing.value);
}
var get= function(thing){
    return thing;
}

module.exports.resources = resources;
module.exports.set = set;
module.exports.get = get;