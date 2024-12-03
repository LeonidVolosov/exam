const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port = 3000;


const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('device/data');  
    mqttClient.subscribe('device/control');  
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'device/data') {
        console.log('Received data:', message.toString());
    }

    if (topic === 'device/control') {
        console.log('Received control command:', message.toString());
    }
});

app.get('/', (req, res) => {
    res.send('IoT Backend');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
