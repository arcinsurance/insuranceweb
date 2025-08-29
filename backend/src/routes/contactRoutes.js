import express from 'express';
import { getAllContacts, createContact } from '../models/contactModel.js';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newContact = await createContact(req.body);
    // Enviar email de notificación
    await sendEmail({
      to: process.env.SMTP_USER,
      subject: 'Nuevo contacto recibido',
      text: `Nombre: ${req.body.name}\nEmail: ${req.body.email}\nTeléfono: ${req.body.phone}\nMensaje: ${req.body.message}`,
      html: `<p><b>Nombre:</b> ${req.body.name}</p><p><b>Email:</b> ${req.body.email}</p><p><b>Teléfono:</b> ${req.body.phone}</p><p><b>Mensaje:</b> ${req.body.message}</p>`
    });
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: 'Error creando contacto o enviando email' });
  }
});

export default router;
