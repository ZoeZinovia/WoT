var gpio = require("onoff").Gpio,
    sensor = new gpio(17, "in", "both"),
    led = new gpio(4, "out");

console.log("starting program");

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

function exit(err){
    if(err)
        console.log("error occured: " + err);
    sensor.unexport();
    led.unexport();
    console.log("\nBye, bye!");
    process.exit();
}

process.on("SIGINT", exit)
;
