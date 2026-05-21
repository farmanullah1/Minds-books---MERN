import { motion } from 'framer-motion';
import { ExternalLink, Mail, Globe2 } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import './DeveloperLinks.css';

const links = [
  {
    label: 'Portfolio',
    url: 'https://farmanullah1.github.io/My-Portfolio',
    Icon: Globe2,
    color: '#F7B928',
    bg: 'rgba(247, 185, 40, 0.1)',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/farmanullah-ansari/',
    Icon: FiLinkedin,
    color: '#0A66C2',
    bg: 'rgba(10, 102, 194, 0.08)',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/farmanullah1',
    Icon: FiGithub,
    color: '#333333',
    bg: 'rgba(51, 51, 51, 0.08)',
  },
  {
    label: 'Email',
    url: 'mailto:farmanullahansari999@gmail.com',
    Icon: Mail,
    color: '#1a7f37',
    bg: 'rgba(26, 127, 55, 0.08)',
  },
];

export function DeveloperLinksCompact() {
  return (
    <div className="developer-links-compact">
      <p className="developer-links-by">
        Created by <strong>Farmanullah Ansari</strong>
      </p>
      <div className="developer-links-row">
        {links.map(({ label, url, Icon, color }) => (
          <motion.a
            key={label}
            href={url}
            target={url.startsWith('mailto:') ? undefined : '_blank'}
            rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="developer-links-icon"
            style={{ color }}
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            title={label}
            aria-label={label}
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export function DeveloperLinksFull() {
  return (
    <div className="developer-links-full">
      <h3 className="developer-links-title">Find me online</h3>
      <div className="developer-links-list">
        {links.map(({ label, url, Icon, color, bg }, index) => (
          <motion.a
            key={label}
            href={url}
            target={url.startsWith('mailto:') ? undefined : '_blank'}
            rel={url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="developer-links-card"
            style={{ background: bg, borderColor: `${color}33` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            whileHover={{ scale: 1.03, y: -2, boxShadow: `0 8px 20px ${color}20` }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="developer-links-card-icon" style={{ color }}>
              <Icon size={20} />
            </span>
            <span className="developer-links-card-text">
              <span className="developer-links-card-label" style={{ color }}>
                {label}
              </span>
              <span className="developer-links-card-url">
                {url.replace('https://', '').replace('mailto:', '')}
              </span>
            </span>
            <ExternalLink size={14} className="developer-links-external" style={{ color }} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default { DeveloperLinksCompact, DeveloperLinksFull };
