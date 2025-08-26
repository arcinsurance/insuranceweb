import express from 'express';
import { getAllLeads, createLead } from '../models/leadModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const leads = await getAllLeads();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching leads' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newLead = await createLead(req.body);
    res.status(201).json(newLead);
  } catch (err) {
    res.status(500).json({ error: 'Error creating lead' });
  }
});

export default router;
