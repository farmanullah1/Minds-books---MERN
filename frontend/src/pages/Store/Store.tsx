import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiCpu, FiStar, FiShield, FiCheck } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { useAppSelector } from '../../store/hooks';
import './Store.css';

const STORE_ITEMS = [
  {
    id: 'boost_pack',
    name: 'Post Boost Pack',
    description: 'Get 3 post boosts for a discounted price.',
    icon: <FiCpu size={32} />,
    price: 50,
    type: 'utility'
  },
  {
    id: 'gold_member',
    name: 'Gold Membership',
    description: 'Exclusive gold badge on your profile and comments.',
    icon: <FiStar size={32} />,
    price: 150,
    type: 'badge'
  },
  {
    id: 'ad_free',
    name: 'Ad-Free Experience',
    description: 'Remove all sponsored content from your feed.',
    icon: <FiShield size={32} />,
    price: 300,
    type: 'premium'
  }
];

const Store: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <LeftSidebar />
        <main className="main-content">
          <div className="store-container">
            <header className="store-header">
              <div className="store-header-info">
                <h1><FiShoppingBag className="mr-2" /> Marketplace</h1>
                <p>Spend your MindBook Coins on exclusive features and upgrades.</p>
              </div>
              <div className="store-balance">
                <span className="balance-label">Your Balance</span>
                <span className="balance-value">{user?.coins || 0} Coins</span>
              </div>
            </header>

            <div className="store-grid">
              {STORE_ITEMS.map((item) => (
                <motion.div 
                  key={item.id}
                  className="store-item-card card"
                  whileHover={{ y: -5 }}
                >
                  <div className="store-item-image-wrapper">
                    <img src={`https://source.unsplash.com/random/400x300/?tech,${item.id}`} alt={item.name} className="store-item-image" />
                    <button className="store-save-btn">
                      <FiStar /> Save
                    </button>
                  </div>
                  <div className="store-item-content">
                    <div className="store-item-header">
                      <div className="store-item-icon">{item.icon}</div>
                      <h3>{item.name}</h3>
                    </div>
                    <p>{item.description}</p>
                    <div className="store-item-footer">
                      <span className="item-price">{item.price} Coins</span>
                      <button className="btn btn-primary btn-sm">Buy Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <section className="store-section mt-5">
              <h2>How to earn coins?</h2>
              <div className="earn-grid mt-3">
                <div className="earn-card card">
                  <FiCheck className="text-brand" />
                  <span>Daily Login: +5 Coins</span>
                </div>
                <div className="earn-card card">
                  <FiCheck className="text-brand" />
                  <span>Create Post: +2 Coins</span>
                </div>
                <div className="earn-card card">
                  <FiCheck className="text-brand" />
                  <span>Comment: +1 Coin</span>
                </div>
                <div className="earn-card card">
                  <FiCheck className="text-brand" />
                  <span>Complete Daily Challenge: +10 Coins</span>
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

export default Store;
