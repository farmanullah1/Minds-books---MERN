/**
 * CodeDNA
 * WatchParty.tsx — Premium Synchronized Watch Party & Live Chat Room
 * exports: default WatchParty
 * used_by: App.tsx
 * rules: Yellow theme primary, synchronized player overlay, live chat, participant presence
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTv, FiUsers, FiSend, FiPlus, FiLink, FiX, FiCheck, 
  FiPlay, FiPause, FiMessageSquare, FiCompass, FiVolume2, FiInfo 
} from 'react-icons/fi';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import './WatchParty.css';
import { useAppSelector } from '../../store/hooks';

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isHost?: boolean;
  isMuted?: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface PartyRoom {
  id: string;
  title: string;
  videoTitle: string;
  videoUrl: string;
  hostName: string;
  hostAvatar: string;
  participantCount: number;
  maxParticipants: number;
}

const WatchParty: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Layout tabs: lobby, create, room
  const [activeTab, setActiveTab] = useState<'lobby' | 'create' | 'room'>('lobby');
  const [selectedRoom, setSelectedRoom] = useState<PartyRoom | null>(null);

  // Create party form states
  const [roomTitle, setRoomTitle] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(8);

  // Active room states
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [syncStatusText, setSyncStatusText] = useState('Synchronized with Host');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Mock Active Watch Party Rooms
  const mockRooms: PartyRoom[] = [
    {
      id: 'party_1',
      title: '🚀 SaaS Tech Launch Keynote - Live Watch & Discuss',
      videoTitle: 'Next-Gen Developer SaaS Presentation',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      hostName: 'Devon Lane',
      hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      participantCount: 5,
      maxParticipants: 10
    },
    {
      id: 'party_2',
      title: '🎬 Marvel Movie Trailer Reaction & Breakdown Vibes!',
      videoTitle: 'Official Trailer 2026',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      hostName: 'Cody Fisher',
      hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      participantCount: 3,
      maxParticipants: 6
    },
    {
      id: 'party_3',
      title: '🎹 Chill Lo-Fi Study Session - Virtual Co-Working',
      videoTitle: 'Lo-Fi Chill Hop 24 Hour Mix',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      hostName: 'Esther Howard',
      hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      participantCount: 12,
      maxParticipants: 20
    }
  ];

  const mockUsers = [
    { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Clara Oswald', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Emma Stone', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Bruce Wayne', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80' }
  ];

  const mockComments = [
    'Wow, the resolution is so crisp!',
    'Host, can you rewind 10 seconds?',
    'This coding scene is incredibly clean! 💻',
    'Anyone here building with Node?',
    'I love watching together like this.',
    'Wait, did you see that?',
    'Yellow theme looks phenomenal, this app has beautiful vibes!',
    'Is the next SaaS launching soon?'
  ];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Synchronized Party Room Simulation
  useEffect(() => {
    if (activeTab !== 'room' || !selectedRoom) return;

    // Build initial room participants
    const initialParticipants: Participant[] = [
      { id: 'host', name: selectedRoom.hostName, avatar: selectedRoom.hostAvatar, isHost: true },
      { id: 'user', name: user?.name || 'Me', avatar: user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' }
    ];

    // Add extra mock participants to fit room count
    const extraCount = selectedRoom.participantCount - 2;
    for (let i = 0; i < extraCount; i++) {
      const u = mockUsers[i % mockUsers.length];
      initialParticipants.push({
        id: `p_${i}`,
        name: u.name,
        avatar: u.avatar,
        isMuted: Math.random() > 0.6
      });
    }
    setParticipants(initialParticipants);

    // Initial system chat messages
    setChatMessages([
      { id: 'sys_1', sender: 'System', avatar: '', text: `Welcome to the Watch Party room! Synchronizing stream...`, timestamp: new Date(), isSystem: true },
      { id: 'sys_2', sender: 'System', avatar: '', text: `${selectedRoom.hostName} is the room Host.`, timestamp: new Date(), isSystem: true }
    ]);

    // Simulated actions and participant comments
    const messageInterval = setInterval(() => {
      // 1. Random comment arrival
      if (Math.random() > 0.4) {
        const randomP = initialParticipants[Math.floor(Math.random() * initialParticipants.length)];
        if (randomP.id !== 'user') {
          const randomText = mockComments[Math.floor(Math.random() * mockComments.length)];
          setChatMessages(prev => [...prev, {
            id: Math.random().toString(),
            sender: randomP.name,
            avatar: randomP.avatar,
            text: randomText,
            timestamp: new Date()
          }]);
        }
      }

      // 2. Mock Host synchronization action (seek/pause visual alert)
      if (Math.random() > 0.85) {
        const actions = [
          'Host skipped forward 15 seconds.',
          'Video state synchronized across all players.',
          'Host paused the stream momentarily.',
          'Host resumed the playback.'
        ];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        
        setSyncStatusText(randomAction);
        setChatMessages(prev => [...prev, {
          id: Math.random().toString(),
          sender: 'System',
          avatar: '',
          text: randomAction,
          timestamp: new Date(),
          isSystem: true
        }]);

        // Restore status text after 3 seconds
        setTimeout(() => {
          setSyncStatusText('Synchronized with Host');
        }, 3000);
      }
    }, 4500);

    return () => clearInterval(messageInterval);
  }, [activeTab, selectedRoom]);

  // Join Room
  const joinRoom = (room: PartyRoom) => {
    setSelectedRoom(room);
    setActiveTab('room');
  };

  // Launch Room (Create)
  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomTitle || !videoUrl) return;

    const newRoom: PartyRoom = {
      id: `party_${Math.random()}`,
      title: roomTitle,
      videoTitle: videoTitle || 'Custom Selected Stream',
      videoUrl: videoUrl,
      hostName: user?.name || 'Creator',
      hostAvatar: user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      participantCount: 1,
      maxParticipants: maxParticipants
    };

    setSelectedRoom(newRoom);
    setActiveTab('room');
  };

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    setChatMessages(prev => [...prev, {
      id: Math.random().toString(),
      sender: user.name,
      avatar: user.profilePicture || '',
      text: newMessage,
      timestamp: new Date()
    }]);

    setNewMessage('');
  };

  return (
    <div className="watchparty-page-container">
      {/* Lobby Tab */}
      {activeTab === 'lobby' && (
        <div className="party-lobby-layout">
          <div className="lobby-header-card">
            <div className="header-left">
              <FiTv size={36} className="party-logo-glow" />
              <div>
                <h1>Watch Parties</h1>
                <p>Enjoy movies, tutorials, and streams simultaneously with friends in real-time synced rooms!</p>
              </div>
            </div>
            <button 
              className="create-party-btn"
              onClick={() => setActiveTab('create')}
            >
              <FiPlus size={18} />
              <span>Host a Watch Party</span>
            </button>
          </div>

          <div className="rooms-section">
            <h2 className="section-title">✨ Active Watch Rooms</h2>
            <div className="rooms-grid">
              {mockRooms.map((room) => (
                <div key={room.id} className="party-room-card" onClick={() => joinRoom(room)}>
                  <div className="room-card-header">
                    <span className="room-category">📺 Synced Stream</span>
                    <span className="participant-badge">
                      <FiUsers size={12} />
                      {room.participantCount}/{room.maxParticipants}
                    </span>
                  </div>
                  <div className="room-card-body">
                    <h3 className="room-title">{room.title}</h3>
                    <p className="room-video-meta">Playing: <strong>{room.videoTitle}</strong></p>
                    
                    <div className="room-host-footer">
                      <img src={room.hostAvatar} alt={room.hostName} className="host-avatar" />
                      <div className="host-meta">
                        <span className="host-label">Hosted by</span>
                        <span className="host-name">{room.hostName}</span>
                      </div>
                      <button className="join-action-btn">Join Party</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Room Tab */}
      {activeTab === 'create' && (
        <div className="create-room-panel">
          <div className="create-header">
            <h2>Setup Your Watch Room</h2>
            <p>Paste any direct MP4 link or sample stream to create a synchronized player room.</p>
          </div>

          <form className="create-form" onSubmit={handleCreateRoom}>
            <div className="form-group">
              <label>Room Name / Topic</label>
              <input 
                type="text" 
                placeholder="e.g. Late Night Tech Presentation Session"
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Video URL (MP4 Stream)</label>
              <input 
                type="url" 
                placeholder="e.g. https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Video Display Name (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Big Buck Bunny"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Max Friends Limit</label>
                <select 
                  value={maxParticipants} 
                  onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                >
                  <option value={4}>4 Members</option>
                  <option value={8}>8 Members</option>
                  <option value={12}>12 Members</option>
                  <option value={20}>20 Members</option>
                </select>
              </div>
            </div>

            <div className="create-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setActiveTab('lobby')}
              >
                Back to Lobby
              </button>
              <button type="submit" className="submit-btn" disabled={!roomTitle || !videoUrl}>
                <FiTv size={16} />
                <span>Launch Watch Party</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Synchronized Watch Room Screen */}
      {activeTab === 'room' && selectedRoom && (
        <div className="watch-room-layout">
          {/* Main Video Section */}
          <div className="room-video-panel">
            <div className="sync-banner-overlay">
              <div className="sync-status-indicator">
                <span className="sync-dot blinking" />
                <span className="sync-text">{syncStatusText}</span>
              </div>
              <button className="invite-btn" onClick={() => setShowInviteModal(true)}>
                <FiPlus size={14} />
                <span>Invite Friends</span>
              </button>
            </div>

            {/* Reusable premium customized video player */}
            <div className="room-video-player-container">
              <VideoPlayer 
                src={selectedRoom.videoUrl} 
                autoPlay={true}
                allowDownload={false}
              />
            </div>

            {/* Room presence and title details */}
            <div className="room-meta-card">
              <div className="meta-header">
                <div>
                  <h2>{selectedRoom.title}</h2>
                  <p className="playing-label"><FiCompass size={14} /> Playing: {selectedRoom.videoTitle}</p>
                </div>
                <button className="leave-room-btn" onClick={() => setActiveTab('lobby')}>
                  <FiX size={16} />
                  <span>Leave Room</span>
                </button>
              </div>

              {/* Presence list of participant avatars */}
              <div className="presence-section">
                <h3>👥 Connected Participants ({participants.length})</h3>
                <div className="participants-avatars-row">
                  {participants.map((p) => (
                    <motion.div 
                      key={p.id} 
                      className={`participant-avatar-wrapper ${p.isHost ? 'host' : ''}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      title={`${p.name} ${p.isHost ? '(Host)' : ''}`}
                    >
                      <img src={p.avatar} alt={p.name} className="participant-img" />
                      {p.isHost && <span className="host-crown">👑</span>}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Panel Sidebar */}
          <div className="room-chat-panel">
            <div className="chat-header">
              <h3><FiMessageSquare size={16} /> Room Discussion</h3>
              <span>Synced Chat</span>
            </div>

            <div className="chat-body">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`chat-row ${msg.isSystem ? 'system-msg' : ''}`}
                >
                  {!msg.isSystem && (
                    <img src={msg.avatar} alt={msg.sender} className="chat-avatar" />
                  )}
                  <div className="chat-content">
                    {!msg.isSystem && <span className="sender-name">{msg.sender}</span>}
                    <p className="chat-text">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="chat-input-row">
              <input 
                type="text" 
                placeholder="Discuss with room members..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="send-btn" onClick={handleSendMessage}>
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Friends Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div 
            className="invite-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="invite-modal-card"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="modal-header">
                <h2>Invite Friends</h2>
                <button className="close-btn" onClick={() => setShowInviteModal(false)}>
                  <FiX size={18} />
                </button>
              </div>
              <div className="modal-body">
                <p>Copy this Watch Party room link to invite your friends:</p>
                <div className="link-copy-box">
                  <FiLink size={16} />
                  <input 
                    type="text" 
                    readOnly 
                    value={`http://localhost:5173/watch/party?room=${selectedRoom?.id}`} 
                  />
                  <button className="copy-action-btn" onClick={() => {
                    navigator.clipboard.writeText(`http://localhost:5173/watch/party?room=${selectedRoom?.id}`);
                    alert('Watch Party Link Copied!');
                    setShowInviteModal(false);
                  }}>
                    Copy Link
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchParty;
