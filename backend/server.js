const express = require('express');
const mqtt = require('mqtt');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MQTT Client
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
let deviceData = { status: 'off', temperature: 25 };

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('message', (topic, message) => {
    if (topic === 'iot/device/data') {
        deviceData = JSON.parse(message.toString());
    }
});

// Routes
app.post('/command', (req, res) => {
    const { command } = req.body;
    mqttClient.publish('iot/device/command', command);
    res.json({ message: `Command '${command}' sent to device` });
});

app.get('/data', (req, res) => {
    res.json(deviceData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
