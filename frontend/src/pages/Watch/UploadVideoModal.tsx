/**
 * UploadVideoModal — publish videos to Watch via posts API + dedicated video upload.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX, FiUploadCloud, FiImage, FiGlobe, FiUsers,
  FiLock, FiCheck, FiAlertCircle,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createPost } from '../../store/slices/postsSlice';
import { uploadFile, uploadVideoFile } from '../../services/api';
import { useToast } from '../../components/Toast/ToastContext';
import { postToVideoHubItem, VideoHubItem } from './videoHubUtils';
import './UploadVideoModal.css';

const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
const MAX_VIDEO_LABEL = '500MB';

interface UploadVideoModalProps {
  onClose: () => void;
  onSuccess?: (video: VideoHubItem) => void;
}

const UploadVideoModal: React.FC<UploadVideoModalProps> = ({ onClose, onSuccess }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2>(1);
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
  const [error, setError] = useState('');

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processVideo = (f: File) => {
    setError('');
    if (!f.type.startsWith('video/')) {
      setError('Please select a valid video file (MP4, MOV, WEBM, AVI).');
      return;
    }
    if (f.size > MAX_VIDEO_BYTES) {
      setError(`Video is too large (${formatSize(f.size)}). Maximum size is ${MAX_VIDEO_LABEL}.`);
      return;
    }
    setVideoFile(f);
    setVideoPreview(URL.createObjectURL(f));
    setStep(2);
  };

  const handleThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Thumbnail must be an image.');
      return;
    }
    setThumbFile(f);
    setThumbPreview(URL.createObjectURL(f));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !title.trim()) return;
    setUploading(true);
    setProgress(5);
    setError('');

    try {
      const videoRes = await uploadVideoFile(videoFile, (pct) => {
        setProgress(Math.min(15 + Math.round(pct * 0.65), 80));
      });

      let thumbUrl = '';
      if (thumbFile) {
        setProgress(85);
        const thumbRes = await uploadFile(thumbFile);
        thumbUrl = thumbRes.url;
      }

      const content = description.trim()
        ? `${title.trim()}\n\n${description.trim()}`
        : title.trim();

      setProgress(92);
      const created = await dispatch(
        createPost({
          content,
          video: videoRes.url,
          image: thumbUrl || undefined,
        } as any)
      ).unwrap();

      setProgress(100);
      showToast('Video published to Watch!', 'success');

      const hubItem = postToVideoHubItem({
        ...created,
        user: created.user || { name: user?.name, profilePicture: user?.profilePicture, _id: user?._id },
      });

      setTimeout(() => {
        onSuccess?.(hubItem);
        onClose();
      }, 400);
    } catch (err: any) {
      const msg =
        err.response?.status === 413
          ? `File too large. Videos must be under ${MAX_VIDEO_LABEL}.`
          : err.response?.data?.message || err.message || 'Upload failed. Please try again.';
      setError(msg);
      showToast(msg, 'error');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const privacyOpts = [
    { value: 'public', icon: <FiGlobe />, label: 'Public', sub: 'Anyone can watch' },
    { value: 'friends', icon: <FiUsers />, label: 'Friends', sub: 'Only your friends' },
    { value: 'private', icon: <FiLock />, label: 'Only Me', sub: 'Just you' },
  ];

  return (
    <div
      className="uvm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !uploading) onClose();
      }}
    >
      <motion.div
        className="uvm-modal card"
        initial={{ scale: 0.93, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
      >
        <div className="uvm-header">
          <h3>Upload Video</h3>
          <button type="button" className="uvm-close-btn" onClick={onClose} disabled={uploading}>
            <FiX size={20} />
          </button>
        </div>

        <div className="uvm-step-indicator">
          <div className={`uvm-step ${step >= 1 ? 'done' : ''}`}>1. Select Video</div>
          <div className="uvm-step-divider" />
          <div className={`uvm-step ${step >= 2 ? 'active' : ''}`}>2. Details & Publish</div>
        </div>

        {error && (
          <div className="uvm-error-banner" role="alert">
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="uvm-body">
          <AnimatePresence mode="wait">
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
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && videoInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={videoInputRef}
                    accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) processVideo(f);
                    }}
                  />
                  <div className="uvm-dz-icon"><FiUploadCloud size={48} /></div>
                  <h4>Drag & drop your video here</h4>
                  <p>Or click to browse — MP4, MOV, WEBM (up to {MAX_VIDEO_LABEL})</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => { e.stopPropagation(); videoInputRef.current?.click(); }}
                  >
                    Choose File
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSubmit} className="uvm-details-form">
                  <div className="uvm-split">
                    <div className="uvm-preview-col">
                      <div className="uvm-video-preview">
                        <video src={videoPreview} controls muted style={{ width: '100%', borderRadius: '10px', maxHeight: '220px' }} />
                        {videoFile && (
                          <span className="uvm-file-meta">{videoFile.name} · {formatSize(videoFile.size)}</span>
                        )}
                        <button
                          type="button"
                          className="uvm-change-btn"
                          onClick={() => { setStep(1); setVideoFile(null); setVideoPreview(''); }}
                          disabled={uploading}
                        >
                          Change Video
                        </button>
                      </div>

                      <div className="uvm-thumb-section">
                        <label className="uvm-label">Thumbnail (optional)</label>
                        {thumbPreview ? (
                          <div className="uvm-thumb-preview">
                            <img src={thumbPreview} alt="Thumbnail" />
                            <button
                              type="button"
                              className="uvm-remove-btn"
                              onClick={() => { setThumbFile(null); setThumbPreview(''); }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button type="button" className="uvm-thumb-btn" onClick={() => thumbInputRef.current?.click()}>
                            <FiImage size={18} /> Add Thumbnail
                          </button>
                        )}
                        <input type="file" ref={thumbInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleThumb} />
                      </div>
                    </div>

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
                              onClick={() => setPrivacy(opt.value as typeof privacy)}
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

                  {uploading && (
                    <div className="uvm-progress-wrap">
                      <div className="uvm-progress-track">
                        <div className="uvm-progress-bar" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="uvm-progress-label">
                        {progress < 80 ? 'Uploading video…' : progress < 95 ? 'Publishing…' : 'Done!'} {progress}%
                      </span>
                    </div>
                  )}

                  <div className="uvm-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose} disabled={uploading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={uploading || !title.trim()}>
                      {uploading ? 'Publishing…' : 'Publish Video'}
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

  function handleVideoDrop(e: React.DragEvent) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processVideo(f);
  }
};

export default UploadVideoModal;
