/**
 * CodeDNA
 * Home.tsx — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFeedPosts } from '../../store/slices/postsSlice';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import StoriesFeed from '../../components/StoriesFeed/StoriesFeed';
import CreatePost from '../../components/CreatePost/CreatePost';
import DailyChallengeBanner from '../../components/DailyChallengeBanner/DailyChallengeBanner';
import Post from '../../components/Post/Post';
import SkeletonPost from '../../components/Post/SkeletonPost';
import './Home.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, currentPage, totalPages } = useAppSelector((state) => state.posts);
  
  // Pull to refresh states
  const [pullOffset, setPullOffset] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const touchStartRef = React.useRef(0);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  React.useEffect(() => {
    dispatch(fetchFeedPosts(1));
  }, [dispatch]);

  // Load more when reaching bottom
  React.useEffect(() => {
    if (inView && !loading && currentPage < totalPages) {
      dispatch(fetchFeedPosts(currentPage + 1));
    }
  }, [inView, loading, currentPage, totalPages, dispatch]);

  // Pull to refresh touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      touchStartRef.current = e.touches[0].clientY;
    } else {
      touchStartRef.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartRef.current === 0 || refreshing) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartRef.current;
    if (deltaY > 0) {
      // Adding resistance tension
      setPullOffset(Math.min(90, deltaY * 0.4));
    }
  };

  const handleTouchEnd = async () => {
    if (touchStartRef.current === 0 || refreshing) return;
    if (pullOffset > 60) {
      setRefreshing(true);
      setPullOffset(40); // hold position in viewport
      if (navigator.vibrate) {
        navigator.vibrate(15); // haptic confirmation!
      }
      try {
        await dispatch(fetchFeedPosts(1)).unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => {
          setRefreshing(false);
          setPullOffset(0);
        }, 500);
      }
    } else {
      setPullOffset(0);
    }
    touchStartRef.current = 0;
  };

  return (
    <>
      <Navbar />
      <div className="app-layout" id="home-page">
        <LeftSidebar />
        <main className="main-content">
          <div 
            className="feed-container pull-to-refresh-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Pull to Refresh Spinner Indicator */}
            {(pullOffset > 0 || refreshing) && (
              <div 
                className="pull-refresh-indicator" 
                style={{ 
                  transform: `translateY(${pullOffset}px) scale(${Math.min(1, pullOffset / 50)})`,
                  opacity: Math.min(1, pullOffset / 40)
                }}
              >
                <div className={`circular-spinner ${refreshing ? 'spinning' : ''}`} />
              </div>
            )}

            <StoriesFeed />
            <CreatePost />
            <DailyChallengeBanner />

            {posts.length === 0 && loading ? (
              <div className="feed-loading">
                {[1, 2, 3].map(i => <SkeletonPost key={i} />)}
              </div>
            ) : posts.length === 0 ? (
              <div className="feed-empty card">
                <div className="feed-empty-content">
                  <div className="feed-empty-icon">📝</div>
                  <h3>No posts yet</h3>
                  <p>When you or your friends create posts, they'll appear here.</p>
                </div>
              </div>
            ) : (
              <>
                {posts.map((post) => <Post key={post._id} post={post} />)}
                
                {/* Infinite Scroll Trigger */}
                <div ref={ref} className="infinite-scroll-trigger">
                  {loading && currentPage < totalPages && (
                    <div className="load-more-spinner">
                      <div className="spinner small" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
        <RightSidebar />
      </div>
    </>
  );
};

export default Home;
