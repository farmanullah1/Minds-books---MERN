import React, { useState } from 'react';
import { FiImage, FiLayers } from 'react-icons/fi';
import { useAppDispatch } from '../../store/hooks';
import { createPost } from '../../store/slices/postsSlice';
import api from '../../services/api';
import { resolveMediaUrl } from '../../utils/helpers';
import { useToast } from '../Toast/ToastContext';
import './ProfilePhotoShareModal.css';

export type ProfilePhotoType = 'profilePicture' | 'coverPicture';

interface ProfilePhotoShareModalProps {
  open: boolean;
  imageUrl: string;
  photoType: ProfilePhotoType;
  onClose: () => void;
}

const ProfilePhotoShareModal: React.FC<ProfilePhotoShareModalProps> = ({
  open,
  imageUrl,
  photoType,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [loading, setLoading] = useState<'post' | 'story' | null>(null);

  if (!open) return null;

  const resolvedUrl = resolveMediaUrl(imageUrl);
  const isProfile = photoType === 'profilePicture';
  const label = isProfile ? 'profile picture' : 'cover photo';
  const postCaption = isProfile ? 'Updated my profile picture! 📸' : 'Updated my cover photo! 🖼️';
  const storyCaption = isProfile ? 'New profile picture!' : 'New cover photo!';

  const handleSharePost = async () => {
    setLoading('post');
    try {
      await dispatch(
        createPost({
          content: postCaption,
          image: resolvedUrl,
        })
      ).unwrap();
      showToast('Shared to your feed!', 'success');
      onClose();
    } catch {
      showToast('Could not share as post. Try again.', 'error');
    } finally {
      setLoading(null);
    }
  };

  const handleShareStory = async () => {
    setLoading('story');
    try {
      await api.post('/stories', {
        image: resolvedUrl,
        caption: storyCaption,
      });
      showToast('Added to your story!', 'success');
      onClose();
    } catch {
      showToast('Could not share as story. Try again.', 'error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="photo-share-overlay" onClick={onClose} role="presentation">
      <div
        className="photo-share-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="photo-share-title"
      >
        <div className="photo-share-header">
          <h2 id="photo-share-title">Photo updated!</h2>
          <p>Your {label} was saved. Share it with your friends?</p>
        </div>

        <div className={`photo-share-preview ${isProfile ? 'round' : 'wide'}`}>
          <img src={resolvedUrl} alt={`New ${label}`} />
        </div>

        <div className="photo-share-actions">
          <button
            type="button"
            className="photo-share-btn photo-share-btn-primary"
            disabled={!!loading}
            onClick={handleSharePost}
          >
            <FiImage size={18} />
            {loading === 'post' ? 'Sharing…' : 'Share as Post'}
          </button>
          <button
            type="button"
            className="photo-share-btn photo-share-btn-secondary"
            disabled={!!loading}
            onClick={handleShareStory}
          >
            <FiLayers size={18} />
            {loading === 'story' ? 'Sharing…' : 'Share as Story'}
          </button>
          <button type="button" className="photo-share-skip" onClick={onClose} disabled={!!loading}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoShareModal;
