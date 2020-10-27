var httpServer = require("./servers/http"),
    resources = require("./resources/model").resourceObject;

var ledPlugin = require("./plugins/internal/ledPlugin"),
    pirPlugin = require("./plugins/internal/pirPlugin"),
    dhtPlugin = require("./plugins/internal/dhtPlugin");

ledPlugin.start({"simulate": false, "frequency" : 5000});
pirPlugin.start({"simulate": false, "frequency" : 10000});
dhtPlugin.start({"simulate": false, "frequency" : 10000});

var server = httpServer.listen(resources.pi.port, function(){
    console.info("The CEOT Pi is up and running on port %s", resources.pi.port);
});

function exit(err){
    if(err)
        console.log("error occured: " + err);
    ledPlugin.stop();
    pirPlugin.stop();
    dhtPlugin.stop();
    console.log("\nBye, bye!");
    process.exit();
}

process.on("SIGINT", exit)
;