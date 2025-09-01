// Geo endpoints disabled; minimal stub
const express = require('express');
const router = express.Router();
router.all('*', (_req, res) => {
  res.status(410).json({ success: false, error: 'Geo endpoints are disabled' });
});
module.exports = router;
