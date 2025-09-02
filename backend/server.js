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
const cors = require('cors');
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
//

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// CORS for cross-origin frontend (e.g., Render static site calling API)
const allowedOrigins = (process.env.CORS_ORIGINS || '*')
	.split(',')
const corsOptions = {
	origin: allowedOrigins.includes('*') ? true : allowedOrigins,
	methods: ['GET', 'POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
	.map(s => s.trim())
app.options('*', cors(corsOptions));
	.filter(Boolean);
const corsOptions = {
	origin: allowedOrigins.includes('*') ? true : allowedOrigins,
	methods: ['GET', 'POST', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));

// Simple health check
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Email diagnostics
app.get('/api/email/_debug', async (req, res) => {
	const reqOrigin = req.headers.origin || null;
	const corsInfo = {
		requestedOrigin: reqOrigin,
		allowedOrigins,
		effectivePolicy: allowedOrigins.includes('*') ? 'any' : 'list',
	};
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

	// Try building a transporter and verifying auth without sending mail
	let verify = { tried: false, ok: false, error: null, mode: hasSMTP ? 'smtp' : (hasGmail ? 'gmail' : 'none') };
	if (hasCentral && (hasSMTP || hasGmail)) {
		try {
			const nodemailer = require('nodemailer');
			let transporter;
			if (hasSMTP) {
				transporter = nodemailer.createTransport({
					host: process.env.SMTP_HOST,
					port: parseInt(process.env.SMTP_PORT, 10),
					secure: String(process.env.SMTP_PORT) === '465',
					auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
				});
			} else {
				transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
				});
			}
			verify.tried = true;
			await transporter.verify();
			verify.ok = true;
		} catch (e) {
			verify.ok = false;
			verify.error = e && (e.message || String(e));
		}
	}

	res.json({ ok: hasCentral && (hasSMTP || hasGmail), cfg: { smtp, gmail, hasCentral, handlers, cors: corsInfo }, verify });
});

//

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

//

// Serve static files from the dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
