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

function isHealthcareBase() {
  return /healthcare\.gov/.test((process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE || ''));
}

function buildHealthcareSearchPayload(filters) {
  const f = filters || {};
  const market = f.market;
  const place = {
    state: (f.state || (f.place && (f.place.state || f.place.State)) || '').toString().toUpperCase(),
    zipcode: (f.zipcode || f.zip || (f.place && (f.place.zipcode || f.place.postalCode || f.place.zip)) || '').toString(),
    countyfips: (f.countyfips || f.countyFips || (f.place && (f.place.countyfips || f.place.countyFips)) || '').toString()
  };
  const household = {
    year: typeof f.year === 'number' ? f.year : Number(f.year),
    effective_date: f.effective_date || f.effectiveDate,
    household_size: typeof f.household_size === 'number' ? f.household_size : (typeof f.householdSize === 'number' ? f.householdSize : Number(f.household_size || f.householdSize)),
    ages: Array.isArray(f.ages) ? f.ages : (typeof f.ages === 'string' ? f.ages.split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n)) : undefined)
  };
  // Derive household_size from ages if not set
  if (!household.household_size && Array.isArray(household.ages)) {
    household.household_size = household.ages.length;
  }
  return { market, place, household };
}

async function searchPlans(filters) {
  const client = buildClient();
  const baseURL = process.env.MARKETPLACE_API_BASE_URL || process.env.MARKETPLACE_BASE;
  const defaultMethod = isHealthcareBase() ? 'POST' : 'POST';
  const preferredMethod = (process.env.MARKETPLACE_SEARCH_METHOD || defaultMethod).toUpperCase();
  const configuredPath = process.env.MARKETPLACE_SEARCH_PATH || '/plans/search';
  const isHealthcare = isHealthcareBase();
  const apiKey = (process.env.MARKETPLACE_API_KEY || '').trim();

  const methodCandidates = isHealthcare ? ['POST', 'GET'] : (preferredMethod === 'GET' ? ['GET', 'POST'] : ['POST', 'GET']);
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
          let body = filters || {};
          if (isHealthcare) {
            body = buildHealthcareSearchPayload(filters || {});
          }
          if (isHealthcare && apiKey) {
            params.api_key = apiKey;
            params.apikey = apiKey;
            params['api-key'] = apiKey;
          }
          console.log('[Marketplace] TRY POST', (baseURL || '') + path, 'body keys:', Object.keys(body || {}), 'params keys:', Object.keys(params));
          const { data } = await client.post(path, body, { params });
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
