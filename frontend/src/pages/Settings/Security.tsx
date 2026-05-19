import React, { useState, useEffect } from 'react';
import { FiLock, FiSmartphone, FiGlobe, FiAlertTriangle, FiDownload, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../services/api';
import './Security.css';

const Security: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [exportRequests, setExportRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAStep, setTwoFAStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionRes, exportRes] = await Promise.all([
          api.get('/auth/sessions'),
          api.get('/data-export/status')
        ]);
        setSessions(sessionRes.data);
        setExportRequests(exportRes.data);
      } catch (err) {
        console.error('Failed to fetch security data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRevokeSession = async (id: string) => {
    try {
      await api.delete(`/auth/sessions/${id}`);
      setSessions(sessions.filter(s => s._id !== id));
    } catch (err) {
      console.error('Failed to revoke session', err);
    }
  };

  const handleRequestExport = async () => {
    setExporting(true);
    try {
      const res = await api.post('/data-export/request', {
        dataTypes: ['Posts', 'Comments', 'Messages', 'Profile', 'Friends']
      });
      setExportRequests([res.data, ...exportRequests]);
    } catch (err) {
      console.error('Failed to request export', err);
    } finally {
      setExporting(false);
    }
  };

  if (loading) return <div className="security-loading">Loading security settings...</div>;

  return (
    <div className="security-page">
      <Navbar />
      <div className="security-container">
        <header className="security-header">
          <h1>Security & Privacy</h1>
          <p>Manage your account security, active sessions, and data portability.</p>
        </header>

        <div className="security-grid">
          {/* Active Sessions */}
          <section className="security-section card">
            <div className="section-title">
              <FiSmartphone />
              <h3>Active Sessions</h3>
            </div>
            <p className="section-desc">These are the devices and browsers currently logged into your account.</p>
            
            <div className="sessions-list">
              {sessions.map((session) => (
                <div key={session._id} className="session-item">
                  <div className="session-icon">
                    {session.device.includes('Mobile') ? <FiSmartphone /> : <FiGlobe />}
                  </div>
                  <div className="session-info">
                    <div className="session-device">{session.device} • {session.browser}</div>
                    <div className="session-meta">
                      {session.ipAddress} • {new Date(session.loginAt).toLocaleString()}
                      {session.isActive && <span className="active-badge">Active now</span>}
                    </div>
                  </div>
                  <button className="revoke-btn" onClick={() => handleRevokeSession(session._id)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Data Portability */}
          <section className="security-section card">
            <div className="section-title">
              <FiDownload />
              <h3>Download Your Information</h3>
            </div>
            <p className="section-desc">Request a copy of your MindBook data. This includes your posts, messages, and profile info.</p>
            
            <button 
              className="btn-primary request-export-btn" 
              onClick={handleRequestExport}
              disabled={exporting || exportRequests.some(r => r.status === 'Pending' || r.status === 'Processing')}
            >
              {exporting ? 'Requesting...' : 'Request New Export'}
            </button>

            <div className="export-history">
              <h4>Export History</h4>
              {exportRequests.length === 0 ? (
                <p className="no-history">No previous export requests.</p>
              ) : (
                <div className="export-list">
                  {exportRequests.map((req) => (
                    <div key={req._id} className="export-item">
                      <div className="export-info">
                        <div className="export-status">
                          {req.status === 'Completed' ? <FiCheckCircle className="text-success" /> : <FiAlertTriangle className="text-warning" />}
                          {req.status}
                        </div>
                        <div className="export-date">Requested: {new Date(req.requestedAt).toLocaleDateString()}</div>
                      </div>
                      {req.status === 'Completed' && (
                        <a 
                          href={`${import.meta.env.VITE_API_URL ?? ''}${req.downloadUrl}`} 
                          className="download-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiDownload /> Download
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Account Protection */}
          <section className="security-section card">
            <div className="section-title">
              <FiLock />
              <h3>Account Protection</h3>
            </div>
            <div className="protection-options">
              <div className="protection-item">
                <div className="item-text">
                  <h5>Two-Factor Authentication</h5>
                  <p>Add an extra layer of security to your account.</p>
                </div>
                <button className="btn-secondary" onClick={() => setShow2FAModal(true)}>Setup</button>
              </div>
              <div className="protection-item">
                <div className="item-text">
                  <h5>Login Alerts</h5>
                  <p>Get notified when someone logs into your account from a new device.</p>
                </div>
                <div className="toggle-switch">
                  <input type="checkbox" id="login-alerts" defaultChecked />
                  <label htmlFor="login-alerts"></label>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {show2FAModal && (
        <div className="media-preview-overlay">
          <div className="media-preview-container" style={{ padding: '24px', maxWidth: '400px' }}>
            <div className="preview-header" style={{ padding: 0, borderBottom: 'none', marginBottom: '16px' }}>
              <h3>Setup 2FA</h3>
              <button className="close-btn" onClick={() => setShow2FAModal(false)}>✕</button>
            </div>
            {twoFAStep === 1 && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc).
                </p>
                <div style={{ width: '200px', height: '200px', backgroundColor: '#fff', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/MindBook:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=MindBook" alt="QR Code" />
                </div>
                <p style={{ fontSize: '14px', fontFamily: 'monospace', background: 'var(--bg-input)', padding: '8px', borderRadius: '4px' }}>
                  JBSWY3DPEHPK3PXP
                </p>
                <button className="btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={() => setTwoFAStep(2)}>
                  Next Step
                </button>
              </div>
            )}
            {twoFAStep === 2 && (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Enter the 6-digit code from your authenticator app.
                </p>
                <input 
                  type="text" 
                  placeholder="000000" 
                  maxLength={6}
                  style={{ width: '100%', padding: '12px', textAlign: 'center', fontSize: '24px', letterSpacing: '8px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                />
                <button className="btn-primary" style={{ width: '100%', marginTop: '24px' }} onClick={() => setTwoFAStep(3)}>
                  Verify Code
                </button>
              </div>
            )}
            {twoFAStep === 3 && (
              <div style={{ textAlign: 'center' }}>
                <FiCheckCircle size={48} color="var(--brand-primary)" style={{ marginBottom: '16px' }} />
                <h3>2FA Enabled!</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Save these backup codes in a safe place.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'var(--bg-input)', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '24px' }}>
                  <span>4829-1934</span>
                  <span>9238-4821</span>
                  <span>1034-9238</span>
                  <span>8472-1023</span>
                  <span>3847-9201</span>
                  <span>8472-9182</span>
                  <span>3948-2910</span>
                  <span>9482-1029</span>
                </div>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShow2FAModal(false)}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
