const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API example route
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from API!' });
});

// Catch-all route to serve index.html for any other request
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
