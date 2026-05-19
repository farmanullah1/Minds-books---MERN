import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiFlag, FiShield } from 'react-icons/fi';
import './CommunityGuidelines.css';

const CommunityGuidelines: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="app-layout" id="guidelines-page">
        <LeftSidebar />
        <main className="main-content">
          <div className="guidelines-container card">
            <div className="guidelines-header">
              <div className="header-icon-wrapper">
                <FiShield className="shield-icon" size={48} />
              </div>
              <h1>Community Guidelines</h1>
              <p className="guidelines-meta">Empowering positive connections at MindBook</p>
              <p className="guidelines-subtitle">
                We believe that virtual spaces should inspire belonging, security, and mutual respect. These guidelines define what is celebrated and what is prohibited on MindBook.
              </p>
            </div>

            {/* Allowed vs Not Allowed Grid */}
            <div className="guidelines-comparison-grid">
              {/* What is Allowed */}
              <div className="comparison-card allowed">
                <div className="card-header">
                  <FiCheckCircle className="icon-success" size={24} />
                  <h3>What We Celebrate</h3>
                </div>
                <ul>
                  <li>
                    <strong>Respectful Ideation:</strong> Share your thoughts, designs, and opinions constructively while acknowledging differing points of view.
                  </li>
                  <li>
                    <strong>Creative Showcase:</strong> Post original photography, portfolios, articles, custom video streams, and digital creations.
                  </li>
                  <li>
                    <strong>Community Support:</strong> Lift others up, join interest groups, participate in arcade challenges, and back crowdfunding initiatives.
                  </li>
                  <li>
                    <strong>Authentic Identity:</strong> Represent yourself honestly, use real-life work titles, and interact genuinely with friends near you.
                  </li>
                </ul>
              </div>

              {/* What is NOT Allowed */}
              <div className="comparison-card prohibited">
                <div className="card-header">
                  <FiXCircle className="icon-error" size={24} />
                  <h3>What is Prohibited</h3>
                </div>
                <ul>
                  <li>
                    <strong>Harassment & Hate Speech:</strong> Bullying, attacking, or degrading individuals based on their race, religion, gender, sexual orientation, or disability.
                  </li>
                  <li>
                    <strong>Spam & Deception:</strong> Creating duplicate profiles, deploying automated search scraping bots, or broadcasting misleading shopping storefront links.
                  </li>
                  <li>
                    <strong>Intellectual Piracy:</strong> Uploading copyrighted music playlists, software code, or videos without explicit permission from creators.
                  </li>
                  <li>
                    <strong>Harmful Content:</strong> Promoting self-harm, posting explicit violence, or attempting computer security hacks targeting our users.
                  </li>
                </ul>
              </div>
            </div>

            {/* Enforcement Policy */}
            <div className="guidelines-section enforcement">
              <div className="section-title-wrapper">
                <FiAlertTriangle className="icon-warn" size={28} />
                <h2>Our Enforcement Policy</h2>
              </div>
              <p>
                When violations are flagged or identified, our security team takes swift, proportionate actions to keep the ecosystem secure. Enforcement measures include:
              </p>
              <div className="enforcement-grid">
                <div className="enforcement-card">
                  <h4>Content Deletion</h4>
                  <p>Inappropriate posts, community polls, comments, or catalog listings will be permanently removed.</p>
                </div>
                <div className="enforcement-card">
                  <h4>Temporary Suspension</h4>
                  <p>Accounts with repeating minor violations will be suspended from posting or messaging for 7 to 30 days.</p>
                </div>
                <div className="enforcement-card">
                  <h4>Permanent Ban</h4>
                  <p>Severe violations (e.g. child exploitation, severe phishing, hacking) result in instant IP and hardware ban.</p>
                </div>
              </div>
            </div>

            {/* How to Report */}
            <div className="guidelines-section reporting">
              <div className="section-title-wrapper">
                <FiFlag className="icon-flag" size={28} />
                <h2>How to Report Violations</h2>
              </div>
              <p>
                If you encounter a post, shop item, gaming room, or profile that violates these guidelines, please report it immediately:
              </p>
              <ol className="reporting-steps">
                <li>Click the three dots (•••) at the top-right corner of the content card.</li>
                <li>Select the <strong>Report Content</strong> option from the action dropdown menu.</li>
                <li>Choose the violation category (Spam, Harassment, Copyright, Hate Speech, etc.).</li>
                <li>Submit the form. Our moderators review all submissions within 24 hours.</li>
              </ol>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CommunityGuidelines;
