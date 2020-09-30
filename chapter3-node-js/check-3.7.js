var http = require("http");
var getJSON = require("get-json");

http.createServer(function(req, res){
    console.log("Client request from" + req.url);
    getJSON("http://localhost:8686", function(error, result){
        console.log(error);
        console.log("starting line 7");
    });
}).listen(8888);
console.log("server served on port 8888");