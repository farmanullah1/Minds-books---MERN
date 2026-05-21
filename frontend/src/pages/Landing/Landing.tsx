import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { FiArrowRight, FiMessageSquare, FiVideo, FiPlayCircle, FiBriefcase, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Landing.css';

const Landing: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

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

  return (
    <div className="landing-page">
      {/* Dynamic Animated Background */}
      <div className="landing-bg-mesh">
        <div className="bg-blob blob-1" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="bg-blob blob-2" style={{ transform: `translateY(${scrollY * -0.1}px)` }} />
        <div className="bg-blob blob-3" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        <div className="network-grid" />
      </div>

      {/* Navbar (Transparent -> Glassmorphic) */}
      <nav className={`landing-nav ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="landing-nav-logo">
          <div className="logo-circle">M</div>
          <span>MindBook</span>
        </div>
        <div className="landing-nav-links">
          <Link to="/about-mindbook">About</Link>
          <Link to="/why-mindbook">Why MindBook</Link>
          <Link to="/meet-the-creator">Creator</Link>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="btn-login-ghost">Log In</Link>
          <Link to="/register" className="btn-signup-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="char-anim" style={{ animationDelay: '0.1s' }}>M</span>
            <span className="char-anim" style={{ animationDelay: '0.15s' }}>i</span>
            <span className="char-anim" style={{ animationDelay: '0.2s' }}>n</span>
            <span className="char-anim" style={{ animationDelay: '0.25s' }}>d</span>
            <span className="char-anim" style={{ animationDelay: '0.3s' }}>B</span>
            <span className="char-anim" style={{ animationDelay: '0.35s' }}>o</span>
            <span className="char-anim" style={{ animationDelay: '0.4s' }}>o</span>
            <span className="char-anim" style={{ animationDelay: '0.45s' }}>k</span>
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
        <div className="hero-visual" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
          <div className="mockup-card mockup-chat">
            <div className="mockup-header">
              <div className="mockup-dot red"></div>
              <div className="mockup-dot yellow"></div>
              <div className="mockup-dot green"></div>
            </div>
            <div className="mockup-body">
              <div className="chat-bubble receive">Hey! Did you see the new video?</div>
              <div className="chat-bubble send">Yes! The UI looks amazing 🚀</div>
              <div className="chat-bubble receive">Let's start a watch party! 🍿</div>
            </div>
          </div>
          <div className="mockup-card mockup-feed">
            <div className="mockup-feed-header">
              <div className="mockup-avatar"></div>
              <div className="mockup-text-lines">
                <div className="line short"></div>
                <div className="line long"></div>
              </div>
            </div>
            <div className="mockup-feed-image"></div>
            <div className="mockup-feed-actions">
              <div className="action-btn"></div>
              <div className="action-btn"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Showcase Rows */}
      <section className="landing-features">
        
        {/* Feature 1 */}
        <div className="feature-row">
          <div className="feature-text">
            <div className="feature-icon"><FiMessageSquare size={32} /></div>
            <h2>Your world in one feed</h2>
            <p>Experience a hyper-personalized, algorithm-free chronological feed. Share high-fidelity photos, rich text, and real-time polls seamlessly with your friends and groups.</p>
          </div>
          <div className="feature-visual feature-visual-1">
            <div className="visual-abstract feed-abstract"></div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="feature-row reverse">
          <div className="feature-text">
            <div className="feature-icon"><FiPlayCircle size={32} /></div>
            <h2>Watch everything in one place</h2>
            <p>From native 4K video uploads to seamless YouTube integration. Start Watch Parties, scroll endless Reels, and discover live streams curated just for you.</p>
          </div>
          <div className="feature-visual feature-visual-2">
            <div className="visual-abstract video-abstract"></div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="feature-row">
          <div className="feature-text">
            <div className="feature-icon"><FiVideo size={32} /></div>
            <h2>Real-time conversations</h2>
            <p>Instant messaging powered by low-latency sockets. Hop into crystal-clear WebRTC voice and video calls directly from your browser without any plugins.</p>
          </div>
          <div className="feature-visual feature-visual-3">
            <div className="visual-abstract chat-abstract"></div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="feature-row reverse">
          <div className="feature-text">
            <div className="feature-icon"><FiBriefcase size={32} /></div>
            <h2>Grow professionally</h2>
            <p>Build your digital portfolio, showcase your technical skills, endorse peers, and apply to premium job boards all within the MindBook ecosystem.</p>
          </div>
          <div className="feature-visual feature-visual-4">
            <div className="visual-abstract job-abstract"></div>
          </div>
        </div>
      </section>

      {/* Social Proof & Tech Stack */}
      <section className="landing-proof">
        <h2>Built with Enterprise-Grade Technology</h2>
        <p>A solo developer's showcase of modern scalable web architecture.</p>
        
        <div className="tech-logos-grid">
          <div className="tech-logo">MongoDB</div>
          <div className="tech-logo">Express.js</div>
          <div className="tech-logo">React 18</div>
          <div className="tech-logo">Node.js</div>
          <div className="tech-logo">Socket.IO</div>
          <div className="tech-logo">WebRTC</div>
          <div className="tech-logo">Claude AI</div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="landing-cta-bottom">
        <h2>Ready to join the revolution?</h2>
        <p>Create your free account today and start connecting.</p>
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
          
          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/watch">Video Hub</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about-mindbook">About MindBook</Link>
            <Link to="/why-mindbook">Why I Built This</Link>
            <Link to="/meet-the-creator">Meet the Creator</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/community-guidelines">Community Guidelines</Link>
            <Link to="/help-center">Help Center</Link>
          </div>
        </div>
        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
          <p>© 2026 MindBook · Created by Farmanullah Ansari</p>
          <div className="footer-bottom-links" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', fontWeight: 600 }}>Portfolio</a>
            <span style={{ color: 'var(--text-tertiary)' }}>·</span>
            <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', fontWeight: 600 }}>LinkedIn</a>
            <span style={{ color: 'var(--text-tertiary)' }}>·</span>
            <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand)', fontWeight: 600 }}>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
