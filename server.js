// server.js
const express = require('express');
const cors = require('cors'); // To handle Cross-Origin Resource Sharing

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Sample GET endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

// Sample POST endpoint
app.post('/api/data', (req, res) => {
    console.log('Received data:', req.body);
    res.json({ status: 'Data received', data: req.body });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
