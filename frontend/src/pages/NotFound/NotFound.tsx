import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      {/* Dynamic animated background blobs */}
      <div className="nf-blob blob-1"></div>
      <div className="nf-blob blob-2"></div>
      
      <div className="not-found-content">
        <motion.div 
          className="glitch-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glitch" data-text="404">404</div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Lost in the void
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          The page you're looking for has drifted into an alternate dimension.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/" className="home-btn-glass">
            Return to Reality
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
