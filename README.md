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

## ✨ Core Features

- **24-Hour Stories:** Disappearing photo/video stories with full-screen viewer, auto-advancement, reactions, and threaded replies.
- **Infinite News Feed:** True infinite scrolling using `react-intersection-observer` with support for collaborative and time-capsule posts.
- **AI-Powered Social:** Smart Content Assistant (Gemini) for post enhancement, AI safety scanning, and automated reply suggestions.
- **Professional Suite:** Comprehensive portfolio builder with skill endorsements, certifications, and a full-featured job board for employers and candidates.
- **Secure Messaging:** Real-time 1-on-1 and group chats with rich media support, voice messages, and built-in WebRTC video calling.
- **Privacy & Safety:** Granular post audience controls, active login session management, and GDPR-compliant account data export.
- **Knowledge Hub:** Long-form article platform and micro-communities (channels) within groups for structured discussions.
- **Administrative Control:** Advanced admin dashboard with user management, content moderation queues, and system-wide analytics.
- **Progressive Web App:** Fully installable PWA with offline capabilities and a mobile-first responsive design.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, TypeScript, Redux Toolkit, Framer Motion.
- **Backend:** Node.js, Express, Mongoose (MongoDB), Socket.IO, Multer.
- **AI Integration:** Google Gemini Pro for smart content and safety.
- **Real-Time:** WebRTC for high-fidelity video/voice calling.
- **PWA:** Service Workers and Web Manifest for offline support.
- **Authentication:** JWT with secure session management and role-based access.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Configure `.env` (Port, Mongo URI, JWT Secret)
4. `npm run dev` (Runs on port 5000)

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on port 5173)

---

## 🎨 Design Philosophy
MindBook uses a "Gold Standard" design system. The primary palette revolves around:
- **Brand Primary:** `#F7B928` (Vibrant Yellow)
- **Brand Secondary:** `#FFD700`
- **Surface:** Modern solid card layouts with subtle drop shadows and full dark-mode support.

---

## 📜 License
Developed as a premium social media demonstration. All rights reserved.
