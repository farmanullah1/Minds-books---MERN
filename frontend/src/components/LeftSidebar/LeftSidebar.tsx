/**
 * CodeDNA
 * LeftSidebar.tsx — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBookmark, FiCalendar, FiFlag, FiShoppingBag, FiChevronDown, FiLogOut, FiBriefcase, FiMusic, FiShield, FiVideo, FiTv, FiHeart, FiFilm, FiCompass, FiPlayCircle, FiActivity, FiRadio, FiMapPin, FiAward, FiEye, FiUser, FiInfo, FiHelpCircle } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { getInitials } from '../../utils/helpers';
import './LeftSidebar.css';

const LeftSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [showMore, setShowMore] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleClose = () => setIsOpen(false);
    window.addEventListener('toggle-mobile-sidebar', handleToggle);
    // Close sidebar on navigation change
    handleClose();
    return () => {
      window.removeEventListener('toggle-mobile-sidebar', handleToggle);
    };
  }, [location.pathname]);

  const mainLinks = [
    { icon: <FiHome size={20} />, label: 'Home', to: '/' },
    { icon: <FiUsers size={20} />, label: 'Friends', to: '/friends' },
    { icon: <FiUsers size={20} />, label: 'Groups', to: '/groups' },
    { icon: <FiBookmark size={20} />, label: 'Saved', to: '/saved' },
    { icon: <FiFlag size={20} />, label: 'Pages', to: '/' },
    { icon: <FiCalendar size={20} />, label: 'Events', to: '/events' },
    { icon: <FiFlag size={20} />, label: 'Articles', to: '/articles' },
    { icon: <FiBriefcase size={20} />, label: 'Jobs', to: '/jobs' },
  ];

  const moreLinks = [
    { icon: <FiShoppingBag size={20} />, label: 'Marketplace', to: '/marketplace' },
    { icon: <FiShoppingBag size={20} />, label: 'Creator Shops', to: '/shops' },
    { icon: <FiFlag size={20} />, label: 'Memories', to: '/memories' },
    { icon: <FiMusic size={20} />, label: 'Playlists', to: '/playlists' },
    { icon: <FiPlayCircle size={20} />, label: 'Video Hub', to: '/watch' },
    { icon: <FiActivity size={20} />, label: 'Creator Studio', to: '/creator-studio' },
    { icon: <FiRadio size={20} />, label: 'Audio Rooms', to: '/audio-rooms' },
    { icon: <FiMapPin size={20} />, label: 'Local Discovery', to: '/local-discovery' },
    { icon: <FiAward size={20} />, label: 'Gaming Arcade', to: '/gaming' },
    { icon: <FiVideo size={20} />, label: 'Live Streams', to: '/watch/live' },
    { icon: <FiTv size={20} />, label: 'Watch Parties', to: '/watch/party' },
    { icon: <FiHeart size={20} />, label: 'Fundraisers', to: '/fundraisers' },
    { icon: <FiFilm size={20} />, label: 'Reels', to: '/watch/reels' },
    { icon: <FiCompass size={20} />, label: 'Explore', to: '/explore' },
    { icon: <FiShield size={20} />, label: 'Security', to: '/security' },
    { icon: <FiEye size={20} />, label: 'Accessibility', to: '/settings/accessibility' },
    { icon: <FiInfo size={20} />, label: 'Privacy Policy', to: '/privacy-policy' },
    { icon: <FiInfo size={20} />, label: 'Terms of Service', to: '/terms-of-service' },
    { icon: <FiShield size={20} />, label: 'Community Guidelines', to: '/community-guidelines' },
    { icon: <FiHelpCircle size={20} />, label: 'Help Center', to: '/help-center' },
    { icon: <FiUser size={20} />, label: 'Meet the Creator', to: '/meet-the-creator' },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <aside className={`left-sidebar ${isOpen ? 'open' : ''}`} id="left-sidebar">
        <div className="sidebar-scroll">
          {/* Profile Link */}
          <Link to={`/profile/${user?._id}`} className="sidebar-profile-link" id="sidebar-profile">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} className="sidebar-avatar" />
            ) : (
              <div className="sidebar-avatar sidebar-avatar-initials">
                {user ? getInitials(user.name) : '?'}
              </div>
            )}
            <span className="sidebar-username">{user?.name || 'User'}</span>
          </Link>
          {/* Coin Balance */}
          {user && (
            <div className="sidebar-coins-card" style={{ 
              margin: '12px 0', 
              padding: '12px', 
              background: 'var(--bg-secondary)', 
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: 'var(--brand)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#000'
              }}>
                <FiShoppingBag size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MindBook Coins</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--brand)' }}>{user.coins || 0}</div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="sidebar-nav">
            {mainLinks.map((link) => (
              <Link 
                key={link.label} 
                to={link.to} 
                className={`sidebar-link ${location.pathname === link.to ? 'active' : ''}`} 
                id={`sidebar-${link.label.toLowerCase()}`}
              >
                <span className="sidebar-link-icon">{link.icon}</span>
                <span className="sidebar-link-label">{link.label}</span>
              </Link>
            ))}

            {showMore &&
              moreLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.to} 
                  className={`sidebar-link ${location.pathname === link.to ? 'active' : ''}`} 
                  id={`sidebar-${link.label.toLowerCase()}`}
                >
                  <span className="sidebar-link-icon">{link.icon}</span>
                  <span className="sidebar-link-label">{link.label}</span>
                </Link>
              ))}

            <button
              className="sidebar-link see-more-btn"
              onClick={() => setShowMore(!showMore)}
              id="sidebar-see-more"
            >
              <span className="sidebar-link-icon see-more-icon" style={{ transform: showMore ? 'rotate(180deg)' : 'none' }}>
                <FiChevronDown size={20} />
              </span>
              <span className="sidebar-link-label">{showMore ? 'See less' : 'See more'}</span>
            </button>
          </nav>

          {/* Logout */}
          <button className="sidebar-link logout-link" onClick={handleLogout} style={{ marginTop: 'auto', border: 'none', background: 'none', width: '100%', textAlign: 'left' }}>
            <span className="sidebar-link-icon"><FiLogOut size={20} /></span>
            <span className="sidebar-link-label">Log Out</span>
          </button>

          {/* Divider */}
          <div className="sidebar-divider" />

          {/* Shortcuts Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Your shortcuts</h3>
            <div className="sidebar-shortcuts-empty">
              <span className="text-secondary">No shortcuts yet</span>
            </div>
          </div>

          {/* Footer */}
          <footer className="sidebar-footer">
            <span>MindBook © 2024</span>
          </footer>
        </div>
      </aside>
      {isOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default LeftSidebar;
