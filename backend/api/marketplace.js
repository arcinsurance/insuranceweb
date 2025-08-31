const express = require('express');
const router = express.Router();
const { searchPlans, getPlan } = require('../services/marketplaceClient');

function isConfigured() {
  const required = [
    'MARKETPLACE_API_BASE_URL',
    'MARKETPLACE_API_KEY',
  ];
  const missing = required.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
}

router.post('/search', async (req, res) => {
  const cfg = isConfigured();
  if (!cfg.ok) {
    return res.status(500).json({ success: false, error: `Marketplace API not configured: missing ${cfg.missing.join(', ')}` });
  }
  try {
    const filters = req.body || {};
    const data = await searchPlans(filters);
    return res.json({ success: true, data });
  } catch (err) {
    const status = err.response?.status || 500;
    const detail = err.response?.data || err.message || 'Upstream error';
    return res.status(status).json({ success: false, error: detail });
  }
});

// Also support GET for convenience/testing; query params will be forwarded
router.get('/search', async (req, res) => {
  const cfg = isConfigured();
  if (!cfg.ok) {
    return res.status(500).json({ success: false, error: `Marketplace API not configured: missing ${cfg.missing.join(', ')}` });
  }
  try {
    const filters = req.query || {};
    const data = await searchPlans(filters);
    return res.json({ success: true, data });
  } catch (err) {
    const status = err.response?.status || 500;
    const detail = err.response?.data || err.message || 'Upstream error';
    return res.status(status).json({ success: false, error: detail });
  }
});

router.get('/plans/:id', async (req, res) => {
  const cfg = isConfigured();
  if (!cfg.ok) {
    return res.status(500).json({ success: false, error: `Marketplace API not configured: missing ${cfg.missing.join(', ')}` });
  }
  try {
    const id = req.params.id;
    const data = await getPlan(id);
    return res.json({ success: true, data });
  } catch (err) {
    const status = err.response?.status || 500;
    const detail = err.response?.data || err.message || 'Upstream error';
    return res.status(status).json({ success: false, error: detail });
  }
});

module.exports = router;
