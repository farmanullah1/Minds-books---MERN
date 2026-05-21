import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiCalendar, 
  FiChevronLeft,
  FiShare2,
  FiCheck
} from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import api from '../../services/api';
import { IJobPosting } from '../../types';
import { formatTimeAgo } from '../../utils/helpers';
import './JobDetail.css';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<IJobPosting | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to fetch job', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await api.post(`/jobs/${id}/apply`);
      setApplied(true);
    } catch (err) {
      console.error('Failed to apply', err);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content-layout">
        <LeftSidebar />
        
        <main className="main-feed-area">
          {loading ? (
            <div className="job-detail-loading">Loading job details...</div>
          ) : !job ? (
            <div className="job-not-found">Job not found</div>
          ) : (
            <div className="job-detail-container">
              <Link to="/jobs" className="back-link"><FiChevronLeft /> Back to Jobs</Link>
              
              <div className="job-detail-card">
                <header className="job-detail-header">
                  <div className="employer-brand">
                    <img src={job.employer.profilePicture || '/default-avatar.png'} alt={job.employer.name} />
                    <div>
                      <h1>{job.title}</h1>
                      <p className="employer-name">{job.employer.name}</p>
                    </div>
                  </div>
                  <div className="header-actions">
                    <button className="btn-icon"><FiShare2 /></button>
                    <button 
                      className={`btn-primary apply-btn ${applied ? 'applied' : ''}`}
                      onClick={handleApply}
                      disabled={applying || applied}
                    >
                      {applied ? <><FiCheck /> Applied</> : applying ? 'Applying...' : 'Apply Now'}
                    </button>
                  </div>
                </header>

                <div className="job-meta-grid">
                  <div className="meta-item">
                    <FiMapPin />
                    <div>
                      <label>Location</label>
                      <span>{job.location} {job.isRemote && '(Remote)'}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <FiBriefcase />
                    <div>
                      <label>Job Type</label>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <FiDollarSign />
                    <div>
                      <label>Salary</label>
                      <span>{job.salaryRange.min}k - {job.salaryRange.max}k {job.salaryRange.currency}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <FiCalendar />
                    <div>
                      <label>Posted</label>
                      <span>{formatTimeAgo(job.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <section className="job-section">
                  <h3>Description</h3>
                  <div className="description-content">
                    {job.description.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                {job.requirements && job.requirements.length > 0 && (
                  <section className="job-section">
                    <h3>Requirements</h3>
                    <ul className="requirements-list">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </section>
                )}

                <footer className="job-detail-footer">
                  <div className="footer-info">
                    <p>Don't miss out on this opportunity!</p>
                    <span>Applications close on {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <button 
                    className={`btn-primary ${applied ? 'applied' : ''}`}
                    onClick={handleApply}
                    disabled={applying || applied}
                  >
                    {applied ? 'Application Sent' : applying ? 'Processing...' : 'Apply Now'}
                  </button>
                </footer>
              </div>
            </div>
          )}
        </main>
        
        <RightSidebar />
      </div>
    </div>
  );
};

export default JobDetail;
