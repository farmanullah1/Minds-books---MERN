const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const highlightController = require('../controllers/highlightController');

// All routes require authentication
router.use(auth);

router.post('/', highlightController.createHighlight);
router.get('/user/:userId', highlightController.getUserHighlights);
router.delete('/:id', highlightController.deleteHighlight);

module.exports = router;
