/* frontend/src/components/ui/Modal.jsx — PROMPT-01.C */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalBackdropVariants, modalContentVariants } from '../../animations/variants';
import styles from './Modal.module.css';

export default function Modal({
  open, onClose, title, children, size = 'md', noCloseBtn = false, className = ''
}) {
  const firstFocusableRef = useRef(null);

  // Lock body scroll and focus
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstFocusableRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className={styles.portal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={modalBackdropVariants}
            initial="initial" animate="animate" exit="exit"
            onClick={onClose}
          />

          {/* Content wrapper */}
          <div className={styles.wrapper}>
            <motion.div
              className={`${styles.container} ${styles[size]} ${className}`}
              variants={modalContentVariants}
              initial="initial" animate="animate" exit="exit"
            >
              {/* Header */}
              {(title || !noCloseBtn) && (
                <div className={styles.header}>
                  <h2 id="modal-title" className={styles.title}>{title}</h2>
                  {!noCloseBtn && (
                    <button
                      className={styles.closeBtn}
                      onClick={onClose}
                      ref={firstFocusableRef}
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className={styles.body}>{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
