const axios = require('axios');

function buildClient() {
  // Accept either MARKETPLACE_API_BASE_URL or MARKETPLACE_BASE
  const baseURL = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE;
  const timeout = parseInt(process.env.MARKETPLACE_TIMEOUT_MS || '15000', 10);
  const headers = {};
  headers['Accept'] = 'application/json';

  const apiKey = (process.env.MARKETPLACE_API_KEY || '').trim();
  if (process.env.MARKETPLACE_API_KEY_HEADER && apiKey) {
    headers[process.env.MARKETPLACE_API_KEY_HEADER] = apiKey;
  } else if (apiKey) {
    const scheme = process.env.MARKETPLACE_AUTH_SCHEME || 'Bearer';
    headers['Authorization'] = `${scheme} ${apiKey}`;
  }

  // Heuristic: if baseURL looks like healthcare.gov, always set API key headers
  if (apiKey && /healthcare\.gov/.test(baseURL || '')) {
    headers['X-Api-Key'] = apiKey;
    headers['x-api-key'] = apiKey;
    headers['X-API-Key'] = apiKey;
    headers['api-key'] = apiKey;
    headers['apikey'] = apiKey;
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
  const preferredMethod = (process.env.MARKETPLACE_SEARCH_METHOD || defaultMethod).toUpperCase();
  const configuredPath = process.env.MARKETPLACE_SEARCH_PATH || '/plans/search';
  const isHealthcare = /healthcare\.gov/.test((process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || ''));
  const apiKey = (process.env.MARKETPLACE_API_KEY || '').trim();

  const methodCandidates = preferredMethod === 'GET' ? ['GET', 'POST'] : ['POST', 'GET'];
  const pathCandidates = configuredPath.endsWith('/plans') ? [configuredPath, '/plans/search']
                      : configuredPath.endsWith('/plans/search') ? [configuredPath, '/plans']
                      : [configuredPath, '/plans', '/plans/search'];

  let lastErr = null;
  for (const method of methodCandidates) {
    for (const path of pathCandidates) {
      try {
        if (method === 'GET') {
          const params = { ...(filters || {}) };
          if (isHealthcare && apiKey) {
            params.api_key = apiKey;
            params.apikey = apiKey;
            params['api-key'] = apiKey;
          }
          console.log('[Marketplace] TRY GET', (baseURL || '') + path, 'params keys:', Object.keys(params || {}));
          const { data } = await client.get(path, { params });
          return data;
        } else {
          const params = {};
          if (isHealthcare && apiKey) {
            params.api_key = apiKey;
            params.apikey = apiKey;
            params['api-key'] = apiKey;
          }
          console.log('[Marketplace] TRY POST', (baseURL || '') + path, 'body keys:', Object.keys(filters || {}), 'params keys:', Object.keys(params));
          const { data } = await client.post(path, filters, { params });
          return data;
        }
      } catch (err) {
        const status = (err && err.response && err.response.status) ? err.response.status : 'unknown';
        console.warn('[Marketplace] Attempt failed', method, (baseURL || '') + path, 'status:', status);
        lastErr = err;
        // If it's not a 405, continue trying others but will rethrow after exhausting
        continue;
      }
    }
  }
  // Exhausted attempts
  if (lastErr) {
    const status = (lastErr && lastErr.response && lastErr.response.status) ? lastErr.response.status : 'unknown';
    console.error('[Marketplace] All attempts failed, last status:', status);
    throw lastErr;
  }
  throw new Error('Marketplace search failed with no attempts executed');
}

async function getPlan(planId) {
  const client = buildClient();
  let path = process.env.MARKETPLACE_PLAN_DETAILS_PATH || '/plans/:id';
  path = path.replace(':id', encodeURIComponent(planId));
  const isHealthcare = /healthcare\.gov/.test((process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || ''));
  const apiKey = (process.env.MARKETPLACE_API_KEY || '').trim();
  const params = {};
  if (isHealthcare && apiKey) params.api_key = apiKey;
  const { data } = await client.get(path, { params });
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
