import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import { Upload, Link as LinkIcon, Minus, Plus, RotateCcw, RotateCw } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import api from '../../services/api';
import { useAppDispatch } from '../../store/hooks';
import { updateUserInState } from '../../store/slices/authSlice';
import { useToast } from '../../components/Toast/ToastContext';
import styles from './ProfilePicModal.module.css';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ProfilePicModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (url: string, previewUrl?: string, blob?: Blob) => void;
  type?: 'profile' | 'cover';
  mode?: 'upload' | 'signup';
}

// Helper: load image to draw on canvas
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.setAttribute('crossOrigin', 'anonymous'); // Avoid tainted canvas
    img.src = url;
  });
}

// Helper: crop image to a blob using canvas
async function getCroppedBlob(imageSrc: string, croppedAreaPixels: CropArea, rotation: number = 0): Promise<Blob> {
  const img = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get 2D context');

  const { width, height } = croppedAreaPixels;
  canvas.width = width;
  canvas.height = height;

  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-width / 2, -height / 2);
  ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, width, height, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas to Blob conversion failed'));
    }, 'image/webp', 0.92);
  });
}

export default function ProfilePicModal({
  open,
  onClose,
  onSave,
  type = 'profile',
  mode = 'upload',
}: ProfilePicModalProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState<CropArea | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [urlError, setUrlError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProfile = type === 'profile';
  const aspectRatio = isProfile ? 1 : 820 / 312;

  // Handle local file selection
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file.', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image must be under 10MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setImageSrc(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Preview Image from public URL
  const handleUrlPreview = () => {
    setUrlError('');
    if (!urlInput.startsWith('http')) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    setUrlPreview(urlInput);
  };

  const onCropComplete = useCallback((_: any, areaPixels: CropArea) => {
    setCroppedArea(areaPixels);
  }, []);

  // Save the image: either uploads immediately (mode="upload") or passes blob (mode="signup")
  const handleSaveFile = async () => {
    if (!imageSrc || !croppedArea) return;
    setUploading(true);
    setProgress(0);

    try {
      const croppedBlob = await getCroppedBlob(imageSrc, croppedArea, rotation);
      const previewUrl = URL.createObjectURL(croppedBlob);

      if (mode === 'signup') {
        // Signup mode: pass details upward to Register form state, do not upload yet
        showToast(`${isProfile ? 'Profile picture' : 'Cover photo'} prepared!`, 'success');
        onSave?.(previewUrl, previewUrl, croppedBlob);
        handleClose();
        return;
      }

      // Active Session Upload mode
      const formData = new FormData();
      formData.append(isProfile ? 'profilePicture' : 'coverPhoto', croppedBlob, 'photo.webp');

      const uploadUrl = isProfile ? '/users/upload-profile-pic' : '/users/upload-cover-photo';

      // Simulate a loading progress bar
      const progressInterval = setInterval(() => {
        setProgress((p) => (p < 90 ? p + 10 : p));
      }, 100);

      const response = await api.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      clearInterval(progressInterval);
      setProgress(100);

      const savedUrl = isProfile ? response.data.profilePicture : response.data.coverPhoto;
      
      // Update globally in Redux state
      dispatch(updateUserInState(isProfile ? { profilePicture: savedUrl } : { coverPicture: savedUrl }));

      showToast(`${isProfile ? 'Profile picture' : 'Cover photo'} updated!`, 'success');
      onSave?.(savedUrl, previewUrl, croppedBlob);
      handleClose();
    } catch (err: any) {
      console.error(err);
      showToast(err.response?.data?.message || 'Upload failed. Try again.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Save photo from pasted URL: handles backend download & storage proxy
  const handleSaveUrl = async () => {
    if (!urlInput) return;
    setUploading(true);

    try {
      if (mode === 'signup') {
        // Signup mode: pass URL directly, Register form can submit it
        showToast(`${isProfile ? 'Profile picture' : 'Cover photo'} link configured!`, 'success');
        onSave?.(urlInput, urlInput);
        handleClose();
        return;
      }

      const response = await api.post('/users/update-photo-url', {
        type: isProfile ? 'profile' : 'cover',
        url: urlInput,
      });

      const savedUrl = isProfile ? response.data.profilePicture : response.data.coverPhoto;
      
      // Update globally in Redux state
      dispatch(updateUserInState(isProfile ? { profilePicture: savedUrl } : { coverPicture: savedUrl }));

      showToast('Photo updated successfully!', 'success');
      onSave?.(savedUrl, urlInput);
      handleClose();
    } catch (err: any) {
      console.error(err);
      setUrlError(err.response?.data?.message || 'Could not save that image URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setUrlInput('');
    setUrlPreview(null);
    setUrlError('');
    setProgress(0);
    setUploading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isProfile ? 'Update Profile Picture' : 'Update Cover Photo'}
      size="md"
    >
      <div className={styles.content}>
        {/* TABS */}
        <div className={styles.tabs} role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'upload'}
            className={`${styles.tab} ${tab === 'upload' ? styles.tabActive : ''}`}
            onClick={() => setTab('upload')}
          >
            <Upload size={15} /> Upload File
          </button>
          <button
            role="tab"
            aria-selected={tab === 'url'}
            className={`${styles.tab} ${tab === 'url' ? styles.tabActive : ''}`}
            onClick={() => setTab('url')}
          >
            <LinkIcon size={15} /> From URL
          </button>
        </div>

        {/* UPLOAD TAB */}
        <AnimatePresence mode="wait">
          {tab === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              {!imageSrc ? (
                <div
                  className={styles.dropZone}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files[0];
                    if (f) {
                      const inp = fileInputRef.current;
                      if (inp) {
                        const dt = new DataTransfer();
                        dt.items.add(f);
                        inp.files = dt.files;
                        onFileChange({ target: inp } as any);
                      }
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Click or drag to upload image"
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <Upload size={32} className={styles.dropIcon} />
                  <p className={styles.dropTitle}>Click to upload or drag & drop</p>
                  <p className={styles.dropSub}>JPG, PNG, GIF, WEBP · Max 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className={styles.hiddenInput}
                  />
                </div>
              ) : (
                <div className={styles.cropContainer}>
                  <div className={styles.cropArea}>
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      rotation={rotation}
                      aspect={aspectRatio}
                      cropShape={isProfile ? 'round' : 'rect'}
                      showGrid={!isProfile}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  {/* Controls */}
                  <div className={styles.controls}>
                    <div className={styles.sliderWrapper}>
                      <Minus
                        size={14}
                        onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                        className={styles.controlBtn}
                      />
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.01}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className={styles.slider}
                        aria-label="Zoom"
                      />
                      <Plus
                        size={14}
                        onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                        className={styles.controlBtn}
                      />
                      <span className={styles.controlLabelText}>Zoom</span>
                    </div>

                    <div className={styles.rotateRow}>
                      <button
                        type="button"
                        className={styles.rotateBtn}
                        onClick={() => setRotation((r) => r - 90)}
                        aria-label="Rotate left"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        type="button"
                        className={styles.rotateBtn}
                        onClick={() => setRotation((r) => r + 90)}
                        aria-label="Rotate right"
                      >
                        <RotateCw size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Simulated Upload progress */}
                  {uploading && progress > 0 && (
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressBar}>
                        <motion.div
                          className={styles.progressFill}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                      <span className={styles.progressText}>{progress}%</span>
                    </div>
                  )}

                  <Button
                    className={styles.changeBtn}
                    variant="ghost"
                    onClick={() => {
                      setImageSrc(null);
                      setZoom(1);
                      setRotation(0);
                    }}
                  >
                    Choose different image
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* URL TAB */}
          {tab === 'url' && (
            <motion.div
              key="url"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={styles.urlTab}
            >
              <p className={styles.urlHint}>Paste the URL of any publicly accessible image.</p>
              <div className={styles.urlRow}>
                <input
                  type="url"
                  className={styles.urlInput}
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setUrlError('');
                    setUrlPreview(null);
                  }}
                  placeholder="https://example.com/photo.jpg"
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlPreview()}
                />
                <Button variant="secondary" onClick={handleUrlPreview} disabled={!urlInput}>
                  Preview
                </Button>
              </div>
              {urlError && (
                <p className={styles.urlError} role="alert">
                  {urlError}
                </p>
              )}
              {urlPreview && (
                <motion.div
                  className={styles.urlPreviewWrapper}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <img
                    src={urlPreview}
                    alt="Preview"
                    className={`${styles.urlPreviewImg} ${isProfile ? styles.round : ''}`}
                    onError={() => {
                      setUrlError('Could not load image from that URL.');
                      setUrlPreview(null);
                    }}
                  />
                  <p className={styles.urlPreviewOk}>✓ Image loaded successfully</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className={styles.footer}>
        <Button variant="secondary" onClick={handleClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          loading={uploading}
          onClick={tab === 'upload' ? handleSaveFile : handleSaveUrl}
          disabled={
            (tab === 'upload' && !imageSrc) ||
            (tab === 'url' && (!urlPreview || !!urlError))
          }
        >
          Save Photo
        </Button>
      </div>
    </Modal>
  );
}
