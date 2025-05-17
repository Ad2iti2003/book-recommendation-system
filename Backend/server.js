const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/run-ml', (req, res) => {
    const python = spawn('python3', ['./python/process_data.py']);

    python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // Read the generated output.json
        const result = require('./python/output.json');
        res.json(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
