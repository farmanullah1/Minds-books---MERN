import React, { useState, useEffect } from 'react';
import { 
  FiBriefcase, 
  FiCode, 
  FiAward, 
  FiMessageSquare, 
  FiFileText, 
  FiPlus, 
  FiExternalLink,
  FiGithub,
  FiEdit2,
  FiCheckCircle
} from 'react-icons/fi';
import api from '../../services/api';
import { IPortfolio, IUser } from '../../types';
import './PortfolioTab.css';

interface PortfolioTabProps {
  userId: string;
  isOwnProfile: boolean;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({ userId, isOwnProfile }) => {
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.get(`/jobs/portfolio/${userId}`);
        setPortfolio(res.data);
      } catch (err) {
        console.error('Failed to fetch portfolio', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [userId]);

  if (loading) return <div className="portfolio-loading">Loading portfolio...</div>;

  return (
    <div className="portfolio-tab">
      <div className="portfolio-grid">
        <section className="portfolio-section main-content">
          <div className="section-header">
            <h3><FiCode /> Work Samples</h3>
            {isOwnProfile && <button className="btn-icon"><FiPlus /></button>}
          </div>
          <div className="work-samples-grid">
            {portfolio?.workSamples?.map((sample, idx) => (
              <div key={idx} className="work-sample-card">
                <div className="sample-image">
                  <img src={sample.imageUrl || 'https://via.placeholder.com/300x180'} alt={sample.title} />
                  <div className="sample-overlay">
                    {sample.projectUrl && <a href={sample.projectUrl} target="_blank" rel="noreferrer"><FiExternalLink /></a>}
                    {sample.githubUrl && <a href={sample.githubUrl} target="_blank" rel="noreferrer"><FiGithub /></a>}
                  </div>
                </div>
                <div className="sample-info">
                  <h4>{sample.title}</h4>
                  <p>{sample.description}</p>
                </div>
              </div>
            ))}
            {isOwnProfile && (!portfolio?.workSamples || portfolio.workSamples.length === 0) && (
              <div className="empty-state">
                <FiPlus size={24} />
                <p>Add your first project</p>
              </div>
            )}
          </div>

          <div className="section-header mt-4">
            <h3><FiAward /> Certifications</h3>
            {isOwnProfile && <button className="btn-icon"><FiPlus /></button>}
          </div>
          <div className="certifications-list">
            {portfolio?.certifications?.map((cert, idx) => (
              <div key={idx} className="certification-item">
                <div className="cert-icon"><FiAward /></div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <p>{cert.organization} • {new Date(cert.issueDate).getFullYear()}</p>
                </div>
                {cert.certificateUrl && <a href={cert.certificateUrl} target="_blank" rel="noreferrer" className="btn-view-cert">View</a>}
              </div>
            ))}
          </div>
        </section>

        <aside className="portfolio-sidebar">
          <div className="sidebar-widget skills-widget">
            <div className="widget-header">
              <h4>Skills</h4>
              {isOwnProfile && <FiEdit2 className="edit-icon" />}
            </div>
            <div className="skills-cloud">
              {portfolio?.skills?.map((skill, idx) => (
                <div key={idx} className="skill-tag">
                  {skill.name}
                  <span className="endorsement-count">{skill.endorsements?.length || 0}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-widget resume-widget">
            <h4>Resume</h4>
            {portfolio?.resumeUrl ? (
              <a href={portfolio.resumeUrl} target="_blank" rel="noreferrer" className="btn-resume">
                <FiFileText /> Download CV
              </a>
            ) : (
              <p className="no-resume">No resume uploaded</p>
            )}
          </div>

          <div className="sidebar-widget status-widget">
            <div className={`status-badge ${portfolio?.isOpenToWork ? 'open' : ''}`}>
              {portfolio?.isOpenToWork ? (
                <><FiCheckCircle /> Open to Work</>
              ) : (
                'Not currently looking'
              )}
            </div>
          </div>
        </aside>
      </div>

      <section className="portfolio-section recommendations">
        <div className="section-header">
          <h3><FiMessageSquare /> Recommendations</h3>
          {!isOwnProfile && <button className="btn-secondary">Write one</button>}
        </div>
        <div className="recommendations-grid">
          {portfolio?.recommendations?.map((rec, idx) => (
            <div key={idx} className="recommendation-card">
              <div className="rec-header">
                <img src={rec.from.profilePicture || '/default-avatar.png'} alt={rec.from.name} />
                <div className="rec-info">
                  <h5>{rec.from.name}</h5>
                  <p>{new Date(rec.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="rec-text">"{rec.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioTab;
