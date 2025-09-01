// Marketplace client disabled; export stubs to satisfy imports.
function getClient() {
  return { client: null, baseURL: null, headerNames: [], timeout: 0 };
}
async function searchPlans() {
  throw new Error('Marketplace disabled');
}
async function getPlan() {
  throw new Error('Marketplace disabled');
}
function getClientDebug() {
  return { baseURL: null, timeout: 0, headerNames: [] };
}
function getLastAttempt() {
  return null;
}
module.exports = { getClient, searchPlans, getPlan, getClientDebug, getLastAttempt };
