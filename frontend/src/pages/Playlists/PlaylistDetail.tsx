import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FiMusic, FiPlus, FiTrash2, FiExternalLink, FiClock } from 'react-icons/fi';
import './Playlists.css';

const PlaylistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newSong, setNewSong] = useState({ title: '', artist: '', url: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.get(`/playlists/${id}`);
        setPlaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [id]);

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSong.title) return;
    setAdding(true);
    try {
      const response = await api.post(`/playlists/${id}/songs`, newSong);
      setPlaylist(response.data);
      setNewSong({ title: '', artist: '', url: '' });
    } catch (error) {
      console.error('Error adding song:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveSong = async (songId: string) => {
    if (!window.confirm('Remove this song?')) return;
    try {
      const response = await api.delete(`/playlists/${id}/songs/${songId}`);
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error removing song:', error);
    }
  };

  if (loading) return <div className="playlists-container">Loading...</div>;
  if (!playlist) return <div className="playlists-container">Playlist not found</div>;

  return (
    <div className="playlists-container">
      <div className="playlist-detail">
        <div className="detail-header">
          <div className="detail-cover">
            <FiMusic />
          </div>
          <div className="detail-info">
            <h2>{playlist.name}</h2>
            <div className="creator-info">
              <img src={playlist.creator.profilePicture} alt={playlist.creator.name} />
              <span>Created by <strong>{playlist.creator.name}</strong></span>
            </div>
            <p className="detail-description">{playlist.description}</p>
            <div className="playlist-meta">
              <span>{playlist.songs.length} songs</span>
              {playlist.collaborators.length > 0 && (
                <span>{playlist.collaborators.length} collaborators</span>
              )}
            </div>
          </div>
        </div>

        <div className="song-list">
          {playlist.songs.length === 0 ? (
            <p className="empty-songs">No songs in this playlist yet.</p>
          ) : (
            playlist.songs.map((song: any, index: number) => (
              <div key={song._id} className="song-item">
                <span className="song-index">{index + 1}</span>
                <div className="song-main">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <div className="song-added-by">
                  Added by {song.addedBy?.name}
                </div>
                <div className="song-actions">
                  {song.url && (
                    <a href={song.url} target="_blank" rel="noopener noreferrer" className="btn-icon">
                      <FiExternalLink />
                    </a>
                  )}
                  <button onClick={() => handleRemoveSong(song._id)} className="btn-icon delete">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="add-song-form">
          <h4>Add a Song</h4>
          <form onSubmit={handleAddSong}>
            <div className="form-row">
              <input 
                type="text" 
                placeholder="Song Title" 
                className="input-field"
                value={newSong.title}
                onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                required
              />
              <input 
                type="text" 
                placeholder="Artist" 
                className="input-field"
                value={newSong.artist}
                onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="URL (optional)" 
                className="input-field"
                value={newSong.url}
                onChange={(e) => setNewSong({...newSong, url: e.target.value})}
              />
              <button type="submit" className="btn btn-primary" disabled={adding}>
                <FiPlus /> {adding ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
