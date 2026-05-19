const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const discussionController = require('../controllers/discussionController');

// All discussion routes require authentication
router.use(auth);

router.post('/', discussionController.createThread);
router.get('/group/:groupId', discussionController.getGroupThreads);
router.post('/:id/reply', discussionController.replyToThread);
router.put('/:id/pin', discussionController.togglePinThread);

module.exports = router;
