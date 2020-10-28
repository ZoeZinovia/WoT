var WebSocketServer = require('ws').Server,
    updates = [];

var resources = require("../resources/modelcopy").resources;

exports.listen = function(server) {
  var wss = new WebSocketServer({server: server}); //#A
  console.info('WebSocket server started...');
  wss.on('connection', function (ws, req) { //#B
    var url = req.url;
    var thingName = selectResouce(url).name;
    setInterval(function(){
      try {
          if(updates.length != 0) { // if updates array is empty, there are no updates for any things
              if(updates.some(e => e.name == thingName)) //if the specific thing from the url request is not in the array, there are no updates
              {
                var sendItem = updates.filter(e => e.name == thingName);
                  ws.send(JSON.stringify(sendItem[sendItem.length - 1]), function () { //send the latest update that matches the url request
                      updates = updates.filter(a => a !== url); //remove all updates of that "thing" since the latest update has been sent
                      console.log("message sent from websocket: " + JSON.stringify(sendItem[sendItem.length - 1]));
                    });
              }
          }
      } catch (e) { //#D
          console.log('Unable to observe %s resource!', url);
          console.log(e);
      };
    }, 5000);
  });
};

function notifyChange(thing){
    updates = updates.concat(thing);
}

function selectResouce(url) { //#E
  var parts = url.split('/');
  parts.shift();
  var result = resources;
  for (var i = 0; i < parts.length; i++) {
    result = result[parts[i]];
  }
  return result;
}

module.exports.notifyChange = notifyChange;
//#A Create a WebSockets server by passing it the Express server
//#B Triggered after a protocol upgrade when the client connected
//#C Register an observer corresponding to the resource in the protocol upgrade URL
//#D Use a try/catch to catch to intercept errors (e.g., malformed/unsupported URLs)
//#E This function takes a request URL and returns the corresponding resource

