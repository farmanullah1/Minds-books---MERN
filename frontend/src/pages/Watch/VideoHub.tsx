/**
 * CodeDNA
 * VideoHub.tsx — Premium Unified Video Hub with mixed YouTube and MindBook video feeds (PROMPT-49)
 * exports: default VideoHub
 * used_by: App.tsx
 * rules: Yellow theme primary, mixed sources, custom layout sidebars, inline preview autoplays
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiTrendingUp, FiTv, FiClock, FiBookmark, 
  FiThumbsUp, FiList, FiUser, FiUploadCloud, FiBarChart2, 
  FiSearch, FiVolume2, FiVolumeX, FiPlus, FiMoreVertical, 
  FiCheckCircle, FiPlay, FiCheck, FiChevronRight, FiYoutube 
} from 'react-icons/fi';
import './VideoHub.css';
import { useAppSelector } from '../../store/hooks';
import SourceBadge from '../../components/VideoHub/SourceBadge';
import Navbar from '../../components/Navbar/Navbar';
import UploadVideoModal from './UploadVideoModal';
import api from '../../services/api';
import { resolveMediaUrl } from '../../utils/helpers';
import { VideoHubItem, YOUTUBE_CURATED, postToVideoHubItem } from './videoHubUtils';

const VideoHub: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  // States
  const [activeSidebar, setActiveSidebar] = useState<'home' | 'trending' | 'subs' | 'history' | 'saved' | 'liked'>('home');
  const [activeFilterChip, setActiveFilterChip] = useState<'All' | 'MindBook' | 'YouTube' | 'Live'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<VideoHubItem[]>([]);
  
  // Player state
  const [selectedVideo, setSelectedVideo] = useState<VideoHubItem | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  
  // Interactive state
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>([]);
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>([]);
  const [comments, setComments] = useState<{ [key: string]: { user: string; text: string; time: string }[] }>({});
  const [newCommentText, setNewCommentText] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const previewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadVideos = async () => {
    setLoadingVideos(true);
    try {
      const res = await api.get('/posts/videos?limit=50');
      const mindbookVideos = (res.data || []).map(postToVideoHubItem);
      setVideos([...mindbookVideos, ...YOUTUBE_CURATED]);
    } catch (err) {
      console.error('Failed to load videos', err);
      setVideos([...YOUTUBE_CURATED]);
    } finally {
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    loadVideos();
    setComments({
      yt_1: [
        { user: 'Sarah Jenkins', text: 'This Tailwind grid config is literally life saving!', time: '1 hour ago' },
      ],
    });
  }, []);

  const handleUploadSuccess = (newVideo: VideoHubItem) => {
    setVideos((prev) => [newVideo, ...prev.filter((v) => v.id !== newVideo.id)]);
    setSelectedVideo(newVideo);
    setActiveFilterChip('MindBook');
    setActiveSidebar('home');
  };

  // Hover play timer trigger
  const handleMouseEnter = (videoId: string) => {
    previewTimerRef.current = setTimeout(() => {
      setHoveredVideoId(videoId);
    }, 800); // 800ms hover delay as requested
  };

  const handleMouseLeave = () => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
    }
    setHoveredVideoId(null);
  };

  // Toggle Save / Watch Later
  const toggleSave = (videoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (savedVideoIds.includes(videoId)) {
      setSavedVideoIds(prev => prev.filter(id => id !== videoId));
    } else {
      setSavedVideoIds(prev => [...prev, videoId]);
    }
  };

  // Toggle Likes
  const toggleLike = (videoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (likedVideoIds.includes(videoId)) {
      setLikedVideoIds(prev => prev.filter(id => id !== videoId));
    } else {
      setLikedVideoIds(prev => [...prev, videoId]);
    }
  };

  // Comment submission
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText || !selectedVideo) return;

    const newComment = {
      user: user?.name || 'Viewer',
      text: newCommentText,
      time: 'Just now'
    };

    setComments(prev => ({
      ...prev,
      [selectedVideo.id]: [newComment, ...(prev[selectedVideo.id] || [])]
    }));
    setNewCommentText('');
  };

  // Filter video lists based on tabs & filters
  const getFilteredVideos = () => {
    return videos.filter(v => {
      // Sidebar filter
      if (activeSidebar === 'saved' && !savedVideoIds.includes(v.id)) return false;
      if (activeSidebar === 'liked' && !likedVideoIds.includes(v.id)) return false;

      // Chip filters
      if (activeFilterChip === 'MindBook' && v.source !== 'mindbook') return false;
      if (activeFilterChip === 'YouTube' && v.source !== 'youtube') return false;
      if (activeFilterChip === 'Live' && !v.isLive) return false;

      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return v.title.toLowerCase().includes(query) || v.creator.toLowerCase().includes(query);
      }

      return true;
    });
  };

  // Render Source Badge top-right
  const renderSourceBadge = (source: 'youtube' | 'mindbook') => {
    return <SourceBadge source={source} className="source-badge" />;
  };

  return (
    <div className="videohub-page-container">
      <Navbar />
      <div className="videohub-grid-layout">
        
        {/* Left Interactive Sidebar Hub (240px locked desktop) */}
        <div className="videohub-left-nav">
          <div className="nav-group-section">
            <button 
              className={`nav-item-btn ${activeSidebar === 'home' ? 'active' : ''}`}
              onClick={() => { setActiveSidebar('home'); setSelectedVideo(null); }}
            >
              <FiHome size={18} />
              <span>Home Feed</span>
            </button>
            <button 
              className={`nav-item-btn ${activeSidebar === 'trending' ? 'active' : ''}`}
              onClick={() => { setActiveSidebar('trending'); setSelectedVideo(null); }}
            >
              <FiTrendingUp size={18} />
              <span>Trending Now</span>
            </button>
            <button 
              className={`nav-item-btn ${activeSidebar === 'subs' ? 'active' : ''}`}
              onClick={() => { setActiveSidebar('subs'); setSelectedVideo(null); }}
            >
              <FiTv size={18} />
              <span>Subscriptions</span>
            </button>
          </div>

          <div className="nav-group-section border-top">
            <h4 className="section-subtitle">Personal library</h4>
            <button 
              className={`nav-item-btn ${activeSidebar === 'history' ? 'active' : ''}`}
              onClick={() => { setActiveSidebar('history'); setSelectedVideo(null); }}
            >
              <FiClock size={18} />
              <span>Watch History</span>
            </button>
            <button 
              className={`nav-item-btn ${activeSidebar === 'saved' ? 'active' : ''}`}
              onClick={() => { setActiveSidebar('saved'); setSelectedVideo(null); }}
            >
              <FiBookmark size={18} />
              <span>Watch Later ({savedVideoIds.length})</span>
            </button>
            <button 
              className={`nav-item-btn ${activeSidebar === 'liked' ? 'active' : ''}`}
              onClick={() => { setActiveSidebar('liked'); setSelectedVideo(null); }}
            >
              <FiThumbsUp size={18} />
              <span>Liked Videos ({likedVideoIds.length})</span>
            </button>
          </div>

          <div className="nav-group-section border-top">
            <h4 className="section-subtitle">Creator Studio</h4>
            <button className="nav-item-btn promo-studio" onClick={() => setShowUploadModal(true)}>
              <FiUploadCloud size={18} />
              <span>Upload Video</span>
            </button>
            <button className="nav-item-btn">
              <FiBarChart2 size={18} />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        {/* Right Main content view */}
        <div className="videohub-main-view">
          
          {/* Active Detail Player View */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                className="hub-detail-player-card"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="player-aspect-wrapper">
                  {selectedVideo.source === 'youtube' ? (
                    <iframe 
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=0`}
                      title={selectedVideo.title}
                      className="yt-iframe-player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video 
                      src={selectedVideo.videoUrl}
                      controls
                      autoPlay
                      className="native-mp4-player"
                    />
                  )}
                </div>

                <div className="player-info-details">
                  <div className="detail-title-row">
                    <h2>{selectedVideo.title}</h2>
                    {renderSourceBadge(selectedVideo.source)}
                  </div>

                  <div className="detail-meta-actions">
                    <div className="meta-left">
                      <span>{selectedVideo.views.toLocaleString()} views</span>
                      <span className="dot-divider">•</span>
                      <span>{selectedVideo.relativeTime}</span>
                    </div>

                    <div className="actions-right">
                      <button 
                        className={`action-pill-btn ${likedVideoIds.includes(selectedVideo.id) ? 'active' : ''}`}
                        onClick={() => toggleLike(selectedVideo.id)}
                      >
                        <FiThumbsUp size={16} />
                        <span>{likedVideoIds.includes(selectedVideo.id) ? 'Liked' : 'Like'}</span>
                      </button>

                      <button 
                        className={`action-pill-btn ${savedVideoIds.includes(selectedVideo.id) ? 'active' : ''}`}
                        onClick={() => toggleSave(selectedVideo.id)}
                      >
                        <FiBookmark size={16} />
                        <span>{savedVideoIds.includes(selectedVideo.id) ? 'Saved' : 'Watch Later'}</span>
                      </button>

                      {selectedVideo.source === 'youtube' && (
                        <a 
                          href={`https://youtube.com/watch?v=${selectedVideo.youtubeId}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="action-pill-btn watch-yt-external"
                        >
                          <FiYoutube size={16} />
                          <span>Watch on YouTube ↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="detail-creator-description">
                    <div className="creator-profile-row">
                      <img src={resolveMediaUrl(selectedVideo.creatorAvatar)} alt={selectedVideo.creator} className="detail-creator-avatar" />
                      <div>
                        <h4>{selectedVideo.creator} {selectedVideo.isVerified && <FiCheckCircle size={12} className="verified-yellow-check" />}</h4>
                        <p>128K subscribers</p>
                      </div>
                      <button className="hub-subscribe-action-btn">Subscribe</button>
                    </div>
                    
                    <p className="video-long-description">{selectedVideo.description}</p>
                  </div>

                  {/* Comments section on top */}
                  <div className="player-comments-area">
                    <h3>💬 Conversation Hub ({comments[selectedVideo.id]?.length || 0} comments)</h3>
                    
                    <form className="hub-comment-form" onSubmit={handleAddComment}>
                      <input 
                        type="text" 
                        placeholder="Add a public comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        required
                      />
                      <button type="submit" disabled={!newCommentText}>Comment</button>
                    </form>

                    <div className="hub-comments-list">
                      {(comments[selectedVideo.id] || []).map((c, i) => (
                        <div key={i} className="comment-bubble">
                          <div className="comment-header-row">
                            <span className="comment-username">{c.user}</span>
                            <span className="comment-time">{c.time}</span>
                          </div>
                          <p className="comment-text-body">{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Standard Hub Directory (Grid + Filter Trays) */}
          <div className="videohub-search-filters">
            <div className="hub-search-row">
              <div className="hub-search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search MindBook + YouTube videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="button" className="hub-upload-header-btn" onClick={() => setShowUploadModal(true)}>
                <FiUploadCloud size={18} />
                Upload Video
              </button>
            </div>

            <div className="filter-chips-tray">
              {['All', 'MindBook', 'YouTube', 'Live'].map((chip) => (
                <button 
                  key={chip}
                  className={`filter-chip ${activeFilterChip === chip ? 'active' : ''}`}
                  onClick={() => setActiveFilterChip(chip as any)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Section 1: Continue Watching (Mixed) */}
          {activeSidebar === 'home' && !searchQuery && (
            <div className="horizontal-videos-section">
              <h2 className="section-title">▶ Continue Watching</h2>
              <div className="horizontal-scroll-container">
                {videos.filter(v => v.watchProgress !== undefined).map((video) => (
                  <div 
                    key={video.id} 
                    className="video-horizontal-card"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="thumb-wrapper">
                      <img src={video.thumbnailUrl} alt={video.title} className="thumb-img" />
                      <span className="duration-pill">{video.duration}</span>
                      {video.watchProgress && (
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill" style={{ width: `${video.watchProgress}%` }} />
                        </div>
                      )}
                    </div>
                    <div className="card-info-summary">
                      <h4 className="card-title-short">{video.title}</h4>
                      <span className="creator-sublabel">{video.creator}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Horizontal Section 2: Trending now */}
          {activeSidebar === 'home' && !searchQuery && (
            <div className="horizontal-videos-section">
              <h2 className="section-title">🔥 Trending Now</h2>
              <div className="horizontal-scroll-container">
                {videos.map((video) => (
                  <div 
                    key={video.id} 
                    className="video-horizontal-card"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="thumb-wrapper">
                      <img src={video.thumbnailUrl} alt={video.title} className="thumb-img" />
                      {renderSourceBadge(video.source)}
                      <span className="duration-pill">{video.duration}</span>
                    </div>
                    <div className="card-info-summary">
                      <h4 className="card-title-short">{video.title}</h4>
                      <span className="creator-sublabel">{video.creator}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mixed Full Grid (Mixed Sources with Hover Previews) */}
          <div className="hub-full-grid-section">
            <h2 className="section-title">📺 All Recommendations</h2>
            {loadingVideos ? (
              <div className="hub-loading-state">
                <div className="spinner" />
                <p>Loading videos…</p>
              </div>
            ) : getFilteredVideos().length === 0 ? (
              <div className="hub-empty-state">
                <FiUploadCloud size={40} />
                <h3>No videos found</h3>
                <p>
                  {activeSidebar === 'saved'
                    ? 'Save videos to watch them later.'
                    : activeSidebar === 'liked'
                      ? 'Like videos to see them here.'
                      : 'Try a different filter or upload your first video.'}
                </p>
                {activeFilterChip !== 'YouTube' && (
                  <button type="button" className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
                    Upload Video
                  </button>
                )}
              </div>
            ) : (
            <div className="hub-videos-grid">
              {getFilteredVideos().map((video) => {
                const isHovered = hoveredVideoId === video.id;

                return (
                  <div 
                    key={video.id} 
                    className="hub-video-grid-card"
                    onMouseEnter={() => handleMouseEnter(video.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="thumbnail-hud-wrapper">
                      {isHovered && video.source === 'mindbook' ? (
                        <video 
                          src={video.videoUrl} 
                          className="preview-video" 
                          muted 
                          loop 
                          autoPlay 
                        />
                      ) : (
                        <img src={video.thumbnailUrl} alt={video.title} className="thumb-img" />
                      )}

                      {/* Overlays */}
                      {video.isLive && <span className="live-pill-red">🔴 LIVE</span>}
                      {renderSourceBadge(video.source)}
                      <span className="duration-pill">{video.duration}</span>
                      
                      {video.watchProgress && (
                        <div className="progress-bar-track">
                          <div className="progress-bar-fill" style={{ width: `${video.watchProgress}%` }} />
                        </div>
                      )}

                      {/* Quick action save on hover */}
                      <button 
                        className={`quick-save-hover-btn ${savedVideoIds.includes(video.id) ? 'saved' : ''}`}
                        onClick={(e) => toggleSave(video.id, e)}
                      >
                        {savedVideoIds.includes(video.id) ? <FiCheck size={14} /> : <FiPlus size={14} />}
                      </button>
                    </div>

                    <div className="video-card-meta-row">
                      <img src={resolveMediaUrl(video.creatorAvatar)} alt={video.creator} className="card-channel-avatar" />
                      <div className="meta-info-block">
                        <h3 className="video-card-title">{video.title}</h3>
                        <span className="channel-title-row">
                          {video.creator} 
                          {video.isVerified && <FiCheckCircle size={12} className="verified-yellow-check" />}
                        </span>
                        
                        <div className="views-date-line">
                          <span>{video.views.toLocaleString()} views</span>
                          <span className="divider-dot">•</span>
                          <span>{video.relativeTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>

        </div>

      </div>

      {/* Upload Video Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <UploadVideoModal
            onClose={() => setShowUploadModal(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoHub;
