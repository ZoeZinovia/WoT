var http = require("http");
var getJSON = require("get-json")
var port = 8686;
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=nairobi&units=metric&appid=fecb744e24bbf7205bc3a726e46f8a0c";
var tempAPI;
var weather;

getJSON(weatherURL, function (error, result) {
    tempAPI = result.main.temp;
    weather = result.weather[0].description;
});

http.createServer(function(req, res){
    console.log('New incoming client request for ' + req.url);
    res.writeHeader(200, {'Content-Type':'application/json'});
    switch(req.url){
        case "/temperature":
            res.write('{"temperature" : ' + tempAPI + '}');
            break;
        case "/weather": 
            res.write('{"weather" : ' + weather + '}');
            break;
        default:
            res.write('{"hello" : "world"}');
    }
}).listen(port);
console.log("Server started on port " + port + " :)");

