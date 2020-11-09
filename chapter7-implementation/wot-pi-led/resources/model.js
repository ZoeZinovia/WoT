var resources = require('./resources.json');

var set = function(thing, val){
    thing.value  = val;
    console.log("Change made to: " + thing.name + ", new value: " + thing.value);
}

module.exports.resources = resources;
module.exports.set = set;