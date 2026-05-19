import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FiMusic, FiSave, FiX } from 'react-icons/fi';
import './Playlists.css';

const CreatePlaylist: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/playlists', formData);
      navigate('/playlists');
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playlists-container">
      <div className="playlist-detail" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="header-left" style={{ marginBottom: '30px' }}>
          <FiMusic className="header-icon" />
          <h2>Create New Playlist</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Playlist Name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Description</label>
            <textarea 
              className="input-field" 
              placeholder="What's this playlist about?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
            />
            <label htmlFor="isPublic">Public Playlist (everyone can see)</label>
          </div>

          <div className="form-actions" style={{ display: 'flex', gap: '15px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <FiSave /> {loading ? 'Creating...' : 'Create Playlist'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/playlists')}>
              <FiX /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylist;
