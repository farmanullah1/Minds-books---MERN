/**
 * CodeDNA
 * VideoPlayer.tsx — Premium Custom HTML5 Video Player
 * exports: default VideoPlayer
 * used_by: VideoPage, MediaViewer, etc.
 * rules: Yellow theme primary, full custom controls, keyboard shortcuts
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiMinimize, 
  FiSettings, FiDownload, FiTv, FiMonitor, FiRotateCcw, FiRotateCw
} from 'react-icons/fi';
import './VideoPlayer.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  onProgress?: (percent: number) => void;
  allowDownload?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  poster, 
  autoPlay = false, 
  onProgress,
  allowDownload = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheatreMode, setIsTheatreMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [quality, setQuality] = useState('720p');

  // Controls auto-hide timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && showControls) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      // Don't trigger if user is typing in input/textarea
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skip(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.05);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.05);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, volume]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);

    if (onProgress) {
      onProgress(percent);
    }

    // Handle buffer progress
    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      setBufferProgress((bufferedEnd / video.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const adjustVolume = (amount: number) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = Math.max(0, Math.min(1, video.volume + amount));
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Fullscreen failed:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Sync fullscreen change with state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleTheatreMode = () => {
    setIsTheatreMode(!isTheatreMode);
  };

  const handleSpeedChange = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const enterPiP = async () => {
    const video = videoRef.current;
    if (!video || !document.pictureInPictureEnabled) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (err) {
      console.error("PiP error:", err);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);

    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    if (hrs > 0) {
      const formattedMins = mins < 10 ? `0${mins}` : mins;
      return `${hrs}:${formattedMins}:${formattedSecs}`;
    }
    return `${mins}:${formattedSecs}`;
  };

  return (
    <div 
      ref={containerRef} 
      className={`premium-video-player ${isTheatreMode ? 'theatre-mode' : ''}`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="main-video-element"
        autoPlay={autoPlay}
      />

      {/* Dark overlay when controls are active */}
      <AnimatePresence>
        {(!isPlaying || showControls) && (
          <motion.div 
            className="video-controls-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Large Center Play/Pause Indicator (Confetti style) */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.button 
            className="big-play-btn"
            onClick={togglePlay}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FiPlay size={40} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Controls Bar */}
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div 
            className="video-controls-bar"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as any }}
          >
            {/* Custom Progress Bar with Buffer */}
            <div className="progress-bar-container">
              <div 
                className="buffer-progress" 
                style={{ width: `${bufferProgress}%` }}
              />
              <div 
                className="play-progress" 
                style={{ width: `${progress}%` }}
              />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress || 0} 
                onChange={handleSeek} 
                className="seek-slider"
              />
            </div>

            <div className="controls-row">
              <div className="controls-group left">
                <button className="control-btn" onClick={togglePlay}>
                  {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                </button>

                <button className="control-btn" onClick={() => skip(-10)}>
                  <FiRotateCcw size={18} />
                </button>
                <button className="control-btn" onClick={() => skip(10)}>
                  <FiRotateCw size={18} />
                </button>

                <div className="volume-control-group">
                  <button className="control-btn" onClick={toggleMute}>
                    {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.05"
                    value={isMuted ? 0 : volume} 
                    onChange={handleVolumeChange} 
                    className="volume-slider"
                  />
                </div>

                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span className="time-separator">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="controls-group right">
                {/* Speed Menu */}
                <div className="menu-dropdown-wrapper">
                  <button 
                    className="control-btn speed-btn" 
                    onClick={() => {
                      setShowSpeedMenu(!showSpeedMenu);
                      setShowQualityMenu(false);
                    }}
                  >
                    <span>{playbackSpeed}x</span>
                  </button>
                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div 
                        className="speed-menu-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                          <button 
                            key={s} 
                            onClick={() => handleSpeedChange(s)}
                            className={playbackSpeed === s ? 'active' : ''}
                          >
                            {s}x
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quality Menu (Scaffold) */}
                <div className="menu-dropdown-wrapper">
                  <button 
                    className="control-btn" 
                    onClick={() => {
                      setShowQualityMenu(!showQualityMenu);
                      setShowSpeedMenu(false);
                    }}
                  >
                    <FiSettings size={18} />
                  </button>
                  <AnimatePresence>
                    {showQualityMenu && (
                      <motion.div 
                        className="speed-menu-dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {['1080p', '720p', '480p', 'Auto'].map((q) => (
                          <button 
                            key={q} 
                            onClick={() => {
                              setQuality(q);
                              setShowQualityMenu(false);
                            }}
                            className={quality === q ? 'active' : ''}
                          >
                            {q}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {allowDownload && (
                  <a href={src} download className="control-btn download-btn" title="Download">
                    <FiDownload size={18} />
                  </a>
                )}

                <button className="control-btn" onClick={enterPiP} title="Picture in Picture">
                  <FiTv size={18} />
                </button>

                <button className="control-btn" onClick={toggleTheatreMode} title="Theatre Mode">
                  <FiMonitor size={18} />
                </button>

                <button className="control-btn" onClick={toggleFullscreen}>
                  {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;
