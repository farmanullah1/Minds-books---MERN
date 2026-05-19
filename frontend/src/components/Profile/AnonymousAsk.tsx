import React, { useState } from 'react';
import { FiSend, FiUserX } from 'react-icons/fi';
import api from '../../services/api';
import './Anonymous.css';

interface AnonymousAskProps {
  targetUserId: string;
  targetUserName: string;
}

const AnonymousAsk: React.FC<AnonymousAskProps> = ({ targetUserId, targetUserName }) => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length > 300) return;
    
    setStatus('submitting');
    try {
      await api.post('/anonymous/submit', { targetUserId, text });
      setStatus('success');
      setText('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="anonymous-ask card mt-3 p-3 text-center">
      <div className="ask-header mb-2">
        <div className="ask-icon-wrapper mx-auto mb-2">
          <FiUserX size={24} />
        </div>
        <h4 className="mb-1">Ask {targetUserName.split(' ')[0]} anonymously</h4>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>They won't know who sent this.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-2"
          placeholder="Type your question here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={300}
          rows={3}
          required
        />
        <div className="d-flex justify-between align-center">
          <span className="text-secondary" style={{ fontSize: '0.8rem' }}>{text.length}/300</span>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={status !== 'idle' || !text.trim()}
          >
            {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent!' : <><FiSend /> Send</>}
          </button>
        </div>
        {status === 'error' && <p className="text-danger mt-2 text-sm">Failed to send. They might have Q&A disabled.</p>}
      </form>
    </div>
  );
};

export default AnonymousAsk;
