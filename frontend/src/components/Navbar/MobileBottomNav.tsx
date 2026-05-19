/**
 * CodeDNA
 * MobileBottomNav.tsx — Mobile Bottom Navigation & Center Composer Trigger (PROMPT-58)
 * exports: default MobileBottomNav
 * used_by: App.tsx
 * rules: Fixed 56px height, raises center yellow "+" above bar, safe areas, live notification counts
 */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiPlus, FiVideo, FiBell } from 'react-icons/fi';
import { useAppSelector } from '../../store/hooks';
import CreatePost from '../CreatePost/CreatePost';
import './MobileBottomNav.css';

const MobileBottomNav: React.FC = () => {
  const { unreadCount } = useAppSelector((state) => state.notifications);
  const { user } = useAppSelector((state) => state.auth);
  
  // Local state to trigger composer popup modal directly
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Dynamic friend request badge
  const friendRequestsCount = user?.friendRequests?.length || 0;

  return (
    <>
      <nav className="mobile-bottom-nav">
        
        <NavLink to="/" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <FiHome size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/friends" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-wrapper">
            <FiUsers size={22} />
            {friendRequestsCount > 0 && <span className="nav-badge">{friendRequestsCount}</span>}
          </div>
          <span>Friends</span>
        </NavLink>

        {/* Center Raised "+" Action Button */}
        <button 
          type="button" 
          className="mobile-nav-item special-add-btn" 
          onClick={() => setIsComposerOpen(true)}
          aria-label="Create New Post"
        >
          <div className="add-btn-circle">
            <FiPlus size={26} />
          </div>
        </button>

        <NavLink to="/watch" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <FiVideo size={22} />
          <span>Watch</span>
        </NavLink>

        <NavLink to="/notifications" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}>
          <div className="nav-icon-wrapper">
            <FiBell size={22} />
            {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
          </div>
          <span>Alerts</span>
        </NavLink>

      </nav>

      {/* Renders the full screen popup composer modal when "+" button is clicked */}
      {isComposerOpen && (
        <CreatePost 
          initiallyOpen={true} 
          onClose={() => setIsComposerOpen(false)} 
        />
      )}
    </>
  );
};

export default MobileBottomNav;
