import React from 'react';
import { Link } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';

const HashtagPage: React.FC = () => {
  const tag = window.location.pathname.split('/hashtag/')[1] || '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-html)' }}>
      <LeftSidebar />
      <main style={{ flex: 1, padding: '32px 24px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔖</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            #{tag}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Discover all posts tagged with #{tag}
          </p>
          <Link to="/" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>
            ← Back to Feed
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HashtagPage;
