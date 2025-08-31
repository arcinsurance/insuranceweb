process.on('uncaughtException', err => {
	console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
	console.error('Unhandled Rejection:', err);
});

// Simple Express server to expose the /api/send-lead-email endpoint
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let sendLeadEmail;
try {
	sendLeadEmail = require('./api/send-lead-email.js');
} catch (e) {
	console.error('No se pudo cargar ./api/send-lead-email.js:', e);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Adapt the serverless handler to Express
if (sendLeadEmail && sendLeadEmail.default) {
	app.post('/api/send-lead-email', (req, res) => {
		req.method = 'POST';
		sendLeadEmail.default(req, res);
	});
}

// Serve static files from the dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
