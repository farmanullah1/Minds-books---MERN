import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateUserInState } from '../../store/slices/authSlice';
import { 
  FiShoppingBag, FiTrendingUp, FiTrendingDown, FiDollarSign, 
  FiAward, FiSend, FiUser, FiActivity, FiArrowUp, FiX, 
  FiCreditCard, FiCheckCircle, FiBookOpen 
} from 'react-icons/fi';
import api from '../../services/api';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ThreeCoin from './ThreeCoin';
import './Wallet.css';

interface CounterProps {
  value: number;
  duration?: number;
  format?: (val: number) => string;
}

const AnimatedCounterLocal: React.FC<CounterProps> = ({ 
  value, 
  duration = 1.2, 
  format = (v) => Math.round(v).toLocaleString() 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(obj.val);
      }
    });

    return () => {
      tween.kill();
    };
  }, [value, duration]);

  return <span style={{ fontWeight: 900 }}>{format(displayValue)}</span>;
};

interface Transaction {
  _id?: string;
  type: 'earn' | 'spend' | 'transfer' | 'purchase';
  amount: number;
  description: string;
  date: string;
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

interface UserListItem {
  _id: string;
  name: string;
  profilePicture?: string;
  email: string;
}

const Wallet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  // States
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [usersList, setUsersList] = useState<UserListItem[]>([]);
  const [selectedCreatorId, setSelectedCreatorId] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [tipLoading, setTipLoading] = useState(false);
  const [earningLoading, setEarningLoading] = useState<string | null>(null);

  // Shop Checkout state
  const [selectedTier, setSelectedTier] = useState<{ amount: number; price: number; name: string } | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Daily claim check
  const [dailyClaimed, setDailyClaimed] = useState(false);

  // Audio/Visual Triggers
  const audioContextRef = useRef<AudioContext | null>(null);

