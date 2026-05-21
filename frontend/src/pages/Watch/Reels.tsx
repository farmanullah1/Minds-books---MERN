import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiMessageSquare, FiShare2, FiMusic, 
  FiUserPlus, FiCheck, FiVolume2, FiVolumeX, FiPlus 
} from 'react-icons/fi';
import Lenis from '@studio-freight/lenis';
import api from '../../services/api';
import CreateReel from '../../components/CreateReel/CreateReel';
import Navbar from '../../components/Navbar/Navbar';
import { filters } from '../../utils/photoFilters';
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
  filterName?: string;
}

interface HeartTap {
  id: string;
  x: number;
  y: number;
}

const Reels: React.FC = () => {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [heartTaps, setHeartTaps] = useState<{ [reelId: string]: HeartTap[] }>({});
  const [plusOnes, setPlusOnes] = useState<{ [reelId: string]: { id: string; val: string }[] }>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const fetchReels = useCallback(async () => {
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

    try {
      const res = await api.get('/reels');
      if (res.data && res.data.length > 0) {
        const apiReels: ReelItem[] = res.data.map((item: any) => ({
          id: item._id,
          videoUrl: item.videoUrl,
          creatorName: item.user?.name || 'Anonymous User',
          creatorAvatar: item.user?.profilePicture || '',
          description: item.caption || '',
          musicName: item.musicName || 'Original Audio',
          likes: item.likes?.length || 0,
          comments: item.comments?.length || 0,
          shares: item.sharesCount || 0,
          isFollowed: false,
          filterName: item.filterName || 'Original'
        }));
        setReels(apiReels);
      } else {
        setReels(mockReels);
      }
    } catch (err) {
      console.error('Failed to fetch reels from backend, using fallbacks', err);
      setReels(mockReels);
    }
  }, []);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (!containerRef.current) return;
    
    const lenis = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current.querySelector('.reels-feed-content') as HTMLElement,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    } as any);

    // Custom snap logic simulation
    let isScrolling: any;
    lenis.on('scroll', (e: any) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        // Find nearest reel and snap to it
        if (!containerRef.current) return;
        const reelElements = Array.from(containerRef.current.querySelectorAll('.reel-stage'));
        let closest = reelElements[0];
        let minDistance = Infinity;
        
        reelElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            closest = el;
          }
        });

        if (closest && minDistance > 5) {
          lenis.scrollTo(closest as HTMLElement, { duration: 0.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
        }
      }, 150);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [reels]);

  // Intersection Observer to play/pause videos
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video') as HTMLVideoElement;
        if (!video) return;
        
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, {
      root: containerRef.current,
      threshold: 0.6
    });

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.reel-stage');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [reels]);

  // Handle Double-Tap Like
  const handleVideoDoubleClick = async (e: React.MouseEvent<HTMLDivElement>, reelId: string) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newTapId = Math.random().toString();
    const newPlusId = Math.random().toString();

    setHeartTaps(prev => ({
      ...prev,
      [reelId]: [...(prev[reelId] || []), { id: newTapId, x: clickX, y: clickY }]
    }));
    
    setPlusOnes(prev => ({
      ...prev,
      [reelId]: [...(prev[reelId] || []), { id: newPlusId, val: '+1' }]
    }));

    setTimeout(() => {
      setHeartTaps(prev => ({
        ...prev,
        [reelId]: prev[reelId].filter(t => t.id !== newTapId)
      }));
    }, 1000);

    setTimeout(() => {
      setPlusOnes(prev => ({
        ...prev,
        [reelId]: prev[reelId].filter(p => p.id !== newPlusId)
      }));
    }, 1200);

    // Call live backend API if using real DB ObjectId
    if (!reelId.startsWith('reel_')) {
      try {
        await api.post(`/reels/${reelId}/like`);
      } catch (err) {
        console.error('Failed to sync like with backend', err);
      }
    }

    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return { ...r, likes: r.likes + 1 };
      }
      return r;
    }));
  };

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
      <Navbar />
      <button 
        className="reels-create-trigger" 
        onClick={() => setIsCreateOpen(true)}
        aria-label="Create Reel"
      >
        <FiPlus size={18} />
        <span>Create Reel</span>
      </button>

      <div className="reels-outer-scroller" ref={containerRef}>
        <div className="reels-feed-content">
          {reels.map((reel) => (
            <div 
              key={reel.id}
              className="reel-stage"
              onDoubleClick={(e) => handleVideoDoubleClick(e, reel.id)}
            >
              <video 
                ref={el => { videoRefs.current[reel.id] = el; }}
                src={reel.videoUrl}
                className="reel-video-element"
                style={{ filter: filters[reel.filterName || 'Original'] || '' }}
                loop
                playsInline
                muted={isMuted}
                onClick={() => setIsMuted(!isMuted)}
              />

              <div className="sound-toggle-toast" onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}>
                {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </div>

              <AnimatePresence>
                {(heartTaps[reel.id] || []).map((tap) => (
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

              <div className="reel-side-actions">
                <div className="action-button-wrapper">
                  <AnimatePresence>
                    {(plusOnes[reel.id] || []).map((p) => (
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
                  <button className="side-action-btn share" onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(`http://localhost:5173/watch/reels?id=${reel.id}`);
                    alert('Reel short link copied!');
                  }}>
                    <FiShare2 size={24} />
                  </button>
                  <span className="action-label">{reel.shares}</span>
                </div>

                <div className="rotating-music-disc-wrapper">
                  <div className="vinyl-record-disc">
                    <img src={reel.creatorAvatar} alt="disc" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateReel 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={fetchReels}
      />
    </div>
  );
};

export default Reels;
