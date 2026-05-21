/**
 * CodeDNA
 * Network.tsx — LinkedIn-style Professional Network Page
 * exports: Network
 * used_by: App.tsx
 * rules: Follow project conventions
 * agent: gemini-3-5-flash-high | google | 2026-05-20 | init | Initialized Network page
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUserPlus, 
  FiCheck, 
  FiSearch, 
  FiUsers, 
  FiCpu, 
  FiTrendingUp, 
  FiBriefcase,
  FiCompass,
  FiCheckCircle
} from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import api from '../../services/api';
import { IUser } from '../../types';
import { useToast } from '../../components/Toast/ToastContext';
import { getInitials } from '../../utils/helpers';
import './Network.css';

interface PeerSuggestion extends IUser {
  mutualFriendsCount?: number;
  matchingSkills?: string[];
  headline?: string;
  matchReason?: string;
  connectionStatus?: 'none' | 'pending' | 'connected';
}

const Network: React.FC = () => {
  const { showToast } = useToast();
  const [peers, setPeers] = useState<PeerSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'skills' | 'industry' | 'mutual'>('all');
  const [networkStats, setNetworkStats] = useState({
    connections: 0,
    pendingReceived: 0,
    pendingSent: 0
  });

  useEffect(() => {
    fetchNetworkData();
  }, []);

  const fetchNetworkData = async () => {
    setLoading(true);
    try {
      // Fetch users suggestions
      const suggestionsRes = await api.get('/users/suggestions');
      const friendsRes = await api.get('/users/friends');
      const requestsRes = await api.get('/users/friend-requests');

      const incomingCount = requestsRes.data.incoming?.length || 0;
      const outgoingCount = requestsRes.data.outgoing?.length || 0;

      setNetworkStats({
        connections: friendsRes.data?.length || 0,
        pendingReceived: incomingCount,
        pendingSent: outgoingCount
      });

      // Enhance suggestions to simulate professional peer matches
      const enrichedPeers: PeerSuggestion[] = suggestionsRes.data.map((user: any, idx: number) => {
        // Build mock skills/headlines for high-fidelity professional vibes
        const mockSkills = [
          ['React', 'TypeScript', 'Node.js'],
          ['UI/UX Design', 'Figma', 'Product Strategy'],
          ['Data Science', 'Python', 'Machine Learning'],
          ['DevOps', 'AWS', 'Docker', 'Kubernetes'],
          ['Marketing', 'Growth Hacking', 'SEO']
        ];
        const mockHeadlines = [
          'Frontend Engineer seeking new opportunities',
          'Product Designer at Innovate Co.',
          'Data Scientist & ML Researcher',
          'Cloud Solutions Architect',
          'Digital Marketing Strategist'
        ];
        const mockReasons = [
          'Shared interests in web development technologies',
          'Both work in Tech & Design industries',
          'Interested in similar AI & Cloud research topics',
          '3 mutual connections in your professional circle',
          'Based in your metropolitan area'
        ];

        return {
          ...user,
          headline: user.bio || mockHeadlines[idx % mockHeadlines.length],
          matchingSkills: user.portfolio?.skills?.map((s: any) => s.name) || mockSkills[idx % mockSkills.length],
          matchReason: mockReasons[idx % mockReasons.length],
          connectionStatus: 'none'
        };
      });

      setPeers(enrichedPeers);
    } catch (err) {
      console.error('Failed to load network page details', err);
      showToast('Could not sync professional recommendations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (peerId: string, peerName: string) => {
    try {
      // Connect uses the friend request endpoint to establish professional connection
      await api.post('/users/friend-request', { friendId: peerId });
      
      setPeers(prev => prev.map(p => {
        if (p._id === peerId) {
          return { ...p, connectionStatus: 'pending' };
        }
        return p;
      }));

      setNetworkStats(prev => ({
        ...prev,
        pendingSent: prev.pendingSent + 1
      }));

      showToast(`Professional connection request sent to ${peerName}`, 'success');
    } catch (err) {
      console.error('Failed to trigger connection', err);
      showToast('Connection trigger failed. Try again.', 'error');
    }
  };

  const filteredPeers = peers.filter(peer => {
    const matchesSearch = peer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          peer.headline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          peer.matchingSkills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'skills') {
      return peer.matchingSkills && peer.matchingSkills.length > 0;
    }
    if (activeTab === 'industry') {
      return peer.headline && (peer.headline.includes('Designer') || peer.headline.includes('Architect') || peer.headline.includes('Engineer') || peer.headline.includes('Strategist'));
    }
    if (activeTab === 'mutual') {
      return (peer.mutualFriendsCount && peer.mutualFriendsCount > 0) || (peer.matchReason && peer.matchReason.includes('mutual'));
    }

    return true;
  });

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content-layout">
        <LeftSidebar />
        
        <main className="main-feed-area">
          <div className="network-container">
            {/* Header Dashboard Metrics */}
            <div className="network-hero-dashboard">
              <div className="hero-text">
                <h1>Grow your professional circle</h1>
                <p>Find colleagues, industry leaders, and collaborate on innovative social projects</p>
              </div>
              <div className="network-metrics-row">
                <div className="metric-box">
                  <div className="metric-icon"><FiUsers /></div>
                  <div className="metric-info">
                    <span className="metric-num">{networkStats.connections}</span>
                    <span className="metric-label">Connections</span>
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-icon"><FiBriefcase /></div>
                  <div className="metric-info">
                    <span className="metric-num">{networkStats.pendingReceived}</span>
                    <span className="metric-label">Pending Received</span>
                  </div>
                </div>
                <div className="metric-box">
                  <div className="metric-icon"><FiCompass /></div>
                  <div className="metric-info">
                    <span className="metric-num">{networkStats.pendingSent}</span>
                    <span className="metric-label">Pending Sent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Section */}
            <div className="network-main-section">
              <div className="network-filters-bar">
                <div className="network-search-input">
                  <FiSearch />
                  <input 
                    type="text" 
                    placeholder="Search peers by name, role, or skills..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="network-tabs">
                  <button 
                    className={`net-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Recommendations
                  </button>
                  <button 
                    className={`net-tab ${activeTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skills')}
                  >
                    Skills Matches
                  </button>
                  <button 
                    className={`net-tab ${activeTab === 'industry' ? 'active' : ''}`}
                    onClick={() => setActiveTab('industry')}
                  >
                    Industry Peers
                  </button>
                  <button 
                    className={`net-tab ${activeTab === 'mutual' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mutual')}
                  >
                    Mutual Circles
                  </button>
                </div>
              </div>

              {/* Suggestions Grid */}
              {loading ? (
                <div className="network-loading-grid">
                  {[1, 2, 3, 4].map(idx => (
                    <div key={idx} className="peer-skeleton-card">
                      <div className="skeleton-banner" />
                      <div className="skeleton-avatar" />
                      <div className="skeleton-line title" />
                      <div className="skeleton-line desc" />
                      <div className="skeleton-line pills" />
                      <div className="skeleton-button" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="network-grid">
                    <AnimatePresence>
                      {filteredPeers.map((peer) => (
                        <motion.div
                          key={peer._id}
                          className="peer-card"
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="peer-banner" style={{ background: `linear-gradient(135deg, var(--brand-primary-light, #fef9c3) 0%, var(--bg-card) 100%)` }}>
                            {peer.mutualFriendsCount && peer.mutualFriendsCount > 0 ? (
                              <span className="mutual-tag"><FiUsers /> {peer.mutualFriendsCount} mutual</span>
                            ) : null}
                          </div>
                          
                          <div className="peer-avatar-wrapper">
                            {peer.profilePicture ? (
                              <img src={peer.profilePicture} alt={peer.name} className="peer-avatar" />
                            ) : (
                              <div className="peer-avatar-fallback">{getInitials(peer.name)}</div>
                            )}
                          </div>

                          <div className="peer-details">
                            <h3>{peer.name}</h3>
                            <p className="peer-headline">{peer.headline}</p>
                            
                            {peer.matchReason && (
                              <div className="match-reason">
                                <FiCpu className="ai-spark" />
                                <span>{peer.matchReason}</span>
                              </div>
                            )}

                            <div className="peer-skills-chips">
                              {peer.matchingSkills?.slice(0, 3).map((skill, index) => (
                                <span key={index} className="skill-chip">{skill}</span>
                              ))}
                            </div>
                          </div>

                          <div className="peer-actions">
                            {peer.connectionStatus === 'pending' ? (
                              <button className="btn-connect pending" disabled>
                                <FiCheckCircle /> Requested
                              </button>
                            ) : (
                              <button 
                                className="btn-connect"
                                onClick={() => handleConnect(peer._id, peer.name)}
                              >
                                <FiUserPlus /> Connect
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {!loading && filteredPeers.length === 0 && (
                    <div className="network-empty-state">
                      <div className="empty-graphic">📡</div>
                      <h3>No professional peers found</h3>
                      <p>Try clearing your filters or broadening your search queries.</p>
                      <button className="btn-primary" onClick={() => { setSearchTerm(''); setActiveTab('all'); }}>
                        Reset Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
        
        <RightSidebar />
      </div>
    </div>
  );
};

export default Network;
