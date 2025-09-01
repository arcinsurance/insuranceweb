const express = require('express');
const axios = require('axios');
const router = express.Router();
const { searchPlans, getPlan, getClientDebug, getLastAttempt } = require('../services/marketplaceClient');

function toInt(x) {
  if (x === undefined || x === null || x === '') return undefined;
  const n = Number(x);
  return Number.isFinite(n) ? Math.trunc(n) : undefined;
}

function normalizeFilters(input) {
  const f = { ...(input || {}) };
  // year
  if (f.year !== undefined) {
    const n = toInt(f.year);
    if (n !== undefined) f.year = n;
  }
  // householdSize
  if (f.householdSize !== undefined) {
    const n = toInt(f.householdSize);
    if (n !== undefined) f.householdSize = n;
  }
  // ages: "35" | "35,40" | ["35","40"] | [35,40]
  if (f.ages !== undefined) {
    let ages = f.ages;
    if (typeof ages === 'string') {
      ages = ages.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (Array.isArray(ages)) {
      ages = ages.map(a => toInt(a)).filter(v => v !== undefined);
    }
    if (Array.isArray(ages) && ages.length) {
      f.ages = ages;
    }
  }
  return f;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function getWithRetry(url, opts = {}, retries = 2, baseDelayMs = 250) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try { return await axios.get(url, opts); } catch (err) {
      lastErr = err; const status = err?.response?.status;
      const retry = !status || (status >= 500 && status < 600);
      if (!retry || attempt === retries) break;
      await sleep(baseDelayMs * Math.pow(2, attempt));
    }
  }
  throw lastErr;
}

// Best-effort ZIP+state -> countyfips resolver (shared with /api/geo/countyfips)
async function resolveCountyFips(zipcode, state) {
  const zipUrl = `https://api.zippopotam.us/us/${encodeURIComponent(zipcode)}`;
  const zipResp = await getWithRetry(zipUrl, { timeout: 8000 }, 2, 250);
  const places = Array.isArray(zipResp.data?.places) ? zipResp.data.places : [];
  if (!places.length) throw new Error('ZIP no encontrado');
  let place = places[0];
  if (state) {
    const match = places.find(p => (p['state abbreviation'] || '').toUpperCase() === state || (p['state'] || '').toUpperCase().startsWith(state));
    if (match) place = match;
  }
  const lat = parseFloat(place.latitude); const lon = parseFloat(place.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error('Lat/Lon inválidos para el ZIP');
  // FCC lookup
  try {
    const fccUrl = `https://geo.fcc.gov/api/census/block/find?format=json&latitude=${lat}&longitude=${lon}`;
    const fccResp = await getWithRetry(fccUrl, { timeout: 8000 }, 2, 250);
    const county = fccResp.data?.County || fccResp.data?.county || fccResp.data?.State?.county || null;
    if (county && (county.FIPS || county.fips || county.fips_code)) {
      const fips = (county.FIPS || county.fips || county.fips_code).toString();
      return fips;
    }
  } catch (_) {}
  // Census fallback
  const params = new URLSearchParams({ x: String(lon), y: String(lat), format: 'json', benchmark: 'Public_AR_Census2020', vintage: 'Census2020_Census2020' });
  const censusUrl = `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?${params.toString()}`;
  const censusResp = await getWithRetry(censusUrl, { timeout: 10000 }, 2, 300);
  const geogs = censusResp.data?.result?.geographies || {};
  const counties = Array.isArray(geogs?.Counties) ? geogs.Counties : (Array.isArray(geogs['2010 Census Counties']) ? geogs['2010 Census Counties'] : []);
  if (counties && counties.length) {
    const c = counties[0];
    const fips = (c.GEOID || (c.STATE + c.COUNTY) || c.COUNTYFP || c.COUNTY) ? String(c.GEOID || (c.STATE + c.COUNTY) || c.COUNTYFP || c.COUNTY) : undefined;
    if (fips) return fips;
  }
  throw new Error('No se pudo determinar el County FIPS');
}

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
  const filters = normalizeFilters(req.body || {});
    // Auto-resolve countyfips if missing but state+zipcode provided
    if ((!filters.countyfips || String(filters.countyfips).trim() === '') && filters.state && filters.zipcode) {
      try {
        const fips = await resolveCountyFips(String(filters.zipcode).trim(), String(filters.state).trim().toUpperCase());
        if (fips) {
          filters.countyfips = fips;
          console.log('[Marketplace] Resolved countyfips for search (POST):', { zipcode: filters.zipcode, state: filters.state, countyfips: fips });
        }
      } catch (e) {
        console.warn('[Marketplace] Failed to resolve countyfips (POST):', e?.message || e);
      }
    }
    if (!filters.countyfips) {
      return res.status(400).json({ success: false, error: 'countyfips requerido para esta búsqueda; inténtelo de nuevo o use ZIP válido.' });
    }
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
  const filters = normalizeFilters(req.query || {});
    if ((!filters.countyfips || String(filters.countyfips).trim() === '') && filters.state && filters.zipcode) {
      try {
        const fips = await resolveCountyFips(String(filters.zipcode).trim(), String(filters.state).trim().toUpperCase());
        if (fips) {
          filters.countyfips = fips;
          console.log('[Marketplace] Resolved countyfips for search (GET):', { zipcode: filters.zipcode, state: filters.state, countyfips: fips });
        }
      } catch (e) {
        console.warn('[Marketplace] Failed to resolve countyfips (GET):', e?.message || e);
      }
    }
    if (!filters.countyfips) {
      return res.status(400).json({ success: false, error: 'countyfips requerido para esta búsqueda; inténtelo de nuevo o use ZIP válido.' });
    }
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
  const year = req.query.year !== undefined ? Number(req.query.year) : undefined;
  const data = await getPlan(id, year);
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
  client: getClientDebug(),
  lastAttempt: getLastAttempt && getLastAttempt()
  };
  return res.json(info);
});

module.exports = router;
