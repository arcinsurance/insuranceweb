process.on('uncaughtException', err => {
	console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', err => {
	console.error('Unhandled Rejection:', err);
});

// Load local env vars in development
try {
	require('dotenv').config({ path: '.env.local' });
	require('dotenv').config();
} catch (_) {}

// Simple Express server to expose the /api/send-lead-email endpoint
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let sendLeadEmail;
let sendAppointmentEmail;
try {
	sendLeadEmail = require('./api/send-lead-email.js');
} catch (e) {
	console.error('No se pudo cargar ./api/send-lead-email.js:', e);
}
try {
	sendAppointmentEmail = require('./api/send-appointment-email.js');
} catch (e) {
	console.error('No se pudo cargar ./api/send-appointment-email.js:', e);
}
// Marketplace and plan search removed per product decision

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Simple health check
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Email diagnostics
app.get('/api/email/_debug', (req, res) => {
	const smtp = {
		host: !!process.env.SMTP_HOST,
		port: !!process.env.SMTP_PORT,
		user: !!process.env.SMTP_USER,
		pass: !!process.env.SMTP_PASS,
	};
	const gmail = {
		user: !!process.env.GMAIL_USER,
		appPass: !!process.env.GMAIL_APP_PASSWORD
	};
	const hasSMTP = smtp.host && smtp.port && smtp.user && smtp.pass;
	const hasGmail = gmail.user && gmail.appPass;
	const hasCentral = !!process.env.CENTRAL_EMAIL_ADDRESS;
	const handlers = {
		lead: !!(sendLeadEmail && sendLeadEmail.default),
		appointment: !!(sendAppointmentEmail && sendAppointmentEmail.default)
	};
	res.json({ ok: hasCentral && (hasSMTP || hasGmail), cfg: { smtp, gmail, hasCentral, handlers } });
});

// Marketplace diagnostics removed

// Adapt the serverless handler to Express
if (sendLeadEmail && sendLeadEmail.default) {
	app.post('/api/send-lead-email', (req, res) => {
		req.method = 'POST';
		sendLeadEmail.default(req, res);
	});
}
if (sendAppointmentEmail && sendAppointmentEmail.default) {
	app.post('/api/send-appointment-email', (req, res) => {
		req.method = 'POST';
		sendAppointmentEmail.default(req, res);
	});
}

// Marketplace/Geo routes removed

// Serve static files from the dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
