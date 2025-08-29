import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const MARKETPLACE_API_KEY = process.env.MARKETPLACE_API_KEY;
const MARKETPLACE_BASE = process.env.MARKETPLACE_BASE || 'https://api.healthcare.gov/api/v1/marketplace';

if (!MARKETPLACE_API_KEY) {
  throw new Error('MARKETPLACE_API_KEY is not set in environment variables');
}

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Proxy to Marketplace API: Plans Search
router.post('/plans/search', async (req, res) => {
  try {
    const url = `${MARKETPLACE_BASE}/plans/search?apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy to Marketplace API: Counties
router.get('/counties', async (req, res) => {
  try {
    const { zipcode } = req.query;
    let url = `${MARKETPLACE_BASE}/counties?apikey=${MARKETPLACE_API_KEY}`;
    if (zipcode) {
      url += `&zipcode=${zipcode}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy to Marketplace API: Drugs
router.get('/drugs', async (req, res) => {
  try {
    const url = `${MARKETPLACE_BASE}/drugs?apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;