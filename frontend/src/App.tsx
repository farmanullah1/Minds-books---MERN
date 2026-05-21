/**
 * CodeDNA
 * App.tsx — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { fetchCurrentUser } from './store/slices/authSlice';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import Messages from './pages/Messages/Messages';
import GroupsHome from './pages/Groups/GroupsHome';
import GroupDiscover from './pages/Groups/GroupDiscover';
import GroupPage from './pages/Groups/GroupPage';
import Events from './pages/Events/Events';
import ArticlesHome from './pages/Articles/ArticlesHome';
import CreateArticle from './pages/Articles/CreateArticle';
import ArticleView from './pages/Articles/ArticleView';
import Playlists from './pages/Playlists/Playlists';
import CreatePlaylist from './pages/Playlists/CreatePlaylist';
import PlaylistDetail from './pages/Playlists/PlaylistDetail';
import Search from './pages/Search/Search';
import Friends from './pages/Friends/Friends';
import Saved from './pages/Saved/Saved';
import Settings from './pages/Settings/Settings';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Store from './pages/Store/Store';
import Memories from './pages/Memories/Memories';
import LiveStream from './pages/Watch/LiveStream';
import WatchParty from './pages/Watch/WatchParty';
import Fundraisers from './pages/Fundraisers/Fundraisers';
import Reels from './pages/Watch/Reels';
import Explore from './pages/Explore/Explore';
import VideoHub from './pages/Watch/VideoHub';
import CreatorStudio from './pages/CreatorStudio/CreatorStudio';
import AudioRooms from './pages/AudioRooms/AudioRooms';
import LocationDiscovery from './pages/LocationDiscovery/LocationDiscovery';
import Gaming from './pages/Gaming/Gaming';
import Jobs from './pages/Jobs/Jobs';
import CreateJob from './pages/Jobs/CreateJob';
import JobDetail from './pages/Jobs/JobDetail';
import Network from './pages/Network/Network';
import Security from './pages/Settings/Security';
import Accessibility from './pages/Settings/Accessibility';
import Shops from './pages/Shops/Shops';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService/TermsOfService';
import CommunityGuidelines from './pages/CommunityGuidelines/CommunityGuidelines';
import HelpCenter from './pages/HelpCenter/HelpCenter';
import MeetCreator from './pages/MeetCreator/MeetCreator';
import AboutMindbook from './pages/AboutMindbook/AboutMindbook';
import WhyMindbook from './pages/WhyMindbook/WhyMindbook';
import Notifications from './pages/Notifications/Notifications';
import Wallet from './pages/Wallet/Wallet';
import HashtagPage from './pages/Hashtag/Hashtag';
import YourTime from './pages/YourTime/YourTime';
import MyReports from './pages/MyReports/MyReports';
import DownloadData from './pages/DownloadData/DownloadData';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import MobileBottomNav from './components/Navbar/MobileBottomNav';
import { FiArrowUp } from 'react-icons/fi';
import { socketService } from './services/socketService';
import NotificationToast from './components/NotificationToast/NotificationToast';
import MindBot from './components/MindBot/MindBot';
import { SocketProvider } from './context/SocketContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector((state) => state.auth);
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector((state) => state.auth);
  const [initializing, setInitializing] = React.useState(true);
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      if (token) {
        await dispatch(fetchCurrentUser());
      }
      setInitializing(false);
    };
    init();
  }, [dispatch, token]);

  React.useEffect(() => {
    if (user?._id) {
      socketService.connect(user._id);
    }
    return () => {
      socketService.disconnect();
    };
  }, [user?._id]);

  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  // Swipe to Go Back Touch gesture handler
  React.useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX === 0) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = Math.abs(touchEndY - touchStartY);

      // Swipe right from left edge (touchStartX < 35px)
      if (touchStartX < 35 && deltaX > 80 && deltaY < 40) {
        window.history.back();
      }
      touchStartX = 0;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (initializing && token) {
    return (
      <div className="loading-screen">
        <svg width="80" height="80" viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient id="loadGrad" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#F7B928" />
              <stop offset="100%" stopColor="#D99A1C" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="10" fill="url(#loadGrad)" />
          <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">M</text>
        </svg>
        <span className="brand-text">MindBook</span>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      {user && <NotificationToast />}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            token ? <Home /> : <Landing />
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <GroupsHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/discover"
          element={
            <ProtectedRoute>
              <GroupDiscover />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/:id"
          element={
            <ProtectedRoute>
              <GroupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/:id/:tab"
          element={
            <ProtectedRoute>
              <GroupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <ArticlesHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/new"
          element={
            <ProtectedRoute>
              <CreateArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <ProtectedRoute>
              <ArticleView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/create"
          element={
            <ProtectedRoute>
              <CreatePlaylist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <PlaylistDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route
          path="/memories"
          element={
            <ProtectedRoute>
              <Memories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/live"
          element={
            <ProtectedRoute>
              <LiveStream />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/party"
          element={
            <ProtectedRoute>
              <WatchParty />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fundraisers"
          element={
            <ProtectedRoute>
              <Fundraisers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/reels"
          element={
            <ProtectedRoute>
              <Reels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch"
          element={
            <ProtectedRoute>
              <VideoHub />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/creator-studio"
          element={
            <ProtectedRoute>
              <CreatorStudio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/audio-rooms"
          element={
            <ProtectedRoute>
              <AudioRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/local-discovery"
          element={
            <ProtectedRoute>
              <LocationDiscovery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gaming"
          element={
            <ProtectedRoute>
              <Gaming />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shops"
          element={
            <ProtectedRoute>
              <Shops />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/network"
          element={
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/security"
          element={
            <ProtectedRoute>
              <Security />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/accessibility"
          element={
            <ProtectedRoute>
              <Accessibility />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <ProtectedRoute>
              <TermsOfService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community-guidelines"
          element={
            <ProtectedRoute>
              <CommunityGuidelines />
            </ProtectedRoute>
          }
        />
        <Route
          path="/help-center"
          element={
            <ProtectedRoute>
              <HelpCenter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meet-the-creator"
          element={
            <ProtectedRoute>
              <MeetCreator />
            </ProtectedRoute>
          }
        />
        <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
        <Route path="/hashtag/:tag" element={<ProtectedRoute><HashtagPage /></ProtectedRoute>} />
        <Route path="/your-time" element={<ProtectedRoute><YourTime /></ProtectedRoute>} />
        <Route path="/my-reports" element={<ProtectedRoute><MyReports /></ProtectedRoute>} />
        <Route path="/download-your-data" element={<ProtectedRoute><DownloadData /></ProtectedRoute>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about-mindbook" element={<AboutMindbook />} />
        <Route path="/why-mindbook" element={<WhyMindbook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {token && <MobileBottomNav />}
      {token && <MindBot />}
      {showScroll && (
        <button 
          className="back-to-top" 
          onClick={scrollTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </Router>
  );
};

export default App;
