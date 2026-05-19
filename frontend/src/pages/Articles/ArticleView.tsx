import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiEye, FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import api from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import { useAppSelector } from '../../store/hooks';
import './Articles.css';

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const res = await api.get(`/articles/${id}`);
      setArticle(res.data);
    } catch (error) {
      console.error('Failed to fetch article', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const res = await api.post(`/articles/${id}/like`);
      setArticle({ ...article, likes: res.data });
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await api.post(`/articles/${id}/comment`, { text: commentText });
      setArticle({ ...article, comments: res.data });
      setCommentText('');
    } catch (err) {
      console.error('Comment failed', err);
    }
  };

  if (loading) return <div className="loading-spinner">Loading article...</div>;
  if (!article) return <div className="error-state">Article not found</div>;

  const isLiked = article.likes.includes(user?._id);

  return (
    <>
      <Navbar />
      <div className="article-view-container page-container">
        {article.coverImage && (
          <div className="article-hero-image" style={{ backgroundImage: `url(${article.coverImage})` }} />
        )}
        
        <div className="article-main card p-4">
          <div className="article-header mb-4">
            <h1 className="article-title-large">{article.title}</h1>
            <div className="article-meta-large text-secondary mt-3">
              <div className="article-author-info">
                <img src={article.author.profilePicture || 'https://via.placeholder.com/40'} alt={article.author.name} className="avatar avatar-sm" />
                <Link to={`/profile/${article.author._id}`} className="author-name-link">{article.author.name}</Link>
              </div>
              <div className="article-stats-row">
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                <span className="dot">•</span>
                <span><FiClock /> {article.readTimeMinutes} min read</span>
                <span className="dot">•</span>
                <span><FiEye /> {article.views} views</span>
              </div>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="article-tags mt-3">
                {article.tags.map((t: string) => <span key={t} className="badge badge-low">{t}</span>)}
              </div>
            )}
          </div>

          <div className="article-body">
            {/* For MVP, splitting by double newline for paragraphs. Support real Markdown later. */}
            {article.content.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="article-actions mt-4 pt-3 border-top">
            <button className={`btn-icon ${isLiked ? 'text-brand' : 'text-secondary'}`} onClick={handleLike}>
              <FiThumbsUp /> {article.likes.length} Likes
            </button>
            <button className="btn-icon text-secondary">
              <FiMessageSquare /> {article.comments.length} Comments
            </button>
          </div>
        </div>

        <div className="article-comments card p-4 mt-4">
          <h3>Comments ({article.comments.length})</h3>
          <form onSubmit={handleComment} className="mt-3 mb-4">
            <textarea 
              className="form-control mb-2" 
              placeholder="What are your thoughts?" 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
            />
            <button type="submit" className="btn btn-primary" disabled={!commentText.trim()}>Post Comment</button>
          </form>

          <div className="comments-list">
            {article.comments.map((comment: any) => (
              <div key={comment._id} className="article-comment-item">
                <img src={comment.user?.profilePicture || 'https://via.placeholder.com/40'} alt={comment.user?.name} className="avatar avatar-xs" />
                <div className="comment-content-box">
                  <div className="comment-header">
                    <strong>{comment.user?.name}</strong>
                    <span className="text-secondary text-sm">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mb-0 mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleView;
