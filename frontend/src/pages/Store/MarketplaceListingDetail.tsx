import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiLoader, FiSend, FiShield, FiTag } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateUserInState } from '../../store/slices/authSlice';
import { useToast } from '../../components/Toast/ToastContext';
import api from '../../services/api';
import './Store.css';

interface ListingDetail {
  _id: string;
  seller: { _id: string; name: string; profilePicture: string };
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  condition: string;
  status: 'Active' | 'Sold' | 'Pending';
  saves: string[];
  offers: { _id: string; buyer: { _id: string; name: string; profilePicture: string }; amount: number; message: string; status: string; createdAt: string }[];
  createdAt: string;
}

const MarketplaceListingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { showToast } = useToast();
  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [offerAmount, setOfferAmount] = useState(0);
  const [offerMessage, setOfferMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await api.get(`/marketplace/${id}`);
        setListing(response.data);
        setOfferAmount(response.data.price);
      } catch (error) {
        showToast('Listing could not be loaded.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, showToast]);

  const handleSubmitOffer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!listing || offerAmount <= 0) return;

    if ((user?.coins || 0) < offerAmount) {
      showToast('Insufficient coins in your wallet.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post(`/marketplace/${listing._id}/offer`, {
        amount: offerAmount,
        message: offerMessage,
      });
      setListing(response.data);
      dispatch(updateUserInState({ coins: (user?.coins || 0) - offerAmount }));
      setOfferMessage('');
      showToast('Offer submitted successfully.', 'success');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to submit offer.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const isOwnListing = listing?.seller._id === user?._id;
  const pendingOffers = listing?.offers?.filter((offer) => offer.status === 'Pending') || [];

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <LeftSidebar />
        <main className="main-content main-content-marketplace">
          <div className="store-container">
            <button className="marketplace-back-btn" onClick={() => navigate('/marketplace')}>
              <FiArrowLeft /> Back to Marketplace
            </button>

            {loading ? (
              <div className="loader-container">
                <FiLoader className="spinner spinner-lg text-brand" />
                <p className="mt-3 text-secondary">Loading listing...</p>
              </div>
            ) : !listing ? (
              <div className="empty-state card text-center p-5">
                <h2>Listing not found</h2>
                <p>This item may have been removed or sold.</p>
              </div>
            ) : (
              <motion.section
                className="listing-detail-shell card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              >
                <div className="listing-detail-media">
                  <img src={listing.imageUrl} alt={listing.title} />
                  <span className={`listing-status-chip ${listing.status.toLowerCase()}`}>{listing.status}</span>
                </div>

                <div className="listing-detail-info">
                  <div className="listing-detail-meta">
                    <span><FiTag /> {listing.category}</span>
                    <span><FiShield /> {listing.condition}</span>
                    <span><FiClock /> {new Date(listing.createdAt).toLocaleDateString()}</span>
                  </div>

                  <h1>{listing.title}</h1>
                  <p className="listing-detail-description">{listing.description}</p>

                  <div className="listing-seller-panel">
                    <img src={listing.seller.profilePicture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'} alt={listing.seller.name} />
                    <div>
                      <strong>{listing.seller.name}</strong>
                      <span>Marketplace seller</span>
                    </div>
                  </div>

                  <div className="listing-detail-price-row">
                    <span>{listing.price.toLocaleString()} Coins</span>
                    <small>{listing.saves.length} saves</small>
                  </div>

                  {isOwnListing ? (
                    <div className="owner-offer-management">
                      <h2>Offer Management</h2>
                      {pendingOffers.length === 0 ? (
                        <p className="text-secondary">No pending offers yet.</p>
                      ) : (
                        pendingOffers.map((offer) => (
                          <div className="detail-offer-row" key={offer._id}>
                            <div>
                              <strong>{offer.buyer.name}</strong>
                              <span>{offer.amount.toLocaleString()} Coins</span>
                            </div>
                            <FiCheck />
                          </div>
                        ))
                      )}
                    </div>
                  ) : (
                    <form className="listing-offer-panel" onSubmit={handleSubmitOffer}>
                      <h2>Make an Offer</h2>
                      <label>
                        Offer amount
                        <input
                          type="number"
                          min={1}
                          max={user?.coins || 0}
                          value={offerAmount || ''}
                          onChange={(event) => setOfferAmount(Number(event.target.value))}
                        />
                      </label>
                      <label>
                        Message to seller
                        <textarea
                          rows={3}
                          value={offerMessage}
                          onChange={(event) => setOfferMessage(event.target.value)}
                          placeholder="Add a short note..."
                        />
                      </label>
                      <button className="btn btn-primary btn-full" disabled={submitting || listing.status !== 'Active'}>
                        {submitting ? <FiLoader className="spinner spinner-sm" /> : <FiSend />}
                        Submit Offer
                      </button>
                    </form>
                  )}
                </div>
              </motion.section>
            )}
          </div>
        </main>
        <RightSidebar />
      </div>
    </>
  );
};

export default MarketplaceListingDetail;
