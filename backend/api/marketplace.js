// Marketplace routes disabled; return 410 for any requests.
const express = require('express');
const router = express.Router();
router.all('*', (_req, res) => {
  res.status(410).json({ success: false, error: 'Marketplace feature is disabled' });
});
module.exports = router;
