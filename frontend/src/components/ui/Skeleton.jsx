/* frontend/src/components/ui/Skeleton.jsx — PROMPT-01.C */
import styles from './Skeleton.module.css';

// ── GENERIC SKELETON ──────────────────────────────────────
export function Skeleton({ width = '100%', height = 16, borderRadius, className = '', style = {} }) {
  return (
    <span
      className={`skeleton ${styles.block} ${className}`}
      style={{ width, height, borderRadius: borderRadius || 'var(--r-sm)', ...style }}
      aria-hidden="true"
    />
  );
}

// ── POST CARD SKELETON ────────────────────────────────────
export function SkeletonPost() {
  return (
    <div className={styles.post} aria-label="Loading post" aria-busy="true">
      <div className={styles.postHeader}>
        <span className={`skeleton ${styles.circle}`} style={{ width: 40, height: 40 }} />
        <div className={styles.postMeta}>
          <Skeleton width="40%" height={14} />
          <Skeleton width="25%" height={11} style={{ marginTop: 4 }} />
        </div>
      </div>
      <Skeleton width="90%" height={14} style={{ marginTop: 12 }} />
      <Skeleton width="75%" height={14} style={{ marginTop: 6 }} />
      <Skeleton width="100%" height={220} borderRadius="var(--r-lg)" style={{ marginTop: 12 }} />
      <div className={styles.postActions}>
        <Skeleton width={64} height={32} borderRadius="var(--r-full)" />
        <Skeleton width={64} height={32} borderRadius="var(--r-full)" />
        <Skeleton width={64} height={32} borderRadius="var(--r-full)" />
      </div>
    </div>
  );
}

// ── CHAT LIST SKELETON ────────────────────────────────────
export function SkeletonChat() {
  return (
    <div className={styles.chat} aria-busy="true">
      <span className={`skeleton ${styles.circle}`} style={{ width: 50, height: 50 }} />
      <div style={{ flex: 1 }}>
        <Skeleton width="55%" height={14} />
        <Skeleton width="80%" height={12} style={{ marginTop: 5 }} />
      </div>
      <Skeleton width={32} height={11} />
    </div>
  );
}

// ── VIDEO CARD SKELETON ───────────────────────────────────
export function SkeletonVideoCard() {
  return (
    <div className={styles.video} aria-busy="true">
      <Skeleton width="100%" height={0} style={{ paddingBottom: '56.25%', height: 'auto' }} borderRadius="var(--r-md)" />
      <div className={styles.videoMeta}>
        <span className={`skeleton ${styles.circle}`} style={{ width: 36, height: 36 }} />
        <div style={{ flex: 1 }}>
          <Skeleton width="90%" height={14} />
          <Skeleton width="60%" height={12} style={{ marginTop: 4 }} />
          <Skeleton width="40%" height={11} style={{ marginTop: 4 }} />
        </div>
      </div>
    </div>
  );
}

// ── STORY CIRCLE SKELETON ─────────────────────────────────
export function SkeletonStory() {
  return (
    <div className={styles.story} aria-busy="true">
      <span className={`skeleton ${styles.circle}`} style={{ width: 62, height: 62 }} />
      <Skeleton width={50} height={10} borderRadius="var(--r-full)" style={{ marginTop: 4 }} />
    </div>
  );
}

// ── PROFILE SKELETON ──────────────────────────────────────
export function SkeletonProfile() {
  return (
    <div className={styles.profileSkel} aria-busy="true">
      <Skeleton width="100%" height={200} borderRadius="0" />
      <div style={{ padding: '16px' }}>
        <span className={`skeleton ${styles.circle}`} style={{ width: 80, height: 80, marginTop: -40 }} />
        <Skeleton width="40%" height={20} style={{ marginTop: 12 }} />
        <Skeleton width="60%" height={14} style={{ marginTop: 8 }} />
        <Skeleton width="100%" height={36} borderRadius="var(--r-full)" style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}

// ── NOTIFICATION SKELETON ─────────────────────────────────
export function SkeletonNotification() {
  return (
    <div className={styles.chat} aria-busy="true">
      <span className={`skeleton ${styles.circle}`} style={{ width: 44, height: 44 }} />
      <div style={{ flex: 1 }}>
        <Skeleton width="75%" height={13} />
        <Skeleton width="40%" height={11} style={{ marginTop: 4 }} />
      </div>
    </div>
  );
}

export default Skeleton;
