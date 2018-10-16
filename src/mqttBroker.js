const mosca = require("mosca");
const Event = require("./models/event")

const TO_DEVICE = "TO_DEVICE";
const FROM_DEVICE = "FROM_DEVICE";

function start(pubsub, db) {
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
    const topic = packet.topic;
    const message = packet.payload.toString("utf8");
    if (topic === FROM_DEVICE) {
      const newEvent = Event.create(db, {topic,message})
      pubsub.publish(FROM_DEVICE, { eventAdded: newEvent });  
    }
    console.log("topic", packet.topic);
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
  return moscaServer;
}

module.exports = {
  start: start
};
