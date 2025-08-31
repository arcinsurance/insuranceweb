const express = require('express');
const axios = require('axios');
const router = express.Router();

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getWithRetry(url, opts = {}, retries = 2, baseDelayMs = 300) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await axios.get(url, opts);
    } catch (err) {
      lastErr = err;
      const status = err?.response?.status;
      // Retry on network errors and 5xx
      const shouldRetry = !status || (status >= 500 && status < 600);
      if (!shouldRetry || attempt === retries) break;
      const delay = baseDelayMs * Math.pow(2, attempt);
      await sleep(delay);
    }
  }
  throw lastErr;
}

// GET /api/geo/countyfips?zipcode=33615&state=FL
// Uses public, no-key services: Zippopotam.us (zip->lat/lon) + FCC (lat/lon->county FIPS)
router.get('/countyfips', async (req, res) => {
  try {
    const zipcode = (req.query.zipcode || '').toString().trim();
    const state = (req.query.state || '').toString().trim().toUpperCase();
    if (!zipcode || zipcode.length < 3) {
      return res.status(400).json({ success: false, error: 'zipcode requerido' });
    }
    // 1) ZIP -> lat/lon via Zippopotam.us
    const zipUrl = `https://api.zippopotam.us/us/${encodeURIComponent(zipcode)}`;
    const zipResp = await getWithRetry(zipUrl, { timeout: 8000 }, 2, 250);
    const places = Array.isArray(zipResp.data?.places) ? zipResp.data.places : [];
    if (!places.length) return res.status(404).json({ success: false, error: 'ZIP no encontrado' });
    // Optionally filter by state abbreviation if provided
    let place = places[0];
    if (state) {
      const match = places.find(p => (p['state abbreviation'] || '').toUpperCase() === state || (p['state'] || '').toUpperCase().startsWith(state));
      if (match) place = match;
    }
    const lat = parseFloat(place.latitude);
    const lon = parseFloat(place.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return res.status(500).json({ success: false, error: 'Lat/Lon inválidos para el ZIP' });
    }
    // 2) Lat/Lon -> county FIPS via FCC, with Census fallback
    let fips, name;
    try {
      const fccUrl = `https://geo.fcc.gov/api/census/block/find?format=json&latitude=${lat}&longitude=${lon}`;
      const fccResp = await getWithRetry(fccUrl, { timeout: 8000 }, 2, 250);
      const county = fccResp.data?.County || fccResp.data?.county || fccResp.data?.State?.county || null;
      if (county && (county.FIPS || county.fips || county.fips_code)) {
        fips = (county.FIPS || county.fips || county.fips_code).toString();
        name = (county.name || county.NAME || county.county_name || '').toString();
      }
    } catch (_) {
      // ignore, will try Census fallback
    }

    if (!fips) {
      // Census Geocoder fallback
      const x = lon; const y = lat;
      const params = new URLSearchParams({
        x: String(x), y: String(y), format: 'json', benchmark: 'Public_AR_Census2020', vintage: 'Census2020_Census2020'
      });
      const censusUrl = `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?${params.toString()}`;
      const censusResp = await getWithRetry(censusUrl, { timeout: 10000 }, 2, 300);
      const resu = censusResp.data?.result || {};
      const geogs = resu?.geographies || {};
      const counties = Array.isArray(geogs?.Counties) ? geogs.Counties : (Array.isArray(geogs['2010 Census Counties']) ? geogs['2010 Census Counties'] : []);
      if (counties && counties.length) {
        const c = counties[0];
        fips = (c.GEOID || c.STATE + c.COUNTY || c.COUNTYFP || c.COUNTY) ? String(c.GEOID || (c.STATE + c.COUNTY) || c.COUNTYFP || c.COUNTY) : undefined;
        name = (c.NAME || c.BASENAME || c.FullName || '').toString();
      }
    }

    if (!fips) {
      return res.status(404).json({ success: false, error: 'No se pudo determinar el County FIPS' });
    }
    return res.json({ success: true, data: { countyfips: fips, county: name || '', latitude: lat, longitude: lon } });
  } catch (err) {
    const status = err?.response?.status || 500;
    let detail = err?.response?.data || err?.message || 'Error de servicio geo';
    // Avoid returning HTML to client; surface a concise message
    if (typeof detail === 'string' && /<html/i.test(detail)) {
      detail = `Servicio externo respondió ${status}`;
    }
    return res.status(status).json({ success: false, error: detail });
  }
});

module.exports = router;
