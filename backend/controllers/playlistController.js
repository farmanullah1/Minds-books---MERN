const Playlist = require('../models/Playlist');

exports.createPlaylist = async (req, res) => {
  try {
    const { name, description, collaborators, isPublic } = req.body;
    const playlist = new Playlist({
      name,
      description,
      creator: req.user.id,
      collaborators: collaborators || [],
      isPublic: isPublic !== undefined ? isPublic : true
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({
      $or: [
        { creator: req.user.id },
        { collaborators: req.user.id }
      ]
    }).populate('creator', 'name profilePicture');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('creator', 'name profilePicture')
      .populate('collaborators', 'name profilePicture')
      .populate('songs.addedBy', 'name');
    
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    
    // Check privacy
    if (!playlist.isPublic && 
        playlist.creator.id !== req.user.id && 
        !playlist.collaborators.some(c => c.id === req.user.id)) {
      return res.status(403).json({ message: 'Private playlist' });
    }
    
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSong = async (req, res) => {
  try {
    const { title, artist, url } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    
    // Check if user is allowed to add
    if (playlist.creator.toString() !== req.user.id && 
        !playlist.collaborators.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    playlist.songs.push({ title, artist, url, addedBy: req.user.id });
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeSong = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

    // Find song index
    const songIndex = playlist.songs.findIndex(s => s._id.toString() === req.params.songId);
    if (songIndex === -1) return res.status(404).json({ message: 'Song not found' });

    const song = playlist.songs[songIndex];

    // Check if user is allowed to remove (creator or the one who added it)
    if (playlist.creator.toString() !== req.user.id && song.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    playlist.songs.splice(songIndex, 1);
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
