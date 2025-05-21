// server.js (Node.js + Express)
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors());

app.get('/books', (req, res) => {
    const data = fs.readFileSync('./processed_books.json');
    res.json(JSON.parse(data));
});


app.listen(5000, () => console.log('Server running on port 5000'));



