import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import api from '../../services/api';

interface ReportItem {
  _id: string;
  type: string;
  status: string;
  reason: string;
  createdAt: string;
}

const MyReports: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports/my-reports')
      .then((res: any) => setReports(res.data || []))
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  const statusColor: Record<string, string> = {
    pending: '#f59e0b',
    reviewed: '#3b82f6',
    resolved: '#10b981',
    dismissed: '#6b7280',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-html)' }}>
      <LeftSidebar />
      <main style={{ flex: 1, padding: '32px 24px', maxWidth: '780px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '24px' }}>
          My Reports
        </h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <div className="spinner" />
          </div>
        ) : reports.length === 0 ? (
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
            <h2 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '8px' }}>No reports submitted</h2>
            <p style={{ color: 'var(--text-secondary)' }}>When you report content, your reports will appear here.</p>
            <Link to="/" style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none', display: 'block', marginTop: '16px' }}>
              ← Back to Feed
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reports.map((report) => (
              <div key={report._id} style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {report.type} — {report.reason}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: `${statusColor[report.status] || '#6b7280'}22`,
                  color: statusColor[report.status] || '#6b7280',
                }}>
                  {report.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyReports;
