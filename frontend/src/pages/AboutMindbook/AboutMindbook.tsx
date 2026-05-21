import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiGithub, FiMessageCircle, FiYoutube, FiVideo, FiCpu, FiMonitor, FiShield, FiLinkedin } from 'react-icons/fi';
import { DeveloperLinksFull } from '../../components/ui/DeveloperLinks';
import Navbar from '../../components/Navbar/Navbar';
import './AboutMindbook.css';

const FeatureCard = ({ icon: Icon, title, description, link, alignRight }: any) => {
  const const_InView = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const ref = const_InView.ref;
  const inView = const_InView.inView;

  return (
    <div ref={ref} className={`about-feature-card ${alignRight ? 'align-right' : ''} ${inView ? 'animate-in' : ''}`}>
      <div className="feature-visual">
        <div className="abstract-shape">
          <Icon size={64} />
        </div>
      </div>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} className="feature-link">Learn more <FiArrowRight /></Link>
      </div>
    </div>
  );
};

const TechIcon = ({ label, color }: any) => (
  <div className="tech-item" style={{ '--tech-color': color } as React.CSSProperties}>
    <div className="tech-orb"></div>
    <span className="tech-tooltip">{label}</span>
  </div>
);

const AboutMindbook: React.FC = () => {
  const const_HeroInView = useInView({ triggerOnce: true });
  const heroRef = const_HeroInView.ref;
  const heroInView = const_HeroInView.inView;

  const const_ArchInView = useInView({ triggerOnce: true, threshold: 0.3 });
  const archRef = const_ArchInView.ref;
  const archInView = const_ArchInView.inView;

  return (
    <div className="about-page">
      {/* Dynamic Background */}
      <div className="about-bg">
        <div className="about-grid"></div>
        <div className="about-glow"></div>
      </div>

      {/* Navbar Integration */}
      <Navbar />

      {/* Hero Section */}
      <header className={`about-hero ${heroInView ? 'animate-in' : ''}`} ref={heroRef}>
        <div className="hero-text">
          <h1 className="gradient-text">The Social Platform Reimagined.</h1>
          <div className="creator-badge-wrapper">
            <img src="/Profile%20Picture.jpg" alt="Farmanullah Ansari" className="creator-badge-img" />
            <p className="hero-subtitle" style={{ margin: 0 }}>Built by Farmanullah Ansari, Full Stack Software Engineer</p>
          </div>
          <div className="hero-ctas">
            <Link to="/register" className="btn-explore">Explore MindBook <FiArrowRight/></Link>
            <a href="https://github.com/farmanullah1" target="_blank" rel="noreferrer" className="btn-github">
              <FiGithub size={20}/> View on GitHub
            </a>
          </div>
          <div className="creator-links-cards" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noopener noreferrer" className="about-link-card" style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              color: 'white',
              transition: 'all 0.3s ease',
              flex: '1 1 200px',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '24px' }}>🌐</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>Portfolio</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textAlign: 'left' }}>View case studies & projects</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank" rel="noopener noreferrer" className="about-link-card" style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              color: 'white',
              transition: 'all 0.3s ease',
              flex: '1 1 200px',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '24px', color: '#0077b5', display: 'flex', alignItems: 'center' }}><FiLinkedin size={24}/></span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>LinkedIn</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textAlign: 'left' }}>Connect professionally</span>
              </div>
            </a>
            <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" className="about-link-card" style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              color: 'white',
              transition: 'all 0.3s ease',
              flex: '1 1 200px',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '24px', color: '#fff', display: 'flex', alignItems: 'center' }}><FiGithub size={24}/></span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>GitHub</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', textAlign: 'left' }}>Explore source code</span>
              </div>
            </a>
          </div>
          <DeveloperLinksFull />
        </div>
        
        {/* CSS 3D "M" Logo */}
        <div className="hero-3d-logo-container">
          <div className="css-3d-m">
            <div className="face front">M</div>
            <div className="face back">M</div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </header>

      {/* Features Showcase */}
      <section className="about-features-showcase">
        <div className="section-header">
          <h2>Core Capabilities</h2>
          <p>A unified experience without the algorithmic noise.</p>
        </div>

        <div className="features-container">
          <FeatureCard 
            icon={FiMessageCircle}
            title="Real-time Messaging"
            description="Lightning-fast chat powered by Socket.IO. Experience seamless communication with typing indicators, read receipts, and rich media sharing."
            link="/login"
            alignRight={false}
          />
          <FeatureCard 
            icon={FiYoutube}
            title="YouTube Integration"
            description="Watch any YouTube video natively within the platform. Curated video hub syncing your viewing preferences seamlessly."
            link="/watch"
            alignRight={true}
          />
          <FeatureCard 
            icon={FiVideo}
            title="Voice & Video Calls"
            description="Crystal clear WebRTC peer-to-peer calling. No plugins required—hop right into conversations directly from the browser."
            link="/login"
            alignRight={false}
          />
          <FeatureCard 
            icon={FiCpu}
            title="AI Chatbot (MindBot)"
            description="Your personal intelligent assistant integrated directly into your workflow. Powered by cutting-edge LLMs to help you ideate and connect."
            link="/login"
            alignRight={true}
          />
          <FeatureCard 
            icon={FiMonitor}
            title="Creator Studio"
            description="Deep analytics and content management tools built for power users. Understand your audience with visual metrics."
            link="/login"
            alignRight={false}
          />
          <FeatureCard 
            icon={FiShield}
            title="Admin Dashboard"
            description="A secure moderation and system administration suite to keep the community safe, compliant, and performing optimally."
            link="/login"
            alignRight={true}
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="about-tech-stack">
        <h2>Built with Modern Standards</h2>
        <p>Enterprise-grade technologies driving a premium user experience.</p>
        <div className="tech-orbitals">
          <TechIcon label="MongoDB" color="#47A248" />
          <TechIcon label="Express.js" color="#000000" />
          <TechIcon label="React 18" color="#61DAFB" />
          <TechIcon label="Node.js" color="#339933" />
          <TechIcon label="Socket.IO" color="#010101" />
          <TechIcon label="WebRTC" color="#333333" />
        </div>
      </section>

      {/* Architecture Section */}
      <section className={`about-architecture ${archInView ? 'animate-in' : ''}`} ref={archRef}>
        <h2>System Architecture</h2>
        <p>A high-level view of how MindBook operates under the hood.</p>
        
        <div className="architecture-diagram">
          <div className="arch-node client">
            <span className="node-label">Client Application</span>
            <span className="node-sub">React 18 / Zustand</span>
          </div>
          <div className="arch-flow">
            <div className="flow-line wss">
              <span>WSS</span>
            </div>
            <div className="flow-line https">
              <span>HTTPS</span>
            </div>
          </div>
          <div className="arch-node server">
            <span className="node-label">API Gateway & Sockets</span>
            <span className="node-sub">Node / Express / Socket.IO</span>
          </div>
          <div className="arch-flow">
            <div className="flow-line db"></div>
          </div>
          <div className="arch-node database">
            <span className="node-label">Data Persistence</span>
            <span className="node-sub">MongoDB / GridFS</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>MindBook © {new Date().getFullYear()}. <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noreferrer">Built by Farmanullah Ansari</a>.</p>
      </footer>
    </div>
  );
};

export default AboutMindbook;
