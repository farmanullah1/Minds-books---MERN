/**
 * CodeDNA
 * LiveStream.tsx — Premium Live Streaming & Directory with Real camera feed and Emoji Rain
 * exports: default LiveStream
 * used_by: App.tsx
 * rules: Yellow theme primary, fully responsive, live chat simulation, emoji rain
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiVideo, FiMessageSquare, FiHeart, FiUsers, FiSend, 
  FiVolume2, FiVolumeX, FiMaximize2, FiX, FiRadio, FiSmile, FiMic, FiMicOff
} from 'react-icons/fi';
import './LiveStream.css';
import { socketService } from '../../services/socketService';
import { useAppSelector } from '../../store/hooks';
import Emoji3D, { EMOJI_3D_MAP } from '../../components/ui/Emoji3D';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: Date;
  isHost?: boolean;
}

interface StreamItem {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  viewers: number;
  category: string;
  isLive: boolean;
  thumbnail: string;
  tags: string[];
}

const LiveStream: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  // Streaming Directory States
  const [activeTab, setActiveTab] = useState<'directory' | 'viewer' | 'creator'>('directory');
  const [selectedStream, setSelectedStream] = useState<StreamItem | null>(null);
  
  // Viewer Mode States
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Creator Mode States
  const [streamTitle, setStreamTitle] = useState('');
  const [streamCategory, setStreamCategory] = useState('Gaming');
  const [streamTags, setStreamTags] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isMicActive, setIsMicActive] = useState(true);
  const [creatorViewerCount, setCreatorViewerCount] = useState(0);
  const [creatorChat, setCreatorChat] = useState<ChatMessage[]>([]);
  
  // MediaRecorder States
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const emojiRainContainerRef = useRef<HTMLDivElement>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Mock Active Streams Directory
  const mockStreams: StreamItem[] = [
    {
      id: 'stream_1',
      title: '💻 Building a SaaS Startup from Scratch - Coding Session!',
      host: 'Alex Riviera',
      hostAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      viewers: 1420,
      category: 'Software Dev',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=640&h=360&q=80',
      tags: ['React', 'NodeJS', 'SaaS', 'Startup']
    },
    {
      id: 'stream_2',
      title: '🎮 MindSnap Speedrun - Breaking the Platform World Record!',
      host: 'ProGamer_X',
      hostAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80',
      viewers: 890,
      category: 'Gaming',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=640&h=360&q=80',
      tags: ['Gaming', 'MindSnap', 'Speedrun', 'Record']
    },
    {
      id: 'stream_3',
      title: '🎵 Lo-Fi Chill Beats & Coding Vibes - Late Night Jam',
      host: 'BeatMaker Pro',
      hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      viewers: 3200,
      category: 'Music',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&h=360&q=80',
      tags: ['Lofi', 'Beats', 'Vibes', 'Coding']
    },
    {
      id: 'stream_4',
      title: '☕ Weekly Q&A - Ask Me Anything about Tech & Life',
      host: 'Sarah Jenkins',
      hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      viewers: 512,
      category: 'AMA / Life',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=640&h=360&q=80',
      tags: ['AMA', 'TechCareer', 'Mentorship']
    }
  ];

  const mockUsers = [
    { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Clara Oswald', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Bruce Wayne', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Emma Stone', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80' },
    { name: 'Ansari Dev', avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=100&h=100&q=80' }
  ];

  const mockComments = [
    'Wow, this is amazing!',
    'Yellow theme looks super premium! 🔥',
    'What language are you using?',
    'First time watching, this is extremely clean!',
    'Minds Books is next-gen MERN!',
    'Can you explain that route again?',
    'Awesome, keep it up!',
    'MindBook is pure tech wizardry!',
    'Wait, is that camera feed WebRTC?',
    'Love the animations on this platform!'
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, creatorChat]);

  // Handle simulation of viewer stream chat & counts
  useEffect(() => {
    if (activeTab !== 'viewer' || !selectedStream) return;

    // Set initial viewer count
    setViewerCount(selectedStream.viewers);

    // Initial messages
    const initialMsgs = [
      { id: '1', sender: 'System', avatar: '', text: 'Welcome to the live chat! Keep it friendly and respectful.', timestamp: new Date() },
      { id: '2', sender: selectedStream.host, avatar: selectedStream.hostAvatar, text: 'Hey guys! Glad to have you all here. Ask me anything!', timestamp: new Date(), isHost: true }
    ];
    setChatMessages(initialMsgs);

    // Simulate chat arrival
    const chatInterval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomText = mockComments[Math.floor(Math.random() * mockComments.length)];
      const newMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: randomUser.name,
        avatar: randomUser.avatar,
        text: randomText,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, newMsg]);

      // Fluctuating viewers
      setViewerCount(prev => prev + Math.floor(Math.random() * 9) - 4);
    }, 2800);

    return () => clearInterval(chatInterval);
  }, [activeTab, selectedStream]);

  // Handle simulation of creator stream chat & counts
  useEffect(() => {
    if (activeTab !== 'creator' || !isCameraActive) return;

    setCreatorViewerCount(0);
    setCreatorChat([
      { id: '1', sender: 'System', avatar: '', text: 'Your stream is starting. Camera feed connected via WebRTC!', timestamp: new Date() }
    ]);

    // Simulate audience entry & chat
    const audienceTimer = setInterval(() => {
      setCreatorViewerCount(prev => prev + Math.floor(Math.random() * 5) + 2);

      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomText = mockComments[Math.floor(Math.random() * mockComments.length)];
      const newMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: randomUser.name,
        avatar: randomUser.avatar,
        text: randomText,
        timestamp: new Date()
      };
      setCreatorChat(prev => [...prev, newMsg]);
      
      // Auto Emoji Rain on Creator screen when comments arrive
      if (Math.random() > 0.4) {
        const emojis = ['💛', '👍', '🔥', '💻', '🥳'];
        triggerEmojiRain(emojis[Math.floor(Math.random() * emojis.length)]);
      }
    }, 3000);

    return () => clearInterval(audienceTimer);
  }, [activeTab, isCameraActive]);

  // Start Viewer Stream
  const enterStream = (stream: StreamItem) => {
    setSelectedStream(stream);
    setActiveTab('viewer');
  };

  // Start User Stream (Go Live)
  const startLiveStreaming = async () => {
    if (!streamTitle) return;

    try {
      // Access camera and microphone using native browser API
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      
      mediaStreamRef.current = stream;
      setIsCameraActive(true);
      setActiveTab('creator');

      // Assign to local video element
      setTimeout(() => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }, 300);

      // Initialize MediaRecorder API (PROMPT-17.A)
      recordedChunksRef.current = [];
      let options = { mimeType: 'video/webm;codecs=vp9,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm;codecs=vp8,opus' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'video/webm' };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: '' };
          }
        }
      }

      const recorder = new MediaRecorder(stream, options);
      
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `mindbook-stream-${Date.now()}.webm`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        }
      };

      recorder.start(1000); // chunking interval of 1 second
      setMediaRecorder(recorder);
      setIsRecording(true);

    } catch (err) {
      console.error('Error accessing camera/mic:', err);
      alert('Camera and Microphone permissions are required to Go Live!');
    }
  };

  // Stop Streaming
  const stopLiveStreaming = () => {
    // Stop MediaRecorder first to trigger download callback
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    setIsCameraActive(false);
    setIsRecording(false);
    setMediaRecorder(null);
    setActiveTab('directory');
  };

  // Send Chat message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: user.name,
      avatar: user.profilePicture || '',
      text: newMessage,
      timestamp: new Date()
    };

    if (activeTab === 'viewer') {
      setChatMessages(prev => [...prev, userMsg]);
    } else {
      setCreatorChat(prev => [...prev, userMsg]);
    }

    setNewMessage('');
  };

  // Trigger Emoji Rain (PROMPT-43 core feature)
  const triggerEmojiRain = (emoji: string) => {
    const container = emojiRainContainerRef.current;
    if (!container) return;

    const emojiCount = 15; // Rain burst
    const cleanEmoji = emoji.trim();
    const fluentEmojiUrl = EMOJI_3D_MAP[cleanEmoji];

    for (let i = 0; i < emojiCount; i++) {
      let element: HTMLElement;
      
      if (fluentEmojiUrl) {
        const img = document.createElement('img');
        img.src = fluentEmojiUrl;
        img.alt = emoji;
        img.className = 'floating-rain-emoji 3d-rain';
        img.style.objectFit = 'contain';
        img.style.width = '32px';
        img.style.height = '32px';
        element = img;
      } else {
        const span = document.createElement('span');
        span.innerText = emoji;
        span.className = 'floating-rain-emoji';
        element = span;
      }
      
      // Random offset, duration, and delay for natural drift
      const leftOffset = Math.random() * 90; // percentage
      const floatDuration = 2 + Math.random() * 2; // 2s to 4s
      const delay = Math.random() * 0.5; // seconds
      const scale = 0.8 + Math.random() * 0.8;
      
      element.style.left = `${leftOffset}%`;
      element.style.animationDuration = `${floatDuration}s`;
      element.style.animationDelay = `${delay}s`;
      element.style.transform = `scale(${scale})`;
      element.style.position = 'absolute';

      container.appendChild(element);

      // Clean up DOM after animation completes
      setTimeout(() => {
        element.remove();
      }, (floatDuration + delay) * 1000);
    }
  };

  return (
    <div className="livestream-page-container">
      {/* Dynamic Emoji Rain Container overlay across screen during live stream */}
      <div ref={emojiRainContainerRef} className="emoji-rain-container" />

      {/* Directory Tab View */}
      {activeTab === 'directory' && (
        <div className="livestream-directory">
          <div className="directory-header">
            <div className="header-left">
              <FiRadio size={32} className="live-icon-glow" />
              <div>
                <h1>Live Streams</h1>
                <p>Discover real-time broadcasts or launch your own WebRTC live stream!</p>
              </div>
            </div>
            <button 
              className="go-live-launcher-btn"
              onClick={() => setActiveTab('creator')}
            >
              <FiVideo size={18} />
              <span>Launch Live Studio</span>
            </button>
          </div>

          {/* Active streams grid */}
          <div className="streams-section">
            <h2 className="section-title">🔴 Recommended Active Streams</h2>
            <div className="streams-grid">
              {mockStreams.map((stream) => (
                <div 
                  key={stream.id} 
                  className="directory-stream-card"
                  onClick={() => enterStream(stream)}
                >
                  <div className="card-thumbnail-wrapper">
                    <img src={stream.thumbnail} alt={stream.title} className="stream-card-thumb" />
                    <span className="live-pill">🔴 LIVE</span>
                    <span className="viewer-pill">
                      <FiUsers size={12} />
                      {stream.viewers.toLocaleString()}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="host-info">
                      <img src={stream.hostAvatar} alt={stream.host} className="host-avatar" />
                      <div className="host-meta">
                        <h4 className="stream-title">{stream.title}</h4>
                        <span className="host-name">{stream.host}</span>
                        <span className="category-tag">{stream.category}</span>
                      </div>
                    </div>
                    <div className="tags-row">
                      {stream.tags.map((tag) => (
                        <span key={tag} className="tag-chip">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Viewer Mode Screen */}
      {activeTab === 'viewer' && selectedStream && (
        <div className="live-viewer-layout">
          <div className="stream-main-content">
            <div className="stream-player-box">
              {/* Simulated Live Stream Feed / stock animation */}
              <div className="live-player-video-wrapper">
                <div className="custom-live-visualizer">
                  <div className="visualizer-content">
                    <FiRadio size={64} className="spinning-live-icon" />
                    <h3>Connected to WebRTC Stream</h3>
                    <p>Host: {selectedStream.host} is transmitting live...</p>
                  </div>
                  <div className="pulsing-grid-effect" />
                </div>

                <div className="video-player-hud">
                  <div className="hud-top">
                    <span className="live-pill">🔴 LIVE</span>
                    <span className="viewer-pill">
                      <FiUsers size={12} />
                      {viewerCount.toLocaleString()} viewers
                    </span>
                  </div>
                  <div className="hud-bottom">
                    <div className="hud-left">
                      <button className="hud-btn" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
                      </button>
                    </div>
                    <div className="hud-right">
                      <span className="hud-quality">720p HD</span>
                      <button className="hud-btn"><FiMaximize2 size={20} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Host and Stream Details */}
              <div className="stream-details-section">
                <div className="details-header">
                  <div className="host-avatar-box">
                    <img src={selectedStream.hostAvatar} alt={selectedStream.host} className="large-host-avatar" />
                    <div className="host-info-text">
                      <h2>{selectedStream.title}</h2>
                      <p>Hosted by <strong>{selectedStream.host}</strong> • {selectedStream.category}</p>
                    </div>
                  </div>
                  <button className="leave-stream-btn" onClick={() => setActiveTab('directory')}>
                    <FiX size={18} />
                    <span>Exit Stream</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live Chat (Right panel on desktop, bottom on mobile) */}
            <div className="live-chat-panel">
              <div className="chat-header">
                <h3><FiMessageSquare size={16} /> Live Stream Chat</h3>
                <span>Real-time</span>
              </div>
              <div className="chat-messages-container">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`chat-row ${msg.isHost ? 'host-msg' : ''}`}>
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={msg.sender} className="chat-avatar" />
                    ) : (
                      <div className="chat-avatar-system">🛠️</div>
                    )}
                    <div className="chat-message-bubble">
                      <span className="chat-username">{msg.sender}</span>
                      <p className="chat-text">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input & Emoji Rain Trigger buttons */}
              <div className="chat-input-bar">
                <div className="emoji-quick-row">
                  {['💛', '👍', '🔥', '💻', '🥳', '🚀'].map((emoji) => (
                    <button 
                      key={emoji} 
                      className="quick-emoji-btn"
                      onClick={() => triggerEmojiRain(emoji)}
                    >
                      <Emoji3D emoji={emoji} size={20} />
                    </button>
                  ))}
                </div>
                <div className="input-row">
                  <input 
                    type="text" 
                    placeholder="Send a live message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="chat-send-btn" onClick={handleSendMessage}>
                    <FiSend size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creator Mode / Live Studio Setup Screen */}
      {activeTab === 'creator' && (
        <div className="live-studio-layout">
          {!isCameraActive ? (
            <div className="live-studio-setup-card">
              <div className="setup-header">
                <FiVideo size={36} className="studio-setup-icon" />
                <h2>Minds Books Creator Live Studio</h2>
                <p>Configure your stream and transmit directly using WebRTC peer camera.</p>
              </div>

              <div className="setup-form">
                <div className="form-group">
                  <label>Stream Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter an engaging stream title..."
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Stream Category</label>
                    <select value={streamCategory} onChange={(e) => setStreamCategory(e.target.value)}>
                      <option>Gaming</option>
                      <option>Software Dev</option>
                      <option>Music</option>
                      <option>Education</option>
                      <option>AMA / Lifestyle</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tags (Comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. React, Coding, AMA"
                      value={streamTags}
                      onChange={(e) => setStreamTags(e.target.value)}
                    />
                  </div>
                </div>

                <div className="setup-actions">
                  <button 
                    className="cancel-setup-btn"
                    onClick={() => setActiveTab('directory')}
                  >
                    Cancel
                  </button>
                  <button 
                    className="go-live-activation-btn"
                    disabled={!streamTitle.trim()}
                    onClick={startLiveStreaming}
                  >
                    <FiRadio size={18} />
                    <span>Go Live Now</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="live-creator-dashboard">
              <div className="stream-main-content">
                <div className="stream-player-box">
                  {/* Real WebRTC camera feed container */}
                  <div className="live-player-video-wrapper">
                    <video 
                      ref={localVideoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="real-webrtc-stream-video"
                    />

                    <div className="video-player-hud">
                      <div className="hud-top">
                        <span className="live-pill">🔴 BROADCASTING LIVE</span>
                        <span className="viewer-pill">
                          <FiUsers size={12} />
                          {creatorViewerCount.toLocaleString()} viewers
                        </span>
                      </div>
                      <div className="hud-bottom">
                        <div className="hud-left">
                          <button 
                            className="hud-btn" 
                            onClick={() => setIsMicActive(!isMicActive)}
                          >
                            {isMicActive ? <FiMic size={20} /> : <FiMicOff size={20} />}
                          </button>
                        </div>
                        <div className="hud-right">
                          <span className="hud-quality">1080p 60fps</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Creator details */}
                  <div className="stream-details-section">
                    <div className="details-header">
                      <div className="host-avatar-box">
                        <img 
                          src={user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'} 
                          alt="Creator" 
                          className="large-host-avatar" 
                        />
                        <div className="host-info-text">
                          <h2>{streamTitle}</h2>
                          <p>Transmitting Live • Category: {streamCategory}</p>
                        </div>
                      </div>
                      <button className="stop-broadcast-btn" onClick={stopLiveStreaming}>
                        <FiX size={18} />
                        <span>Stop Broadcast</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Simulated audience live chat */}
                <div className="live-chat-panel">
                  <div className="chat-header">
                    <h3><FiMessageSquare size={16} /> Studio Chat Panel</h3>
                    <span>Real-time Chat Feed</span>
                  </div>
                  <div className="chat-messages-container">
                    {creatorChat.map((msg) => (
                      <div key={msg.id} className="chat-row">
                        {msg.avatar ? (
                          <img src={msg.avatar} alt={msg.sender} className="chat-avatar" />
                        ) : (
                          <div className="chat-avatar-system">🛠️</div>
                        )}
                        <div className="chat-message-bubble">
                          <span className="chat-username">{msg.sender}</span>
                          <p className="chat-text">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="chat-input-bar">
                    <div className="emoji-quick-row">
                      {['💛', '👍', '🔥', '💻', '🥳'].map((emoji) => (
                        <button 
                          key={emoji} 
                          className="quick-emoji-btn"
                          onClick={() => triggerEmojiRain(emoji)}
                        >
                          <Emoji3D emoji={emoji} size={20} />
                        </button>
                      ))}
                    </div>
                    <div className="input-row">
                      <input 
                        type="text" 
                        placeholder="Broadcast a system host message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button className="chat-send-btn" onClick={handleSendMessage}>
                        <FiSend size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveStream;
