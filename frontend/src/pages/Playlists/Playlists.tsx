import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiMusic, FiPlus, FiUsers, FiLock, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Playlists.css';

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get('/playlists');
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="playlists-container">
      <div className="playlists-header">
        <div className="header-left">
          <FiMusic className="header-icon" />
          <h1>Collaborative Playlists</h1>
        </div>
        <Link to="/playlists/create" className="btn btn-primary">
          <FiPlus /> Create Playlist
        </Link>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4].map(i => <div key={i} className="playlist-card skeleton"></div>)}
        </div>
      ) : playlists.length === 0 ? (
        <div className="empty-state">
          <FiMusic size={48} />
          <p>No playlists found. Start by creating one!</p>
        </div>
      ) : (
        <div className="playlists-grid">
          {playlists.map(playlist => (
            <Link to={`/playlists/${playlist._id}`} key={playlist._id} className="playlist-card">
              <div className="playlist-cover">
                <FiMusic />
              </div>
              <div className="playlist-info">
                <h3>{playlist.name}</h3>
                <p className="playlist-description">{playlist.description}</p>
                <div className="playlist-meta">
                  <span className="songs-count">{playlist.songs?.length || 0} songs</span>
                  <span className="privacy-badge">
                    {playlist.isPublic ? <FiGlobe title="Public" /> : <FiLock title="Private" />}
                  </span>
                  {playlist.collaborators?.length > 0 && (
                    <span className="collab-badge">
                      <FiUsers title="Collaborative" /> {playlist.collaborators.length}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlists;
