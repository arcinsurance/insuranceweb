import express from 'express';
import {
  searchPlans,
  getPlanDetails,
  getCountiesByZip,
  autocompleteDrug,
  getDrugCoverage
} from '../services/marketplaceService.js';

const router = express.Router();

router.post('/plans/search', async (req, res) => {
  try {
    const data = await searchPlans(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/plans/:planid', async (req, res) => {
  try {
    const { planid } = req.params;
    const { year } = req.query;
    const data = await getPlanDetails(planid, year);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/counties/by/zip/:zipcode', async (req, res) => {
  try {
    const { zipcode } = req.params;
    const data = await getCountiesByZip(zipcode);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/drugs/autocomplete', async (req, res) => {
  try {
    const { q } = req.query;
    const data = await autocompleteDrug(q);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/drugs/covered', async (req, res) => {
  try {
    const { year, drugs, planids } = req.query;
    const data = await getDrugCoverage({ year, drugs, planids });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
