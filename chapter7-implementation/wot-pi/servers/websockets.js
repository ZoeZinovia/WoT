var WebSocketServer = require('ws').Server,
    resources = require('./../resources/model').resourceObject,
    sendMessage;

exports.listen = function(server) {
  var wss = new WebSocketServer({server: server}); //#A
  console.info('WebSocket server started...');
  wss.on('connection', function (ws) { //#B
    var url = ws.upgradeReq.url;
    console.info(url);
    try {
        if(sendMessage) { //#C
          ws.send(sendmessage, function () {
              sendMessage = null;
          });
        }
    } catch (e) { //#D
        console.log('Unable to observe %s resource!', url);
      };
  });
};

function notifyChange(changes){
    sendMessage = JSON.stringify(changes);
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