  const playChime = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); // A5
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.25); // D6
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  // Fetch Wallet & Users data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [walletRes, usersRes] = await Promise.all([
          api.get('/wallet'),
          api.get('/users')
        ]);
        
        setWallet(walletRes.data);
        
        // Exclude current user from tipping options
        if (user?._id) {
          const others = usersRes.data.filter((u: UserListItem) => u._id !== user._id);
          setUsersList(others);
        } else {
          setUsersList(usersRes.data);
        }

        // Daily Reward claim checking based on last login reward dates
        if (user?.lastLoginReward) {
          const lastRewardDate = new Date(user.lastLoginReward).toDateString();
          const today = new Date().toDateString();
          setDailyClaimed(lastRewardDate === today);
        }

      } catch (err) {
        console.error('Wallet load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user?._id, user?.lastLoginReward]);

  // Handle simulated Daily rewards claim
  const claimDailyReward = async () => {
    if (dailyClaimed) return;
    setEarningLoading('daily');
    try {
      const res = await api.post('/wallet/earn', {
        amount: 50,
        description: 'Daily Check-in Gold Loyalty Reward'
      });
      setWallet(res.data);
      dispatch(updateUserInState({ 
        coins: (user?.coins || 0) + 50,
        lastLoginReward: new Date().toISOString()
      }));
      setDailyClaimed(true);
      playChime();
      confetti({ particleCount: 120, spread: 80, colors: ['#ffd700', '#f7b928', '#ffffff'] });
    } catch (err) {
      console.error('Daily reward error:', err);
    } finally {
      setEarningLoading(null);
    }
  };

  // Claim game loyalty reward simulation
  const claimActivityReward = async (id: string, amount: number, taskName: string) => {
    setEarningLoading(id);
    try {
      const res = await api.post('/wallet/earn', {
        amount,
        description: `Activity Bonus: ${taskName}`
      });
      setWallet(res.data);
      dispatch(updateUserInState({ coins: (user?.coins || 0) + amount }));
      playChime();
      confetti({ particleCount: 80, spread: 60, colors: ['#ffd700', '#ffffff'] });
    } catch (err) {
      console.error('Activity claim error:', err);
    } finally {
      setEarningLoading(null);
    }
  };

  // Send creator Tip coins
  const sendCreatorTip = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(tipAmount);
    if (!selectedCreatorId || !tipAmount || amountNum <= 0) return;

    if (wallet && wallet.balance < amountNum) {
      alert('Insufficient coin balance inside your wallet.');
      return;
    }

    setTipLoading(true);
    try {
      const res = await api.post('/wallet/tip', {
        creatorId: selectedCreatorId,
        amount: amountNum
      });
      setWallet(res.data);
      dispatch(updateUserInState({ coins: (user?.coins || 0) - amountNum }));
      setTipAmount('');
      setSelectedCreatorId('');
      setSearchUser('');
      playChime();
      confetti({ particleCount: 100, spread: 70, colors: ['#10b981', '#ffd700'] });
      alert('Tipping transfer succeeded! Coins transferred and creator notified dynamically.');
    } catch (err: any) {
      console.error('Tipping error:', err);
      alert(err.response?.data?.message || 'Tipping transaction failed');
    } finally {
      setTipLoading(false);
    }
  };

  // Simulated Shop checkout package selection
  const selectShopTier = (amount: number, price: number, name: string) => {
    setSelectedTier({ amount, price, name });
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');
    setCheckoutSuccess(false);
  };

  // Format Card Number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const masked = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(masked);
  };

  // Format Expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      setCardExpiry(val.substring(0, 2) + '/' + val.substring(2));
    } else {
      setCardExpiry(val);
    }
  };

  // Submit simulated payment purchase
  const processPurchaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3) {
      alert('Please fill out card details correctly.');
      return;
    }

    setCheckoutLoading(true);
    // Simulate short network delay for processing security checks
    setTimeout(async () => {
      try {
        const res = await api.post('/wallet/purchase', {
          amount: selectedTier.amount,
          costUSD: selectedTier.price
        });
        setWallet(res.data);
        dispatch(updateUserInState({ coins: (user?.coins || 0) + selectedTier.amount }));
        setCheckoutSuccess(true);
        playChime();
        confetti({ particleCount: 180, spread: 90, colors: ['#ffd700', '#f7b928', '#ffffff'] });
      } catch (err) {
        console.error('Shop purchase error:', err);
        alert('Failed to authorize transaction');
      } finally {
        setCheckoutLoading(false);
      }
    }, 1500);
  };

  // Filter creator users by search text
  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  ).slice(0, 5);

  // Pagination Helper
  const indexLastTransaction = currentPage * itemsPerPage;
  const indexFirstTransaction = indexLastTransaction - itemsPerPage;
  const currentTransactions = wallet?.transactions
    ? [...wallet.transactions].reverse().slice(indexFirstTransaction, indexLastTransaction)
    : [];
  const totalPages = wallet?.transactions 
    ? Math.ceil(wallet.transactions.length / itemsPerPage) 
    : 1;

  if (loading) {
    return (
      <div className="wallet-page-container">
        <LeftSidebar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', padding: '40px' }}>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-page-container">
      <LeftSidebar />

      <main className="wallet-main-content">
        <div className="wallet-header-section">
          <h1>Wallet & Economy</h1>
          <p>Manage your gold coins, tip your favorite creators, claim tasks rewards, or top-up your balance safely.</p>
        </div>

        <div className="wallet-grid-layout">
          
          {/* 1. Active Coins Balance with 3D animation */}
          <div className="wallet-panel-card active-balance-glow-card">
            <div className="balance-stats-box">
              <span className="balance-label">Verified Balance</span>
              <div className="balance-numeric-display">
                <AnimatedCounterLocal value={wallet?.balance || 0} />
                <span className="balance-coin-currency"> GOLD</span>
              </div>
              <p className="balance-perks-info">
                Coins let you unlock exclusive articles, make custom offers on the Three.js Marketplace, tip your top creators, and send high-fidelity animated gifts!
              </p>
            </div>
            <div className="three-coin-wrapper-box">
              <ThreeCoin />
            </div>
          </div>

          {/* 2. Coin Earning Activities */}
          <div className="wallet-panel-card">
            <h2><FiAward size={22} /> Tasks & Earning Centers</h2>
            <div className="earner-actions-grid">
              
              {/* Daily Reward Row */}
              <div className="earner-item-row">
                <div className="earner-meta">
                  <span className="earner-title">Daily Check-in Loyalty</span>
                  <span className="earner-desc">Receive coins every 24 hours just for visiting.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="earner-reward-badge">+50 Gold</span>
                  <button 
                    className="claim-reward-button" 
                    onClick={claimDailyReward}
                    disabled={dailyClaimed || earningLoading === 'daily'}
                  >
                    {earningLoading === 'daily' ? 'Syncing...' : dailyClaimed ? 'Claimed' : 'Claim'}
                  </button>
                </div>
              </div>

              {/* Game loyalty Activity */}
              <div className="earner-item-row">
                <div className="earner-meta">
                  <span className="earner-title">Play Gaming Arcade Games</span>
                  <span className="earner-desc">Gain gold coins for score checkpoints.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="earner-reward-badge">+15 Gold</span>
                  <button 
                    className="claim-reward-button" 
                    onClick={() => claimActivityReward('game', 15, 'Completed Arcade Game Milestone')}
                    disabled={earningLoading !== null}
                  >
                    {earningLoading === 'game' ? 'Syncing...' : 'Play & Claim'}
                  </button>
                </div>
              </div>

              {/* Invitation bonus Activity */}
              <div className="earner-item-row">
                <div className="earner-meta">
                  <span className="earner-title">Invite Coworkers & Peer Circles</span>
                  <span className="earner-desc">Claim bonus coins for onboarding referrals.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="earner-reward-badge">+100 Gold</span>
                  <button 
                    className="claim-reward-button" 
                    onClick={() => claimActivityReward('invite', 100, 'Onboarded Circle Circle Referral')}
                    disabled={earningLoading !== null}
                  >
                    {earningLoading === 'invite' ? 'Syncing...' : 'Mock Invite'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Tipping & Creator Support Monetization */}
          <div className="wallet-panel-card">
            <h2><FiSend size={22} /> Creator Monetization Tips</h2>
            <form onSubmit={sendCreatorTip} className="tipping-form-block">
              
              {/* Creator Selector search */}
              <div className="form-group-tipping">
                <label>Select Creator Profile</label>
                <input 
                  type="text" 
                  className="tipping-input-field" 
                  placeholder="Search creators by name or email..." 
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
                
                {searchUser && (
                  <div style={{
                    position: 'absolute',
                    top: '74px',
                    left: 0,
                    right: 0,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    zIndex: 10,
                    overflow: 'hidden'
                  }}>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(u => (
                        <div 
                          key={u._id}
                          style={{
                            padding: '10px 14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            borderBottom: '1px solid var(--border-color)'
                          }}
                          onClick={() => {
                            setSelectedCreatorId(u._id);
                            setSearchUser(u.name);
                          }}
                          className="hover-bg-select"
                        >
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#000', fontWeight: 'bold' }}>
                            {u.name.substring(0, 1)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{u.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{u.email}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '10px 14px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No matching creators found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Tip coins amount */}
              <div className="form-group-tipping">
                <label>Tip Coin Quantity (Gold)</label>
                <input 
                  type="number" 
                  className="tipping-input-field" 
                  placeholder="Enter tipping amount e.g. 50" 
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  min="1"
                  max={wallet?.balance}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="tip-send-button"
                disabled={tipLoading || !selectedCreatorId || !tipAmount || Number(tipAmount) > (wallet?.balance || 0)}
              >
                <FiSend size={18} />
                {tipLoading ? 'Processing Tip...' : 'Transmit Tip Coins'}
              </button>

            </form>
          </div>

          {/* Shop Store headlines */}
          <h2 className="store-packages-headline"><FiShoppingBag size={24} /> Simulated Coin Shop Store</h2>

          {/* 4. Top-up Packages */}
          <div className="store-package-tier-grid">
            
            {/* Package 1 */}
            <div className="package-tier-card">
              <span className="package-coin-icon-graphic">🪙</span>
              <span className="package-coins-amount">500 Coins</span>
              <span className="package-price-tag">$4.99 USD</span>
              <button className="package-buy-button" onClick={() => selectShopTier(500, 4.99, 'Starter Pack')}>
                Purchase
              </button>
            </div>

            {/* Package 2 */}
            <div className="package-tier-card popular-badge-wrap">
              <div className="package-popular-flag">Popular</div>
              <span className="package-coin-icon-graphic">💎</span>
              <span className="package-coins-amount">1,200 Coins</span>
              <span className="package-bonus-label">Includes +200 Bonus</span>
              <span className="package-price-tag">$9.99 USD</span>
              <button className="package-buy-button" onClick={() => selectShopTier(1200, 9.99, 'Professional Pack')}>
                Purchase
              </button>
            </div>

            {/* Package 3 */}
            <div className="package-tier-card">
              <span className="package-coin-icon-graphic">🔮</span>
              <span className="package-coins-amount">2,500 Coins</span>
              <span className="package-bonus-label">Includes +500 Bonus</span>
              <span className="package-price-tag">$19.99 USD</span>
              <button className="package-buy-button" onClick={() => selectShopTier(2500, 19.99, 'Enterprise Pack')}>
                Purchase
              </button>
            </div>

            {/* Package 4 */}
            <div className="package-tier-card">
              <span className="package-coin-icon-graphic">👑</span>
              <span className="package-coins-amount">7,500 Coins</span>
              <span className="package-bonus-label">Includes +2500 Bonus</span>
              <span className="package-price-tag">$49.99 USD</span>
              <button className="package-buy-button" onClick={() => selectShopTier(7500, 49.99, 'Royal Pack')}>
                Purchase
              </button>
            </div>

          </div>

          {/* 5. Historical Transactions Table */}
          <div className="wallet-panel-card transaction-history-card">
            <h2><FiActivity size={22} /> Coin Transaction Statements</h2>
            
            <div className="table-responsive-box">
              {currentTransactions.length > 0 ? (
                <table className="glassmorphic-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((tx, idx) => (
                      <tr key={tx._id || idx}>
                        <td>
                          <span className={`transaction-type-badge type-${tx.type}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td>{tx.description}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {new Date(tx.date).toLocaleString()}
                        </td>
                        <td>
                          <span className={`transaction-amount-color ${
                            tx.type === 'earn' || tx.type === 'purchase' ? 'amount-positive' : 'amount-negative'
                          }`}>
                            {tx.type === 'earn' || tx.type === 'purchase' ? '+' : '-'}{tx.amount} Gold
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="transaction-empty-state">
                  <FiBookOpen size={44} />
                  <p>No historical coin statements logged yet.</p>
                </div>
              )}
            </div>

            {/* Pagination UI */}
            {wallet?.transactions && wallet.transactions.length > itemsPerPage && (
              <div className="pagination-controls-row">
                <span>
                  Showing {indexFirstTransaction + 1} to {Math.min(indexLastTransaction, wallet.transactions.length)} of {wallet.transactions.length} items
                </span>
                <div className="pagination-btn-group">
                  <button 
                    className="pagination-btn-nav"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </button>
                  <button 
                    className="pagination-btn-nav"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Simulated shop purchase card-checkout modal overlay */}
      {selectedTier && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal-container">
            
            <div className="checkout-header">
              <h3>Secure Checkout Portal</h3>
              <button className="checkout-close-btn" onClick={() => setSelectedTier(null)}>
                <FiX size={20} />
              </button>
            </div>

            {checkoutSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <FiCheckCircle size={56} style={{ color: '#10b981' }} />
                <div>
                  <h4 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '4px' }}>Transaction Authorized!</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {selectedTier.amount} Gold Coins have been added to your balance.
                  </p>
                </div>
                <button 
                  className="claim-reward-button" 
                  style={{ width: '100%', marginTop: '10px' }}
                  onClick={() => setSelectedTier(null)}
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={processPurchaseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div className="checkout-summary-box">
                  <div className="checkout-tier-details">
                    <span className="checkout-tier-name">{selectedTier.name} Upgrade</span>
                    <span className="checkout-tier-coins">+{selectedTier.amount} Gold Coins</span>
                  </div>
                  <span className="checkout-price-bold">${selectedTier.price} USD</span>
                </div>

                {/* Card graphic visual preview */}
                <div className="simulated-card-graphic">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="simulated-card-chip" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--brand)' }}>MINDBOOK GOLD</span>
                  </div>
                  <div className="simulated-card-number-label">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="simulated-card-meta-row">
                    <div>
                      <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>Card Holder</div>
                      <div style={{ fontWeight: 'bold' }}>{cardHolder.toUpperCase() || 'YOUR NAME'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.55rem', opacity: 0.7 }}>Expires</div>
                      <div style={{ fontWeight: 'bold' }}>{cardExpiry || 'MM/YY'}</div>
                    </div>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="checkout-fields-layout">
                  
                  <div className="form-group-tipping">
                    <label>Cardholder Name</label>
                    <input 
                      type="text" 
                      className="tipping-input-field" 
                      placeholder="e.g. Johnathan Doe" 
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      maxLength={24}
                      required
                    />
                  </div>

                  <div className="form-group-tipping">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      className="tipping-input-field" 
                      placeholder="4111 2222 3333 4444" 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="form-group-tipping">
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      className="tipping-input-field" 
                      placeholder="MM/YY" 
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className="form-group-tipping">
                    <label>CVV Code</label>
                    <input 
                      type="password" 
                      className="tipping-input-field" 
                      placeholder="•••" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      maxLength={4}
                      required
                    />
                  </div>

                </div>

                <button 
                  type="submit" 
                  className="tip-send-button"
                  disabled={checkoutLoading || cardNumber.length < 19 || cardExpiry.length < 5 || cardCvv.length < 3}
                >
                  <FiCreditCard size={18} />
                  {checkoutLoading ? 'Authorizing Secure Payment...' : `Authorize Payment $${selectedTier.price} USD`}
                </button>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Wallet;
