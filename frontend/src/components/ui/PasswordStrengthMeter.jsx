import { motion } from 'framer-motion';
import styles from './PasswordStrengthMeter.module.css';

const LEVELS = [
  { label: 'Very weak', color: '#f02849' },
  { label: 'Weak',      color: '#f02849' },
  { label: 'Fair',      color: '#f59e0b' },
  { label: 'Good',      color: '#f7b928' },
  { label: 'Strong',    color: '#45bd62' },
  { label: 'Very strong', color: '#1a7f37' },
];

const REQUIREMENTS = [
  { test: p => p.length >= 8,        label: 'At least 8 characters' },
  { test: p => /[A-Z]/.test(p),      label: 'One uppercase letter' },
  { test: p => /[a-z]/.test(p),      label: 'One lowercase letter' },
  { test: p => /\d/.test(p),         label: 'One number' },
  { test: p => /[^A-Za-z0-9]/.test(p), label: 'One special character' },
];

export default function PasswordStrengthMeter({ score = 0, password = '' }) {
  const level = LEVELS[Math.min(score, 5)];

  return (
    <div className={styles.wrapper} aria-label={`Password strength: ${level.label}`}>
      {/* Segments */}
      <div className={styles.segments}>
        {[1,2,3,4,5].map(i => (
          <div key={i} className={styles.segmentTrack}>
            <motion.div
              className={styles.segmentFill}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: score >= i ? 1 : 0 }}
              style={{ backgroundColor: score >= i ? level.color : 'transparent' }}
              transition={{ duration: 0.3, ease: [0.22,1,0.36,1], delay: i * 0.04 }}
            />
          </div>
        ))}
      </div>
      {/* Label */}
      <span className={styles.label} style={{ color: level.color }}>{level.label}</span>

      {/* Requirements list */}
      {password && (
        <ul className={styles.requirements} aria-label="Password requirements">
          {REQUIREMENTS.map(({ test, label }) => {
            const met = test(password);
            return (
              <li key={label} className={`${styles.req} ${met ? styles.met : ''}`} aria-checked={met} role="checkbox">
                <span className={styles.reqDot} />
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
