import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import './WorkTimeline.css';

interface TimelineEntry {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrent?: boolean;
}

interface WorkTimelineProps {
  entries: TimelineEntry[];
}

const WorkTimeline: React.FC<WorkTimelineProps> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return (
      <div className="work-timeline-empty">
        <FiBriefcase size={32} />
        <p>No work history added yet</p>
      </div>
    );
  }

  return (
    <div className="work-timeline">
      <div className="timeline-line" />
      {entries.map((entry, idx) => (
        <motion.div
          key={idx}
          className={`timeline-entry ${entry.isCurrent ? 'current' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: idx * 0.1 }}
        >
          <div className="timeline-dot-wrapper">
            <div className={`timeline-dot ${entry.isCurrent ? 'pulse' : ''}`} />
          </div>
          <div className="timeline-content">
            <h4 className="timeline-title">{entry.title}</h4>
            <p className="timeline-company">{entry.company}</p>
            <p className="timeline-dates">
              {new Date(entry.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              {' — '}
              {entry.isCurrent || !entry.endDate
                ? <span className="current-badge">Present</span>
                : new Date(entry.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
              }
            </p>
            {entry.description && (
              <p className="timeline-desc">{entry.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkTimeline;
