import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiPlus, 
  FiFilter,
  FiChevronRight,
  FiStar,
  FiCheckCircle
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import api from '../../services/api';
import { IJobPosting } from '../../types';
import { formatTimeAgo } from '../../utils/helpers';
import ApplicationTracker from './ApplicationTracker';
import './Jobs.css';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<IJobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'tracker'>('search');

  useEffect(() => {
    fetchJobs();
  }, [categoryFilter, isRemoteOnly]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (isRemoteOnly) params.isRemote = true;
      if (searchTerm) params.search = searchTerm;
      if (locationFilter) params.location = locationFilter;

      const res = await api.get('/jobs', { params });
      setJobs(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  const categories = ['All', 'Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'Engineering'];

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content-layout">
        <LeftSidebar />
        
        <main className="main-feed-area">
          <div className="jobs-container">
            <div className="jobs-header">
              <div className="header-content">
                <h1>Find your next opportunity</h1>
                <p>Explore thousands of jobs from top companies on MindBook</p>
                
                <form className="jobs-search-bar" onSubmit={handleSearch}>
                  <div className="search-input">
                    <FiSearch />
                    <input 
                      type="text" 
                      placeholder="Job title or keyword" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="location-input">
                    <FiMapPin />
                    <input 
                      type="text" 
                      placeholder="Location" 
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-primary">Search</button>
                </form>
              </div>
            </div>

            <div className="jobs-content">
              <aside className="jobs-sidebar">
                <div className="sidebar-section">
                  <h3>Filters</h3>
                  <div className="filter-group">
                    <label>Category</label>
                    <select 
                      value={categoryFilter} 
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group checkbox">
                    <input 
                      type="checkbox" 
                      id="remote" 
                      checked={isRemoteOnly}
                      onChange={(e) => setIsRemoteOnly(e.target.checked)}
                    />
                    <label htmlFor="remote">Remote only</label>
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3>Menu</h3>
                  <button 
                    className={`btn-tab ${activeTab === 'search' ? 'active' : ''}`}
                    onClick={() => setActiveTab('search')}
                  >
                    <FiSearch /> Search Jobs
                  </button>
                  <button 
                    className={`btn-tab ${activeTab === 'tracker' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tracker')}
                  >
                    <FiCheckCircle /> Application Tracker
                  </button>
                </div>

                <Link to="/jobs/create" className="btn-post-job">
                  <FiPlus /> Post a Job
                </Link>
              </aside>

              <main className="jobs-feed">
                {activeTab === 'tracker' ? (
                  <ApplicationTracker />
                ) : (
                  <>
                    <div className="feed-header">
                      <h2>{jobs.length} Jobs found</h2>
                      <div className="feed-sort">
                        <FiFilter /> Sort by: <span>Recent</span>
                      </div>
                    </div>

                    {loading ? (
                      <div className="jobs-loading">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="job-skeleton"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="jobs-list">
                        <AnimatePresence>
                          {jobs.map(job => (
                            <motion.div 
                              key={job._id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`job-card ${job.isPromoted ? 'promoted' : ''}`}
                            >
                              {job.isPromoted && <div className="promoted-badge"><FiStar /> Promoted</div>}
                              <div className="job-card-header">
                                <img src={job.employer.profilePicture || '/default-avatar.png'} alt={job.employer.name} />
                                <div className="job-info">
                                  <Link to={`/jobs/${job._id}`} className="job-title">{job.title}</Link>
                                  <p className="employer-name">{job.employer.name}</p>
                                </div>
                                <button className="btn-save"><FiStar /></button>
                              </div>
                              <div className="job-details">
                                <span><FiMapPin /> {job.location} {job.isRemote && '(Remote)'}</span>
                                <span><FiBriefcase /> {job.type}</span>
                                {job.salaryRange && (
                                  <span><FiDollarSign /> {job.salaryRange.min}k - {job.salaryRange.max}k {job.salaryRange.currency}</span>
                                )}
                              </div>
                              <div className="job-card-footer">
                                <span className="posted-time">Posted {formatTimeAgo(job.createdAt)}</span>
                                <Link to={`/jobs/${job._id}`} className="btn-apply">View Details</Link>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {!loading && jobs.length === 0 && (
                          <div className="no-jobs">
                            <FiBriefcase size={48} />
                            <h3>No jobs found</h3>
                            <p>Try adjusting your search filters</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </main>
            </div>
          </div>
        </main>
        
        <RightSidebar />
      </div>
    </div>
  );
};

export default Jobs;
