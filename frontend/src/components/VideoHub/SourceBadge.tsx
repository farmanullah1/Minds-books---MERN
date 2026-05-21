import './SourceBadge.css';

type SourceType = 'mindbook' | 'youtube' | 'user';

interface SourceBadgeProps {
  source: SourceType;
  size?: 'sm' | 'lg';
  className?: string;
}

const MindBookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="12" fill="#F7B928" />
    <path d="M8 30V14l12 9 12-9v16h-5V20.8l-7 5.25-7-5.25V30H8z" fill="white" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="10" viewBox="0 0 24 17" fill="none" aria-hidden="true">
    <rect width="24" height="17" rx="4" fill="#FF0000" />
    <polygon points="10,5 17,8.5 10,12" fill="white" />
  </svg>
);

const SOURCE_CONFIG = {
  mindbook: {
    label: 'MindBook',
    Icon: MindBookIcon,
    color: '#F7B928',
    bg: 'rgba(247, 185, 40, 0.15)',
  },
  user: {
    label: 'MindBook',
    Icon: MindBookIcon,
    color: '#F7B928',
    bg: 'rgba(247, 185, 40, 0.15)',
  },
  youtube: {
    label: 'YouTube',
    Icon: YouTubeIcon,
    color: '#FF0000',
    bg: 'rgba(255, 0, 0, 0.12)',
  },
} as const;

export default function SourceBadge({ source, size = 'sm', className = '' }: SourceBadgeProps) {
  const config = SOURCE_CONFIG[source];
  if (!config) return null;

  const { label, Icon, color, bg } = config;
  const isLarge = size === 'lg';

  return (
    <span
      className={`videohub-source-badge ${isLarge ? 'large' : ''} ${className}`.trim()}
      style={{ background: bg, borderColor: `${color}33` }}
      title={`From ${label}`}
      aria-label={`Source: ${label}`}
    >
      <Icon />
      {(isLarge || size === 'sm') && (
        <span className="videohub-source-label" style={{ color }}>
          {label}
        </span>
      )}
    </span>
  );
}
