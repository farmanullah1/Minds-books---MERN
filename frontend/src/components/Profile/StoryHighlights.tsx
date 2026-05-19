import React, { useEffect, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import api from '../../services/api';
import './StoryHighlights.css';

interface StoryHighlightsProps {
  userId: string;
  isOwnProfile: boolean;
}

const StoryHighlights: React.FC<StoryHighlightsProps> = ({ userId, isOwnProfile }) => {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeStories, setActiveStories] = useState<any[]>([]);
  const [selectedStories, setSelectedStories] = useState<string[]>([]);
  const [highlightTitle, setHighlightTitle] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchHighlights();
  }, [userId]);

  const fetchHighlights = async () => {
    try {
      const res = await api.get(`/highlights/user/${userId}`);
      setHighlights(res.data);
    } catch (err) {
      console.error('Failed to load highlights', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = async () => {
    setShowCreateModal(true);
    // Fetch active stories (we can use the feed endpoint and filter, or a new endpoint)
    // To keep it simple, let's fetch the feed and filter out the user's stories
    try {
      const res = await api.get('/stories');
      const userStories = res.data.find((group: any) => group.user._id === userId);
      setActiveStories(userStories ? userStories.stories : []);
    } catch (err) {
      console.error('Failed to fetch stories for highlights', err);
    }
  };

  const toggleStorySelection = (storyId: string) => {
    if (selectedStories.includes(storyId)) {
      setSelectedStories(selectedStories.filter(id => id !== storyId));
    } else {
      setSelectedStories([...selectedStories, storyId]);
    }
  };

  const handleCreateHighlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlightTitle.trim() || selectedStories.length === 0) return;

    setCreating(true);
    try {
      const res = await api.post('/highlights', {
        title: highlightTitle,
        storyIds: selectedStories
      });
      setHighlights([res.data, ...highlights]);
      setShowCreateModal(false);
      setHighlightTitle('');
      setSelectedStories([]);
    } catch (err) {
      console.error('Failed to create highlight', err);
      alert('Failed to create highlight. Ensure you selected valid stories.');
    } finally {
      setCreating(false);
    }
  };

  if (loading && highlights.length === 0) return null;

  return (
    <div className="story-highlights-container">
      <div className="highlights-track">
        {isOwnProfile && (
          <div className="highlight-item create-highlight" onClick={handleOpenCreateModal}>
            <div className="highlight-circle outline-circle">
              <FiPlus size={24} />
            </div>
            <span className="highlight-title">New</span>
          </div>
        )}
        
        {highlights.map((hl) => (
          <div className="highlight-item" key={hl._id}>
            <div className="highlight-circle">
              {hl.coverImage ? (
                <img src={hl.coverImage} alt={hl.title} />
              ) : (
                <div className="highlight-placeholder">{hl.title.charAt(0)}</div>
              )}
            </div>
            <span className="highlight-title">{hl.title}</span>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content card highlights-modal">
            <div className="modal-header">
              <h2>Create Highlight</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateHighlight} className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Highlight Title"
                value={highlightTitle}
                onChange={(e) => setHighlightTitle(e.target.value)}
                maxLength={20}
                required
              />
              
              <h4 className="mt-4 mb-2">Select Active Stories</h4>
              <div className="stories-selection-grid">
                {activeStories.length === 0 ? (
                  <p className="text-secondary">You have no active stories to highlight.</p>
                ) : (
                  activeStories.map((story) => (
                    <div 
                      key={story._id} 
                      className={`story-select-item ${selectedStories.includes(story._id) ? 'selected' : ''}`}
                      onClick={() => toggleStorySelection(story._id)}
                    >
                      {story.image || story.video ? (
                        story.image ? <img src={story.image} alt="Story" /> : <video src={story.video} />
                      ) : (
                        <div className="story-text-preview">{story.caption}</div>
                      )}
                      {selectedStories.includes(story._id) && (
                        <div className="selection-checkmark">✓</div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="modal-footer" style={{ marginTop: '20px' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-full"
                  disabled={creating || !highlightTitle.trim() || selectedStories.length === 0}
                >
                  {creating ? 'Creating...' : 'Create Highlight'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryHighlights;
