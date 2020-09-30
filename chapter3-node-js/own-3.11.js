var getJSON = require("get-json"),
    fs = require("fs"),
    http = require("http"),
    async = require("async"),
    port = 8787,
    serviceRootUrl = 'http://localhost:8686';

    http.createServer(function(req, res){
        console.log('New incoming client request for ' + req.url);
        if(req.url === "/log"){
                async.series([
                    temperatureCallback,
                    weatherCallback
                ], 
                    function(err, results){
                        if(err){
                            console.log(err);
                        }
                        var temp = results[0]
                        var weather = results[1];
                        var logEntry = "Temperature: " + temp + ", weather: " + weather;
                        fs.appendFile('log.txt', logEntry + '\n',encoding = 'utf8', function(err){
                            if(err){
                                console.log(err);
                            }
                            res.writeHeader(200, {"Content-Type":"text/plain"});
                            res.write(logEntry);
                            res.end();
                        });
                    }
                )
        } else {
            res.writeHeader(200, {"Content-Type": "text/plain"}); 
            res.write('Please use /log');
            res.end();
        }
    }).listen(8787);
    console.log("Server started on port " + 8787 + " :)");

    function temperatureCallback(callback){
        getJSON(serviceRootUrl + "/temperature", function(err, result){
            if (err) 
                callback(err);
            if (result) {
                var temp = result.temperature;
                console.log(temp);
                callback(null, temp);
            } else 
                callback(null, null);
        });
    };
    
    function weatherCallback(callback){
        getJSON(serviceRootUrl + "/weather", function(err, result){
            if (err) 
                callback(err);
            if (result) {
                var weather = result.weather;
                console.log(weather);
                callback(null, weather);
            } else 
                callback(null, null);
        });
    }
