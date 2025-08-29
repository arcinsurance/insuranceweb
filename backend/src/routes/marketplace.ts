import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const MARKETPLACE_BASE = process.env.MARKETPLACE_BASE || 'https://marketplace.api.healthcare.gov/api/v1';
const MARKETPLACE_API_KEY = process.env.MARKETPLACE_API_KEY;

// Healthcheck
router.get('/health', (req, res) => {
  res.json({ ok: true });
});

// GET counties by ZIP
router.get('/counties/by-zip/:zip', async (req, res, next) => {
  try {
    const { zip } = req.params;
    const url = `${MARKETPLACE_BASE}/counties/by/zip/${zip}?apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST plans search
router.post('/plans/search', async (req, res, next) => {
  try {
    const url = `${MARKETPLACE_BASE}/plans/search?apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET plan details
router.get('/plans/:planid', async (req, res, next) => {
  try {
    const { planid } = req.params;
    const { year } = req.query;
    const url = `${MARKETPLACE_BASE}/plans/${planid}?year=${year}&apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// (Opcional) Drugs autocomplete
router.get('/drugs/autocomplete', async (req, res, next) => {
  try {
    const { q } = req.query;
    const url = `${MARKETPLACE_BASE}/drugs/autocomplete?q=${encodeURIComponent(q)}&apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// (Opcional) Drugs covered
router.get('/drugs/covered', async (req, res, next) => {
  try {
    const { year, drugs, planids } = req.query;
    const url = `${MARKETPLACE_BASE}/drugs/covered?year=${year}&drugs=${drugs}&planids=${planids}&apikey=${MARKETPLACE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
