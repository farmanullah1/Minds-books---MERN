import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, FiSearch, FiTag, FiStar, FiPlus, 
  FiX, FiCheck, FiCpu, FiShield, FiSend, FiLoader, FiTrash2 
} from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useToast } from '../../components/Toast/ToastContext';
import { updateUserInState } from '../../store/slices/authSlice';
import api from '../../services/api';
import confetti from 'canvas-confetti';
import ThreeHero from './ThreeHero';
import './Store.css';

interface IListingSeller {
  _id: string;
  name: string;
  profilePicture: string;
}

interface IOfferBuyer {
  _id: string;
  name: string;
  profilePicture: string;
}

interface IOffer {
  _id: string;
  buyer: IOfferBuyer;
  amount: number;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  createdAt: string;
}

interface IListing {
  _id: string;
  seller: IListingSeller;
  title: string;
  description: string;
  price: number;
  category: 'Digital Perks' | 'Electronics' | 'Books' | 'Fashion' | 'Services';
  imageUrl: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  status: 'Active' | 'Sold' | 'Pending';
  saves: string[];
  offers: IOffer[];
  createdAt: string;
}

const CATEGORIES = ['All', 'Digital Perks', 'Electronics', 'Books', 'Fashion', 'Services'];

const Store: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { showToast } = useToast();

  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'browse' | 'mine' | 'saved'>('browse');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<IListing | null>(null);

  // New listing form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newCategory, setNewCategory] = useState<IListing['category']>('Digital Perks');
  const [newCondition, setNewCondition] = useState<IListing['condition']>('New');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isSubmittingListing, setIsSubmittingListing] = useState(false);

  // New offer form state
  const [offerAmount, setOfferAmount] = useState<number>(0);
  const [offerMessage, setOfferMessage] = useState('');
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);

  // Fetch listings based on tabs and filters
  const fetchListings = async () => {
    try {
      setLoading(true);
      let endpoint = '/marketplace';
      if (activeTab === 'mine') endpoint = '/marketplace/mine';
      if (activeTab === 'saved') endpoint = '/marketplace/saved';

      const response = await api.get(endpoint, {
        params: {
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy
        }
      });
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
      showToast('Failed to load marketplace listings.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [activeTab, selectedCategory, sortBy]);

  // Debounced search trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchListings();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Handle save/bookmark listing
  const handleToggleSave = async (listingId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await api.post(`/marketplace/${listingId}/save`);
      const { isSaved } = response.data;
      
      // Update local state
      setListings(prev => 
        prev.map(item => {
          if (item._id === listingId) {
            const saves = isSaved 
              ? [...item.saves, user?._id || ''] 
              : item.saves.filter(id => id !== user?._id);
            return { ...item, saves };
          }
          return item;
        })
      );

      // If in saved tab, remove from view immediately
      if (activeTab === 'saved' && !isSaved) {
        setListings(prev => prev.filter(item => item._id !== listingId));
      }

      showToast(isSaved ? 'Listing bookmarked!' : 'Listing removed from bookmarks.', 'success');
    } catch (error) {
      console.error('Toggle save error:', error);
      showToast('Failed to bookmark listing.', 'error');
    }
  };

  // Open offer modal
  const handleOpenOfferModal = (listing: IListing) => {
    setSelectedListing(listing);
    setOfferAmount(listing.price);
    setOfferMessage('');
    setIsOfferModalOpen(true);
  };

  // Handle submit offer
  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    if (offerAmount <= 0) {
      showToast('Please enter a valid coin offer amount.', 'warning');
      return;
    }

    if ((user?.coins || 0) < offerAmount) {
      showToast('Insufficient coins in your wallet!', 'error');
      return;
    }

    try {
      setIsSubmittingOffer(true);
      const response = await api.post(`/marketplace/${selectedListing._id}/offer`, {
        amount: offerAmount,
        message: offerMessage
      });

      // Update listings list
      setListings(prev => 
        prev.map(item => item._id === selectedListing._id ? response.data : item)
      );

      // Deduct coins from user balance in Redux state
      if (user) {
        dispatch(updateUserInState({ coins: (user.coins || 0) - offerAmount }));
      }

      setIsOfferModalOpen(false);
      
      // Burst Confetti & Toast success!
      confetti({ particleCount: 150, spread: 80 });
      showToast('Offer submitted successfully!', 'success');
    } catch (error: any) {
      console.error('Submit offer error:', error);
      showToast(error.response?.data?.message || 'Failed to submit offer.', 'error');
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  // Handle submit new listing
  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim() || !newDescription.trim() || newPrice <= 0 || !newImageUrl.trim()) {
      showToast('Please fill in all fields with valid values.', 'warning');
      return;
    }

    try {
      setIsSubmittingListing(true);
      const response = await api.post('/marketplace', {
        title: newTitle,
        description: newDescription,
        price: newPrice,
        category: newCategory,
        condition: newCondition,
        imageUrl: newImageUrl
      });

      // Add to beginning of grid list
      setListings(prev => [response.data, ...prev]);
      setIsListModalOpen(false);

      // Reset form
      setNewTitle('');
      setNewDescription('');
      setNewPrice(0);
      setNewImageUrl('');

      showToast('Item listed successfully!', 'success');
      confetti({ particleCount: 100, spread: 60 });
    } catch (error) {
      console.error('Create listing error:', error);
      showToast('Failed to create listing.', 'error');
    } finally {
      setIsSubmittingListing(false);
    }
  };

  // Handle accept/decline offer
  const handleProcessOffer = async (listingId: string, offerId: string, status: 'Accepted' | 'Declined') => {
    try {
      const response = await api.post(`/marketplace/${listingId}/offers/${offerId}/status`, { status });
      
      // Update local state
      setListings(prev => 
        prev.map(item => item._id === listingId ? response.data : item)
      );

      // Add coins if accepted and user is seller
      if (status === 'Accepted' && user) {
        const listing = listings.find(item => item._id === listingId);
        const offer = listing?.offers.find(o => o._id === offerId);
        if (offer) {
          dispatch(updateUserInState({ coins: (user.coins || 0) + offer.amount }));
        }
      }

      showToast(`Offer successfully ${status.toLowerCase()}!`, 'success');
      if (status === 'Accepted') {
        confetti({ particleCount: 120, spread: 75 });
      }
    } catch (error) {
      console.error('Process offer error:', error);
      showToast('Failed to update offer status.', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <LeftSidebar />
        <main className="main-content main-content-marketplace">
          <div className="store-container">
            
            {/* 3D Shopping Bag Hero Section */}
            <div className="store-hero card glassmorphic">
              <div className="hero-content">
                <span className="hero-pill">🪙 MINDBOOK MARKETPLACE</span>
                <h1>Trade & Acquire Upgrades</h1>
                <p>Use your hard-earned MindBook Coins to buy exclusive profile badges, utilities, or exchange physical and digital tech items with other users!</p>
                <div className="hero-meta-stats">
                  <div className="meta-stat-item">
                    <span className="meta-stat-label">Your Wallet Balance</span>
                    <span className="meta-stat-value">🪙 {user?.coins || 0} Coins</span>
                  </div>
                  <button className="btn btn-primary btn-list-item" onClick={() => setIsListModalOpen(true)}>
                    <FiPlus /> List an Item
                  </button>
                </div>
              </div>
              <div className="hero-canvas-container">
                <ThreeHero />
              </div>
            </div>

            {/* Filter Navigation Bar */}
            <div className="marketplace-controls-row">
              <div className="tabs-nav-glass card">
                <button 
                  className={`tab-item ${activeTab === 'browse' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('browse'); setSelectedCategory('All'); }}
                >
                  <FiShoppingBag /> Browse Items
                </button>
                <button 
                  className={`tab-item ${activeTab === 'mine' ? 'active' : ''}`}
                  onClick={() => setActiveTab('mine')}
                >
                  <FiCpu /> My Listings
                </button>
                <button 
                  className={`tab-item ${activeTab === 'saved' ? 'active' : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  <FiStar /> Bookmarked
                </button>
              </div>

              <div className="search-sort-group">
                <div className="search-bar-glass card">
                  <FiSearch className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search marketplace..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="sort-dropdown-glass card">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Slider */}
            {activeTab === 'browse' && (
              <div className="categories-slider mb-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <FiTag className="mr-1" /> {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Marketplace Main Grid */}
            {loading ? (
              <div className="loader-container">
                <FiLoader className="spinner spinner-lg text-brand" />
                <p className="mt-3 text-secondary">Fetching listings...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="empty-state card text-center p-5">
                <FiShoppingBag size={48} className="mx-auto text-muted mb-3" />
                <h2>No items found</h2>
                <p>We couldn't find any listings matching your current selection.</p>
                {activeTab === 'saved' && <p className="text-secondary mt-1">Items you bookmark on the marketplace will show up here.</p>}
                {activeTab === 'mine' && (
                  <button className="btn btn-primary mt-4" onClick={() => setIsListModalOpen(true)}>
                    List your first item now
                  </button>
                )}
              </div>
            ) : (
              <div className="marketplace-masonry-grid">
                {listings.map((item) => {
                  const isSaved = item.saves.includes(user?._id || '');
                  const isOwnListing = item.seller._id === user?._id;

                  return (
                    <motion.div
                      key={item._id}
                      className={`market-card card ${item.status === 'Sold' ? 'sold-out' : ''}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="card-image-container">
                        <img src={item.imageUrl} alt={item.title} className="card-img" />
                        
                        {item.status === 'Sold' && (
                          <div className="sold-badge">SOLD</div>
                        )}

                        <span className="condition-badge">{item.condition}</span>

                        {/* Save listing button - slides in on hover via CSS */}
                        {!isOwnListing && item.status === 'Active' && (
                          <button 
                            className={`save-bookmark-btn ${isSaved ? 'saved' : ''}`}
                            onClick={(e) => handleToggleSave(item._id, e)}
                          >
                            <FiStar fill={isSaved ? '#F7B928' : 'none'} /> {isSaved ? 'Saved' : 'Save'}
                          </button>
                        )}
                      </div>

                      <div className="card-details-panel">
                        <div className="card-meta-top">
                          <span className="card-category"><FiTag className="mr-1" /> {item.category}</span>
                          <span className="card-price">🪙 {item.price} Coins</span>
                        </div>

                        <h3 className="card-title">{item.title}</h3>
                        <p className="card-description">{item.description}</p>

                        {/* Seller Attribution */}
                        <div className="card-seller-attribution">
                          <img 
                            src={item.seller.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'} 
                            alt={item.seller.name} 
                            className="seller-avatar-sm"
                          />
                          <div className="seller-info">
                            <span className="seller-name">{item.seller.name}</span>
                            <span className="seller-label">Seller</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="card-actions-row">
                          {isOwnListing ? (
                            <div className="own-listing-indicator w-100 text-center text-brand font-weight-bold">
                              ★ Your Listing
                            </div>
                          ) : item.status === 'Sold' ? (
                            <button className="btn btn-secondary btn-full btn-sm" disabled>
                              Sold Out
                            </button>
                          ) : (
                            <button 
                              className="btn btn-primary btn-full btn-sm"
                              onClick={() => handleOpenOfferModal(item)}
                            >
                              <FiSend /> Make Coin Offer
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Display offers received for own listings */}
                      {isOwnListing && item.offers && item.offers.length > 0 && (
                        <div className="offers-received-panel">
                          <div className="panel-title">Offers Received ({item.offers.filter(o => o.status === 'Pending').length})</div>
                          <div className="offers-list">
                            {item.offers.map((offer) => (
                              <div key={offer._id} className="offer-row card">
                                <div className="offer-buyer-info">
                                  <img 
                                    src={offer.buyer.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'} 
                                    alt={offer.buyer.name} 
                                    className="buyer-avatar-xs"
                                  />
                                  <div className="buyer-meta">
                                    <span className="buyer-name">{offer.buyer.name}</span>
                                    <span className="offer-amount">Offered: 🪙 {offer.amount}</span>
                                  </div>
                                </div>
                                {offer.message && <p className="offer-msg">"{offer.message}"</p>}
                                
                                <div className="offer-actions-line mt-2">
                                  {offer.status === 'Pending' ? (
                                    <>
                                      <button 
                                        className="btn btn-success btn-xs mr-2"
                                        onClick={() => handleProcessOffer(item._id, offer._id, 'Accepted')}
                                      >
                                        Accept
                                      </button>
                                      <button 
                                        className="btn btn-danger btn-xs"
                                        onClick={() => handleProcessOffer(item._id, offer._id, 'Declined')}
                                      >
                                        Decline
                                      </button>
                                    </>
                                  ) : (
                                    <span className={`offer-status-badge ${offer.status.toLowerCase()}`}>
                                      {offer.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            {/* How to earn section */}
            <section className="store-earn-section card glassmorphic mt-5">
              <h2>How to accumulate MindBook Coins?</h2>
              <p className="text-secondary mb-4">Minds Books rewards active community participants. Earn coins and redeem them inside the marketplace:</p>
              <div className="earn-grid">
                <div className="earn-item card">
                  <span className="earn-icon">☀️</span>
                  <div className="earn-text">
                    <h4>Daily Check-in</h4>
                    <p>+5 Coins every day you log in</p>
                  </div>
                </div>
                <div className="earn-item card">
                  <span className="earn-icon">✍️</span>
                  <div className="earn-text">
                    <h4>Create Posts</h4>
                    <p>+2 Coins for sharing posts</p>
                  </div>
                </div>
                <div className="earn-item card">
                  <span className="earn-icon">💬</span>
                  <div className="earn-text">
                    <h4>Discussion commenting</h4>
                    <p>+1 Coin for participating in threads</p>
                  </div>
                </div>
                <div className="earn-item card">
                  <span className="earn-icon">🏆</span>
                  <div className="earn-text">
                    <h4>Daily Challenge</h4>
                    <p>+10 Coins for completing quests</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
        <RightSidebar />
      </div>

      {/* MODAL: CREATE LISTING */}
      <AnimatePresence>
        {isListModalOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content glass-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="modal-header">
                <h2>List Item in Marketplace</h2>
                <button className="modal-close" onClick={() => setIsListModalOpen(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleCreateListing}>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label className="form-label">Item Title</label>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="e.g. Mechanical Gaming Keyboard"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row mb-3">
                    <div className="form-group col-6 pr-2">
                      <label className="form-label">Price (Coins)</label>
                      <input 
                        type="number" 
                        className="input-field" 
                        placeholder="Price in coins"
                        value={newPrice || ''}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        min={1}
                        required
                      />
                    </div>
                    
                    <div className="form-group col-6 pl-2">
                      <label className="form-label">Condition</label>
                      <select 
                        className="input-field"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value as any)}
                      >
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row mb-3">
                    <div className="form-group col-6 pr-2">
                      <label className="form-label">Category</label>
                      <select 
                        className="input-field"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                      >
                        <option value="Digital Perks">Digital Perks</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Services">Services</option>
                      </select>
                    </div>

                    <div className="form-group col-6 pl-2">
                      <label className="form-label">Image URL</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Image URL (Unsplash, etc.)"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Detailed Description</label>
                    <textarea 
                      className="input-field" 
                      placeholder="Specify technical details, condition notes, and deliverable methods..."
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsListModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmittingListing}>
                    {isSubmittingListing ? <FiLoader className="spinner spinner-sm mr-2" /> : null}
                    Create Listing
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: SUBMIT OFFER */}
      <AnimatePresence>
        {isOfferModalOpen && selectedListing && (
          <div className="modal-overlay">
            <motion.div 
              className="modal-content glass-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="modal-header">
                <h2>Make Coin Offer</h2>
                <button className="modal-close" onClick={() => setIsOfferModalOpen(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmitOffer}>
                <div className="modal-body">
                  <div className="offer-summary-card card mb-3">
                    <img src={selectedListing.imageUrl} alt={selectedListing.title} className="offer-sum-img" />
                    <div className="offer-sum-info">
                      <h4>{selectedListing.title}</h4>
                      <p className="text-brand font-weight-bold">Asking Price: 🪙 {selectedListing.price} Coins</p>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <div className="flex-justify-between mb-1">
                      <label className="form-label">Your Offer Amount (Coins)</label>
                      <span className="balance-info-label">Your Balance: 🪙 {user?.coins || 0}</span>
                    </div>
                    <input 
                      type="number" 
                      className="input-field" 
                      placeholder="Coins offered"
                      value={offerAmount || ''}
                      onChange={(e) => setOfferAmount(Number(e.target.value))}
                      min={1}
                      max={user?.coins || 0}
                      required
                    />
                    {offerAmount > (user?.coins || 0) && (
                      <span className="text-danger font-size-sm mt-1 block">★ Offer exceeds your wallet balance!</span>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label className="form-label">Optional message to seller</label>
                    <textarea 
                      className="input-field" 
                      placeholder="e.g. Can do this today, let me know if interested..."
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsOfferModalOpen(false)}>Cancel</button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmittingOffer || offerAmount > (user?.coins || 0) || offerAmount <= 0}
                  >
                    {isSubmittingOffer ? <FiLoader className="spinner spinner-sm mr-2" /> : null}
                    Submit Offer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Store;
