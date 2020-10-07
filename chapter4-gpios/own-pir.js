var gpio = require("onoff").Gpio,
    sensor = new gpio(17, "in", "both");

sensor.watch(function(err, value){
    if(err)
        exit(err);
    console.log(value? "There is someone" : "Noone here");
});

function exit(err){
    if(err)
        console.log("error occured: " + err);
    sensor.unexport();
    console.log("\nBye, bye!");
    process.exit();
}

process.on("SIGINT", exit);
