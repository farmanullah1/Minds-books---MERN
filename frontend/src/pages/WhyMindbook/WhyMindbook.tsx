import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiLinkedin, FiMail, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import gsap from 'gsap';
import './WhyMindbook.css';

const StorySection = ({ title, content, visual, alignRight }: any) => {
  const const_InView = useInView({ triggerOnce: true, threshold: 0.2 });
  const ref = const_InView.ref;
  const inView = const_InView.inView;

  return (
    <div ref={ref} className={`story-section ${alignRight ? 'align-right' : ''} ${inView ? 'in-view' : ''}`}>
      <div className="story-content">
        <h2 className="story-title">{title}</h2>
        <div className="story-body" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="story-visual">
        <div className="visual-container">
          {visual}
        </div>
      </div>
    </div>
  );
};

const WhyMindbook: React.FC = () => {
  const quoteRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (quoteRef.current) {
      // Simulate GSAP SplitText by splitting words into spans manually
      const text = quoteRef.current.innerText;
      const words = text.split(' ').map(word => `<span class="split-word">${word}</span>`).join(' ');
      quoteRef.current.innerHTML = words;
      
      gsap.fromTo(
        quoteRef.current.querySelectorAll('.split-word'),
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="why-page">
      {/* Background */}
      <div className="why-bg"></div>

      {/* Nav */}
      <Navbar />

      {/* Opening Section */}
      <header className="why-header">
        <h1 ref={quoteRef} className="pull-quote">
          "I set out to prove that a solo developer can build a world-class social platform."
        </h1>
        <div className="author-info">
          <div className="author-photo" style={{ overflow: 'hidden', padding: 0 }}>
            <img src="/Profile%20Picture.jpg" alt="Farmanullah Ansari" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="author-details">
            <h3>Farmanullah Ansari</h3>
            <p>Full Stack Software Engineer & Creator</p>
          </div>
        </div>
      </header>

      {/* Narrative Flow */}
      <section className="narrative-container">
        
        <StorySection 
          title="The Challenge"
          content="<p>Building a social media platform is notoriously complex. You need real-time data flow, complex relational data models, performant UI rendering, and scalable media delivery.</p><p>The challenge was simple but daunting: <strong>Recreate Facebook-level features. Zero team. One developer.</strong> I wanted to push my engineering skills to the absolute limit and build a platform that didn't just look good, but felt incredibly premium and responsive under the hood.</p>"
          visual={<div className="visual-graphic challenge-graphic"><span>Solo vs Goliath</span></div>}
          alignRight={false}
        />

        <StorySection 
          title="The Process"
          content="<p>Every engineering decision was made with performance and maintainability in mind.</p><ul><li><strong>State Management:</strong> Transitioned to Zustand to prevent unnecessary React re-renders.</li><li><strong>Real-time:</strong> WebSockets (Socket.IO) handling everything from typing indicators to live notifications.</li><li><strong>Styling:</strong> Pure CSS modules with a robust variable system—avoiding bloated frameworks to keep the bundle size minimal.</li></ul>"
          visual={<div className="visual-graphic process-graphic"><span>Architecture First</span></div>}
          alignRight={true}
        />

        <StorySection 
          title="The Features"
          content="<p>This isn't a minimum viable product. It's a complete ecosystem.</p><p>MindBook features a native <strong>Video Hub</strong> with seamless YouTube API integration, a chronological <strong>News Feed</strong> with rich media posts, an interactive <strong>Creator Portfolio</strong>, and a fully functional <strong>WebRTC video calling</strong> system. Every pixel was crafted to ensure the user stays engaged without the distraction of ads or invasive algorithms.</p>"
          visual={<div className="visual-graphic features-graphic"><span>Feature Rich</span></div>}
          alignRight={false}
        />

        <StorySection 
          title="The Skills Demonstrated"
          content="<p>MindBook serves as the ultimate showcase of my technical capabilities:</p><div class='skills-tags'><span>React 18</span><span>Node.js</span><span>WebRTC</span><span>Socket.IO</span><span>MongoDB</span><span>GSAP</span><span>UI/UX</span></div><p>It demonstrates my ability to architect complex full-stack applications, handle real-time concurrency, and deliver a polished, production-ready frontend experience.</p>"
          visual={<div className="visual-graphic skills-graphic"><span>Full Stack Mastery</span></div>}
          alignRight={true}
        />

        <StorySection 
          title="Future Plans"
          content="<p>The journey doesn't stop here. The roadmap for MindBook is extensive.</p><p>Upcoming phases include a <strong>React Native mobile app</strong> for cross-platform access, internationalization (i18n) for global reach, and a sophisticated <strong>Creator Monetization</strong> system allowing users to earn coins and tips directly through their content.</p>"
          visual={<div className="visual-graphic future-graphic"><span>Always Evolving</span></div>}
          alignRight={false}
        />

      </section>

      {/* CTA Section */}
      <section className="why-cta-section">
        <h2>Want to see how it was built?</h2>
        <p>Explore the source code, check out my portfolio, or reach out directly.</p>
        
        <div className="cta-links">
          <a href="https://github.com/farmanullah1" target="_blank" rel="noreferrer" className="cta-card">
            <FiGithub size={32} />
            <span>GitHub Repo</span>
            <p>View the source</p>
          </a>
          <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noreferrer" className="cta-card highlight">
            <FiBriefcase size={32} />
            <span>Portfolio</span>
            <p>See more work</p>
          </a>
          <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank" rel="noreferrer" className="cta-card">
            <FiLinkedin size={32} />
            <span>LinkedIn</span>
            <p>Connect with me</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>MindBook © {new Date().getFullYear()}. Built with passion by Farmanullah Ansari.</p>
      </footer>
    </div>
  );
};

export default WhyMindbook;
