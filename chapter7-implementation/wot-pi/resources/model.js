const { notify } = require('../servers/websockets');
var resources = require('./resources.json');
var resourceObject = resources;
var notifyChange = require("./../servers/websockets").notifyChange;
console.log(resourceObject.pi.name);
var set = function(thing, val){
    thing.value  = val;
    notifyChange(thing);
    console.log("Change made: " + thing);
}
var get= function(thing){
    return thing;
}
module.exports.resourceObject = resourceObject;
module.exports.set = set;
module.exports.get = get;