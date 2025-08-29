
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Healthcheck endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

// Get counties by zip code
router.get('/counties/:zip', async (req, res) => {
  const { zip } = req.params;
  try {
    const response = await fetch(`${process.env.MARKETPLACE_BASE}/counties/${zip}`, {
      headers: { 'Api-Key': process.env.MARKETPLACE_API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching counties' });
  }
});

// Get plans by params
router.get('/plans', async (req, res) => {
  try {
    const url = new URL(`${process.env.MARKETPLACE_BASE}/plans`);
    Object.entries(req.query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    const response = await fetch(url, {
      headers: { 'Api-Key': process.env.MARKETPLACE_API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plans' });
  }
});

// Get plan details by id
router.get('/plans/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${process.env.MARKETPLACE_BASE}/plans/${id}`, {
      headers: { 'Api-Key': process.env.MARKETPLACE_API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plan details' });
  }
});

// Optional: Get drugs by params
router.get('/drugs', async (req, res) => {
  try {
    const url = new URL(`${process.env.MARKETPLACE_BASE}/drugs`);
    Object.entries(req.query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    const response = await fetch(url, {
      headers: { 'Api-Key': process.env.MARKETPLACE_API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching drugs' });
  }
});

export default router;
