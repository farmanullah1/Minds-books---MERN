/* frontend/src/components/ui/Avatar.jsx — PROMPT-01.C */
import { useState } from 'react';
import styles from './Avatar.module.css';

const SIZE_MAP = { 20:20, 24:24, 32:32, 36:36, 40:40, 48:48, 56:56, 60:60, 80:80, 96:96, 120:120, 168:168 };

export default function Avatar({
  src, alt = 'User avatar', size = 40, online, away, verified,
  className = '', onClick, ring = false, style = {}
}) {
  const [error, setError] = useState(false);
  const px = SIZE_MAP[size] || size;
  const initials = (alt || '?').charAt(0).toUpperCase();

  return (
    <div
      className={[
        styles.wrapper,
        ring ? styles.ring : '',
        onClick ? styles.clickable : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ width: px, height: px, ...style }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          onError={() => setError(true)}
          loading="lazy"
          width={px}
          height={px}
        />
      ) : (
        <div
          className={styles.fallback}
          style={{ fontSize: px * 0.4 }}
          aria-label={alt}
        >
          {initials}
        </div>
      )}

      {/* Online status dot */}
      {online !== undefined && (
        <span
          className={`${styles.dot} ${online ? styles.online : away ? styles.away : styles.offline}`}
          aria-label={online ? 'Online' : away ? 'Away' : 'Offline'}
        />
      )}

      {/* Verified ring */}
      {verified && <span className={styles.verifiedRing} aria-label="Verified" />}
    </div>
  );
}
