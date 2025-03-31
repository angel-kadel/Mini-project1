// Express application for JavaScript Framework Lecture Website
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import JSON data
const frameworkData = require('./data/frameworks.json');

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the JSON data
app.get('/api/frameworks', (req, res) => {
  res.json(frameworkData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});