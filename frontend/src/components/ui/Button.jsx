/* frontend/src/components/ui/Button.jsx
   PROMPT-01.C — Global Component Library
   Premium button with ripple, motion, and full variant system
*/
import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled = false,
    children, className = '', icon, iconRight, onClick, type = 'button', fullWidth = false, ...rest },
  ref
) {
  const btnRef = ref || useRef(null);

  // Ripple effect on click
  const handleClick = (e) => {
    if (disabled || loading) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const sz = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; width:${sz}px; height:${sz}px; border-radius:50%;
      background:rgba(255,255,255,0.3); pointer-events:none;
      left:${e.clientX - rect.left - sz / 2}px;
      top:${e.clientY - rect.top - sz / 2}px;
      animation: ripple 0.5s ease-out forwards;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
    onClick?.(e);
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled || loading}
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className,
      ].filter(Boolean).join(' ')}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      onClick={handleClick}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-label="Loading" />
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
});

export default Button;
