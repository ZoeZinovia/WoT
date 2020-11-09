var mqtt = require('mqtt');
var config = require('./config.json'); 
var ledPlugin = require("./plugins/ledPlugin");

var thngId=config.thngId; 
var thngUrl='/thngs/'+thngId;
var thngApiKey=config.thngApiKey; 

var status=false;
var updateInterval;

var client = mqtt.connect("mqtts://mqtt.evrythng.com:8883", { 
    username: 'authorization',
    password: thngApiKey
});

client.on("connect", function(){
    console.log("connected :)");
    client.subscribe(thngUrl + "/properties/");
    client.subscribe(thngUrl+'/actions/all');
    // if (! updateInterval) updateInterval = setInterval(updateProperties, 5000);
});

client.on("message", function(topic, message){
    var resources = topic.split("/");
    console.log("Resources: " + resources);
    if (resources[1] && resources[1] === "thngs"){
        if(resources[2] && resources[2] === thngId){
            if(resources[3] && resources[3] === "properties"){
                var property = JSON.parse(message);
                console.log("Property was updated: " + property[0].key + " = " + property[0].value);
            } else if (resources[3] && resources[3] === "actions"){
                var action = JSON.parse(message);
                handleAction(action);
            }
        }
    }
});

function handleAction(action){
    switch(action.type){
        case "_setStatus":
            console.log("ACTION: _setStatus changed to: " + action.customFields.status);
            status = Boolean(action.customFields.status);
            updateProperty("status", status);
            ledPlugin.switchOnOff();
            break;
        default:
            console.log("ACTION: Unknown action type: " + action.type);
            break;
    }
}

function updateProperties(){
    var voltage = (219.5 + Math.random()).toFixed(3);
    updateProperty("voltage", voltage);

    var current = (Math.random()*10).toFixed(3);
    updateProperty("current", current);

    var power = (voltage*current*(0.6+Math.random()/10)).toFixed(3);
    updateProperty("power", power);
};

function updateProperty(property, value){
    client.publish(thngUrl+"/properties/" + property, '[{"value": '+ value + '}]');
}

process.on("SIGINT", function(){
    clearInterval(updateInterval);
    console.log("EXITING!");
    updateProperty("livenow", false);
    client.end();
    process.exit();
});