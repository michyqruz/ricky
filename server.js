const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render provides the PORT environment variable

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React/Vue/HTML frontend if you have one
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Render server!' });
});

app.post('/api/data', (req, res) => {
    console.log('Received data:', req.body);
    res.json({ status: 'Data received on Render', data: req.body });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
