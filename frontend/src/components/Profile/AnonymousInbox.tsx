import React, { useEffect, useState } from 'react';
import { FiMessageSquare, FiSettings, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import api from '../../services/api';
import './Anonymous.css';

const AnonymousInbox: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [settings, setSettings] = useState({ enabled: false, autoPost: false });
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [qRes, sRes] = await Promise.all([
        api.get('/anonymous/inbox'),
        api.get('/anonymous/settings')
      ]);
      setQuestions(qRes.data);
      setSettings(sRes.data);
    } catch (err) {
      console.error('Failed to fetch inbox', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (enabled: boolean, autoPost: boolean) => {
    try {
      const res = await api.put('/anonymous/settings', { enabled, autoPost });
      setSettings(res.data);
    } catch (err) {
      console.error('Failed to update settings', err);
    }
  };

  const handleAction = async (id: string, action: string) => {
    try {
      await api.post(`/anonymous/${id}/handle`, { action, replyText: replyText[id] });
      setQuestions(questions.filter(q => q._id !== id));
      if (action === 'post') alert('Question posted to your feed!');
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  if (loading) return <div>Loading inbox...</div>;

  return (
    <div className="anonymous-inbox card mt-3">
      <div className="inbox-header">
        <h3><FiMessageSquare /> Anonymous Q&A Inbox</h3>
        <div className="inbox-settings">
          <label>
            <input 
              type="checkbox" 
              checked={settings.enabled} 
              onChange={(e) => updateSettings(e.target.checked, settings.autoPost)} 
            /> Enable Q&A Box
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={settings.autoPost} 
              onChange={(e) => updateSettings(settings.enabled, e.target.checked)} 
              disabled={!settings.enabled}
            /> Auto-post to Feed
          </label>
        </div>
      </div>

      {!settings.enabled ? (
        <div className="empty-state">Enable the Q&A Box to start receiving anonymous questions.</div>
      ) : questions.length === 0 ? (
        <div className="empty-state">No pending questions.</div>
      ) : (
        <div className="questions-list">
          {questions.map(q => (
            <div key={q._id} className="question-item">
              <p className="q-text">"{q.questionText}"</p>
              <span className="q-date">{new Date(q.createdAt).toLocaleString()}</span>
              
              <div className="q-actions mt-2">
                <textarea 
                  className="form-control mb-2" 
                  placeholder="Type your reply here to post it..."
                  value={replyText[q._id] || ''}
                  onChange={(e) => setReplyText({...replyText, [q._id]: e.target.value})}
                />
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={() => handleAction(q._id, 'post')}>
                    <FiCheck /> Post to Feed
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleAction(q._id, 'reply')}>
                    Reply Privately
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleAction(q._id, 'delete')}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnonymousInbox;
