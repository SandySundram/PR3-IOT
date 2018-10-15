const mosca = require("mosca");

const POST_ADDED = "POST_ADDED";

function start(pubsub) {
  const moscaServer = new mosca.Server({
    port: 1883
  });

  moscaServer.on("clientConnected", function(client) {
    console.log("client connected", client.id);
  });

  moscaServer.on("clientDisconnected", function(client) {
    console.log("client disconnected", client.id);
  });

  // fired when a message is published
  moscaServer.on("published", function(packet, client) {
    // console.log("Published", packet);
    // console.log("Client", client);
    pubsub.publish(POST_ADDED, { postAdded: {author: 'xxx', comment: 'xxx'} });
    console.log("payload", packet.payload.toString("utf8"));
  });

  moscaServer.on("subscribed", function(topic, client) {
    console.log("subscribed: " + client.id);
  });

  moscaServer.on("unsubscribed", function(topic, client) {
    console.log("unsubscribed: " + client.id);
  });

  moscaServer.on("ready", function() {
    console.log("Mosca server is up and running");
  });

  // let ledCommand = "001";

  // setInterval(function() {
  //   ledCommand = ledCommand === "001" ? "002" : "001";
  //   moscaServer.publish({ topic: "LEDToggle", payload: ledCommand });
  // }, 1000);
}

module.exports = {
  start: start
};
