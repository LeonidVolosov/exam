const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port = 3000;

const mqttClient = mqtt.connect('ws://localhost:9001');  

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('device/data');
    mqttClient.subscribe('device/control');
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'device/control') {
        if (message.toString() === 'on') {
            console.log('Turning on the device');
        } else if (message.toString() === 'off') {
            console.log('Turning off the device');
        }
    }

    if (topic === 'device/getData') {
        const data = "Temperature: 22°C"; 
        mqttClient.publish('device/data', data);
    }
});

app.get('/', (req, res) => {
    res.send('IoT Backend');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
