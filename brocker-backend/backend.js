// import mqtt from 'mqtt';
const express = require('express');
const mqtt = require('mqtt');
const aedes = require("aedes")();
const { createServer } = require('net');
const cors = require("cors");

const app = express();
const forwardClient = mqtt.connect("mqtt://localhost:1883");
const port = 1884;
const server = require("net").createServer(aedes.handle);

app.use(cors({ origin: "http://localhost:3000" }));


app.use(express.json());


let latestMessage = null;

app.listen(5000, () => {
  console.log('HTTP server running on http://localhost:5000');
});

app.get('/mqtt-data', (req, res) => {
  if (latestMessage) {
    res.json(latestMessage);
  } else {
    res.status(404).json({ error: "No message received yet" });
  }
});

forwardClient.on('connect', () => {
    console.log("Connected to MQTT broker!");

    // Subscribe to a topic
    forwardClient.subscribe('your/topic', (err) => {
        if (!err) {
            console.log("Subscribed to topic successfully!");
        }
    });
});

forwardClient.on('message', (topic, message) => {
  console.log(`Message received on ${topic}: ${message.toString()}`);
  
  // Forward the message to the frontend via HTTP POST request
  fetch('http://localhost:3000/mqtt-message', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ topic, message: message.toString() })
  }).catch(err => console.error('Failed to send message to frontend:', err));
});



server.listen(port, function () {
  console.log(`MQTT broker running on port ${port}`);
});

aedes.on("client", function (client) {
  console.log(`Client Connected: ${String(client)}`);
});

aedes.on('publish', function (packet, client) {
  console.log(`message received: ${client}`);
});


aedes.subscribe("+/commands/+", (data, func) => {
  // const [ clientId, type, uuid ] = data.topic.split('/')
  // console.log(data)
  // console.log(`clientId: ${clientId}, type: ${type}, uuid: ${uuid}`)
  // console.log(String(data.payload))
});

aedes.subscribe("+/status/+", (data, func) => {
  // const [ clientId, type, uuid ] = data.topic.split('/')
  // console.log(`clientId: ${clientId}, type: ${type}, uuid: ${uuid}`)
  // console.log(String(data.payload))
});

aedes.subscribe("+/sensors/+", (data, func) => {
  
  console.log('sensors')
  console.log(String(data.payload))
  latestMessage = {
    topic: data.topic,
    payload: String(data.payload),
    timestamp: new Date().toISOString()
  };
});

aedes.subscribe("#", (data, func) => {
  if (
    data.topic.includes('commands')
    || data.topic.includes('status')
    || data.topic.includes('sensors')
  ) { return; }
  console.log('default')

})
// aedes.on("publish", function (packet, client) {
//   console.log(`Message received from ${client ? client.id : "BROKER"}:`, packet.payload.toString());
// });

// aedes.on("publish", function (packet, client) {
  // if (client) {
  
  // // const client = { id: 1, }
  // const obj = { 
  //   value: '300', 
  // };
  // const obj1 = { 
  //   value: '301', 
  // };
  // const obj2 = { 
  //   value: '302', 
  // };
  // setInterval(() => {
  //   console.log(JSON.stringify(obj))
  //   // console.log(`Forwarding message from ${client.id} to another broker`);
  // forwardClient.publish('sth/commands/topic0', JSON.stringify(obj));
  // }, 3000)
  // setInterval(() => {
  //   console.log(JSON.stringify(obj1))
  //   // console.log(`Forwarding message from ${client.id} to another broker`);
  //   forwardClient.publish('some/topic1', JSON.stringify(obj1));
  // }, 3000)
  // setInterval(() => {
  //   console.log(JSON.stringify(obj2))
  //   // console.log(`Forwarding message from ${client.id} to another broker`);
  //   forwardClient.publish('some/topic2', JSON.stringify(obj2));
  // }, 3000)
//   }
// });



