
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Get counties by query param (zipcode)
router.get('/counties', async (req, res) => {
  const { zipcode } = req.query;
  if (!zipcode) {
    return res.status(400).json({ error: 'zipcode is required' });
  }
  try {
    const url = new URL(`${process.env.MARKETPLACE_BASE}/counties/${zipcode}`);
    url.searchParams.append('apikey', process.env.MARKETPLACE_API_KEY);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching counties' });
  }
});

// Healthcheck endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

// Buscar planes con POST (payload completo)
router.post('/plans/search', async (req, res) => {
  console.log('MARKETPLACE_API_KEY usado:', process.env.MARKETPLACE_API_KEY);
  try {
    const url = new URL(`${process.env.MARKETPLACE_BASE}/plans/search`);
    url.searchParams.append('apikey', process.env.MARKETPLACE_API_KEY);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error searching plans' });
  }
});

// Get counties by zip code
router.get('/counties/:zip', async (req, res) => {
  const { zip } = req.params;
  try {
    const url = new URL(`${process.env.MARKETPLACE_BASE}/counties/${zip}`);
    url.searchParams.append('apikey', process.env.MARKETPLACE_API_KEY);
    const response = await fetch(url);
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
    url.searchParams.append('apikey', process.env.MARKETPLACE_API_KEY);
    const response = await fetch(url);
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
    const url = new URL(`${process.env.MARKETPLACE_BASE}/plans/${id}`);
    url.searchParams.append('apikey', process.env.MARKETPLACE_API_KEY);
    const response = await fetch(url);
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
    url.searchParams.append('apikey', process.env.MARKETPLACE_API_KEY);
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching drugs' });
  }
});

export default router;
