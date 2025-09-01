const nodemailer = require('nodemailer');

const createAppointmentTemplate = (appointment) => {
  const { name, email, phone, serviceOfInterest } = appointment || {};
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nueva solicitud de cita</title>
      <style>
        body { margin:0; padding:0; font-family: Arial, sans-serif; background:#f4f4f4; }
        .container{ max-width:600px; margin:20px auto; background:#fff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden; }
        .header{ background:#2563EB; color:#fff; padding:20px; text-align:center; }
        .content{ padding:24px; color:#111827; }
        table{ width:100%; border-collapse:collapse; }
        th,td{ padding:10px 8px; border-bottom:1px solid #eee; text-align:left; }
        th{ color:#6b7280; font-size:12px; text-transform:uppercase; }
        .footer{ background:#f9fafb; color:#6b7280; text-align:center; font-size:12px; padding:16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nueva solicitud de cita</h1>
        </div>
        <div class="content">
          <p>Se ha solicitado una nueva cita en el sitio web. Detalles:</p>
          <table>
            <tr><th>Nombre</th><td>${name || 'N/D'}</td></tr>
            <tr><th>Email</th><td>${email || 'N/D'}</td></tr>
            <tr><th>Teléfono</th><td>${phone || 'N/D'}</td></tr>
            <tr><th>Servicio</th><td>${serviceOfInterest || 'Consulta general'}</td></tr>
          </table>
        </div>
        <div class="footer">Este es un mensaje automático. No responder.</div>
      </div>
    </body>
    </html>
  `;
};

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.CENTRAL_EMAIL_ADDRESS) {
    console.error('Faltan variables de entorno SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CENTRAL_EMAIL_ADDRESS)');
    return res.status(500).json({ success: false, error: 'Error de configuración del servidor (SMTP).' });
  }

  const { appointment } = req.body || {};
  if (!appointment) {
    return res.status(400).json({ success: false, error: 'Falta el objeto appointment en el cuerpo.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT == '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.verify();
  } catch (verr) {
    console.error('SMTP verify failed (appointment):', verr?.message || verr);
    return res.status(500).json({ success: false, error: 'SMTP verification failed.' });
  }

  const mailOptions = {
    from: `"Web Leads System" <${process.env.SMTP_USER}>`,
    to: process.env.CENTRAL_EMAIL_ADDRESS,
    subject: `Nueva cita: ${appointment.name || 'Cliente'}`,
  replyTo: appointment.email ? `${appointment.name || 'Cliente'} <${appointment.email}>` : undefined,
    html: createAppointmentTemplate(appointment),
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error enviando correo de cita:', err);
    return res.status(500).json({ success: false, error: 'Fallo al enviar correo de cita.' });
  }
}

module.exports = { default: handler };
