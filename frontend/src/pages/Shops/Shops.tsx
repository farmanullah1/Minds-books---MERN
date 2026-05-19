/**
 * CodeDNA
 * Shops.tsx — High-Fidelity Social Commerce & Creator Shops Hub (PROMPT-56)
 * exports: default Shops
 * used_by: App.tsx
 * rules: Premium Shops grid discovery, Follow toggle, Stateful Setup forms, Product DMs trigger
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, FiPlus, FiMessageSquare, FiCalendar, 
  FiCheck, FiHeart, FiEye, FiGrid, FiSliders, FiImage, 
  FiPlusCircle, FiDollarSign, FiTrash2 
} from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { useAppSelector } from '../../store/hooks';
import confetti from 'canvas-confetti';
import './Shops.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  photos: string[];
  inStock: boolean;
  type: 'product' | 'service';
}

interface Shop {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  description: string;
  category: string;
  banner: string;
  avatar: string;
  products: Product[];
  followersCount: number;
  followed: boolean;
}

const INITIAL_SHOPS: Shop[] = [
  {
    id: 'shop_1',
    ownerId: 'owner_1',
    ownerName: 'Sarah Jenkins',
    name: 'Sarah\'s Handmade Tech Art',
    description: 'Bespoke hand-crafted resin computer ornaments, glowing keycaps, and neon motherboard art arrays.',
    category: 'Art & Crafts',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    followersCount: 242,
    followed: false,
    products: [
      {
        id: 'prod_1_1',
        name: 'Glowing Neon Escape Keycap',
        description: 'Cherry MX profile, hand-cast epoxy resin containing genuine glowing micro-conductors.',
        price: 35,
        currency: 'USD',
        category: 'Accessories',
        photos: ['https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=400&q=80'],
        inStock: true,
        type: 'product'
      },
      {
        id: 'prod_1_2',
        name: 'Tech Consultation Session',
        description: '1-on-1 audio space architecture design review & custom workstation setup guidance.',
        price: 75,
        currency: 'USD',
        category: 'Services',
        photos: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80'],
        inStock: true,
        type: 'service'
      }
    ]
  },
  {
    id: 'shop_2',
    ownerId: 'owner_2',
    ownerName: 'Michael Rover',
    name: 'Rover Audio Gear',
    description: 'Premium curated headphones repairs, acoustic foam setups, and microphone setups tuning packages.',
    category: 'Electronics',
    banner: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    followersCount: 185,
    followed: true,
    products: [
      {
        id: 'prod_2_1',
        name: 'Custom Noise Cancelling Pads',
        description: 'Extra thick velvet replacement pads compatible with studio monitors headphones series.',
        price: 24,
        currency: 'USD',
        category: 'Audio accessories',
        photos: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'],
        inStock: true,
        type: 'product'
      }
    ]
  }
];

const Shops: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  // Tab panels: discover | manage
  const [activeTab, setActiveTab] = useState<'discover' | 'manage'>('discover');
  
  // Community active Shops
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  
  // User's own shop state
  const [myShop, setMyShop] = useState<Shop | null>({
    id: 'my_shop_1',
    ownerId: user?._id || 'user_id',
    ownerName: user?.name || 'Farmanullah',
    name: 'Ansari Tech Solutions',
    description: 'Expert coding consultations, custom widgets configurations, and database optimizations pipelines.',
    category: 'Consulting',
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    avatar: user?.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    followersCount: 12,
    followed: false,
    products: [
      {
        id: 'prod_my_1',
        name: 'Custom React Web Component',
        description: 'Bespoke custom component code hand-written and optimized with gorgeous animations.',
        price: 49,
        currency: 'USD',
        category: 'Web Dev',
        photos: ['https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80'],
        inStock: true,
        type: 'product'
      }
    ]
  });

  // Shop Creation form state
  const [creatingShop, setCreatingShop] = useState(false);
  const [newShopName, setNewShopName] = useState('');
  const [newShopDesc, setNewShopDesc] = useState('');
  const [newShopCategory, setNewShopCategory] = useState('Consulting');
  const [newShopBanner, setNewShopBanner] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80');

  // Product Creation state
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(25);
  const [newProdCategory, setNewProdCategory] = useState('Software');
  const [newProdType, setNewProdType] = useState<'product' | 'service'>('product');
  const [shareToFeed, setShareToFeed] = useState(true);

  // Selected Overlay States
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<{ product: Product; shopOwner: string } | null>(null);
  const [simulatedFeedPost, setSimulatedFeedPost] = useState<any>(null);

  // Follow shop trigger
  const handleFollowShop = (shopId: string) => {
    setShops(prev => prev.map(s => {
      if (s.id === shopId) {
        const nextVal = !s.followed;
        return {
          ...s,
          followed: nextVal,
          followersCount: nextVal ? s.followersCount + 1 : s.followersCount - 1
        };
      }
      return s;
    }));
  };

  // Create Shop submit
  const handleCreateShop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShopName) return;

    setMyShop({
      id: `shop_${Date.now()}`,
      ownerId: user?._id || 'user_id',
      ownerName: user?.name || 'Farmanullah',
      name: newShopName,
      description: newShopDesc,
      category: newShopCategory,
      banner: newShopBanner,
      avatar: user?.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      followersCount: 0,
      followed: false,
      products: []
    });

    setCreatingShop(false);
    confetti({ particleCount: 120, spread: 80 });
  };

  // Add Product submit
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !myShop) return;

    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      name: newProdName,
      description: newProdDesc,
      price: newProdPrice,
      currency: 'USD',
      category: newProdCategory,
      photos: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80'],
      inStock: true,
      type: newProdType
    };

    setMyShop({
      ...myShop,
      products: [newProduct, ...myShop.products]
    });

    if (shareToFeed) {
      setSimulatedFeedPost({
        product: newProduct,
        shopName: myShop.name,
        shopOwner: myShop.ownerName
      });
    }

    setAddingProduct(false);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(25);
    confetti({ particleCount: 80, spread: 60 });
  };

  // Delete product
  const handleDeleteProduct = (prodId: string) => {
    if (!myShop) return;
    setMyShop({
      ...myShop,
      products: myShop.products.filter(p => p.id !== prodId)
    });
  };

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <LeftSidebar />
        
        <main className="main-content">
          <div className="shops-container">
            
            {/* Top Shop Banner Hero */}
            <div className="shops-top-hero">
              <div className="hero-info-panel">
                <span className="shops-pill-indicator">🛒 SOCIAL COMMERCE</span>
                <h1>MindBook Shops</h1>
                <p>Launch your custom digital storefront, showcase product items, schedule coding services, and trade premium setups directly.</p>
              </div>

              <div className="shops-tabs-selectors">
                <button 
                  className={`shop-tab-btn ${activeTab === 'discover' ? 'active' : ''}`}
                  onClick={() => setActiveTab('discover')}
                >
                  <FiGrid /> Discover Shops
                </button>
                <button 
                  className={`shop-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                  onClick={() => setActiveTab('manage')}
                >
                  <FiSliders /> My Storefront
                </button>
              </div>
            </div>

            {/* Simulated Feed Post Notification when shared */}
            {simulatedFeedPost && (
              <div className="simulated-feed-card card mb-4">
                <div className="feed-card-header">
                  <span className="badge-shared">📢 SHARED TO COMMUNITY FEED</span>
                  <button className="close-btn" onClick={() => setSimulatedFeedPost(null)}>✕</button>
                </div>
                <div className="feed-product-layout">
                  <img src={simulatedFeedPost.product.photos[0]} alt={simulatedFeedPost.product.name} />
                  <div className="feed-product-details">
                    <span className="shop-attribution">Storefront: @{simulatedFeedPost.shopOwner} ({simulatedFeedPost.shopName})</span>
                    <h4>{simulatedFeedPost.product.name}</h4>
                    <p className="price-tag">${simulatedFeedPost.product.price} USD</p>
                    <p className="feed-desc">{simulatedFeedPost.product.description}</p>
                    <div className="feed-card-actions">
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => setSelectedProduct({ product: simulatedFeedPost.product, shopOwner: simulatedFeedPost.shopOwner })}>
                        <FiEye /> View Details
                      </button>
                      <a 
                        href={`/messages?user=${simulatedFeedPost.shopOwner}&message=Hi! I am interested in buying your product "${simulatedFeedPost.product.name}" for $${simulatedFeedPost.product.price}`}
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Simulated DM sent to @${simulatedFeedPost.shopOwner}: "Hi! I am interested in buying your product ${simulatedFeedPost.product.name}."`);
                        }}
                      >
                        <FiMessageSquare /> Message to Buy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: DISCOVER ACTIVE SHOPS */}
            {activeTab === 'discover' && (
              <div className="discover-shops-grid">
                {shops.map((shop) => (
                  <motion.div 
                    key={shop.id}
                    className="shop-showcase-card card"
                    whileHover={{ y: -6 }}
                  >
                    <div className="shop-card-banner">
                      <img src={shop.banner} alt={shop.name} />
                      <span className="shop-cat-badge">{shop.category}</span>
                    </div>

                    <div className="shop-card-body">
                      <div className="shop-avatar-info-row">
                        <img src={shop.avatar} alt={shop.ownerName} className="shop-avatar-img" />
                        <div className="shop-name-meta">
                          <h3 onClick={() => setSelectedShop(shop)} className="clickable-title">{shop.name}</h3>
                          <span>Owned by: @{shop.ownerName}</span>
                        </div>
                      </div>

                      <p className="shop-desc-teaser">{shop.description}</p>

                      <div className="shop-stats-line">
                        <span>📦 <strong>{shop.products.length}</strong> products listed</span>
                        <span>👥 <strong>{shop.followersCount}</strong> followers</span>
                      </div>

                      <div className="shop-card-actions">
                        <button className="btn btn-secondary btn-sm mr-2" onClick={() => setSelectedShop(shop)}>
                          Browse Products
                        </button>
                        <button 
                          className={`btn btn-sm ${shop.followed ? 'btn-outline-primary' : 'btn-primary'}`}
                          onClick={() => handleFollowShop(shop.id)}
                        >
                          {shop.followed ? <><FiCheck /> Followed</> : 'Follow Shop'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* TAB 2: MY STOREFRONT / MANAGE */}
            {activeTab === 'manage' && (
              <div className="my-storefront-panel">
                {!myShop ? (
                  <div className="no-shop-card card text-center p-5">
                    <FiShoppingBag size={48} className="mx-auto text-muted mb-3" />
                    <h2>Launch your Creator Shop</h2>
                    <p>Start listing coding solutions, custom components assets, database support, or visual packs and earn directly from the community.</p>
                    <button className="btn btn-primary mt-3" onClick={() => setCreatingShop(true)}>
                      Create Your Shop
                    </button>
                  </div>
                ) : (
                  <div className="my-shop-management-layout">
                    
                    {/* Header Shop Preview */}
                    <div className="my-shop-preview-hero card">
                      <div className="preview-banner">
                        <img src={myShop.banner} alt={myShop.name} />
                        <span className="my-shop-badge">{myShop.category}</span>
                      </div>

                      <div className="preview-details">
                        <div className="preview-avatar-line">
                          <img src={myShop.avatar} alt="Avatar" className="my-avatar" />
                          <div className="preview-titles">
                            <h3>{myShop.name}</h3>
                            <p>@{myShop.ownerName} • Storefront Owner</p>
                          </div>
                        </div>
                        <p className="preview-desc">{myShop.description}</p>
                        <div className="preview-actions-bar">
                          <button className="btn btn-primary" onClick={() => setAddingProduct(true)}>
                            <FiPlus /> Add New Product
                          </button>
                          <button className="btn btn-secondary ml-2" onClick={() => setMyShop(null)}>
                            Close Shop Storefront
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Products list listed */}
                    <div className="my-listed-products-section">
                      <h2>Listed Products & Services ({myShop.products.length})</h2>
                      {myShop.products.length === 0 ? (
                        <p className="no-products-text">No products listed yet. Click "Add New Product" to start selling.</p>
                      ) : (
                        <div className="listed-products-grid">
                          {myShop.products.map((prod) => (
                            <div key={prod.id} className="listed-product-card card">
                              <img src={prod.photos[0]} alt={prod.name} />
                              <div className="listed-details">
                                <div className="title-price-row">
                                  <h4>{prod.name}</h4>
                                  <span className="price-tag">${prod.price} {prod.currency}</span>
                                </div>
                                <p>{prod.description}</p>
                                <div className="product-status-line">
                                  <span className={`status-pill ${prod.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                    {prod.inStock ? 'Available' : 'Out of Stock'}
                                  </span>
                                  <span className="type-badge">{prod.type === 'service' ? 'Service Session' : 'Digital Asset'}</span>
                                </div>
                                <div className="listed-actions">
                                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(prod.id)}>
                                    <FiTrash2 /> Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* MODAL: CREATE SHOP */}
            {creatingShop && (
              <div className="shops-overlay" role="dialog" aria-modal="true" aria-labelledby="create-shop-title">
                <div className="shops-modal card animate-fadeIn">
                  <div className="modal-header">
                    <h3 id="create-shop-title">Setup Storefront Shop</h3>
                    <button className="close-btn" onClick={() => setCreatingShop(false)}>✕</button>
                  </div>
                  
                  <form onSubmit={handleCreateShop} className="modal-form">
                    <div className="form-group-item">
                      <label>Storefront Name</label>
                      <input 
                        type="text" 
                        value={newShopName} 
                        onChange={(e) => setNewShopName(e.target.value)} 
                        placeholder="e.g. Ansari Coding Sandbox..."
                        required 
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Category</label>
                      <select value={newShopCategory} onChange={(e) => setNewShopCategory(e.target.value)}>
                        <option value="Consulting">Consulting & Audits</option>
                        <option value="Software">Software & Widgets</option>
                        <option value="Art & Crafts">Art & Designs</option>
                        <option value="Audio Gear">Audio & Acoustics</option>
                      </select>
                    </div>

                    <div className="form-group-item">
                      <label>Banner Image URL</label>
                      <input 
                        type="text" 
                        value={newShopBanner} 
                        onChange={(e) => setNewShopBanner(e.target.value)} 
                        placeholder="https://example.com/banner.jpg"
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Storefront Description</label>
                      <textarea 
                        value={newShopDesc} 
                        onChange={(e) => setNewShopDesc(e.target.value)} 
                        placeholder="Detail the catalog list items, skills consultations offered, and standard delivery timelines..."
                        rows={4}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">
                      Launch Shop Storefront
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* MODAL: ADD PRODUCT */}
            {addingProduct && (
              <div className="shops-overlay" role="dialog" aria-modal="true" aria-labelledby="create-prod-title">
                <div className="shops-modal card animate-fadeIn">
                  <div className="modal-header">
                    <h3 id="create-prod-title">List New Product or Service</h3>
                    <button className="close-btn" onClick={() => setAddingProduct(false)}>✕</button>
                  </div>

                  <form onSubmit={handleAddProduct} className="modal-form">
                    <div className="form-group-item">
                      <label>Product Name</label>
                      <input 
                        type="text" 
                        value={newProdName} 
                        onChange={(e) => setNewProdName(e.target.value)} 
                        placeholder="e.g. Interactive Maps Sandbox Component..."
                        required 
                      />
                    </div>

                    <div className="form-group-split">
                      <div className="form-group-item">
                        <label>Price (USD)</label>
                        <input 
                          type="number" 
                          value={newProdPrice} 
                          onChange={(e) => setNewProdPrice(Number(e.target.value))} 
                          min={1}
                          required 
                        />
                      </div>
                      
                      <div className="form-group-item">
                        <label>Listing Type</label>
                        <select value={newProdType} onChange={(e) => setNewProdType(e.target.value as any)}>
                          <option value="product">Digital Asset / Product</option>
                          <option value="service">Hourly Service Session</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group-item">
                      <label>Category</label>
                      <input 
                        type="text" 
                        value={newProdCategory} 
                        onChange={(e) => setNewProdCategory(e.target.value)} 
                        placeholder="e.g. React Components" 
                        required
                      />
                    </div>

                    <div className="form-group-item">
                      <label>Description</label>
                      <textarea 
                        value={newProdDesc} 
                        onChange={(e) => setNewProdDesc(e.target.value)} 
                        placeholder="Detail product features, configurations setup, package files types, or services schedules..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="form-group-item checkbox-group">
                      <input 
                        type="checkbox" 
                        id="share-to-feed-checkbox" 
                        checked={shareToFeed} 
                        onChange={(e) => setShareToFeed(e.target.checked)} 
                      />
                      <label htmlFor="share-to-feed-checkbox">Share listing alert to community feed post</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-3">
                      List Store Item
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* MODAL: BROWSE SHOP PRODUCTS OVERLAY */}
            {selectedShop && (
              <div className="shops-overlay" role="dialog" aria-modal="true" aria-labelledby="browse-shop-title">
                <div className="shops-modal browse-modal card animate-fadeIn">
                  <div className="modal-header">
                    <h3 id="browse-shop-title">{selectedShop.name} Catalog</h3>
                    <button className="close-btn" onClick={() => setSelectedShop(null)}>✕</button>
                  </div>

                  <div className="browse-banner">
                    <img src={selectedShop.banner} alt={selectedShop.name} />
                  </div>

                  <div className="browse-shop-products-list">
                    {selectedShop.products.length === 0 ? (
                      <p className="no-products-text">This storefront has no active listings currently.</p>
                    ) : (
                      <div className="browse-products-grid">
                        {selectedShop.products.map((p) => (
                          <div 
                            key={p.id} 
                            className="browse-product-card card clickable"
                            onClick={() => setSelectedProduct({ product: p, shopOwner: selectedShop.ownerName })}
                          >
                            <img src={p.photos[0]} alt={p.name} />
                            <div className="browse-prod-details">
                              <h4>{p.name}</h4>
                              <p className="price-tag">${p.price} USD</p>
                              <span className="type-badge">{p.type === 'service' ? 'Service' : 'Product'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MODAL: SELECTED PRODUCT DETAILS CARD */}
            {selectedProduct && (
              <div className="shops-overlay" role="dialog" aria-modal="true" aria-labelledby="prod-details-title">
                <div className="shops-modal details-modal card animate-fadeIn">
                  <div className="modal-header">
                    <h3 id="prod-details-title">Product Details</h3>
                    <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
                  </div>

                  <div className="details-layout">
                    <img src={selectedProduct.product.photos[0]} alt={selectedProduct.product.name} className="details-img" />
                    
                    <div className="details-content">
                      <span className="details-category">{selectedProduct.product.category}</span>
                      <h2>{selectedProduct.product.name}</h2>
                      <p className="price-tag">${selectedProduct.product.price} USD</p>
                      
                      <div className="details-specs">
                        <span>Type: <strong>{selectedProduct.product.type === 'service' ? 'Service Appointment' : 'Digital Download Asset'}</strong></span>
                        <span>Stock: <strong>{selectedProduct.product.inStock ? 'Available' : 'Sold Out'}</strong></span>
                      </div>

                      <p className="details-description">{selectedProduct.product.description}</p>

                      <div className="details-actions">
                        {selectedProduct.product.type === 'service' ? (
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              alert(`Booking request sent to @${selectedProduct.shopOwner} for "${selectedProduct.product.name}". An agent will contact you shortly!`);
                              setSelectedProduct(null);
                            }}
                          >
                            <FiCalendar /> Book Now
                          </button>
                        ) : (
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              alert(`Simulated DM sent to @${selectedProduct.shopOwner}: "Hi! I am interested in buying your product ${selectedProduct.product.name} for $${selectedProduct.product.price}."`);
                              setSelectedProduct(null);
                            }}
                          >
                            <FiMessageSquare /> Message to Buy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
        
        <RightSidebar />
      </div>
    </>
  );
};

export default Shops;
