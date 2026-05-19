import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import api from '../../services/api';
import './DailyChallengeBanner.css';

const DailyChallengeBanner: React.FC = () => {
  const [challenge, setChallenge] = useState<any>(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await api.get('/challenges/today');
        setChallenge(res.data.challenge);
        setCompleted(res.data.userCompleted);
      } catch (err) {
        console.error('Failed to fetch challenge', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, []);

  if (loading || !challenge) return null;

  return (
    <motion.div 
      className={`daily-challenge-banner ${completed ? 'completed' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="challenge-icon">
        {completed ? <FiCheckCircle size={24} /> : <FiStar size={24} />}
      </div>
      <div className="challenge-content">
        <h4 className="challenge-title">Daily Challenge</h4>
        <p className="challenge-prompt">{challenge.prompt}</p>
      </div>
      {!completed ? (
        <div className="challenge-reward">
          <span>+10 Coins</span>
          <FiChevronRight size={20} />
        </div>
      ) : (
        <div className="challenge-status">
          <span>Done!</span>
        </div>
      )}
    </motion.div>
  );
};

export default DailyChallengeBanner;
