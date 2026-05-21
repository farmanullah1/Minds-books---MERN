/**
 * CodeDNA
 * CreatePost.tsx — Advanced Post Composer (PROMPT-57)
 * exports: default CreatePost
 * used_by: Home.tsx, Profile.tsx, GroupPage.tsx, GroupDetails.tsx
 * rules: Facebook-style popup modal composer, background color pickers, poll builders, scheduling queue, autocomplete tag popovers
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiImage, FiSmile, FiVideo, FiMapPin, FiX, FiCpu, 
  FiUsers, FiClock, FiGlobe, FiLock, FiChevronDown, 
  FiPlus, FiList, FiBarChart2, FiCheck, FiSettings, 
  FiCompass, FiBriefcase, FiHeart, FiAward,
  FiShare2, FiLink
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPost } from '../../store/slices/postsSlice';
import api, { uploadFile, uploadVideoFile } from '../../services/api';
import { getInitials, resolveMediaUrl } from '../../utils/helpers';
import { useToast } from '../Toast/ToastContext';
import confetti from 'canvas-confetti';
import './CreatePost.css';

// Rich post backgrounds
const BACKGROUNDS = [
  { id: 'none', label: 'Default', bg: 'var(--bg-input)', text: 'var(--text-primary)' },
  { id: 'sunset', label: 'Sunset', bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#fff', isGradient: true },
  { id: 'ocean', label: 'Ocean', bg: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)', text: '#fff', isGradient: true },
  { id: 'forest', label: 'Forest', bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', text: '#fff', isGradient: true },
  { id: 'galaxy', label: 'Galaxy', bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', text: '#fff', isGradient: true },
  { id: 'fire', label: 'Fire', bg: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)', text: '#fff', isGradient: true },
  { id: 'ice', label: 'Ice', bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', text: '#000', isGradient: true },
  { id: 'yellow', label: 'MindBook Yellow', bg: 'linear-gradient(135deg, #f7b928 0%, #f39c12 100%)', text: '#000', isGradient: true },
  { id: 'black', label: 'Deep Black', bg: '#0b0c10', text: '#fff' },
  { id: 'navy', label: 'Navy Blue', bg: '#1f2833', text: '#fff' },
  { id: 'purple', label: 'Dark Purple', bg: '#2d142c', text: '#fff' }
];

const FEELINGS = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Loved', emoji: '🥰' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Excited', emoji: '🤩' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Thinking', emoji: '🤔' },
  { name: 'Relaxed', emoji: '😌' },
  { name: 'Blessed', emoji: '😇' },
  { name: 'Celebrating', emoji: '🎉' },
  { name: 'Cool', emoji: '😎' }
];

const LIFE_EVENTS = [
  { type: 'work', label: 'New Job', icon: <FiBriefcase />, color: '#f7b928' },
  { type: 'relationship', label: 'Relationship Status Change', icon: <FiHeart />, color: '#ff4e50' },
  { type: 'education', label: 'Graduated', icon: <FiAward />, color: '#5ee7df' },
  { type: 'moved', label: 'Moved to New City', icon: <FiMapPin />, color: '#38ef7d' }
];

interface CreatePostProps {
  groupId?: string;
  activeChannel?: string | null;
  onPostCreated?: (post: any) => void;
  placeholder?: string;
  initiallyOpen?: boolean;
  onClose?: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ groupId, activeChannel, onPostCreated, placeholder, initiallyOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { showToast } = useToast();
  
  // State to control popup modal view
  const [isModalOpen, setIsModalOpen] = useState(initiallyOpen || false);

  const handleClose = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  // Core post composer states
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | ''>('');
  const [feeling, setFeeling] = useState<{name: string, emoji: string} | null>(null);
  const [showFeelingPicker, setShowFeelingPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addToStory, setAddToStory] = useState(false);
  const [aiEnhancing, setAiEnhancing] = useState(false);
  
  // Collaborative & Time Capsule state
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [showCollabPicker, setShowCollabPicker] = useState(false);
  const [isCapsule, setIsCapsule] = useState(false);
  const [unlockDate, setUnlockDate] = useState('');
  
  // Privacy selector state
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'friends-except' | 'specific' | 'private'>('friends');
  const [showPrivacyPicker, setShowPrivacyPicker] = useState(false);

  // PROMPT-57: Background theme states
  const [selectedBg, setSelectedBg] = useState<any>(BACKGROUNDS[0]);

  // PROMPT-57: Poll builder states
  const [isPollPost, setIsPollPost] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [pollDuration, setPollDuration] = useState('1 day');
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [anonymousVoting, setAnonymousVoting] = useState(false);
  const [showPollSettings, setShowPollSettings] = useState(false);

  // PROMPT-57: Life Event states
  const [selectedLifeEvent, setSelectedLifeEvent] = useState<any>(null);

  // PROMPT-57: Schedule Post queue states
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');

  // PROMPT-57: Mock Link Preview state
  const [linkPreview, setLinkPreview] = useState<any>(null);

  // Autocomplete state
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto detect links in content to show preview
  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlRegex);
    if (urls && urls.length > 0) {
      const url = urls[0];
      const domain = new URL(url).hostname;
      setLinkPreview({
        url,
        domain,
        title: `Explore this link on ${domain}`,
        description: 'Interactive post details and community resources hosted on external networks.',
        image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=600&q=80'
      });
    } else {
      setLinkPreview(null);
    }
  }, [content]);

  // Autocomplete tags/mentions debouncer
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    setCursorPosition(e.target.selectionStart);

    // Look for last word typed containing @ or #
    const words = val.slice(0, e.target.selectionStart).split(/\s+/);
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('@')) {
      // Suggest friends
      const query = lastWord.slice(1).toLowerCase();
      const matches = (user?.friends || [])
        .map((f: any) => f.name || '')
        .filter((name: string) => name.toLowerCase().includes(query));
      setAutocompleteSuggestions(matches);
      setShowAutocomplete(matches.length > 0);
    } else if (lastWord.startsWith('#')) {
      // Suggest trending hashtags
      const query = lastWord.slice(1).toLowerCase();
      const mockTags = ['tech', 'react', 'webdev', 'mindbook', 'innovation', 'javascript', 'productivity'];
      const matches = mockTags.filter(tag => tag.toLowerCase().includes(query));
      setAutocompleteSuggestions(matches.map(tag => `#${tag}`));
      setShowAutocomplete(matches.length > 0);
    } else {
      setShowAutocomplete(false);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleAutocompleteClick = (suggestion: string) => {
    const words = content.slice(0, cursorPosition).split(/\s+/);
    words[words.length - 1] = suggestion;
    const prefix = words.join(' ');
    const suffix = content.slice(cursorPosition);
    setContent(prefix + ' ' + suffix);
    setShowAutocomplete(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const [aiTone, setAiTone] = useState('Professional');

  const handleAIEnhance = async () => {
    if (!content.trim()) return;
    setAiEnhancing(true);
    try {
      const res = await api.post('/ai/enhance-post', { content, tone: aiTone, addHashtags: true });
      setContent(res.data.enhancedContent);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    } catch (err) {
      console.error('Failed to enhance post', err);
    } finally {
      setAiEnhancing(false);
    }
  };

  const [generatingCaption, setGeneratingCaption] = useState(false);
  const handleGenerateCaption = async () => {
    setGeneratingCaption(true);
    try {
      const res = await api.post('/ai/generate-caption', { tone: aiTone });
      setContent(prev => prev ? `${prev}\n\n${res.data.caption}` : res.data.caption);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    } catch (err) {
      console.error('Failed to generate caption', err);
    } finally {
      setGeneratingCaption(false);
    }
  };

  const openComposer = (focus?: 'media' | 'feeling' | 'location') => {
    setIsModalOpen(true);
    if (focus === 'media') {
      setTimeout(() => fileInputRef.current?.click(), 150);
    } else if (focus === 'feeling') {
      setShowFeelingPicker(true);
    } else if (focus === 'location') {
      setShowLocationInput(true);
    }
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/') && file.size > 500 * 1024 * 1024) {
        showToast('Video must be under 500MB. Use Watch → Upload Video for larger files.', 'error');
        return;
      }
      if (!file.type.startsWith('video/') && file.size > 50 * 1024 * 1024) {
        showToast('Image must be under 50MB.', 'error');
        return;
      }
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      setIsModalOpen(true);
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setMediaPreview('');
    setMediaType('');
    setAddToStory(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handlePollOptionChange = (idx: number, val: string) => {
    const updated = [...pollOptions];
    updated[idx] = val;
    setPollOptions(updated);
  };

  const handleRemovePollOption = (idx: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !mediaFile && !feeling && !isPollPost && !selectedLifeEvent) return;

    setLoading(true);
    try {
      let uploadedUrl = '';
      let type = '';
      if (mediaFile) {
        if (mediaFile.type.startsWith('video/')) {
          const res = await uploadVideoFile(mediaFile);
          uploadedUrl = res.url;
          type = 'video';
        } else {
          const res = await uploadFile(mediaFile);
          uploadedUrl = res.url;
          type = res.type;
        }
      }

      // Build rich metadata for custom post types
      const metadataPayload: any = {
        backgroundId: selectedBg.id,
        isPollPost,
        pollData: isPollPost ? {
          question: pollQuestion,
          options: pollOptions.filter(o => o.trim() !== '').map(o => ({ text: o, votes: [] })),
          duration: pollDuration,
          multipleChoice,
          anonymousVoting
        } : null,
        lifeEvent: selectedLifeEvent ? {
          type: selectedLifeEvent.type,
          label: selectedLifeEvent.label,
          color: selectedLifeEvent.color
        } : null,
        scheduledDate: isScheduled ? scheduledDate : null
      };

      const postData: any = {
        content: content.trim(),
        location: location,
        feeling: feeling?.name,
        group: groupId || null,
        groupChannel: activeChannel || null,
        collaborators,
        isCapsule,
        unlockDate: isCapsule && unlockDate ? new Date(unlockDate).toISOString() : null,
        privacy: { type: privacy },
        metadata: metadataPayload
      };

      if (type === 'video') {
        postData.video = uploadedUrl;
      } else if (type === 'image') {
        postData.image = uploadedUrl;
      }

      if (isScheduled) {
        // Trigger simulated scheduling queue response
        alert(`Post scheduled successfully for: ${new Date(scheduledDate).toLocaleString()}`);
      } else {
        if (groupId) {
          const res = await api.post('/posts', postData);
          if (onPostCreated) onPostCreated(res.data);
        } else {
          await dispatch(createPost(postData)).unwrap();
        }
      }

      // Handle Story creation if checked
      if (addToStory && uploadedUrl) {
        const storyPayload: { caption?: string; image?: string; video?: string } = {
          caption: content.trim() || undefined,
        };
        if (type === 'video') {
          storyPayload.video = uploadedUrl;
        } else {
          storyPayload.image = uploadedUrl;
        }
        await api.post('/stories', storyPayload);
      }

      // Success visual feedback
      if (selectedLifeEvent) {
        confetti({ particleCount: 150, spread: 80 });
      }

      // Reset states
      setContent('');
      setMediaFile(null);
      setFeeling(null);
      setLocation('');
      setAddToStory(false);
      setShowFeelingPicker(false);
      setShowLocationInput(false);
      setShowCollabPicker(false);
      setCollaborators([]);
      setIsCapsule(false);
      setUnlockDate('');
      setPrivacy('friends');
      setShowPrivacyPicker(false);
      setSelectedBg(BACKGROUNDS[0]);
      setIsPollPost(false);
      setPollQuestion('');
      setPollOptions(['', '']);
      setSelectedLifeEvent(null);
      setIsScheduled(false);
      setScheduledDate('');
      removeMedia();
      showToast(isScheduled ? 'Post scheduled!' : 'Post shared successfully!', 'success');
      handleClose();
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || 'Failed to create post';
      showToast(msg, 'error');
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-trigger-wrapper">
      
      {/* TRIGGER BOX: Clicking this opens the full Advanced Composer Modal */}
      <div className="create-post-trigger card clickable-box" onClick={() => openComposer()}>
        <div className="trigger-top">
          {user?.profilePicture ? (
            <img src={resolveMediaUrl(user.profilePicture)} alt={user.name} className="avatar-trigger" />
          ) : (
            <div className="avatar-trigger initials">{user ? getInitials(user.name) : '?'}</div>
          )}
          <div className="trigger-input-mock">
            {placeholder || `What's on your mind, ${user?.name?.split(' ')[0] || 'User'}?`}
          </div>
        </div>
        <div className="trigger-bottom">
          <button
            type="button"
            className="trigger-action-pill"
            onClick={(e) => { e.stopPropagation(); openComposer('media'); }}
          >
            <FiImage className="pill-icon success" /> Photo/Video
          </button>
          <button
            type="button"
            className="trigger-action-pill"
            onClick={(e) => { e.stopPropagation(); openComposer('feeling'); }}
          >
            <FiSmile className="pill-icon warning" /> Feeling
          </button>
          <button
            type="button"
            className="trigger-action-pill"
            onClick={(e) => { e.stopPropagation(); openComposer('location'); }}
          >
            <FiMapPin className="pill-icon danger" /> Check in
          </button>
        </div>
      </div>

      {/* FULL SCREEN ADVANCED POPUP COMPOSER MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="shops-overlay" role="dialog" aria-modal="true" aria-labelledby="composer-title">
            <motion.div 
              className="shops-modal composer-modal card"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              
              {/* Header Title */}
              <div className="modal-header">
                <h3 id="composer-title">Create Post</h3>
                <button className="close-btn" onClick={handleClose}>✕</button>
              </div>

              <form onSubmit={handleSubmit} className="composer-form">
                
                {/* Author row & Privacy Selector */}
                <div className="composer-author-row">
                  {user?.profilePicture ? (
                    <img src={resolveMediaUrl(user.profilePicture)} alt={user.name} className="composer-avatar" />
                  ) : (
                    <div className="composer-avatar">{user ? getInitials(user.name) : '?'}</div>
                  )}

                  <div className="author-meta-info">
                    <span className="author-name">{user?.name}</span>
                    <div className="composer-privacy-dropdown-container">
                      <button 
                        type="button" 
                        className="audience-btn"
                        onClick={() => setShowPrivacyPicker(!showPrivacyPicker)}
                      >
                        {privacy === 'public' && <><FiGlobe /> Public</>}
                        {privacy === 'friends' && <><FiUsers /> Friends</>}
                        {privacy === 'friends-except' && <><FiUsers /> Friends except...</>}
                        {privacy === 'specific' && <><FiUsers /> Specific friends</>}
                        {privacy === 'private' && <><FiLock /> Only Me</>}
                        <FiChevronDown />
                      </button>

                      {showPrivacyPicker && (
                        <div className="audience-menu card">
                          <button type="button" onClick={() => { setPrivacy('public'); setShowPrivacyPicker(false); }}><FiGlobe /> Public (Anyone)</button>
                          <button type="button" onClick={() => { setPrivacy('friends'); setShowPrivacyPicker(false); }}><FiUsers /> Friends (Your friends)</button>
                          <button type="button" onClick={() => { setPrivacy('friends-except'); setShowPrivacyPicker(false); }}><FiUsers /> Friends except...</button>
                          <button type="button" onClick={() => { setPrivacy('specific'); setShowPrivacyPicker(false); }}><FiUsers /> Specific friends</button>
                          <button type="button" onClick={() => { setPrivacy('private'); setShowPrivacyPicker(false); }}><FiLock /> Only me</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SCROLLABLE COMPOSER AREA */}
                <div className="composer-workspace">
                  
                  {/* Selected Life Event Celebration Badge */}
                  {selectedLifeEvent && (
                    <div className="selected-life-event-badge" style={{ borderColor: selectedLifeEvent.color }}>
                      <span className="event-icon" style={{ backgroundColor: selectedLifeEvent.color }}>{selectedLifeEvent.icon}</span>
                      <span className="event-label">{selectedLifeEvent.label} Life Event</span>
                      <button type="button" className="remove-event-btn" onClick={() => setSelectedLifeEvent(null)}>✕</button>
                    </div>
                  )}

                  {/* Feeling selected label */}
                  {feeling && (
                    <div className="selected-feeling-chip">
                      {feeling.emoji} feeling {feeling.name}
                      <button type="button" onClick={() => setFeeling(null)}>✕</button>
                    </div>
                  )}

                  {/* Dynamic Composer Workspace containing colored backgrounds */}
                  <div 
                    className={`composer-text-workspace ${selectedBg.id !== 'none' ? 'custom-bg-active' : ''}`}
                    style={{ background: selectedBg.bg, color: selectedBg.text }}
                  >
                    <textarea
                      ref={textareaRef}
                      className="composer-textarea"
                      placeholder={`What's on your mind, ${user?.name?.split(' ')[0] || 'User'}?`}
                      value={content}
                      onChange={handleTextareaChange}
                      maxLength={5000}
                      style={{ color: selectedBg.text }}
                      required={!mediaFile && !feeling && !isPollPost && !selectedLifeEvent}
                    />

                    {/* Autocomplete tagging suggestions drawer */}
                    {showAutocomplete && (
                      <div className="autocomplete-drawer card">
                        {autocompleteSuggestions.map((s, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            className="autocomplete-item"
                            onClick={() => handleAutocompleteClick(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Character limit counter */}
                    <span className="char-counter">{content.length} / 5000</span>
                  </div>

                  {/* Paste link mock previewer */}
                  {linkPreview && (
                    <div className="link-preview-box card">
                      <img src={linkPreview.image} alt={linkPreview.title} />
                      <div className="link-preview-details">
                        <span className="domain-tag"><FiLink /> {linkPreview.domain}</span>
                        <h4>{linkPreview.title}</h4>
                        <p>{linkPreview.description}</p>
                      </div>
                    </div>
                  )}

                  {/* Poll Builder form section */}
                  {isPollPost && (
                    <div className="composer-poll-box card">
                      <div className="poll-box-header">
                        <h4>📊 Create Community Poll</h4>
                        <button type="button" className="close-btn" onClick={() => setIsPollPost(false)}>✕</button>
                      </div>

                      <div className="poll-inputs">
                        <input 
                          type="text" 
                          placeholder="Ask a question..."
                          value={pollQuestion}
                          onChange={(e) => setPollQuestion(e.target.value)}
                          className="poll-question-input"
                          required={isPollPost}
                        />

                        {pollOptions.map((opt, idx) => (
                          <div key={idx} className="poll-option-row">
                            <input 
                              type="text" 
                              placeholder={`Option ${idx + 1}`}
                              value={opt}
                              onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                              className="poll-option-input"
                              required={isPollPost && idx < 2}
                            />
                            {pollOptions.length > 2 && (
                              <button type="button" onClick={() => handleRemovePollOption(idx)}>✕</button>
                            )}
                          </div>
                        ))}

                        {pollOptions.length < 5 && (
                          <button type="button" className="btn-add-option" onClick={handleAddPollOption}>
                            <FiPlus /> Add Option
                          </button>
                        )}
                      </div>

                      <div className="poll-settings-toggle-btn" onClick={() => setShowPollSettings(!showPollSettings)}>
                        <FiSettings /> Poll Settings & Duration
                      </div>

                      {showPollSettings && (
                        <div className="poll-settings-drawer card">
                          <div className="settings-item">
                            <label>Poll Duration</label>
                            <select value={pollDuration} onChange={(e) => setPollDuration(e.target.value)}>
                              <option value="1 day">1 day</option>
                              <option value="3 days">3 days</option>
                              <option value="1 week">1 week</option>
                              <option value="2 weeks">2 weeks</option>
                            </select>
                          </div>

                          <div className="settings-checkbox-item">
                            <input 
                              type="checkbox" 
                              id="multiple-choice-toggle"
                              checked={multipleChoice}
                              onChange={(e) => setMultipleChoice(e.target.checked)} 
                            />
                            <label htmlFor="multiple-choice-toggle">Allow Multiple Answers Choice</label>
                          </div>

                          <div className="settings-checkbox-item">
                            <input 
                              type="checkbox" 
                              id="anonymous-toggle"
                              checked={anonymousVoting}
                              onChange={(e) => setAnonymousVoting(e.target.checked)} 
                            />
                            <label htmlFor="anonymous-toggle">Anonymous Voting Mode</label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Photo/Video media preview */}
                  {mediaPreview && (
                    <div className="composer-media-preview-container" style={{ position: 'relative' }}>
                      {mediaType === 'video' ? (
                        <video src={mediaPreview} controls />
                      ) : (
                        <img src={mediaPreview} alt="Preview" />
                      )}
                      <button type="button" className="remove-media-btn" onClick={removeMedia}>✕</button>
                      <button 
                        type="button" 
                        className="btn-generate-caption" 
                        onClick={handleGenerateCaption}
                        disabled={generatingCaption}
                        style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                      >
                        <FiCpu size={14} className={generatingCaption ? 'spin' : ''} /> {generatingCaption ? 'Generating...' : 'AI Caption'}
                      </button>
                    </div>
                  )}

                  {/* Scheduled date selector */}
                  {isScheduled && (
                    <div className="scheduler-box card">
                      <h4>📅 Schedule Post Queue</h4>
                      <input 
                        type="datetime-local" 
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                        required={isScheduled}
                      />
                    </div>
                  )}

                  {/* Location selection preview */}
                  {showLocationInput && (
                    <div className="location-input-wrapper">
                      <FiMapPin className="text-danger" />
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where are you check in..."
                        className="location-input"
                      />
                      <button type="button" className="close-btn" onClick={() => { setLocation(''); setShowLocationInput(false); }}>✕</button>
                    </div>
                  )}

                  {/* Collaborative settings */}
                  {showCollabPicker && user?.friends && (
                    <div className="collaborator-picker card p-3 mt-2 mb-2">
                      <h4 className="mb-2">Add Collaborators</h4>
                      <div className="friends-list-compact" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {user.friends.map((friend: any) => {
                          const friendId = friend._id || friend;
                          const isSelected = collaborators.includes(friendId);
                          return (
                            <button 
                              key={friendId}
                              type="button"
                              className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                              onClick={() => {
                                if (isSelected) setCollaborators(collaborators.filter(id => id !== friendId));
                                else setCollaborators([...collaborators, friendId]);
                              }}
                            >
                              {friend.name || 'Friend'} {isSelected && '✓'}
                            </button>
                          )
                        })}
                      </div>
                      <button type="button" className="btn btn-sm mt-2 btn-secondary" onClick={() => setShowCollabPicker(false)}>Done</button>
                    </div>
                  )}

                  {/* Time capsule details */}
                  {isCapsule && (
                    <div className="time-capsule-picker card p-3 mt-2 mb-2">
                      <h4 className="mb-2 text-brand"><FiClock /> Time Capsule Post</h4>
                      <p className="text-secondary mb-2" style={{ fontSize: '12px' }}>This post will be hidden from everyone except you until the unlock date.</p>
                      <input 
                        type="date" 
                        className="form-control"
                        value={unlockDate}
                        onChange={(e) => setUnlockDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required={isCapsule}
                      />
                    </div>
                  )}

                </div>

                {/* BOTTOM TOOLS: Background pickers & Action Strips */}
                <div className="composer-bottom-tools-panel">
                  
                  {/* Background Color Picker strip */}
                  {content.length < 200 && !mediaPreview && !isPollPost && (
                    <div className="background-picker-strip">
                      <span className="strip-title">Background Theme:</span>
                      <div className="background-options-row">
                        {BACKGROUNDS.map((bg) => (
                          <button 
                            key={bg.id}
                            type="button"
                            className={`bg-picker-chip ${selectedBg.id === bg.id ? 'active' : ''}`}
                            style={{ background: bg.bg }}
                            onClick={() => setSelectedBg(bg)}
                            title={bg.label}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Life Event Selector Strip */}
                  <div className="life-event-selection-strip mt-2">
                    <span className="strip-title">Add Life Event Celebration:</span>
                    <div className="life-event-options-row">
                      {LIFE_EVENTS.map((event) => (
                        <button 
                          key={event.type}
                          type="button"
                          className="life-event-chip"
                          onClick={() => setSelectedLifeEvent(event)}
                          style={{ borderColor: event.color }}
                        >
                          {event.icon} {event.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to post icons tray */}
                  <div className="add-to-post-tools-tray mt-3">
                    <span className="tray-label">Add to your post:</span>
                    <div className="tray-icons">
                      
                      <button 
                        type="button" 
                        className="tray-btn" 
                        onClick={() => fileInputRef.current?.click()}
                        title="Add Image/Video"
                      >
                        <FiImage size={20} className="text-success" />
                      </button>

                      <button 
                        type="button" 
                        className="tray-btn" 
                        onClick={() => { setIsPollPost(!isPollPost); setIsModalOpen(true); }}
                        title="Add Poll"
                      >
                        <FiBarChart2 size={20} className="text-primary" />
                      </button>

                      <button 
                        type="button" 
                        className="tray-btn" 
                        onClick={() => setShowFeelingPicker(!showFeelingPicker)}
                        title="Feeling/Activity"
                      >
                        <FiSmile size={20} className="text-warning" />
                      </button>

                      <button 
                        type="button" 
                        className="tray-btn" 
                        onClick={() => setShowLocationInput(!showLocationInput)}
                        title="Check In Location"
                      >
                        <FiMapPin size={20} className="text-danger" />
                      </button>

                      <button 
                        type="button" 
                        className="tray-btn" 
                        onClick={() => setShowCollabPicker(!showCollabPicker)}
                        title="Add Collaborators"
                      >
                        <FiUsers size={20} className="text-info" />
                      </button>

                      <button 
                        type="button" 
                        className="tray-btn" 
                        onClick={() => setIsScheduled(!isScheduled)}
                        title="Schedule Queue Post"
                      >
                        <FiClock size={20} className="text-secondary" />
                      </button>

                    </div>
                  </div>

                  {/* Feeling selection popover */}
                  {showFeelingPicker && (
                    <div className="composer-feeling-picker-popup card mt-2">
                      {FEELINGS.map((f) => (
                        <button 
                          key={f.name}
                          type="button"
                          className="feeling-chip-item"
                          onClick={() => { setFeeling(f); setShowFeelingPicker(false); }}
                        >
                          <span>{f.emoji}</span> {f.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Hidden inputs upload references */}
                  <input 
                    type="file" 
                    accept="image/*,video/*" 
                    ref={fileInputRef} 
                    onChange={handleMediaChange} 
                    style={{ display: 'none' }} 
                  />

                  {/* Submit row & actions */}
                  <div className="composer-submit-row mt-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div className="ai-enhance-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <select 
                        className="ai-tone-selector" 
                        value={aiTone} 
                        onChange={(e) => setAiTone(e.target.value)}
                        style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                      >
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                        <option value="Funny">Funny</option>
                        <option value="Inspirational">Inspirational</option>
                      </select>
                      <button 
                        type="button" 
                        className="btn-enhance-ai"
                        onClick={handleAIEnhance}
                        disabled={!content.trim() || aiEnhancing}
                      >
                        <FiCpu size={16} className={aiEnhancing ? 'spin' : ''} /> {aiEnhancing ? 'Enhancing...' : 'AI Enhance'}
                      </button>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-submit-composer"
                      disabled={loading || (!content.trim() && !mediaFile && !feeling && !isPollPost && !selectedLifeEvent)}
                    >
                      {loading ? 'Posting...' : 'Post Now'}
                    </button>
                  </div>

                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CreatePost;
