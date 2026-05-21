import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { useTheme } from '../../context/ThemeContext';
import { 
  FiArrowRight, 
  FiMessageSquare, 
  FiVideo, 
  FiPlayCircle, 
  FiBriefcase, 
  FiGithub, 
  FiLinkedin,
  FiHeart,
  FiCpu,
  FiMic,
  FiAward,
  FiThumbsUp,
  FiSun,
  FiMoon
} from 'react-icons/fi';
import './Landing.css';

import Navbar from '../../components/Navbar/Navbar';

const Landing: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'video' | 'audio' | 'pro'>('all');
  const [endorseCount, setEndorseCount] = useState(24);
  const [hasEndorsed, setHasEndorsed] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, navigate]);

  const handleEndorse = () => {
    if (!hasEndorsed) {
      setEndorseCount(prev => prev + 1);
      setHasEndorsed(true);
    } else {
      setEndorseCount(prev => prev - 1);
      setHasEndorsed(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Dynamic Animated Background */}
      <div className="landing-bg-mesh">
        <div className="bg-blob blob-1" style={{ transform: `translateY(${scrollY * 0.12}px)` }} />
        <div className="bg-blob blob-2" style={{ transform: `translateY(${scrollY * -0.08}px)` }} />
        <div className="bg-blob blob-3" style={{ transform: `translateY(${scrollY * 0.04}px)` }} />
        <div className="network-grid" />
      </div>

      {/* Unified Global Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            MindBook Social Ecosystem v7.1
          </div>
          <h1 className="hero-title">
            <span className="char-anim" style={{ animationDelay: '0.05s' }}>M</span>
            <span className="char-anim" style={{ animationDelay: '0.1s' }}>i</span>
            <span className="char-anim" style={{ animationDelay: '0.15s' }}>n</span>
            <span className="char-anim" style={{ animationDelay: '0.2s' }}>d</span>
            <span className="char-anim" style={{ animationDelay: '0.25s' }}>B</span>
            <span className="char-anim" style={{ animationDelay: '0.3s' }}>o</span>
            <span className="char-anim" style={{ animationDelay: '0.35s' }}>o</span>
            <span className="char-anim" style={{ animationDelay: '0.4s' }}>k</span>
          </h1>
          <h2 className="hero-subtitle">Connect. Create. Belong.</h2>
          <p className="hero-description">
            Experience the next generation of social networking. A premium, ad-free platform built to bring communities together through seamless video, real-time messaging, and immersive interactions.
          </p>
          <div className="hero-ctas">
            <Link to="/register" className="btn-hero-primary">
              Join the Community <FiArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn-hero-secondary">
              Log In to Account
            </Link>
          </div>
        </div>
        
        {/* Floating Mockup Visualization */}
        <div className="hero-visual" style={{ transform: `translateY(${scrollY * 0.15}px)` }}>
          <div className="mockup-card mockup-chat">
            <div className="mockup-header">
              <div className="mockup-dot red"></div>
              <div className="mockup-dot yellow"></div>
              <div className="mockup-dot green"></div>
              <span className="mockup-title">Direct Message</span>
            </div>
            <div className="mockup-body">
              <div className="mockup-user-bar">
                <div className="mockup-avatar avatar-active">FA</div>
                <div className="mockup-user-info">
                  <h4>Farmanullah Ansari</h4>
                  <p>Active Now</p>
                </div>
              </div>
              <div className="chat-bubble receive">Hey! Did you see the new video?</div>
              <div className="chat-bubble send">Yes! The UI looks amazing 🚀</div>
              <div className="chat-bubble receive">Let's start a watch party! 🍿</div>
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
          <div className="mockup-card mockup-feed">
            <div className="mockup-feed-header">
              <div className="mockup-avatar avatar-accent">MB</div>
              <div className="mockup-text-lines">
                <h4>MindBook Admin</h4>
                <p>Just now · 🌎 Public</p>
              </div>
            </div>
            <div className="mockup-feed-content">
              <p>Welcome to **MindBook v7.1**! Explore 3D stardust coins, WebRTC video calling, custom filters, and active audio space stages.</p>
            </div>
            <div className="mockup-feed-preview-media">
              <div className="media-overlay-tag">Wallet Store</div>
            </div>
            <div className="mockup-feed-stats">
              <div className="stats-left">
                <span className="stat-emoji-circle">💖</span>
                <span className="stat-emoji-circle">👍</span>
                <span>Farmanullah and 42 others</span>
              </div>
              <span className="stat-right">12 Comments</span>
            </div>
            <div className="mockup-feed-actions">
              <div className="action-btn"><FiThumbsUp /> Like</div>
              <div className="action-btn active-yellow"><FiHeart /> Love</div>
              <div className="action-btn"><FiMessageSquare /> Comment</div>
            </div>
          </div>
          <div className="mockup-card mockup-wallet">
            <div className="wallet-card-header">
              <h4>Digital Wallet</h4>
              <div className="gold-coin-glow">M</div>
            </div>
            <div className="wallet-card-balance">
              <p>Active Balance</p>
              <h3>550.00 <span className="coin-label">Gold Coins</span></h3>
            </div>
            <div className="wallet-card-activity">
              <div className="activity-row">
                <span className="activity-icon green">+</span>
                <div className="activity-details"><h5>Daily Login Claim</h5><p>Today · Earned</p></div>
                <span className="activity-value">+50.00</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Spotlight Interactive Section */}
      <section className="spotlight-section">
        <div className="section-header">
          <h2>Platform Interactive Spotlight</h2>
          <p>Get a direct, live feel of the custom workspaces and advanced features built inside MindBook.</p>
        </div>

        <div className="spotlight-tabs">
          <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All Highlights</button>
          <button className={activeTab === 'social' ? 'active' : ''} onClick={() => setActiveTab('social')}>Social Feed</button>
          <button className={activeTab === 'video' ? 'active' : ''} onClick={() => setActiveTab('video')}>Unified Video</button>
          <button className={activeTab === 'audio' ? 'active' : ''} onClick={() => setActiveTab('audio')}>Audio spaces</button>
          <button className={activeTab === 'pro' ? 'active' : ''} onClick={() => setActiveTab('pro')}>Portfolio Suite</button>
        </div>

        <div className="spotlight-grid">
          {(activeTab === 'all' || activeTab === 'social') && (
            <div className="spotlight-card">
              <div className="card-badge social">Social Feed</div>
              <div className="spotlight-card-body">
                <h3>Advanced Post Composer</h3>
                <p>Express yourself beautifully with a custom-built composer. Features legal agreements checklists, location pins, audience filters, and photo adjustments.</p>
                <div className="card-visual-wrapper">
                  <div className="composer-preview">
                    <div className="composer-header"><div className="avatar-circle">FA</div><div className="privacy-select"><span>🌎 Public Feed</span></div></div>
                    <textarea readOnly value="Working on the final MERN launch. MindBook is fully responsive and interactive!" />
                    <div className="composer-filter-tray">
                      <span className="filter-chip active">No Filter</span>
                      <span className="filter-chip chrome">Chrome</span>
                      <span className="filter-chip vintage">Vintage</span>
                    </div>
                    <div className="composer-bottom"><button className="tool-btn text-accent"><FiCpu /> Enhance with AI</button><button className="btn-post-publish">Post Feed</button></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'video') && (
            <div className="spotlight-card">
              <div className="card-badge video">Unified Video</div>
              <div className="spotlight-card-body">
                <h3>Vite Unified Watch Hub</h3>
                <p>Interleave native MP4 uploads and high-fidelity YouTube API embeddings. Complete with watch trackers and custom badges.</p>
                <div className="card-visual-wrapper">
                  <div className="video-hub-preview">
                    <div className="video-card-preview-media">
                      <span className="source-badge-item native">MINDBOOK</span>
                      <div className="play-button-overlay"><FiPlayCircle size={48} /></div>
                      <div className="video-card-progress-bar"><div className="progress-fill" style={{ width: '75%' }}></div></div>
                    </div>
                    <div className="video-card-info"><h4>Procedural 3D Gold Coin Animation Tutorial</h4><p>Farmanullah Ansari · 10k views</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'audio') && (
            <div className="spotlight-card">
              <div className="card-badge audio">Audio Spaces</div>
              <div className="spotlight-card-body">
                <h3>Live Audio Spaces Stage</h3>
                <p>Hop into WebRTC-powered voice rooms directly inside your browser. Features automated mic capture loops and speaker highlighting.</p>
                <div className="card-visual-wrapper">
                  <div className="audio-space-preview">
                    <div className="audio-space-header"><div className="spaces-live-tag">LIVE</div><h4>MERN Stack Scalability</h4></div>
                    <div className="speakers-grid-preview">
                      <div className="speaker-cell speaking"><div className="speaker-avatar-ring"><div className="speaker-avatar">FA</div></div><h5>Host</h5></div>
                      <div className="speaker-cell"><div className="speaker-avatar">JD</div><h5>John D</h5></div>
                    </div>
                    <div className="audio-space-controls-preview"><button className="space-mic-toggle muted"><FiMic /> Unmute</button><button className="space-leave-btn">Leave</button></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'pro') && (
            <div className="spotlight-card">
              <div className="card-badge pro">Professional Suite</div>
              <div className="spotlight-card-body">
                <h3>LinkedIn-style Portfolios</h3>
                <p>A full digital career timeline integrated into profiles. Verify credentials, review applicant pipelines, and endorse professional skills.</p>
                <div className="card-visual-wrapper">
                  <div className="pro-suite-preview">
                    <div className="portfolio-user-profile"><div className="portfolio-avatar">FA</div><h4>Farmanullah Ansari</h4></div>
                    <div className="skills-endorsement-block">
                      <div className="skill-row-preview">
                        <span className="skill-name-badge">React & TypeScript</span>
                        <div className="endorsement-trigger" onClick={handleEndorse}><span className="endorse-icon">👍</span><span className="endorse-count">{endorseCount}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Showcase Rows */}
      <section className="landing-features">
        <div className="section-header">
          <h2>Explore Core Platform Features</h2>
        </div>
        <div className="feature-row">
          <div className="feature-text">
            <div className="feature-icon"><FiMessageSquare size={32} /></div>
            <h2>Your world in one feed</h2>
            <p>Experience a hyper-personalized, algorithm-free chronological feed. Share high-fidelity photos, rich text, and real-time polls seamlessly with your friends and groups.</p>
          </div>
          <div className="feature-visual feature-visual-1">
            <div className="visual-card-glow"><h4>Advanced Composers</h4><p>Add scheduled unlocks, invite co-authors, and construct multichoice community questionnaires.</p></div>
          </div>
        </div>
        <div className="feature-row reverse">
          <div className="feature-text">
            <div className="feature-icon"><FiPlayCircle size={32} /></div>
            <h2>Watch everything in one place</h2>
            <p>From native 4K video uploads to seamless YouTube integration. Start Watch Parties, scroll endless Reels, and discover live streams curated just for you.</p>
          </div>
          <div className="feature-visual feature-visual-2">
            <div className="visual-card-glow"><h4>Lenis Snapping Reels</h4><p>Vertical reels snappers with continuous audio track rotation and custom trim intervals.</p></div>
          </div>
        </div>
        <div className="feature-row">
          <div className="feature-text">
            <div className="feature-icon"><FiVideo size={32} /></div>
            <h2>Real-time conversations</h2>
            <p>Instant messaging powered by low-latency sockets. Hop into crystal-clear WebRTC voice and video calls directly from your browser.</p>
          </div>
          <div className="feature-visual feature-visual-3">
            <div className="visual-card-glow"><h4>WebRTC Calling</h4><p>Signal direct WebRTC sessions with zero plugins. Integrated call logs and muting togglers.</p></div>
          </div>
        </div>
        <div className="feature-row reverse">
          <div className="feature-text">
            <div className="feature-icon"><FiBriefcase size={32} /></div>
            <h2>Grow professionally</h2>
            <p>Build your digital portfolio, showcase your technical skills, endorse peers, and apply to premium job boards all within the MindBook ecosystem.</p>
          </div>
          <div className="feature-visual feature-visual-4">
            <div className="visual-card-glow"><div className="timeline-badge-award"><FiAward /> Certified</div><h4>Portfolio System</h4><p>Showcase work samples, certs, skill lists, and apply instantly to verified job boards.</p></div>
          </div>
        </div>
      </section>

      {/* Social Proof & Tech Stack */}
      <section className="landing-proof">
        <h2>Built with Enterprise-Grade Technology</h2>
        <div className="tech-logos-grid">
          <div className="tech-logo">MongoDB</div><div className="tech-logo">Express.js</div>
          <div className="tech-logo">React 19</div><div className="tech-logo">Node.js</div>
          <div className="tech-logo">Socket.IO</div><div className="tech-logo">WebRTC</div>
          <div className="tech-logo">Gemini Pro AI</div><div className="tech-logo">Three.js</div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="landing-cta-bottom">
        <h2>Ready to join the social revolution?</h2>
        <Link to="/register" className="btn-hero-primary large">Create Free Account</Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="logo-circle small">M</div>
            <span className="brand-name">MindBook</span>
            <p>Connect. Create. Belong.</p>
            <div className="footer-socials">
              <a href="https://github.com/farmanullah1" target="_blank" rel="noreferrer"><FiGithub size={20}/></a>
              <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank" rel="noreferrer"><FiLinkedin size={20}/></a>
            </div>
          </div>
          <div className="footer-col"><h4>Platform</h4><Link to="/login">Log In</Link><Link to="/register">Sign Up</Link></div>
          <div className="footer-col"><h4>Company</h4><Link to="/about-mindbook">About</Link><Link to="/meet-the-creator">Creator</Link></div>
          <div className="footer-col"><h4>Legal</h4><Link to="/privacy-policy">Privacy</Link><Link to="/terms-of-service">Terms</Link></div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 MindBook · Created by Farmanullah Ansari</p>
          <div className="footer-bottom-links">
            <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <span style={{ color: 'var(--text-tertiary)' }}>·</span>
            <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span style={{ color: 'var(--text-tertiary)' }}>·</span>
            <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span style={{ color: 'var(--text-tertiary)' }}>·</span>
            <a href="mailto:farmanullahansari999@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
