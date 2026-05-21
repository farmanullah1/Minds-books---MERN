import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from '../components/Navbar/Navbar';
import LeftSidebar from '../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import MobileBottomNav from '../components/Navbar/MobileBottomNav';
import NotificationToast from '../components/NotificationToast/NotificationToast';
import MindBot from '../components/MindBot/MindBot';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ── Lenis smooth scroll init
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Determine which routes should hide sidebars
  const isFullScreen = ['/reels', '/watch/'].some(p => location.pathname.startsWith(p));
  const showRightSidebar = isDesktop && !isFullScreen && ['/', '/feed'].includes(location.pathname);

  return (
    <div className={styles.shell}>
      {/* Fixed top */}
      <Navbar />

      {/* Main layout grid */}
      <div
        className={[
          styles.grid,
          isFullScreen ? styles.fullscreen : '',
          showRightSidebar ? styles.threeCol : styles.twoCol,
        ].join(' ')}
      >
        {/* Left sidebar — hidden on mobile */}
        {!isMobile && !isFullScreen && (
          <aside className={`${styles.sidebarLeft} no-scrollbar`} aria-label="Left navigation">
            <LeftSidebar />
          </aside>
        )}

        {/* Center content — animated route transitions */}
        <main className={styles.feed} id="main-content">
          <AnimatePresence mode="wait" initial={false}>
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>

        {/* Right sidebar — only on desktop and select routes */}
        {showRightSidebar && (
          <aside className={`${styles.sidebarRight} no-scrollbar`} aria-label="Right sidebar">
            <RightSidebar />
          </aside>
        )}
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && <MobileBottomNav />}

      {/* Global overlays */}
      <NotificationToast />
      <MindBot />
    </div>
  );
}
