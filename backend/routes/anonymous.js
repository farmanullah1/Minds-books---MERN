const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const anonymousController = require('../controllers/anonymousController');

router.get('/settings', auth, anonymousController.getSettings);
router.put('/settings', auth, anonymousController.updateSettings);
router.post('/submit', auth, anonymousController.submitQuestion);
router.get('/inbox', auth, anonymousController.getMyQuestions);
router.post('/:id/handle', auth, anonymousController.handleQuestion);

module.exports = router;
