import React, { useEffect, useState } from 'react';
import { FiX, FiGift, FiMessageSquare } from 'react-icons/fi';
import api from '../../services/api';
import './GiftModal.css';

interface GiftItem {
  name: string;
  icon: string;
  price: number;
  type: string;
}

interface GiftModalProps {
  recipientId: string;
  recipientName: string;
  postId?: string;
  commentId?: string;
  onClose: () => void;
  onSent?: (coins: number) => void;
}

const GiftModal: React.FC<GiftModalProps> = ({ 
  recipientId, 
  recipientName, 
  postId, 
  commentId, 
  onClose,
  onSent 
}) => {
  const [items, setItems] = useState<GiftItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GiftItem | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/gifts/items');
        setItems(res.data);
      } catch (err) {
        console.error('Failed to fetch gift items', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSend = async () => {
    if (!selectedItem) return;
    setSending(true);
    setError(null);
    try {
      const res = await api.post('/gifts/send', {
        recipientId,
        itemName: selectedItem.name,
        message,
        postId,
        commentId
      });
      alert(`Gift sent successfully! You have ${res.data.coins} coins left.`);
      onSent?.(res.data.coins);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send gift');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content gift-modal">
        <div className="modal-header">
          <h2><FiGift className="mr-2" /> Send Gift to {recipientName}</h2>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div className="loading-spinner">Loading shop...</div>
          ) : (
            <>
              <div className="gift-grid">
                {items.map(item => (
                  <div 
                    key={item.name} 
                    className={`gift-item-card ${selectedItem?.name === item.name ? 'selected' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <span className="gift-icon">{item.icon}</span>
                    <span className="gift-name">{item.name}</span>
                    <span className="gift-price">{item.price} Coins</span>
                  </div>
                ))}
              </div>

              <div className="gift-message-box mt-4">
                <label><FiMessageSquare className="mr-1" /> Optional Message</label>
                <textarea 
                  placeholder="Say something nice..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field mt-2"
                />
              </div>

              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn btn-primary" 
            onClick={handleSend}
            disabled={!selectedItem || sending}
          >
            {sending ? 'Sending...' : `Send Gift (${selectedItem?.price || 0} Coins)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftModal;
