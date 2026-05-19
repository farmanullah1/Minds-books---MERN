import React, { useEffect, useState } from 'react';
import { FiMessageSquare, FiMapPin, FiBookmark, FiLock, FiPlus, FiMessageCircle } from 'react-icons/fi';
import api from '../../services/api';
import './GroupDiscussions.css';

interface GroupDiscussionsProps {
  groupId: string;
  isAdmin: boolean;
  currentUser: any;
}

const GroupDiscussions: React.FC<GroupDiscussionsProps> = ({ groupId, isAdmin, currentUser }) => {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [activeThread, setActiveThread] = useState<any | null>(null);

  // Create Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  
  // Reply Form State
  const [replyText, setReplyText] = useState('');

  const categories = ['General', 'Announcements', 'Q&A', 'Off-Topic'];

  useEffect(() => {
    fetchThreads();
  }, [groupId]);

  const fetchThreads = async () => {
    try {
      const res = await api.get(`/discussions/group/${groupId}`);
      setThreads(res.data);
    } catch (err) {
      console.error('Failed to load discussions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/discussions', { groupId, title, content, category });
      setThreads([res.data, ...threads]);
      setShowCreate(false);
      setTitle('');
      setContent('');
      setCategory('General');
    } catch (err) {
      console.error('Failed to create thread', err);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !replyText.trim()) return;
    try {
      const res = await api.post(`/discussions/${activeThread._id}/reply`, { text: replyText });
      setActiveThread(res.data);
      // Update thread in main list
      setThreads(threads.map(t => t._id === activeThread._id ? res.data : t));
      setReplyText('');
    } catch (err) {
      console.error('Failed to reply', err);
    }
  };

  const togglePin = async (e: React.MouseEvent, threadId: string) => {
    e.stopPropagation();
    try {
      const res = await api.put(`/discussions/${threadId}/pin`);
      setThreads(threads.map(t => t._id === threadId ? { ...t, isPinned: res.data.isPinned } : t));
    } catch (err) {
      console.error('Failed to toggle pin', err);
    }
  };

  if (activeThread) {
    return (
      <div className="discussion-thread-view card">
        <button className="btn btn-secondary back-btn" onClick={() => setActiveThread(null)}>← Back to Discussions</button>
        
        <div className="thread-main-post">
          <div className="thread-header">
            <h2 className="thread-title">
              {activeThread.isPinned && <FiBookmark className="text-danger mr-2" />}
              {activeThread.title}
            </h2>
            <span className="badge badge-medium">{activeThread.category}</span>
          </div>
          
          <div className="thread-author">
            <img src={activeThread.creator?.profilePicture || 'https://via.placeholder.com/40'} alt="Author" className="avatar avatar-sm" />
            <div>
              <div className="author-name">{activeThread.creator?.name}</div>
              <div className="thread-date">{new Date(activeThread.createdAt).toLocaleString()}</div>
            </div>
          </div>
          
          <div className="thread-content">{activeThread.content}</div>
        </div>

        <div className="thread-replies-section">
          <h3>Replies ({activeThread.replies?.length || 0})</h3>
          
          <div className="replies-list">
            {activeThread.replies?.map((reply: any, idx: number) => (
              <div key={idx} className="thread-reply-item">
                <img src={reply.user?.profilePicture || 'https://via.placeholder.com/40'} alt="User" className="avatar avatar-xs" />
                <div className="reply-body">
                  <div className="reply-header">
                    <span className="reply-author">{reply.user?.name}</span>
                    <span className="reply-date">{new Date(reply.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="reply-text">{reply.text}</div>
                </div>
              </div>
            ))}
          </div>

          {!activeThread.isLocked ? (
            <form onSubmit={handleReply} className="reply-form-box">
              <textarea 
                className="form-control" 
                rows={3} 
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary mt-2">Post Reply</button>
            </form>
          ) : (
            <div className="thread-locked-msg"><FiLock /> This thread is locked and cannot receive new replies.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group-discussions-section">
      <div className="discussions-header card">
        <div className="d-flex justify-between align-center">
          <h2>Discussions</h2>
          <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}>
            <FiPlus /> New Thread
          </button>
        </div>
      </div>

      {showCreate && (
        <form onSubmit={handleCreateThread} className="create-thread-form card">
          <h3>Create New Thread</h3>
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Thread Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            maxLength={150}
          />
          <select className="form-control mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <textarea 
            className="form-control mb-3" 
            rows={5} 
            placeholder="What do you want to discuss?" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Create</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="threads-list">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : threads.length === 0 ? (
          <div className="empty-state card text-center">
            <FiMessageCircle size={48} className="text-secondary mb-2" />
            <h3>No Discussions Yet</h3>
            <p>Be the first to start a conversation in this group!</p>
          </div>
        ) : (
          threads.map(thread => (
            <div key={thread._id} className="thread-card card" onClick={() => setActiveThread(thread)}>
              <div className="thread-card-left">
                {thread.isPinned && <FiBookmark className="pinned-icon text-danger" title="Pinned" />}
                <div className="thread-info">
                  <h3 className="thread-title">{thread.title}</h3>
                  <div className="thread-meta">
                    <span className="badge badge-low mr-2">{thread.category}</span>
                    <span>Started by <b>{thread.creator?.name}</b></span>
                    <span className="dot">•</span>
                    <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="thread-card-right">
                <div className="reply-count">
                  <FiMessageSquare /> {thread.replies?.length || 0}
                </div>
                {isAdmin && (
                  <button className="btn-icon" onClick={(e) => togglePin(e, thread._id)} title={thread.isPinned ? "Unpin" : "Pin"}>
                    <FiBookmark className={thread.isPinned ? 'text-danger' : 'text-secondary'} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupDiscussions;
