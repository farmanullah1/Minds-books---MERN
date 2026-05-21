/**
 * VideoCallModal.tsx
 * Real camera/microphone access via WebRTC getUserMedia.
 * Remote video shows a "Waiting to connect" overlay (no signaling server yet).
 * Supports both voice and video call types.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FiMic, FiMicOff, FiVideo, FiVideoOff,
  FiPhoneOff, FiMaximize2, FiMinimize2,
  FiMessageSquare, FiSmile
} from 'react-icons/fi';
import './VideoCallModal.css';

interface VideoCallModalProps {
  otherUser: any;
  callType?: 'voice' | 'video';
  onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  otherUser,
  callType = 'video',
  onClose
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'voice');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [callStatus, setCallStatus] = useState<'ringing' | 'connecting' | 'connected'>('ringing');
  const [timer, setTimer] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<any>(null);

  // Request camera + microphone access
  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn('Camera/mic access denied:', err);
        setCameraError(true);
      }
    };
    initMedia();

    // Simulate ringing → connecting → connected
    const ringTimeout = setTimeout(() => setCallStatus('connecting'), 1500);
    const connTimeout = setTimeout(() => setCallStatus('connected'), 3000);

    return () => {
      clearTimeout(ringTimeout);
      clearTimeout(connTimeout);
    };
  }, [callType]);

  // Timer once connected
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [callStatus]);

  // Cleanup streams on close
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localStream]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((t) => (t.enabled = isMuted));
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((t) => (t.enabled = isVideoOff));
    }
    setIsVideoOff(!isVideoOff);
  };

  const handleEndCall = () => {
    if (localStream) localStream.getTracks().forEach((t) => t.stop());
    onClose();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const statusLabel = {
    ringing: 'Ringing...',
    connecting: 'Connecting...',
    connected: formatTime(timer),
  }[callStatus];

  return (
    <div className={`vcm-overlay ${isFullScreen ? 'vcm-fullscreen' : ''}`}>
      <motion.div
        className="vcm-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 320 }}
      >
        {/* Ringing pulse ring (only while ringing) */}
        {callStatus === 'ringing' && (
          <>
            <div className="vcm-ring ring-a" />
            <div className="vcm-ring ring-b" />
          </>
        )}

        {/* Remote Video / Avatar area */}
        <div className="vcm-remote-area">
          {callStatus !== 'connected' || !callType || callType === 'voice' ? (
            /* Show avatar when voice call or not yet connected */
            <div className="vcm-remote-avatar">
              {otherUser?.profilePicture ? (
                <img src={otherUser.profilePicture} alt={otherUser.name} className="vcm-avatar-img" />
              ) : (
                <div className="vcm-avatar-placeholder">
                  {otherUser?.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              {callStatus === 'ringing' && (
                <div className="vcm-avatar-ripple" />
              )}
            </div>
          ) : (
            /* Connected video call - show "waiting" overlay (no server yet) */
            <div className="vcm-remote-video-placeholder">
              {otherUser?.profilePicture ? (
                <img src={otherUser.profilePicture} alt={otherUser.name} className="vcm-remote-bg" />
              ) : (
                <div className="vcm-remote-bg-fallback">{otherUser?.name?.[0] || '?'}</div>
              )}
              <div className="vcm-waiting-overlay">
                <span>Waiting for {otherUser?.name} to join...</span>
              </div>
            </div>
          )}

          {/* User name + status */}
          <div className="vcm-remote-info">
            <h3 className="vcm-remote-name">{otherUser?.name || 'Unknown'}</h3>
            <span className={`vcm-status-badge ${callStatus}`}>{statusLabel}</span>
          </div>
        </div>

        {/* Local Self Preview (PiP camera) */}
        {callType === 'video' && (
          <div className={`vcm-local-pip ${isVideoOff ? 'pip-off' : ''}`}>
            {!isVideoOff && !cameraError ? (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="vcm-local-video"
              />
            ) : (
              <div className="vcm-local-avatar-fallback">
                {cameraError ? '📵' : '📷'}
              </div>
            )}
            <span className="vcm-pip-label">You</span>
          </div>
        )}

        {/* Controls Bar */}
        <div className="vcm-controls">
          {/* Mute */}
          <div className="vcm-control-group">
            <button
              className={`vcm-ctrl-btn ${isMuted ? 'vcm-ctrl-active' : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <FiMicOff size={22} /> : <FiMic size={22} />}
            </button>
            <span className="vcm-ctrl-label">{isMuted ? 'Unmuted' : 'Mute'}</span>
          </div>

          {/* End Call */}
          <div className="vcm-control-group">
            <button className="vcm-ctrl-btn vcm-end-btn" onClick={handleEndCall} title="End Call">
              <FiPhoneOff size={24} />
            </button>
            <span className="vcm-ctrl-label">End</span>
          </div>

          {/* Video toggle (only in video call) */}
          {callType === 'video' && (
            <div className="vcm-control-group">
              <button
                className={`vcm-ctrl-btn ${isVideoOff ? 'vcm-ctrl-active' : ''}`}
                onClick={toggleVideo}
                title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
              >
                {isVideoOff ? <FiVideoOff size={22} /> : <FiVideo size={22} />}
              </button>
              <span className="vcm-ctrl-label">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
            </div>
          )}

          {/* Fullscreen */}
          <div className="vcm-control-group">
            <button
              className="vcm-ctrl-btn"
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullScreen ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
            </button>
            <span className="vcm-ctrl-label">{isFullScreen ? 'Exit Full' : 'Fullscreen'}</span>
          </div>
        </div>

        {/* Camera access error notice */}
        {cameraError && callType === 'video' && (
          <div className="vcm-camera-error">
            📵 Camera/mic access denied. Check browser permissions.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VideoCallModal;
