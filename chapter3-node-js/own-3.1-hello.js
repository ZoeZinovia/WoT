var http = require("http");

http.createServer(function(req, res){
    res.writeHeader(200, {'Content-Type':'text/plain'});
    res.end('Hello World, I love Portugal!');
}).listen(8585);
console.log("Server started :)");