// routes.js
const express = require('express');
const router = express.Router();
const breakdownController = require('../Controllers/breakdownController');

router.get('/breakdowns', breakdownController.getAllBreakdowns);
router.get('/breakdowns/:id', breakdownController.getBreakdownById);
router.post('/breakdowns', breakdownController.createBreakdown);
router.put('/breakdowns/:id', breakdownController.updateBreakdown);
router.delete('/breakdowns/:id', breakdownController.deleteBreakdown);

module.exports = router;
