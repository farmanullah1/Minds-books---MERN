/**
 * CodeDNA
 * Fundraisers.tsx — Premium Fundraisers & Donations Directory with Synced progress bar spring
 * exports: default Fundraisers
 * used_by: App.tsx
 * rules: Yellow theme primary, full spring animation progress bar, custom donation triggers
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiDollarSign, FiPlus, FiX, FiCheck, 
  FiCalendar, FiUser, FiActivity, FiGlobe, FiShare2 
} from 'react-icons/fi';
import confetti from 'canvas-confetti';
import './Fundraisers.css';
import { useAppSelector } from '../../store/hooks';

interface CampaignItem {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  description: string;
  category: string;
  targetGoal: number;
  raisedAmount: number;
  coverImage: string;
  daysLeft: number;
}

const Fundraisers: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  // States
  const [activeTab, setActiveTab] = useState<'directory' | 'create'>('directory');
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);
  
  // Donate modal
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  
  // Create campaign form
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignCategory, setCampaignCategory] = useState('Medical');
  const [campaignGoal, setCampaignGoal] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
  const [campaignCover, setCampaignCover] = useState('');

  // Mock initial campaigns
  useEffect(() => {
    const initialCampaigns: CampaignItem[] = [
      {
        id: 'camp_1',
        title: '❤️ Support Alex’s Cardiac Surgery Recovery Fund',
        creator: 'Sarah Riviera',
        creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
        description: 'Alex recently underwent emergency heart surgery. Funds will go towards medical bills, physical therapy, and basic living expenses while he is unable to work.',
        category: 'Medical',
        targetGoal: 25000,
        raisedAmount: 16800,
        coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=640&h=360&q=80',
        daysLeft: 18
      },
      {
        id: 'camp_2',
        title: '🐱 Paws & Claws Local Shelter Winter Food Drive',
        creator: 'Animal Rescue Guild',
        creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
        description: 'Help us stock up on warm blankets, food supplies, and medicine for over 150 dogs and cats currently in our local community animal shelter for the cold winter months.',
        category: 'Community',
        targetGoal: 8500,
        raisedAmount: 5120,
        coverImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=640&h=360&q=80',
        daysLeft: 9
      },
      {
        id: 'camp_3',
        title: '🌱 Community Urban Garden Greenhouse Project',
        creator: 'GreenVibe Initiative',
        creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
        description: 'Our mission is to construct a modern community greenhouse using organic materials to grow fresh tomatoes, strawberries, and herbs that are free for everyone in the neighborhood.',
        category: 'Environment',
        targetGoal: 4200,
        raisedAmount: 3950,
        coverImage: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=640&h=360&q=80',
        daysLeft: 25
      }
    ];
    setCampaigns(initialCampaigns);
  }, []);

  // Launch campaign creation
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignTitle || !campaignGoal || !campaignDesc) return;

    const newCampaign: CampaignItem = {
      id: `camp_${Math.random()}`,
      title: campaignTitle,
      creator: user?.name || 'Creator',
      creatorAvatar: user?.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
      description: campaignDesc,
      category: campaignCategory,
      targetGoal: parseFloat(campaignGoal),
      raisedAmount: 0,
      coverImage: campaignCover || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=640&h=360&q=80',
      daysLeft: 30
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setCampaignTitle('');
    setCampaignGoal('');
    setCampaignDesc('');
    setCampaignCover('');
    setActiveTab('directory');
  };

  // Perform Donation
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || isNaN(parseFloat(donationAmount)) || !selectedCampaign) return;

    const amount = parseFloat(donationAmount);
    
    // Update local state list
    setCampaigns(prev => prev.map(c => {
      if (c.id === selectedCampaign.id) {
        const updated = { ...c, raisedAmount: c.raisedAmount + amount };
        setSelectedCampaign(updated);
        return updated;
      }
      return c;
    }));

    setShowDonateModal(false);
    setDonationAmount('');

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F7B928', '#ffffff', '#28a745']
    });
  };

  const getPercentage = (raised: number, target: number) => {
    return Math.min(100, Math.floor((raised / target) * 100));
  };

  return (
    <div className="fundraisers-page-container">
      {/* Directory Tab */}
      {activeTab === 'directory' && (
        <div className="fundraisers-directory">
          <div className="directory-header-card">
            <div className="header-left">
              <FiHeart size={36} className="fundraiser-heart-glow" />
              <div>
                <h1>Fundraisers & Donations</h1>
                <p>Support meaningful community campaigns or launch a direct funding goal for local projects.</p>
              </div>
            </div>
            <button 
              className="launch-campaign-btn"
              onClick={() => setActiveTab('create')}
            >
              <FiPlus size={18} />
              <span>Start a Fundraiser</span>
            </button>
          </div>

          <div className="campaigns-grid-section">
            <h2 className="section-title">🌟 Active Fundraiser Campaigns</h2>
            <div className="campaigns-list-grid">
              {campaigns.map((camp) => {
                const percent = getPercentage(camp.raisedAmount, camp.targetGoal);
                
                return (
                  <div 
                    key={camp.id} 
                    className="campaign-card"
                    onClick={() => setSelectedCampaign(camp)}
                  >
                    <div className="camp-card-image-wrapper">
                      <img src={camp.coverImage} alt={camp.title} className="camp-cover-img" />
                      <span className="camp-category-tag">{camp.category}</span>
                    </div>

                    <div className="camp-card-body">
                      <h3 className="camp-title">{camp.title}</h3>
                      <p className="camp-desc-short">{camp.description.substring(0, 100)}...</p>

                      <div className="camp-progress-section">
                        <div className="progress-info-row">
                          <span className="raised-total">${camp.raisedAmount.toLocaleString()} raised</span>
                          <span className="percent-label">{percent}%</span>
                        </div>

                        {/* Animated Progress Bar (PROMPT-45 spring easeOutExpo) */}
                        <div className="camp-progress-track">
                          <motion.div 
                            className="camp-progress-bar"
                            initial={{ width: '0%' }}
                            animate={{ width: `${percent}%` }}
                            transition={{ 
                              duration: 1.2, 
                              ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo approximation
                            }}
                          />
                        </div>

                        <div className="progress-target-row">
                          <span>Target: ${camp.targetGoal.toLocaleString()}</span>
                          <span className="days-label">⌛ {camp.daysLeft} days left</span>
                        </div>
                      </div>

                      <div className="camp-creator-footer">
                        <div className="creator-meta">
                          <img src={camp.creatorAvatar} alt={camp.creator} className="creator-avatar" />
                          <span className="creator-name">{camp.creator}</span>
                        </div>
                        <button className="donate-action-trigger">Support</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create Fundraiser Tab */}
      {activeTab === 'create' && (
        <div className="create-campaign-card">
          <div className="create-header">
            <h2>Start a Campaign</h2>
            <p>Define a fundraising goal, enter details, and publish instantly.</p>
          </div>

          <form className="create-form" onSubmit={handleCreateCampaign}>
            <div className="form-group">
              <label>Campaign Title / Cause</label>
              <input 
                type="text" 
                placeholder="e.g. Winter Shelter Warmth Initiative"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Target Funding Goal ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000"
                  value={campaignGoal}
                  onChange={(e) => setCampaignGoal(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Campaign Category</label>
                <select 
                  value={campaignCategory} 
                  onChange={(e) => setCampaignCategory(e.target.value)}
                >
                  <option>Medical</option>
                  <option>Community</option>
                  <option>Environment</option>
                  <option>Education</option>
                  <option>Creativity</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Cover Image URL (Optional)</label>
              <input 
                type="url" 
                placeholder="Paste an Unsplash image URL..."
                value={campaignCover}
                onChange={(e) => setCampaignCover(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea 
                placeholder="Provide details about who this fundraiser supports and how funds will be used..."
                value={campaignDesc}
                onChange={(e) => setCampaignDesc(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="create-actions">
              <button 
                type="button" 
                className="cancel-btn" 
                onClick={() => setActiveTab('directory')}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={!campaignTitle || !campaignGoal || !campaignDesc}>
                <FiHeart size={16} />
                <span>Launch Fundraiser</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expanded Campaign Detailed Modal view */}
      <AnimatePresence>
        {selectedCampaign && !showDonateModal && (
          <motion.div 
            className="campaign-detail-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCampaign(null)}
          >
            <motion.div 
              className="campaign-detail-modal-card"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-top-cover">
                <img src={selectedCampaign.coverImage} alt={selectedCampaign.title} className="detail-cover-img" />
                <button className="close-detail-btn" onClick={() => setSelectedCampaign(null)}>
                  <FiX size={20} />
                </button>
              </div>

              <div className="modal-body-content">
                <div className="detail-category-row">
                  <span className="category-pill">{selectedCampaign.category}</span>
                  <span className="days-left-badge">⌛ {selectedCampaign.daysLeft} Days Remaining</span>
                </div>

                <h2>{selectedCampaign.title}</h2>

                <div className="detail-creator-row">
                  <img src={selectedCampaign.creatorAvatar} alt={selectedCampaign.creator} className="large-creator-avatar" />
                  <div>
                    <span className="creator-label">Organized by</span>
                    <span className="creator-name">{selectedCampaign.creator}</span>
                  </div>
                </div>

                <p className="detail-description">{selectedCampaign.description}</p>

                <div className="detail-financials-panel">
                  <div className="fin-progress-row">
                    <span className="raised-fin">${selectedCampaign.raisedAmount.toLocaleString()} raised</span>
                    <span className="target-fin">of ${selectedCampaign.targetGoal.toLocaleString()} target</span>
                  </div>

                  {/* Animated Progress Bar (PROMPT-45 spring easeOutExpo) */}
                  <div className="detail-progress-track">
                    <motion.div 
                      className="detail-progress-bar"
                      initial={{ width: '0%' }}
                      animate={{ width: `${getPercentage(selectedCampaign.raisedAmount, selectedCampaign.targetGoal)}%` }}
                      transition={{ 
                        duration: 1.2, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                    />
                  </div>

                  <div className="detail-actions-row">
                    <button className="donate-btn" onClick={() => setShowDonateModal(true)}>
                      <FiDollarSign size={18} />
                      <span>Back This Campaign</span>
                    </button>
                    <button className="share-btn" onClick={() => {
                      navigator.clipboard.writeText(`http://localhost:5173/fundraisers?id=${selectedCampaign.id}`);
                      alert('Fundraiser Campaign Link Copied!');
                    }}>
                      <FiShare2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donation Form Modal */}
      <AnimatePresence>
        {showDonateModal && selectedCampaign && (
          <motion.div 
            className="donation-form-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDonateModal(false)}
          >
            <motion.div 
              className="donation-form-card"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="form-header">
                <h2>Complete Your Donation</h2>
                <button className="close-btn" onClick={() => setShowDonateModal(false)}>
                  <FiX size={18} />
                </button>
              </div>

              <form className="donation-submit-form" onSubmit={handleDonateSubmit}>
                <div className="form-cause-summary">
                  <img src={selectedCampaign.coverImage} alt={selectedCampaign.title} className="cause-thumb" />
                  <div>
                    <h4>{selectedCampaign.title}</h4>
                    <p>Organized by {selectedCampaign.creator}</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>Donation Amount ($)</label>
                  <div className="donation-input-container">
                    <FiDollarSign className="dollar-icon" />
                    <input 
                      type="number" 
                      placeholder="e.g. 50"
                      min="1"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="quick-donation-presets">
                  {[10, 25, 50, 100].map((preset) => (
                    <button 
                      key={preset} 
                      type="button" 
                      className="preset-btn"
                      onClick={() => setDonationAmount(preset.toString())}
                    >
                      +${preset}
                    </button>
                  ))}
                </div>

                <div className="submit-row">
                  <button type="button" className="cancel-btn" onClick={() => setShowDonateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="confirm-btn" disabled={!donationAmount}>
                    Confirm Support
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Fundraisers;
