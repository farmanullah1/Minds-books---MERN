import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FiActivity, FiBarChart2, FiFlag, FiHardDrive, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from '../../store/hooks';
import Navbar from '../../components/Navbar/Navbar';
import UserManagement from './UserManagement';
import ModerationQueue from './ModerationQueue';
import api from '../../services/api';
import './AdminDashboard.css';

const chartColors = ['#F7B928', '#1877f2', '#45bd62', '#8b5cf6'];

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { innerText: 0 },
      {
        innerText: value || 0,
        duration: 1.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() {
          if (ref.current) {
            ref.current.innerText = `${Math.round(Number(ref.current.innerText)).toLocaleString()}${suffix}`;
          }
        },
      }
    );
  }, [value, suffix]);

  return <span ref={ref}>{(value || 0).toLocaleString()}{suffix}</span>;
};

const MetricCard: React.FC<{
  title: string;
  value: number;
  subtitle: string;
  icon: React.ElementType;
  tone: string;
  suffix?: string;
  trend?: string;
}> = ({ title, value, subtitle, icon: Icon, tone, suffix, trend }) => (
  <motion.div
    className="metric-card metric-card-premium"
    whileHover={{ y: -3, boxShadow: 'var(--shadow-card-hover)' }}
    transition={{ duration: 0.2 }}
  >
    <div className="metric-card-top">
      <span className="metric-icon" style={{ color: tone, background: `${tone}18` }}>
        <Icon size={20} />
      </span>
      {trend && <span className="metric-trend" style={{ color: tone }}>{trend}</span>}
    </div>
    <div className="metric-value">
      <AnimatedCounter value={value} suffix={suffix} />
    </div>
    <h3>{title}</h3>
    <p>{subtitle}</p>
  </motion.div>
);

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
              <>
                <div className="metrics-grid">
                  <MetricCard title="Total Users" value={metrics?.totalUsers || 0} subtitle="All registered accounts" icon={FiUsers} tone="#1877f2" trend={`+${metrics?.newUsersThisWeek || 0} this week`} />
                  <MetricCard title="Active Today" value={metrics?.activeUsersToday || 0} subtitle="Logged in within 24h" icon={FiActivity} tone="#45bd62" trend={`${metrics?.activeTodayVsYesterday || 0}%`} />
                  <MetricCard title="Total Posts" value={metrics?.totalPosts || 0} subtitle="All content published" icon={FiBarChart2} tone="#F7B928" />
                  <MetricCard title="Total Groups" value={metrics?.totalGroups || 0} subtitle="Communities created" icon={FiUsers} tone="#8b5cf6" />
                  <MetricCard title="Pending Reports" value={metrics?.pendingReports || 0} subtitle="Awaiting moderation" icon={FiFlag} tone={(metrics?.pendingReports || 0) > 0 ? '#f02849' : '#45bd62'} />
                  <MetricCard title="Storage Used" value={Math.round(metrics?.storageUsedMB || 0)} suffix=" MB" subtitle="Uploads and media" icon={FiHardDrive} tone="#06b6d4" />
                </div>

                <div className="admin-charts-grid">
                  <section className="admin-chart-card">
                    <div className="admin-chart-header">
                      <h3>Content by Type</h3>
                      <span><FiTrendingUp size={14} /> Live mix</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={metrics?.contentByType || []} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82}>
                          {(metrics?.contentByType || []).map((entry: any, index: number) => (
                            <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </section>
                </div>
              </>
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
