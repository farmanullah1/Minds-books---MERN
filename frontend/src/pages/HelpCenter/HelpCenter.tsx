import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { FiSearch, FiChevronDown, FiHelpCircle, FiMail, FiMessageSquare } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './HelpCenter.css';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const HelpCenter: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: 'How do I earn and use MindBook Coins?',
      answer: 'You earn MindBook Coins by engaging in platform activities, completing daily gaming challenges, and setting up popular shop items. You can use these coins to support creators, unlock arcade modes, buy virtual products, and customize your profile badges.',
      category: 'coins'
    },
    {
      question: 'How does pull-to-refresh work on mobile?',
      answer: 'When accessing MindBook from a touch-enabled screen, simply touch the feed area, drag down until the yellow circular spinner locks, and release. This triggers a fresh database fetch, complete with a subtle tactile haptic vibration.',
      category: 'mobile'
    },
    {
      question: 'How can I customize my photo filters?',
      answer: 'Inside the Advanced Post Composer, upload a photo and click the "Filters" tab. You can select from 9 live filters (Vivid, Chrome, Warm, Noir, etc.) to immediately render vintage or cinematic adjustments to your image.',
      category: 'composer'
    },
    {
      question: 'Where is the Creator Studio located?',
      answer: 'Expand the Left Sidebar by clicking "See more", and select "Creator Studio". Here you can monitor dynamic analytics, gender charts, video retention loops, and compile PDF reports instantly.',
      category: 'studio'
    },
    {
      question: 'How does Socket.IO support real-time audio rooms?',
      answer: 'Our real-time engine coordinates low-latency client-server signaling. Audio rooms coordinate connections utilizing high-fidelity WebRTC connections so participants can talk without page loads or delays.',
      category: 'technical'
    },
    {
      question: 'Is my data secure on MindBook?',
      answer: 'Yes! We run complete encryption schemes, safeguard password hashes with bcrypt, and adhere strictly to global GDPR guidelines. You can download your data dump or delete your account at any time under settings.',
      category: 'security'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Contact Form States
  const [supportName, setSupportName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName || !supportEmail || !supportMessage) return;
    
    // Simulate API request
    setFormSubmitted(true);
    setTimeout(() => {
      setSupportName('');
      setSupportEmail('');
      setSupportMessage('');
      setFormSubmitted(false);
      alert('Support Request Submitted! Our developers will contact you shortly.');
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="app-layout" id="help-page">
        <LeftSidebar />
        <main className="main-content">
          <div className="help-container card">
            
            {/* Hero search */}
            <div className="help-hero">
              <FiHelpCircle className="help-hero-icon" size={48} />
              <h1>How can we help you?</h1>
              <p>Search FAQs, explore product guides, or contact support developers.</p>
              
              <div className="search-bar-wrapper">
                <FiSearch className="search-bar-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Search questions, settings, coins, analytics..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Main Layout Grid */}
            <div className="help-grid">
              
              {/* FAQs Section */}
              <div className="faqs-section">
                <h2>Frequently Asked Questions</h2>
                
                {/* Category filters */}
                <div className="category-filters">
                  {['all', 'coins', 'mobile', 'composer', 'studio', 'technical', 'security'].map(cat => (
                    <button 
                      key={cat}
                      className={`filter-badge ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="faqs-list">
                  {filteredFaqs.length === 0 ? (
                    <div className="faqs-empty">
                      <p>No results match your search query. Try typing another keyword.</p>
                    </div>
                  ) : (
                    filteredFaqs.map((faq, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                          <button className="faq-trigger" onClick={() => toggleAccordion(index)}>
                            <span>{faq.question}</span>
                            <motion.span 
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiChevronDown size={18} />
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div 
                                className="faq-content-wrapper"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                              >
                                <div className="faq-content">
                                  <p>{faq.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Contact Support Form */}
              <div className="support-form-section">
                <div className="support-card card">
                  <div className="support-card-header">
                    <FiMail size={24} className="support-header-icon" />
                    <h3>Contact Developer Support</h3>
                    <p>Have an issue or a bug to report? Send a direct dispatch to Farmanullah Ansari.</p>
                  </div>
                  
                  <form onSubmit={handleSupportSubmit} className="support-form">
                    <div className="form-group">
                      <label htmlFor="supportName">Your Name</label>
                      <input 
                        type="text" 
                        id="supportName" 
                        required 
                        placeholder="John Doe"
                        value={supportName}
                        onChange={(e) => setSupportName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="supportEmail">Email Address</label>
                      <input 
                        type="email" 
                        id="supportEmail" 
                        required 
                        placeholder="johndoe@example.com"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="supportMessage">Describe the Issue</label>
                      <textarea 
                        id="supportMessage" 
                        rows={4} 
                        required 
                        placeholder="Tell us what's happening..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className={`submit-btn ${formSubmitted ? 'loading' : ''}`}
                      disabled={formSubmitted}
                    >
                      {formSubmitted ? 'Sending Request...' : 'Submit Support Ticket'}
                    </button>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default HelpCenter;
