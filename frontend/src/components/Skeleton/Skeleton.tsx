import React from 'react';
import './Skeleton.css';

export const SkeletonAvatar = ({ size = 40 }) => (
  <div className="skeleton-base skeleton-avatar" style={{ width: size, height: size }} />
);

export const SkeletonLine = ({ width = '100%', height = 14 }) => (
  <div className="skeleton-base skeleton-line" style={{ width, height }} />
);

export const SkeletonRect = ({ width = '100%', height = 100, borderRadius = 'var(--radius-sm)' }) => (
  <div className="skeleton-base" style={{ width, height, borderRadius }} />
);

export const SkeletonPost = () => (
  <div className="skeleton-post card">
    <div className="skeleton-post-header">
      <SkeletonAvatar size={44} />
      <div className="skeleton-post-meta">
        <SkeletonLine width="45%" height={14} />
        <SkeletonLine width="30%" height={11} />
      </div>
    </div>
    <div className="skeleton-post-body">
      <SkeletonLine width="100%" height={14} />
      <SkeletonLine width="85%" height={14} />
      <SkeletonLine width="60%" height={14} />
    </div>
    <SkeletonRect height={260} borderRadius="var(--radius-md)" />
    <div className="skeleton-post-actions">
      <SkeletonLine width="25%" height={14} />
      <SkeletonLine width="25%" height={14} />
      <SkeletonLine width="25%" height={14} />
    </div>
  </div>
);

export const SkeletonConversation = () => (
  <div className="skeleton-conversation">
    <SkeletonAvatar size={50} />
    <div className="skeleton-conv-text">
      <SkeletonLine width="60%" height={14} />
      <SkeletonLine width="80%" height={12} />
    </div>
  </div>
);

export const SkeletonProfile = () => (
  <div className="skeleton-profile">
    <SkeletonRect height={200} borderRadius="var(--radius-md)" />
    <div className="skeleton-profile-info">
      <SkeletonAvatar size={120} />
      <SkeletonLine width="40%" height={20} />
      <SkeletonLine width="25%" height={14} />
    </div>
  </div>
);

export const SkeletonGroupCard = () => (
  <div className="skeleton-group-card card">
    <SkeletonRect height={120} borderRadius="var(--radius-md) var(--radius-md) 0 0" />
    <div style={{ padding: '12px' }}>
      <SkeletonLine width="70%" height={16} />
      <SkeletonLine width="40%" height={12} />
    </div>
  </div>
);

export const SkeletonVideoCard = () => (
  <div className="skeleton-video-card card">
    <SkeletonRect height={180} borderRadius="var(--radius-md) var(--radius-md) 0 0" />
    <div style={{ padding: '12px', display: 'flex', gap: 10 }}>
      <SkeletonAvatar size={36} />
      <div style={{ flex: 1 }}>
        <SkeletonLine width="85%" height={14} />
        <SkeletonLine width="55%" height={12} />
      </div>
    </div>
  </div>
);

export const SkeletonNotification = () => (
  <div className="skeleton-notification">
    <SkeletonAvatar size={44} />
    <div style={{ flex: 1 }}>
      <SkeletonLine width="90%" height={14} />
      <SkeletonLine width="50%" height={12} />
    </div>
  </div>
);

export const SkeletonStory = () => (
  <div className="skeleton-story">
    <SkeletonAvatar size={68} />
    <SkeletonLine width="50px" height={10} />
  </div>
);
