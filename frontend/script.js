const sendCommand = async (command) => {
    try {
        const response = await fetch('/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error sending command:', error);
    }
};

const getData = async () => {
    try {
        const response = await fetch('/data');
        const data = await response.json();
        document.getElementById('data-output').textContent = JSON.stringify(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
