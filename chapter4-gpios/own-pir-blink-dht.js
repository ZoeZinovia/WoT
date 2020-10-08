var gpio = require("onoff").Gpio,
    sensor = new gpio(17, "in", "both"),
    led = new gpio(4, "out");
    // sensorLib = require("node-dht-sensor");

console.log("starting program");

// sensorLib.initialize(11, 12);

sensor.watch(function(err, value){
    if(err)
        exit(err);
    if(value){
        led.write(1, function(){
            console.log("Someone is here!!");
        });
    } else{
        led.write(0, function(){
            console.log("Empty space...");
        });
    }
});

// var interval = setInterval(function(){
//     read();
// }, 2000);

// function read(){
//     var readout = sensorLib.read();
//     console.log(readout.errors);
//     console.log("Temperature: " + readout.temperature.toFixed(1) + "C, " + "humidity: " + readout.humidity.toFixed(1) + "%");
// };

function exit(err){
    if(err)
        console.log("error occured: " + err);
    // clearInterval(interval);
    sensor.unexport();
    led.unexport();
    console.log("\nBye, bye!");
    process.exit();
}

process.on("SIGINT", exit)
;
