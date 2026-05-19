const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const reportController = require('../controllers/reportController');

// All report routes require auth
router.use(auth);

// @route   POST /api/reports
router.post('/', reportController.createReport);

// @route   GET /api/reports/my-reports
router.get('/my-reports', reportController.getMyReports);

module.exports = router;
