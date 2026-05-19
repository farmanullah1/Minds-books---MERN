/**
 * CodeDNA
 * Explore.tsx — Premium Visual Explore & Discover Page (Masonry Discovery Grid)
 * exports: default Explore
 * used_by: App.tsx
 * rules: Yellow theme primary, masonry content grid, active trending tags, direct hover overlays
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiTrendingUp, FiImage, FiVideo, FiFileText, 
  FiPlusCircle, FiHeart, FiMessageCircle, FiCheckCircle, FiUserPlus 
} from 'react-icons/fi';
import './Explore.css';

interface ExploreItem {
  id: string;
  type: 'image' | 'video' | 'article' | 'group';
  title: string;
  subtitle?: string;
  mediaUrl: string;
  creator: string;
  creatorAvatar: string;
  likes: number;
  comments: number;
  category: string;
}

const Explore: React.FC = () => {
  // States
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);

  // Categories list
  const categories = ['All', 'Technology', 'Design', 'Creative', 'Lifestyle', 'Travel'];

  // Trending Topics list
  const trendingTags = [
    { tag: '#NextGenReact', count: '14.2K posts' },
    { tag: '#GoldDesignAccents', count: '8.9K posts' },
    { tag: '#MindsMERN', count: '6.4K posts' },
    { tag: '#AestheticGlass', count: '4.8K posts' },
    { tag: '#TailwindvsCSS', count: '12.1K posts' }
  ];

  // Mock Explore list items
  useEffect(() => {
    const mockItems: ExploreItem[] = [
      {
        id: 'exp_1',
        type: 'image',
        title: 'Premium Dark Minimal Workspace Setup',
        mediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=800&q=80',
        creator: 'elena_dev',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        likes: 4200,
        comments: 189,
        category: 'Technology'
      },
      {
        id: 'exp_2',
        type: 'video',
        title: '3D Spring Physics UI Design Secrets',
        mediaUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&h=400&q=80',
        creator: 'ansari_design',
        creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
        likes: 1850,
        comments: 64,
        category: 'Design'
      },
      {
        id: 'exp_3',
        type: 'article',
        title: 'Why 2026 Belongs to Agentic Coding Architectures',
        subtitle: 'Unpacking deep recursive planning modules...',
        mediaUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=500&q=80',
        creator: 'system_core',
        creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
        likes: 3120,
        comments: 215,
        category: 'Technology'
      },
      {
        id: 'exp_4',
        type: 'group',
        title: 'Aesthetic Interior & Architecture Geeks',
        mediaUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&h=700&q=80',
        creator: 'Clara Oswald',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
        likes: 980,
        comments: 32,
        category: 'Creative'
      },
      {
        id: 'exp_5',
        type: 'image',
        title: 'Cozy Rain Mood Café Vibe - Virtual Lounge',
        mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&h=450&q=80',
        creator: 'esther_h',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
        likes: 2750,
        comments: 110,
        category: 'Lifestyle'
      },
      {
        id: 'exp_6',
        type: 'image',
        title: 'Golden Hour Mountain Ridge Road - Swiss Alps',
        mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=800&q=80',
        creator: 'wander_adventurer',
        creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
        likes: 5410,
        comments: 298,
        category: 'Travel'
      }
    ];
    setItems(mockItems);
  }, []);

  const toggleFollow = (creatorName: string) => {
    if (followedCreators.includes(creatorName)) {
      setFollowedCreators(prev => prev.filter(c => c !== creatorName));
    } else {
      setFollowedCreators(prev => [...prev, creatorName]);
    }
  };

  const getFilteredItems = () => {
    return items.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.creator.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return <FiVideo size={14} />;
      case 'article': return <FiFileText size={14} />;
      default: return <FiImage size={14} />;
    }
  };

  return (
    <div className="explore-page-container">
      <div className="explore-grid-layout">
        
        {/* Main Left Search & Masonry Discovery Feed */}
        <div className="explore-main-feed">
          
          {/* Glassmorphic Search & Filters Bar */}
          <div className="explore-search-card">
            <div className="search-input-box">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search premium posts, creators, or groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="explore-categories-tabs">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Discovery Grid */}
          <div className="masonry-feed-container">
            {getFilteredItems().map((item) => (
              <motion.div 
                key={item.id}
                className="masonry-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                layoutId={`explore-card-${item.id}`}
              >
                <div className="card-media-wrapper">
                  <img src={item.mediaUrl} alt={item.title} className="card-img" />
                  
                  {/* Media Type pill indicator */}
                  <span className="media-type-pill">
                    {getMediaIcon(item.type)}
                    <span>{item.type.toUpperCase()}</span>
                  </span>

                  {/* Dark micro-hover overlay HUD */}
                  <div className="card-interactive-overlay">
                    <div className="overlay-top">
                      <span className="overlay-category">{item.category}</span>
                    </div>

                    <div className="overlay-bottom">
                      <h4 className="overlay-title">{item.title}</h4>
                      
                      <div className="overlay-user-row">
                        <div className="user-meta">
                          <img src={item.creatorAvatar} alt={item.creator} className="user-avatar" />
                          <span className="user-handle">@{item.creator}</span>
                        </div>

                        <div className="overlay-stats">
                          <span><FiHeart size={12} fill="#F7B928" color="#F7B928" /> {item.likes}</span>
                          <span><FiMessageCircle size={12} /> {item.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Sidebar Widgets */}
        <div className="explore-side-widgets">
          
          {/* Trending Topics widget */}
          <div className="trending-tags-widget">
            <div className="widget-header">
              <FiTrendingUp size={16} className="trending-icon-yellow" />
              <h3>Trending Topics</h3>
            </div>
            
            <div className="trending-list">
              {trendingTags.map((t, idx) => (
                <div key={idx} className="trending-tag-item">
                  <span className="tag-rank">0{idx + 1}</span>
                  <div className="tag-details">
                    <span className="tag-name">{t.tag}</span>
                    <span className="tag-count">{t.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Creators Widget */}
          <div className="trending-tags-widget suggested-creators">
            <div className="widget-header">
              <FiPlusCircle size={16} className="trending-icon-yellow" />
              <h3>Popular Creators</h3>
            </div>

            <div className="creators-discovery-list">
              {[
                { name: 'Sarah Riviera', handle: 'sarah_r', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
                { name: 'Cody Fisher', handle: 'cody_fish', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80' }
              ].map((creator) => (
                <div key={creator.handle} className="creator-discover-row">
                  <img src={creator.avatar} alt={creator.name} className="creator-avatar" />
                  <div className="creator-meta">
                    <span className="creator-fullname">{creator.name}</span>
                    <span className="creator-handle">@{creator.handle}</span>
                  </div>
                  <button 
                    className={`follow-action-btn ${followedCreators.includes(creator.handle) ? 'followed' : ''}`}
                    onClick={() => toggleFollow(creator.handle)}
                  >
                    {followedCreators.includes(creator.handle) ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Explore;
