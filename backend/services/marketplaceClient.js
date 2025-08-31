const axios = require('axios');

function buildClient() {
  // Accept either MARKETPLACE_API_BASE_URL or MARKETPLACE_BASE
  const baseURL = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE;
  const timeout = parseInt(process.env.MARKETPLACE_TIMEOUT_MS || '15000', 10);
  const headers = {};

  if (process.env.MARKETPLACE_API_KEY_HEADER) {
    headers[process.env.MARKETPLACE_API_KEY_HEADER] = process.env.MARKETPLACE_API_KEY;
  } else if (process.env.MARKETPLACE_API_KEY) {
    const scheme = process.env.MARKETPLACE_AUTH_SCHEME || 'Bearer';
    headers['Authorization'] = `${scheme} ${process.env.MARKETPLACE_API_KEY}`;
  }

  // Heuristic: if baseURL looks like healthcare.gov and no header provided, default to X-Api-Key
  if (!process.env.MARKETPLACE_API_KEY_HEADER && process.env.MARKETPLACE_API_KEY && /healthcare\.gov/.test(baseURL || '')) {
    headers['X-Api-Key'] = process.env.MARKETPLACE_API_KEY;
    delete headers['Authorization'];
  }

  if (process.env.MARKETPLACE_EXTRA_HEADERS) {
    try {
      const extra = JSON.parse(process.env.MARKETPLACE_EXTRA_HEADERS);
      Object.assign(headers, extra);
    } catch (e) {
      console.warn('MARKETPLACE_EXTRA_HEADERS is not valid JSON; ignoring');
    }
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

module.exports = { searchPlans, getPlan };
