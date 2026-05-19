const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// All admin routes require adminAuth middleware
router.use(adminAuth);

// Dashboard metrics
router.get('/metrics', adminController.getMetrics);

// User management
router.get('/users', adminController.getUsers);
router.put('/users/:userId/status', adminController.updateUserStatus);
router.post('/users/:userId/impersonate', adminController.impersonateUser);

// Moderation Queue
const reportController = require('../controllers/reportController');
router.get('/reports', reportController.getAllReports);
router.put('/reports/:id/resolve', reportController.resolveReport);

module.exports = router;
