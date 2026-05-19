import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './TermsOfService.css';

const TermsOfService: React.FC = () => {
  const sections = [
    { id: 'agreement', title: '1. Agreement to Terms' },
    { id: 'intellectual-property', title: '2. Intellectual Property Rights' },
    { id: 'user-representations', title: '3. User Representations' },
    { id: 'user-registration', title: '4. User Registration' },
    { id: 'prohibited-activities', title: '5. Prohibited Activities' },
    { id: 'user-generated', title: '6. User Generated Contributions' },
    { id: 'disclaimer', title: '7. Disclaimer & Liability' },
    { id: 'governing-law', title: '8. Governing Law' },
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
      <div className="app-layout" id="terms-page">
        <LeftSidebar />
        <main className="main-content">
          <div className="terms-container card">
            <div className="terms-header">
              <h1>Terms of Service</h1>
              <p className="terms-meta">Last Updated: May 19, 2026</p>
              <p className="terms-subtitle">
                Welcome to MindBook. Please read these Terms of Service carefully before accessing or using our services.
              </p>
            </div>

            <div className="terms-body-layout">
              {/* Table of Contents Sidebar */}
              <aside className="terms-toc">
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

              {/* Terms Content */}
              <div className="terms-content">
                <section id="agreement">
                  <h2>1. Agreement to Terms</h2>
                  <p>
                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and MindBook, concerning your access to and use of the platform.
                  </p>
                  <p>
                    By accessing or using our services, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service. If you do not agree with all of these terms, you are expressly prohibited from using the platform and must discontinue use immediately.
                  </p>
                </section>

                <section id="intellectual-property">
                  <h2>2. Intellectual Property Rights</h2>
                  <p>
                    Unless otherwise indicated, MindBook is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the platform (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
                  </p>
                  <p>
                    The Content and Marks are provided on the platform "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of MindBook and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                  </p>
                </section>

                <section id="user-representations">
                  <h2>3. User Representations</h2>
                  <p>
                    By using the platform, you represent and warrant that:
                  </p>
                  <ul>
                    <li>All registration information you submit will be true, accurate, current, and complete.</li>
                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                    <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                    <li>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the platform.</li>
                    <li>You will not access MindBook through automated or non-human means, whether through a bot, script or otherwise.</li>
                  </ul>
                </section>

                <section id="user-registration">
                  <h2>4. User Registration</h2>
                  <p>
                    You may be required to register with MindBook. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                  </p>
                </section>

                <section id="prohibited-activities">
                  <h2>5. Prohibited Activities</h2>
                  <p>
                    You may not access or use MindBook for any purpose other than that for which we make the platform available. The platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                  </p>
                  <p>
                    Prohibited activities include, but are not limited to:
                  </p>
                  <ul>
                    <li>Systematically retrieving data or other content from the platform to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the platform.</li>
                    <li>Use the platform in a manner inconsistent with any applicable laws or regulations.</li>
                  </ul>
                </section>

                <section id="user-generated">
                  <h2>6. User Generated Contributions</h2>
                  <p>
                    The platform may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the platform, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material.
                  </p>
                  <p>
                    Any contributions you transmit to the platform will be treated as non-confidential and non-proprietary.
                  </p>
                </section>

                <section id="disclaimer">
                  <h2>7. Disclaimer & Liability</h2>
                  <p>
                    THE PLATFORM IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE PLATFORM AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE PLATFORM AND YOUR USE THEREOF.
                  </p>
                  <p>
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
                  </p>
                </section>

                <section id="governing-law">
                  <h2>8. Governing Law</h2>
                  <p>
                    These conditions are governed by and construed in accordance with the laws of Pakistan, and the application of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded. If your habitual residence is in the EU, you additionally enjoy the protection afforded to you by mandatory provisions of the law of your country of residence.
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

export default TermsOfService;
