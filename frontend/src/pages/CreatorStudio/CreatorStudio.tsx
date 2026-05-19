/**
 * CodeDNA
 * CreatorStudio.tsx — High-Fidelity Creator Studio & Monetization Hub with Advanced Recharts Analytics (PROMPT-59)
 * exports: default CreatorStudio
 * used_by: App.tsx
 * rules: Yellow theme primary, advanced layout grids, analytics tabs, dynamic forms, scheduling calendars, Recharts graphs, jsPDF report builders
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCompass, FiTrendingUp, FiUploadCloud, FiBarChart2, 
  FiDollarSign, FiCalendar, FiPlus, FiMoreVertical, 
  FiTrash2, FiArchive, FiLock, FiCheckCircle, FiUsers, 
  FiEye, FiClock, FiActivity, FiAward, FiSettings, FiDownload
} from 'react-icons/fi';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { jsPDF } from 'jspdf';
import api from '../../services/api';
import './CreatorStudio.css';

interface ContentItem {
  id: string;
  title: string;
  type: 'post' | 'video' | 'reel';
  reach: number;
  impressions: number;
  engagement: string;
  date: string;
  status: 'published' | 'draft' | 'scheduled';
}

const CreatorStudio: React.FC = () => {
  // Tabs: overview | content | analytics | monetization | schedule
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'analytics' | 'monetization' | 'schedule'>('overview');
  
  // Period filter
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Interactive state
  const [enableTips, setEnableTips] = useState(false);
  const [supportTier, setSupportTier] = useState('5.00');
  const [showPayoutHistory, setShowPayoutHistory] = useState(false);
  const [badgeApplied, setBadgeApplied] = useState(false);
  const [coinsReward, setCoinsReward] = useState('500');

  // Video analytics selector state
  const [selectedVideoId, setSelectedVideoId] = useState<string>('cnt_1');

  // Calendar event schedule state
  const [scheduledPosts, setScheduledPosts] = useState([
    { title: 'Designing HSL Accent Borders in React 19', date: '2026-05-22', type: 'post' },
    { title: 'Recursion Depth Limits for AI Agents demo', date: '2026-05-25', type: 'video' }
  ]);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');

  // Table content items mock data
  const [contents, setContents] = useState<ContentItem[]>([
    { id: 'cnt_1', title: 'Deep dive into advanced spring eased progress loops', type: 'video', reach: 14200, impressions: 22000, engagement: '18%', date: '2026-05-18', status: 'published' },
    { id: 'cnt_2', title: 'Why client side hydration matters for SPA layouts', type: 'post', reach: 5900, impressions: 9000, engagement: '12%', date: '2026-05-19', status: 'published' },
    { id: 'cnt_3', title: 'Double tap hearts spawning physics demonstration', type: 'reel', reach: 89000, impressions: 145000, engagement: '34%', date: '2026-05-20', status: 'published' },
    { id: 'cnt_4', title: 'TailwindCSS dynamic variables integration guides', type: 'post', reach: 0, impressions: 0, engagement: '0%', date: '2026-05-22', status: 'scheduled' }
  ]);

  // Analytics Dynamic Fetched States
  const [loading, setLoading] = useState(false);
  const [overviewStats, setOverviewStats] = useState({
    reach: 28400,
    impressions: 59300,
    engagementRate: 18.4,
    profileVisits: 1840,
    newFollowers: 340,
    videoViews: 142000,
    watchTime: 4860
  });

  const [audienceData, setAudienceData] = useState({
    followersHistory: [
      { date: '05-01', count: 23200 },
      { date: '05-05', count: 23500 },
      { date: '05-10', count: 23950 },
      { date: '05-15', count: 24400 },
      { date: '05-19', count: 24850 }
    ],
    ageGroups: [
      { name: '13-17', percentage: 8 },
      { name: '18-24', percentage: 38 },
      { name: '25-34', percentage: 42 },
      { name: '35-44', percentage: 10 },
      { name: '45+', percentage: 2 }
    ],
    genderDistribution: [
      { name: 'Male', value: 58 },
      { name: 'Female', value: 39 },
      { name: 'Other', value: 3 }
    ],
    topLocations: [
      { name: 'United States', percentage: 45 },
      { name: 'Germany', percentage: 22 },
      { name: 'India', percentage: 18 },
      { name: 'United Kingdom', percentage: 10 },
      { name: 'Canada', percentage: 5 }
    ],
    devices: [
      { name: 'Mobile', percentage: 68 },
      { name: 'Desktop', percentage: 24 },
      { name: 'Tablet', percentage: 8 }
    ],
    referrers: [
      { name: 'Home Feed', percentage: 52 },
      { name: 'Explore Directory', percentage: 24 },
      { name: 'Search Engine', percentage: 12 },
      { name: 'Direct Links', percentage: 8 },
      { name: 'Shares', percentage: 4 }
    ]
  });

  const [videoAnalytics, setVideoAnalytics] = useState({
    title: 'Deep dive into advanced spring eased progress loops',
    avgViewDuration: '2.5 mins',
    avgViewPercentage: 52,
    thumbnailCTR: 8.4,
    retentionCurve: [
      { time: '0:00', value: 100 },
      { time: '0:30', value: 85 },
      { time: '1:00', value: 72 },
      { time: '1:30', value: 64 },
      { time: '2:00', value: 58 },
      { time: '2:30', value: 52 },
      { time: '3:00', value: 48 },
      { time: '4:00', value: 40 }
    ],
    trafficSources: [
      { name: 'Suggested Videos', value: 48 },
      { name: 'Channel Page', value: 25 },
      { name: 'Search Results', value: 15 },
      { name: 'External Link', value: 12 }
    ]
  });

  const heatmapWeeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const heatmapHours = ['9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '11 PM'];
  const heatmapData: Record<string, number[]> = {
    Monday: [20, 30, 80, 95, 60, 40],
    Tuesday: [15, 25, 75, 90, 65, 35],
    Wednesday: [22, 35, 85, 98, 70, 45],
    Thursday: [18, 28, 80, 92, 68, 40],
    Friday: [25, 40, 90, 99, 85, 60],
    Saturday: [30, 50, 60, 80, 90, 75],
    Sunday: [20, 45, 55, 70, 80, 50]
  };

  // Fetch API analytics endpoints on render
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const ovRes = await api.get(`/analytics/overview?period=${period}`);
        if (ovRes.data) {
          setOverviewStats(ovRes.data);
        }

        const audRes = await api.get(`/analytics/audience`);
        if (audRes.data) {
          setAudienceData(audRes.data);
        }

        const vidRes = await api.get(`/analytics/videos/${selectedVideoId}`);
        if (vidRes.data) {
          setVideoAnalytics({
            ...vidRes.data,
            trafficSources: vidRes.data.trafficSources.map((t: any) => ({
              name: t.source || t.name,
              value: t.percentage || t.value
            }))
          });
        }
      } catch (err) {
        console.warn('Analytics API routes not completely registered yet, using fallback rich seeded objects.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [period, selectedVideoId]);

  const deleteContent = (id: string) => {
    setContents(prev => prev.filter(c => c.id !== id));
  };

  const scheduleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScheduleTitle || !newScheduleDate) return;
    setScheduledPosts(prev => [...prev, { title: newScheduleTitle, date: newScheduleDate, type: 'post' }]);
    setNewScheduleTitle('');
    setNewScheduleDate('');
  };

  // jsPDF PDF Report Exporter
  const exportPDFReport = () => {
    const doc = new jsPDF();
    
    // Brand header
    doc.setFillColor(247, 185, 40);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MindBook Creator Studio Analytics', 15, 25);
    
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} | Active Period: Last ${period === '7d' ? '7' : period === '30d' ? '30' : '90'} Days`, 15, 35);
    
    // Summary Cards
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Performance Overview Metrics', 15, 55);
    
    doc.setFontSize(11);
    doc.text(`• Total Reach: ${overviewStats.reach.toLocaleString()} active users`, 15, 65);
    doc.text(`• Total Impressions: ${overviewStats.impressions.toLocaleString()} views`, 15, 72);
    doc.text(`• Engagement Rate: ${overviewStats.engagementRate}% (average per post)`, 15, 79);
    doc.text(`• Profile Visits: ${overviewStats.profileVisits.toLocaleString()} visitors`, 15, 86);
    doc.text(`• New Followers Gained: +${overviewStats.newFollowers}`, 15, 93);
    doc.text(`• Video Views: ${overviewStats.videoViews.toLocaleString()} views`, 15, 100);
    doc.text(`• Total Watch Time: ${overviewStats.watchTime.toLocaleString()} minutes`, 15, 107);
    
    // Content Performance
    doc.setFontSize(14);
    doc.text('Top Content Performance', 15, 125);
    doc.setFontSize(11);
    doc.text(`• Best Post Reach: 89,000 views (${videoAnalytics.title})`, 15, 135);
    doc.text('• Top Device Platform: iOS / Mobile (68% shares)', 15, 142);
    doc.text('• Top Referral Location: Home Feed Recommendations (52%)', 15, 149);
    
    // Footer notes
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Confidential content statistics generated autonomously by MindBook Star Elite Program.', 15, 280);
    
    doc.save(`mindbook_creator_analytics_${period}.pdf`);
  };

  // CSV Data Exporter
  const exportCSVReport = () => {
    const headers = ['Metric', 'Value', 'Timeline'];
    const rows = [
      ['Total Reach', overviewStats.reach, period],
      ['Total Impressions', overviewStats.impressions, period],
      ['Engagement Rate (%)', overviewStats.engagementRate, period],
      ['Profile Visits', overviewStats.profileVisits, period],
      ['New Followers', overviewStats.newFollowers, period],
      ['Video Views', overviewStats.videoViews, period],
      ['Watch Time (mins)', overviewStats.watchTime, period]
    ];
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mindbook_analytics_${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Brand color cell constants
  const COLORS = ['#F7B928', '#E4A11B', '#C98A10', '#8A8D91', '#45BD62', '#1877F2'];

  return (
    <div className="creatorstudio-page-container">
      
      {/* Top Glass Header */}
      <div className="studio-top-hero">
        <div className="hero-text-block">
          <span className="studio-pill-indicator">STUDIO HUB</span>
          <h1>MindBook Creator Studio</h1>
          <p>Analyze performance metrics, manage content, schedule publications, and monitor earnings.</p>
        </div>

        <div className="creator-level-badge card">
          <FiAward size={24} className="badge-icon-yellow animate-bounce" />
          <div className="level-details">
            <span className="level-title">Creator Level</span>
            <span className="level-rank">Star Elite Creator</span>
          </div>
        </div>
      </div>

      {/* Action Header & Date Filters */}
      <div className="studio-filter-row card mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="studio-period-picker" style={{ display: 'flex', gap: '8px' }}>
          {(['7d', '30d', '90d'] as const).map(p => (
            <button 
              key={p} 
              className={`btn btn-sm ${period === p ? 'btn-success' : ''}`}
              onClick={() => setPeriod(p)}
              style={{
                backgroundColor: period === p ? 'var(--brand-primary)' : 'rgba(255,255,255,0.05)',
                color: period === p ? '#000' : 'var(--text-primary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Last {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>

        <div className="studio-export-actions" style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-sm"
            onClick={exportCSVReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              padding: '8px 16px',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            <FiDownload /> Export CSV
          </button>
          <button 
            className="btn btn-sm"
            onClick={exportPDFReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--brand-primary)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#000',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            <FiDownload /> Download PDF
          </button>
        </div>
      </div>

      {/* Tabs Navigation Trays */}
      <div className="studio-tabs-bar">
        {[
          { id: 'overview', label: 'Overview', icon: <FiCompass /> },
          { id: 'content', label: 'Content Manager', icon: <FiActivity /> },
          { id: 'analytics', label: 'Advanced Analytics', icon: <FiBarChart2 /> },
          { id: 'monetization', label: 'Monetization', icon: <FiDollarSign /> },
          { id: 'schedule', label: 'Schedule Post', icon: <FiCalendar /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            className={`studio-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Studio Dynamic Area */}
      <div className="studio-content-viewport">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="overview-tab-view"
            >
              <div className="dashboard-metrics-grid">
                <div className="metric-box-card card">
                  <div className="box-header">
                    <span>Total Reach</span>
                    <FiUsers size={16} className="text-brand" />
                  </div>
                  <h2>{overviewStats.reach.toLocaleString()}</h2>
                  <span className="box-trend positive">+12% (vs last period)</span>
                </div>

                <div className="metric-box-card card">
                  <div className="box-header">
                    <span>Average Watch Time</span>
                    <FiClock size={16} className="text-brand" />
                  </div>
                  <h2>{(overviewStats.watchTime / 1000).toFixed(1)} mins</h2>
                  <span className="box-trend positive">+8% (vs last period)</span>
                </div>

                <div className="metric-box-card card">
                  <div className="box-header">
                    <span>Video Views</span>
                    <FiEye size={16} className="text-brand" />
                  </div>
                  <h2>{overviewStats.videoViews.toLocaleString()}</h2>
                  <span className="box-trend positive">+{overviewStats.engagementRate}% engagement</span>
                </div>

                <div className="metric-box-card card">
                  <div className="box-header">
                    <span>Estimated Revenue</span>
                    <FiDollarSign size={16} className="text-brand" />
                  </div>
                  <h2>${(overviewStats.watchTime * 0.3).toFixed(2)}</h2>
                  <span className="box-trend positive">{(overviewStats.watchTime * 3).toLocaleString()} Gold Coins</span>
                </div>
              </div>

              {/* Performance charts summary overlay */}
              <div className="overview-performance-split">
                <div className="performance-chart-card card">
                  <h3>🔥 Top Performing Posts</h3>
                  <div className="perform-list">
                    {contents.slice(0, 3).map((item) => (
                      <div key={item.id} className="perform-row">
                        <div className="perform-details">
                          <span className="perform-title">{item.title}</span>
                          <span className="perform-type">{item.type.toUpperCase()}</span>
                        </div>
                        <div className="perform-stat">
                          <span className="stat-num">{item.reach.toLocaleString()}</span>
                          <span className="stat-lbl">reach</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audience Location Map Vector representation */}
                <div className="performance-chart-card card">
                  <h3>💡 Audience Demographics</h3>
                  <div className="demo-progress-tray">
                    {audienceData.topLocations.slice(0, 3).map((loc, i) => (
                      <div key={i} className="demo-row">
                        <span>{loc.name}</span>
                        <div className="demo-bar"><div className="fill" style={{ width: `${loc.percentage}%` }} /></div>
                        <span>{loc.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CONTENT MANAGER */}
          {activeTab === 'content' && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="content-tab-view card"
            >
              <div className="card-header-row">
                <h2>Content Manager</h2>
                <span className="sub-count">{contents.length} Total items</span>
              </div>

              <div className="table-responsive-wrapper">
                <table className="studio-content-table">
                  <thead>
                    <tr>
                      <th>Title/Preview</th>
                      <th>Type</th>
                      <th>Reach</th>
                      <th>Engagement</th>
                      <th>Scheduled/Published Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contents.map((item) => (
                      <tr key={item.id}>
                        <td className="table-title-cell">{item.title}</td>
                        <td><span className={`type-pill ${item.type}`}>{item.type}</span></td>
                        <td>{item.reach.toLocaleString()}</td>
                        <td>{item.engagement}</td>
                        <td>{item.date}</td>
                        <td><span className={`status-pill ${item.status}`}>{item.status}</span></td>
                        <td>
                          <button 
                            className="btn btn-sm btn-danger-action"
                            onClick={() => deleteContent(item.id)}
                            title="Delete Content"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ADVANCED CREATOR ANALYTICS (Recharts-powered) */}
          {activeTab === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="analytics-tab-view"
            >
              <div className="analytics-details-layout" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 1. Followers History (LineChart) */}
                <div className="full-performance-graph card" style={{ padding: '24px', minHeight: '360px' }}>
                  <h3 style={{ marginBottom: '20px' }}>📈 Subscriber Growth Trends</h3>
                  <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={audienceData.followersHistory}>
                        <defs>
                          <linearGradient id="colorFollow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F7B928" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#F7B928" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" stroke="var(--text-secondary)" />
                        <YAxis stroke="var(--text-secondary)" />
                        <Tooltip contentStyle={{ backgroundColor: '#1c1e21', borderColor: 'var(--border-color)', color: '#fff' }} />
                        <Area type="monotone" dataKey="count" stroke="#F7B928" strokeWidth={3} fillOpacity={1} fill="url(#colorFollow)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Demographics Split Grid */}
                <div className="device-source-split-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  
                  {/* Age Distribution (BarChart) */}
                  <div className="card" style={{ padding: '24px', minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '16px' }}>👥 Age Groups Anonymized</h3>
                    <div style={{ width: '100%', height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={audienceData.ageGroups}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="name" stroke="var(--text-secondary)" />
                          <YAxis stroke="var(--text-secondary)" />
                          <Tooltip contentStyle={{ backgroundColor: '#1c1e21', borderColor: 'var(--border-color)', color: '#fff' }} />
                          <Bar dataKey="percentage" fill="#F7B928" radius={[4, 4, 0, 0]}>
                            {audienceData.ageGroups.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Gender Distribution (PieChart) */}
                  <div className="card" style={{ padding: '24px', minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '16px' }}>⚧️ Gender Distribution</h3>
                    <div style={{ width: '100%', height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={audienceData.genderDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {audienceData.genderDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1c1e21', borderColor: 'var(--border-color)', color: '#fff' }} />
                          <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>

                {/* 3. Referrer & Locations Grid */}
                <div className="device-source-split-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  
                  {/* Top Countries (Horizontal BarChart) */}
                  <div className="card" style={{ padding: '24px', minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '16px' }}>🌍 Top Countries</h3>
                    <div style={{ width: '100%', height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={audienceData.topLocations}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis type="number" stroke="var(--text-secondary)" />
                          <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" width={90} />
                          <Tooltip contentStyle={{ backgroundColor: '#1c1e21', borderColor: 'var(--border-color)', color: '#fff' }} />
                          <Bar dataKey="percentage" fill="#F7B928" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Device breakdown */}
                  <div className="card" style={{ padding: '24px', minHeight: '300px' }}>
                    <h3 style={{ marginBottom: '16px' }}>💻 Device Breakdown</h3>
                    <div style={{ width: '100%', height: 200 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={audienceData.devices.map(d => ({ name: d.name, value: d.percentage }))}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            {audienceData.devices.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index + 2 % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1c1e21', borderColor: 'var(--border-color)', color: '#fff' }} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>

                {/* 4. Interactive Video Analytics & Audience Retention */}
                <div className="video-specific-analytics-card card" style={{ padding: '24px', minHeight: '360px' }}>
                  <div className="video-analytics-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3>🎥 Video Retention & Performance</h3>
                    <select 
                      value={selectedVideoId} 
                      onChange={(e) => setSelectedVideoId(e.target.value)}
                      style={{
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-color)',
                        padding: '8px 16px',
                        color: 'var(--text-primary)',
                        borderRadius: '8px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {contents.filter(c => c.type === 'video' || c.type === 'reel').map(v => (
                        <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Video Metrics Strip */}
                  <div className="video-metrics-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Avg View Duration</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--brand-primary)' }}>{videoAnalytics.avgViewDuration}</h4>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Watch Percentage</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--brand-primary)' }}>{videoAnalytics.avgViewPercentage}%</h4>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Thumbnail CTR</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', color: 'var(--brand-primary)' }}>{videoAnalytics.thumbnailCTR}%</h4>
                    </div>
                  </div>

                  {/* Retention Curve Graph (AreaChart) */}
                  <div style={{ width: '100%', height: 260 }}>
                    <h4 style={{ fontSize: '0.9375rem', marginBottom: '12px', fontWeight: 700 }}>Audience Retention Curve</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={videoAnalytics.retentionCurve}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="time" stroke="var(--text-secondary)" />
                        <YAxis stroke="var(--text-secondary)" domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#1c1e21', borderColor: 'var(--border-color)', color: '#fff' }} />
                        <Area type="monotone" dataKey="value" stroke="#F7B928" fill="rgba(247, 185, 40, 0.08)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 5. Best Day & Time Heatmap */}
                <div className="heatmap-analytics-card card" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px' }}>🔥 Heatmap: Best Day & Time to Post</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Visual representation of audience engagement density based on historical action points.
                  </p>

                  <div className="heatmap-grid-layout" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                      <thead>
                        <tr>
                          <th></th>
                          {heatmapHours.map((hour, idx) => (
                            <th key={idx} style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{hour}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {heatmapWeeks.map((day, idx) => (
                          <tr key={idx}>
                            <td style={{ padding: '8px', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', width: 100 }}>{day}</td>
                            {heatmapData[day].map((score, hIdx) => {
                              // Color opacity based on score (0 - 100)
                              const opacity = (score / 100) * 0.95;
                              return (
                                <td 
                                  key={hIdx} 
                                  style={{
                                    padding: '8px',
                                    textAlign: 'center'
                                  }}
                                >
                                  <div 
                                    style={{
                                      backgroundColor: `rgba(247, 185, 40, ${opacity})`,
                                      color: score > 60 ? '#000' : 'var(--text-primary)',
                                      borderRadius: '4px',
                                      padding: '12px 6px',
                                      fontSize: '0.75rem',
                                      fontWeight: 800,
                                      border: score > 90 ? '2px solid #FFF' : '1px solid rgba(255,255,255,0.05)',
                                      boxShadow: score > 90 ? '0 0 10px rgba(247, 185, 40, 0.4)' : 'none',
                                      transition: 'all 0.2s ease',
                                      cursor: 'pointer'
                                    }}
                                    title={`Score: ${score}% engagement density`}
                                  >
                                    {score}%
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 4: MONETIZATION */}
          {activeTab === 'monetization' && (
            <motion.div 
              key="monetization"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="monetization-tab-view"
            >
              <div className="monetization-grid-split">
                
                {/* Creator Program forms */}
                <div className="monetize-card card">
                  <div className="card-top-icon">
                    <FiDollarSign size={28} className="monetize-icon-yellow" />
                    <h2>Gold Tip Monetization</h2>
                  </div>
                  <p>Enable direct profile tips! Visitors will see a tipping action bar allowing them to send you custom gold coin increments.</p>

                  <div className="form-toggle-row">
                    <span>Enable Tips Feature</span>
                    <label className="switch-control">
                      <input 
                        type="checkbox" 
                        checked={enableTips} 
                        onChange={(e) => setEnableTips(e.target.checked)} 
                      />
                      <span className="slider-round"></span>
                    </label>
                  </div>

                  {enableTips && (
                    <div className="tipping-presets-config mt-3 animate-fadeIn">
                      <label>Set Default Tip Tier ($)</label>
                      <input 
                        type="number" 
                        value={supportTier} 
                        onChange={(e) => setSupportTier(e.target.value)} 
                        placeholder="e.g. 5.00" 
                      />
                    </div>
                  )}
                </div>

                {/* Verified badge applications */}
                <div className="monetize-card card">
                  <div className="card-top-icon">
                    <FiCheckCircle size={28} className="monetize-icon-yellow" />
                    <h2>Verified Creator Badge</h2>
                  </div>
                  <p>Receive the exclusive golden verified badge on your handle by applying for our premium creator program verification audit.</p>

                  <button 
                    className={`apply-verified-btn ${badgeApplied ? 'applied' : ''}`}
                    onClick={() => setBadgeApplied(true)}
                    disabled={badgeApplied}
                  >
                    {badgeApplied ? 'Verification Review Pending' : 'Apply for Verified Badge'}
                  </button>
                </div>

                {/* Coin conversions */}
                <div className="monetize-card card full-width">
                  <h2>💰 Gold Coins conversion drawer</h2>
                  <p>Exchange your accumulated gold coins directly into real payout balance ($1.00 USD = 100 gold coins).</p>

                  <div className="convert-row-calculator">
                    <div className="calc-input">
                      <span>Gold Coins:</span>
                      <input 
                        type="number" 
                        value={coinsReward} 
                        onChange={(e) => setCoinsReward(e.target.value)} 
                      />
                    </div>

                    <div className="calc-output">
                      <span>Payout Sum:</span>
                      <h3>${(parseFloat(coinsReward || '0') / 100).toFixed(2)} USD</h3>
                    </div>
                  </div>

                  <button className="convert-coins-submit-btn" onClick={() => setShowPayoutHistory(true)}>
                    Convert Gold Coins & Initiate Payout
                  </button>

                  {showPayoutHistory && (
                    <div className="payout-history-table mt-4 animate-fadeIn">
                      <h4>Recent Payout Activities</h4>
                      <div className="payout-row">
                        <span>2026-05-19</span>
                        <span>Converted 500 Coins</span>
                        <span>$5.00 USD</span>
                        <span className="success-badge">Completed</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 5: SCHEDULER CALENDAR */}
          {activeTab === 'schedule' && (
            <motion.div 
              key="schedule"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="schedule-tab-view"
            >
              <div className="scheduler-split-grid">
                
                {/* Schedule builder form */}
                <div className="scheduler-form-card card">
                  <h3>📅 Schedule New Post</h3>
                  <form onSubmit={scheduleNewPost} className="studio-schedule-form">
                    <div className="form-group">
                      <label>Publication Title/Content Summary</label>
                      <input 
                        type="text" 
                        value={newScheduleTitle}
                        onChange={(e) => setNewScheduleTitle(e.target.value)}
                        placeholder="e.g. Unveiling advanced WebRTC custom endpoints..."
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Target Publication Date</label>
                      <input 
                        type="date"
                        value={newScheduleDate}
                        onChange={(e) => setNewScheduleDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>

                    <button type="submit" className="schedule-submit-action-btn">
                      <FiPlus />
                      <span>Register Scheduled Post</span>
                    </button>
                  </form>
                </div>

                {/* Calendar feed lists */}
                <div className="scheduler-calendar-card card">
                  <h3>🗓️ Scheduled Content calendar</h3>
                  <div className="scheduled-calendar-list">
                    {scheduledPosts.map((event, i) => (
                      <div key={i} className="calendar-event-row">
                        <div className="event-date-block">
                          <span className="date-day">{event.date.split('-')[2]}</span>
                          <span className="date-month">MAY</span>
                        </div>

                        <div className="event-details-block">
                          <h4>{event.title}</h4>
                          <span className="event-type-pill">{event.type.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default CreatorStudio;
