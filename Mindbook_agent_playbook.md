# MindBook – Antigravity Agent Prompt Playbook v4.0

> **Purpose:** This is the single source of truth for all development instructions for **MindBook** — a next-generation social media platform built on the MERN stack with a yellow `#F7B928` brand theme. Every section is a self-contained, executable prompt. To run any prompt, tell Antigravity: **"Run PROMPT-[ID]"** and the agent will execute it autonomously.
>
> **Critical Rule — Save Progress:** After **every** completed feature, step, component, route, model change, or bug fix, the agent **MUST** append a timestamped entry to `save_progress.md` in the project root. No exceptions. Format: `[ISO TIMESTAMP] PROMPT-XX — [Feature name]: [Brief description of what was done]`. This file is the live audit trail of all work completed. If `save_progress.md` does not exist, create it before writing any other file.
>
> **Last Updated:** 2026 | **Stack:** MongoDB · Express.js · React (Vite) · Node.js | **Brand Color:** `#F7B928`

---

## Table of Contents

| # | Section |
|---|---------|
| [Agent Rules](#core-agent-rules) | Must-read before executing any prompt |
| [Save Progress System](#save-progress-system) | How progress tracking works |
| [Design Tokens](#design-tokens--yellow-theme-critical--never-change) | Brand colors, typography, spacing |
| [PROMPT-01–20](#prompt-01--project-scaffold) | Core platform build |
| [PROMPT-21–28](#prompt-21--admin-dashboard) | Admin, AI, wallet, privacy |
| [PROMPT-29](#prompt-29--full-animation--3d-visual-interaction-system) | Animation & 3D system |
| [PROMPT-30](#prompt-30--linkedin-style-professional-features) | LinkedIn features |
| [PROMPT-31](#prompt-31--instagram-style-features) | Instagram features |
| [PROMPT-32](#prompt-32--youtube--netflix-style-watch-features) | YouTube/Netflix features |
| [PROMPT-33](#prompt-33--ai-chatbot--virtual-assistant) | AI Chatbot (MindBot) |
| [PROMPT-34](#prompt-34--complete-messaging-system-rebuild) | Full messaging + voice/video calls |
| [PROMPT-35](#prompt-35--settings-page--deep-dive) | Settings deep dive |
| [PROMPT-36](#prompt-36--groups-system--deep-dive) | Groups deep dive |
| [PROMPT-37](#prompt-37--friends-system--deep-dive) | Friends deep dive |
| [PROMPT-38](#prompt-38--notifications-system--deep-dive) | Notifications deep dive |
| [PROMPT-39](#prompt-39--search--discovery-system) | Search & Discovery |
| [PROMPT-40](#prompt-40--marketplace) | Marketplace |
| [PROMPT-41](#prompt-41--events-system) | Events system |
| [PROMPT-42](#prompt-42--memories--flashbacks) | Memories |
| [PROMPT-43](#prompt-43--live-streaming) | Live streaming |
| [PROMPT-44](#prompt-44--watch-party) | Watch party |
| [PROMPT-45](#prompt-45--fundraisers--donations) | Fundraisers |
| [PROMPT-46](#prompt-46--reels--short-video-feed) | Reels |
| [PROMPT-47](#prompt-47--explore--discover-page) | Explore/Discover |
| [PROMPT-48](#prompt-48--complete-error-audit--production-hardening) | Final audit |
| [PROMPT-49](#prompt-49--unified-video-hub-with-youtube-integration) | 🆕 Video Hub + YouTube Integration |
| [PROMPT-50](#prompt-50--pixel-perfect-facebook-parity--ui-completeness) | 🆕 Facebook parity polish |
| [PROMPT-51](#prompt-51--creator-studio--monetization-hub) | 🆕 Creator Studio |
| [PROMPT-52](#prompt-52--audio-rooms--podcasts--spaces) | 🆕 Audio Rooms / Spaces |
| [PROMPT-53](#prompt-53--maps--location-features) | 🆕 Maps & Check-ins |
| [PROMPT-54](#prompt-54--gaming--interactive-features) | 🆕 Games & Challenges |
| [PROMPT-55](#prompt-55--advanced-accessibility--i18n) | 🆕 Accessibility & i18n |
| [PROMPT-56](#prompt-56--social-commerce--shops) | 🆕 MindBook Shops |
| [PROMPT-57](#prompt-57--advanced-post-composer) | 🆕 Rich Post Composer |
| [PROMPT-58](#prompt-58--complete-mobile-experience) | 🆕 Mobile-first polish |
| [PROMPT-59](#prompt-59--analytics-dashboard-for-creators) | 🆕 Creator Analytics |
| [PROMPT-60](#prompt-60--final-launch-readiness) | 🆕 Launch readiness |
| [Section A–H](#section-a-administrative-dashboard--control-system) | Advanced feature sections |
| [Agent Notes](#notes-for-antigravity-agents) | Critical reminders |

---

## Core Agent Rules

1. **Read this entire playbook before writing any code.**
2. **Create `save_progress.md` immediately if it does not exist.**
3. **Read existing `save_progress.md`** to understand what has already been completed. Never redo completed work.
4. **Perform a delta analysis** — identify exactly which new features, UI changes, or improvements have not yet been implemented.
5. **Only implement new content for new features.** If a feature exists, improve it.
6. **After EVERY completed feature, step, component, model change, or route, append a timestamped log entry to `save_progress.md`.**
7. **After completing any prompt, always run PROMPT-07** to verify no new errors were introduced.
8. **Never change the yellow brand color `#F7B928` to any other color.**
9. **All file uploads must go through authenticated routes** (JWT required).
10. **All admin routes must verify `user.role === 'admin'` server-side.**
11. **Update `README.md`** to reflect all new features after every major prompt.
12. Commit message format: `"Feature update: [brief description]"`
13. **Never remove any existing feature.** If a feature is broken, fix it. Do not delete it.
14. **All API keys (YouTube, Giphy, Anthropic, Stripe, etc.) must be stored in `.env`** — never hardcoded.

---

## Save Progress System

The agent must maintain `save_progress.md` in the project root at all times.

### `save_progress.md` Format

```markdown
# MindBook — Save Progress Log
> Auto-generated by Antigravity Agent. Do not edit manually.

## [2026-01-15T14:32:00Z] — PROMPT-01: Project Scaffold
**Status:** Completed
**Files Modified:**
- backend/server.js — Created Express server with middleware
- backend/models/User.js — Created User schema
- frontend/src/App.jsx — Created root component with routing
**Summary:** Full MERN project scaffold created. Backend running on port 5000, frontend on 5173. MongoDB connected to mindbook database.
**Notes:** None
---
```

### When to Save — Every Single One of These
- After scaffold or project setup
- After every individual feature within a prompt
- After every bug fix (even small ones)
- After every UI component is built
- After every database model is created or modified
- After every API endpoint is added
- After every npm package is installed
- After every CSS file or style addition
- At the very end of every prompt regardless of completion state

---

## Design Tokens — Yellow Theme (CRITICAL — Never Change)

```css
:root {
  /* ─── Brand ─────────────────────────────────────── */
  --brand-primary:              #F7B928;
  --brand-primary-hover:        #E4A11B;
  --brand-primary-active:       #C98A10;
  --brand-primary-light:        rgba(247, 185, 40, 0.12);
  --brand-primary-lighter:      rgba(247, 185, 40, 0.06);
  --brand-gradient:             linear-gradient(135deg, #F7B928 0%, #FFD700 50%, #F7B928 100%);
  --brand-gradient-animated:    linear-gradient(270deg, #F7B928, #FFD700, #FFEC8B, #F7B928);
  --brand-gradient-vertical:    linear-gradient(180deg, #FFD700 0%, #F7B928 100%);
  --brand-glow:                 0 0 20px rgba(247, 185, 40, 0.40);
  --brand-glow-strong:          0 0 40px rgba(247, 185, 40, 0.60);
  --brand-shadow:               0 4px 24px rgba(247, 185, 40, 0.30);

  /* ─── Backgrounds ───────────────────────────────── */
  --main-background:            #ffffff;
  --bg-body:                    #f0f2f5;
  --bg-card:                    #ffffff;
  --bg-card-hover:              #f7f8fa;
  --bg-input:                   #f0f2f5;
  --bg-overlay:                 rgba(0, 0, 0, 0.65);
  --bg-overlay-light:           rgba(0, 0, 0, 0.30);
  --bg-sidebar:                 #ffffff;
  --bg-navbar:                  #ffffff;
  --bg-modal:                   #ffffff;
  --bg-dropdown:                #ffffff;
  --bg-tooltip:                 #1c1e21;
  --bg-code:                    #f0f2f5;

  /* ─── Text ──────────────────────────────────────── */
  --text-primary:               #050505;
  --text-secondary:             #65676b;
  --text-muted:                 #8a8d91;
  --text-placeholder:           #b0b3b8;
  --text-inverse:               #ffffff;
  --text-link:                  #D99A1C;
  --text-link-hover:            #C98A10;
  --text-code:                  #e41e3f;
  --text-on-brand:              #ffffff;

  /* ─── Borders ───────────────────────────────────── */
  --border-color:               #e4e6eb;
  --border-color-strong:        #ccd0d5;
  --border-color-muted:         #f0f2f5;
  --input-border-color:         #ced0d4;
  --input-border-focus:         #F7B928;
  --divider-color:              #e4e6eb;

  /* ─── Status ────────────────────────────────────── */
  --color-online:               #31a24c;
  --color-offline:              #b0b3b8;
  --color-away:                 #f7b928;
  --color-error:                #f02849;
  --color-error-bg:             #fff0f3;
  --color-warning:              #f7b928;
  --color-warning-bg:           #fffbe6;
  --color-success:              #45bd62;
  --color-success-bg:           #f0fff4;
  --color-info:                 #1877f2;
  --color-info-bg:              #f0f4ff;

  /* ─── Reactions ─────────────────────────────────── */
  --reaction-like:              #F7B928;
  --reaction-love:              #f33e58;
  --reaction-haha:              #f7b928;
  --reaction-wow:               #f7b928;
  --reaction-sad:               #f7b928;
  --reaction-angry:             #e9710f;

  /* ─── Shadows ───────────────────────────────────── */
  --shadow-xs:  0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.08);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.16);
  --shadow-xl:  0 16px 48px rgba(0,0,0,0.20);
  --shadow-2xl: 0 24px 64px rgba(0,0,0,0.24);
  --shadow-inset: inset 0 1px 3px rgba(0,0,0,0.08);
  --shadow-card: 0 1px 2px rgba(0,0,0,0.10);
  --shadow-card-hover: 0 4px 16px rgba(0,0,0,0.16);
  --shadow-navbar: 0 2px 4px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04);

  /* ─── Border Radius ─────────────────────────────── */
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   20px;
  --radius-2xl:  24px;
  --radius-3xl:  32px;
  --radius-full: 9999px;

  /* ─── Transitions (GPU-safe) ────────────────────── */
  --transition-instant:  80ms  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-fast:     150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-normal:   250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-slow:     400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-spring:   450ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-bounce:   550ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --transition-elastic:  700ms cubic-bezier(0.68, -0.6, 0.32, 1.6);

  /* ─── Z-index Scale ─────────────────────────────── */
  --z-below:    -1;
  --z-base:      1;
  --z-raised:   10;
  --z-dropdown: 50;
  --z-sticky:   100;
  --z-fixed:    150;
  --z-overlay:  200;
  --z-modal:    300;
  --z-popover:  350;
  --z-toast:    400;
  --z-tooltip:  450;
  --z-cursor:   500;

  /* ─── Spacing Scale ─────────────────────────────── */
  --space-0:  0px;    --space-1:   4px;   --space-2:   8px;
  --space-3: 12px;    --space-4:  16px;   --space-5:  20px;
  --space-6: 24px;    --space-8:  32px;   --space-10: 40px;
  --space-12: 48px;   --space-16: 64px;   --space-20: 80px;
  --space-24: 96px;   --space-32: 128px;

  /* ─── Typography ────────────────────────────────── */
  --font-family:          'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-family-heading:  'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-family-mono:     'JetBrains Mono', 'Fira Code', monospace;
  --font-size-xs:    11px;
  --font-size-sm:    12px;
  --font-size-base:  15px;
  --font-size-md:    16px;
  --font-size-lg:    18px;
  --font-size-xl:    20px;
  --font-size-2xl:   24px;
  --font-size-3xl:   28px;
  --font-size-4xl:   32px;
  --font-size-5xl:   40px;
  --font-weight-normal:   400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;
  --font-weight-black:    900;
  --line-height:       1.5;
  --line-height-tight: 1.25;
  --line-height-loose: 1.75;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide:  0.025em;

  /* ─── Layout ────────────────────────────────────── */
  --navbar-height:        60px;
  --sidebar-left-width:   280px;
  --sidebar-right-width:  320px;
  --content-max-width:    680px;
  --page-max-width:       1400px;
  --bottom-nav-height:    56px;
}

/* ─── Dark Mode ─────────────────────────────────────── */
body.dark {
  --main-background:       #18191a;
  --bg-body:               #18191a;
  --bg-card:               #242526;
  --bg-card-hover:         #3a3b3c;
  --bg-input:              #3a3b3c;
  --bg-sidebar:            #242526;
  --bg-navbar:             #242526;
  --bg-modal:              #242526;
  --bg-dropdown:           #3a3b3c;
  --bg-code:               #3a3b3c;
  --text-primary:          #e4e6eb;
  --text-secondary:        #b0b3b8;
  --text-muted:            #8a8d91;
  --text-placeholder:      #606770;
  --border-color:          #3e4042;
  --border-color-strong:   #4e5055;
  --border-color-muted:    #3a3b3c;
  --divider-color:         #3e4042;
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.50);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.60);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.70);
  --shadow-card: 0 1px 2px rgba(0,0,0,0.40);
  --shadow-card-hover: 0 4px 16px rgba(0,0,0,0.60);
  --bg-body-rgb: 24, 25, 26;
}

/* ─── High Contrast Mode ────────────────────────────── */
body.high-contrast {
  --border-color: #000000;
  --text-secondary: #000000;
  --bg-input: #ffffff;
}

/* ─── Typography setup ──────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

html { font-size: 15px; }
html[data-font-size="small"]  { font-size: 13px; }
html[data-font-size="large"]  { font-size: 17px; }
html[data-font-size="xlarge"] { font-size: 19px; }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-family); color: var(--text-primary); background: var(--bg-body); overflow-x: hidden; line-height: var(--line-height); -webkit-font-smoothing: antialiased; }

/* ─── Primary Button Standard ───────────────────────── */
.btn-primary {
  background: var(--brand-primary);
  color: var(--text-on-brand);
  border: none;
  border-radius: var(--radius-full);
  padding: 8px 16px;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-spring), box-shadow var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.btn-primary:hover  { background: var(--brand-primary-hover); transform: scale(1.02); box-shadow: var(--brand-shadow); }
.btn-primary:active { background: var(--brand-primary-active); transform: scale(0.98); }
.btn-primary:focus-visible { outline: 3px solid var(--brand-primary); outline-offset: 3px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## PROMPT-01 — Project Scaffold

**Trigger:** `Run PROMPT-01`

Build a web application called **MindBook** — a functional Facebook clone with yellow `#F7B928` brand theme.

### Architecture

```
MindBook/
├── backend/
│   ├── config/           db.js, cloudinary.js
│   ├── controllers/      auth, users, posts, messages, groups, stories, notifications, admin, ai, videos, marketplace, events, fundraisers, jobs, articles, reels
│   ├── middleware/       auth.js, upload.js, rateLimiter.js, adminOnly.js, errorHandler.js, validate.js
│   ├── models/           User, Post, Comment, Conversation, Message, Group, GroupPost, Story, Notification, Report, Announcement, Wallet, Transaction, Job, Article, Reel, Video, MarketplaceListing, Event, Fundraiser, CallLog, WatchProgress, Playlist, LiveStream
│   ├── routes/           (mirrors controllers)
│   ├── services/         ai.js, email.js, notification.js, trending.js, coins.js
│   ├── sockets/          messageSocket.js, callSocket.js, notificationSocket.js, liveSocket.js, watchPartySocket.js
│   ├── uploads/          (local storage for dev)
│   ├── utils/            helpers.js, validators.js, constants.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/           favicon.svg, favicon-32.png, favicon-16.png, apple-touch-icon.png, manifest.json, robots.txt, fonts/
│   └── src/
│       ├── animations/   variants.js, springs.js, hooks/useScrollReveal.js, hooks/useParallax.js
│       ├── assets/       icons/, illustrations/, lottie/, 3d-models/
│       ├── components/   (all shared components — see component list below)
│       ├── context/      AuthContext, ThemeContext, SocketContext, NotificationContext, CallContext
│       ├── hooks/        useAuth, useSocket, useInfiniteScroll, useWebRTC, useMediaQuery, useDebounce, useThrottle, useLocalStorage, usePrevious
│       ├── pages/        (all pages — see page list below)
│       ├── services/     api.js, socket.js, webrtc.js, youtube.js
│       ├── store/        (Zustand slices: auth, ui, notifications, calls)
│       └── styles/       globals.css, animations.css, skeleton.css, reset.css
│   └── package.json
├── save_progress.md      ← Agent must maintain this
└── README.md
```

### Backend `.env` Template

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/mindbook

# Auth
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# Admin
ADMIN_EMAIL=admin@mindbook.com

# AI (Anthropic Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key

# YouTube Data API v3
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# Giphy API
GIPHY_API_KEY=your_giphy_api_key

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@mindbook.com

# Storage (local for dev, Cloudinary for prod)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Stripe (payments — scaffold)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Push Notifications (VAPID)
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_EMAIL=mailto:admin@mindbook.com
```

**Save Progress:** Create `save_progress.md`, then append entry after scaffold is complete.

---

## PROMPT-02 — Add Features & Fix All Existing Ones

**Trigger:** `Run PROMPT-02`

Improve MindBook by adding more features. Ensure all existing and new features are fully functional. Provide updated code and a brief explanation of features added and fixes made. **Save Progress** after each feature.

---

## PROMPT-03 — SEO, Favicon & Site-Wide Polish

**Trigger:** `Run PROMPT-03`

1. **SEO** — Meta tags: description, keywords, viewport, Open Graph (title, description, image, url), Twitter Card, canonical URL. Semantic HTML5 throughout (`<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`). Schema.org JSON-LD for SocialNetworkingService.
2. **Favicon** — SVG favicon (scales to any size), PNG fallbacks 16×16 / 32×32 / 180×180 / 512×512. Yellow 'M' rounded rectangle matching Facebook's 'F' design language.
3. **Open Graph image** — 1200×630px preview image for social sharing.
4. **Performance** — Preload critical fonts, preconnect to Google Fonts, `<link rel="dns-prefetch">` for API domains.
5. **Error check** — Broken UI, JS errors, backend failures, console warnings, 404s.
6. **Fix all errors** — Corrected code with explanation.

**Save Progress:** After each improvement, append to `save_progress.md`.

---

## PROMPT-04 — Full User Profile Management System

**Trigger:** `Run PROMPT-04`

### View Profile (`/profile/:id`)

**Profile Header:**
- Cover photo (820×312px, parallax effect on scroll — background-attachment: fixed with IntersectionObserver correction on mobile)
- Profile picture (168px on desktop, 96px on mobile) — circular, overlaps cover bottom by 50%, golden ring border for verified users
- Name (bold, 24px) + verified badge (✓ yellow)
- Bio (max 150 chars, rendered with line breaks + clickable links)
- Location icon + city/country
- Work icon + current job title at company
- Education icon + school
- Joined date ("Joined January 2025")
- Website link (clickable, opens in new tab)
- Friend count (clickable → friends list) · Following count · Followers count
- Action buttons (changes based on relationship):
  - Own profile: "Edit Profile" + "View as" (preview how public sees it)
  - Friend: "Message" (yellow) + "Friends ▾" (dropdown: Unfriend / Unfollow / Snooze)
  - Not friend / following: "Add Friend" (yellow) + "Follow" + "Message"
  - Friend request sent: "Pending ▾" (dropdown: Cancel Request)
  - Incoming request: "Confirm" (yellow) + "Delete"

**Profile Tabs (sticky when scrolling):**
Posts · About · Friends · Photos · Videos · Reels · Portfolio · More ▾

**About Tab sections:** Overview · Work & Education · Places Lived · Contact & Basic Info · Family & Relationships · Details About You · Life Events.

**Posts Tab:** Create post (if own profile) + post feed (owner sees all, others see based on privacy).

**Photos Tab:** Masonry grid of all photos. Albums: Profile Pictures / Cover Photos / Posts / Tagged. Click → lightbox (left/right navigate, download, tag friend, delete if own).

**Friends Tab:** 9-card preview (3×3 grid). "See all friends" → full paginated list with search + sort.

### Extended User Schema

```javascript
const userSchema = new mongoose.Schema({
  // ─── Identity ───────────────────────────────────
  name:             { type: String, required: true, trim: true },
  firstName:        String,
  lastName:         String,
  username:         { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:         { type: String, required: true, minlength: 8 },
  role:             { type: String, enum: ['user','moderator','admin'], default: 'user' },

  // ─── Profile Media ──────────────────────────────
  profilePicture:   { type: String, default: '/uploads/defaults/avatar.png' },
  coverPhoto:       { type: String, default: '/uploads/defaults/cover.jpg' },
  profileFrame:     String,

  // ─── Profile Info ───────────────────────────────
  bio:              { type: String, maxlength: 150 },
  pronouns:         String,
  location:         { city: String, country: String, coordinates: { lat: Number, lng: Number } },
  website:          String,
  dateOfBirth:      Date,
  gender:           { type: String, enum: ['Male','Female','Non-binary','Prefer not to say','Custom'] },
  genderCustom:     String,
  relationshipStatus: String,

  // ─── Professional ───────────────────────────────
  work: [{
    title: String, company: String, companyLogo: String,
    description: String, location: String,
    startYear: Number, startMonth: Number,
    endYear: Number, endMonth: Number,
    isCurrent: Boolean, skills: [String]
  }],
  education: [{
    school: String, degree: String, field: String,
    description: String, activities: String,
    startYear: Number, endYear: Number, isCurrent: Boolean
  }],
  skills: [{
    name: String,
    endorsedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  openToWork:       { type: Boolean, default: false },
  openToWorkDetails: { roles: [String], jobTypes: [String], locations: [String] },

  // ─── Portfolio Links ────────────────────────────
  links: {
    portfolio: String, github: String, linkedin: String,
    instagram: String, twitter: String, behance: String,
    medium: String, youtube: String, tiktok: String, website: String
  },
  linkedInProfile:  { id: String, accessToken: String, profileUrl: String, connectedAt: Date },

  // ─── Social Graph ───────────────────────────────
  friends:          [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: {
    sent:     [{ user: ObjectId, sentAt: Date }],
    received: [{ user: ObjectId, receivedAt: Date }]
  },
  followers:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  closeFriends:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  mutedUsers:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // ─── Content ────────────────────────────────────
  savedPosts:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  pinnedPost:       { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  lifeEvents:       [{ title: String, date: Date, icon: String, description: String }],

  // ─── Coins & Economy ────────────────────────────
  coins:            { type: Number, default: 0 },
  totalCoinsEarned: { type: Number, default: 0 },
  badges:           [{ name: String, icon: String, earnedAt: Date }],
  achievements:     [{ id: String, completedAt: Date }],
  creatorLevel:     { type: String, enum: ['none','rising','creator','star','elite'], default: 'none' },
  followersCount:   { type: Number, default: 0 },

  // ─── Status ─────────────────────────────────────
  isVerified:       { type: Boolean, default: false },
  isActive:         { type: Boolean, default: true },
  isSuspended:      { type: Boolean, default: false },
  suspendedUntil:   Date,
  suspensionReason: String,
  lastActive:       Date,
  onlineStatus:     { type: String, enum: ['online','away','offline','dnd'], default: 'offline' },

  // ─── Privacy ────────────────────────────────────
  privacySettings: {
    whoCanSeeMyPosts:           { type: String, default: 'friends' },
    whoCanSeeMyFriends:         { type: String, default: 'friends' },
    whoCanSeeMyPhotos:          { type: String, default: 'friends' },
    whoCanSeeMyBirthday:        { type: String, default: 'friends' },
    whoCanSeeMyEmail:           { type: String, default: 'me' },
    whoCanSeeMyPhone:           { type: String, default: 'me' },
    whoCanSeeMyWorkHistory:     { type: String, default: 'friends' },
    whoCanSeeMyEducation:       { type: String, default: 'public' },
    whoCanSeeMyLocation:        { type: String, default: 'friends' },
    whoCanSendFriendRequests:   { type: String, default: 'everyone' },
    whoCanMessage:              { type: String, default: 'friends' },
    whoCanTagMe:                { type: String, default: 'friends' },
    searchEngineIndexing:       { type: Boolean, default: true },
    lookupByEmail:              { type: Boolean, default: true },
    lookupByPhone:              { type: Boolean, default: false }
  },
  customLists: [{
    name: String, users: [{ type: ObjectId, ref: 'User' }], createdAt: Date
  }],

  // ─── Notifications ──────────────────────────────
  notificationSettings: {
    messages: Boolean, friendRequests: Boolean, postLikes: Boolean,
    postComments: Boolean, storyReplies: Boolean, groupInvites: Boolean,
    groupPosts: Boolean, eventReminders: Boolean, birthdays: Boolean,
    memories: Boolean, jobMatches: Boolean, coinEarned: Boolean,
    mentions: Boolean, emailNotifs: Boolean, pushNotifs: Boolean,
    soundEnabled: Boolean, emailFrequency: { type: String, default: 'immediate' }
  },

  // ─── Wellness ───────────────────────────────────
  dailyTimeLimit:   Number,
  bedtimeMode:      { enabled: Boolean, startHour: Number, endHour: Number },
  focusMode:        { type: Boolean, default: false },
  moodHistory:      [{ mood: String, emoji: String, date: Date }],

  // ─── Security ───────────────────────────────────
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret:  String,
  backupCodes:      [String],
  trustedDevices:   [{ deviceId: String, name: String, addedAt: Date }],
  loginHistory:     [{ ip: String, device: String, browser: String, location: String, at: Date, success: Boolean }],

  // ─── Appearance ─────────────────────────────────
  theme:            { type: String, enum: ['light','dark','system'], default: 'system' },
  fontSize:         { type: String, enum: ['small','default','large','xlarge'], default: 'default' },
  compactMode:      { type: Boolean, default: false },
  animationsEnabled:{ type: String, enum: ['full','reduced','none'], default: 'full' },

  // ─── Watch / Video ──────────────────────────────
  watchHistory:     [{ videoId: String, source: String, watchedAt: Date, progress: Number }],
  watchLater:       [{ videoId: String, source: String, addedAt: Date }],
  subscribedChannels: [{ type: ObjectId, ref: 'User' }],

  // ─── Data Requests ──────────────────────────────
  dataExportRequests: [{ requestedAt: Date, status: String, downloadUrl: String, expiresAt: Date }],

}, { timestamps: true });

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ name: 'text', bio: 'text' });
userSchema.index({ 'location.city': 1, 'location.country': 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastActive: -1 });
userSchema.index({ isActive: 1, isSuspended: 1 });
```

**Save Progress:** After User model, each route, and each component, append to `save_progress.md`.

---

## PROMPT-05 — Progressive Facebook-Like Feature Roadmap

**Trigger:** `Run PROMPT-05`

Implement in priority order, with full frontend + backend code for each. Save after each feature.

1. **Friend Requests** — Send, accept, decline, cancel; pending requests; mutual friend display
2. **Notifications** — Socket.IO real-time + REST polling fallback
3. **Post Interactions** — Like/unlike with 6 reactions, comment, delete, nested replies (3 levels)
4. **Image/Video Uploads** — Multi-file, sharp compression, WebP conversion, thumbnail generation
5. **Stories** — 24-hour TTL, circular progress ring, reactions, replies
6. **Groups** — Full CRUD, roles, privacy levels
7. **Events** — Create, RSVP, calendar view
8. **Messaging / Chat** — Socket.IO, media sharing, read receipts
9. **Search** — Full-text MongoDB indexes, suggestions, autocomplete
10. **News Feed Algorithm** — Weighted scoring with friend/recency/engagement factors

---

## PROMPT-06 — Stories Section: Full Improvement

**Trigger:** `Run PROMPT-06`

### Story Tray
- Horizontal scroll row below navbar (story circles)
- Own story first (with + add button or edit if stories exist)
- Each circle: avatar (ring color: yellow = unseen stories, gray = all seen, green = close friends only)
- Unseen count badge on circle
- Momentum-based horizontal scroll (CSS scroll-snap + JavaScript velocity tracking)
- Left/right arrow buttons for desktop (fade in on hover)

### Story Viewer
- Full-screen overlay (`position: fixed; inset: 0; z-index: var(--z-modal); background: #000`)
- Top progress bar — multiple segments, one per story, animated `stroke-dashoffset` SVG or CSS width
- Auto-advance after 5s, pause on press-and-hold (mobile) / mouse-down (desktop)
- Tap left half → previous story/slide; tap right half → next
- Swipe left/right → navigate between users' stories
- Keyboard: ArrowLeft / ArrowRight / Space (pause) / Escape (close)
- Story content: image (with Ken Burns zoom animation) or video (native `<video>`)
- Bottom toolbar: Reply input ("Send message" → goes to DM) + React bar (❤️ 😂 😮 😢 😡 👍) + Share button + ··· (Report / Mute / Save image)
- Creator info top-left: avatar + name + "X hours ago" + privacy icon
- Viewed-by list (own stories): avatars of viewers with emoji reaction shown

### Story Creation
- Click own story ring → bottom sheet / modal:
  - **Photo story:** Upload image → enter edit mode: add text, stickers, GIF sticker, drawing, hashtag sticker, "Add Yours" sticker, "Ask Me" question box sticker, mention sticker (@username), location sticker
  - **Video story:** Upload or record (max 60s)
  - **Text story:** Full-screen color background + text (background: solid color or gradient — color picker)
  - **Boomerang:** Record 2s loop video
- Caption field + audience selector (Everyone / Friends / Close Friends / Custom)
- "Post to Story" → success toast + redirects to story viewer showing your new story
- Preview before posting with "Post" + "Discard" buttons

### Story Model (TTL: 24 hours)

```javascript
{
  creator: ObjectId, mediaUrl: String, mediaType: String,
  thumbnailUrl: String, textContent: String, textStyle: Object,
  backgroundColor: String, backgroundGradient: String,
  stickers: [{ type: String, content: String, position: Object, size: Number }],
  audience: String, caption: String,
  views:     [{ user: ObjectId, viewedAt: Date }],
  reactions: [{ user: ObjectId, emoji: String, createdAt: Date }],
  replies:   [{ user: ObjectId, message: String, createdAt: Date }],
  allowReplies: Boolean, allowReactions: Boolean,
  expiresAt: Date, // TTL index
  createdAt: Date
}
```

**Save Progress:** After story tray, viewer, creation, and model, append to `save_progress.md`.

---

## PROMPT-07 — Error Check & Fix

**Trigger:** `Run PROMPT-07`

**Checklist:**
1. Scan all backend routes for missing try/catch
2. Scan all frontend useEffect hooks for missing cleanup
3. Check all `useState` + `useEffect` dependency arrays
4. Verify all socket rooms are cleaned up on disconnect
5. Check all Multer routes for MIME validation
6. Verify JWT middleware on all protected routes
7. Check all API calls have loading states + error handling
8. Verify no hardcoded colors anywhere
9. Test all forms for validation
10. Run Lighthouse audit — target: Performance ≥80, Accessibility ≥90, SEO ≥90
11. Check mobile responsiveness at 375px / 414px / 768px
12. Verify dark mode on every page and component

**Save Progress:** Append all fixes and test results to `save_progress.md`.

---

## PROMPT-08 — README, SEO, Favicon, Logo & Branding

**Trigger:** `Run PROMPT-08`

### README.md Content
- Project description + screenshot
- Feature list (bulleted, comprehensive)
- Tech stack table
- Prerequisites (Node ≥18, MongoDB, npm ≥9)
- Installation (step by step)
- `.env` setup guide
- Run locally (concurrently or separate terminals)
- Build for production
- API documentation link
- Contributing guide
- License (MIT)

### SVG Favicon / Logo
```svg
<!-- MindBook 'M' logo — yellow on white, rounded rectangle -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#F7B928"/>
  <path d="M20 75V35l30 22.5L80 35v40H68V55l-18 13.5L32 55v20H20z" fill="white"/>
</svg>
```

**Save Progress:** After README, SEO, and favicon, append to `save_progress.md`.

---

## PROMPT-09 — Full Facebook-Like Home Page (News Feed)

**Trigger:** `Run PROMPT-09`

### Three-Column Layout

```
┌─────────────────────────────────────────────────────────┐
│  [NAVBAR — fixed, 60px height]                          │
├──────────────┬──────────────────────┬───────────────────┤
│ Left Sidebar │     Center Feed      │   Right Sidebar   │
│   280px      │       1fr            │     320px         │
│   sticky     │   overflow-y: scroll │    sticky         │
└──────────────┴──────────────────────┴───────────────────┘
```

### Left Sidebar (280px, sticky)

**User block:** Avatar + name → links to own profile.

**Navigation links (icon + label, hover yellow bg):**
- 🏠 Home (active: yellow icon)
- 👤 Profile
- 👥 Friends (badge for pending requests)
- 📺 Watch
- 🛒 Marketplace
- 🗓️ Events
- 🎮 Gaming
- 📰 News Feed
- 💼 Jobs
- 📝 Articles
- 🎵 Audio Rooms
- 📦 Your orders
- 💰 Fundraisers
- 🕐 Memories

**Shortcuts:** User's recent groups (with cover, name, unread dot).

**Footer:** Privacy · Terms · Cookies · Ads · More · © 2026 MindBook

### Center Feed (680px max-width, auto margin)

**Story Tray:** Horizontal scroll row. (see PROMPT-06)

**Reels Preview Row:** "Reels for you" — horizontal scroll of 4–5 reel thumbnails (play icon, duration, creator). "See all" → `/reels`.

**Video Hub Row:** "Videos" — horizontal scroll mixing MindBook + YouTube videos (source badge). "See all" → `/watch`.

**Create Post Card:** (see Post Creator spec below)

**Feed Posts:** Infinite scroll, IntersectionObserver, 10 posts per batch, skeleton loaders.

### Create Post Card

```
┌─────────────────────────────────────────────────────────┐
│ [Avatar]  [What's on your mind, [Name]? — gray, click]  │
├─────────────────────────────────────────────────────────┤
│ [📷 Photo/Video] [😊 Feeling]  [🏷️ Tag]  [📍 Location] │
└─────────────────────────────────────────────────────────┘
```

**Click to expand:** Full post composer modal (see PROMPT-57).

### Post Card Component (full spec)

**Header row:**
- Avatar (40px, click → profile)
- Name (bold, click → profile) · Timestamp (relative: "2 min", "3h", "Mon", "Jan 12") · Privacy icon
- "Follow" button (if not friends and not own post)
- "···" dropdown — own post: Edit / Delete / Pin to Profile / Turn off notifications / Embed; others: Follow/Unfollow / Save post / Report / Hide post / Block

**Content:**
- Text (linkified, hashtagged, @mentioned — each clickable)
- "See more" after 250 chars
- Image grid (1 image = full width; 2 = side by side; 3 = left full + right 2 stacked; 4 = 2×2; 5+ = 2×2 + "+N more" overlay)
- Video (with custom controls, auto-play muted when in viewport)
- YouTube embed (rendered within post, source badge "YouTube" top-right corner)
- Article link preview card (thumbnail + title + domain)
- Location chip (📍 City, Country)
- Feeling chip (😊 Feeling [emotion])
- Poll (if poll post)
- Tagged friends chip ("with [Name] and [N] others")

**Reaction bar (below content):**
- Reaction summary row: top 3 reaction emojis + total count (clickable → who reacted modal)
- Comment count + share count

**Action buttons:**
- 👍 Like — on hover: reaction picker floats up (6 reactions: Like ❤️ Love 😂 Haha 😮 Wow 😢 Sad 😡 Angry)
- 💬 Comment — click: expands comment section inline
- ➦ Share — click: share modal
- 🔖 Save — click: saved posts

**Comment Section (collapsible):**
- Sort: Most relevant / Newest first / All comments
- Comment input: avatar + input (auto-grow) + emoji button + image attachment + send (Enter or button)
- Comment card: avatar + name + comment bubble + relative time + Like ❤️ + Reply
- Nested replies: up to 3 levels, indented 24px each level, "See X replies" collapsed
- "Load more comments" button

### Right Sidebar (320px, sticky)

**Sponsored section** (placeholder — "Ads will appear here in a future update")

**Birthdays card:** 🎂 "[Name]'s birthday is today. Send a wish!" — yellow "Send Message" button.

**Friend Suggestions:** 5 cards — avatar + name + "X mutual friends" + "Add Friend" (yellow) + X button.

**Contacts (online friends):** Alphabetical, green dot for online, gray for offline. Search box. Each row: avatar + name + last-active time. Click → opens DM.

**Group Activity:** 3 recent group posts from joined groups — group name + post preview.

**Save Progress:** After each section (left sidebar, create post, feed posts, right sidebar), append to `save_progress.md`.

---

## PROMPT-10 — Full Messaging / Chat System Foundation

**Trigger:** `Run PROMPT-10`

*(Foundation layer — see PROMPT-34 for complete rebuild with voice/video calls and all advanced features. Do not skip PROMPT-34.)*

**Implement:** Conversation model, Message model, Socket.IO setup, basic chat list, basic chat window, message bubbles (text only), real-time delivery.

**Save Progress:** After every model, socket event, and component, append to `save_progress.md`.

---

## PROMPT-11 — Groups System + Rename to MindBook

**Trigger:** `Run PROMPT-11`

*(Full spec in PROMPT-36. This prompt creates the Group and GroupPost models, all API routes, and basic GroupsHome + GroupPage components. PROMPT-36 fills in all the deep detail.)*

**Rename:** Update "MindBook" everywhere: `<title>`, navbar logo, favicon `<meta name="application-name">`, README, footer, meta tags. Search for any remaining "Minds Books" strings and replace.

**Save Progress:** After models, routes, and each page component, append to `save_progress.md`.

---

## PROMPT-12 — Chat Suggestions & Message Button on Profiles

**Trigger:** `Run PROMPT-12`

*(Full spec from v3.0 playbook — implement as specified. Save after each component.)*

---

## PROMPT-13 — Stories Reactions, Rich Media Chat, Group Navbar, Friends

**Trigger:** `Run PROMPT-13`

*(Full spec from v3.0 playbook — implement all sub-features. Save after each.)*

---

## PROMPT-14 — Base Responsiveness & Dark Mode

**Trigger:** `Run PROMPT-14`

*(PROMPT-29 covers the full animation system. This prompt ensures base responsive breakpoints, dark mode, and CSS variable usage are complete across all existing components.)*

**Breakpoints:**

| Token | Value | Layout |
|-------|-------|--------|
| `--bp-xs`  | 480px  | Single column, bottom nav |
| `--bp-sm`  | 640px  | Single column, drawers |
| `--bp-md`  | 768px  | Single column |
| `--bp-lg`  | 1024px | Two columns (left sidebar + feed) |
| `--bp-xl`  | 1280px | Three columns (full) |
| `--bp-2xl` | 1400px | Three columns + centered |

**Mobile Bottom Navigation Bar (≤768px):**
```
[ 🏠 Home ] [ 👥 Friends ] [ 📺 Watch ] [ 💬 Messages ] [ 🔔 Notifs ]
```
Yellow active icon + yellow dot indicator.

**Save Progress:** After each breakpoint and dark mode pass, append to `save_progress.md`.

---

## PROMPT-15 — Full Code Analysis, Browser Testing & Error Fixing

**Trigger:** `Run PROMPT-15`

**Test matrix:** Chrome 120+ / Firefox 120+ / Safari 17+ / Edge 120+ / Chrome Android / Mobile Safari.

**Device testing:** 375px (iPhone SE) / 390px (iPhone 14) / 414px (iPhone Plus) / 768px (iPad) / 1024px (iPad Pro / small laptop) / 1440px (desktop) / 1920px (widescreen).

**Feature test checklist:**
- [ ] Register new account → email validation → password strength → submit
- [ ] Login → token stored → protected routes accessible
- [ ] Logout → token cleared → redirected to /login
- [ ] Profile view (own) → profile view (other user) → mutual friends shown
- [ ] Edit profile → save → changes reflected immediately
- [ ] Upload profile pic → upload cover photo → crop/position
- [ ] Create text post → create image post (4 images) → create video post
- [ ] Like post → reaction picker → all 6 reactions
- [ ] Comment → nested reply → delete comment
- [ ] Share post → all share options
- [ ] Create story (image + text) → view story → react → reply
- [ ] Send friend request → accept → appear in friends list
- [ ] Decline friend request → cancel sent request
- [ ] Send DM → receive in real-time → media message → voice message → emoji
- [ ] Video call → audio call → group call
- [ ] Create group → post in group → join/leave
- [ ] Create event → RSVP → add to calendar
- [ ] Search users → search posts → search groups
- [ ] Dark mode toggle → persists on refresh
- [ ] Mobile: bottom nav works → drawers open/close → swipe gestures

**Save Progress:** Append full test report to `save_progress.md`.

---

## PROMPT-16 — Fix Layout & Sidebar Overlap

**Trigger:** `Run PROMPT-16`

### App Layout CSS (apply globally)

```css
/* ─── App Layout Shell ──────────────────────────────── */
#root { min-height: 100vh; display: flex; flex-direction: column; }

.navbar-wrapper { position: fixed; top: 0; left: 0; right: 0; height: var(--navbar-height); z-index: var(--z-fixed); background: var(--bg-navbar); box-shadow: var(--shadow-navbar); }

.app-layout {
  display: grid;
  grid-template-areas: "sidebar feed rightbar";
  grid-template-columns: var(--sidebar-left-width) 1fr var(--sidebar-right-width);
  gap: var(--space-4);
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: calc(var(--navbar-height) + var(--space-4)) var(--space-4) var(--space-4);
  min-height: 100vh;
}

.left-sidebar {
  grid-area: sidebar;
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-4));
  height: calc(100vh - var(--navbar-height) - var(--space-8));
  overflow-y: auto;
  scrollbar-width: none;
  flex-shrink: 0;
}

.main-content { grid-area: feed; min-width: 0; overflow-x: hidden; }

.right-sidebar {
  grid-area: rightbar;
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-4));
  height: calc(100vh - var(--navbar-height) - var(--space-8));
  overflow-y: auto;
  scrollbar-width: none;
  flex-shrink: 0;
}

/* ─── Responsive ────────────────────────────────────── */
@media (max-width: 1279px) {
  .app-layout {
    grid-template-columns: 240px 1fr;
    grid-template-areas: "sidebar feed";
  }
  .right-sidebar { display: none; }
}

@media (max-width: 1023px) {
  .app-layout {
    grid-template-columns: 60px 1fr;
    grid-template-areas: "sidebar feed";
  }
  .left-sidebar { overflow: hidden; }
  .left-sidebar .nav-label { display: none; }
}

@media (max-width: 767px) {
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-areas: "feed";
    padding-bottom: calc(var(--bottom-nav-height) + var(--space-4));
  }
  .left-sidebar, .right-sidebar { display: none; }
}
```

**Remove:** ALL `position: absolute`, `float`, negative margins, hardcoded `margin-left`, `margin-right`, `width: calc(...)` hacks on feed.

**Critical CSS resets (add to globals.css):**
```css
*, *::before, *::after { box-sizing: border-box; }
body, html { margin: 0; padding: 0; overflow-x: hidden; width: 100%; }
img, video { max-width: 100%; height: auto; display: block; }
```

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-17 — Comprehensive Bug Fixes & UI Improvements

**Trigger:** `Run PROMPT-17`

Fix all 9 issues from v3.0 plus the following additions:

### Additional Improvements

**10. Post Composer Rich Text**
- Bold (Ctrl+B), Italic (Ctrl+I), Underline (Ctrl+U) in post text
- Emoji picker in post composer
- @mention autocomplete (shows friend list dropdown while typing @)
- #hashtag autocomplete (shows trending hashtags while typing #)
- Character counter (5000 max, turns red < 100 remaining)

**11. Reaction Picker Detail**
- Hover on Like button for 500ms → picker appears (Framer Motion, scale from 0.5 at origin)
- 6 emojis: 👍 ❤️ 😂 😮 😢 😡
- Each emoji has tooltip label (Like / Love / Haha / Wow / Sad / Angry)
- Hover emoji → 1.4× scale animation
- Click → reaction saved, button changes to selected reaction emoji + color
- Click same reaction again → unlike

**12. Post Image Grid**
- 1 image: max 680px wide, rounded corners
- 2 images: 50/50 split, no gap → rounded outer corners
- 3 images: 50% left + 25%/25% right stack
- 4 images: 2×2 grid
- 5+ images: first 4 shown, last has "+N" overlay, click → lightbox all

**13. Comment Improvements**
- Gif support in comments (Giphy picker)
- Like heart on each comment (count shown)
- Threaded replies (3 levels max)
- @mention in comments

**14. Skeleton Loaders (define shapes for every page)**
- Feed: 3× post skeleton (avatar circle + 3 lines + action bar)
- Chat list: 8× conversation skeleton
- Profile: header skeleton (cover rect + circle + 3 lines)
- Group cards: 6× card skeleton
- Notifications: 10× notification skeleton (circle + 2 lines)
- Search results: tab bar + 5× result skeleton

**15. Toast / Snackbar System**
- Position: bottom-left on desktop, top-center on mobile
- Types: success (green) / error (red) / warning (yellow) / info (blue) / default
- Auto-dismiss: 4s with progress bar
- Dismiss on click or swipe
- Stack: max 3 visible at once (older push down)
- Each toast: icon + message + optional "Undo" / "View" action link

**Save Progress:** After each improvement, append to `save_progress.md`.

---

## PROMPT-18 — Messenger UI Fixes, Discover Groups, Login/Signup

**Trigger:** `Run PROMPT-18`

*(Full spec from v3.0 playbook — implement all sub-items. Save after each page.)*

### Additional Login Page Detail

**Login page layout:**
- Centered card, max-width 420px, solid white background, `border-radius: var(--radius-2xl)`, `box-shadow: var(--shadow-xl)`
- Top: MindBook logo (SVG, 56px) + "MindBook" wordmark
- Tagline: "Connect with friends and the world around you."
- Input: Email or username — full border, focus glows yellow (`box-shadow: 0 0 0 3px var(--brand-primary-light)`)
- Input: Password — show/hide toggle (eye icon)
- "Remember me" checkbox + "Forgot password?" link (right-aligned)
- Login button: full-width, yellow, loading spinner on submit
- Divider: "— or —"
- "Create new account" button: full-width, outlined yellow
- Footer: "© 2026 MindBook · Privacy · Terms · Cookies"

**Forgot Password flow:**
`/forgot-password` → email input → submit → "Check your email" confirmation. Token expires 1 hour.
`/reset-password/:token` → new password + confirm → submit → redirect to login.

**Save Progress:** After each page redesign, append to `save_progress.md`.

---

## PROMPT-19 — Complete Media Sharing in Chat

**Trigger:** `Run PROMPT-19`

*(Full spec from v3.0 playbook. Save after backend route, each frontend component.)*

### Additional Detail: Upload Progress UI

```jsx
// MediaPreviewModal.jsx
// Shows before sending:
// - Thumbnail preview (image/video first frame)
// - File name + file size
// - Caption input
// - Send button → shows circular progress (0–100%)
// - Error state: "Upload failed. Try again."
```

### File Icons by Type

| MIME Type | Icon Color | Icon |
|-----------|-----------|------|
| PDF | Red | 📄 |
| Word (DOC/DOCX) | Blue | 📝 |
| Excel (XLS/XLSX) | Green | 📊 |
| PowerPoint | Orange | 📊 |
| ZIP/RAR | Yellow | 🗜️ |
| Text | Gray | 📃 |

**Save Progress:** After backend upload route, Multer config, each media component, append to `save_progress.md`.

---

## PROMPT-20 — Fix All Broken Media Messaging Features

**Trigger:** `Run PROMPT-20`

*(Full diagnostic + fix spec from v3.0 playbook. Save after each fix.)*

**Additional verifications:**
- [ ] Socket.IO reconnects automatically after network drop
- [ ] All media URLs use absolute paths or Vite proxy config
- [ ] `Content-Type: multipart/form-data` set correctly by axios
- [ ] File input accepts correct MIME types via `accept` attribute
- [ ] GIF picker API key loaded from env, not hardcoded
- [ ] Voice recorder checks `navigator.mediaDevices` availability before use
- [ ] All error messages displayed to user (no silent failures)

**Save Progress:** After each fix verified, append to `save_progress.md`.

---

## PROMPT-21 — Admin Dashboard

**Trigger:** `Run PROMPT-21`
*(Full spec in Section A — implement exactly as specified. Save after each sub-section A.1–A.6.)*

---

## PROMPT-22 — AI-Powered Features

**Trigger:** `Run PROMPT-22`
*(Full spec in Section B — implement exactly as specified. Save after each AI feature B.1–B.8.)*

---

## PROMPT-23 — Innovative Social Features

**Trigger:** `Run PROMPT-23`
*(Full spec in Section C — implement exactly as specified. Save after each feature C.1–C.10.)*

---

## PROMPT-24 — Wallet & Digital Economy

**Trigger:** `Run PROMPT-24`
*(Full spec in Section D — implement exactly as specified. Save after each economy feature.)*

---

## PROMPT-25 — Portfolio & Professional Networking

**Trigger:** `Run PROMPT-25`
*(Full spec in Section E + PROMPT-30 — implement exactly as specified. Save after each feature.)*

---

## PROMPT-26 — Advanced Privacy & Safety

**Trigger:** `Run PROMPT-26`
*(Full spec in Section F — implement exactly as specified. Save after each privacy feature.)*

---

## PROMPT-27 — Technical Improvements

**Trigger:** `Run PROMPT-27`
*(Full spec in Section G — implement exactly as specified. Save after each improvement.)*

---

## PROMPT-28 — LinkedIn & Portfolio Integration

**Trigger:** `Run PROMPT-28`
*(Full spec in Section H — implement exactly as specified. Save after LinkedIn OAuth and portfolio links.)*

---

---

## PROMPT-29 — Full Animation & 3D Visual Interaction System

**Trigger:** `Run PROMPT-29`

Build the complete animation and interaction layer. Every element should feel alive, purposeful, and smooth.

### Dependencies

```bash
npm install framer-motion @react-spring/web @react-three/fiber @react-three/drei three gsap @gsap/react lottie-react react-parallax-tilt @use-gesture/react react-intersection-observer react-use canvas-confetti
```

### A. Global Animation Foundation

**`src/animations/variants.js`** — Framer Motion shared variants:

```javascript
export const fadeUp      = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
export const fadeIn      = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
export const scaleIn     = { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 } };
export const slideRight  = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };
export const slideLeft   = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 } };
export const slideDown   = { initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };
export const popIn       = { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }, exit: { opacity: 0, scale: 0.5 } };
export const staggerContainer = (stagger = 0.06) => ({ animate: { transition: { staggerChildren: stagger } } });
export const blurFade    = { initial: { opacity: 0, filter: 'blur(8px)', y: 10 }, animate: { opacity: 1, filter: 'blur(0px)', y: 0 }, exit: { opacity: 0, filter: 'blur(4px)', y: -5 } };

export const pageTransition = {
  initial:  { opacity: 0, y: 14, filter: 'blur(6px)' },
  animate:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -8, filter: 'blur(2px)', transition: { duration: 0.22 } }
};

export const modalBackdrop = {
  initial:  { opacity: 0 },
  animate:  { opacity: 1, transition: { duration: 0.2 } },
  exit:     { opacity: 0, transition: { duration: 0.15 } }
};

export const modalContent = {
  initial:  { opacity: 0, scale: 0.92, y: 20 },
  animate:  { opacity: 1, scale: 1,    y: 0,  transition: { type: 'spring', stiffness: 280, damping: 26 } },
  exit:     { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.18 } }
};
```

**`src/animations/springs.js`** — React Spring configs:

```javascript
export const springs = {
  gentle:  { tension: 120, friction: 14 },
  wobbly:  { tension: 180, friction: 12 },
  stiff:   { tension: 210, friction: 20 },
  slow:    { tension: 280, friction: 60 },
  snap:    { tension: 400, friction: 28 },
  elastic: { tension: 200, friction: 8  }
};
```

**`useScrollReveal` hook:**
```javascript
import { useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (options = {}) => {
  const { threshold = 0.12, delay = 0, direction = 'up' } = options;
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  const offsets = { up: { from: 'translateY(28px)', to: 'translateY(0px)' }, left: { from: 'translateX(-28px)', to: 'translateX(0px)' }, right: { from: 'translateX(28px)', to: 'translateX(0px)' } };
  const { from, to } = offsets[direction] || offsets.up;
  const style = useSpring({ opacity: inView ? 1 : 0, transform: inView ? to : from, delay: inView ? delay : 0, config: { tension: 180, friction: 22 } });
  return { ref, style };
};
```

### B. Page Transitions

Wrap `<Routes>` in `<AnimatePresence mode="wait">`. Every page component:
```jsx
import { motion } from 'framer-motion';
import { pageTransition } from '../animations/variants';

export default function PageName() {
  return <motion.div {...pageTransition}> ... </motion.div>;
}
```

### C. Horizontal Scroll Sections

**`HorizontalScrollRow` component:**
```jsx
// Used for: story tray, reels row, video hub row, friend suggestions, group cards discover, events, trending topics
// Features: scroll snap, arrow buttons (fade in on hover), mouse drag, touch swipe, momentum scroll
// After scroll end: arrows update visibility based on scroll position

const HorizontalScrollRow = ({ children, title, seeAllLink }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  // Bind drag gesture with @use-gesture/react
  // Update arrows on scroll
  // Smooth scroll with requestAnimationFrame easing
};
```

**Apply to every horizontal row on the site** — story tray, reels, videos, friend suggestions, marketplace category row, event cards, group discover row, trending hashtags, explore sections, watch rows.

### D. 3D Tilt Cards

```jsx
// Apply to: PostCard, GroupCard, JobCard, ArticleCard, MarketplaceCard, EventCard, VideoCard
import Tilt from 'react-parallax-tilt';

<Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable tiltAngleXInitial={0}
      glareMaxOpacity={0.06} scale={1.015} transitionSpeed={500} perspective={1200}>
  <div className="card">...</div>
</Tilt>
```

Post cards: max tilt 4°, group cards: 6°, video cards: 5°.

### E. 3D Hero Scenes (Three.js)

Add animated 3D scenes to:

**Login / Register pages:**
```jsx
// Floating 3D MindBook 'M' logo
// Material: MeshStandardMaterial, color: #F7B928, metalness: 0.7, roughness: 0.25
// Float: speed 1.5, rotationIntensity 0.4, floatIntensity 0.6
// Background: particle field (1000 yellow/white dots, slow drift)
// Orbit: auto-rotate, no zoom, no pan
```

**404 Page:** Floating 3D speech bubble with "?" inside, bouncing with gravity simulation.

**Explore Page header:** Rotating 3D network graph (nodes connected by lines, nodes = user profile bubbles).

**Watch Page header:** 3D play button (▶️ geometry) rotating slowly in yellow metallic material.

**Marketplace hero:** Floating 3D shopping bag with yellow material.

**Empty state illustrations:** 3D ghost (no messages), 3D telescope (discover), 3D locked box (private group).

### F. Micro-Interactions (Every Element)

| Element | Animation | Implementation |
|---------|-----------|---------------|
| Like button click | Heart pops: 0→1.6→1 (spring) + 8 particle sparks (yellow) radiate outward, fade | Framer Motion + canvas-confetti |
| Send message button | Paper airplane flies to top-right, shrinks, fades | GSAP MotionPath |
| Add Friend | Morph: "Add Friend"→spinner→"✓ Friends" | Framer Motion layout animations |
| Notification bell | Swings 3× on new notification (CSS @keyframes) | CSS + JS class toggle |
| Story ring | SVG circle stroke-dashoffset countdown | React controlled SVG |
| Dark mode toggle | Sun rotates 360° out, moon rotates 360° in | Framer Motion rotate + opacity |
| Post create expand | Height expands with spring physics | Framer Motion height animation |
| Delete post card | Slides left + fades + gap closes | Framer Motion layout |
| Reaction picker | Emojis pop up with stagger (40ms each), each bounces | popIn variant + stagger |
| Coin earned | "+N 🪙" floats up from source + fades | Framer Motion custom animation |
| Online dot | Soft pulse: scale 1→1.35→1, 2.4s loop | CSS keyframe `pulse-dot` |
| Modal open | Scale 0.92→1 + fade + backdrop blur in | Framer Motion |
| Toast appear | Slide from right: x 100%→0 with spring | Framer Motion x animation |
| Comment submit | Checkmark SVG draws itself (stroke-dashoffset → 0) | CSS transition |
| Upload progress | Circular arc + percentage counter counts up | React controlled SVG + requestAnimationFrame |
| Follow button | "Follow"→"Following ✓" with color transition | Framer Motion color |
| Scroll to top | Floating button fades in at 300px scroll, click shoots to top | IntersectionObserver + Framer Motion |
| Image load | Blur-up: blurred placeholder → sharp image | CSS filter transition |
| Card hover | `translateY(-4px) + shadow deepens` | CSS transition |
| Button hover | `scale(1.03)` + glow | CSS transition |
| Avatar hover | Ring appears + scale(1.06) | CSS transition |
| Input focus | Border turns yellow + glow ring | CSS focus-within |
| Dropdown open | Scale + fade from origin point | Framer Motion |
| Page load progress | YouTube-style slim bar top (fixed) | GSAP |
| Sidebar item click | Ripple effect + background fill | CSS after pseudo-element animation |

### G. Skeleton Loaders (Full Specification)

```css
/* ─── Shimmer keyframe ───────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -100vw 0; }
  100% { background-position:  100vw 0; }
}

.skeleton-base {
  background: linear-gradient(90deg,
    var(--border-color) 25%,
    var(--bg-card-hover) 37%,
    var(--border-color) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

/* Apply dark mode override */
body.dark .skeleton-base {
  background: linear-gradient(90deg, #3a3b3c 25%, #4a4b4c 37%, #3a3b3c 63%);
  background-size: 400% 100%;
}
```

**Skeleton shapes — define all:**
- `<SkeletonAvatar size={40|50|60|80|168} />` — circle
- `<SkeletonLine width="60%|80%|100%" height={12|14|16} />` — rectangle
- `<SkeletonRect width height borderRadius />` — generic
- `<SkeletonPost />` — full post card skeleton
- `<SkeletonConversation />` — chat list item skeleton
- `<SkeletonProfile />` — profile header skeleton
- `<SkeletonGroupCard />` — group card skeleton
- `<SkeletonVideoCard />` — video card skeleton (16:9 rect + lines)
- `<SkeletonNotification />` — notification row skeleton
- `<SkeletonStory />` — story circle skeleton

### H. Loading States

**YouTube-style top progress bar:**
```jsx
// NProgress-style bar, yellow, fixed top, z-index: 9999
// On route change start: appear at 0%, animate to 85% over 2s
// On route change complete: shoot to 100% then fade out
// Implement with GSAP + React Router useNavigation hook
```

**Lottie empty states (download from LottieFiles.com):**
- No posts in feed → "empty-feed.json"
- No messages → "empty-messages.json"
- No friends → "empty-friends.json"
- No notifications → "empty-notifications.json"
- No search results → "empty-search.json"
- No groups → "empty-groups.json"
- Upload complete → "success-checkmark.json"
- Error → "error-broken.json"

### I. Background Animations

**Auth pages animated background:**
```css
/* Animated gradient mesh blobs */
.auth-bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: blob-drift 8s ease-in-out infinite alternate;
}
.blob-1 { width: 500px; height: 500px; background: #F7B928; top: -100px; left: -100px; animation-delay: 0s; }
.blob-2 { width: 400px; height: 400px; background: #FFD700; top: 200px; right: -80px; animation-delay: -3s; }
.blob-3 { width: 350px; height: 350px; background: #FFEC8B; bottom: -50px; left: 40%; animation-delay: -6s; }

@keyframes blob-drift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30px, -30px) scale(1.08); }
  100% { transform: translate(-20px, 20px) scale(0.95); }
}
```

**Home feed subtle background texture:**
Very low opacity (0.025) diagonal line pattern on `--bg-body` using CSS `repeating-linear-gradient`.

**Navbar scroll behavior:**
```javascript
// On scroll > 10px: add class .scrolled → add box-shadow + slight background blur (backdrop-filter: blur(8px))
```

### I. Mouse / Cursor System

**Custom cursor (desktop, pointer devices only):**
```jsx
// components/CustomCursor.jsx
// Outer ring (32px): follows cursor with 80ms delay (lerp)
// Inner dot (8px): snaps to cursor position directly
// On hover interactive elements: outer ring scales to 2× + brand color border
// On click: both scale down to 0.8
// On text hover: outer ring morphs to thin vertical line (I-beam style)
// Cursor hidden on touch devices (media: (pointer: coarse))
```

### J. Entrance Animations (Leading Animations)

Sequence:
1. Navbar slides down (300ms, delay 0ms)
2. Left sidebar items cascade in (50ms stagger, delay 200ms)
3. First 3 stories pop in (scale 0.8→1, 60ms stagger, delay 300ms)
4. Create post card fades up (delay 400ms)
5. First 5 posts fade up with stagger (60ms each, delay 500ms)
6. Right sidebar fades in (delay 600ms)

Only run on initial page load. Use sessionStorage flag `mb_entrance_done` to skip on subsequent navigation.

### K. Physics-Based Gestures

**Pull-to-Refresh (mobile feed):**
```jsx
// useDrag from @use-gesture/react
// Drag down > 80px threshold → show spinner, trigger refresh
// Spring back to 0 on release
// Prevent pull when scroll position > 0
```

**Swipe to dismiss (modals on mobile):**
```jsx
// Drag modal down > 30% of its height → dismiss with spring exit
// Velocity-based: fast swipe always dismisses regardless of distance
```

**Chat bubble spring:**
New messages animate in: sender → slides from right (x: 20→0, spring); receiver → slides from left.

**Save Progress:** After each animation sub-section (A–K), append to `save_progress.md`.

---

## PROMPT-30 — LinkedIn-Style Professional Features

**Trigger:** `Run PROMPT-30`

*(Full spec from v3.0 — implement as specified with the following additions.)*

### Additional Detail

**Work Timeline on Profile:**
Animated SVG timeline (vertical line, circles at each entry) on the About tab. Each entry appears on scroll with a spring animation. Current job has a pulsing yellow dot.

**Skills Endorsement Animation:**
When endorsing a skill: progress bar fills + count increments + "+1" floats up. Toast: "You endorsed [Name]'s [Skill] skill."

**Article Rich Text Editor (TipTap):**
Toolbar: Bold · Italic · Underline · Strikethrough · H1 · H2 · H3 · Quote · Code · Code Block · Bullet List · Numbered List · To-do List · Table · Image (upload) · Link · Horizontal Rule · YouTube embed · Undo · Redo. Word count displayed. Autosave draft every 30 seconds.

**Job Board Kanban Animation:**
Drag-and-drop between columns uses `@dnd-kit/core`. When card drops into new column → spring bounce into position + column count badge animates.

**Save Progress:** After each LinkedIn feature, append to `save_progress.md`.

---

## PROMPT-31 — Instagram-Style Features

**Trigger:** `Run PROMPT-31`

*(Full spec from v3.0 — implement as specified with the following additions.)*

### Additional Detail

**Photo Filters Technical Implementation:**
```javascript
const filters = {
  Original: '',
  Warm:     'brightness(1.05) saturate(1.3) sepia(0.15)',
  Cool:     'brightness(1.02) saturate(0.9) hue-rotate(15deg)',
  Vintage:  'contrast(0.85) brightness(0.9) sepia(0.35) saturate(1.2)',
  Fade:     'brightness(1.1) contrast(0.85) saturate(0.8)',
  Chrome:   'contrast(1.15) brightness(1.05) saturate(1.4)',
  Noir:     'grayscale(1) contrast(1.2) brightness(0.9)',
  Vivid:    'contrast(1.1) brightness(1.05) saturate(1.6)',
  Golden:   'brightness(1.05) saturate(1.2) sepia(0.25) hue-rotate(-10deg)'
};
```

**Reels Full-Screen UX:**
- Scroll snap vertical (one reel at a time)
- Auto-mute but show "🔇 Tap for sound" hint overlay for 3 seconds
- Progress bar at top (thin, playing → filling)
- Double-tap to like (heart animates at tap point)
- Hold to pause (video pauses, dim overlay)

**Masonry Grid (Explore + Photos):**
Use CSS columns or `react-masonry-css`:
```jsx
import Masonry from 'react-masonry-css';
const breakpoints = { default: 3, 1100: 3, 700: 2, 500: 1 };
<Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-column">
  {items.map(item => <ExploreCard key={item._id} item={item} />)}
</Masonry>
```

**Save Progress:** After each Instagram feature, append to `save_progress.md`.

---

## PROMPT-32 — YouTube & Netflix-Style Watch Features

**Trigger:** `Run PROMPT-32`

*(Full spec from v3.0 — implement as specified with the following additions.)*

### Additional Detail

**Custom Video Player Controls:**
```jsx
// VideoPlayer.jsx — custom HTML5 video player
// Controls: play/pause, volume slider, mute, current time / total time, seek bar (click + drag),
//           playback speed selector, quality selector, fullscreen, picture-in-picture,
//           theatre mode, download (if enabled), cast (Chromecast API scaffold)
// Keyboard shortcuts: Space (play/pause), M (mute), F (fullscreen),
//                     Left/Right arrows (+/- 10s), Up/Down (volume ±5%)
// Progress bar: shows buffer progress (gray) + played progress (yellow)
// On hover: controls slide up from bottom (Framer Motion y animation)
```

**Netflix-Style Row Hover (Desktop):**
Video card hovered → expands with scale(1.08), shows preview video (muted autoplay), shows quick action buttons: Play ▶ / Add to Watch Later + / Like ❤ / More info ···. Animation: expand card + slightly overlap adjacent cards.

**Continue Watching Progress Bar:**
Under thumbnail: thin yellow line showing watch percentage.

**Save Progress:** After each Watch feature, append to `save_progress.md`.

---

## PROMPT-33 — AI Chatbot & Virtual Assistant (MindBot)

**Trigger:** `Run PROMPT-33`

*(Full spec from v3.0 — implement as specified with the following additions.)*

### Additional MindBot Features

**8. Voice Input for MindBot:**
Microphone button in MindBot chat → Web Speech API → transcribe → send as text message.

**9. MindBot Onboarding Wizard (new users):**
After register → MindBot starts conversation: "Welcome to MindBook, [Name]! I'm MindBot 👋 Let me help you get started..." → step by step: upload profile pic → find friends → join a group → create first post. Progress: 5 steps shown at top.

**10. Daily Wellness Check-In Notification:**
Every day at 9 AM (user's timezone): notification "How are you feeling today? [Check in →]" → opens MindBot mood check-in. After check-in: MindBot responds with personalized affirmation.

**11. MindBot Floating Widget:**
```jsx
// Position: bottom-right, z-index: var(--z-toast)
// Collapsed: yellow circle with 'M' bot icon, pulse animation, unread badge if any responses
// Expanded: chat panel (320px wide, 460px tall), slides up from button with spring
// Chat history stored in component state (not DB) + localStorage for persistence
// "Powered by Claude AI" caption at bottom
```

**Backend proxy (never expose API key to frontend):**
```javascript
// All MindBot requests go through backend
// Rate limit: 30 requests per user per hour
// Add conversation history (last 10 messages) for context continuity
// System prompt includes: user name, mutual friends count, recent activity summary
```

**Save Progress:** After each MindBot feature, append to `save_progress.md`.

---

## PROMPT-34 — Complete Messaging System Rebuild

**Trigger:** `Run PROMPT-34`

*(Full spec from v3.0 — implement every element specified. Below is expanded detail on the most complex parts.)*

### Chat Header (Full Detail)
```jsx
<ChatHeader>
  <BackButton />                   // mobile only
  <Avatar size={36} online={true} />
  <div>
    <Name onClick={→ profile} />
    <Status>Active now</Status>   // or "Active 3 min ago" / "Active today" / "Active yesterday"
  </div>
  <IconButton icon={Phone} onClick={startAudioCall} tooltip="Audio call" />
  <IconButton icon={Video} onClick={startVideoCall} tooltip="Video call" />
  <IconButton icon={Info} onClick={toggleInfoDrawer} tooltip="Conversation info" />
  <IconButton icon={Search} onClick={openMessageSearch} tooltip="Search" />
</ChatHeader>
```

### Message Input Area (Full Detail)

```jsx
// Layout: flex row, wraps gracefully
// Left side: attachment + media + audio buttons
// Center: textarea (min 1 row, max 4 rows auto-grow, placeholder "Aa")
//         While typing: right side shows SEND button (replaces voice button)
//         While empty: right side shows VOICE RECORD button
// Right side: emoji picker toggle | send | voice record

// Keyboard: Enter → send, Shift+Enter → new line
// Auto-grow: CSS resize: none + JS adjust textarea height
// Paste image: if pasted content is image → show preview + send
```

### Voice/Video Call — Full Detail

**Audio Call Window:**
```jsx
<CallWindow type="audio">
  <div className="call-avatar-wrapper">
    <Avatar size={120} src={callee.profilePicture} />
    <PulseRing className="ringing-animation" />  // animate while connecting
  </div>
  <Name />
  <CallTimer />                    // 0:00:00, counts up on connect
  <CallStatus />                   // "Calling..." / "Connected" / "On hold"
  <div className="call-controls">
    <ControlBtn icon={Mic} label="Mute" onClick={toggleMic} active={muted} />
    <ControlBtn icon={Phone} label="End" onClick={endCall} variant="danger" />
    <ControlBtn icon={Speaker} label="Speaker" onClick={toggleSpeaker} />
    <ControlBtn icon={Volume} label="More" dropdown={[
      "Add to call", "Switch to video", "Record", "Keyboard"
    ]} />
  </div>
</CallWindow>
```

**Video Call Window:**
```jsx
<VideoCallWindow>
  <video id="remote-video" autoPlay />          // full screen
  <video id="self-video" className="pip" draggable /> // bottom-right, draggable
  <div className="video-controls">
    <ControlBtn icon={Mic} active={muted} />
    <ControlBtn icon={Camera} active={cameraOff} />
    <ControlBtn icon={ScreenShare} onClick={shareScreen} />
    <ControlBtn icon={Phone} onClick={endCall} variant="danger" label="End" />
    <ControlBtn icon={Expand} onClick={toggleFullscreen} />
    <ControlBtn icon={PiP} onClick={enterPiP} />
  </div>
</VideoCallWindow>
```

**Incoming Call Modal:**
```jsx
<IncomingCallModal>
  <Avatar size={80} src={caller.profilePicture} />
  <Name />
  <CallType />  // "MindBook Voice Call" or "MindBook Video Call"
  <div className="incoming-actions">
    <RoundButton icon={Phone} color="green" onClick={acceptCall} label="Accept" />
    <RoundButton icon={MessageSquare} color="gray" onClick={replyWithMessage} label="Message" />
    <RoundButton icon={PhoneOff} color="red" onClick={declineCall} label="Decline" />
  </div>
</IncomingCallModal>
```

### Message Bubble Right-Click / Long-Press Context Menu

```
┌────────────────────┐
│ 😀 React           │  → shows emoji picker row
│ ↩️  Reply           │
│ ➡️  Forward         │
│ 📋 Copy text       │
│ 📌 Pin message     │  (if conversation admin)
│ ✏️  Edit           │  (own, within 5min)
│ 🗑️  Delete for me  │
│ 🗑️  Delete for all │  (own, within 10min)
│ 🚩 Report          │
└────────────────────┘
```

Appears with Framer Motion scale animation from the point of right-click/long-press.

### Real-time Typing Indicator

```jsx
// TypingIndicator.jsx
// Three dots, each scales 0.6→1.0 with staggered spring
// "[Name] is typing..." — name shown for group chats
// Disappears after 5s of no keystrokes from sender
// Socket events: typing-start / typing-stop
// Debounce: emit typing-start on keydown if not already typing, emit typing-stop 3s after last keydown
```

**Save Progress:** After each messaging sub-section, append to `save_progress.md`.

---

## PROMPT-35 — Settings Page — Deep Dive

**Trigger:** `Run PROMPT-35`

*(Full spec from v3.0 — implement all 10 sections. Additional detail below.)*

### Settings Page Layout

```jsx
<SettingsPage>
  <SettingsSidebar>          // 260px, sticky, scrollable
    {sections.map(section => (
      <SettingsSidebarItem
        key={section.id}
        icon={section.icon}
        label={section.label}
        active={activeSection === section.id}
        onClick={() => navigate(`/settings/${section.id}`)}
        badge={section.badge}  // e.g., "2FA" warning badge
      />
    ))}
  </SettingsSidebar>
  <SettingsContent>          // flex: 1, max-width: 680px
    <Outlet />               // React Router nested routes
  </SettingsContent>
</SettingsPage>
```

### Section Animations
Each settings section slides in from right on first open (Framer Motion `slideLeft` variant).

### Password Strength Meter
```jsx
// Colors: red (weak) → orange (fair) → yellow (good) → green (strong)
// Checks: length≥8, uppercase, lowercase, number, special char
// Visual: 4-segment colored bar + label text
// Only show if current password field has been touched
```

### 2FA Setup Flow

```
Step 1: Click "Set up Two-Factor Authentication"
Step 2: Modal shows QR code + setup key (for manual entry)
Step 3: User enters 6-digit code from authenticator app
Step 4: Verified → show 8 one-time backup codes (downloadable)
Step 5: Prompt: "Save these backup codes in a safe place"
Step 6: 2FA enabled badge shows in Security section
```

### Active Sessions Table

| Column | Content |
|--------|---------|
| Device | Browser icon + OS icon + "Chrome on Windows" |
| Location | "Karachi, Sindh, PK" |
| Last active | "Just now" / "3 hours ago" / "Yesterday" |
| IP Address | Partially masked "203.88.xxx.xxx" |
| Action | "Log out" button (red, with confirmation) |
| Current | Green "Current session" badge |

**Save Progress:** After each settings section, append to `save_progress.md`.

---

## PROMPT-36 — Groups System — Deep Dive

**Trigger:** `Run PROMPT-36`

*(Full spec from v3.0 — implement everything. Additional detail below.)*

### Group Card (Discover Grid)

```jsx
<GroupCard>
  <CoverImage src={group.coverPhoto} fallback={<GradientPlaceholder color="#F7B928" />} />
  <div className="group-card-body">
    <PrivacyBadge privacy={group.privacy} />  // 🔓 Public / 🔒 Private
    <GroupName />
    <MemberCount />                           // "12,450 members"
    <MutualMembers />                         // "3 mutual members" (avatars)
    <Description lines={2} />
    <JoinButton state={joinState} />          // Join / Requested / Joined ✓
  </div>
</GroupCard>
```

**Hover animation:** Card lifts + shadow deepens (CSS) + cover image slightly zooms (scale 1→1.05, CSS transition).

### Group Post Types (inside group feed)

- **Regular post** — text, images, video
- **Poll** — question + options + vote bars (animated yellow fill)
- **Event** — event card within feed
- **File share** — document icon + name + size + download
- **Announcement** — 📌 pinned at top, yellow left border
- **Welcome post** — auto-generated: "Welcome [NewMember] to the group!" with confetti animation

### Group Scheduled Posts (Admin)

Calendar view at `/groups/:id/manage/scheduled`. Posts appear on their scheduled date/time. Admin can edit/delete/reschedule scheduled posts.

### Group Insights Charts (Recharts)

- Member growth: Line chart (last 30 days)
- Post engagement: Bar chart (likes + comments per post, last 10 posts)
- Top contributors: Horizontal bar (top 5 posters)
- Active hours heatmap: 7-day × 24-hour grid, intensity = post count

**Save Progress:** After each group sub-section, append to `save_progress.md`.

---

## PROMPT-37 — Friends System — Deep Dive

**Trigger:** `Run PROMPT-37`

*(Full spec from v3.0 — implement everything. Additional detail below.)*

### Friend Card Animation

On hover: card lifts (translateY: -4px), shadow deepens, "Message" button slides in from right.

### Birthday Card

```jsx
// Birthday confetti animation on "Send Wishes" click
// canvas-confetti: yellow + white confetti burst
// Pre-composed "Happy Birthday!" post with birthday emoji and balloon animations
```

### Mutual Friends Modal

Click "X mutual friends" → modal slides in with list of mutual friends. Each row: avatar + name + "View Profile" + "Message".

### Friend Suggestions Algorithm (Backend)

```javascript
// Score = mutual_friends × 10 + same_group × 5 + same_school × 3 + same_city × 2 + same_company × 3
// Filter out: already friends, pending requests, blocked users, self
// Return top 30 sorted by score, shuffled within same-score groups for freshness
// Cache per user: 2 hours (invalidate when new friendship formed)
```

**Save Progress:** After each friends section, append to `save_progress.md`.

---

## PROMPT-38 — Notifications System — Deep Dive

**Trigger:** `Run PROMPT-38`
*(Full spec from v3.0 — implement everything. Save after each notification type.)*

### Notification Dropdown Animation

Bell icon click → dropdown slides down from top with scale origin at top-right. Each notification row fades in with stagger (40ms). Unread notifications have yellow left border + slightly off-white background.

**Save Progress:** After notification system, append to `save_progress.md`.

---

## PROMPT-39 — Search & Discovery System

**Trigger:** `Run PROMPT-39`
*(Full spec from v3.0 — implement. Save after each search feature.)*

### Live Search Suggestions

```jsx
// As user types (debounce 250ms):
// API: GET /api/search/suggest?q=...
// Returns: { people: [...], groups: [...], hashtags: [...], pages: [...] }
// Dropdown appears below search bar with sections
// Arrow keys navigate suggestions, Enter selects
// Esc closes dropdown
// Click outside closes dropdown
// Recent searches shown when input is empty (from localStorage)
```

**Save Progress:** After each search feature, append to `save_progress.md`.

---

## PROMPT-40 — Marketplace

**Trigger:** `Run PROMPT-40`
*(Full spec from v3.0 — implement as specified. Save after each marketplace section.)*

### Listing Card Hover

Image zoom (scale 1→1.08 on `img` element) + save button slides in from top-right corner.

**Save Progress:** After each marketplace page and component, append to `save_progress.md`.

---

## PROMPT-41 — Events System

**Trigger:** `Run PROMPT-41`
*(Full spec from v3.0 — implement as specified. Save after each events section.)*

### Calendar View

React-based monthly calendar grid. Days with events show yellow dot below date number. Hover day → tooltip showing event names. Click day → filter events list to that date.

**Save Progress:** After each events section, append to `save_progress.md`.

---

## PROMPT-42 — Memories & Flashbacks

**Trigger:** `Run PROMPT-42`
*(Full spec from v3.0 — implement as specified. Save after each memories feature.)*

**Memory Card Design:**

Polaroid-style: white frame, slight rotation (-2° or +2°, alternating), drop shadow, "N years ago today" caption in handwriting-style font.

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-43 — Live Streaming

**Trigger:** `Run PROMPT-43`
*(Full spec from v3.0 — implement as specified. Save after each live feature.)*

**Emoji Rain during live:** Viewer reacts → animated emoji floats up from bottom of screen, fades at top. Multiple emojis simultaneously, each with slight random horizontal drift. (CSS animation + dynamic DOM insertion.)

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-44 — Watch Party

**Trigger:** `Run PROMPT-44`
*(Full spec from v3.0 — implement as specified. Save after each watch party feature.)*

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-45 — Fundraisers & Donations

**Trigger:** `Run PROMPT-45`
*(Full spec from v3.0 — implement as specified. Save after each fundraiser feature.)*

**Progress Bar Animation:** On page load, animate from 0% to actual percentage with a 1-second spring animation (easing: easeOutExpo).

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-46 — Reels & Short Video Feed

**Trigger:** `Run PROMPT-46`
*(Full spec from v3.0 — implement as specified. Save after each reels feature.)*

**Double-tap like:** On double-tap → large yellow heart appears at tap position, floats up, fades. Post like count increments with "+1" animation.

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-47 — Explore & Discover Page

**Trigger:** `Run PROMPT-47`
*(Full spec from v3.0 — implement as specified. Save after each explore feature.)*

**Save Progress:** Append to `save_progress.md`.

---

## PROMPT-48 — Complete Error Audit & Production Hardening

**Trigger:** `Run PROMPT-48`
*(Full spec from v3.0 — implement as specified. Save audit results to `save_progress.md`.)*

---

---

## PROMPT-49 — Unified Video Hub with YouTube Integration

**Trigger:** `Run PROMPT-49`

Build a unified Video Hub where YouTube videos, MindBook-uploaded videos, and user-uploaded videos all appear together in the same feed with clear source badges.

### Overview & Design Philosophy

The Video Hub is MindBook's equivalent of a personalized video feed. It combines:
- **MindBook Originals** — videos uploaded directly to MindBook by users
- **YouTube Videos** — embedded via YouTube Data API v3 (subscriptions, trending, search)
- **User Uploads** — videos posted by friends/followed users on MindBook

Each video card prominently shows its source so users always know where it comes from.

### Source Badges

```jsx
// Source badge — appears top-right corner of every video card and in the player
const SourceBadge = ({ source }) => {
  const badges = {
    mindbook: { label: 'MindBook', icon: MindBookLogo,  color: '#F7B928',  bg: 'rgba(247,185,40,0.15)' },
    youtube:  { label: 'YouTube',  icon: YouTubeIcon,   color: '#FF0000',  bg: 'rgba(255,0,0,0.12)' },
    user:     { label: null,       icon: null,          color: null,       bg: null },  // shows creator avatar instead
  };
  // Render: icon + label, styled pill badge, semi-transparent background
};
```

### Pages

`/watch` (hub home) · `/watch/mindbook` · `/watch/youtube` · `/watch/trending` · `/watch/subscriptions` · `/watch/history` · `/watch/saved` · `/watch/video/:id` (MindBook video) · `/watch/youtube/:youtubeId` (YouTube embed player) · `/watch/live` · `/channel/:userId`

### Video Hub Home (`/watch`)

**Left Sidebar (desktop, 240px):**
- 🏠 Home
- 🔥 Trending
- 📺 Subscriptions
- 🕑 History
- 🔖 Watch Later
- 👍 Liked Videos
- 📁 Playlists
- ── Your Channel
- 📤 Upload Video
- 📊 Analytics

**Main Content — Sections:**

```
┌─────────────────────────────────────────────────────────┐
│  [SEARCH BAR]  [Filter chips: All | MindBook | YouTube | Live | Today]
├─────────────────────────────────────────────────────────┤
│  ▶ CONTINUE WATCHING          [horizontal scroll →]     │
│  [card1] [card2] [card3]                                │
├─────────────────────────────────────────────────────────┤
│  🔥 TRENDING NOW              [horizontal scroll →]     │
│  [YT badge] [MB badge] [MB badge] [YT badge]           │
├─────────────────────────────────────────────────────────┤
│  📺 FROM PEOPLE YOU FOLLOW    [horizontal scroll →]     │
├─────────────────────────────────────────────────────────┤
│  📺 YOUTUBE — FOR YOU         [horizontal scroll →]     │
├─────────────────────────────────────────────────────────┤
│  ─────────── Full Grid (mixed sources) ──────────────── │
│  [card] [card] [card] [card]                            │
│  [card] [card] [card] [card]                            │
│  [infinite scroll]                                      │
└─────────────────────────────────────────────────────────┘
```

### Video Card Component

```jsx
<VideoCard source="youtube|mindbook|user">
  <div className="thumbnail-wrapper">
    <img src={thumbnailUrl} alt={title} loading="lazy" />
    <video muted loop className="preview-video" />  // plays on hover (desktop)
    <DurationBadge duration={duration} />           // "12:34" bottom-right
    <SourceBadge source={source} />                 // top-right corner
    {isLive && <LiveBadge />}                       // "🔴 LIVE" top-left
    {watchProgress > 0 && <ProgressBar percent={watchProgress} />}  // yellow bottom bar
    <WatchLaterButton />                            // top-right on hover
  </div>
  <div className="video-card-info">
    <Avatar size={36} src={channelAvatar} />        // YouTube: channel avatar | MindBook: user avatar
    <div>
      <Title lines={2} />
      <ChannelName verified={isVerified} />
      <Meta>
        <ViewCount /> · <RelativeTime /> · <SourceLabel />
      </Meta>
    </div>
    <MoreButton dropdown={['Not interested', 'Save to Watch Later', 'Add to playlist', 'Report']} />
  </div>
</VideoCard>
```

**Hover behavior (desktop):**
- Thumbnail zooms slightly (scale 1→1.04)
- Preview video starts playing (muted, loop) after 800ms hover
- Card lifts (translateY -4px) + shadow deepens

### YouTube API Integration

**Backend service (`/backend/services/youtube.js`):**

```javascript
const { google } = require('googleapis');
const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

class YouTubeService {
  // Get trending videos (country code configurable via env)
  async getTrending(regionCode = 'US', maxResults = 20, pageToken = null) {
    const res = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics'],
      chart: 'mostPopular',
      regionCode, maxResults, pageToken,
      videoCategoryId: '0'
    });
    return { videos: res.data.items.map(this.formatVideo), nextPageToken: res.data.nextPageToken };
  }

  // Search YouTube videos
  async search(query, maxResults = 20, pageToken = null) {
    const res = await youtube.search.list({
      part: ['snippet'], q: query, type: ['video'], maxResults, pageToken,
      safeSearch: 'moderate', relevanceLanguage: 'en'
    });
    return { results: res.data.items.map(this.formatSearchResult), nextPageToken: res.data.nextPageToken };
  }

  // Get video details
  async getVideo(videoId) {
    const res = await youtube.videos.list({
      part: ['snippet', 'contentDetails', 'statistics', 'player'],
      id: [videoId]
    });
    return this.formatVideo(res.data.items[0]);
  }

  // Get channel videos
  async getChannelVideos(channelId, maxResults = 20) {
    const res = await youtube.search.list({
      part: ['snippet'], channelId, type: ['video'],
      order: 'date', maxResults
    });
    return res.data.items.map(this.formatSearchResult);
  }

  // Format video object
  formatVideo(item) {
    return {
      source:        'youtube',
      youtubeId:     item.id?.videoId || item.id,
      title:         item.snippet.title,
      description:   item.snippet.description,
      thumbnailUrl:  item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url,
      channelTitle:  item.snippet.channelTitle,
      channelId:     item.snippet.channelId,
      channelAvatar: null,  // fetch separately if needed
      publishedAt:   item.snippet.publishedAt,
      duration:      item.contentDetails?.duration,  // ISO 8601
      viewCount:     parseInt(item.statistics?.viewCount || 0),
      likeCount:     parseInt(item.statistics?.likeCount || 0),
      embedUrl:      `https://www.youtube.com/embed/${item.id?.videoId || item.id}`,
      isLive:        item.snippet.liveBroadcastContent === 'live'
    };
  }
}

module.exports = new YouTubeService();
```

**API Endpoints:**

```
GET  /api/youtube/trending?regionCode=US&pageToken=...
GET  /api/youtube/search?q=...&pageToken=...
GET  /api/youtube/video/:youtubeId
GET  /api/youtube/channel/:channelId/videos
GET  /api/youtube/categories
```

**Rate Limiting:** YouTube API has daily quota (10,000 units/day). Cache all responses in Redis (or in-memory cache) with TTL: trending = 15min, search = 5min, video details = 1hr.

```javascript
// Simple in-memory cache for dev (replace with Redis in prod)
const cache = new Map();
const getCached = (key, ttlMs) => {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < ttlMs) return entry.data;
  return null;
};
const setCache = (key, data) => cache.set(key, { data, timestamp: Date.now() });
```

### YouTube Video Player Page (`/watch/youtube/:youtubeId`)

```jsx
<YouTubeVideoPage>
  <YouTubePlayer videoId={youtubeId} />   // <iframe> embed, responsive 16:9
  <SourceBadge source="youtube" large />
  <VideoTitle />
  <VideoMeta>
    <ViewCount /> · <PublishedDate />
    <SourceLink href={`https://youtube.com/watch?v=${youtubeId}`} target="_blank">
      Watch on YouTube ↗
    </SourceLink>
  </VideoMeta>
  <div className="video-actions">
    <LikeButton />          // likes stored in MindBook DB (not YouTube)
    <SaveButton />          // saves to Watch Later in MindBook
    <ShareButton />         // share MindBook link + option to share YouTube link
    <AddToPlaylist />       // add to MindBook playlist
  </div>
  <ChannelInfo channelId={channelId} />
  <Description expandable />
  <MindBookComments videoId={youtubeId} source="youtube" />  // MindBook's own comments
  <RelatedVideos source="mixed" />                           // mix of YouTube + MindBook
</YouTubeVideoPage>
```

**Important:** The YouTube `<iframe>` embed is the primary player. MindBook adds its own Like/Save/Share/Comments layer on top. Original YouTube likes/comments are not shown (to avoid API complexity), but a "View on YouTube" link is always present.

### Unified Feed Algorithm (Mixed Sources)

```javascript
// GET /api/watch/feed — unified mixed video feed
router.get('/feed', authMiddleware, async (req, res) => {
  const { page = 1, limit = 20, source = 'all' } = req.query;
  const user = await User.findById(req.user.id);

  let mbVideos = [], ytVideos = [];

  // Fetch MindBook videos (from followed users + trending)
  if (source === 'all' || source === 'mindbook') {
    mbVideos = await Video.find({ uploader: { $in: [...user.following, ...user.friends] }, isPublic: true })
      .sort({ createdAt: -1 }).limit(20).populate('uploader', 'name profilePicture isVerified');
    mbVideos = mbVideos.map(v => ({ ...v.toObject(), source: 'mindbook' }));
  }

  // Fetch YouTube videos (cached trending + personalized)
  if (source === 'all' || source === 'youtube') {
    ytVideos = await youtubeService.getTrending('US', 20);
    ytVideos = ytVideos.videos; // already formatted with source: 'youtube'
  }

  // Interleave: every 3 MindBook videos → 2 YouTube videos
  const interleaved = interleaveVideos(mbVideos, ytVideos, 3, 2);

  res.json({ videos: interleaved.slice((page-1)*limit, page*limit), hasMore: interleaved.length > page*limit });
});
```

### Search — Unified Video Search

`GET /api/watch/search?q=...` → searches both:
1. MindBook videos (MongoDB full-text)
2. YouTube (YouTube API search)

Results merged, duplicates removed (by title similarity), sorted by relevance score.

Results page has tab filter: **All** · **MindBook** · **YouTube** · **Live**

Each result shows source badge prominently.

### Watch Later / Saved Videos

Works for both YouTube and MindBook videos. Stored in User model `watchLater` array as `{ videoId, source, addedAt }`. `/watch/saved` page shows unified list.

### Playlists

Playlists support mixed sources: each playlist item = `{ videoId, source, title, thumbnail, addedAt }`. Playlist player auto-plays next video, handles source-switching (MindBook video → YouTube video in same playlist).

### Subscriptions (YouTube Channel Follow)

Users can "Follow" YouTube channels on MindBook. This doesn't use YouTube OAuth (no auth needed — just store channel ID). MindBook polls `GET /api/youtube/channel/:channelId/videos` and shows new videos in `subscriptions` feed.

`User.subscribedChannels = [{ channelId: String, channelTitle: String, channelThumbnail: String, followedAt: Date }]`

### Comments on YouTube Videos

MindBook provides its own comment section for YouTube videos (identified by `videoId + source = 'youtube'`). Uses the existing Comment model with `videoId` and `source` fields. This is separate from YouTube's native comments.

### Video Notifications

- Friend uploads new video → notification to followers
- New video from followed YouTube channel → "New video: [Title] on [Channel]" notification
- Trending video (high views/hour) → "Trending: [Title]" notification (opt-in)

### Model Additions

```javascript
// Video model (MindBook-native videos)
const videoSchema = new mongoose.Schema({
  uploader:    { type: ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 5000 },
  videoUrl:    { type: String, required: true },
  thumbnailUrl:{ type: String, required: true },
  source:      { type: String, default: 'mindbook', enum: ['mindbook'] },
  duration:    Number,   // seconds
  fileSize:    Number,   // bytes
  views:       { type: Number, default: 0 },
  watchTime:   { type: Number, default: 0 },  // total seconds watched across all users
  likes:       [{ type: ObjectId, ref: 'User' }],
  dislikes:    [{ type: ObjectId, ref: 'User' }],
  comments:    [{ type: ObjectId, ref: 'Comment' }],
  tags:        [String],
  hashtags:    [String],
  category:    String,
  isPublic:    { type: Boolean, default: true },
  isProcessed: { type: Boolean, default: false },
  quality:     [{ resolution: String, url: String, fileSize: Number }],
  thumbnails:  [String],  // multiple thumbnail options
  captions:    [{ language: String, url: String }],
  watchProgress: [{ user: ObjectId, progress: Number, updatedAt: Date }],  // % watched
  allowDownload: { type: Boolean, default: false },
  allowComments: { type: Boolean, default: true },
  allowRatings:  { type: Boolean, default: true },
  scheduledAt:   Date,
  publishedAt:   Date,
  createdAt:     { type: Date, default: Date.now }
});

videoSchema.index({ uploader: 1, createdAt: -1 });
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ isPublic: 1, createdAt: -1 });
videoSchema.index({ views: -1 });
videoSchema.index({ isProcessed: 1 });
```

### Components

`VideoHub.jsx` · `VideoHubSidebar.jsx` · `VideoCard.jsx` · `SourceBadge.jsx` · `HorizontalVideoRow.jsx` · `VideoPlayer.jsx` · `YouTubePlayer.jsx` · `VideoPage.jsx` · `YouTubeVideoPage.jsx` · `UnifiedSearchResults.jsx` · `VideoComments.jsx` · `ChannelPage.jsx` · `WatchLaterPage.jsx` · `PlaylistPage.jsx` · `SubscriptionsPage.jsx` · `WatchHistoryPage.jsx` · `VideoUploadModal.jsx` · `VideoProcessingStatus.jsx` · `TrendingVideos.jsx`

**Save Progress:** After YouTube API service, each route, unified feed, player pages, and each component, append to `save_progress.md`.

---

## PROMPT-50 — Pixel-Perfect Facebook Parity & UI Completeness

**Trigger:** `Run PROMPT-50`

Audit every page against Facebook's actual UI and fill in any missing details.

### Navbar (Pixel-Perfect)

```
Left:    [MindBook Logo] [Search bar — gray, expandable]
Center:  [Home] [Watch] [Groups] [Reels] [Marketplace]   ← icon tabs with active yellow underline
Right:   [Create +] [Messenger 💬] [Notifications 🔔] [Account avatar ▾]
```

- Logo: Yellow 'M' mark (40px) + "MindBook" wordmark (hidden on small screens)
- Search: expands on click, 240px→380px with animation
- Center tabs: 48px width each, hover: gray bg, active: yellow 4px underline
- Active tab indicator: smooth sliding animation between tabs
- Right icons: 36px circle buttons, red badge for unread counts
- Account dropdown: avatar thumbnail → dropdown (Profile / Settings / Help / Display & Accessibility / Log out)

### Post Composer — "What's on your mind" Popup Modal

When user clicks the gray "What's on your mind?" box → full modal opens:

```
┌────────── Create Post ────────────── ✕ ┐
│ [Avatar] [Name]  [🌍 Friends ▾]        │
│ ─────────────────────────────────      │
│ [What's on your mind, [Name]?        ] │
│ [                                    ] │
│ [           textarea auto-grow        ] │
│                                        │
│ [Add to your post:]                    │
│ [📷 Photo/Video] [😊 Feeling/Activity] │
│ [📍 Check in] [🏷️ Tag People]         │
│ [📅 Life Event] [🔒 Privacy]           │
│                                        │
│ [Background Color picker row]          │
│                                        │
│ [─── Post button (yellow, full width)─]│
└────────────────────────────────────────┘
```

### Missing Small UI Details Audit

Check and implement every one of these:
- [ ] "Sponsored" label on placeholder ad cards
- [ ] "Suggested for you" labels on friend suggestions
- [ ] "People you may know" section in right sidebar
- [ ] Post "Embed" option in dropdown
- [ ] "Turn off notifications for this post" option
- [ ] Story "Archive" (stories saved after 24h to user's archive)
- [ ] "Add a frame" to profile picture
- [ ] "Feeling/Activity" emoji selector (10 categories, 50+ options)
- [ ] "Check in" (location input, shows map pin in post)
- [ ] "Tag people" in post (typing @name in photo or caption)
- [ ] "Life event" post type (job change, relationship, moved to new city, etc.)
- [ ] Post "Background color" (solid colors + gradients for text-only posts)
- [ ] "Create album" option in photo upload
- [ ] "Celebrate something" post type
- [ ] Comment "Top comments" sort + "Most recent" sort
- [ ] "View [N] more comments" pagination (load 3 at a time)
- [ ] Profile "5-star" review system (remove — Facebook removed this too; keep clean)
- [ ] Profile "Intro" card with icons for bio/work/education/location/links
- [ ] "Add to story" button on posts (share post to your own story)
- [ ] "Copy link to post" option
- [ ] Post timestamp links to `/posts/:id` (permalink)
- [ ] Group "Invite by link" (generate shareable join link)
- [ ] Event "Invite by link" option
- [ ] "Snooze [Name] for 30 days" on friend's post (hides their posts temporarily)
- [ ] "Hide all from [Name]" option
- [ ] "Why am I seeing this post?" info

**Save Progress:** After each parity fix, append to `save_progress.md`.

---

## PROMPT-51 — Creator Studio & Monetization Hub

**Trigger:** `Run PROMPT-51`

Build a dedicated Creator Studio at `/creator-studio`.

### Sections

**Overview Dashboard:**
- Total followers + growth (last 30 days)
- Total views (all videos) + average watch time
- Total post reach + engagement rate
- Total coins earned from tips
- Creator level badge (Rising / Creator / Star / Elite)

**Content Manager:**
- All posts in a table: title/preview, type, reach, engagement, date, status (published/draft/scheduled)
- Bulk actions: delete, archive, change privacy
- Sort by: newest, most reached, most engaged

**Video Manager:**
- All videos: thumbnail + title + views + watch time + likes + date
- Upload new video button
- Video analytics per video (click → detailed analytics)

**Analytics (PROMPT-59 for full detail):**
- Audience insights: demographics (age range, gender, location, device)
- Content performance: top posts, top videos, top reels
- Growth chart: followers over time
- Engagement timeline: reactions, comments, shares per day
- Revenue: coins earned from tips + breakdown

**Monetization:**
- Enable tips (requires 100+ followers)
- Set up "Support" button on profile
- Payout history (coins → reward conversion)
- "Apply for Creator Badge" form (verified creator)

**Schedule:**
- Calendar showing all scheduled posts, videos, stories
- "New scheduled post" CTA

**Save Progress:** After each Creator Studio section, append to `save_progress.md`.

---

## PROMPT-52 — Audio Rooms & Podcasts (Spaces-Like)

**Trigger:** `Run PROMPT-52`

Inspired by Twitter Spaces and Clubhouse.

### Audio Rooms (`/audio-rooms`)

**Room Card:** Room name + host avatar + listener count + topic tags + "Join" button.

**Create Audio Room:**
- Room name + description + topic tags + privacy (Public / Friends / Invite only)
- Schedule: start now or pick time
- "Go Live" → enters room as host

**Audio Room UI (inside room):**
```
┌─── [Room Title] ──────────────────────── 🔴 LIVE ──┐
│ [Host avatar + "HOST" badge]   12 listeners        │
│ Speakers row (up to 8):                            │
│   [Speaker 1 🎤] [Speaker 2 🎤] [Speaker 3 🎤]    │
│   Active speaker: yellow animated ring             │
│ ────────────────────────────────────────────────── │
│ [Listeners grid — avatars, 5 rows of 6]            │
│ ────────────────────────────────────────────────── │
│ Bottom: [✋ Raise Hand] [😀 React] [Share] [Leave] │
└────────────────────────────────────────────────────┘
```

**Host controls:** Mute/unmute speakers, invite listeners to speak, remove speakers, end room.

**Technical:** WebRTC audio with SFU (Selective Forwarding Unit). MVP: use existing WebRTC peer connections, limit to 8 speakers. Scale: integrate with mediasoup or livekit (scaffold).

**Podcast Upload:**
- Upload MP3/M4A episode (max 200MB)
- Set title, description, episode number, show name, cover art
- Auto-transcription (Whisper API scaffold)
- Episodes listed on profile "Podcasts" tab
- Appears in Audio Rooms discovery section

**Save Progress:** After each audio feature, append to `save_progress.md`.

---

## PROMPT-53 — Maps & Location Features

**Trigger:** `Run PROMPT-53`

### Check-In Feature

**In post composer:** "📍 Check in" button → location search modal.
- Auto-detect location (Geolocation API) → reverse geocode → suggest nearby places
- Manual search: type location name
- Popular place types: Restaurant / Café / Airport / Hotel / Stadium / Home / Work
- Selected: shows 📍 [Place Name, City] chip in post

### Location-Based Discovery

**Events near you:** Uses user's location (stored with permission) to show events sorted by distance.

**Marketplace near you:** Shows listings within configurable radius.

**Groups near you:** Shows local groups in Discover section.

**Friends near you:** Optional "check-in" feature — friends who check into same location notified (with privacy controls).

### Map Integration (Leaflet.js — no API key required)

```jsx
// Use Leaflet + OpenStreetMap (free, no API key)
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Use on: event location preview, marketplace listing location, check-in modal
// Marker: yellow custom marker pin icon
// Interaction: click to set location, drag pin to adjust
```

**No Google Maps** (avoid billing). Use Leaflet + OpenStreetMap for all map features.

**Save Progress:** After each location feature, append to `save_progress.md`.

---

## PROMPT-54 — Gaming & Interactive Features

**Trigger:** `Run PROMPT-54`

### Mini-Games

Simple browser-based mini-games accessible at `/gaming`:

**1. MindSnap (Memory Card Game):**
- 16 cards (MindBook-themed emojis), flip to match pairs
- Timer + move counter
- Share score to feed
- Leaderboard (top scores this week)
- Earn coins: complete in < 60s → +10 coins

**2. Emoji Quiz:**
- Guess the word/phrase from emoji sequence
- 10 rounds, 30 seconds each
- Score shared to feed optionally
- +5 coins for perfect score

**3. Daily Word Challenge:**
- 5-letter word, 6 attempts (Wordle-style)
- Resets daily, same word for all users
- Share result (colored grid) to feed
- Streak counter (+1 coin per day streak)

**Gaming Dashboard (`/gaming`):**
- Game cards grid
- Your scores + achievements
- Weekly leaderboard
- Friends' recent scores

**Challenges Feed:**

```jsx
// C.10 from Section C
// Create challenge: name + description + challenge type (photo/video/text/quiz) + duration (7/14/30 days)
// Challenge card: cover + name + creator + participant count + days remaining + progress bar
// Join challenge → user submits their entry (post/photo/video)
// Challenge feed: all submissions from joined challenge
// Winner announced (most likes on submission)
```

**Save Progress:** After each gaming feature, append to `save_progress.md`.

---

## PROMPT-55 — Advanced Accessibility & i18n

**Trigger:** `Run PROMPT-55`

### Accessibility (WCAG 2.1 AA)

**Color contrast:** All text meets AA ratio (4.5:1 for normal text, 3:1 for large text). Run automated check with `axe-core`.

**Keyboard navigation:**
- All interactive elements focusable with Tab
- Modals trap focus (focus-trap-react)
- Modals close on Escape
- Dropdowns navigate with arrow keys
- Skip-to-main-content link (visually hidden, visible on focus)

**Screen reader support:**
- All images have meaningful `alt` text
- `aria-label` on icon-only buttons
- `role="dialog"` + `aria-labelledby` on modals
- Live regions (`aria-live="polite"`) for toast notifications
- `aria-expanded` on dropdowns and accordions

**Focus indicators:**
- All focused elements show 3px yellow ring (`outline: 3px solid var(--brand-primary); outline-offset: 3px;`)
- No `outline: none` anywhere (use `:focus-visible` instead of `:focus`)

**Reduced motion:**
- `@media (prefers-reduced-motion: reduce)` disables all animations
- Replaces transitions with instant state changes

**High contrast mode:**
- `body.high-contrast` class (manually toggled or `@media (prefers-contrast: high)`)
- Solid borders, high-contrast text, no transparency

### Internationalization (i18n — Scaffold)

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

Set up i18n framework even if only English is implemented:
```javascript
// src/i18n.js — scaffold for future translations
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en', fallbackLng: 'en',
  interpolation: { escapeValue: false }
});
```

Every user-facing string in the UI must use `t('key')` so future translations are drop-in.

**Language selector in `/settings/accessibility`:**
- Dropdown of 10 major languages (even if only English is available)
- Shows native language name: "English", "العربية", "اردو", "中文", "Español", "Français", "Deutsch", "हिंदी", "বাংলা", "Türkçe"

**RTL support scaffold:** `dir="rtl"` attribute on `<html>` when Arabic/Urdu selected. Use logical CSS properties (`margin-inline-start` instead of `margin-left`).

**Save Progress:** After accessibility audit and i18n scaffold, append to `save_progress.md`.

---

## PROMPT-56 — Social Commerce & MindBook Shops

**Trigger:** `Run PROMPT-56`

Lighter version of Facebook Shops — creators and businesses can set up a simple shop on their profile.

### Shop Setup

- Profile → ··· menu → "Create Shop"
- Shop name, description, banner image, category
- Shop appears as new tab on profile: "Shop"

### Product Listing

- Product name + description + price + currency + category
- Up to 10 photos per product
- Stock availability toggle
- "Message to buy" (no direct checkout in MVP — connects to DM)
- "Book now" for services

### Shop Discovery

- Marketplace → "Shops" tab → grid of shops
- Shop card: banner + avatar + name + product count + category
- Follow shop → new products appear in feed

### Product Card in Feed

When creator adds new product → optional "Share to feed" toggle → appears as special product post type:
```
[Product photo 1:1]
[Product name — Price]
[Shop name]
[View Product] [💬 Message Shop]
```

**Save Progress:** After each shop feature, append to `save_progress.md`.

---

## PROMPT-57 — Advanced Post Composer

**Trigger:** `Run PROMPT-57`

Build a fully-featured post creation modal that matches Facebook's composer.

### Post Composer Modal (Full Spec)

```
┌──── Create Post ──────────────── ✕ ─┐
│ [Avatar]  [Name]                    │
│           [🌍 Friends ▾] selector  │
│ ─────────────────────────────────── │
│ Tabs: [📝 Post] [📷 Photo] [📹 Video] [🔴 Live] [😊 Feeling] [📍 Check in]
│ ─────────────────────────────────── │
│ [Text area — auto-grow, min 6 lines]│
│ [Hashtag + mention autocomplete]    │
│ [Character count (5000 max)]        │
│ ─────────────────────────────────── │
│ [Media preview grid (if any)]       │
│ ─────────────────────────────────── │
│ [Add to your post:]                 │
│ [📷 Photo/Video] [😊 Feeling]      │
│ [📍 Check in] [🏷️ Tag friends]     │
│ [📅 Life event] [🔗 Link preview]  │
│ [🎨 Background] [📊 Poll]          │
│ ─────────────────────────────────── │
│ [Privacy: 🌍 Friends ▾] [Schedule 📅]
│ [Post ─── yellow, full width ──────]│
└─────────────────────────────────────┘
```

### Background Color Post

Text-only post with colored background. Color strip picker:
- White (default)
- Gradient options: Sunset / Ocean / Forest / Galaxy / Fire / Ice / Mindful Yellow (brand gradient)
- Solid colors: Black / Navy / Purple / Dark Green

Text auto-centers on colored backgrounds. Text color auto-adjusts for contrast.

### Poll Post Type

```jsx
<PollComposer>
  <PollQuestion placeholder="Ask a question..." />
  <PollOption label="Option 1" />
  <PollOption label="Option 2" />
  <AddOption /> // up to 5 options
  <PollSettings>
    <Duration options={['1 day', '3 days', '1 week', '2 weeks']} />
    <MultipleChoice toggle />
    <Anonymous toggle />
    <ShowResults options={['After voting', 'After poll ends', 'Always']} />
  </PollSettings>
</PollComposer>
```

### Schedule Post

"Schedule post" option → date/time picker → post queued → appears in Creator Studio "Scheduled" tab.

### Post Visibility (Audience Selector)

```
🌍 Public — Anyone
👥 Friends — Your friends
👥 Friends except... — Choose people to exclude
👤 Specific friends — Choose who can see
🔒 Only me
📋 [Custom list name] — if user has created lists
```

**Save Progress:** After each post composer feature, append to `save_progress.md`.

---

## PROMPT-58 — Complete Mobile Experience

**Trigger:** `Run PROMPT-58`

Ensure every single page and interaction is perfect on mobile (375px–414px screens).

### Mobile Bottom Navigation Bar

```jsx
// Fixed at bottom, 56px height, above safe area (env(safe-area-inset-bottom))
<BottomNav>
  <NavItem icon={Home}     label="Home"     path="/"          active={path==='/'} />
  <NavItem icon={Users}    label="Friends"  path="/friends"   badge={requestCount} />
  <NavItem icon={Plus}     label=""         onClick={openCreatePostModal} special />  // yellow circle
  <NavItem icon={Video}    label="Watch"    path="/watch" />
  <NavItem icon={Bell}     label="Notifs"   path="/notifications" badge={notifCount} />
</BottomNav>
```

The center "+" button is a yellow circle (56px), raises above the bar, opens full-screen create post modal.

### Mobile Drawer Sidebars

Left sidebar collapses to a hamburger drawer (slides in from left, full-height overlay).

### Mobile-Specific Interactions

**Pull to refresh (feed):**
```jsx
// useDrag hook — drag down > 80px: show circular spinner, trigger refresh
// Haptic feedback: navigator.vibrate(20) on trigger (where supported)
```

**Swipe to go back:**
20px touch target on left edge → swipe right → navigate back (React Router -1).

**Long press on post:**
Long press (500ms) → context menu (same as desktop right-click).

**Pinch to zoom (images):**
In lightbox: pinch gesture zooms image. Double-tap: zoom 2×. Double-tap again: reset.

**Bottom sheet modals:**
On mobile, all dropdown modals (share, reactions, options) open as bottom sheets (slide up from bottom, drag handle at top, dismiss by dragging down).

### Mobile Story Creator

Full-screen modal:
- Camera button (capture live) + gallery picker
- Drawing tool (finger draw with color + stroke width picker)
- Text tool (tap to place, drag to move, pinch to resize)
- Sticker tray (scrollable horizontal strip)
- Timer: 5s / 10s / 15s exposure before auto-advance

### Mobile Performance

- Virtual list (`react-window`) for feed, chat list, notification list, friends list, any list > 20 items
- Images use `loading="lazy"` + `decoding="async"`
- Avoid layout shifts: skeleton loaders match final content dimensions
- No `position: fixed` elements other than navbar and bottom nav (prevent scroll performance issues on iOS)
- Font loading: `font-display: swap`

**Save Progress:** After each mobile feature and each page's mobile audit, append to `save_progress.md`.

---

## PROMPT-59 — Analytics Dashboard for Creators

**Trigger:** `Run PROMPT-59`

Build a comprehensive analytics system for content creators at `/creator-studio/analytics`.

### Available Analytics

**Overview (last 30 days):**
- Total Reach: number of unique people who saw your content
- Total Impressions: total times content was shown
- Engagement Rate: (likes + comments + shares) / reach × 100%
- Profile visits: people who visited your profile
- New followers: followers gained
- Video views: total views across all videos
- Watch time: total minutes watched

**Content Performance:**
- Best performing post (highest reach)
- Top video (most watched)
- Most shared content
- Best day/time to post (heatmap: day × hour, colored by engagement)

**Audience:**
- Followers over time (line chart)
- Age groups (bar chart, anonymized)
- Gender distribution (donut chart)
- Top countries / cities (horizontal bar)
- Device breakdown: Mobile / Desktop / Tablet
- Top referrers: Feed / Profile / Search / Explore / Share

**Video Analytics:**
- Average view duration + percentage
- Audience retention curve (x=time, y=% watching)
- Click-through rate for thumbnails
- Traffic sources

**Charts:** All charts use Recharts. Color scheme: yellow primary color for all bars/lines. Tooltips styled with MindBook design tokens. Charts animate in on mount (Recharts built-in animation).

**Export:** Download analytics report as PDF (jsPDF) or CSV.

**API:**
```
GET /api/analytics/overview?period=30d
GET /api/analytics/content?type=posts|videos|reels&period=30d
GET /api/analytics/audience?period=30d
GET /api/analytics/videos/:id?period=30d
```

**Save Progress:** After each analytics section and chart, append to `save_progress.md`.

---

## PROMPT-60 — Final Launch Readiness

**Trigger:** `Run PROMPT-60`

Final pass to ensure MindBook is 100% ready to be showcased in a portfolio.

### Portfolio Presentation Checklist

- [ ] Landing page at `/` if not logged in — showcase page showing MindBook features with screenshots/screenshots carousel. "Get Started" + "Log In" CTAs.
- [ ] Demo account created with seed data (50 posts, 20 friends, 10 groups, realistic content)
- [ ] README includes live demo link (if deployed) or instructions to run locally in 3 commands
- [ ] README includes feature showcase GIF or screenshots
- [ ] All console.log/console.error removed or guarded behind NODE_ENV === 'development'
- [ ] Error boundaries on all top-level page components
- [ ] 404 page (beautiful, with 3D animation, links back home)
- [ ] Loading states on every single data-fetching operation
- [ ] Empty states on every list (never a blank page)
- [ ] All forms have proper validation + clear error messages
- [ ] All success actions show feedback (toast / animation)
- [ ] Responsive: tested at 375 / 768 / 1024 / 1440 / 1920px
- [ ] Dark mode: every page and component correctly themed
- [ ] Lighthouse scores: ≥80 Performance, ≥90 Accessibility, ≥90 Best Practices, ≥90 SEO
- [ ] No broken images, no broken links, no 404 API calls
- [ ] Page titles correct on every route (`<title>MindBook - [Page Name]</title>`)
- [ ] Favicon displayed correctly in browser tab + bookmarks

### Seed Data Script (`backend/scripts/seed.js`)

```javascript
// Creates:
// - 1 admin user (admin@mindbook.com / Admin@123456)
// - 5 regular users with realistic profiles
// - 50 posts (various types: text, image, video, poll)
// - 10 groups (various categories)
// - 20 friend relationships
// - 30 comments
// - 10 stories (some expired, some active)
// - 5 events
// - 3 fundraisers
// - 10 marketplace listings
// Run: cd backend && node scripts/seed.js
```

### Final `save_progress.md` Entry

After PROMPT-60:
```markdown
## [TIMESTAMP] — PROMPT-60: Final Launch Readiness
**Status:** Completed
**Summary:** All features implemented, tested, and production-hardened. MindBook is ready for portfolio showcase. Seed data created. README updated with demo instructions. All Lighthouse scores meet targets.
**Final Stats:**
- Total pages implemented: [N]
- Total API endpoints: [N]
- Total React components: [N]
- Total database models: [N]
---
```

**Save Progress:** This entry closes the `save_progress.md` log for v4.0.

---

---

# SECTION A: ADMINISTRATIVE DASHBOARD & CONTROL SYSTEM

## PROMPT-21 — Build Full Admin Dashboard & Control System

**Trigger:** `Run PROMPT-21`

*(Full spec from v3.0 playbook — implement all sections A.1–A.6 exactly as specified, including:)*

- **A.1** Super Admin Dashboard with animated metric cards (Framer Motion number counter animation on load), Recharts line/bar/pie/horizontal-bar charts, quick actions bar
- **A.2** User Management Panel with searchable/sortable table, bulk actions, slide-in user detail modal with all action buttons
- **A.3** Content Moderation Queue with report table, moderation modal, auto-moderation rules, filter system
- **A.4** Report System (for all users) with report button on every piece of content, report modal, user report history at `/my-reports`
- **A.5** Admin Announcement System with rich text, targeting, scheduling, delivery analytics
- **A.6** System Logs with three log types, filter by level, CSV export

**Additional A.7 — IP Management:**
- IP ban list (add/remove IPs from ban list)
- Rate limit override per IP
- Geographic restriction toggle (block signups from specific countries — opt-in per admin)

**Additional A.8 — Data Management:**
- Storage usage breakdown by type (profile pics / cover photos / post media / message media / video)
- Old file cleanup scheduler (delete unused uploads older than 30 days)
- Database backup trigger (runs mongodump to a designated folder)

**Save Progress:** After each admin section (A.1–A.8), append to `save_progress.md`.

---

# SECTION B: AI-POWERED FEATURES

## PROMPT-22 — Implement AI-Powered Features

**Trigger:** `Run PROMPT-22`

*(Full spec from v3.0 playbook — implement all B.1–B.8. Additional below.)*

**B.9 — AI Image Caption Generator:**
When uploading image to post, offer "Generate caption" button. Sends image to backend → uses Claude vision to describe → inserts as caption/post text.

```javascript
// POST /api/ai/generate-caption
// Body: { imageUrl: string }
// Response: { caption: string, hashtags: string[] }
const systemPrompt = `You are a social media caption writer. Given an image, write a friendly, engaging caption suitable for a social media post. Keep it under 150 characters. Also suggest 5 relevant hashtags.`;
```

**B.10 — Trending Post Predictor:**
Before posting: "Your post has a [High/Medium/Low] chance of trending based on current platform activity, time of day, and content type." Small info card below post composer.

**B.11 — Smart Hashtag Suggestions:**
As user types post text: AI suggests relevant hashtags in a chip row below the textarea. Click to add. Debounce 1s, only trigger if post is >50 characters.

**Save Progress:** After each AI feature (B.1–B.11), append to `save_progress.md`.

---

# SECTION C: INNOVATIVE SOCIAL FEATURES

## PROMPT-23 — Build Innovative Social Features

**Trigger:** `Run PROMPT-23`

*(Full spec from v3.0 playbook — implement C.1–C.10. Additional below.)*

**C.11 — "What are you listening to?" Micro-Post:**
Users can share currently playing song (manual entry: song + artist + album art URL). Appears in feed as a special music card with album art thumbnail + "🎵 [Song] — [Artist]" + Like / React buttons.

**C.12 — Countdown Timer Posts:**
Create a countdown to an upcoming event. Countdown card in feed: event name + animated live countdown (days/hours/minutes/seconds updating in real-time). Viewers can RSVP interest.

**C.13 — "Ask Me Anything" (AMA) Post:**
Post creator marks a post as AMA. Followers can submit questions in comments (with upvote system). Creator can "Answer" a question (reply pinned below question). AMA posts have special badge + sorted by upvotes.

**Save Progress:** After each feature (C.1–C.13), append to `save_progress.md`.

---

# SECTION D: WALLET & DIGITAL ECONOMY

## PROMPT-24 — Build Wallet & Digital Economy System

**Trigger:** `Run PROMPT-24`

*(Full spec from v3.0 playbook — implement exactly. Additional:)*

**D.3 — Daily Rewards:**
Every day at midnight (user's timezone): push notification "Your daily reward is ready! 🪙". Click → opens wallet → animated coin drop + "+5 coins" (or bonus amount on streak days).

**D.4 — Coin Store (`/wallet/store`):**
Shop items purchasable with coins:
- Profile frames (animated border around avatar) — 150 coins
- Custom story reactions (exclusive emoji set) — 100 coins
- Post background themes — 75 coins
- "Super Like" (highlighted reaction visible to all) — 10 coins each
- Chat themes — 200 coins
- Verified-style badge (community verified, not official) — 500 coins

**Save Progress:** After each economy feature, append to `save_progress.md`.

---

# SECTION E: PORTFOLIO & PROFESSIONAL NETWORKING

## PROMPT-25 — Build Portfolio & Professional Networking

**Trigger:** `Run PROMPT-25`

*(Full spec from v3.0 playbook + PROMPT-30 — implement all features. Save after each.)*

**Additional:**

**E.3 — Referral System:**
Users can refer contacts to MindBook. Unique referral link in Settings → Share section. Successful signup = +50 coins for referrer. Track in DB and wallet transactions.

**E.4 — Verified Creator Program:**
Users with 1000+ followers can apply for Creator Badge (gold checkmark). Application form → admin reviews → badge awarded. Badge shown on profile, posts, comments, video cards.

**Save Progress:** After each feature, append to `save_progress.md`.

---

# SECTION F: ADVANCED PRIVACY & SAFETY

## PROMPT-26 — Implement Advanced Privacy & Safety

**Trigger:** `Run PROMPT-26`

*(Full spec from v3.0 playbook — implement everything. Additional:)*

**F.4 — Content Warning System:**
Posts can be marked as "Sensitive content" by the creator. Shows blur overlay with "This post may contain sensitive content. [View]" button. Categories: Graphic content / Disturbing news / Spoilers / Political content / Other.

**F.5 — Safety Check Feature:**
During real-world crisis events (admin can activate): banner at top of app: "Safety Check: [Event Name]. Are you safe?" → "I'm safe" button → posts safety status to friends, friends notified.

**Save Progress:** After each privacy/safety feature, append to `save_progress.md`.

---

# SECTION G: TECHNICAL IMPROVEMENTS

## PROMPT-27 — Technical Improvements

**Trigger:** `Run PROMPT-27`

*(Full spec from v3.0 playbook — implement all items. Additional:)*

**G.4 — API Response Compression:**
```javascript
const compression = require('compression');
app.use(compression({ filter: (req, res) => {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}, level: 6 }));
```

**G.5 — Request Deduplication:**
For repeated identical API calls within 100ms (e.g., multiple components mounting and requesting the same user data): implement request deduplication on the frontend using a simple in-flight request cache in `api.js`.

**G.6 — Optimistic Updates:**
For Like, React, Follow, Add Friend buttons: update UI instantly (optimistic), then sync with server. On server error: revert UI + show error toast. Implement using React Query or custom hook.

**G.7 — Service Worker (Workbox):**
```javascript
// Cache strategy:
// App Shell (HTML/CSS/JS): CacheFirst
// API requests: NetworkFirst with 5s timeout, fallback to cache
// Images: CacheFirst with 30-day expiry
// YouTube thumbnails: CacheFirst with 7-day expiry
// Register SW in main.jsx on production build only
```

**Save Progress:** After each technical improvement, append to `save_progress.md`.

---

# SECTION H: LINKEDIN & PORTFOLIO INTEGRATION

## PROMPT-28 — LinkedIn & Portfolio Integration

**Trigger:** `Run PROMPT-28`

*(Full spec from v3.0 playbook — implement all features. Save after each.)*

**H.3 — GitHub Activity Widget:**
If user has linked their GitHub, profile shows recent contribution graph (fetch GitHub public API: `https://api.github.com/users/:username/events/public`). Displays as mini green squares grid (like GitHub's contribution graph but yellow-themed).

**H.4 — Resume Builder:**
Users can generate a PDF resume from their MindBook profile (work, education, skills, portfolio links). `/profile/resume/generate` → jsPDF renders a professional resume template. Download as PDF.

**Save Progress:** After each integration feature, append to `save_progress.md`.

---

---

## Notes for Antigravity Agents

> **Read every word of this section before executing any prompt. These are hard rules.**

### The Golden Rules

1. 🟡 **Yellow = `#F7B928`. Always. No exceptions. Never change this.**
2. 📝 **Create `save_progress.md` first** if it doesn't exist.
3. 📝 **Read `save_progress.md` before starting** — never redo completed work.
4. 📝 **Append to `save_progress.md` after EVERY single step** — components, routes, models, fixes, installs.
5. 🔍 **Delta analysis before writing any code** — what hasn't been done yet?
6. ♻️ **If a feature exists, improve it** — never recreate from scratch.
7. 🧪 **Run PROMPT-07 after every prompt** to catch errors early.
8. 🚫 **Never hardcode API keys** — always from `.env`.
9. 🚫 **Never remove existing features** — fix broken ones.
10. 📱 **Every UI component must be responsive** — test at 375px, 768px, 1024px, 1440px.

### Tech Stack

| Layer | Primary | Alternative |
|-------|---------|-------------|
| Frontend Framework | React 18 + Vite | — |
| Routing | React Router v6 | — |
| State Management | Zustand | React Context |
| Styling | CSS Modules + CSS Variables | — |
| Animation | Framer Motion | GSAP, React Spring |
| 3D | @react-three/fiber + drei | — |
| HTTP Client | Axios | — |
| Real-time | Socket.IO | — |
| Backend | Node.js + Express | — |
| Database | MongoDB + Mongoose | — |
| Auth | JWT + bcrypt | — |
| File Upload | Multer + Sharp | Cloudinary (prod) |
| Email | Nodemailer | SendGrid (prod) |
| AI | Anthropic Claude API | — |
| YouTube | YouTube Data API v3 | — |
| GIFs | Giphy API | Tenor |
| Maps | Leaflet + OpenStreetMap | — |
| WebRTC | Native browser API + Socket.IO | LiveKit (scale) |
| PWA | Workbox | — |
| PDF | jsPDF | Puppeteer |
| Charts | Recharts | — |
| Rich Text | TipTap | Quill.js |
| Drag & Drop | @dnd-kit/core | — |
| Virtual List | react-window | react-virtual |
| Gestures | @use-gesture/react | — |
| Lottie | lottie-react | — |
| Confetti | canvas-confetti | — |
| Masonry | react-masonry-css | CSS columns |
| i18n | react-i18next | — |
| Testing | Jest + RTL | Vitest |

### All Pages (Complete List)

| Path | Page |
|------|------|
| `/` | Home (News Feed) |
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |
| `/reset-password/:token` | Reset Password |
| `/profile/:id` | User Profile |
| `/profile/:id/about` | About |
| `/profile/:id/friends` | Friends |
| `/profile/:id/photos` | Photos |
| `/profile/:id/videos` | Videos |
| `/profile/:id/reels` | Reels |
| `/profile/:id/portfolio` | Portfolio |
| `/messages` | Messenger |
| `/messages/:conversationId` | Chat Window |
| `/friends` | Friends Home |
| `/friends/requests` | Friend Requests |
| `/friends/find` | Find Friends |
| `/friends/suggestions` | Suggestions |
| `/friends/birthdays` | Birthdays |
| `/groups` | Groups Home |
| `/groups/discover` | Discover Groups |
| `/groups/:id` | Group Page |
| `/groups/:id/about` | Group About |
| `/groups/:id/members` | Group Members |
| `/groups/:id/media` | Group Media |
| `/groups/:id/events` | Group Events |
| `/groups/:id/files` | Group Files |
| `/groups/:id/manage` | Group Manage |
| `/explore` | Explore / Discover |
| `/reels` | Reels Feed |
| `/watch` | Video Hub |
| `/watch/mindbook` | MindBook Videos |
| `/watch/youtube` | YouTube Videos |
| `/watch/trending` | Trending |
| `/watch/subscriptions` | Subscriptions |
| `/watch/history` | Watch History |
| `/watch/saved` | Watch Later |
| `/watch/video/:id` | MindBook Video Player |
| `/watch/youtube/:youtubeId` | YouTube Video Player |
| `/watch/live` | Live Streams |
| `/channel/:userId` | User Channel |
| `/events` | Events |
| `/events/:id` | Event Detail |
| `/events/create` | Create Event |
| `/events/my-events` | My Events |
| `/marketplace` | Marketplace |
| `/marketplace/item/:id` | Listing Detail |
| `/marketplace/sell` | Create Listing |
| `/marketplace/my-listings` | My Listings |
| `/fundraisers` | Fundraisers |
| `/fundraisers/:id` | Fundraiser Detail |
| `/fundraisers/create` | Create Fundraiser |
| `/memories` | Memories |
| `/archive` | Archive |
| `/articles` | Articles Hub |
| `/articles/new` | Create Article |
| `/articles/:id` | Article View |
| `/jobs` | Job Board |
| `/jobs/applications` | Application Tracker |
| `/jobs/:id` | Job Detail |
| `/network` | Professional Network |
| `/audio-rooms` | Audio Rooms |
| `/gaming` | Gaming |
| `/wallet` | Wallet |
| `/wallet/store` | Coin Store |
| `/your-time` | Wellness Dashboard |
| `/mindbot` | AI Chatbot |
| `/notifications` | Notifications |
| `/my-reports` | My Reports |
| `/creator-studio` | Creator Studio |
| `/creator-studio/analytics` | Creator Analytics |
| `/settings` | Settings |
| `/settings/account` | Account Settings |
| `/settings/security` | Security |
| `/settings/privacy` | Privacy |
| `/settings/notifications` | Notification Settings |
| `/settings/profile` | Profile Settings |
| `/settings/appearance` | Appearance |
| `/settings/accessibility` | Accessibility |
| `/settings/data` | Data & Privacy |
| `/settings/help` | Help & Support |
| `/settings/ads` | Ads Preferences |
| `/security` | Login & Security |
| `/download-your-data` | GDPR Export |
| `/admin` | Admin Dashboard |
| `/admin/users` | User Management |
| `/admin/reports` | Moderation Queue |
| `/admin/logs` | System Logs |
| `/admin/announcements` | Announcements |
| `/search` | Search Results |
| `/hashtag/:tag` | Hashtag Feed |
| `/404` | Not Found |

---

*MindBook Agent Playbook — Version 4.0 | Updated 2026*
*Stack: MongoDB · Express.js · React 18 (Vite) · Node.js*
*Brand: `#F7B928` | AI: Anthropic Claude API | Video: YouTube Data API v3 | WebRTC: Native + Socket.IO*
*Progress: Every step saves to `save_progress.md` — no exceptions.*