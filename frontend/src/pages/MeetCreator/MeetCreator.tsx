import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { FiDownload, FiGithub, FiLinkedin, FiMail, FiGlobe, FiAward, FiLayers, FiCode, FiSmartphone, FiCpu } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import './MeetCreator.css';

const MeetCreator: React.FC = () => {
  const devDetails = {
    name: 'Farmanullah Ansari',
    title: 'Full Stack Software Engineer',
    bio: 'Passionate and results-driven Full Stack Developer specialized in building scalable, real-time web applications with next-generation premium user experiences. Expert in modern JavaScript/TypeScript ecosystems, responsive glassmorphic layouts, and cloud architectures.',
    email: 'farmanullahansari999@gmail.com',
    portfolio: 'https://farmanullah1.github.io/My-Portfolio',
    linkedin: 'https://www.linkedin.com/in/farmanullah-ansari/',
    github: 'https://github.com/farmanullah1',
    skills: [
      { category: 'Frontend', items: ['React 18 (Vite)', 'TypeScript', 'Redux Toolkit', 'Framer Motion', 'React Spring', 'Lenis Scroll', 'TailwindCSS', 'CSS3 Variable Systems'] },
      { category: 'Backend & DB', items: ['Node.js', 'Express.js', 'MongoDB / Mongoose', 'RESTful APIs', 'JWT Security', 'Validation Schemes'] },
      { category: 'Real-time & System', items: ['Socket.IO', 'WebRTC Signaling', 'Peer-to-Peer Calls', 'Lighthouse Optimization', 'Express Compression', 'Concurrency & Event Loops'] },
    ],
    experience: [
      {
        role: 'Lead Full Stack Engineer',
        company: 'MindBook Platform (Portfolio Showpiece)',
        duration: '2026 - Present',
        description: 'Architected a next-generation high-fidelity social network supporting WebRTC audio/video calls, Socket.IO messaging channels, real-time interactive gaming systems, and full creator shop commerce modules.'
      },
      {
        role: 'Software Engineer',
        company: 'Independent Software Solutions & Open Source',
        duration: '2023 - 2026',
        description: 'Developed scalable API microservices, localized responsive dashboards, web scrapers, and unified dynamic interfaces for international clients.'
      }
    ]
  };

  const handleDownloadResume = () => {
    const doc = new jsPDF();
    const margin = 20;
    let yPos = 20;

    // Header
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(247, 185, 40); // Yellow Brand Primary
    doc.text(devDetails.name.toUpperCase(), margin, yPos);
    
    yPos += 8;
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(devDetails.title, margin, yPos);
    
    // Contact Info
    yPos += 10;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Email: ${devDetails.email}  |  LinkedIn: linkedin.com/in/farmanullah-ansari/  |  GitHub: github.com/farmanullah1`, margin, yPos);
    
    // Divider
    yPos += 5;
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPos, 190, yPos);
    
    // Professional Summary
    yPos += 12;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('PROFESSIONAL SUMMARY', margin, yPos);
    
    yPos += 6;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(70, 70, 70);
    const splitBio = doc.splitTextToSize(devDetails.bio, 170);
    doc.text(splitBio, margin, yPos);
    
    // Technical Skills
    yPos += 20;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('TECHNICAL SKILLS & WORKSPACE', margin, yPos);
    
    devDetails.skills.forEach(skillCat => {
      yPos += 8;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      doc.text(skillCat.category + ':', margin, yPos);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(90, 90, 90);
      doc.text(skillCat.items.join(', '), margin + 40, yPos);
    });
    
    // Work Experience
    yPos += 18;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('PROFESSIONAL EXPERIENCE', margin, yPos);
    
    devDetails.experience.forEach(exp => {
      yPos += 8;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.text(`${exp.role} - ${exp.company}`, margin, yPos);
      
      doc.setFont('Helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(exp.duration, 190 - doc.getTextWidth(exp.duration), yPos);
      
      yPos += 6;
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const splitDesc = doc.splitTextToSize(exp.description, 170);
      doc.text(splitDesc, margin, yPos);
      yPos += 6;
    });

    // Footer
    yPos = 275;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('Generated dynamically from MindBook creator dashboard.', margin, yPos);
    
    doc.save('Farmanullah_Ansari_Resume.pdf');
  };

  return (
    <>
      <Navbar />
      <div className="app-layout" id="meet-creator-page">
        <LeftSidebar />
        <main className="main-content">
          <div className="creator-profile-container card">
            
            {/* Header / Hero Section */}
            <div className="creator-hero">
              <div className="creator-avatar-wrapper">
                <div className="creator-avatar-glow" />
                <div className="creator-avatar-inner">
                  <span>FA</span>
                </div>
              </div>

              <h1>{devDetails.name}</h1>
              <h2>{devDetails.title}</h2>
              
              <div className="creator-social-links">
                <a href={devDetails.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn github">
                  <FiGithub size={20} />
                </a>
                <a href={devDetails.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin">
                  <FiLinkedin size={20} />
                </a>
                <a href={`mailto:${devDetails.email}`} className="social-icon-btn email">
                  <FiMail size={20} />
                </a>
                <a href={devDetails.portfolio} target="_blank" rel="noopener noreferrer" className="social-icon-btn website">
                  <FiGlobe size={20} />
                </a>
              </div>

              <p className="creator-bio">{devDetails.bio}</p>

              <button onClick={handleDownloadResume} className="download-resume-btn">
                <FiDownload size={18} />
                <span>Download Professional Resume (PDF)</span>
              </button>
            </div>

            {/* Core Project Demonstration Details */}
            <div className="creator-sections-grid">
              
              {/* Technical Stack Grid */}
              <div className="creator-card technical-skills-card">
                <h3><FiCode size={20} className="card-title-icon" /> Technical Architecture</h3>
                <div className="skills-stack-list">
                  {devDetails.skills.map((skillCat, idx) => (
                    <div key={idx} className="skill-category-group">
                      <h4>{skillCat.category}</h4>
                      <div className="skill-badges-grid">
                        {skillCat.items.map((item, id) => (
                          <span key={id} className="skill-badge">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What this Project Demonstrates */}
              <div className="creator-card project-demonstration-card">
                <h3><FiLayers size={20} className="card-title-icon" /> Workspace Capabilities</h3>
                <p>
                  <strong>MindBook</strong> is a flagship enterprise-grade portfolio showpiece built with meticulous focus on production-ready patterns, visual design, and real-time mechanics:
                </p>
                <ul className="demonstration-list">
                  <li>
                    <strong>WebRTC Media Pipeline:</strong> Low-latency audio-video socket signaling enabling scalable calls, screen sharing, and mute mechanisms.
                  </li>
                  <li>
                    <strong>Advanced State Management:</strong> Dual Redux Toolkit and Zustand stores segregating active call streams, ui variables, authorization layers, and real-time notification logs.
                  </li>
                  <li>
                    <strong>Dynamic Shimmer & Error Boundaries:</strong> Strict skeleton overlays preventing layout shifts, matched with dual React Error Boundary components.
                  </li>
                  <li>
                    <strong>i18n Multi-lingual translations:</strong> Native translation layer supporting English, Arabic, Spanish, French, German, Urdu, Hindi, Japanese, Chinese, and Russian.
                  </li>
                  <li>
                    <strong>Document Report Generators:</strong> Integration of high-fidelity client-side report downloaders converting complex Recharts grids into offline PDF and CSV sheets.
                  </li>
                </ul>
              </div>

            </div>

            {/* Experience Section */}
            <div className="creator-experience-section">
              <h3><FiAward size={22} className="card-title-icon" /> Professional Highlights</h3>
              <div className="experience-timeline">
                {devDetails.experience.map((exp, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-badge" />
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h4>{exp.role}</h4>
                        <span className="timeline-duration">{exp.duration}</span>
                      </div>
                      <h5>{exp.company}</h5>
                      <p>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default MeetCreator;
