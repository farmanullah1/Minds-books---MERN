/**
 * CodeDNA
 * VideoCard.tsx — Reusable Netflix/YouTube Style Video Card Component
 * exports: default VideoCard
 * used_by: VideoHub, WatchPage, Home, etc.
 * rules: Yellow theme, scale hover effect, custom preview autoplay, progress bar
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPlus, FiHeart, FiMoreHorizontal, FiClock, FiCheck } from 'react-icons/fi';
import SourceBadge from '../VideoHub/SourceBadge';
import './VideoCard.css';

export interface VideoItem {
  id?: string;
  _id?: string;
  youtubeId?: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration?: number | string; // seconds or formatted "12:34"
  views?: number;
  uploader?: {
    name: string;
    profilePicture?: string;
  };
  channelTitle?: string;
  channelAvatar?: string;
  isLive?: boolean;
  source: 'youtube' | 'mindbook' | 'user';
  watchProgress?: number; // 0 to 100
}

interface VideoCardProps {
  video: VideoItem;
  onPlay?: (video: VideoItem) => void;
  onSave?: (video: VideoItem) => void;
  onLike?: (video: VideoItem) => void;
  onMoreInfo?: (video: VideoItem) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  onSave,
  onLike,
  onMoreInfo
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const hoverTimeoutRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video preview after 800ms hover
  useEffect(() => {
    if (isHovered) {
      hoverTimeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 800);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlay) onPlay(video);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSave) onSave(video);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLike) onLike(video);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMoreInfo) onMoreInfo(video);
  };

  const formatDuration = (d?: number | string) => {
    if (!d) return '';
    if (typeof d === 'string') return d;
    const mins = Math.floor(d / 60);
    const secs = Math.floor(d % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatViews = (v?: number) => {
    if (v === undefined) return '';
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M views`;
    if (v >= 1000) return `${(v / 1000).toFixed(0)}K views`;
    return `${v} views`;
  };

  const displayAvatar = video.uploader?.profilePicture || video.channelAvatar || '';
  const displayAuthor = video.uploader?.name || video.channelTitle || 'MindBook Creator';

  return (
    <motion.div
      className={`netflix-video-card-container ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layoutId={`card-layout-${video.id || video._id}`}
      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
    >
      {/* Base Card / Thumbnail view */}
      <div className="video-card-inner">
        <div className="thumbnail-wrapper">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="video-thumbnail"
            loading="lazy"
          />

          {/* Continue Watching / Progress Bar (Thin Yellow line) */}
          {video.watchProgress && video.watchProgress > 0 && (
            <div className="continue-watching-progress-bg">
              <div 
                className="continue-watching-progress-bar"
                style={{ width: `${video.watchProgress}%` }}
              />
            </div>
          )}

          {video.isLive ? (
            <span className="live-badge">🔴 LIVE</span>
          ) : (
            <span className="duration-badge">{formatDuration(video.duration)}</span>
          )}

          {/* Source badge */}
          <SourceBadge source={video.source} className="source-badge" />
        </div>

        <div className="video-info-summary">
          {displayAvatar && (
            <img src={displayAvatar} alt={displayAuthor} className="author-avatar" />
          )}
          <div className="video-meta-text">
            <h4 className="video-title-text">{video.title}</h4>
            <span className="author-name-text">{displayAuthor}</span>
            <div className="views-time-row">
              {video.views !== undefined && <span>{formatViews(video.views)}</span>}
              {video.views !== undefined && <span className="dot-divider">•</span>}
              <span>{video.isLive ? 'Trending' : 'Watch Now'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Hover Overlay card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="expanded-hover-card"
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1.08, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <div className="expanded-thumbnail-wrapper" onClick={handlePlayClick}>
              {/* Autoplay preview video if available, else static img */}
              {video.videoUrl ? (
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  muted
                  loop
                  playsInline
                  className="preview-autoplay-video"
                  poster={video.thumbnailUrl}
                />
              ) : (
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="preview-autoplay-video-fallback"
                />
              )}

              {/* Mute/Sound Overlays */}
              <div className="video-sound-hint">
                🔇 Hover to Play Preview
              </div>

              {video.isLive ? (
                <span className="expanded-live-badge">🔴 LIVE</span>
              ) : (
                <span className="expanded-duration-badge">{formatDuration(video.duration)}</span>
              )}
            </div>

            {/* Content & Action Buttons */}
            <div className="expanded-card-details">
              <div className="quick-actions-row">
                <div className="left-actions">
                  <button className="action-circle-btn play" onClick={handlePlayClick} title="Play">
                    <FiPlay size={16} />
                  </button>
                  <button 
                    className={`action-circle-btn ${isSaved ? 'active' : ''}`} 
                    onClick={handleSaveClick}
                    title={isSaved ? "Saved to Watch Later" : "Add to Watch Later"}
                  >
                    {isSaved ? <FiCheck size={16} /> : <FiPlus size={16} />}
                  </button>
                  <button 
                    className={`action-circle-btn ${isLiked ? 'active' : ''}`} 
                    onClick={handleLikeClick}
                    title={isLiked ? "Liked" : "Like"}
                  >
                    <FiHeart size={16} fill={isLiked ? "#F7B928" : "none"} />
                  </button>
                </div>
                <button className="action-circle-btn more" onClick={handleMoreClick} title="More Info">
                  <FiMoreHorizontal size={16} />
                </button>
              </div>

              <h4 className="expanded-video-title" onClick={handlePlayClick}>{video.title}</h4>

              {video.description && (
                <p className="expanded-video-desc">{video.description.substring(0, 70)}...</p>
              )}

              {/* Author / Channel Details */}
              <div className="expanded-author-row">
                {displayAvatar && (
                  <img src={displayAvatar} alt={displayAuthor} className="expanded-author-avatar" />
                )}
                <div className="expanded-author-meta">
                  <span className="expanded-author-name">{displayAuthor}</span>
                  <span className="expanded-views">{formatViews(video.views)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoCard;
