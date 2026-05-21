import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiUploadCloud, FiMusic, FiVideo, 
  FiSliders, FiPlay, FiPause, FiCheck, FiSliders as FiFilter 
} from 'react-icons/fi';
import { useToast } from '../../components/Toast/ToastContext';
import { filters } from '../../utils/photoFilters';
import api from '../../services/api';
import './CreateReel.css';

interface CreateReelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateReel: React.FC<CreateReelProps> = ({ isOpen, onClose, onSuccess }) => {
  const { showToast } = useToast();
  
  // Selection/Preview states
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  
  // Custom editing states
  const [startTrim, setStartTrim] = useState<number>(0);
  const [endTrim, setEndTrim] = useState<number>(15); // Default 15s short video limit
  const [selectedFilter, setSelectedFilter] = useState<string>('Original');
  const [caption, setCaption] = useState<string>('');
  const [musicName, setMusicName] = useState<string>('Original Audio');
  
  // Upload and UI States
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Clean up object URL when modal closes or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Keep video looping within trim limits
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= endTrim) {
        video.currentTime = startTrim;
        video.play().catch(() => {});
      } else if (video.currentTime < startTrim) {
        video.currentTime = startTrim;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [startTrim, endTrim, previewUrl]);

  if (!isOpen) return null;

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        processVideoFile(file);
      } else {
        showToast('Please select a valid video file.', 'error');
      }
    }
  };

  // Process selected file
  const processVideoFile = (file: File) => {
    setVideoFile(file);
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setStartTrim(0);
    // Defaults: reset trim boundaries
    setIsPlaying(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processVideoFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Video metadata loaded
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const vidDuration = video.duration || 0;
      setDuration(vidDuration);
      setEndTrim(Math.min(vidDuration, 30)); // Max default trim window of 30 seconds
    }
  };

  // Toggle Video playback
  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Trimming Slider Actions
  const handleStartTrimChange = (val: number) => {
    const nextStart = Math.min(val, endTrim - 1);
    setStartTrim(nextStart);
    if (videoRef.current) {
      videoRef.current.currentTime = nextStart;
    }
  };

  const handleEndTrimChange = (val: number) => {
    const nextEnd = Math.max(val, startTrim + 1);
    setEndTrim(nextEnd);
    if (videoRef.current) {
      videoRef.current.currentTime = startTrim;
    }
  };

  // Reset Creator Workspace
  const handleReset = () => {
    setVideoFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
    setCaption('');
    setMusicName('Original Audio');
    setSelectedFilter('Original');
    setUploadProgress(0);
  };

  // Upload and Submit to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      showToast('Please select a video file first.', 'error');
      return;
    }

    setIsUploading(true);
    setUploadProgress(15); // simulate progressive upload feedback

    try {
      // 1. Upload Video File
      const formData = new FormData();
      formData.append('media', videoFile);

      setUploadProgress(35);
      const uploadRes = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadProgress(70);
      const uploadedUrl = uploadRes.data.url;

      // 2. Submit Reel Payload
      await api.post('/reels', {
        videoUrl: uploadedUrl,
        caption: caption,
        musicName: musicName,
        startTrim,
        endTrim,
        filterName: selectedFilter,
      });

      setUploadProgress(100);
      showToast('Reel published successfully!', 'success');
      
      // Cleanup & Callback
      setTimeout(() => {
        handleReset();
        setIsUploading(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 500);

    } catch (error: any) {
      console.error('Failed to upload Reel:', error);
      showToast(error.response?.data?.message || 'Failed to upload Reel. Try again.', 'error');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <AnimatePresence>
      <div className="createreel-modal-overlay">
        <motion.div 
          className="createreel-modal-content card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          {/* Modal Header */}
          <div className="createreel-header">
            <h3>Create a Reel</h3>
            <button className="close-modal-btn" onClick={onClose} disabled={isUploading}>
              <FiX size={20} />
            </button>
          </div>

          <div className="createreel-body">
            {!previewUrl ? (
              /* Phase 1: Upload Dropzone UI */
              <div 
                className={`createreel-dropzone ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="video/*" 
                  style={{ display: 'none' }} 
                />
                
                <div className="dropzone-hud-content">
                  <div className="upload-circle-icon">
                    <FiUploadCloud size={40} />
                  </div>
                  <h4>Drag video here</h4>
                  <p>Or click to browse from device folders</p>
                  <span className="upload-limit-info">Up to 60 seconds (Short video format)</span>
                </div>
              </div>
            ) : (
              /* Phase 2: High-Fidelity Video Trimming & Editing Workspace */
              <form onSubmit={handleSubmit} className="createreel-workspace">
                
                <div className="workspace-split">
                  {/* Left Column: Visual Video Preview Node */}
                  <div className="workspace-preview-panel">
                    <div className="video-viewport-wrapper">
                      <video 
                        ref={videoRef}
                        src={previewUrl}
                        className="workspace-video-preview"
                        onLoadedMetadata={handleLoadedMetadata}
                        style={{ filter: filters[selectedFilter] || '' }}
                        onClick={togglePlay}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      
                      <button 
                        type="button" 
                        className="play-pause-overlay-btn" 
                        onClick={togglePlay}
                      >
                        {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} />}
                      </button>

                      {/* Mini watermark/indicator */}
                      <span className="live-preview-pill">PREVIEW</span>
                    </div>

                    {/* Reset File trigger */}
                    <button 
                      type="button" 
                      className="btn-text-action change-video-btn" 
                      onClick={handleReset}
                      disabled={isUploading}
                    >
                      <FiVideo size={14} /> Change Video
                    </button>
                  </div>

                  {/* Right Column: Custom Controllers & Metadatas */}
                  <div className="workspace-controls-panel">
                    
                    {/* Visual Trimming Boundaries Widgets */}
                    <div className="editor-control-group">
                      <label className="control-label">
                        <FiSliders size={14} />
                        <span>Trimming Boundaries (Visual Duration)</span>
                      </label>
                      
                      <div className="trimmer-sliders-widget">
                        <div className="trimmer-value-hud">
                          <span>Start: <b>{startTrim.toFixed(1)}s</b></span>
                          <span>End: <b>{endTrim.toFixed(1)}s</b></span>
                        </div>

                        {/* Start Trim Slider */}
                        <div className="trim-slider-row">
                          <span className="slider-row-lbl">Start</span>
                          <input 
                            type="range"
                            min="0"
                            max={duration ? duration : 60}
                            step="0.1"
                            value={startTrim}
                            onChange={(e) => handleStartTrimChange(parseFloat(e.target.value))}
                            className="trim-range-input"
                          />
                        </div>

                        {/* End Trim Slider */}
                        <div className="trim-slider-row">
                          <span className="slider-row-lbl">End</span>
                          <input 
                            type="range"
                            min="1"
                            max={duration ? duration : 60}
                            step="0.1"
                            value={endTrim}
                            onChange={(e) => handleEndTrimChange(parseFloat(e.target.value))}
                            className="trim-range-input"
                          />
                        </div>
                        
                        <div className="trim-duration-badge">
                          <span>Total Length: {(endTrim - startTrim).toFixed(1)}s</span>
                        </div>
                      </div>
                    </div>

                    {/* Custom CSS Filters presets horizontal scroll row */}
                    <div className="editor-control-group">
                      <label className="control-label">
                        <FiFilter size={14} />
                        <span>Preset Aesthetic Filters</span>
                      </label>
                      
                      <div className="filters-preset-tray">
                        {Object.keys(filters).map((filterName) => (
                          <button
                            key={filterName}
                            type="button"
                            className={`filter-preset-chip ${selectedFilter === filterName ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(filterName)}
                          >
                            <span className="filter-chip-text">{filterName}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Caption description input */}
                    <div className="editor-control-group">
                      <label className="control-label">Description Caption</label>
                      <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a custom description... Add hashtags #coding #mindbook"
                        className="caption-textarea"
                        rows={3}
                        maxLength={250}
                        required
                      />
                    </div>

                    {/* Music track tag */}
                    <div className="editor-control-group">
                      <label className="control-label">
                        <FiMusic size={14} />
                        <span>Music Audio Name</span>
                      </label>
                      <input
                        type="text"
                        value={musicName}
                        onChange={(e) => setMusicName(e.target.value)}
                        placeholder="Original Audio - user_name"
                        className="music-text-input"
                        maxLength={50}
                      />
                    </div>

                  </div>
                </div>

                {/* Form submit footer action panel */}
                <div className="workspace-footer">
                  {isUploading && (
                    <div className="upload-progress-hud">
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
                      </div>
                      <span className="progress-text">Uploading Reel data... {uploadProgress}%</span>
                    </div>
                  )}

                  <div className="action-buttons-row">
                    <button 
                      type="button" 
                      className="btn-cancel" 
                      onClick={onClose}
                      disabled={isUploading}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-submit"
                      disabled={isUploading}
                    >
                      <FiCheck size={16} /> Publish Reel
                    </button>
                  </div>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateReel;
