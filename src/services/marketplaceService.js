import axios from 'axios';

const API_KEY = process.env.MARKETPLACE_API_KEY;
const BASE_URL = 'https://marketplace.api.healthcare.gov/api/v1';

// Transforma los datos del formulario a la estructura esperada por la API externa
export async function searchPlans(formData) {
  // Estructura estándar para una cotización individual
  const payload = {
    state: formData.state,
    year: Number(formData.year),
    zip_code: formData.zipcode,
    household_income: Number(formData.income),
    household_size: Number(formData.household),
    applicants: [
      {
        age: Number(formData.age),
        relationship: 'self',
        tobacco_use: false
      }
    ]
  };
  const res = await axios.post(
    `${BASE_URL}/plans/search?apikey=${API_KEY}`,
    payload,
    { headers: { 'content-type': 'application/json' } }
  );
  return res.data;
}

export async function getPlanDetails(planid, year) {
  const res = await axios.get(
    `${BASE_URL}/plans/${planid}?year=${year}&apikey=${API_KEY}`
  );
  return res.data;
}

export async function getCountiesByZip(zipcode) {
  const res = await axios.get(
    `${BASE_URL}/counties/by/zip/${zipcode}?apikey=${API_KEY}`
  );
  return res.data;
}

export async function autocompleteDrug(query) {
  const res = await axios.get(
    `${BASE_URL}/drugs/autocomplete?q=${encodeURIComponent(query)}&apikey=${API_KEY}`
  );
  return res.data;
}

export async function getDrugCoverage({ year, drugs, planids }) {
  const res = await axios.get(
    `${BASE_URL}/drugs/covered?year=${year}&drugs=${drugs}&planids=${planids}&apikey=${API_KEY}`
  );
  return res.data;
}
