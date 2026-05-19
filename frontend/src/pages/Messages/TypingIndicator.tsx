import React from 'react';
import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  name?: string;
  isGroup?: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ name, isGroup }) => {
  const dotVariants = {
    initial: { scale: 0.6, opacity: 0.5 },
    animate: { scale: 1, opacity: 1 },
  };

  const dotTransition: any = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  };

  return (
    <div className="typing-indicator-container">
      {isGroup && name && <span className="typing-name">{name} is typing</span>}
      <div className="typing-dots">
        <motion.div
          className="typing-dot"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0 }}
        />
        <motion.div
          className="typing-dot"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.15 }}
        />
        <motion.div
          className="typing-dot"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.3 }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;
