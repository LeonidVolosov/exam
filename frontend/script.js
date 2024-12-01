const mqtt = require('mqtt');

const client = mqtt.connect('ws://localhost:9001'); 

client.on('connect', function () {
    console.log('Connected to MQTT broker');
});


document.getElementById('onButton').addEventListener('click', function () {
    client.publish('device/control', 'on');
});

document.getElementById('offButton').addEventListener('click', function () {
    client.publish('device/control', 'off');
});

document.getElementById('getDataButton').addEventListener('click', function () {
    client.publish('device/getData', 'request');
});

client.on('message', function (topic, message) {
    if (topic === 'device/data') {
        document.getElementById('dataDisplay').innerText = 'Data: ' + message.toString();
    }
});
