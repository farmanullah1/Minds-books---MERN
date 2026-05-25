<!--
  CodeDNA
  README.md — core functionality
  exports: none
  used_by: internal
  rules: Follow project conventions
  agent: gemini-3-1-pro | google | 2026-04-30 | init | Initialized CodeDNA semi mode
-->

# MindBook | Premier Social Space 🌟

MindBook is a high-fidelity, fully responsive social media platform. Designed with a vibrant Yellow/Gold aesthetic, it offers a familiar Facebook-like experience but with a unique visual identity and optimized for performance.

Built on the **MERN stack**, MindBook provides a robust set of features for community building, content sharing, and real-time interaction.

## ✨ Comprehensive Feature Ecosystem

MindBook is packed with a massive suite of features designed for engagement, creation, and professional growth.

### 🌐 Core Social & Engagement
- **Infinite News Feed:** True infinite scrolling with support for collaborative, time-capsule, and high-fidelity media posts.
- **24-Hour Stories:** Disappearing photo/video stories with full-screen viewer, reactions, and threaded replies.
- **Advanced Interactions:** Multi-reaction system (Like, Love, Haha, etc.), nested comment threads, and post-sharing.
- **Engagement Tools:** Anonymous questions, user highlights, and "Memories" to revisit past moments.

### 🎬 Video & Live Entertainment
- **Reels:** Dedicated short-form video feed with vertical scrolling and creator interactions.
- **Video Hub:** A centralized space for long-form video content, categorized playlists, and trending videos.
- **Live Streaming & Watch Parties:** Real-time synchronized video experiences for communities.

### 🤝 Community & Connection
- **Groups & Channels:** Robust community building with structured sub-channels for specific discussion topics.
- **Events & Meetups:** Full event management system with RSVPs, location maps, and calendar integration.
- **Real-Time Audio Rooms:** Drop-in audio conversations for immediate community interaction.
- **Gaming & Discovery:** Integrated gaming hub and local discovery tools to find nearby users and interests.

### 💰 Commerce & Monetization
- **Marketplace:** Comprehensive local buy/sell platform with product listings, categories, and direct seller messaging.
- **Digital Wallet:** Integrated wallet for managing credits, tracking transactions, and sending virtual gifts.
- **Fundraisers:** Built-in platform for community-driven financial support and charity initiatives.

### 🤖 AI-Powered Experience (Gemini Pro)
- **MindBot Assistant:** A sophisticated AI chatbot for platform guidance and general assistance.
- **Smart Content Engine:** AI-driven post enhancement, automated reply suggestions, and tone adjustment tools.
- **Safety Scanning:** Real-time AI scanning of content for toxicity and safety compliance.

### 💼 Professional & Creator Suite
- **Job Board:** A full-featured career portal for employers to post jobs and candidates to manage applications.
- **Creator Studio:** Advanced analytics and management tools for high-volume content creators.
- **Knowledge Hub:** Long-form article platform with markdown support and professional endorsements.

### 📞 Real-Time Communication
- **HD Video & Voice Calls:** Secure, low-latency WebRTC calls directly within the browser.
- **Rich Messaging:** Real-time 1-on-1 and group chats with file sharing, voice notes, and typing indicators.
- **PWA Capabilities:** Fully installable mobile-first experience with push notifications and offline support.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, TypeScript, Redux Toolkit, Framer Motion.
- **Backend:** Node.js, Express, Mongoose (MongoDB), Socket.IO, Multer.
- **AI Integration:** Google Gemini Pro for smart content and safety.
- **Real-Time:** WebRTC for high-fidelity video/voice calling.
- **PWA:** Service Workers and Web Manifest for offline support.
- **Authentication:** JWT with secure session management and role-based access.

---

## 🚀 Getting Started (Run in 3 Commands)

Boot up the full application and seed the database in just 3 commands:

```bash
# 1. Install all dependencies for both backend and frontend concurrently
npm install --prefix backend && npm install --prefix frontend

# 2. Seed the database with realistic demo accounts, posts, groups, and analytics
npm run seed --prefix backend

# 3. Start both backend and frontend development servers concurrently
npm run dev --prefix backend & npm run dev --prefix frontend
```

*The application will be available at `http://localhost:5173`.*

### 🔑 Demo Credentials
- **Admin Access:** `admin@mindbook.com` / `Admin@123456`
- **Creator Access:** `farman@mindbook.com` / `Password123`

---

## 🎨 Design & Performance
MindBook uses a premium "Gold Standard" design system. The primary palette revolves around:
- **Brand Primary:** `#F7B928` (Vibrant Yellow)
- **Brand Secondary:** `#FFD700`
- **Surface:** Glassmorphic translucent cards with active blur filters and smooth Framer Motion animations.

### ⚡ Lighthouse Metrics Target
- Performance: **≥80**
- Accessibility: **≥90**
- Best Practices: **≥90**
- SEO: **≥90**

---

## 📸 Feature Showcase

*(Insert UI Screenshots or GIF walkthroughs here)*
- Dashboard Analytics View
- Mobile Gesture Interactions (Pull to Refresh)
- Real-time Comments & Reels
- Dark Mode / Glassmorphism Login


## 👨‍💻 Developer & Attribution

MindBook was crafted with absolute attention to detail by **Farmanullah Ansari**.

- **Portfolio:** [farmanullah1.github.io/My-Portfolio](https://farmanullah1.github.io/My-Portfolio)
- **LinkedIn:** [linkedin.com/in/farmanullah-ansari](https://www.linkedin.com/in/farmanullah-ansari/)
- **GitHub:** [github.com/farmanullah1](https://github.com/farmanullah1)
- **Email:** [farmanullahansari999@gmail.com](mailto:farmanullahansari999@gmail.com)

## 📜 License
Developed as a premium social media demonstration. All rights reserved.
