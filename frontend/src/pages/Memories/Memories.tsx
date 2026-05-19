import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiVideo, FiPlay, FiClock, FiActivity, FiZap } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import api from '../../services/api';
import './Memories.css';

const Memories: React.FC = () => {
  const [remixing, setRemixing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  const handleGenerateRemix = async () => {
    setRemixing(true);
    try {
      const res = await api.post('/memories/remix');
      setVideoUrl(res.data.videoUrl);
      alert('Memory Remix generated successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to generate remix. Make sure you have posted photos this week!');
    } finally {
      setRemixing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <LeftSidebar />
        <main className="main-content">
          <div className="memories-container">
            <header className="memories-header">
              <div className="header-icon">
                <FiClock size={40} />
              </div>
              <h1>Memory Remix</h1>
              <p>Relive your best moments. We'll assemble your top-engagement posts into a cinematic highlight reel.</p>
            </header>

            <div className="remix-showcase card">
              {!videoUrl ? (
                <div className="remix-placeholder">
                  <FiVideo size={64} className="mb-4 text-brand" />
                  <h3>Ready for your weekly remix?</h3>
                  <p>We'll analyze your posts from the last 7 days and create a video for you.</p>
                  <button 
                    className="btn btn-primary btn-lg mt-4" 
                    onClick={handleGenerateRemix}
                    disabled={remixing}
                  >
                    {remixing ? (
                      <>
                        <div className="spinner small mr-2" />
                        Assembling Memories...
                      </>
                    ) : (
                      <>
                        <FiZap className="mr-2" /> Generate Remix
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="video-player-container">
                  <video controls className="remix-video">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="video-actions mt-4">
                    <button className="btn btn-primary" onClick={() => setVideoUrl(null)}>Create New Remix</button>
                    <button className="btn btn-secondary ml-2">Share to Feed</button>
                  </div>
                </div>
              )}
            </div>

            <section className="engagement-insights mt-5">
              <h2>Engagement Insights</h2>
              <div className="insights-grid mt-3">
                <div className="insight-card card">
                  <FiActivity className="text-brand" />
                  <div>
                    <h4>Profile Views</h4>
                    <span className="insight-value">+24%</span>
                  </div>
                </div>
                <div className="insight-card card">
                  <FiCamera className="text-brand" />
                  <div>
                    <h4>Top Post</h4>
                    <span className="insight-value">Sunset Beach</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <RightSidebar />
      </div>
    </>
  );
};

export default Memories;
