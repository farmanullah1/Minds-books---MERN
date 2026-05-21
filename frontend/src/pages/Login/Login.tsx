/**
 * CodeDNA
 * Login.tsx — Premium split-panel login page
 * exports: none
 * used_by: internal
 * rules: Glassmorphism, split-panel layout, premium branding
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError } from '../../store/slices/authSlice';
import { FiEye, FiEyeOff, FiZap, FiShield, FiGlobe, FiUsers } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import './Auth.css';

const FEATURES = [
  { icon: <FiZap />, title: 'Real-time connections', desc: 'Live notifications, messaging, and activity feeds' },
  { icon: <FiShield />, title: 'Privacy-first', desc: 'Granular controls over everything you share' },
  { icon: <FiGlobe />, title: 'Rich communities', desc: 'Groups, events, and meaningful conversations' },
  { icon: <FiUsers />, title: 'Built for everyone', desc: 'Premium experience from first login to last post' },
];

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    const result = await dispatch(loginUser({ email: email.trim(), password }));
    if (loginUser.fulfilled.match(result)) navigate('/');
  };

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-split-layout">
        {/* ── Left Brand Panel ── */}
        <div className="auth-brand-panel">
          <div className="brand-panel-blur-bg" />
          
          <div className="brand-panel-content">
            {/* Logo */}
            <div className="brand-logo-group">
              <div className="brand-logo-circle">
                <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="url(#loginLogoGrad)" />
                  <defs>
                    <linearGradient id="loginLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F7B928" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                  <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">M</text>
                </svg>
              </div>
              <span className="brand-name-text">MindBook</span>
            </div>

            <h2 className="brand-headline">
              Connect with people<br />
              <span className="brand-headline-gold">who inspire you.</span>
            </h2>

            <p className="brand-sub">
              Over 10,000 creators, thinkers, and dreamers already on the platform.
            </p>

            {/* Feature list */}
            <div className="brand-features">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  className="brand-feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * i, duration: 0.4 }}
                >
                  <span className="brand-feature-icon">{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative orbs */}
          <div className="brand-orb orb-1" />
          <div className="brand-orb orb-2" />
        </div>

        {/* ── Right Form Panel ── */}
        <div className="auth-form-panel">
          <motion.div
            className="auth-form-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="auth-card-header">
              <h1>Welcome back 👋</h1>
              <p>Log in to continue to MindBook</p>
            </div>

            <form className="auth-form" onSubmit={handleLogin}>
              {error && <div className="auth-error">{error}</div>}

              <div className="input-group">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  className="input-field-modern"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field-modern"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" className="pw-eye-modern" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me + Forgot password row */}
              <div className="auth-options-row">
                <label className="auth-checkbox-modern">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="forgot-password">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="auth-btn-primary"
                disabled={loading || !email.trim() || !password.trim()}
              >
                {loading ? 'Logging in...' : 'Log In →'}
              </button>

              {/* Demo credentials */}
              <div className="demo-credentials">
                <p>👨‍💻 Demo: <strong>farman@mindbook.com</strong> / <strong>Password123</strong></p>
                <p>🛡️ Admin: <strong>admin@mindbook.com</strong> / <strong>Admin@123456</strong></p>
              </div>

              <div className="auth-divider">or</div>

              {/* Social login buttons (visual) */}
              <div className="social-login-row">
                <button type="button" className="social-btn social-google">
                  <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.3 9.2 3.4l6.8-6.8C35.9 2.3 30.3 0 24 0 14.8 0 6.9 5.4 3 13.3l8 6.2C12.9 13.3 18 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.4c-.5 2.7-2.1 5-4.4 6.5l6.9 5.4C42.6 36.8 46.1 31.1 46.1 24.5z"/><path fill="#FBBC05" d="M11 28.5c-.7-2-1-4.2-1-6.5s.4-4.5 1-6.5l-8-6.2C1.1 13.1 0 18.4 0 24s1.1 10.9 3 15.7l8-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-6.9-5.4c-2.1 1.4-4.8 2.2-9.1 2.2-6 0-11.1-4-12.9-9.5l-8 6.2C6.9 42.6 14.8 48 24 48z"/></svg>
                  Continue with Google
                </button>
                <button type="button" className="social-btn social-github">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  Continue with GitHub
                </button>
              </div>

              <div className="auth-footer-links" style={{ textAlign: 'center', marginTop: '16px' }}>
                <span className="text-secondary">Don't have an account? </span>
                <Link to="/register" className="auth-link-inline">Create one →</Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
