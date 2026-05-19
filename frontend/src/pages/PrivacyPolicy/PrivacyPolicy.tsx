import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'data-collection', title: '2. Data We Collect' },
    { id: 'data-usage', title: '3. How We Use Data' },
    { id: 'cookies', title: '4. Cookies & Tracking' },
    { id: 'gdpr', title: '5. GDPR & User Rights' },
    { id: 'data-security', title: '6. Data Security' },
    { id: 'updates', title: '7. Updates to Policy' },
    { id: 'contact', title: '8. Contact Information' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-layout" id="privacy-policy-page">
        <LeftSidebar />
        <main className="main-content">
          <div className="policy-container card">
            <div className="policy-header">
              <h1>Privacy Policy</h1>
              <p className="policy-meta">Last Updated: May 19, 2026</p>
              <p className="policy-subtitle">
                At MindBook, we take your privacy seriously. This document outlines the types of data we collect, how we protect it, and your rights under GDPR.
              </p>
            </div>

            <div className="policy-body-layout">
              {/* Table of Contents Sidebar */}
              <aside className="policy-toc">
                <h3>Table of Contents</h3>
                <ul>
                  {sections.map((sec) => (
                    <li key={sec.id}>
                      <button onClick={() => scrollToSection(sec.id)} className="toc-link">
                        {sec.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Policy Sections */}
              <div className="policy-content">
                <section id="introduction">
                  <h2>1. Introduction</h2>
                  <p>
                    Welcome to MindBook. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                  </p>
                  <p>
                    When you visit our website and use our services, you trust us with your personal information. We take this trust very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                  </p>
                </section>

                <section id="data-collection">
                  <h2>2. Data We Collect</h2>
                  <p>
                    We collect personal information that you voluntarily provide to us when registering on MindBook, expressing an interest in obtaining information about us or our products and services, when participating in activities on our platform, or otherwise contacting us.
                  </p>
                  <ul>
                    <li>
                      <strong>Personal Identifiers:</strong> Name, username, email address, password, profile picture, social accounts.
                    </li>
                    <li>
                      <strong>User Generated Content:</strong> Posts, stories, comments, articles, gaming scores, shop details, and interactions.
                    </li>
                    <li>
                      <strong>Device & Analytics:</strong> IP address, browser type, device characteristics, operating system, and system usage patterns.
                    </li>
                  </ul>
                </section>

                <section id="data-usage">
                  <h2>3. How We Use Data</h2>
                  <p>
                    We use personal information collected via our platform for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                  </p>
                  <p>
                    Specifically, your data helps us:
                  </p>
                  <ul>
                    <li>Facilitate account creation, authentication, and user secure login.</li>
                    <li>Personalize user feeds, suggest friends near you, and recommend gaming arcade content.</li>
                    <li>Manage interactive creator shops, social commerce transactions, and custom portfolios.</li>
                    <li>Deploy our artificial intelligence chatbot (MindBot) for real-time natural language answers.</li>
                  </ul>
                </section>

                <section id="cookies">
                  <h2>4. Cookies & Tracking</h2>
                  <p>
                    We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                  </p>
                  <p>
                    Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our platform.
                  </p>
                </section>

                <section id="gdpr">
                  <h2>5. GDPR & User Rights</h2>
                  <p>
                    If you are a resident in the European Economic Area (EEA), you have certain rights under applicable data protection laws. These may include the right:
                  </p>
                  <ol>
                    <li>To request access and obtain a copy of your personal information.</li>
                    <li>To request rectification or erasure of your accounts and user content.</li>
                    <li>To restrict or object to the processing of your personal data.</li>
                    <li>If applicable, to data portability.</li>
                  </ol>
                  <p>
                    To make such a request, please contact our support team or trigger deletion under Account Settings.
                  </p>
                </section>

                <section id="data-security">
                  <h2>6. Data Security</h2>
                  <p>
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                  </p>
                  <p>
                    Although we do our best to protect your personal information, transmission of personal information to and from our platform is at your own risk. You should only access our services within a secure environment.
                  </p>
                </section>

                <section id="updates">
                  <h2>7. Updates to Policy</h2>
                  <p>
                    We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
                  </p>
                  <p>
                    If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
                  </p>
                </section>

                <section id="contact">
                  <h2>8. Contact Information</h2>
                  <p>
                    If you have questions or comments about this policy, you may email us at <strong>privacy@mindbook.com</strong> or contact our developer Farman Ullah Ansari via his profile handles.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
