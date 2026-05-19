/**
 * CodeDNA
 * StoriesFeed.tsx — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 * agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
 */

import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { useAppSelector } from '../../store/hooks';
import api, { uploadFile } from '../../services/api';
import { IUserStoryGroup } from '../../types';
import { getInitials } from '../../utils/helpers';
import StoryViewer from './StoryViewer';
import StoryConfirmationModal from './StoryConfirmationModal';
import { useToast } from '../../components/Toast/ToastContext';
import './StoriesFeed.css';

const StoriesFeed: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);
  const [groupedStories, setGroupedStories] = React.useState<IUserStoryGroup[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [viewerGroupIndex, setViewerGroupIndex] = React.useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchStories = async () => {
    try {
      const res = await api.get('/stories');
      setGroupedStories(res.data);
    } catch (error) {
      console.error('Failed to fetch stories', error);
    }
  };

  React.useEffect(() => {
    fetchStories();
  }, []);

  const handleCreateStoryClick = () => {
    fileInputRef.current?.click();
  };

  const [selectedFile, setSelectedFile] = React.useState<{file: File, url: string, isVideo: boolean} | null>(null);
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');
      setSelectedFile({ file, url, isVideo });
    }
  };

  const confirmCreateStory = async (caption: string) => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const res = await uploadFile(selectedFile.file);
      const storyData: any = { caption };
      if (res.type === 'video') {
        storyData.video = res.url;
      } else {
        storyData.image = res.url;
      }
      await api.post('/stories', storyData);
      fetchStories(); // Refresh stories
      setSelectedFile(null);
      showToast('Story published successfully!', 'success');
    } catch (error) {
      console.error('Failed to create story', error);
      showToast('Failed to upload story', 'error');
    } finally {
      setLoading(false);
    }
  };

  const cancelCreateStory = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Find if current user has an active story
  const currentUserGroup = groupedStories.find(g => g.user._id === user?._id);
  const otherUsersGroups = groupedStories.filter(g => g.user._id !== user?._id);

  return (
    <div className="stories-feed-container">
      <div className="stories-scroll-wrapper">
        
        {/* Create Story / Current User Story Card */}
        {currentUserGroup ? (
          <div className="story-circle-wrapper" onClick={() => setViewerGroupIndex(groupedStories.findIndex(g => g.user._id === user?._id))}>
            <div className="story-circle has-story">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="You" />
              ) : (
                <div className="avatar-initials">{user ? getInitials(user.name) : ''}</div>
              )}
            </div>
            <div className="create-story-btn-small" onClick={(e) => { e.stopPropagation(); handleCreateStoryClick(); }}>
              <FiPlus size={12} />
            </div>
            <span className="story-author">Your Story</span>
          </div>
        ) : (
          <div className="story-circle-wrapper" onClick={handleCreateStoryClick}>
            <div className="story-circle">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="You" />
              ) : (
                <div className="avatar-initials">{user ? getInitials(user.name) : ''}</div>
              )}
            </div>
            <div className="create-story-btn-small create-mode">
              <FiPlus size={12} />
            </div>
            <span className="story-author text-dark">Add Story</span>
          </div>
        )}
        
        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*,video/*" 
          disabled={loading}
        />

        {/* Friends' Stories */}
        {otherUsersGroups.map((group) => {
          const groupIdx = groupedStories.findIndex(g => g.user._id === group.user._id);
          return (
            <div key={group.user._id} className="story-circle-wrapper" onClick={() => setViewerGroupIndex(groupIdx)}>
              <div className="story-circle has-story unread">
                {group.user.profilePicture ? (
                  <img src={group.user.profilePicture} alt={group.user.name} />
                ) : (
                  <div className="avatar-initials">{getInitials(group.user.name)}</div>
                )}
              </div>
              <span className="story-author">{group.user.name.split(' ')[0]}</span>
            </div>
          );
        })}
      </div>

      {viewerGroupIndex !== null && (
        <StoryViewer
          groups={groupedStories}
          initialGroupIndex={viewerGroupIndex}
          onClose={() => setViewerGroupIndex(null)}
          onStoryDeleted={fetchStories}
          currentUserId={user?._id}
        />
      )}

      {selectedFile && (
        <StoryConfirmationModal
          file={selectedFile.file}
          previewUrl={selectedFile.url}
          isVideo={selectedFile.isVideo}
          loading={loading}
          onConfirm={confirmCreateStory}
          onCancel={cancelCreateStory}
        />
      )}
    </div>
  );
};

export default StoriesFeed;
