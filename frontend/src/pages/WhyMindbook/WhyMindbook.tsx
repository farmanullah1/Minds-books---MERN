import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {
  FiGithub,
  FiLinkedin,
  FiBriefcase,
  FiArrowRight,
  FiTarget,
  FiLayers,
  FiZap,
  FiAward,
  FiTrendingUp,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import Navbar from '../../components/Navbar/Navbar';
import gsap from 'gsap';
import './WhyMindbook.css';

interface StorySectionProps {
  number: string;
  title: string;
  content: string;
  icon: IconType;
  graphicClass: string;
  label: string;
  alignRight?: boolean;
}

const StorySection: React.FC<StorySectionProps> = ({
  number,
  title,
  content,
  icon: Icon,
  graphicClass,
  label,
  alignRight,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`story-section ${alignRight ? 'align-right' : ''} ${inView ? 'in-view' : ''}`}
    >
      <div className="story-index" aria-hidden="true">
        <span className="story-index-num">{number}</span>
      </div>
      <div className="story-content">
        <span className="story-eyebrow">{label}</span>
        <h2 className="story-title">{title}</h2>
        <div className="story-body" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="story-visual">
        <div className="visual-container">
          <div className={`visual-graphic ${graphicClass}`}>
            <div className="visual-pattern" aria-hidden="true" />
            <div className="visual-icon-wrap">
              <Icon size={44} />
            </div>
            <span className="visual-label">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const STORY_SECTIONS: Omit<StorySectionProps, 'alignRight'>[] = [
  {
    number: '01',
    title: 'The Challenge',
    label: 'Solo vs Goliath',
    graphicClass: 'challenge-graphic',
    icon: FiTarget,
    content:
      '<p>Building a social media platform is notoriously complex. You need real-time data flow, complex relational data models, performant UI rendering, and scalable media delivery.</p><p>The challenge was simple but daunting: <strong>Recreate Facebook-level features. Zero team. One developer.</strong> I wanted to push my engineering skills to the absolute limit and build a platform that didn\'t just look good, but felt incredibly premium and responsive under the hood.</p>',
  },
  {
    number: '02',
    title: 'The Process',
    label: 'Architecture First',
    graphicClass: 'process-graphic',
    icon: FiLayers,
    content:
      '<p>Every engineering decision was made with performance and maintainability in mind.</p><ul><li><strong>State Management:</strong> Transitioned to Zustand to prevent unnecessary React re-renders.</li><li><strong>Real-time:</strong> WebSockets (Socket.IO) handling everything from typing indicators to live notifications.</li><li><strong>Styling:</strong> Pure CSS modules with a robust variable system—avoiding bloated frameworks to keep the bundle size minimal.</li></ul>',
  },
  {
    number: '03',
    title: 'The Features',
    label: 'Feature Rich',
    graphicClass: 'features-graphic',
    icon: FiZap,
    content:
      '<p>This isn\'t a minimum viable product. It\'s a complete ecosystem.</p><p>MindBook features a native <strong>Video Hub</strong> with seamless YouTube API integration, a chronological <strong>News Feed</strong> with rich media posts, an interactive <strong>Creator Portfolio</strong>, and a fully functional <strong>WebRTC video calling</strong> system. Every pixel was crafted to ensure the user stays engaged without the distraction of ads or invasive algorithms.</p>',
  },
  {
    number: '04',
    title: 'The Skills Demonstrated',
    label: 'Full Stack Mastery',
    graphicClass: 'skills-graphic',
    icon: FiAward,
    content:
      '<p>MindBook serves as the ultimate showcase of my technical capabilities:</p><div class="skills-tags"><span>React 18</span><span>Node.js</span><span>WebRTC</span><span>Socket.IO</span><span>MongoDB</span><span>GSAP</span><span>UI/UX</span></div><p>It demonstrates my ability to architect complex full-stack applications, handle real-time concurrency, and deliver a polished, production-ready frontend experience.</p>',
  },
  {
    number: '05',
    title: 'Future Plans',
    label: 'Always Evolving',
    graphicClass: 'future-graphic',
    icon: FiTrendingUp,
    content:
      '<p>The journey doesn\'t stop here. The roadmap for MindBook is extensive.</p><p>Upcoming phases include a <strong>React Native mobile app</strong> for cross-platform access, internationalization (i18n) for global reach, and a sophisticated <strong>Creator Monetization</strong> system allowing users to earn coins and tips directly through their content.</p>',
  },
];

const WhyMindbook: React.FC = () => {
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!quoteRef.current) return;

    const text = quoteRef.current.innerText;
    const words = text
      .split(' ')
      .map((word) => `<span class="split-word">${word}</span>`)
      .join(' ');
    quoteRef.current.innerHTML = words;

    gsap.fromTo(
      quoteRef.current.querySelectorAll('.split-word'),
      { opacity: 0, y: 20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="why-page">
      <div className="why-bg">
        <div className="why-grid" />
        <div className="why-glow why-glow-1" />
        <div className="why-glow why-glow-2" />
      </div>

      <Navbar />

      <header className="why-header">
        <span className="why-hero-badge">The Story Behind MindBook</span>
        <div className="pull-quote-wrap">
          <span className="quote-mark quote-mark-open" aria-hidden="true">
            &ldquo;
          </span>
          <h1 ref={quoteRef} className="pull-quote">
            I set out to prove that a solo developer can build a world-class social platform.
          </h1>
          <span className="quote-mark quote-mark-close" aria-hidden="true">
            &rdquo;
          </span>
        </div>

        <div className="author-card">
          <div className="author-photo-ring">
            <div className="author-photo">
              <img src="/Profile%20Picture.jpg" alt="Farmanullah Ansari" />
            </div>
          </div>
          <div className="author-details">
            <h3>Farmanullah Ansari</h3>
            <p>Full Stack Software Engineer &amp; Creator</p>
          </div>
        </div>

        <div className="why-hero-actions">
          <Link to="/about-mindbook" className="why-btn-primary">
            Explore the platform <FiArrowRight />
          </Link>
          <a
            href="https://github.com/farmanullah1"
            target="_blank"
            rel="noreferrer"
            className="why-btn-secondary"
          >
            <FiGithub size={18} /> View source
          </a>
        </div>
      </header>

      <section className="narrative-container">
        <div className="narrative-header">
          <h2>From idea to platform</h2>
          <p>Five chapters of building MindBook — one engineer, full stack, no shortcuts.</p>
        </div>

        <div className="story-timeline">
          {STORY_SECTIONS.map((section, index) => (
            <StorySection key={section.number} {...section} alignRight={index % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="why-cta-section">
        <div className="why-cta-inner">
          <h2>Want to see how it was built?</h2>
          <p>Explore the source code, check out my portfolio, or reach out directly.</p>

          <div className="cta-links">
            <a
              href="https://github.com/farmanullah1"
              target="_blank"
              rel="noreferrer"
              className="cta-card"
            >
              <div className="cta-icon-wrap">
                <FiGithub size={28} />
              </div>
              <span>GitHub Repo</span>
              <p>View the source</p>
              <FiArrowRight className="cta-arrow" />
            </a>
            <a
              href="https://farmanullah1.github.io/My-Portfolio"
              target="_blank"
              rel="noreferrer"
              className="cta-card highlight"
            >
              <div className="cta-icon-wrap">
                <FiBriefcase size={28} />
              </div>
              <span>Portfolio</span>
              <p>See more work</p>
              <FiArrowRight className="cta-arrow" />
            </a>
            <a
              href="https://www.linkedin.com/in/farmanullah-ansari/"
              target="_blank"
              rel="noreferrer"
              className="cta-card"
            >
              <div className="cta-icon-wrap">
                <FiLinkedin size={28} />
              </div>
              <span>LinkedIn</span>
              <p>Connect with me</p>
              <FiArrowRight className="cta-arrow" />
            </a>
          </div>
        </div>
      </section>

      <footer className="why-footer">
        <p>MindBook © {new Date().getFullYear()}. Built with passion by Farmanullah Ansari.</p>
      </footer>
    </div>
  );
};

export default WhyMindbook;
