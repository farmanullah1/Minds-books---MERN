/**
 * CodeDNA
 * dataExport.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const express = require('express');
const router = express.Router();
const { requestExport, getExportStatus, downloadExport } = require('../controllers/dataExportController');
const { auth } = require('../middleware/auth');

router.post('/request', auth, requestExport);
router.get('/status', auth, getExportStatus);
router.get('/download/:id', auth, downloadExport);

module.exports = router;
