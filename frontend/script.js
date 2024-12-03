<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MQTT Device Control</title>
</head>
<body>
    <h1>MQTT Device Control</h1>

    <button id="onButton">Turn On</button>
    <button id="offButton">Turn Off</button>
    <button id="getDataButton">Get Data</button>

    <p id="dataDisplay"></p>

    <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
    <script>
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

        
        client.subscribe('device/data');
    </script>
</body>
</html>
