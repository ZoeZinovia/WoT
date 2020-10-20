var msgpack = require("msgpack5")(),
    encode = msgpack.encode,
    json2html = require("node-json2html");

module.exports = function(){
    return function(req, res, next){
        console.info("Representation converter middleware has been called!!");
        if(req.result){
            if(req.accepts("html")){
                console.info("HTML representation selected.");
                res.send(json2html.transform(req.result));
                return;
            }
            if(req.accepts("json")){
                console.info("JSON representation selected.");
                res.send(req.result);
                return;
            }
            if(req.accepts("application/x-msgpack")){
                console.info("Msgpack representation selected.");
                res.type("application/x-msgpack");
                res.send(encode(req.result));
                return;
            }
            console.info('Selecting JSON as default...');
            res.send(req.result);
            return;
        }
        else{
            next();
        }
    }
};