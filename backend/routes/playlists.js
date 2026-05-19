const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const { auth } = require('../middleware/auth');

router.post('/', auth, playlistController.createPlaylist);
router.get('/', auth, playlistController.getUserPlaylists);
router.get('/:id', auth, playlistController.getPlaylistById);
router.post('/:id/songs', auth, playlistController.addSong);
router.delete('/:id/songs/:songId', auth, playlistController.removeSong);

module.exports = router;
