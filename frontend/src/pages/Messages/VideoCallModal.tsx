import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import './VideoCallModal.css';

interface VideoCallModalProps {
  otherUser: any;
  onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ otherUser, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [callStatus, setCallStatus] = useState('Connecting...');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const statusTimeout = setTimeout(() => setCallStatus('On Call'), 2000);
    const interval = setInterval(() => {
      if (callStatus === 'On Call') {
        setTimer(prev => prev + 1);
      }
    }, 1000);

    return () => {
      clearTimeout(statusTimeout);
      clearInterval(interval);
    };
  }, [callStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`video-call-overlay ${isFullScreen ? 'fullscreen' : ''}`}>
      <div className="video-call-modal">
        {/* Main Video (Remote User) */}
        <div className="remote-video-container">
          {isVideoOff ? (
            <div className="video-placeholder">
              <img src={otherUser.profilePicture || '/default-avatar.png'} alt={otherUser.name} />
              <span>{otherUser.name}'s Video Paused</span>
            </div>
          ) : (
            <div className="video-sim">
               {/* Simulated Video Stream */}
               <img src={otherUser.profilePicture || '/default-avatar.png'} alt={otherUser.name} className="video-bg" />
               <div className="video-overlay-gradient"></div>
            </div>
          )}
          
          <div className="call-info-overlay">
            <h3>{otherUser.name}</h3>
            <span className="call-status">{callStatus === 'On Call' ? formatTime(timer) : callStatus}</span>
          </div>
        </div>

        {/* Local Video (Self) */}
        <div className="local-video-container">
           {/* Self view simulated */}
           <div className="local-video-sim"></div>
        </div>

        {/* Call Controls */}
        <div className="call-controls">
          <button 
            className={`control-btn ${isMuted ? 'active' : ''}`} 
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <FiMicOff /> : <FiMic />}
          </button>
          
          <button 
            className="control-btn end-call-btn" 
            onClick={onClose}
            title="End Call"
          >
            <FiPhoneOff />
          </button>

          <button 
            className={`control-btn ${isVideoOff ? 'active' : ''}`} 
            onClick={() => setIsVideoOff(!isVideoOff)}
            title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
          >
            {isVideoOff ? <FiVideoOff /> : <FiVideo />}
          </button>

          <button 
            className="control-btn" 
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullScreen ? <FiMinimize2 /> : <FiMaximize2 />}
          </button>
        </div>

        <button className="close-modal-btn" onClick={onClose}><FiX /></button>
      </div>
    </div>
  );
};

export default VideoCallModal;
