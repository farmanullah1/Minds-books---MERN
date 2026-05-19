import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Navbar from '../../components/Navbar/Navbar';
import UserManagement from './UserManagement';
import ModerationQueue from './ModerationQueue';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchMetrics();
    }
  }, [user]);

  const fetchMetrics = async () => {
    try {
      const res = await api.get('/admin/metrics');
      setMetrics(res.data);
    } catch (err) {
      console.error('Failed to load metrics', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-page-wrapper">
      <Navbar />
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2>Admin Control</h2>
          <nav className="admin-nav">
            <button className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
              User Management
            </button>
            <button className={`admin-nav-item ${activeTab === 'moderation' ? 'active' : ''}`} onClick={() => setActiveTab('moderation')}>
              Moderation Queue
            </button>
            <button className={`admin-nav-item ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>
              System Alerts
            </button>
          </nav>
        </aside>

        <main className="admin-content">
          <header className="admin-header">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h1>
          </header>

          {loading ? (
            <div className="admin-loading">Loading metrics...</div>
          ) : (
            activeTab === 'overview' && (
              <div className="metrics-grid">
                <div className="metric-card">
                  <h3>Total Users</h3>
                  <div className="metric-value">{metrics?.totalUsers || 0}</div>
                </div>
                <div className="metric-card">
                  <h3>Active Users (24h)</h3>
                  <div className="metric-value">{metrics?.activeUsersToday || 0}</div>
                </div>
                <div className="metric-card">
                  <h3>Total Posts</h3>
                  <div className="metric-value">{metrics?.totalPosts || 0}</div>
                </div>
                <div className="metric-card">
                  <h3>Total Groups</h3>
                  <div className="metric-value">{metrics?.totalGroups || 0}</div>
                </div>
              </div>
            )
          )}

          {!loading && activeTab === 'users' && <UserManagement />}
          {!loading && activeTab === 'moderation' && <ModerationQueue />}
          {!loading && activeTab === 'system' && (
            <div className="empty-state">No system alerts at this time. All systems operational.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
