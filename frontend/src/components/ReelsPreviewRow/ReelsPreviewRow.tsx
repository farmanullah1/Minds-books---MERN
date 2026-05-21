import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiPlay, FiHeart } from 'react-icons/fi';
import { useAppSelector } from '../../store/hooks';
import HorizontalScrollRow from '../HorizontalScrollRow/HorizontalScrollRow';
import CreateReel from '../CreateReel/CreateReel';
import api from '../../services/api';
import './ReelsPreviewRow.css';

interface ReelPreviewItem {
  id: string;
  videoUrl: string;
  creatorName: string;
  creatorAvatar: string;
  caption: string;
  likesCount: number;
}

const ReelsPreviewRow: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  
  const [reels, setReels] = useState<ReelPreviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const fetchPreviewReels = async () => {
    setLoading(true);
    const mockPreviews: ReelPreviewItem[] = [
      {
        id: 'reel_1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        creatorName: 'elena_dev',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        caption: 'Building my first MERN stack social network from scratch! 💻🚀',
        likesCount: 1240
      },
      {
        id: 'reel_2',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        creatorName: 'creative_mind',
        creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
        caption: 'Vite compiles insanely fast, literally in less than 100ms. 🔥',
        likesCount: 852
      },
      {
        id: 'reel_3',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        creatorName: 'ansari_design',
        creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
        caption: 'Designing premium visual systems requires micro-interactions! ✨',
        likesCount: 2410
      }
    ];

    try {
      const res = await api.get('/reels');
      if (res.data && res.data.length > 0) {
        const apiPreviews: ReelPreviewItem[] = res.data.slice(0, 10).map((item: any) => ({
          id: item._id,
          videoUrl: item.videoUrl,
          creatorName: item.user?.name || 'Anonymous',
          creatorAvatar: item.user?.profilePicture || '',
          caption: item.caption || '',
          likesCount: item.likes?.length || 0
        }));
        setReels(apiPreviews);
      } else {
        setReels(mockPreviews);
      }
    } catch (err) {
      console.warn('Failed to fetch Reels for preview row, using fallbacks', err);
      setReels(mockPreviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviewReels();
  }, []);

  const handleCardClick = (reelId: string) => {
    navigate('/watch/reels');
  };

  return (
    <div className="reels-preview-row-section">
      <HorizontalScrollRow title="Popular Reels" seeAllLink="/watch/reels">
        
        {/* Card 1: "+" Create Reel Action shortcut */}
        <div className="reels-preview-card create-card" onClick={() => setIsCreateOpen(true)}>
          <div className="create-card-avatar-wrapper">
            <img 
              src={user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'} 
              alt="You" 
              className="create-card-user-avatar" 
            />
            <div className="create-plus-bubble">
              <FiPlus size={16} />
            </div>
          </div>
          <div className="create-card-footer">
            <span>Create Reel</span>
          </div>
        </div>

        {/* Dynamic Reels cards list */}
        {loading ? (
          /* Loading Skeleton display cards */
          [1, 2, 3].map((n) => (
            <div key={n} className="reels-preview-card skeleton animate-pulse">
              <div className="skeleton-avatar" />
              <div className="skeleton-line" />
            </div>
          ))
        ) : (
          reels.map((reel) => (
            <div 
              key={reel.id} 
              className="reels-preview-card content-card"
              onClick={() => handleCardClick(reel.id)}
            >
              {/* Fake/static representation of video background in a card frame */}
              <div className="card-video-placeholder">
                <video src={reel.videoUrl} muted playsInline className="card-bg-video-preview" />
                <div className="card-play-hud">
                  <FiPlay size={18} />
                </div>
              </div>

              {/* Header HUD overlay */}
              <div className="card-creator-badge">
                <img src={reel.creatorAvatar} alt={reel.creatorName} className="card-badge-avatar" />
              </div>

              {/* Bottom Details HUD HUD */}
              <div className="card-hud-bottom">
                <span className="card-creator-name">@{reel.creatorName}</span>
                <p className="card-caption-truncate">{reel.caption}</p>
                <div className="card-stats-pill">
                  <FiHeart size={10} fill="var(--brand-primary)" color="var(--brand-primary)" />
                  <span>{reel.likesCount}</span>
                </div>
              </div>
            </div>
          ))
        )}

      </HorizontalScrollRow>

      {/* Reel Creator modal */}
      <CreateReel 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSuccess={fetchPreviewReels} 
      />
    </div>
  );
};

export default ReelsPreviewRow;
