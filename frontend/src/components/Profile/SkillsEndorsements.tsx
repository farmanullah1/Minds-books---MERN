import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FiThumbsUp, FiCheck } from 'react-icons/fi';
import './SkillsEndorsements.css';

interface Skill {
  name: string;
  endorsements: string[]; // User IDs or simple strings
}

interface SkillsEndorsementsProps {
  skills: Skill[];
  isOwnProfile: boolean;
  onEndorse: (skillName: string) => Promise<void>;
  currentUserAvatar?: string;
}

const EndorsementItem = ({ skill, isOwnProfile, onEndorse, currentUserAvatar }: { skill: Skill, isOwnProfile: boolean, onEndorse: (skillName: string) => Promise<void>, currentUserAvatar?: string }) => {
  const [loading, setLoading] = useState(false);
  const [endorsed, setEndorsed] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [count, setCount] = useState(skill.endorsements.length);
  const [avatars, setAvatars] = useState<string[]>(skill.endorsements.slice(0, 5)); // Just simulating avatars

  const numberSpring = useSpring({
    number: count,
    from: { number: skill.endorsements.length },
    config: { tension: 120, friction: 14 }
  });

  const handleEndorse = async () => {
    if (endorsed || isOwnProfile) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    await onEndorse(skill.name);
    
    setLoading(false);
    setEndorsed(true);
    setCount(prev => prev + 1);
    
    if (currentUserAvatar) {
      setAvatars(prev => [currentUserAvatar, ...prev]);
    } else {
      setAvatars(prev => ['default-avatar', ...prev]); // Dummy new avatar
    }

    setShowPlusOne(true);
    setTimeout(() => setShowPlusOne(false), 1500);
  };

  return (
    <div className="skill-item">
      <div className="skill-info">
        <h4>{skill.name}</h4>
        <div className="skill-endorsers">
          <animated.span className="endorsement-count">
            {numberSpring.number.to(n => Math.floor(n))}
          </animated.span>
          <span className="endorsement-label"> endorsements</span>
          
          <div className="endorser-avatars">
            {avatars.map((av, idx) => (
              <div 
                key={`${av}-${idx}`} 
                className={`endorser-avatar ${idx === 0 && endorsed ? 'slide-in' : ''}`}
              >
                {av === 'default-avatar' ? (
                  <div className="default-avatar-placeholder" />
                ) : (
                  <img src={av} alt="Endorser" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {!isOwnProfile && (
        <div className="endorse-action">
          <button 
            className={`btn-endorse ${endorsed ? 'endorsed' : ''} ${loading ? 'loading' : ''}`}
            onClick={handleEndorse}
            disabled={endorsed || loading}
          >
            {loading ? (
              <div className="spinner-small" />
            ) : endorsed ? (
              <><FiCheck /> Endorsed</>
            ) : (
              <><FiThumbsUp /> Endorse</>
            )}
          </button>
          
          {showPlusOne && <div className="floating-plus-one">+1</div>}
        </div>
      )}
    </div>
  );
};

const SkillsEndorsements: React.FC<SkillsEndorsementsProps> = ({ skills, isOwnProfile, onEndorse, currentUserAvatar }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="skills-endorsements-card">
      <h3 className="card-title">Skills & Endorsements</h3>
      <div className="skills-list">
        {skills.map((skill, idx) => (
          <EndorsementItem 
            key={idx} 
            skill={skill} 
            isOwnProfile={isOwnProfile} 
            onEndorse={onEndorse}
            currentUserAvatar={currentUserAvatar}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsEndorsements;
