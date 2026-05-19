import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiMic } from 'react-icons/fi';
import api from '../../services/api';
import './MindBot.css';

interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const MindBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('mindbot_history');
    return saved ? JSON.parse(saved) : [
      { role: 'bot', text: "Hey there! 👋 I'm MindBot, your AI assistant. Ask me anything about MindBook!", timestamp: new Date() }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('mindbot_history', JSON.stringify(messages.slice(-50)));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', text: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/mindbot', {
        message: userMsg.text,
        history: messages.slice(-10).map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }))
      });
      const botMsg: Message = { role: 'bot', text: res.data.reply || "I'm thinking... Try again!", timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      if (!isOpen) setUnread(prev => prev + 1);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later!", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Widget Button */}
      <motion.button
        className="mindbot-fab"
        onClick={() => { setIsOpen(!isOpen); setUnread(0); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        {isOpen ? <FiX size={24} /> : (
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.2" />
            <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20" fontWeight="900">M</text>
          </svg>
        )}
        {unread > 0 && !isOpen && (
          <span className="mindbot-unread">{unread}</span>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mindbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="mindbot-header">
              <div className="mindbot-header-info">
                <div className="mindbot-avatar">M</div>
                <div>
                  <h4>MindBot</h4>
                  <span className="mindbot-status">AI Assistant • Online</span>
                </div>
              </div>
              <button className="btn-icon" onClick={() => setIsOpen(false)}>
                <FiX size={18} />
              </button>
            </div>

            <div className="mindbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`mindbot-msg ${msg.role}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
              {loading && (
                <div className="mindbot-msg bot">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="mindbot-input-area">
              <input
                type="text"
                placeholder="Ask MindBot anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                className="mindbot-send"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
              >
                <FiSend size={18} />
              </button>
            </div>

            <div className="mindbot-footer">
              Powered by AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MindBot;
