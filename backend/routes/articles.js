const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const articleController = require('../controllers/articleController');

router.post('/', auth, articleController.createArticle);
router.get('/', auth, articleController.getArticles);
router.get('/:id', auth, articleController.getArticle);
router.post('/:id/like', auth, articleController.likeArticle);
router.post('/:id/comment', auth, articleController.commentArticle);

module.exports = router;
