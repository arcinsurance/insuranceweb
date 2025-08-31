const express = require('express');
const router = express.Router();
const { searchPlans, getPlan, getClientDebug } = require('../services/marketplaceClient');

function isConfigured() {
  const base = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE;
  const hasKey = !!process.env.MARKETPLACE_API_KEY;
  const missing = [];
  if (!base) missing.push('MARKETPLACE_API_BASE_URL|MARKETPLACE_BASE');
  if (!hasKey) missing.push('MARKETPLACE_API_KEY');
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
    const status = (err && err.response && err.response.status) ? err.response.status : 500;
    const detail = (err && err.response && err.response.data) ? err.response.data : (err && err.message ? err.message : 'Upstream error');
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
    const status = (err && err.response && err.response.status) ? err.response.status : 500;
    const detail = (err && err.response && err.response.data) ? err.response.data : (err && err.message ? err.message : 'Upstream error');
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
    const status = (err && err.response && err.response.status) ? err.response.status : 500;
    const detail = (err && err.response && err.response.data) ? err.response.data : (err && err.message ? err.message : 'Upstream error');
    return res.status(status).json({ success: false, error: detail });
  }
});

// Debug endpoint to verify runtime config (does not expose secrets)
router.get('/_debug', (req, res) => {
  const cfg = isConfigured();
  const info = {
    ok: cfg.ok,
    missing: cfg.missing,
    config: {
      baseURL: process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || null,
      method: (process.env.MARKETPLACE_SEARCH_METHOD || 'AUTO'),
      searchPath: process.env.MARKETPLACE_SEARCH_PATH || '/plans/search',
      planDetailsPath: process.env.MARKETPLACE_PLAN_DETAILS_PATH || '/plans/:id',
      apiKeyHeader: process.env.MARKETPLACE_API_KEY_HEADER || 'AUTO',
      hasApiKey: !!process.env.MARKETPLACE_API_KEY
  },
  client: getClientDebug()
  };
  return res.json(info);
});

module.exports = router;
