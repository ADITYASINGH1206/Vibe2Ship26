const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { idsIpsMiddleware } = require('../middleware/ids-ips');

// Apply IDS/IPS strictly to AI endpoints
router.use('/agent', idsIpsMiddleware);

// Core Agent Endpoint: Parses request, generates tasks, auto-schedules
router.post('/agent/plan', aiController.generatePlan);

module.exports = router;
