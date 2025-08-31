const axios = require('axios');

function buildClient() {
  // Accept either MARKETPLACE_API_BASE_URL or MARKETPLACE_BASE
  const baseURL = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE;
  const timeout = parseInt(process.env.MARKETPLACE_TIMEOUT_MS || '15000', 10);
  const headers = {};

  const apiKey = (process.env.MARKETPLACE_API_KEY || '').trim();
  if (process.env.MARKETPLACE_API_KEY_HEADER && apiKey) {
    headers[process.env.MARKETPLACE_API_KEY_HEADER] = apiKey;
  } else if (apiKey) {
    const scheme = process.env.MARKETPLACE_AUTH_SCHEME || 'Bearer';
    headers['Authorization'] = `${scheme} ${apiKey}`;
  }

  // Heuristic: if baseURL looks like healthcare.gov, always set X-Api-Key
  if (apiKey && /healthcare\.gov/.test(baseURL || '')) {
    headers['X-Api-Key'] = apiKey;
    // Also include lowercase variant just in case some infra is strict (HTTP header names are case-insensitive, but play it safe)
    headers['x-api-key'] = apiKey;
    // Remove Authorization to avoid confusing upstream
    if (headers['Authorization']) delete headers['Authorization'];
  }

  if (process.env.MARKETPLACE_EXTRA_HEADERS) {
    try {
      const extra = JSON.parse(process.env.MARKETPLACE_EXTRA_HEADERS);
      Object.assign(headers, extra);
    } catch (e) {
      console.warn('MARKETPLACE_EXTRA_HEADERS is not valid JSON; ignoring');
    }
  }

  // Log which headers are set (names only) for diagnostics
  try {
    const headerNames = Object.keys(headers || {});
    console.log('[Marketplace] axios client built', { baseURL, headerNames, timeout });
  } catch (_) {
    // no-op
  }

  return axios.create({ baseURL, timeout, headers });
}

async function searchPlans(filters) {
  const client = buildClient();
  const baseURL = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE;
  const defaultMethod = /healthcare\.gov/.test((process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || '')) ? 'GET' : 'POST';
  const method = (process.env.MARKETPLACE_SEARCH_METHOD || defaultMethod).toUpperCase();
  const path = process.env.MARKETPLACE_SEARCH_PATH || '/plans/search';

  try {
    if (method === 'GET') {
      console.log('[Marketplace] GET', (baseURL || '') + path, 'params keys:', Object.keys(filters || {}));
      const { data } = await client.get(path, { params: filters });
      return data;
    } else {
      console.log('[Marketplace] POST', (baseURL || '') + path, 'body keys:', Object.keys(filters || {}));
      const { data } = await client.post(path, filters);
      return data;
    }
  } catch (err) {
    const status = (err && err.response && err.response.status) ? err.response.status : 'unknown';
    console.error('[Marketplace] Upstream error', method, (baseURL || '') + path, 'status:', status);
    throw err;
  }
}

async function getPlan(planId) {
  const client = buildClient();
  let path = process.env.MARKETPLACE_PLAN_DETAILS_PATH || '/plans/:id';
  path = path.replace(':id', encodeURIComponent(planId));
  const { data } = await client.get(path);
  return data;
}

function getClientDebug() {
  const baseURL = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || null;
  const timeout = parseInt(process.env.MARKETPLACE_TIMEOUT_MS || '15000', 10);
  const defaultMethod = /healthcare\.gov/.test((process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || '')) ? 'GET' : 'POST';
  const method = (process.env.MARKETPLACE_SEARCH_METHOD || defaultMethod).toUpperCase();
  const searchPath = process.env.MARKETPLACE_SEARCH_PATH || '/plans/search';
  // Build headers same way but only return names
  const hdrs = {};
  const apiKey = (process.env.MARKETPLACE_API_KEY || '').trim();
  if (process.env.MARKETPLACE_API_KEY_HEADER && apiKey) {
    hdrs[process.env.MARKETPLACE_API_KEY_HEADER] = 'set';
  } else if (apiKey) {
    const scheme = process.env.MARKETPLACE_AUTH_SCHEME || 'Bearer';
    hdrs['Authorization'] = `${scheme} ******`;
  }
  if (apiKey && /healthcare\.gov/.test(baseURL || '')) {
    hdrs['X-Api-Key'] = 'set';
    hdrs['x-api-key'] = 'set';
    if (hdrs['Authorization']) delete hdrs['Authorization'];
  }
  if (process.env.MARKETPLACE_EXTRA_HEADERS) {
    try {
      const extra = JSON.parse(process.env.MARKETPLACE_EXTRA_HEADERS);
      Object.keys(extra || {}).forEach(k => { hdrs[k] = 'set'; });
    } catch (_) {}
  }
  return {
    baseURL,
    timeout,
    method,
    searchPath,
  headerNames: Object.keys(hdrs),
  apiKeyLength: apiKey.length
  };
}

module.exports = { searchPlans, getPlan, getClientDebug };
