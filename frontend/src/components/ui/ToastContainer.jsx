/* frontend/src/components/ui/ToastContainer.jsx — PROMPT-01.C */
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { toastVariants } from '../../animations/variants';
import styles from './Toast.module.css';

// In-memory toast store (simple, no Zustand dependency needed here)
let listeners = [];
let _toasts = [];
let _nextId = 1;

export const toast = {
  _subscribe: (fn) => { listeners.push(fn); return () => { listeners = listeners.filter(l => l !== fn); }; },
  _notify: () => listeners.forEach(fn => fn([..._toasts])),
  show: (msg, opts = {}) => {
    const id = _nextId++;
    const t = { id, message: typeof msg === 'string' ? msg : msg.message, type: 'default', duration: 4000, ...opts };
    _toasts = [t, ..._toasts].slice(0, 5);
    toast._notify();
    if (t.duration !== Infinity) setTimeout(() => toast.dismiss(id), t.duration + 300);
    return id;
  },
  success: (msg, opts) => toast.show(msg, { ...opts, type: 'success' }),
  error:   (msg, opts) => toast.show(msg, { ...opts, type: 'error' }),
  warning: (msg, opts) => toast.show(msg, { ...opts, type: 'warning' }),
  info:    (msg, opts) => toast.show(msg, { ...opts, type: 'info' }),
  dismiss: (id) => { _toasts = _toasts.filter(t => t.id !== id); toast._notify(); },
};

const ICONS = {
  success: <CheckCircle size={18} />,
  error:   <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info:    <Info size={18} />,
};

import { useState, useEffect } from 'react';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => toast._subscribe(setToasts), []);

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${styles.toast} ${styles[t.type || 'default']}`}
            role="alert"
          >
            {/* Icon */}
            {ICONS[t.type] && <span className={styles.icon}>{ICONS[t.type]}</span>}

            {/* Message */}
            <div className={styles.content}>
              {t.title && <p className={styles.title}>{t.title}</p>}
              <p className={styles.message}>{t.message}</p>
            </div>

            {/* Action */}
            {t.action && (
              <button className={styles.action} onClick={() => { t.action.onClick(); toast.dismiss(t.id); }}>
                {t.action.label}
              </button>
            )}

            {/* Close */}
            <button className={styles.close} onClick={() => toast.dismiss(t.id)} aria-label="Dismiss">
              <X size={14} />
            </button>

            {/* Auto-dismiss progress bar */}
            {t.duration !== Infinity && (
              <div
                className={styles.progress}
                style={{ animationDuration: `${t.duration || 4000}ms` }}
                onAnimationEnd={() => toast.dismiss(t.id)}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
