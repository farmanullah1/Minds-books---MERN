import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, config } from '@react-spring/web';
import './WorkHistoryTimeline.css';

interface WorkEntry {
  _id?: string;
  title: string;
  company: string;
  startYear?: number;
  endYear?: number;
}

interface WorkHistoryTimelineProps {
  workHistory: WorkEntry[];
}

const TimelineItem = ({ entry, index }: { entry: WorkEntry, index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isEven = index % 2 === 0;
  const isCurrent = !entry.endYear;

  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView 
      ? 'translate3d(0px, 0, 0)' 
      : `translate3d(${isEven ? '-50px' : '50px'}, 0, 0)`,
    config: config.wobbly,
    delay: index * 150
  });

  return (
    <div className={`timeline-item ${isEven ? 'left' : 'right'}`} ref={ref}>
      <div className="timeline-node">
        {isCurrent && <div className="pulse-dot" />}
      </div>
      
      <animated.div style={springProps} className="timeline-content card">
        <h4 className="work-title">{entry.title}</h4>
        <div className="work-company">{entry.company}</div>
        <div className="work-dates">
          {entry.startYear || 'Unknown'} - {entry.endYear || 'Present'}
        </div>
      </animated.div>
    </div>
  );
};

const WorkHistoryTimeline: React.FC<WorkHistoryTimelineProps> = ({ workHistory }) => {
  if (!workHistory || workHistory.length === 0) return null;

  // Sort by startYear descending (newest first)
  const sortedWork = [...workHistory].sort((a, b) => {
    const aStart = a.startYear || 0;
    const bStart = b.startYear || 0;
    return bStart - aStart;
  });

  return (
    <div className="work-history-card">
      <h3 className="card-title mb-4">Experience</h3>
      <div className="timeline-container">
        <div className="timeline-line" />
        {sortedWork.map((entry, idx) => (
          <TimelineItem key={entry._id || idx} entry={entry} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default WorkHistoryTimeline;
