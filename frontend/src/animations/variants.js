// Framer Motion shared animation variants for MindBook
export const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
export const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
export const scaleIn = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } };
export const slideRight = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };
export const slideLeft = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 } };
export const slideDown = { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };
export const popIn = { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }, exit: { opacity: 0, scale: 0.5 } };
export const staggerContainer = (stagger = 0.06) => ({ animate: { transition: { staggerChildren: stagger } } });
export const blurFade = { initial: { opacity: 0, filter: 'blur(8px)', y: 10 }, animate: { opacity: 1, filter: 'blur(0px)', y: 0 }, exit: { opacity: 0, filter: 'blur(4px)', y: -5 } };

export const pageTransition = {
  initial:  { opacity: 0, y: 14, filter: 'blur(6px)' },
  animate:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -8, filter: 'blur(2px)', transition: { duration: 0.22 } }
};

export const modalBackdrop = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.2 } },
  exit:     { opacity: 0, transition: { duration: 0.15 } }
};

export const modalContent = {
  initial:  { opacity: 0, scale: 0.92, y: 20 },
  animate:  { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', stiffness: 280, damping: 26 } },
  exit:     { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.18 } }
};
