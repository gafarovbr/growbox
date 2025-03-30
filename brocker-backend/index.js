const mqtt = require("mqtt");
const aedes = require("aedes")();
const forwardClient = mqtt.connect("mqtt://localhost:1884");
const server = require("net").createServer(aedes.handle);
const port = 1883;

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
  // const [ clientId, type, uuid ] = data.topic.split('/')
  console.log('sensors')
  // console.log(data)
  // console.log(`clientId: ${clientId}, type: ${type}, uuid: ${uuid}`)
  console.log(String(data.payload))
  forwardClient.publish('1/sensors/1', JSON.stringify(String(data.payload))); // TODO: change path
});

aedes.subscribe("#", (data, func) => {
  if (
    data.topic.includes('commands')
    || data.topic.includes('status')
    || data.topic.includes('sensors')
  ) { return; }
  console.log('default')
  // const [ clientId, type, uuid ] = data.topic.split('/')
  // console.log(`clientId: ${clientId}, type: ${type}, uuid: ${uuid}`)
  // console.log(String(data.payload))
  // console.log(data)
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