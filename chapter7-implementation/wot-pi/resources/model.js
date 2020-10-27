const { notify } = require('../servers/websockets');
var resources = require('./resources.json');
var resourceObject = resources;
var notifyChange = require("./../servers/websockets").notifyChange;
console.log(resourceObject.pi.name);
var set = function(thing, val){
    resourceObject.thing.value  = val;
    notifyChange(resourceObject.thing);
    console.log("Change made: " + resourceObject.thing);
}
var get= function(thing){
    return resourceObject.thing;
}
module.exports.resourceObject = resourceObject;
module.exports.set = set;
module.exports.get = get;