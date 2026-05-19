/**
 * CodeDNA
 * Reels.tsx — Premium Full-Screen Vertical Short Video Feed (Reels) with Double-Tap heart
 * exports: default Reels
 * used_by: App.tsx
 * rules: Yellow theme, double-tap floating yellow heart, +1 like count animation, side overlays
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiMessageSquare, FiShare2, FiMusic, FiChevronUp, 
  FiChevronDown, FiUserPlus, FiCheck, FiVolume2, FiVolumeX 
} from 'react-icons/fi';
import './Reels.css';

interface ReelItem {
  id: string;
  videoUrl: string;
  creatorName: string;
  creatorAvatar: string;
  description: string;
  musicName: string;
  likes: number;
  comments: number;
  shares: number;
  isFollowed?: boolean;
}

interface HeartTap {
  id: string;
  x: number;
  y: number;
}

const Reels: React.FC = () => {
  // Feed list
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Interaction animations
  const [heartTaps, setHeartTaps] = useState<HeartTap[]>([]);
  const [plusOnes, setPlusOnes] = useState<{ id: string; val: string }[]>([]);

  // Refs
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Mock Reels list
  useEffect(() => {
    const mockReels: ReelItem[] = [
      {
        id: 'reel_1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        creatorName: 'elena_dev',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        description: 'Building my first MERN stack social network from scratch! The yellow theme looks absolutely premium! 💻🚀 #coding #javascript #react',
        musicName: 'Original Audio - elena_dev',
        likes: 1240,
        comments: 89,
        shares: 45,
        isFollowed: false
      },
      {
        id: 'reel_2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        creatorName: 'creative_mind',
        creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
        description: 'Vite compiles insanely fast, literally in less than 100ms. If you are not using Vite + TS in 2026, you are missing out! 🔥 #webdev #frontend',
        musicName: 'Future Bass Vibes - ChillOut',
        likes: 852,
        comments: 42,
        shares: 12,
        isFollowed: true
      },
      {
        id: 'reel_3',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        creatorName: 'ansari_design',
        creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
        description: 'Designing premium visual systems requires micro-interactions, responsive CSS layouts, and Harmonious gold accents (#F7B928). ✨👑 #uidesign #figma',
        musicName: 'Aesthetic Lo-fi Lounge - Sunset Vibe',
        likes: 2410,
        comments: 312,
        shares: 198,
        isFollowed: false
      }
    ];
    setReels(mockReels);
  }, []);

  // Autoplay current video and pause others
  useEffect(() => {
    Object.keys(videoRefs.current).forEach(key => {
      const vid = videoRefs.current[key];
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    });

    const activeReel = reels[currentIndex];
    if (activeReel) {
      const activeVid = videoRefs.current[activeReel.id];
      if (activeVid) {
        activeVid.muted = isMuted;
        activeVid.play().catch(() => {});
      }
    }
  }, [currentIndex, reels, isMuted]);

  // Navigate feed
  const nextReel = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        nextReel();
      } else if (e.key === 'ArrowUp') {
        prevReel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels]);

  // Handle Double-Tap (Double Click) Like
  const handleVideoDoubleClick = (e: React.MouseEvent<HTMLDivElement>, reelId: string) => {
    e.stopPropagation();

    // Get click bounds to spawn the heart precisely at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newTapId = Math.random().toString();
    const newPlusId = Math.random().toString();

    // Add heart tap coordinates
    setHeartTaps(prev => [...prev, { id: newTapId, x: clickX, y: clickY }]);
    
    // Add floating +1 bubble above like button
    setPlusOnes(prev => [...prev, { id: newPlusId, val: '+1' }]);

    // Clean up heart after animation ends
    setTimeout(() => {
      setHeartTaps(prev => prev.filter(t => t.id !== newTapId));
    }, 1000);

    setTimeout(() => {
      setPlusOnes(prev => prev.filter(p => p.id !== newPlusId));
    }, 1200);

    // Increment like count in local state
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return { ...r, likes: r.likes + 1 };
      }
      return r;
    }));
  };

  // Follow Button Toggle
  const handleFollowClick = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return { ...r, isFollowed: !r.isFollowed };
      }
      return r;
    }));
  };

  return (
    <div className="reels-page-container">
      <div className="reels-outer-scroller">
        
        {/* Navigation arrows (desktop floating helpers) */}
        <div className="reels-nav-helpers">
          <button className="nav-arrow-btn" onClick={prevReel} disabled={currentIndex === 0}>
            <FiChevronUp size={24} />
          </button>
          <button className="nav-arrow-btn" onClick={nextReel} disabled={currentIndex === reels.length - 1}>
            <FiChevronDown size={24} />
          </button>
        </div>

        {reels.length > 0 && (
          <div className="reel-viewer-viewport">
            
            {/* Active Reel block */}
            {reels.map((reel, idx) => {
              if (idx !== currentIndex) return null;

              return (
                <motion.div 
                  key={reel.id}
                  className="reel-stage"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onDoubleClick={(e) => handleVideoDoubleClick(e, reel.id)}
                >
                  {/* Actual HTML5 Video */}
                  <video 
                    ref={el => { videoRefs.current[reel.id] = el; }}
                    src={reel.videoUrl}
                    className="reel-video-element"
                    loop
                    playsInline
                    onClick={() => setIsMuted(!isMuted)}
                  />

                  {/* Sound overlay indicator */}
                  <div className="sound-toggle-toast" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                    <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                  </div>

                  {/* Floating Yellow Hearts Overlay (PROMPT-46) */}
                  <AnimatePresence>
                    {heartTaps.map((tap) => (
                      <motion.div 
                        key={tap.id}
                        className="floating-tap-heart"
                        style={{ left: tap.x, top: tap.y }}
                        initial={{ scale: 0, opacity: 1, rotate: -20 }}
                        animate={{ scale: [0, 1.4, 1], opacity: [1, 1, 0], y: -80, rotate: [0, 15, -10] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      >
                        <FiHeart size={80} fill="#F7B928" color="#F7B928" />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Overlay Bottom Details */}
                  <div className="reel-details-hud">
                    <div className="creator-profile-row">
                      <img src={reel.creatorAvatar} alt={reel.creatorName} className="reel-creator-avatar" />
                      <span className="creator-handle">@{reel.creatorName}</span>
                      <button 
                        className={`reel-follow-btn ${reel.isFollowed ? 'followed' : ''}`}
                        onClick={(e) => handleFollowClick(reel.id, e)}
                      >
                        {reel.isFollowed ? <FiCheck size={12} /> : <FiUserPlus size={12} />}
                        <span>{reel.isFollowed ? 'Following' : 'Follow'}</span>
                      </button>
                    </div>

                    <p className="reel-description-text">{reel.description}</p>

                    <div className="music-marquee">
                      <FiMusic size={14} className="music-icon" />
                      <div className="music-title-track">
                        <span>{reel.musicName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Buttons Column */}
                  <div className="reel-side-actions">
                    
                    {/* Like button with +1 animation container */}
                    <div className="action-button-wrapper">
                      <AnimatePresence>
                        {plusOnes.map((p) => (
                          <motion.span 
                            key={p.id}
                            className="floating-plus-one"
                            initial={{ y: 0, opacity: 1, scale: 0.8 }}
                            animate={{ y: -50, opacity: 0, scale: 1.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          >
                            {p.val}
                          </motion.span>
                        ))}
                      </AnimatePresence>

                      <button 
                        className="side-action-btn like"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoDoubleClick(
                            { 
                              clientX: window.innerWidth / 2, 
                              clientY: window.innerHeight / 2, 
                              currentTarget: e.currentTarget.parentElement!,
                              stopPropagation: () => {} 
                            } as any, 
                            reel.id
                          );
                        }}
                      >
                        <FiHeart size={24} fill="#F7B928" color="#F7B928" />
                      </button>
                      <span className="action-label">{reel.likes}</span>
                    </div>

                    <div className="action-button-wrapper">
                      <button className="side-action-btn comment">
                        <FiMessageSquare size={24} />
                      </button>
                      <span className="action-label">{reel.comments}</span>
                    </div>

                    <div className="action-button-wrapper">
                      <button className="side-action-btn share" onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:5173/watch/reels?id=${reel.id}`);
                        alert('Reel short link copied!');
                      }}>
                        <FiShare2 size={24} />
                      </button>
                      <span className="action-label">{reel.shares}</span>
                    </div>

                    {/* Rotating Vinyl Record for music */}
                    <div className="rotating-music-disc-wrapper">
                      <div className="vinyl-record-disc">
                        <img src={reel.creatorAvatar} alt="disc" />
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default Reels;
