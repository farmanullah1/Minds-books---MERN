import React from 'react';
import { Link } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';

const YourTime: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-html)' }}>
      <LeftSidebar />
      <main style={{ flex: 1, padding: '32px 24px', maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏰</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Your Time on MindBook
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Track and manage your daily screen time and activity insights.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Today', value: '1h 24m', icon: '📅' },
              { label: 'This Week', value: '8h 12m', icon: '📊' },
              { label: 'Daily Avg', value: '1h 10m', icon: '📈' },
              { label: 'Streak', value: '7 days', icon: '🔥' },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{icon}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand)' }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</div>
              </div>
            ))}
          </div>
          <Link to="/" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}>
            ← Back to Feed
          </Link>
        </div>
      </main>
    </div>
  );
};

export default YourTime;
