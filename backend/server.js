const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port = 3000;


const mqttClient = mqtt.connect('mqtt://localhost');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('device/control');
    mqttClient.subscribe('device/getData');
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
    console.log(`Server is running on http://localhost:${port}`);
});
