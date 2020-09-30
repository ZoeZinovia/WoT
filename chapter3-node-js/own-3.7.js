
var getJSON = require("get-json"),
    fs = require("fs"),
    http = require("http"),
    port = 8787,
    serviceRootUrl = 'http://localhost:8686';

http.createServer(function(req, res){
    console.log('New incoming client request for ' + req.url);
    if(req.url === "/log"){
        getJSON(serviceRootUrl + "/temperature", function(error, result){
            temperatureCallback(error, result, res);
        });
    } else {
        res.writeHeader(200, {"Content-Type": "text/plain"}); 
        res.write('Please use /log');
        res.end();
    }

}).listen(8787);
console.log("Server started on port " + 8787 + " :)");

function temperatureCallback(error, result, res){
    if(error){
        console.log(error);
    }
    var temp = result.temperature;
    console.log(temp);
    getJSON(serviceRootUrl + "/weather", function(error, result){
        weatherCallback(error, result, temp, res);
    });
};

function weatherCallback(error, result, temp, res){
    if(error){
        console.log(error);
    }
    var weather = result.weather;
    console.log(weather);
    var logEntry = "Temperature: " + temp + ", weather: " + weather;
    fs.appendFile('log.txt', logEntry + '\n',encoding = 'utf8', function(err){
        createFile(err, logEntry, res);
    });
}

function createFile(err, logEntry, res){
    if(err){
        console.log(err);
    }
    res.writeHeader(200, {"Content-Type":"text/plain"});
    res.write(logEntry);
    res.end();
}