import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NotificationToast from '../components/NotificationToast/NotificationToast';
import styles from './AuthLayout.module.css';

export default function AuthLayout() {
  const location = useLocation();
  return (
    <div className={styles.shell}>
      {/* Animated background blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.blob3} aria-hidden="true" />

      <main className={styles.content}>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <NotificationToast />
    </div>
  );
}
