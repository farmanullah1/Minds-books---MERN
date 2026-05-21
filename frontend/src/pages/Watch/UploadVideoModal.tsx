/**
 * UploadVideoModal.tsx
 * Full-featured video upload modal for VideoHub.
 * Lets users upload a video file, add title/description/thumbnail, set privacy, then publishes as a post.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiUploadCloud, FiImage, FiGlobe, FiUsers,
  FiLock, FiCheck, FiPlay
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPost } from '../../store/slices/postsSlice';
import { uploadFile } from '../../services/api';
import api from '../../services/api';
import './UploadVideoModal.css';

interface UploadVideoModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [step, setStep] = useState<1 | 2>(1); // Step 1: pick file, Step 2: details
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<'public' | 'friends' | 'private'>('public');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('video/')) processVideo(f);
  };

  const processVideo = (f: File) => {
    setVideoFile(f);
    setVideoPreview(URL.createObjectURL(f));
    setStep(2);
  };

  const handleThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setThumbFile(f);
    setThumbPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !title.trim()) return;
    setUploading(true);
    setProgress(10);

    try {
      // Upload video
      setProgress(20);
      const videoRes = await uploadFile(videoFile);
      setProgress(60);

      // Upload thumbnail if provided
      let thumbUrl = '';
      if (thumbFile) {
        const thumbRes = await uploadFile(thumbFile);
        thumbUrl = thumbRes.url;
      }
      setProgress(80);

      // Create post as video
      const postData: any = {
        content: description || title,
        video: videoRes.url,
        videoTitle: title,
        thumbnail: thumbUrl,
        privacy: { type: privacy },
        metadata: { isVideoHub: true }
      };

      await dispatch(createPost(postData)).unwrap();
      setProgress(100);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 500);
    } catch (err) {
      console.error('Video upload failed:', err);
      setUploading(false);
      setProgress(0);
    }
  };

  const privacyOpts = [
    { value: 'public', icon: <FiGlobe />, label: 'Public', sub: 'Anyone can watch' },
    { value: 'friends', icon: <FiUsers />, label: 'Friends', sub: 'Only your friends' },
    { value: 'private', icon: <FiLock />, label: 'Only Me', sub: 'Just you' },
  ];

  return (
    <div className="uvm-overlay" onClick={(e) => { if (e.target === e.currentTarget && !uploading) onClose(); }}>
      <motion.div
        className="uvm-modal card"
        initial={{ scale: 0.93, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
      >
        {/* Header */}
        <div className="uvm-header">
          <h3>Upload Video</h3>
          <button className="uvm-close-btn" onClick={onClose} disabled={uploading}><FiX size={20} /></button>
        </div>

        <div className="uvm-step-indicator">
          <div className={`uvm-step ${step >= 1 ? 'done' : ''}`}>1. Select Video</div>
          <div className="uvm-step-divider" />
          <div className={`uvm-step ${step >= 2 ? 'active' : ''}`}>2. Details & Publish</div>
        </div>

        <div className="uvm-body">
          <AnimatePresence mode="wait">
            {/* Step 1: File Pick */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="uvm-dropzone-wrap"
              >
                <div
                  className={`uvm-dropzone ${drag ? 'drag-active' : ''}`}
                  onDragEnter={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={handleVideoDrop}
                  onClick={() => videoInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={videoInputRef}
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) processVideo(f); }}
                  />
                  <div className="uvm-dz-icon"><FiUploadCloud size={48} /></div>
                  <h4>Drag & drop your video here</h4>
                  <p>Or click to browse — MP4, MOV, AVI (up to 500MB)</p>
                  <button type="button" className="btn btn-primary" onClick={(e) => { e.stopPropagation(); videoInputRef.current?.click(); }}>
                    Choose File
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSubmit} className="uvm-details-form">
                  <div className="uvm-split">
                    {/* Left: Video Preview */}
                    <div className="uvm-preview-col">
                      <div className="uvm-video-preview">
                        <video src={videoPreview} controls muted style={{ width: '100%', borderRadius: '10px', maxHeight: '220px' }} />
                        <button type="button" className="uvm-change-btn" onClick={() => { setStep(1); setVideoFile(null); setVideoPreview(''); }}>
                          Change Video
                        </button>
                      </div>

                      {/* Thumbnail */}
                      <div className="uvm-thumb-section">
                        <label className="uvm-label">Thumbnail (optional)</label>
                        {thumbPreview ? (
                          <div className="uvm-thumb-preview" style={{ position: 'relative' }}>
                            <img src={thumbPreview} alt="Thumbnail" style={{ width: '100%', borderRadius: '8px', maxHeight: '100px', objectFit: 'cover' }} />
                            <button type="button" className="uvm-remove-btn" onClick={() => { setThumbFile(null); setThumbPreview(''); }}>✕</button>
                          </div>
                        ) : (
                          <button type="button" className="uvm-thumb-btn" onClick={() => thumbInputRef.current?.click()}>
                            <FiImage size={18} /> Add Thumbnail
                          </button>
                        )}
                        <input type="file" ref={thumbInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleThumb} />
                      </div>
                    </div>

                    {/* Right: Form */}
                    <div className="uvm-form-col">
                      <div className="uvm-field">
                        <label className="uvm-label">Title *</label>
                        <input
                          type="text"
                          className="uvm-input"
                          placeholder="Give your video a title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          maxLength={100}
                          required
                          autoFocus
                        />
                      </div>

                      <div className="uvm-field">
                        <label className="uvm-label">Description</label>
                        <textarea
                          className="uvm-textarea"
                          placeholder="Tell viewers about your video..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          maxLength={2000}
                        />
                      </div>

                      <div className="uvm-field">
                        <label className="uvm-label">Audience</label>
                        <div className="uvm-privacy-options">
                          {privacyOpts.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              className={`uvm-privacy-btn ${privacy === opt.value ? 'active' : ''}`}
                              onClick={() => setPrivacy(opt.value as any)}
                            >
                              <span className="uvm-priv-icon">{opt.icon}</span>
                              <span>
                                <strong>{opt.label}</strong>
                                <small>{opt.sub}</small>
                              </span>
                              {privacy === opt.value && <FiCheck className="uvm-check" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload progress */}
                  {uploading && (
                    <div className="uvm-progress-wrap">
                      <div className="uvm-progress-bar" style={{ width: `${progress}%` }} />
                      <span className="uvm-progress-label">Uploading... {progress}%</span>
                    </div>
                  )}

                  <div className="uvm-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose} disabled={uploading}>Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={uploading || !title.trim()}>
                      {uploading ? 'Publishing...' : '🚀 Publish Video'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadVideoModal;
