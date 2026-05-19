import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiClock, FiUsers, FiEdit3, FiBookOpen } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import './Articles.css';

const ArticlesHome: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'latest' | 'trending' | 'following'>('latest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [activeTab]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/articles?tab=${activeTab}`);
      setArticles(res.data);
    } catch (error) {
      console.error('Failed to fetch articles', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="articles-container page-container">
        <div className="articles-header">
          <div className="header-text">
            <h1>Knowledge Sharing Hub</h1>
            <p>Discover, read, and write long-form articles.</p>
          </div>
          <Link to="/articles/new" className="btn btn-primary">
            <FiEdit3 /> Write an Article
          </Link>
        </div>

        <div className="articles-nav card mb-4">
          <button className={`nav-tab ${activeTab === 'latest' ? 'active' : ''}`} onClick={() => setActiveTab('latest')}>
            <FiClock /> Latest
          </button>
          <button className={`nav-tab ${activeTab === 'trending' ? 'active' : ''}`} onClick={() => setActiveTab('trending')}>
            <FiTrendingUp /> Trending
          </button>
          <button className={`nav-tab ${activeTab === 'following' ? 'active' : ''}`} onClick={() => setActiveTab('following')}>
            <FiUsers /> Following
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="empty-state card">
            <FiBookOpen size={48} className="text-secondary mb-2" />
            <h2>No articles found</h2>
            <p>Be the first to write something interesting!</p>
          </div>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <Link to={`/articles/${article._id}`} key={article._id} className="article-card card">
                {article.coverImage && (
                  <div className="article-cover" style={{ backgroundImage: `url(${article.coverImage})` }} />
                )}
                <div className="article-content-preview">
                  <div className="article-meta mb-2">
                    <span className="badge badge-low mr-2">{article.tags[0] || 'General'}</span>
                    <span className="text-secondary">{article.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt text-secondary">{article.excerpt}</p>
                  
                  <div className="article-footer mt-3">
                    <div className="article-author">
                      <img src={article.author?.profilePicture || 'https://via.placeholder.com/40'} alt={article.author?.name} />
                      <span>{article.author?.name}</span>
                    </div>
                    <div className="article-stats text-secondary">
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticlesHome;
