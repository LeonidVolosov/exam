const express = require('express');
const app = express();

app.use(express.json());

let deviceState = { state: 'off' };

app.post('/control', (req, res) => {
    deviceState.state = req.body.state || 'off';
    res.json({ message: 'Device state updated', state: deviceState });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
