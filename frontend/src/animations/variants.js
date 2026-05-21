/* =========================================================
   src/animations/variants.js
   Framer Motion animation variants used across all components.
   Import these instead of defining animations inline.
   Playbook: PROMPT-01.B (ANIMATIONS MODULE)
   ========================================================= */

// ── PAGE TRANSITIONS ─────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0, y: -12, filter: 'blur(4px)',
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
  }
};

// Legacy alias
export const pageTransition = pageVariants;

// ── MODAL ─────────────────────────────────────────────────
export const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.20 } },
  exit:    { opacity: 0, transition: { duration: 0.16 } }
};
export const modalContentVariants = {
  initial: { opacity: 0, scale: 0.88, y: 28 },
  animate: { opacity: 1, scale: 1,    y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
  exit:    { opacity: 0, scale: 0.92, y: 16, transition: { duration: 0.20 } }
};
export const bottomSheetVariants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 30 } },
  exit:    { opacity: 0, y: '100%', transition: { duration: 0.22 } }
};

// Legacy aliases
export const modalBackdrop = modalBackdropVariants;
export const modalContent  = modalContentVariants;

// ── DROPDOWN ──────────────────────────────────────────────
export const dropdownVariants = {
  initial: { opacity: 0, scale: 0.90, y: -8 },
  animate: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.92, y: -6, transition: { duration: 0.12 } }
};

// ── SLIDE VARIANTS ────────────────────────────────────────
export const slideUp    = { initial: { opacity:0, y:24 }, animate: { opacity:1, y:0, transition:{ duration:0.35, ease:[0.22,1,0.36,1] } } };
export const slideDown  = { initial: { opacity:0, y:-16 }, animate: { opacity:1, y:0, transition:{ duration:0.30, ease:[0.22,1,0.36,1] } } };
export const slideRight = { initial: { opacity:0, x:-20 }, animate: { opacity:1, x:0, transition:{ duration:0.30, ease:[0.22,1,0.36,1] } } };
export const slideLeft  = { initial: { opacity:0, x:20 },  animate: { opacity:1, x:0, transition:{ duration:0.30, ease:[0.22,1,0.36,1] } } };
export const fadeIn     = { initial: { opacity:0 }, animate: { opacity:1, transition:{ duration:0.25 } } };
export const fadeUp     = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
export const blurFade   = { initial: { opacity: 0, filter: 'blur(8px)', y: 10 }, animate: { opacity: 1, filter: 'blur(0px)', y: 0 }, exit: { opacity: 0, filter: 'blur(4px)', y: -5 } };
export const scaleIn    = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } };

// ── POP IN (for reaction pickers, badges, tooltips) ───────
export const popIn = {
  initial: { opacity:0, scale:0.3 },
  animate: { opacity:1, scale:1, transition:{ type:'spring', stiffness:350, damping:20 } },
  exit:    { opacity:0, scale:0.3, transition:{ duration:0.12 } }
};

// ── STAGGER CONTAINER ─────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0) => ({
  animate: { transition: { staggerChildren, delayChildren } }
});

// ── LIST ITEM ─────────────────────────────────────────────
export const listItem = {
  initial: { opacity:0, y:12, scale:0.98 },
  animate: { opacity:1, y:0, scale:1, transition:{ duration:0.28, ease:[0.22,1,0.36,1] } }
};

// ── CARD HOVER ────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0, boxShadow: 'var(--shadow-card)' },
  hover: { y: -4, boxShadow: 'var(--shadow-card-hover)', transition: { duration: 0.20 } }
};

// ── TOAST ─────────────────────────────────────────────────
export const toastVariants = {
  initial: { opacity:0, x:120, scale:0.85 },
  animate: { opacity:1, x:0,   scale:1, transition:{ type:'spring', stiffness:300, damping:28 } },
  exit:    { opacity:0, x:120, scale:0.85, transition:{ duration:0.22 } }
};

// ── REACTION PICKER EMOJI ─────────────────────────────────
export const emojiVariants = {
  initial: { opacity:0, scale:0.3, y:10 },
  animate: (i) => ({
    opacity:1, scale:1, y:0,
    transition:{ type:'spring', stiffness:400, damping:20, delay: i * 0.04 }
  }),
  hover:   { scale:1.45, y:-4, transition:{ type:'spring', stiffness:400, damping:18 } }
};
