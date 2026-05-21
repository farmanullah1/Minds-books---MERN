/**
 * CodeDNA
 * AudioRooms.tsx — Space-inspired Audio Rooms & Podcast Discovery Center (PROMPT-52)
 * exports: default AudioRooms
 * used_by: App.tsx
 * rules: Dark sleek stage, gold live underlines, animated speaker rings, hand-raise prompts, whisper scaffolds
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMic, FiMicOff, FiUsers, FiPlus, FiSmile, 
  FiLogOut, FiTrendingUp, FiRadio, FiUploadCloud, 
  FiBookOpen, FiDisc, FiVolume2, FiShare2, FiShield 
} from 'react-icons/fi';
import './AudioRooms.css';
import { useAppSelector } from '../../store/hooks';
import Emoji3D from '../../components/ui/Emoji3D';

interface AudioRoom {
  id: string;
  title: string;
  topic: string;
  host: string;
  hostAvatar: string;
  listenersCount: number;
  speakersCount: number;
  tags: string[];
  isLive?: boolean;
}

const AudioRooms: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  // States
  const [activeTab, setActiveTab] = useState<'discover' | 'active-room' | 'podcasts'>('discover');
  const [rooms, setRooms] = useState<AudioRoom[]>([
    {
      id: 'room_1',
      title: '🚀 Scaling React 19 Hydration Loops in Production',
      topic: 'Technology & Design',
      host: 'Farmanullah Ansari',
      hostAvatar: user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      listenersCount: 142,
      speakersCount: 3,
      tags: ['React', 'NextJS', 'UX Design'],
      isLive: true
    },
    {
      id: 'room_2',
      title: '🎨 Gold & HSL Typography Accent Borders Masterclass',
      topic: 'Creative & UI',
      host: 'Sarah Jenkins',
      hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      listenersCount: 56,
      speakersCount: 2,
      tags: ['Aesthetics', 'CSS', 'Framer Motion'],
      isLive: true
    },
    {
      id: 'room_3',
      title: '🧠 AI Agent Autonomy & Recursion Limits in 2026',
      topic: 'Machine Learning',
      host: 'Dr. Alan Turing',
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      listenersCount: 88,
      speakersCount: 4,
      tags: ['Agents', 'Claude', 'Deep Learning']
    }
  ]);

  // Active space state
  const [selectedRoom, setSelectedRoom] = useState<AudioRoom | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [spaceReaction, setSpaceReaction] = useState<string | null>(null);

  // New room modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState('');
  const [newRoomTopic, setNewRoomTopic] = useState('Technology & Design');
  const [newRoomTags, setNewRoomTags] = useState('React, Spaces');

  // Podcast state
  const [podcasts, setPodcasts] = useState([
    { title: 'Designing Bespoke Dark Mode Parameters', showName: 'MindBook Design Cast', duration: '28 mins', episode: 4 },
    { title: 'The Future of WebRTC SFU scaling architectures', showName: 'Audio Labs podcast', duration: '42 mins', episode: 12 }
  ]);
  const [podcastTitle, setPodcastTitle] = useState('');
  const [podcastShow, setPodcastShow] = useState('');
  const [podcastFile, setPodcastFile] = useState<File | null>(null);
  const [whisperTranscribe, setWhisperTranscribe] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Space participants list
  const mockSpeakers = [
    { name: 'Farmanullah Ansari', avatar: user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80', isSpeaking: true, role: 'Host' },
    { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80', isSpeaking: false, role: 'Speaker' },
    { name: 'Michael Rover', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80', isSpeaking: false, role: 'Speaker' }
  ];

  const mockListeners = [
    { name: 'Alice', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Bob', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Charlie', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Diana', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Evan', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Fiona', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80' }
  ];

  const triggerReaction = (emoji: string) => {
    setSpaceReaction(emoji);
    setTimeout(() => {
      setSpaceReaction(null);
    }, 2000);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomTitle) return;

    const newRoom: AudioRoom = {
      id: `room_${rooms.length + 1}`,
      title: newRoomTitle,
      topic: newRoomTopic,
      host: user?.name || 'Creator',
      hostAvatar: user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      listenersCount: 1,
      speakersCount: 1,
      tags: newRoomTags.split(',').map(t => t.trim()),
      isLive: true
    };

    setRooms([newRoom, ...rooms]);
    setShowCreateModal(false);
    
    // Auto enter newly created room as host
    setSelectedRoom(newRoom);
    setIsHost(true);
    setIsSpeaker(true);
    setActiveTab('active-room');
  };

  const enterRoom = (room: AudioRoom) => {
    setSelectedRoom(room);
    setIsHost(room.host === user?.name);
    setIsSpeaker(room.host === user?.name);
    setActiveTab('active-room');
  };

  const leaveRoom = () => {
    setSelectedRoom(null);
    setIsHost(false);
    setIsSpeaker(false);
    setHandRaised(false);
    setActiveTab('discover');
  };

  const handleUploadPodcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!podcastTitle || !podcastShow) return;

    setPodcasts(prev => [
      {
        title: podcastTitle,
        showName: podcastShow,
        duration: '15 mins',
        episode: prev.length + 1
      },
      ...prev
    ]);

    setUploadSuccess(true);
    setPodcastTitle('');
    setPodcastShow('');
    setPodcastFile(null);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="audiorooms-page-container">
      
      {/* Dynamic top hero */}
      <div className="rooms-top-hero">
        <div className="hero-text">
          <span className="live-spaces-pill">
            <FiRadio className="pulse-icon" />
            <span>LIVE SPACES</span>
          </span>
          <h1>MindBook Audio Rooms & Podcasts</h1>
          <p>Join live conversations, raise your hand to speak, host spaces, and upload podcast episodes.</p>
        </div>

        {activeTab !== 'active-room' && (
          <button className="create-space-action-btn" onClick={() => setShowCreateModal(true)}>
            <FiPlus size={18} />
            <span>Host Audio Space</span>
          </button>
        )}
      </div>

      {/* Tabs navigation */}
      {activeTab !== 'active-room' && (
        <div className="spaces-tab-nav">
          <button 
            className={`tab-btn-item ${activeTab === 'discover' ? 'active' : ''}`}
            onClick={() => setActiveTab('discover')}
          >
            <FiRadio />
            <span>Discover Spaces</span>
          </button>
          <button 
            className={`tab-btn-item ${activeTab === 'podcasts' ? 'active' : ''}`}
            onClick={() => setActiveTab('podcasts')}
          >
            <FiBookOpen />
            <span>Podcast Studio</span>
          </button>
        </div>
      )}

      {/* Viewport render */}
      <div className="spaces-dynamic-viewport">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: DISCOVER ROOMS */}
          {activeTab === 'discover' && (
            <motion.div 
              key="discover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="discover-viewport-stage"
            >
              <h2 className="viewport-title">🔴 Active Audio Rooms</h2>
              <div className="spaces-grid-layout">
                {rooms.map((room) => (
                  <div key={room.id} className="space-room-card card">
                    <div className="card-top-header">
                      <div className="host-profile-compact">
                        <img src={room.hostAvatar} alt={room.host} />
                        <div>
                          <h4>Hosted by {room.host}</h4>
                          <p>{room.topic}</p>
                        </div>
                      </div>
                      {room.isLive && <span className="space-live-badge">LIVE</span>}
                    </div>

                    <h3 className="space-title-h3">{room.title}</h3>

                    <div className="space-tags-tray">
                      {room.tags.map(t => <span key={t} className="space-tag-badge">#{t}</span>)}
                    </div>

                    <div className="space-card-footer">
                      <div className="listener-metric">
                        <FiUsers size={16} />
                        <span>{room.listenersCount} listeners</span>
                      </div>

                      <button className="join-space-btn" onClick={() => enterRoom(room)}>
                        Join Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: ACTIVE ROOM VIEW */}
          {activeTab === 'active-room' && selectedRoom && (
            <motion.div 
              key="active-room"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="active-room-viewport card"
            >
              <div className="room-viewport-header">
                <div className="header-left">
                  <span className="live-pulse-ring">● LIVE</span>
                  <h2>{selectedRoom.title}</h2>
                  <p className="topic-text">{selectedRoom.topic}</p>
                </div>
                <button className="leave-space-action-btn" onClick={leaveRoom}>
                  <FiLogOut />
                  <span>Leave Room</span>
                </button>
              </div>

              {/* Speakers grid */}
              <div className="room-speakers-section">
                <h3>🎙️ Speakers ({mockSpeakers.length})</h3>
                <div className="speakers-bubble-grid">
                  {mockSpeakers.map((speaker, idx) => {
                    const isSpeakingNow = speaker.isSpeaking && !isMuted;
                    return (
                      <div key={idx} className="speaker-avatar-wrap">
                        <div className={`avatar-border-ring ${isSpeakingNow ? 'speaking' : ''}`}>
                          <img src={speaker.avatar} alt={speaker.name} />
                          {isSpeakingNow && <FiVolume2 className="speaking-micro-indicator" />}
                        </div>
                        <span className="speaker-name">{speaker.name}</span>
                        <span className="speaker-role-lbl">{speaker.role}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Listeners grid */}
              <div className="room-listeners-section">
                <h3>👥 Listeners ({mockListeners.length + selectedRoom.listenersCount})</h3>
                <div className="listeners-bubble-grid">
                  {mockListeners.map((listener, idx) => (
                    <div key={idx} className="listener-compact-bubble">
                      <img src={listener.avatar} alt={listener.name} className="listener-avatar" />
                      <span className="listener-name">{listener.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Float emoji reactions rendering */}
              <AnimatePresence>
                {spaceReaction && (
                  <motion.div 
                    className="floating-emoji-reaction"
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: -150, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                  >
                    <Emoji3D emoji={spaceReaction} size={48} animate={false} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive controller bottom bar */}
              <div className="room-action-controls-bar">
                <div className="controls-left">
                  {isSpeaker ? (
                    <button 
                      className={`control-pill-btn ${isMuted ? 'muted' : ''}`}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <FiMicOff /> : <FiMic />}
                      <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
                    </button>
                  ) : (
                    <button 
                      className={`control-pill-btn ${handRaised ? 'raised' : ''}`}
                      onClick={() => setHandRaised(!handRaised)}
                    >
                      <span>✋</span>
                      <span>{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
                    </button>
                  )}

                  <div className="emoji-preset-tray">
                    {['👍', '🔥', '👏', '😂', '💯', '❤️'].map(e => (
                      <button key={e} className="reaction-trigger-btn" onClick={() => triggerReaction(e)}>
                        <Emoji3D emoji={e} size={20} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="controls-right">
                  <button className="control-pill-btn secondary-btn" onClick={() => triggerReaction('👏')}>
                    <FiShare2 />
                    <span>Share Space</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: PODCAST STUDIO */}
          {activeTab === 'podcasts' && (
            <motion.div 
              key="podcasts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="podcast-viewport-stage"
            >
              <div className="podcast-grid-split">
                
                {/* Upload Form */}
                <div className="podcast-upload-card card">
                  <h3>🎙️ Podcast Episode Uploader</h3>
                  <form onSubmit={handleUploadPodcast} className="podcast-form-inner">
                    <div className="form-group-item">
                      <label>Episode Title</label>
                      <input 
                        type="text" 
                        value={podcastTitle}
                        onChange={(e) => setPodcastTitle(e.target.value)}
                        placeholder="e.g. Episode #5: Deep Hydration Eased Loops"
                        required
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Podcast Show Name</label>
                      <input 
                        type="text" 
                        value={podcastShow}
                        onChange={(e) => setPodcastShow(e.target.value)}
                        placeholder="e.g. MindBook Design Cast"
                        required
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Audio File (MP3 or M4A, Max 200MB)</label>
                      <div className="podcast-file-dropzone">
                        <FiUploadCloud size={32} className="dropzone-icon" />
                        <span>Drag audio file here or click to select</span>
                        <input 
                          type="file" 
                          accept="audio/*" 
                          onChange={(e) => e.target.files && setPodcastFile(e.target.files[0])}
                          style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }}
                        />
                        {podcastFile && <span className="selected-filename">{podcastFile.name}</span>}
                      </div>
                    </div>

                    <div className="form-toggle-row">
                      <span>Enable AI Whisper Transcription</span>
                      <label className="switch-control">
                        <input 
                          type="checkbox" 
                          checked={whisperTranscribe} 
                          onChange={(e) => setWhisperTranscribe(e.target.checked)} 
                        />
                        <span className="slider-round"></span>
                      </label>
                    </div>

                    <button type="submit" className="podcast-submit-btn">
                      Upload Episode
                    </button>

                    {uploadSuccess && (
                      <div className="success-banner mt-3 animate-fadeIn">
                        <span>✓ Podcast episode uploaded successfully! Transcription queued.</span>
                      </div>
                    )}
                  </form>
                </div>

                {/* Podcast episode listings */}
                <div className="podcast-listings-card card">
                  <h3>📻 Channel Episodes</h3>
                  <div className="episodes-scroller">
                    {podcasts.map((pod, i) => (
                      <div key={i} className="episode-track-row">
                        <div className="disc-art-block">
                          <FiDisc size={20} className="disc-rotating" />
                        </div>
                        <div className="episode-meta-block">
                          <h4>{pod.title}</h4>
                          <p>{pod.showName} • Ep {pod.episode}</p>
                        </div>
                        <span className="duration-pill">{pod.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Modal Space Creator overlay */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            className="create-room-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="create-room-modal-card card"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
            >
              <div className="modal-header-row">
                <h2>Host Live Audio Room</h2>
                <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>✕</button>
              </div>

              <form onSubmit={handleCreateRoom} className="modal-form-inner">
                <div className="form-group-item">
                  <label>Room Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Chatting about framer motion springs..."
                    value={newRoomTitle}
                    onChange={(e) => setNewRoomTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group-item">
                  <label>Topic Category</label>
                  <select value={newRoomTopic} onChange={(e) => setNewRoomTopic(e.target.value)}>
                    <option value="Technology & Design">Technology & Design</option>
                    <option value="Creative & UI">Creative & UI</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Lifestyle & Travel">Lifestyle & Travel</option>
                  </select>
                </div>

                <div className="form-group-item">
                  <label>Topic Tags (Comma Separated)</label>
                  <input 
                    type="text" 
                    placeholder="React, CSS, HSL"
                    value={newRoomTags}
                    onChange={(e) => setNewRoomTags(e.target.value)}
                  />
                </div>

                <button type="submit" className="host-space-confirm-btn">
                  Go Live Now
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AudioRooms;
