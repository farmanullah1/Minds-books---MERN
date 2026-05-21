/**
 * CreatePostHub.tsx
 * Unified Create modal launched from the Navbar "+" button.
 * Provides a tab switcher: Post | Reel | Story
 * Each tab mounts the appropriate full creator flow.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFileText, FiFilm, FiClock } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPost } from '../../store/slices/postsSlice';
import { uploadFile } from '../../services/api';
import api from '../../services/api';
import { getInitials } from '../../utils/helpers';
import CreateReel from '../CreateReel/CreateReel';
import './CreatePostHub.css';

type HubTab = 'post' | 'reel' | 'story';

interface CreatePostHubProps {
  onClose: () => void;
  defaultTab?: HubTab;
}

const CreatePostHub: React.FC<CreatePostHubProps> = ({ onClose, defaultTab = 'post' }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<HubTab>(defaultTab);

  // Story composer states
  const [storyText, setStoryText] = useState('');
  const [storyFile, setStoryFile] = useState<File | null>(null);
  const [storyPreview, setStoryPreview] = useState('');
  const [storyFileType, setStoryFileType] = useState<'image' | 'video' | ''>('');
  const [storyBg, setStoryBg] = useState('linear-gradient(135deg, #f7b928 0%, #f39c12 100%)');
  const [storyUploading, setStoryUploading] = useState(false);
  const storyFileRef = useRef<HTMLInputElement>(null);

  const STORY_GRADIENTS = [
    'linear-gradient(135deg, #f7b928 0%, #f39c12 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    '#0b0c10',
    '#1a1a2e',
  ];

  const handleStoryMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStoryFile(file);
    setStoryPreview(URL.createObjectURL(file));
    setStoryFileType(file.type.startsWith('video') ? 'video' : 'image');
  };

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText.trim() && !storyFile) return;
    setStoryUploading(true);
    try {
      let mediaUrl = '';
      let mediaType: 'image' | 'video' | 'text' = 'text';
      if (storyFile) {
        const res = await uploadFile(storyFile);
        mediaUrl = res.url;
        mediaType = storyFileType as 'image' | 'video';
      }
      const storyPayload: { caption?: string; image?: string; video?: string } = {
        caption: storyText.trim() || undefined,
      };
      if (mediaType === 'video' && mediaUrl) {
        storyPayload.video = mediaUrl;
      } else if (mediaUrl) {
        storyPayload.image = mediaUrl;
      }
      if (storyPayload.image || storyPayload.video) {
        await api.post('/stories', storyPayload);
      }
      onClose();
    } catch (err) {
      console.error('Story upload failed:', err);
    } finally {
      setStoryUploading(false);
    }
  };

  const tabs: { id: HubTab; label: string; icon: React.ReactNode }[] = [
    { id: 'post', label: 'Post', icon: <FiFileText size={16} /> },
    { id: 'reel', label: 'Reel', icon: <FiFilm size={16} /> },
    { id: 'story', label: 'Story', icon: <FiClock size={16} /> },
  ];

  // Reel tab uses its own full-screen modal — render it standalone
  if (activeTab === 'reel') {
    return (
      <div className="hub-overlay">
        {/* Tab switcher still visible above the reel modal */}
        <div className="hub-tab-bar-floating">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`hub-tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
          <button className="hub-close-btn" onClick={onClose}><FiX size={18} /></button>
        </div>
        <CreateReel isOpen={true} onClose={onClose} onSuccess={onClose} />
      </div>
    );
  }

  return (
    <div className="hub-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        className="hub-modal card"
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
      >
        {/* Header */}
        <div className="hub-header">
          <div className="hub-tabs">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`hub-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
          <button className="hub-close-btn" onClick={onClose}><FiX size={20} /></button>
        </div>

        <div className="hub-body">
          <AnimatePresence mode="wait">
            {/* POST TAB — inline composer redirect to CreatePost */}
            {activeTab === 'post' && (
              <motion.div
                key="post"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hub-post-redirect"
              >
                <PostComposerInline user={user} onSuccess={onClose} />
              </motion.div>
            )}

            {/* STORY TAB */}
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="hub-story-composer"
              >
                <form onSubmit={handleStorySubmit}>
                  {/* Story Preview Canvas */}
                  <div
                    className="story-canvas"
                    style={{ background: storyFile ? 'var(--bg-input)' : storyBg }}
                  >
                    {storyPreview ? (
                      storyFileType === 'video' ? (
                        <video src={storyPreview} className="story-media-preview" muted autoPlay loop playsInline />
                      ) : (
                        <img src={storyPreview} className="story-media-preview" alt="Story preview" />
                      )
                    ) : (
                      <textarea
                        className="story-text-input"
                        placeholder="Type something for your story..."
                        value={storyText}
                        onChange={(e) => setStoryText(e.target.value)}
                        maxLength={300}
                        rows={4}
                      />
                    )}
                  </div>

                  {/* Gradient selector (only for text stories) */}
                  {!storyFile && (
                    <div className="story-bg-strip">
                      <span className="strip-title">Background:</span>
                      <div className="story-bg-options">
                        {STORY_GRADIENTS.map((g, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`story-bg-chip ${storyBg === g ? 'active' : ''}`}
                            style={{ background: g }}
                            onClick={() => setStoryBg(g)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Caption overlay text when media is selected */}
                  {storyFile && (
                    <div className="story-caption-row">
                      <input
                        type="text"
                        placeholder="Add a caption (optional)..."
                        value={storyText}
                        onChange={(e) => setStoryText(e.target.value)}
                        className="story-caption-input"
                        maxLength={150}
                      />
                    </div>
                  )}

                  <div className="story-actions-row">
                    <input
                      type="file"
                      ref={storyFileRef}
                      accept="image/*,video/*"
                      onChange={handleStoryMedia}
                      style={{ display: 'none' }}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => storyFileRef.current?.click()}>
                      📷 Add Media
                    </button>
                    {storyFile && (
                      <button type="button" className="btn btn-secondary" onClick={() => {
                        setStoryFile(null); setStoryPreview(''); setStoryFileType('');
                      }}>Remove</button>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={storyUploading || (!storyText.trim() && !storyFile)}
                    >
                      {storyUploading ? 'Sharing...' : '✨ Share Story'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Inline Post Composer (minimal, fast, delegates to CreatePost modal) ─── */
interface PostComposerInlineProps {
  user: any;
  onSuccess: () => void;
}

const PostComposerInline: React.FC<PostComposerInlineProps> = ({ user, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | ''>('');
  const [privacy, setPrivacy] = useState<'public' | 'friends'>('friends');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setMediaType(f.type.startsWith('video') ? 'video' : 'image');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    setLoading(true);
    try {
      let uploadedUrl = '';
      let type = '';
      if (file) {
        const res = await uploadFile(file);
        uploadedUrl = res.url;
        type = res.type;
      }
      const postData: any = {
        content: text.trim(),
        privacy: { type: privacy },
      };
      if (type === 'video') postData.video = uploadedUrl;
      else if (type === 'image') postData.image = uploadedUrl;

      await dispatch(createPost(postData)).unwrap();
      onSuccess();
    } catch (err) {
      console.error('Post creation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="inline-post-form" onSubmit={handleSubmit}>
      <div className="inline-post-author">
        {user?.profilePicture ? (
          <img src={user.profilePicture} alt={user.name} className="inline-avatar" />
        ) : (
          <div className="inline-avatar">{user ? getInitials(user.name) : '?'}</div>
        )}
        <div>
          <strong>{user?.name}</strong>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value as 'public' | 'friends')}
            className="inline-privacy-select"
          >
            <option value="public">🌍 Public</option>
            <option value="friends">👥 Friends</option>
          </select>
        </div>
      </div>

      <textarea
        className="inline-post-textarea"
        placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'User'}?`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        maxLength={5000}
        autoFocus
      />

      {preview && (
        <div className="inline-media-preview">
          {mediaType === 'video' ? (
            <video src={preview} controls style={{ width: '100%', borderRadius: '8px', maxHeight: '240px' }} />
          ) : (
            <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: '8px', maxHeight: '240px', objectFit: 'cover' }} />
          )}
          <button type="button" className="remove-media-btn" onClick={() => { setFile(null); setPreview(''); setMediaType(''); }}>✕</button>
        </div>
      )}

      <div className="inline-post-footer">
        <div className="inline-post-tools">
          <input type="file" ref={fileRef} accept="image/*,video/*" onChange={handleFile} style={{ display: 'none' }} />
          <button type="button" className="tool-btn" onClick={() => fileRef.current?.click()} title="Photo/Video">
            🖼️ Photo/Video
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || (!text.trim() && !file)}
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </div>
    </form>
  );
};

export default CreatePostHub;
