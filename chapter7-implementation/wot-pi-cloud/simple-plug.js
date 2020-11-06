var mqtt = require("mqtt");
var config = require("./config.json");
var thngId = config.thngId;
var thngUrl = '/thngs/'+thngId;
var thngApiKey = config.thngApiKey; 
var interval;

console.log('Using Thng #'+thngId+' with API Key: '+ thngApiKey);

var client = mqtt.connect("mqtts://mqtt.evrythng.com:8883", { 
    username: 'authorization',
    password: thngApiKey
});

client.on("connect", function(){
    client.subscribe(thngUrl + "/properties/");
    console.log("connected to client :)");
    // updateProperty("livenow", true);

    // interval = setInterval(updateProperties, 5000);
});

client.on("message", function(topic, message){
    console.log(message.toString());
});

// function updateProperties()