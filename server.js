// Simple Express server to expose the /api/send-lead-email endpoint
const express = require('express');
const bodyParser = require('body-parser');
const sendLeadEmail = require('./api/send-lead-email.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Adapt the serverless handler to Express
app.post('/api/send-lead-email', (req, res) => {
  // The serverless handler expects (req, res) with body and method
  // We add method property to req for compatibility
  req.method = 'POST';
  sendLeadEmail.default(req, res);
});

// Serve static files from the dist directory (Vite build output)
app.use(express.static('dist'));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
