# MindBook – Antigravity Agent Prompt Playbook v6.0 — ULTIMATE EDITION

> **Project:** MindBook — A next-generation, portfolio-grade social media platform.
> **Developer:** Farman Ullah Ansari | Full Stack Software Engineer
> **Portfolio:** https://farmanullah1.github.io/My-Portfolio
> **LinkedIn:** https://www.linkedin.com/in/farmanullah-ansari/
> **GitHub:** https://github.com/farmanullah1
>
> **Design Philosophy:** You have FULL PERMISSION to refine, evolve, or completely reimagine the color palette, logo, typography, spacing, and visual language if it results in a more stunning, cohesive, and award-winning user experience. The goal is not to copy Facebook — it is to EXCEED it in every visual and interactive dimension.
>
> **Brand Default:** Yellow `#F7B928` — but agent may propose a refined palette.
>
> **Stack:** MongoDB · Express.js · React 18 (Vite) · Node.js · Socket.IO · WebRTC
>
> **Save Progress Rule:** After EVERY completed sub-prompt, feature, component, route, model change, or bug fix, append a timestamped entry to `save_progress.md`. If this file does not exist, CREATE IT before touching anything else.

---

## MASTER AGENT EXECUTION LOOP

For **every single sub-prompt**, follow this exact sequence without exception:

```
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1 — CHECK:     Read save_progress.md. Is this sub-prompt      │
│                      already logged as "Completed"?                  │
│                                                                       │
│  STEP 2 — VERIFY:    If it is logged as complete, audit the actual  │
│                      code. Is it truly working? Is the UI good?      │
│                      Is it responsive? Does it animate correctly?    │
│                                                                       │
│  STEP 3 — FIX:       If anything is broken, incomplete, or ugly,    │
│                      fix ONLY that specific part. Do not recreate.  │
│                                                                       │
│  STEP 4 — IMPLEMENT: Execute the exact requirements of this          │
│                      sub-prompt in full detail.                       │
│                                                                       │
│  STEP 5 — ANIMATE:   Apply animations, interactions, and 3D effects  │
│                      as specified in the Animation Matrix.           │
│                                                                       │
│  STEP 6 — SAVE:      Append to save_progress.md with timestamp,     │
│                      files changed, and what was done.               │
│                                                                       │
│  STEP 7 — NEXT:      Only then move to the next sub-prompt.         │
└─────────────────────────────────────────────────────────────────────┘
```

**ABSOLUTE RULES:**
1. Never remove any existing working feature. Improve it, never delete it.
2. Never duplicate logic. If it exists, refactor and extend it.
3. Never hardcode API keys. All secrets live in `.env`.
4. Never skip the save step.
5. Every UI must work on 375px (iPhone SE), 768px (iPad), 1280px (laptop), 1440px (desktop).
6. Every page must have dark mode AND light mode.
7. Every component must have loading skeleton, empty state, and error state.

---

## save_progress.md Format

```markdown
# MindBook — Save Progress Log
> Auto-maintained by Antigravity Agent

---

## [2026-01-15T10:30:00Z] — PROMPT-01.A: Project Audit
**Status:** Completed
**Duration:** 12 minutes
**Files Modified:**
- frontend/src/App.jsx — Added AppLayout wrapper
- backend/server.js — Added compression middleware
**Summary:** Audited entire codebase. Found 3 broken imports and 2 unused components. Fixed all. Confirmed all routes render without console errors.
**Animations Added:** Navbar entrance slide animation.
**Tests Passed:** Responsive at 375px, 768px, 1440px. Dark mode verified.
**Notes:** None.

---
```

---

## Global Animation & Interaction Matrix

*Agent Directive: This matrix applies to ALL components across the entire site. Reference it before finalizing any UI component.*

### Install These Libraries (run once, check if already installed)
```bash
# Animation
npm install framer-motion @react-spring/web gsap @gsap/react lottie-react
# 3D
npm install three @react-three/fiber @react-three/drei
# Smooth Scroll
npm install @studio-freight/lenis
# Gestures
npm install @use-gesture/react
# Tilt Cards
npm install react-parallax-tilt
# Confetti
npm install canvas-confetti
# Masonry
npm install react-masonry-css
# Intersection Observer
npm install react-intersection-observer
# Cursor
npm install react-animated-cursor
```

### A. Smooth Lenis Scroll (Apply Globally)
```javascript
// frontend/src/main.jsx — initialize Lenis at app root
import Lenis from '@studio-freight/lenis';
const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), direction: 'vertical', smoothWheel: true, wheelMultiplier: 1.0 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
```

### B. Page Transition Variants (Framer Motion)
```javascript
// src/animations/variants.js
export const page = {
  initial:  { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.24 } }
};
export const stagger = (d=0.06) => ({ animate: { transition: { staggerChildren: d } } });
export const fadeUp  = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22,1,0.36,1] } } };
export const popIn   = { initial: { opacity: 0, scale: 0.4 }, animate: { opacity: 1, scale: 1, transition: { type:'spring', stiffness:300, damping:20 } } };
export const modal   = { initial: { opacity:0, scale:0.88, y:24 }, animate: { opacity:1, scale:1, y:0, transition:{ type:'spring', stiffness:280, damping:26 } }, exit: { opacity:0, scale:0.94, y:12, transition:{ duration:0.2 } } };
export const backdrop = { initial: { opacity:0 }, animate: { opacity:1, transition:{ duration:0.2 } }, exit: { opacity:0, transition:{ duration:0.15 } } };
```

### C. 3D Scroll Reveals
```javascript
// src/hooks/useScrollReveal.js
import { useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
export function useScrollReveal(opts = {}) {
  const { threshold=0.12, delay=0, axis='y', distance=32 } = opts;
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  const style = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translate3d(0,0px,0) rotateX(0deg)' : `translate3d(${axis==='x'?distance+'px':'0'},${axis==='y'?distance+'px':'0'},0) rotateX(${axis==='y'?'8':'0'}deg)`,
    delay: inView ? delay : 0,
    config: { tension:180, friction:22 }
  });
  return { ref, style };
}
```

### D. Horizontal Scroll Component
```jsx
// src/components/HorizontalScrollRow.jsx
// Momentum-based horizontal scroll. Gradient edge masks. Arrow buttons fade in on hover.
// Mouse drag support. Touch swipe support. Keyboard arrow support.
// Used on: story tray, reels preview, video rows, friend suggestions, marketplace, events, groups discover.
```

### E. Micro-Interaction Specs
| Element | Animation | Trigger |
|---------|-----------|---------|
| Every Button | `scale(1.03)` + yellow glow shadow | hover |
| Every Button | `scale(0.97)` + ripple | click |
| Like Heart | Scale 0→1.8→1 + 8 yellow sparks burst | click |
| Card | `translateY(-5px)` + shadow deepens | hover |
| Card | 3D tilt 4° max (react-parallax-tilt) | hover |
| Notification Bell | Swing 3× | new notification |
| Modal | Spring scale 0.88→1 from origin | open |
| Modal | Scale 0.94→0.88 + fade | close |
| Send Button | Paper airplane flies ↗ fades | click |
| Input | Yellow 3px ring glow | focus |
| Avatar | Scale 1.06 + ring appears | hover |
| Dark Mode Toggle | Sun/Moon rotate 360° | toggle |
| Route Change | blur-fade with y-drift | navigate |

### F. 3D Hero Scenes
Implement Three.js canvases on:
- `/login` and `/register` — Floating 3D 'M' logo, metallic gold, rotating, particle field background
- `/404` — Floating 3D broken link icon with gravity simulation  
- `/watch` header — 3D play button geometry, rotating slowly
- `/marketplace` header — 3D shopping bag, floating
- `/wallet` — 3D coin spinning
- Empty states — small 3D ghost (no messages), 3D telescope (discover/explore)

### G. Custom Cursor (Desktop Only)
```jsx
// 12px yellow dot snaps to cursor instantly
// 32px translucent ring trails behind (80ms lerp)
// Ring scales to 2× on hovering links/buttons
// Ring morphs to vertical bar on hovering text inputs
// Hidden on touch devices (pointer: coarse)
```

### H. Background Animations
- **Auth pages:** Three animated gradient blobs (yellow, gold, cream) — `filter: blur(80px)`, opacity 0.12, drifting slowly with `@keyframes blob-drift`
- **Feed background:** Repeating diagonal line pattern, opacity 0.02
- **Navbar on scroll:** Adds `backdrop-filter: blur(12px)` + deepened shadow when page scrolled > 20px

---

## DESIGN TOKENS (Agent May Refine These)

```css
:root {
  /* Agent: you may evolve this palette if it creates a more premium look */
  --brand:         #F7B928;
  --brand-hover:   #E4A11B;
  --brand-active:  #C98A10;
  --brand-light:   rgba(247,185,40,0.12);
  --brand-glow:    0 0 0 3px rgba(247,185,40,0.35);
  --brand-shadow:  0 4px 24px rgba(247,185,40,0.28);

  /* Surfaces */
  --bg-body:    #f0f2f5;
  --bg-card:    #ffffff;
  --bg-input:   #f0f2f5;
  --bg-sidebar: #ffffff;
  --bg-navbar:  rgba(255,255,255,0.95);

  /* Text */
  --text-1: #050505;
  --text-2: #65676b;
  --text-3: #8a8d91;

  /* Borders & Dividers */
  --border: #e4e6eb;

  /* Status */
  --online:  #31a24c;
  --error:   #f02849;
  --success: #45bd62;

  /* Shadows */
  --shadow-xs:  0 1px 2px rgba(0,0,0,0.06);
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.10);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.14);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.18);
  --shadow-xl:  0 16px 48px rgba(0,0,0,0.22);

  /* Radius */
  --r-sm: 8px;  --r-md: 12px;  --r-lg: 16px;
  --r-xl: 20px; --r-2xl: 24px; --r-full: 9999px;

  /* Layout */
  --navbar-h:      60px;
  --sidebar-l:     280px;
  --sidebar-r:     320px;
  --feed-max:      680px;
  --page-max:      1400px;
  --bottom-nav-h:  56px;

  /* Motion */
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --t-fast:  150ms;
  --t-base:  250ms;
  --t-slow:  400ms;

  /* Font */
  --font: 'Inter', 'Segoe UI', system-ui, sans-serif;
}

body.dark {
  --bg-body:    #18191a;
  --bg-card:    #242526;
  --bg-input:   #3a3b3c;
  --bg-sidebar: #242526;
  --bg-navbar:  rgba(36,37,38,0.95);
  --text-1:  #e4e6eb;
  --text-2:  #b0b3b8;
  --text-3:  #8a8d91;
  --border:  #3e4042;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
html { font-size: 15px; }
*, *::before, *::after { box-sizing: border-box; }
body { font-family: var(--font); background: var(--bg-body); color: var(--text-1); overflow-x: hidden; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

---

# PROMPT-01 — Project Audit, Scaffold & Global Layout

**Trigger:** `Run PROMPT-01`
**Goal:** Ensure a perfectly structured project exists with a universal layout shell, consistent navbar, and all global systems initialized.

---

## PROMPT-01.A — Complete Project Audit

**Before writing a single line of code, perform a full audit:**

- [ ] Open every file in `frontend/src/` — note any broken imports
- [ ] Open every file in `backend/` — note any missing route registrations
- [ ] Start both servers — note every console error or warning
- [ ] Open browser at `localhost:5173` — check every route loads without a white screen
- [ ] Open DevTools → Network tab — identify any 404 API calls
- [ ] Open DevTools → Console — note every error and warning
- [ ] Test at 375px, 768px, 1280px, 1440px — note any overlapping or broken layouts
- [ ] Toggle dark mode — verify every component respects the theme
- [ ] Produce an **Audit Report** saved to `audit_report.md` in root

**Output format:**
```markdown
# MindBook Audit Report — [TIMESTAMP]

## Broken Imports (N found)
- file: issue

## Console Errors (N found)
- error: location

## Broken Routes (N found)
- route: symptom

## Responsive Issues (N found)
- page: breakpoint: issue

## Dark Mode Issues (N found)
- component: issue

## Action Plan
- [ ] Fix item 1
- [ ] Fix item 2
```

**Fix every single item found before moving to PROMPT-01.B.**

*Save Progress after audit and all fixes.*

---

## PROMPT-01.B — Unified App Layout Shell

**Goal:** Every page in the app must be wrapped by `<AppLayout>`, which provides the fixed navbar and the three-column grid. No page should ever render without the navbar.

**Implementation:**

```
frontend/src/
├── layouts/
│   └── AppLayout.jsx       ← universal layout wrapper
│   └── AuthLayout.jsx      ← for login/register (no sidebar)
│   └── FullScreenLayout.jsx ← for video player, reels (no sidebars)
```

**AppLayout.jsx spec:**
```jsx
// AppLayout renders:
// 1. <Navbar /> — fixed top, 60px height
// 2. .app-grid — CSS grid: [sidebar] [feed] [right-sidebar]
//    Left sidebar: 280px, sticky, scrolls independently
//    Center: min-width: 0, flexible
//    Right sidebar: 320px, sticky
// 3. <BottomNav /> — only on mobile (≤768px), fixed bottom

// Grid CSS:
// Desktop (≥1280px): 280px 1fr 320px
// Laptop (≥1024px):  280px 1fr
// Tablet (≥768px):   60px 1fr   (icon-only sidebar)
// Mobile (<768px):   1fr        (no sidebars, bottom nav)
```

**Lenis smooth scroll initialization** — add to `main.jsx`.

**AnimatePresence** — wrap `<Routes>` with `<AnimatePresence mode="wait">`. Every page component uses `{...page}` Framer Motion spread.

**YouTube-style top loading bar** — appears on every route navigation start (0% → 85%), completes (→ 100%) and fades out on route loaded. Yellow color. GSAP powered.

*Save Progress after layout shell complete.*

---

## PROMPT-01.C — Global UI Component Library

Build these shared components before building any pages:

**Typography:**
- `<Heading level={1|2|3|4} />` — consistent heading styles
- `<Text size="sm|base|lg" color="1|2|3" />` — body text

**Inputs:**
- `<Input />` — yellow focus ring, animated label float, error state with red ring
- `<Textarea />` — auto-grows, yellow focus ring
- `<Select />` — custom dropdown with Framer Motion animation
- `<Checkbox />` — custom yellow checkbox with spring check animation
- `<Toggle />` — smooth sliding toggle switch

**Buttons:**
- `<Button variant="primary|secondary|ghost|danger" size="sm|md|lg" loading={bool} />` — all have hover scale + ripple + glow
- `<IconButton icon={...} tooltip="..." />` — circular, hover scale

**Feedback:**
- `<Toast />` — slide from right, stack up to 3, auto-dismiss 4s with progress bar
- `<Modal />` — spring entrance, backdrop blur, drag-to-dismiss on mobile
- `<Tooltip />` — mouse-follow tooltip with Framer Motion

**Media:**
- `<Avatar size={24|32|40|48|60|80|120|168} src online={bool} />` — green pulse dot
- `<ImageGrid images={[]} />` — handles 1-5+ image layouts
- `<Skeleton />` — shimmer loader that matches component shape

**Skeleton shapes:**
```
SkeletonPost, SkeletonAvatar, SkeletonLine, SkeletonCard,
SkeletonChat, SkeletonNotification, SkeletonVideoCard, SkeletonProfile
```

*Save Progress after component library complete.*

---

## PROMPT-01.D — Global State & Context Setup

```
frontend/src/
├── store/
│   ├── authStore.js       ← Zustand: user, token, login, logout
│   ├── uiStore.js         ← Zustand: theme, sidebarOpen, modals, toasts
│   ├── notifStore.js      ← Zustand: notifications, unreadCount
│   └── callStore.js       ← Zustand: activeCall, callState, peer
├── context/
│   ├── SocketContext.jsx  ← Socket.IO connection, events
│   └── CallContext.jsx    ← WebRTC signaling state
```

**Theme persistence:** Read `localStorage.getItem('mb_theme')` on load. Apply `body.dark` class. Toggle syncs to localStorage.

**Socket initialization:** Connect on login, disconnect on logout. Reconnect with exponential backoff.

*Save Progress.*

---

# PROMPT-02 — Authentication & Admin System

**Trigger:** `Run PROMPT-02`
**Goal:** Beautiful, modern auth pages with full admin system.

---

## PROMPT-02.A — Login Page Redesign

**Visual Design:**

Left half: 3D animated scene (Three.js canvas — floating gold 'M' logo, particle field, slow rotation). Hidden on mobile.

Right half: Login form card.

**Login card spec:**
```
┌──────────────────────────────────┐
│  [MindBook SVG logo — 48px]     │
│  MindBook                        │
│  "Connect. Create. Belong."      │
│                                  │
│  [Email or Username input]       │
│  [Password input + eye toggle]   │
│                                  │
│  [Remember me ☐]  [Forgot? →]   │
│                                  │
│  [Log In — full width yellow]    │
│                                  │
│  ─────── or ───────              │
│  [Continue with Google — gray]   │
│  [Continue with GitHub — gray]   │
│                                  │
│  "Don't have an account?         │
│   Create new account →"          │
│                                  │
│  © 2026 MindBook · Privacy ·    │
│  Terms · Cookies                 │
└──────────────────────────────────┘
```

**Animations:**
- Background blobs drift slowly
- Form slides up from y:32 on mount (spring)
- Input labels float up on focus (CSS transition)
- Login button: hover = scale(1.02) + glow; active = scale(0.98); loading = spinner replaces text
- Error message shakes horizontally (CSS keyframe)
- Three.js canvas: particle depth of field, ambient occlusion on logo

**Forgot Password flow:**
- `/forgot-password` → email input → submit → "Check your inbox" Lottie animation
- `/reset-password/:token` → new password fields → strength meter → submit → redirect login

*Save Progress.*

---

## PROMPT-02.B — Signup Page Redesign

**MANDATORY fields:** Full Name, Email, Password

**OPTIONAL fields (shown in expandable "More details" section with smooth height animation):**
- Profile Picture (upload or URL — see PROMPT-02.C for full spec)
- Username (auto-generate suggestion from name, editable)
- Phone Number (with country code selector)
- Date of Birth (date picker, stylized)
- Gender (dropdown: Male / Female / Non-binary / Prefer not to say / Custom)
- Bio (textarea, 150 char max, live counter)
- Website URL

**Layout:**
```
┌──────────────────────────────────────┐
│  [MindBook logo + "Join MindBook"]  │
│  "Free forever. No ads."            │
│                                      │
│  [Full Name* ─────────────────────] │
│  [Email* ──────────────────────────]│
│  [Password* ───────────────────────]│
│  [Password Strength Meter]          │
│  [Confirm Password* ───────────────]│
│                                      │
│  [▸ Add more details (optional)]    │  ← accordion
│    [Profile picture upload]         │
│    [Username]                       │
│    [Phone]                          │
│    [Birthday]                       │
│    [Gender]                         │
│    [Bio]                            │
│    [Website]                        │
│                                      │
│  ─────────── Legal text ────────── │
│  "People who use our service may   │
│   have uploaded your contact info." │
│  "By clicking Submit, you agree to  │
│   MindBook's Terms, Privacy Policy" │
│                                      │
│  [Submit — yellow, full width]      │
│                                      │
│  "Already have an account? Log in"  │
└──────────────────────────────────────┘
```

**Real-time validation:**
- Name: minimum 2 characters (green checkmark when valid)
- Email: format validation + real-time "Email already taken" check (debounced 600ms, API call)
- Password: strength meter (4 segments: weak/fair/good/strong) + requirements checklist
- Confirm Password: red X if not matching, green ✓ if matching

**Animations:**
- Each input field entrance: stagger 60ms, slide up from y:16
- "Add more details" accordion: smooth height animation (Framer Motion height from 0 to auto)
- Submit button: loading spinner → Lottie checkmark on success → navigate to feed
- Background: animated gradient mesh

*Save Progress.*

---

## PROMPT-02.C — Profile Picture on Signup

The profile picture field in signup should:

1. Show a placeholder avatar with a "📷 Add photo" circle button
2. Clicking opens a modal with two tabs:
   - **Upload File:** drag-and-drop zone + file picker (JPG/PNG/GIF/WEBP, max 5MB) → shows image preview → crop with `react-easy-crop` (circular crop, zoom slider, rotation slider)
   - **From URL:** input field to paste any image URL → live preview in circle
3. After selecting: shows preview in the signup form circle, allows re-editing (click to change)
4. Upload happens on form submit (not immediately), attached as FormData

*Save Progress.*

---

## PROMPT-02.D — Admin System

**Admin Registration:**
- `/admin/register` — Special signup page (not linked anywhere publicly)
- Requires: Name, Email, Password, **Admin Secret Key** (set in `.env` as `ADMIN_SECRET_KEY`)
- If secret key matches → creates user with `role: 'admin'`
- Shows on page: "Admin registration is restricted." (no hint about the key)

**Admin Login:**
- Same `/login` page works. Admin users are redirected to `/admin` instead of `/`

**Admin Dashboard (`/admin`):**

Left panel navigation:
```
📊 Dashboard (Overview)
👥 Users
📝 Content
🚩 Reports
📢 Announcements
📊 Analytics
🗄️ System Logs
⚙️ Settings
```

**A.1 — Overview Dashboard:**
Animated metric cards (number counts up from 0 on mount with GSAP):
- Total Users (with 30-day sparkline)
- Active Today
- Total Posts
- Pending Reports (red if > 0)
- Storage Used
- Server Status (green/yellow/red dot with pulse animation)

Recharts charts:
- User growth (line, last 30 days)
- Daily active users (bar, last 14 days)
- Content by type (donut: Posts/Reels/Videos/Stories)
- Reports by category (horizontal bar)

**A.2 — User Management (`/admin/users`):**
- Data table with: Avatar, Name, Email, Role, Status, Joined, Last Active, Post Count, Report Count
- Search by name/email; filter by role (user/moderator/admin), status (active/suspended/banned)
- Sortable columns
- Bulk actions: Suspend 24h / 7d / 30d / Permanent, Delete, Send Warning, Change Role
- Row click → Slide-in right panel (user detail): full profile, activity timeline, all admin actions
- Actions per user: Suspend, Reset Password (generate temp), Warn, Impersonate (opens new tab logged in as user for debugging), Delete All Content, Delete Account

**A.3 — Content Moderation (`/admin/content`):**
- Report queue table: content preview, report type, reason, reporter, reported user, time, priority (High/Med/Low), status
- Priority auto-assigned: same content reported 3+ times = High
- Review button → full moderation modal: see full content, reporter history, reported user history, all reports on this content
- Decision buttons: Dismiss / Warn User / Delete Content / Delete + Suspend / Permanent Ban
- All decisions logged with admin ID + timestamp → immutable

**A.4 — Report System (user-side):**
- ··· menu on every post, comment, story, reel, video, message, group, user profile → "Report" option
- Report modal: category chips (Spam / Harassment / Hate Speech / Violence / Nudity / Misinformation / Scam / Self-harm / Copyright / Other) → optional detail text (500 chars max)
- Submit → "Thank you, we'll review this." toast
- Cannot report same content twice (button grays out with "Reported")
- User can view own report history at `/my-reports` with status: Pending / Reviewed / Action Taken / Dismissed

**A.5 — Announcements (`/admin/announcements`):**
- Create announcement: Title + rich text body + optional CTA button (label + URL)
- Target: All Users / New Users (<30d) / Inactive (>30d) / Specific user IDs/emails
- Schedule: Now or pick future datetime
- Delivery: In-app notification + push notification + optional email blast
- After sending: analytics card → Delivered count / Opened count / CTA clicked count

**A.6 — System Logs (`/admin/logs`):**
- Three tabs: Error Log / Security Log / Moderation Log
- Each entry: timestamp, level, message, user (if applicable), IP
- Filter by level, date range, user
- Export as CSV

**A.7 — IP Management (`/admin/security`):**
- IP ban list: add IP → never accept requests from that IP
- Rate limit override: set custom limits per IP
- Failed login attempts: table of IPs with failed attempt counts

*Save Progress after each admin section.*

---

# PROMPT-03 — User Profile System

**Trigger:** `Run PROMPT-03`
**Goal:** A stunning, fully-featured profile page that makes every user proud to share.

---

## PROMPT-03.A — Profile Header Visual Design

**Cover Photo area (820px wide, 312px tall on desktop):**
- Parallax effect on scroll: cover image moves at 40% of scroll speed (creates depth illusion)
- Gradient overlay on bottom 30% for text readability
- **Hover effect:** Camera icon appears center-cover with "Edit cover photo" label
- Click → opens cover photo modal (see PROMPT-03.C)

**Profile Picture (168px circle on desktop, 96px on mobile):**
- Overlaps cover bottom by 50%
- 4px white border around circle
- Verified users: animated golden ring (SVG stroke-dasharray animation, slowly cycles)
- **Hover effect:** Darkens slightly + camera icon appears + "Update" label
- Click → opens profile picture modal (see PROMPT-03.C)

**Name, Bio, Stats row:**
- Name (bold, 24px) + optional verified badge (✓)
- Pronouns (if set, subtle gray text)
- Bio (max 150 chars, linkified, line-breaks preserved)
- Intro icons row: 💼 Current job @ Company · 🎓 School · 📍 City, Country · 🔗 Website · 📅 Joined Month Year
- Stats: [N Friends] · [N Following] · [N Followers] — each clickable

**Action Buttons row** (changes based on relationship):
- Own profile: `Edit Profile` (outlined yellow) + `View As` (ghost) + `Add to story`
- Friend: `Message` (yellow) + `Friends ▾` (dropdown: Unfriend / Unfollow / Snooze 30d / Add to Close Friends)
- Not friend, following: `Add Friend` (yellow) + `Following ✓` (outlined) + `Message`
- Not friend, not following: `Add Friend` (yellow) + `Follow` + `Message`
- Friend request sent: `Pending ▾` (dropdown: Cancel request) + `Message`
- Incoming request: `Confirm` (yellow) + `Delete`

**Developer Links section** (shown on the demo account / creator profile):
```jsx
// Add to profile sidebar or About tab for creator's profile
<DeveloperLinks>
  <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank">🌐 Portfolio</a>
  <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank">LinkedIn</a>
  <a href="https://github.com/farmanullah1" target="_blank">GitHub</a>
</DeveloperLinks>
```

**Profile entrance animation:** Cover fades in (0.4s). Profile picture scales up from 0.8→1 with spring (delay 200ms). Name and buttons slide up with stagger (60ms each).

*Save Progress.*

---

## PROMPT-03.B — Profile Tabs System

**Tab bar** (sticky when scrolled past header, highlights yellow active tab):
```
Posts | About | Friends | Photos | Videos | Reels | Portfolio | Articles | More ▾
```

More dropdown contains: Achievements · Saved · Audio · Groups · Events · Check-ins

**Active tab transitions:** Tab content fades and slides in from right (Framer Motion `slideLeft` variant).

**Posts Tab:**
- Create post box (if own profile)
- Pinned post (if any) — shown first with 📌 badge
- Remaining posts in reverse chronological order
- Infinite scroll, skeleton loaders

**About Tab:**
Left column: Overview card (bio, intro items)
Right column: Work & Education timeline (animated SVG vertical line, spring-reveal each entry)

**Friends Tab:**
- 9-card grid preview (3×3). "See all friends" → full searchable list
- Mutual friends section (when viewing other user)

**Photos Tab:**
- Albums row: Profile Pictures / Cover Photos / Posts / Tagged / user-created albums
- Masonry grid of all photos (react-masonry-css)
- Lightbox on click: full screen, left/right nav, download, tag, delete (own)

**Videos Tab:**
- Grid of uploaded videos (16:9 thumbnails)
- Click → opens video player

**Portfolio Tab** (LinkedIn-inspired):
- Work Samples: project cards with image, title, description, links
- Skills: with endorser avatars + endorsement count
- Certifications: with expiry dates
- Resume download button (generates from profile data via jsPDF)
- Developer links: Portfolio / LinkedIn / GitHub

*Save Progress.*

---

## PROMPT-03.C — Profile & Cover Photo Update System (CRITICAL)

**This must be a flawless, delightful experience.**

### Profile Picture Modal:

**Trigger:** Click camera icon on profile picture (visible on own profile).

**Modal layout:**
```
┌─── Update Profile Picture ─────── ✕ ┐
│                                      │
│  [Tabs: Upload File | From URL]     │
│                                      │
│  === Upload File Tab ===            │
│  [Drag & drop zone]                 │
│   or                                │
│  [Choose from device — yellow btn]  │
│                                      │
│  [After file chosen:]               │
│  [─── Crop UI ──────────────────] │
│  [Circular crop area]              │
│  [Zoom slider ●──────────────]    │
│  [Rotate buttons ↺  ↻]            │
│                                      │
│  === From URL Tab ===              │
│  [https://paste-image-url-here..]  │
│  [Preview circle]                   │
│                                      │
│  [Cancel] [Save — yellow]           │
└──────────────────────────────────────┘
```

**Technical details:**
- `react-easy-crop` library for cropping
- `Cropper.getCroppedCanvas()` → convert to Blob → POST to `/api/users/upload-profile-pic` (Multer)
- Sharp resizes to 400×400px, converts to WebP, saves to `/uploads/profile-pics/`
- On URL tab: fetch image through backend proxy (to avoid CORS), validate it's an image, allow user to crop it too
- Loading state during upload: circular progress ring over the preview
- Success: profile picture updates immediately everywhere on the page (Zustand store update)
- Animated: modal opens with spring, crop area zooms in subtly on load

### Cover Photo Modal:

**Trigger:** Click camera icon on cover photo area (visible on own profile).

**Modal layout:**
```
┌─── Update Cover Photo ─────────── ✕ ┐
│                                      │
│  [Tabs: Upload File | From URL]     │
│                                      │
│  [After file chosen:]               │
│  [16:9 crop area — landscape]       │
│  [Drag image to reposition]         │
│  [Zoom slider]                       │
│                                      │
│  [From URL tab:]                    │
│  [URL input + live preview]         │
│                                      │
│  [Cancel] [Save]                    │
└──────────────────────────────────────┘
```

- Landscape crop ratio 16:9 forced
- Allow drag-to-reposition (drag image within crop frame)
- Sharp resizes to 1640×624px (2× retina), converts to WebP
- Cover photo updates on profile immediately after save

**Icon visibility:** The camera icons on both profile pic and cover should:
- Be invisible by default
- Fade in with a semi-transparent dark background when hovering that area
- Have a camera icon (white, 24px) centered
- Include the label "Edit" or "Update photo"
- Use CSS transition (opacity 0→1, background rgba(0,0,0,0)→rgba(0,0,0,0.4))

*Save Progress.*

---

## PROMPT-03.D — Edit Profile Modal

**Trigger:** "Edit Profile" button on own profile.

**Modal sections (scrollable within modal):**

1. **Photos:** Profile pic + cover photo (links to respective modals above)
2. **Name & Bio:** First name, Last name, Pronouns, Bio (150 char counter), Username
3. **Contact:** Email (shows masked), Phone number (with country code)
4. **Intro:** Current city, Hometown, Relationship status
5. **Work:** Add/edit/delete work entries (job title, company, description, start/end, current toggle, skills used)
6. **Education:** Add/edit/delete education entries (school, degree, field, start/end)
7. **Websites & Social:** Portfolio URL, GitHub, LinkedIn, Instagram, Twitter, YouTube, TikTok
8. **Life Events:** Add milestone (got married, had a child, moved to new city, started new job, etc.)

**Save:** Each section has its own Save button (inline). Shows success checkmark animation on save.

*Save Progress.*

---

# PROMPT-04 — Complete Messaging & WebRTC System

**Trigger:** `Run PROMPT-04`
**Goal:** A messaging experience that rivals — and surpasses — Facebook Messenger.

---

## PROMPT-04.A — Messenger Layout & Chat List

**Route:** `/messages` and `/messages/:conversationId`

**Desktop layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (fixed)                                             │
├──────────────────────┬──────────────────────┬──────────────┤
│  LEFT PANEL (360px)  │  CHAT WINDOW (flex)  │  INFO PANEL  │
│  ─────────────────  │  ────────────────────  │  (320px,     │
│  Search bar          │  Chat header          │  collapsible)│
│  Active Now row      │  Messages area        │              │
│  New Chat button (+) │  Typing indicator     │  Profile info│
│  Chat list items     │  Input area           │  Shared media│
│                      │                       │  Shared files│
└──────────────────────┴──────────────────────┴──────────────┘
```

**Mobile layout:** Full-screen chat list OR full-screen chat window (back button to return to list). Swipe right to go back.

**Chat List Item spec:**
- Avatar (50px) with online dot (bottom-right, green pulse)
- Bold name (unread) or normal name (read)
- Last message preview: truncated 35 chars. Shows `[Photo]`, `[Video]`, `[Voice message]`, `[Sticker]`, `You: [text]` for sent
- Timestamp: "now" → "2m" → "1h" → "Mon" → "Jan 12"
- Unread badge: yellow circle, "99+" max
- Hover: gray background with opacity transition; shows "···" options icon (Archive / Mute / Mark unread / Delete)
- Active conversation: yellow left border + slightly highlighted background

**Active Now horizontal scroll row:**
- Shows friends who are currently online
- Avatar (40px) with green ring + name below (truncated 8 chars)
- Horizontal scroll with momentum
- Scroll arrows fade in on hover

**Chat Search:**
- As user types: instant filter of conversation list (no API call needed, filter from loaded list)
- Shows "People" section (search all users), "Messages" section (search within conversations)

*Save Progress.*

---

## PROMPT-04.B — Chat Window (Full Specification)

**Chat Header:**
```jsx
<ChatHeader>
  <BackButton />        // mobile only, spring animation
  <Avatar online />
  <div>
    <Name />            // click → profile
    <Status />          // "Active now" | "Active 3 min ago" | "Active today"
  </div>
  <PhoneCallBtn />      // audio call
  <VideoCallBtn />      // video call
  <SearchBtn />         // search in conversation → filter messages
  <InfoBtn />           // toggle right info panel
</ChatHeader>
```

**Messages Area:**
- `display: flex; flex-direction: column-reverse` — newest messages at bottom, old ones scroll up
- Virtualized list (`react-window`) for performance on long conversations
- Date separators between different days: "Today" / "Yesterday" / "Mon, Jan 12"
- Message grouping: consecutive messages from same sender within 2 minutes → grouped (only first shows avatar, rest indented)
- Scroll-to-bottom button: appears when user scrolled up, shows unread count badge
- Infinite scroll: load older messages when scrolled to top

**Message Bubble Specifications:**

Sent (right side):
```css
background: var(--brand);
color: white;
border-radius: 18px 18px 4px 18px;
max-width: 70%;
box-shadow: 0 1px 2px rgba(0,0,0,0.12);
```

Received (left side):
```css
background: var(--bg-input);
color: var(--text-1);
border-radius: 18px 18px 18px 4px;
max-width: 70%;
```

**Bubble entrance animation:** Sent bubbles slide from right (x: 20→0, spring). Received from left (x: -20→0, spring).

**Bubble right-click / long-press context menu:**
```
┌──────────────────┐
│ 😀 Add Reaction  │ → opens emoji row (6 emojis + more)
│ ↩️  Reply         │ → shows quote bar in input
│ ➡️  Forward       │ → conversation picker
│ 📋 Copy Text     │
│ 📌 Pin Message   │ (admin/owner)
│ ✏️  Edit          │ (own, within 5 min)
│ 🗑️  Delete for Me│
│ 🗑️  Delete for All│ (own, within 10 min)
│ ⚡ React          │
│ 🚩 Report        │
└──────────────────┘
```
Appears with Framer Motion `popIn` from click/long-press origin point.

**Message Types rendering:**

| Type | Component | Interaction |
|------|-----------|-------------|
| Text | Yellow/gray bubble, linkified | Copy |
| Image | Rounded thumbnail (300px max) | Lightbox (pinch-zoom on mobile) |
| Multiple images | 2×2 grid collage | Lightbox carousel |
| Video | Thumbnail + ▶ + duration | Inline player |
| Audio | Waveform bars + play/pause + timer | Plays inline |
| Voice | Same as audio + "Voice message" label | Plays inline |
| Document | File icon (colored by type) + name + size + download | Download |
| GIF | Auto-plays, loops | — |
| Sticker | 200×200px transparent PNG, no bubble bg | — |
| Link preview | Thumbnail + title + domain card | Opens link |
| Emoji only (1-3) | Displayed at 3× size, no bubble background | — |
| Story reply | Special card: preview of story + "Replied to your story" | — |
| Call ended | Call icon + "Voice/Video call · Xm Xs" | — |
| System | Centered gray text (e.g., "You are now connected") | — |

**Reactions on messages:**
- Small emoji appears bottom-right of bubble with count
- Click reaction → reaction details modal (who reacted with what)

**Read receipts:**
- Single gray tick: sent to server
- Double gray tick: delivered to device
- Double blue tick: read by recipient
- Only show on last sent message (not every bubble)

**Typing indicator:**
- Shows "[Name] is typing..." with three animated dots (wave animation)
- For group: "[Name1] and [Name2] are typing..." or "Several people are typing..."
- Disappears 4s after last keystroke from sender

*Save Progress.*

---

## PROMPT-04.C — Message Input Area

**Full spec:**
```
[+]  [🖼️]  [🎵]  [📎]  [😀]  [🎤]     [  Aa — textarea  ]     [➤ Send]
                                         (auto-grows, max 4 rows)
```

- When textarea is empty: right side shows microphone (voice record) button
- When typing: right side switches to Send button (Framer Motion `AnimatePresence`)
- `Enter` = send, `Shift+Enter` = new line

**+ button (Attachment menu):** Opens upward sticker-card menu:
```
[📷 Photo/Video] [📄 Document] [📍 Location] [💰 Coin Gift] [🎁 Sticker Pack]
```

**Image/Video button:** Opens file picker filtered to images/videos. Selected files show preview row above input. Each preview has × to remove. Supports paste from clipboard (auto-detects image paste).

**Document button:** File picker. Returns: file icon + name + size in preview.

**Emoji picker:** Opens above input with Framer Motion `scaleIn`. Full emoji picker (emoji-picker-react). Search emojis. Click appends to textarea cursor position.

**GIF picker:** Giphy integration. Search bar → grid of GIFs → click to send directly.

**Sticker picker:** Built-in sticker packs (custom designed SVG stickers in 4 packs: Emotions, Fun, Reactions, MindBook Exclusive). Click to send.

**Voice recorder:**
```
Initial: mic icon button (hold to record)
Recording state:
  [🔴 0:00] ━━━━━━━━━━━━━━━━━━ [Waveform — animated bars] ━━━━━ [✕ Cancel] [✓ Send]
  Swipe left → cancel
  Swipe up → lock (record hands-free without holding)
  Release → send
  Maximum: 2 minutes, countdown warning at 10s remaining
```
Uses `navigator.mediaDevices.getUserMedia({ audio: true })` and MediaRecorder API.

**Link preview:**
When user pastes a URL into textarea:
- Debounce 1s → fetch OG metadata from `/api/preview-link?url=...` (backend fetches, returns title/description/image/domain)
- Preview card appears above input: thumbnail + title + domain
- × button to remove preview
- Sends as message with `mediaType: 'link-preview'`

*Save Progress.*

---

## PROMPT-04.D — Voice & Video Calls (WebRTC)

**Architecture:**
```
Socket.IO for signaling (offer/answer/ICE candidates/call events)
WebRTC RTCPeerConnection for actual media
STUN servers: stun.l.google.com:19302 (free, no auth required)
```

**Call Flow:**

Caller side:
1. Click phone/video icon → `startCall(userId, type)` 
2. Get local media stream (`getUserMedia`)
3. Show "Calling [Name]..." screen with pulsing avatar ring animation
4. Emit `call-offer` via Socket.IO with SDP offer
5. If no answer within 30s → auto-cancel, show "No answer" toast

Recipient side:
1. Socket receives `call-incoming` event
2. Show incoming call modal (full-screen overlay, or top-banner if already in chat)
3. Ringtone audio plays (HTML5 Audio, stop on action)
4. Three buttons: Accept (green ▶) / Decline (red ✕) / Reply with message (💬)

Connected call:
1. ICE candidates exchanged via Socket.IO events
2. RTCPeerConnection established
3. Remote stream displayed, local stream shown in PiP

**Audio Call Window (`<AudioCallModal />`):**
```jsx
<div className="call-window audio">
  <div className="call-bg" />          // blurred avatar background
  <Avatar size={120} />
  <PulseRing />                        // yellow animated rings expand outward while connecting
  <Name />
  <CallStatus />                       // "Connecting..." → "00:04:21" (timer)

  <div className="call-controls">
    <ControlBtn icon="Mic"       label="Mute"      active={muted}    />
    <ControlBtn icon="PhoneOff"  label="End"       variant="danger"  onClick={endCall} />
    <ControlBtn icon="Speaker"   label="Speaker"   active={speaker}  />
    <ControlBtn icon="Video"     label="Switch"    onClick={switchToVideo} />
    <ControlBtn icon="Add"       label="Add"       onClick={addParticipant} />
  </div>
</div>
```

**Video Call Window (`<VideoCallModal />`):**
```jsx
<div className="call-window video fullscreen">
  <video id="remote" autoPlay playsinline />    // full screen, object-fit: cover
  <video id="local" className="pip" draggable /> // 120×160px, bottom-right, draggable via @use-gesture/react

  <AnimatedControlBar>  // auto-hides after 3s of no movement, re-appears on move/tap
    <ControlBtn icon="Mic"         active={muted}     />
    <ControlBtn icon="Video"       active={cameraOff} />
    <ControlBtn icon="ScreenShare" onClick={shareScreen} />
    <ControlBtn icon="Expand"      onClick={fullscreen} />
    <ControlBtn icon="PiP"         onClick={enterPiP}   />
    <ControlBtn icon="PhoneOff"    variant="danger" label="End" onClick={endCall} />
  </AnimatedControlBar>
</div>
```

**Group Calls (up to 8):**
- Tiled grid: 1=full, 2=side-by-side, 3-4=2×2, 5-6=2+4 mix, 7-8=3×3 with active speaker larger
- Active speaker: detected by audio level → yellow border pulse animation
- Add participant button in call → friend picker

**Call History:**
- Saved to `CallLog` model: type, participants, duration, startedAt, endedAt, status (answered/missed/declined)
- Shown in chat as system message bubble
- `/calls` page: list of recent calls with call back button

**Socket.IO Events:**
```
call-offer       → { to, offer, type }
call-answer      → { to, answer }
ice-candidate    → { to, candidate }
call-declined    → { to }
call-ended       → { to }
call-busy        → { to }
call-incoming    → { from, fromName, fromAvatar, type }
```

*Save Progress after each call subsystem.*

---

## PROMPT-04.E — Media Sharing in Chat (Complete)

**Backend upload route (`POST /api/messages/upload`):**

```javascript
// Multer config:
// Destination: uploads/messages/
// Max file size: 50MB
// Allowed types: images (jpg/png/gif/webp), videos (mp4/mov/avi/webm),
//                audio (mp3/m4a/ogg/wav), documents (pdf/doc/docx/xls/xlsx/ppt/txt/zip)
// Returns: { mediaUrl, mediaType, metadata: { fileName, fileSize, mimeType, width, height, duration } }

// Image: use sharp to create thumbnail (300×300, WebP)
// Video: use fluent-ffmpeg to extract first frame as thumbnail
// Audio: return duration via ffprobe
// Document: return file icon based on extension
```

**Upload progress UI:**
```jsx
// MediaPreviewModal.jsx
// Before sending:
// - Shows thumbnail preview (or file icon for documents)
// - File name + formatted file size
// - Optional caption input
// - "Send" button → shows circular SVG progress ring (0–100%)
//   progress calculated from axios onUploadProgress callback
// - "Cancel" button → aborts upload (axios CancelToken)
// Error state: shake animation + "Upload failed. Retry?"
```

**File type icons:** Use lucide-react icons colored by type:
- PDF → red FileText
- DOC/DOCX → blue FileText
- XLS/XLSX → green FileSpreadsheet
- PPT/PPTX → orange Presentation
- ZIP/RAR → yellow Archive
- MP3/Audio → purple Music
- Other → gray File

*Save Progress.*

---

## PROMPT-04.F — Group Chats

**Create Group Chat flow:**
1. Press "+" in left panel → "New Group Chat"
2. Step 1: Search and select friends (click adds chip, click chip removes)
3. Step 2: Set group name (required) + group icon (upload or choose from emoji picker)
4. Create → enters group chat immediately
5. System message: "Group created by [Name]"

**Group Info Drawer (right panel):**
- Group name (editable by admin) + group icon (editable by admin)
- Member count + "Add people" button (opens friend picker)
- Pinned messages (up to 3)
- Member list: each shows avatar + name + role badge (Admin/Mod) + Remove button (admin only)
- Shared media grid (images/videos sent in group)
- Shared files list
- Leave Group button / Delete Group button (admin)

**Group Admin Features:**
- Rename group
- Change group icon
- Add/remove members
- Promote to admin/mod
- Demote admin/mod
- Kick member (remove without ban)
- Pin message (up to 3)
- Mute member (can't send for 24h / 7d / indefinitely)

*Save Progress.*

---

## PROMPT-04.G — Message Requests Tab

**Separate section in left panel — "Message Requests" link:**
- Non-friends who message you land here
- Shows preview: avatar + name + first message (blurred text for privacy)
- One-message limit: non-friend can only send 1 message before acceptance
- Actions per request: Accept (moves to main inbox) / Delete / Block
- Batch actions: Accept All / Delete All
- Banner in chat window: "[Name] wants to send you a message. You can accept or decline."

*Save Progress.*

---

## PROMPT-04.H — Advanced Chat Features

**Message Search (within conversation):**
- Click search icon in chat header → search bar slides down
- Type to filter messages (highlights matching text in yellow)
- Navigation arrows (↑↓) to jump between results
- "N results" counter
- ESC to close search, restore normal view

**Pinned Messages:**
- Up to 3 messages pinnable per conversation
- Banner at top of chat: "📌 [Pinned message preview] ▸" (collapsible)
- Click banner → scrolls to pinned message (with yellow highlight flash)
- Multiple pins: click banner → side panel showing all pinned messages

**Jump to Date:**
- In conversation options menu → "Jump to date" → date picker → scrolls to nearest message

**Chat Themes:**
- Conversation options menu → "Change theme"
- Options: Default (yellow) / Midnight / Ocean / Sunset / Forest / Monochrome
- Sent bubble color changes with theme
- Chat background pattern changes with theme
- Animated transition between themes

**Disappearing Messages:**
- Conversation options → "Disappearing messages" → toggle (1 hour / 1 day / 7 days / Off)
- Messages auto-delete on all devices after the set time
- Small ⏱️ icon appears on messages in disappearing mode

*Save Progress.*

---

# PROMPT-05 — Unified Video Hub with YouTube Integration

**Trigger:** `Run PROMPT-05`
**Goal:** A world-class video experience combining MindBook-native content with YouTube, distinguished clearly by source badges.

---

## PROMPT-05.A — Video Hub Architecture

**Route structure:**
```
/watch                    → Hub home (mixed feed)
/watch/trending           → Trending videos (mixed)
/watch/mindbook           → MindBook-only videos
/watch/youtube            → YouTube-only videos
/watch/subscriptions      → From followed users + followed YT channels
/watch/history            → Watch history (both sources)
/watch/saved              → Watch later list (both sources)
/watch/playlists          → User playlists
/watch/video/:id          → MindBook native video player
/watch/yt/:youtubeId      → YouTube embedded player with MindBook layer
/watch/live               → Live streams
/channel/:userId          → User's channel page
```

**Video Hub Sidebar (240px, desktop only):**
```
🏠 Home
🔥 Trending
📺 Subscriptions
🕐 History
🔖 Watch Later
👍 Liked Videos
📁 Playlists
── Your Channel ──
📤 Upload Video
📊 Creator Analytics
```

*Save Progress.*

---

## PROMPT-05.B — Source Badge System

**Every single video card and player page must show a source badge. No exceptions.**

```jsx
const SOURCE_CONFIG = {
  mindbook: {
    label: 'MindBook',
    logo: <MindBookIcon />,     // yellow 'M' mark
    color: '#F7B928',
    bg: 'rgba(247,185,40,0.18)',
    border: 'rgba(247,185,40,0.4)'
  },
  youtube: {
    label: 'YouTube',
    logo: <YouTubeIcon />,      // red YouTube play button
    color: '#FF0000',
    bg: 'rgba(255,0,0,0.14)',
    border: 'rgba(255,0,0,0.3)'
  },
  user: {
    label: null,
    logo: <UserAvatar />,       // uploader's avatar
    color: null,
    bg: 'rgba(0,0,0,0.5)',
    border: 'transparent'
  }
};

// Badge position: top-right corner of thumbnail
// Style: rounded pill, semi-transparent bg, icon + label
// Size: small on grid cards, large in player header
```

*Save Progress.*

---

## PROMPT-05.C — Video Card Component

```jsx
<VideoCard source="youtube|mindbook|user">
  <div className="thumbnail" onMouseEnter={startPreview} onMouseLeave={stopPreview}>
    <img src={thumbnailUrl} alt={title} loading="lazy" />
    <video ref={previewRef} src={previewUrl} muted loop /> // starts after 800ms hover on desktop
    <DurationBadge>{formatDuration(duration)}</DurationBadge> // bottom-right
    <SourceBadge source={source} />                           // top-right
    {isLive && <LiveBadge>LIVE</LiveBadge>}                   // top-left, pulsing red dot
    {watchProgress > 0 && (
      <ProgressBar percent={watchProgress} />  // thin yellow line at bottom
    )}
    <WatchLaterBtn className="appear-on-hover" />
  </div>
  <div className="card-info">
    <Avatar size={36} src={channelAvatar} onClick={→ channel} />
    <div className="meta">
      <Title lines={2}>{title}</Title>
      <ChannelName verified={isVerified}>{channelName}</ChannelName>
      <MetaRow>
        <span>{formatViews(viewCount)} views</span>
        <span>·</span>
        <span>{timeAgo(publishedAt)}</span>
        <span>·</span>
        <SourceLabel source={source} />
      </MetaRow>
    </div>
    <MoreBtn dropdown={[
      'Not interested',
      'Don\'t recommend channel',
      'Save to Watch Later',
      'Add to playlist',
      'Share',
      'Report'
    ]} />
  </div>
</VideoCard>
```

**Hover animation (desktop):**
- Thumbnail: `scale(1.04)` smooth
- Preview video starts (muted, loop)
- Card: `translateY(-4px)` + shadow deepens
- WatchLater button slides in from top-right

**Netflix row hover (horizontal scroll rows):**
- Hovered card expands: `scale(1.08)` + quick-action buttons appear below thumbnail (▶ Play / + Watch Later / ❤ Like / ··· More)
- Adjacent cards slightly compress

*Save Progress.*

---

## PROMPT-05.D — YouTube API Integration

**Backend Service (`backend/services/youtube.js`):**

```javascript
const { google } = require('googleapis');
const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

// In-memory cache (replace with Redis in production)
const cache = new Map();
const getCache = (key, ttl) => { const e = cache.get(key); return (e && Date.now()-e.t < ttl) ? e.d : null; };
const setCache = (key, data) => cache.set(key, { d: data, t: Date.now() });

class YouTubeService {
  async getTrending(regionCode='US', maxResults=20, pageToken=null) {
    const ck = `trending-${regionCode}-${pageToken}`;
    const cached = getCache(ck, 15*60*1000); // 15min TTL
    if (cached) return cached;
    const res = await youtube.videos.list({ part:['snippet','contentDetails','statistics'], chart:'mostPopular', regionCode, maxResults, pageToken });
    const result = { videos: res.data.items.map(v => this.format(v)), nextPageToken: res.data.nextPageToken };
    setCache(ck, result);
    return result;
  }

  async search(q, maxResults=20, pageToken=null) {
    const ck = `search-${q}-${pageToken}`;
    const cached = getCache(ck, 5*60*1000); // 5min TTL
    if (cached) return cached;
    const res = await youtube.search.list({ part:['snippet'], q, type:['video'], maxResults, pageToken, safeSearch:'moderate' });
    const result = { items: res.data.items.map(i => this.formatSearch(i)), nextPageToken: res.data.nextPageToken };
    setCache(ck, result);
    return result;
  }

  async getVideo(videoId) {
    const ck = `video-${videoId}`;
    const cached = getCache(ck, 60*60*1000); // 1hr TTL
    if (cached) return cached;
    const res = await youtube.videos.list({ part:['snippet','contentDetails','statistics'], id:[videoId] });
    const result = this.format(res.data.items[0]);
    setCache(ck, result);
    return result;
  }

  async getChannelVideos(channelId, maxResults=20) {
    const res = await youtube.search.list({ part:['snippet'], channelId, type:['video'], order:'date', maxResults });
    return res.data.items.map(i => this.formatSearch(i));
  }

  format(item) {
    const d = item.contentDetails?.duration;
    return {
      source: 'youtube',
      youtubeId: item.id?.videoId || item.id,
      title: item.snippet?.title,
      description: item.snippet?.description?.slice(0, 300),
      thumbnailUrl: item.snippet?.thumbnails?.maxres?.url || item.snippet?.thumbnails?.high?.url,
      channelTitle: item.snippet?.channelTitle,
      channelId: item.snippet?.channelId,
      publishedAt: item.snippet?.publishedAt,
      duration: d ? this.parseDuration(d) : null,
      viewCount: parseInt(item.statistics?.viewCount || 0),
      likeCount: parseInt(item.statistics?.likeCount || 0),
      isLive: item.snippet?.liveBroadcastContent === 'live',
      embedUrl: `https://www.youtube.com/embed/${item.id?.videoId || item.id}?autoplay=1&rel=0`
    };
  }

  formatSearch(item) { return this.format({ ...item, id: item.id.videoId }); }

  parseDuration(iso) {
    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    return (parseInt(m[1]||0)*3600 + parseInt(m[2]||0)*60 + parseInt(m[3]||0));
  }
}

module.exports = new YouTubeService();
```

**API Routes:**
```
GET /api/youtube/trending?region=US&pageToken=...
GET /api/youtube/search?q=...&pageToken=...
GET /api/youtube/video/:youtubeId
GET /api/youtube/channel/:channelId/videos
```

**Rate limit protection:** YouTube API quota = 10,000 units/day. Each `videos.list` = 1 unit. `search.list` = 100 units. Cache aggressively. Log quota usage daily. Alert admin when usage > 80%.

*Save Progress.*

---

## PROMPT-05.E — Video Hub Home Page (`/watch`)

**Layout:** Left sidebar + main content. No right sidebar (more space for videos).

**Main content sections:**

```
[Search bar — "Search MindBook and YouTube"] [Filter chips: All | MindBook | YouTube | Live | Today]

▶ CONTINUE WATCHING                                           [See all →]
[card w/ progress bar] [card] [card] [card] ─── horizontal scroll

🔥 TRENDING NOW — Mixed sources                              [See all →]
[YT badge card] [MB badge card] [MB] [YT] [MB] ─── horizontal scroll

📺 FROM PEOPLE YOU FOLLOW                                    [See all →]
[user card] [user card] [user card] ─── horizontal scroll

🎯 YOUTUBE — FOR YOU                                         [See all →]
[YT card] [YT card] [YT card] [YT card] ─── horizontal scroll

🆕 NEW FROM MINDBOOK                                         [See all →]
[MB card] [MB card] [MB card] [MB card] ─── horizontal scroll

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MAIN GRID — Mixed sources, 4 columns desktop / 3 tablet / 2 mobile / 1 smallest
  [card] [card] [card] [card]
  [card] [card] [card] [card]
  [infinite scroll, load 20 more on intersection]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**3D Three.js header animation (desktop):**
- Slowly rotating 3D play button (triangle geometry, yellow metallic material)
- Floating particle field behind it
- Canvas overlaid on header area, z-index below content

*Save Progress.*

---

## PROMPT-05.F — Video Player Pages

**MindBook Native Video Player (`/watch/video/:id`):**

Custom HTML5 video player:
```jsx
<VideoPlayer>
  <video ref={videoRef} src={videoUrl} />

  <Controls className="controls-bar">  // auto-hide 3s after no mouse move, Framer Motion y animation
    <PlayPause />          // Space key shortcut
    <SeekBar>              // shows buffer (gray) + played (yellow) + hover timestamp tooltip
      <BufferProgress />
      <PlayedProgress />
      <HoverTimestamp />
    </SeekBar>
    <Volume>               // M key = mute; scroll on volume = adjust ±5%
      <MuteBtn />
      <VolumeSlider />
    </Volume>
    <Duration />           // "1:24 / 5:32"
    <Spacer />
    <QualitySelector />    // Auto / 1080p / 720p / 480p / 360p
    <SpeedSelector />      // 0.25× / 0.5× / 0.75× / 1× / 1.25× / 1.5× / 2×
    <CaptionsBtn />
    <TheatreMode />        // expands player width, shrinks sidebar
    <PiPBtn />             // native browser Picture-in-Picture API
    <FullscreenBtn />      // F key shortcut
  </Controls>
</VideoPlayer>
```

Keyboard shortcuts:
- Space / K = play/pause
- M = mute
- F = fullscreen
- T = theatre mode
- I = picture-in-picture
- Arrow left/right = ±10 seconds (± 5s with Shift)
- Arrow up/down = volume ±5%
- 0-9 = jump to 0%-90%
- C = toggle captions

**Below player:**
```jsx
<VideoMeta>
  <Title />
  <MetaRow>
    <ViewCount /> · <PublishedDate />
    <SourceBadge source="mindbook" size="large" />
  </MetaRow>
  <ActionBar>
    <LikeBtn count={likeCount} />
    <DislikeBtn />   // hidden count, only feedback
    <ShareBtn />     // share modal
    <SaveBtn />      // add to Watch Later or playlist
    <DownloadBtn />  // if creator allowed downloads
    <ReportBtn />
  </ActionBar>
  <ChannelInfo>
    <Avatar /><ChannelName /><SubscribeBtn />
    <SubscriberCount />
  </ChannelInfo>
  <Description expandable maxLines={3} />
</VideoMeta>

<MindBookComments videoId={id} source="mindbook" />

<RelatedVideos />  // 3-col sidebar on desktop, below on mobile
```

**YouTube Video Player (`/watch/yt/:youtubeId`):**

```jsx
<YouTubeVideoPage>
  <div className="yt-player-wrapper">  // 16:9, responsive
    <iframe
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
      allow="autoplay; fullscreen"
      allowFullScreen
    />
  </div>
  <SourceBadge source="youtube" size="large" />  // prominent
  <VideoTitle />
  <MetaRow>
    <ViewCount /> · <PublishedDate />
    <ExternalLink href={`https://youtube.com/watch?v=${youtubeId}`}>
      Watch on YouTube ↗
    </ExternalLink>
  </MetaRow>
  <ActionBar>
    <LikeBtn />    // stored in MindBook DB
    <SaveBtn />    // MindBook Watch Later
    <ShareBtn />   // share MindBook URL + option to share YouTube URL
    <PlaylistBtn />
  </ActionBar>
  <ChannelInfo channelId={channelId} />
  <MindBookComments videoId={youtubeId} source="youtube" />  // MindBook-native comments
  <RelatedVideos source="mixed" />
</YouTubeVideoPage>
```

*Save Progress.*

---

## PROMPT-05.G — Unified Video Search

**`GET /api/watch/search?q=...&source=all|mindbook|youtube&page=1`**

Backend logic:
1. If source=all or source=mindbook: query MindBook `Video` collection full-text search (`$text: { $search: q }`)
2. If source=all or source=youtube: call `youtubeService.search(q)`
3. Merge results, add `source` field to each
4. Sort by relevance (MindBook results use MongoDB score, YouTube results use YouTube's ranking)
5. Return paginated merged array

**Frontend search results page:**
- Tabs: **All** · **MindBook** · **YouTube** · **Live**
- Each result card shows source badge prominently
- Filter chips: relevance / date / view count

*Save Progress.*

---

# PROMPT-06 — Perfect News Feed (Facebook Parity)

**Trigger:** `Run PROMPT-06`
**Goal:** A news feed that is functionally identical to Facebook's but visually superior.

---

## PROMPT-06.A — Navbar (Pixel Perfect)

```
LEFT:   [M logo 40px]  [🔍 Search — expands to 380px on click]
CENTER: [🏠 Home] [📺 Watch] [👥 Groups] [🎮 Gaming] [🎵 Marketplace]
        ↑ each 50px wide, hover=gray bg, active=yellow 3px underline (smooth sliding indicator)
RIGHT:  [+ Create] [💬 Messenger] [🔔 Notifications] [⚙️ Account avatar ▾]
```

- Logo: SVG inline, yellow 'M' on white/transparent background
- Active tab indicator: `position: absolute; bottom: 0; height: 3px; background: var(--brand); border-radius: 2px 2px 0 0;` — slides horizontally with `motion.div` `layoutId`
- Search: AnimatePresence for expand/collapse
- Messenger icon: shows unread bubble count (red, yellow for ≥1 message)
- Notification bell: shows count; swings CSS animation on new notification (`@keyframes bell-swing`)
- Account dropdown (click avatar):
  ```
  [Avatar] [Name] [See your profile]
  ─────────────────────────────────
  [⚙️ Settings & privacy]
  [❓ Help & support]
  [🌙 Display & Accessibility]
  [🚪 Log out]
  ```
  Opens with Framer Motion `scaleIn` from top-right origin.

**Navbar scroll behavior:**
- On scroll > 20px: add `backdrop-filter: blur(12px); box-shadow: var(--shadow-md);`
- Smooth CSS transition: 200ms

*Save Progress.*

---

## PROMPT-06.B — Three-Column Feed Layout

```css
/* Exact layout implementation */
.app-grid {
  display: grid;
  grid-template-areas: "left center right";
  grid-template-columns: var(--sidebar-l) 1fr var(--sidebar-r);
  gap: 16px;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: calc(var(--navbar-h) + 16px) 16px 16px;
}
.sidebar-left  { grid-area: left;   position: sticky; top: calc(var(--navbar-h) + 16px); height: calc(100vh - var(--navbar-h) - 32px); overflow-y: auto; scrollbar-width: none; }
.feed-center   { grid-area: center; min-width: 0; }
.sidebar-right { grid-area: right;  position: sticky; top: calc(var(--navbar-h) + 16px); height: calc(100vh - var(--navbar-h) - 32px); overflow-y: auto; scrollbar-width: none; }

@media (max-width: 1279px) { .app-grid { grid-template-columns: var(--sidebar-l) 1fr; grid-template-areas: "left center"; } .sidebar-right { display: none; } }
@media (max-width: 1023px) { .app-grid { grid-template-columns: 60px 1fr; } }
@media (max-width: 767px)  { .app-grid { grid-template-columns: 1fr; grid-template-areas: "center"; padding-bottom: calc(var(--bottom-nav-h) + 16px); } .sidebar-left { display: none; } }
```

**Left Sidebar items** (icon + label, icon-only on 60px collapse):
```
[Avatar + Name → profile] 
──────────────────────────
🏠 Home
👤 Profile
👥 Friends [badge]
💬 Messages [badge]
📺 Watch
🛒 Marketplace
🎮 Gaming
🗓️ Events
📝 Articles
🎵 Audio Rooms
💼 Jobs
💰 Fundraisers
🕐 Memories
📦 Saved
──────────────────────────
[Your Groups shortcut — up to 5]
──────────────────────────
⚙️ Settings
🌙 Dark Mode [toggle]
──────────────────────────
[Developer links section:]
🌐 Portfolio  ← farmanullah1.github.io/My-Portfolio
in LinkedIn   ← linkedin.com/in/farmanullah-ansari
🐙 GitHub     ← github.com/farmanullah1
──────────────────────────
Privacy · Terms · © 2026 MindBook
```

**Sidebar entrance animation:** Items cascade in with 50ms stagger, slide from x:-20 (only on first page load, flag in sessionStorage).

*Save Progress.*

---

## PROMPT-06.C — Post Composer (Full Detail)

**Step 1 — Mini composer card (always visible in feed):**
```
┌────────────────────────────────────────────────────────┐
│ [Avatar]  [What's on your mind, [Name]? — click]      │
├────────────────────────────────────────────────────────┤
│ [🖼️ Photo/Video]  [😊 Feeling/Activity]  [📍 Location]│
└────────────────────────────────────────────────────────┘
```
Clicking anywhere opens the full composer modal.

**Step 2 — Full composer modal:**
```
┌──────── Create Post ─────────────── ✕ ─┐
│                                         │
│ [Avatar] [Name]  [🌍 Friends ▾]        │
│           audience selector dropdown    │
│                                         │
│ [Tabs: 📝Post | 📷Photo | 📹Video | 🔴Live | 😊Feeling | 📍Check in]
│                                         │
│ ─────────────────────────────────────── │
│ [textarea — "What's on your mind?"    ] │
│ [  auto-grows, min 120px, max 320px   ] │
│ [  linkified, @mention, #hashtag      ] │
│ [  Ctrl+B bold, Ctrl+I italic         ] │
│ [  character counter — 5000 max       ] │
│ ─────────────────────────────────────── │
│ [background color picker row:]          │
│ [⬜] [🟡] [🟠] [🔴] [🟣] [🔵] [⬛]  │
│ (text-only posts can have colored bg)   │
│ ─────────────────────────────────────── │
│ [Media preview grid — up to 4 images]  │
│ ─────────────────────────────────────── │
│ [Add to your post:]                     │
│ [📷 Photo/Video] [😊 Feeling/Activity] │
│ [📍 Check in] [🏷️ Tag People]         │
│ [📅 Life Event] [📊 Poll]              │
│ [🎨 Background] [⏰ Schedule]          │
│ ─────────────────────────────────────── │
│ [Audience: 🌍 Friends ▾]  [Schedule 📅]│
│ [     Post (yellow, full width)       ] │
└─────────────────────────────────────────┘
```

**Audience selector dropdown:**
```
🌍 Public — Anyone
👥 Friends — Your friends only
👥 Friends except... — Exclude specific people
👤 Specific friends — Show only to selected people
🔒 Only me
📋 [List name] — if custom lists exist
```

**Poll tab:**
- Question input
- Up to 5 option inputs (Add Option button)
- Duration: 1d / 3d / 1 week / 2 weeks
- Multiple choice toggle
- Anonymous voting toggle

**Check-in tab:**
- Auto-detect location (Geolocation API) → suggests nearby places (Nominatim/OpenStreetMap)
- Manual search input
- Shows map pin preview (Leaflet.js)

**@mention autocomplete:**
- As user types `@` → shows friends dropdown filtered by what follows
- Arrow keys navigate, Enter selects, ESC closes
- Selected mentions are highlighted in yellow in the textarea

**#hashtag autocomplete:**
- As user types `#` → shows trending hashtags
- AI-suggested hashtags appear as chips below textarea (debounced, API call to Claude)

**Post submission:**
1. Click Post → show loading overlay on button (spinner)
2. POST to `/api/posts`
3. On success: modal closes, new post slides into feed at top (Framer Motion: y:-40→0, opacity 0→1, height 0→auto)
4. Toast: "Post published ✓"

*Save Progress.*

---

## PROMPT-06.D — Post Card (Full Specification)

```jsx
<PostCard post={post}>
  <PostHeader>
    <Avatar size={40} src={post.user.profilePicture} onClick={→ profile} />
    <div>
      <Name onClick={→ profile}>{post.user.name}</Name>
      <MetaRow>
        <Timestamp>{timeAgo(post.createdAt)}</Timestamp>
        <Dot />
        <PrivacyIcon privacy={post.privacy} />
        {post.feeling && <span>— feeling {post.feeling.emoji} {post.feeling.label}</span>}
        {post.location && <span>📍 {post.location.name}</span>}
      </MetaRow>
    </div>
    {!isOwn && !isFriend && <FollowBtn userId={post.user._id} />}
    <PostOptionsMenu>
      {isOwn ? [
        'Edit post',
        'Delete post',
        'Pin to profile',
        'Add to story',
        'Turn off notifications',
        'Change audience',
        'Embed post'
      ] : [
        'Save post',
        'Follow [Name]',
        'Hide post',
        'Snooze [Name] for 30 days',
        'Hide all from [Name]',
        'Report post',
        'Why am I seeing this?',
        'Copy link to post'
      ]}
    </PostOptionsMenu>
  </PostHeader>

  <PostContent>
    <TextContent>{linkify(hashtagify(mentionify(post.content)))}</TextContent>
    {post.content.length > 300 && <SeeMoreBtn />}
    <MediaGrid images={post.images} videos={post.videos} />
    {post.poll && <PollWidget poll={post.poll} />}
    {post.linkPreview && <LinkPreviewCard data={post.linkPreview} />}
    {post.youtubeId && <YouTubeEmbed id={post.youtubeId} badge />}
    {post.backgroundColor && <div style={{ background: post.backgroundColor }}>text</div>}
    {post.taggedFriends?.length > 0 && <TaggedFriends friends={post.taggedFriends} />}
    {post.lifeEvent && <LifeEventCard event={post.lifeEvent} />}
  </PostContent>

  <PostStats>
    <ReactionSummary>
      <TopReactionEmojis count={3} />
      <TotalCount>{post.reactions.total}</TotalCount>
    </ReactionSummary>
    <CommentShareCount>
      <span>{post.comments.length} comments</span>
      <span>{post.shares} shares</span>
    </CommentShareCount>
  </PostStats>

  <PostActions>
    <LikeBtn
      reacted={userReaction}
      onHover={showReactionPicker}   // 500ms hover delay
      onClick={toggleLike}
    />
    <CommentBtn onClick={expandComments} />
    <ShareBtn onClick={openShareModal} />
    <SaveBtn onClick={savePost} />
  </PostActions>

  <ReactionPicker visible={pickerVisible}>  // Framer Motion: scales from Like button origin
    {['👍','❤️','😂','😮','😢','😡'].map(emoji => (
      <EmojiBtn key={emoji} emoji={emoji} label={...} onHover={scale(1.4)} onClick={react} />
    ))}
  </ReactionPicker>

  <CommentSection visible={commentsOpen}>
    <CommentsView comments={post.comments} />
    <CommentInput />
  </CommentSection>
</PostCard>
```

**3D tilt on hover (react-parallax-tilt):**
```jsx
<Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable glareMaxOpacity={0.05} scale={1.01} transitionSpeed={500}>
  <PostCard ... />
</Tilt>
```

**Scroll reveal animation:**
```jsx
const { ref, style } = useScrollReveal({ threshold: 0.1, delay: index * 60 });
<animated.div ref={ref} style={style}><PostCard ... /></animated.div>
```

*Save Progress.*

---

## PROMPT-06.E — Reactions System

**6 reactions:** 👍 Like · ❤️ Love · 😂 Haha · 😮 Wow · 😢 Sad · 😡 Angry

**Reaction picker animation:**
1. User hovers Like button for 500ms → picker appears
2. Framer Motion: `scaleX: 0→1, opacity: 0→1` from Like button origin (transform-origin: bottom-left)
3. Each emoji springs in with stagger (40ms)
4. Hovering emoji: `scale: 1.5` with spring, label appears above
5. Click emoji: reaction saved, picker dismisses, Like button changes to chosen reaction emoji + brand color
6. Click same reaction again: unlike (button returns to default gray)
7. Long-press on mobile = picker (500ms hold threshold)

**Like animation on click:**
- Heart icon: scale 0 → 1.8 → 1 (spring), color fills
- 8 yellow particle sparks burst from center outward, fade (canvas-confetti)
- Like count increments optimistically (immediate, syncs to server)

**Reaction summary:**
- Row of top 3 reaction emojis (colored) + total count
- Click → "Reactions" modal: tabs per reaction type + "All" tab, each showing avatar + name

*Save Progress.*

---

## PROMPT-06.F — Comment System

**Comment section (expands inline below post):**

```jsx
<CommentSection>
  <SortSelector>Most relevant | Newest | All comments</SortSelector>

  {comments.map(comment => (
    <Comment key={comment._id}>
      <Avatar size={32} />
      <CommentBubble>
        <AuthorName /> <Text>{comment.text}</Text>
      </CommentBubble>
      <CommentActions>
        <Timestamp />
        <LikeBtn count={comment.likes} />
        <ReplyBtn onClick={openReply} />
        <MoreBtn />
      </CommentActions>

      {comment.replies?.length > 0 && (
        <RepliesSection indent={24}>
          <ShowRepliesToggle count={comment.replies.length} />
          {showReplies && comment.replies.map(reply => <Comment reply ... />)}
        </RepliesSection>
      )}
    </Comment>
  ))}

  <LoadMoreBtn>View more comments</LoadMoreBtn>

  <CommentInput>
    <Avatar size={32} />
    <input placeholder="Write a comment..." onKeyDown={enter=submit} />
    <EmojiBtn />
    <GifBtn />
    <ImageBtn />
  </CommentInput>
</CommentSection>
```

- Comments load 5 at a time ("View more comments" pagination)
- Replies: up to 3 levels deep, indented 24px per level
- Each comment has: like (heart with count), reply, more (report/delete if own)
- Comment like: same heart pop animation as post like
- GIF comments: Giphy picker → sends GIF URL → renders as small GIF image in comment
- Image comments: upload small image → renders in comment bubble

*Save Progress.*

---

## PROMPT-06.G — Right Sidebar

```jsx
<RightSidebar>
  <BirthdayCard />          // "[Name]'s birthday is today 🎂"
  <FriendSuggestions />     // 5 cards: avatar + name + mutual count + "Add Friend"
  <SponsoredSection />      // "Sponsored by MindBook ✓" placeholder
  <ContactsList />          // online friends, alphabetical, green dots
  <GroupActivity />         // 3 posts from joined groups
</RightSidebar>
```

**Contacts list:** Search input. Green dot for online. "Active 2 min ago" for recently active. Click → opens DM. Smooth scroll within contacts list.

*Save Progress.*

---

# PROMPT-07 — Groups, Friends & Settings Deep Dive

**Trigger:** `Run PROMPT-07`

---

## PROMPT-07.A — Groups System (Complete)

*(See full spec in previous versions — implement all group features with these additions:)*

**Group discovery horizontal scroll:** In `/groups` home, show "Suggested for you" as a horizontal scroll row (HorizontalScrollRow component) before the main grid. Cards use 3D tilt on hover.

**Group posts — all types must be implemented:**
- Text, images, videos, polls, events, announcements, file shares
- Welcome post (auto-generated on join)
- Polls: animated yellow progress bars fill on vote

**Group scheduled posts (admin):** Calendar view, posts queued.

**Group insights (admin-only charts):** All Recharts charts with yellow color scheme and entrance animation.

*Save Progress after each group section.*

---

## PROMPT-07.B — Friends System (Complete)

*(See full spec in previous versions — implement all with these animations:)*

**Friend suggestion card hover:** Card lifts, "Message" button slides in from right with spring.

**Send friend request animation:** "Add Friend" button morphs → loading spinner → "✓ Pending" (Framer Motion layoutId morph).

**Accept friend request:** Trigger yellow confetti burst (canvas-confetti, 2 seconds), show "You're now friends with [Name]!" toast.

**Mutual friends modal:** Opens with `modal` variant, mutual friend avatars tile in with stagger.

*Save Progress.*

---

## PROMPT-07.C — Settings (All Sections)

*(See full spec in PROMPT-35 from v4.0 — implement ALL 10 sections. Highlight below:)*

**Settings page animations:**
- Left sidebar nav items: highlight slides (motion.div `layoutId` for active indicator)
- Each section slides in from right on first select (`slideLeft` variant)
- Password strength meter: 4 colored segments, each segment fills with spring animation

**2FA Setup:** QR code displays with `popIn` animation. Backup codes appear one by one with stagger.

**Active Sessions table:** Row hover lifts slightly. "Log out" button animates to confirmation state before executing.

**Data Export:** "Download Your Information" modal with animated zip icon and progress.

*Save Progress after each settings section.*

---

# PROMPT-08 — Portfolio, CV & Personal Branding Pages

**Trigger:** `Run PROMPT-08`

---

## PROMPT-08.A — Developer Links Integration

**Add a permanent "Created by" section to the site in three locations:**

1. **Left sidebar footer** (visible on every page):
```jsx
<div className="developer-credit">
  <p>Created by <strong>Farman Ullah Ansari</strong></p>
  <div className="dev-links">
    <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noopener noreferrer">
      🌐 Portfolio
    </a>
    <a href="https://www.linkedin.com/in/farmanullah-ansari/" target="_blank" rel="noopener noreferrer">
      LinkedIn
    </a>
    <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer">
      🐙 GitHub
    </a>
  </div>
</div>
```

2. **Footer of every page** (below right sidebar): Same links with copyright.

3. **The Creator's MindBook profile** (admin/demo account): Portfolio tab prominently shows all links with styled cards.

*Save Progress.*

---

## PROMPT-08.B — "About MindBook" Page (`/about-mindbook`)

**A stunning showcase page explaining the platform:**

**Hero section:**
- Large heading: "The Social Platform Reimagined"
- Sub-heading: "Built by Farman Ullah Ansari, Full Stack Software Engineer"
- 3D floating 'M' logo (Three.js) in background
- "Explore MindBook" + "View on GitHub" CTAs

**Features showcase section:**
- 6 feature cards in alternating layout (image left/right)
- Each card has icon, feature name, description, and "Learn more" link
- Features: Real-time Messaging / YouTube Integration / Voice & Video Calls / AI Chatbot / Creator Studio / Admin Dashboard
- Scroll reveals with useScrollReveal hook

**Tech stack section:**
- "Built with" heading
- Animated tech icons (MongoDB leaf, React atom, Node.js hexagon, Express, Socket.IO) floating gently
- Each icon: hover shows tooltip with brief description
- 3D rotating tech logo icons using Three.js

**Architecture section:**
- Animated SVG diagram showing frontend → API → backend → database flow
- Arrows animate in sequence (Framer Motion path drawing)
- Text descriptions appear alongside

*Save Progress.*

---

## PROMPT-08.C — "Why I Created MindBook" Page (`/why-mindbook`)

**A personal narrative page:**

**Opening section:**
- Large pull quote: *"I set out to prove that a solo developer can build a world-class social platform."*
- Author photo placeholder + name + title

**Story sections (alternating text/visual):**
1. **The Challenge** — "Facebook-level features. Zero team. One developer."
2. **The Process** — Engineering decisions, tech stack choices, challenges overcome
3. **The Features** — What was built and why each matters
4. **The Skills Demonstrated** — Full stack development, real-time systems, WebRTC, AI integration, cloud architecture, performance optimization, UI/UX design
5. **Future Plans** — Mobile app, international expansion, creator monetization

**CTA section:**
- "Want to see how it was built?"
- Links: GitHub repo / Portfolio / LinkedIn / Contact

**Animations:** Each section scrolls in with cinematic entrance (blur-fade + y-drift). Pull quotes use large animated text (GSAP SplitText-style, characters animate in one by one).

*Save Progress.*

---

## PROMPT-08.D — Platform Landing Page (`/landing`)

**Shown to logged-out users at `/` (redirect logged-in users to `/feed`).**

**Hero:**
- Full-viewport height
- Heading: "MindBook" large, animated character-by-character (GSAP)
- Subheading: "Connect. Create. Belong."
- "Get Started" (yellow) + "Log In" (outlined) CTAs
- Background: Three.js scene — network of connected nodes floating (user avatars connected by lines)
- Subtle animated gradient mesh

**Feature showcase rows (Netflix-style):**
Each row shows an animated mockup/screenshot of the feature:
- "Your world in one feed" — feed mockup
- "Watch everything in one place" — video hub with source badges
- "Real-time conversations" — chat mockup with video call
- "Grow professionally" — LinkedIn features mockup

**Social proof section:**
- "Built with enterprise-grade technology"
- Tech logos: MongoDB / React / Node / Socket.IO / WebRTC / YouTube API / Claude AI

**Footer:** All developer links + platform pages

*Save Progress.*

---

# PROMPT-09 — LinkedIn Professional Features

**Trigger:** `Run PROMPT-09`

*(Implement full spec from PROMPT-30 in v4.0 plus:)*

## PROMPT-09.A — Skills & Endorsements

**Skill endorsement animation:**
1. Click "Endorse" on someone's skill
2. Button shows: loading → "+1 endorser"
3. Floating "+1" animates upward from button, fades
4. Endorser count increments with spring number animation
5. Endorser avatars: new avatar slides in from right

## PROMPT-09.B — Work History Timeline

**Animated SVG timeline on profile About tab:**
- Vertical yellow line
- Each entry: white circle on line, fades in on scroll
- Current job: pulsing yellow dot on circle
- Entries slide in from alternating sides (left/right) with spring

## PROMPT-09.C — Job Board (`/jobs`)

**Application tracker:** Full Kanban board with `@dnd-kit/core`. Cards drag between columns with spring physics. Column count badges animate on change.

*Save Progress after each professional section.*

---

# PROMPT-10 — Instagram Features (Reels, Explore, Stories)

**Trigger:** `Run PROMPT-10`

## PROMPT-10.A — Reels Feed (`/reels`)

*(Full spec from PROMPT-46 v4.0 plus:)*

**Double-tap like:** Large yellow heart appears at exact tap position, floats upward, fades. Like count increments with spring.

**Scroll physics:** Lenis + custom snap logic. Smooth deceleration on swipe, snaps to one reel at a time. Velocity-based: fast swipe = skip multiple.

**Creator follow from reel:** "Follow" button in reel overlay. Tap → instant update (optimistic) + brief confirmation animation.

## PROMPT-10.B — Explore Page (`/explore`)

*(Full spec from PROMPT-47 v4.0 plus:)*

**Masonry grid (react-masonry-css):** Items stagger in (60ms each) using useScrollReveal. Hover shows overlay with like count + comment count.

**Trending algorithm visualization:** Trending badge shows "🔥 Trending" with subtle flame animation (CSS keyframe).

*Save Progress.*

---

# PROMPT-11 — AI MindBot Chatbot

**Trigger:** `Run PROMPT-11`

*(Full spec from PROMPT-33 v4.0 plus:)*

## PROMPT-11.A — Floating Widget

**Animation spec:**
- Collapsed: 56px yellow circle, 'M' bot icon, breathing pulse animation
- Open: expands to 340×480px chat panel (spring: scaleY 0→1 from bottom)
- Message arrival: bubble springs in from bottom-left (received) or bottom-right (sent)
- Typing indicator: three dots with wave animation

**Claude API integration:**
```javascript
// POST /api/mindbot/chat
// Rate limit: 30 messages/user/hour (express-rate-limit)
// Conversation history: last 10 messages stored in req.session (or JWT-based session store)
// System prompt includes: user's name, follower count, recent activity
// Model: claude-sonnet-4-20250514, max_tokens: 600
```

## PROMPT-11.B — MindBot Capabilities (all)

1. Feature help & FAQ
2. Post writing assistant (tone selector: Professional/Casual/Funny/Inspirational)
3. Smart reply suggestions in chat (3 options above input, click to insert)
4. Content summarizer
5. Friend suggestions with AI reasoning
6. Mood check-in with personalized response
7. Voice input (Web Speech API → transcribe → send)
8. Onboarding wizard (new users only, 5-step guide)
9. AI caption generator for uploaded images
10. Hashtag suggestions (real-time as user types post)

*Save Progress.*

---

# PROMPT-12 — Notifications System

**Trigger:** `Run PROMPT-12`

*(Full spec from PROMPT-38 v4.0 plus:)*

## PROMPT-12.A — Real-Time Delivery

```javascript
// Socket.IO event: 'notification'
// On receive:
// 1. Add to notifStore (Zustand)
// 2. Update badge count in navbar
// 3. Swing bell animation (CSS class toggle, 3 swings)
// 4. Show toast notification (slide from right, 5s auto-dismiss)
//    if user is NOT on /notifications page
// 5. Desktop push notification via Web Push API
//    (if permission granted)
```

## PROMPT-12.B — Notification Center (`/notifications`)

**Each notification row:** avatar + text + thumbnail (if post/video) + timestamp + actions.

**Grouping:** Multiple likes on same post → "Name1, Name2, and 3 others liked your post."

**Entrance animation:** Each notification fades in with stagger (40ms). Unread rows have yellow left border.

*Save Progress.*

---

# PROMPT-13 — Additional Features (PROMPT 13-20)

**Trigger:** `Run PROMPT-13` through `Run PROMPT-20` (one at a time)

Execute these one sub-prompt at a time, following the Master Execution Loop:

## PROMPT-13 — Marketplace
*(Full spec PROMPT-40 v4.0)*
- 3D shopping bag hero (Three.js)
- Masonry listing grid
- Listing card hover: image zooms, save button slides in
- Offer flow with modal

## PROMPT-14 — Events & Calendar
*(Full spec PROMPT-41 v4.0)*
- Monthly calendar grid (react-calendar or custom)
- Leaflet.js map for event locations
- RSVP animation: button morphs to "Going ✓"

## PROMPT-15 — Memories & Flashbacks
*(Full spec PROMPT-42 v4.0)*
- Polaroid-style memory cards (slight rotation, drop shadow)
- "N years ago" sepia overlay on flashback stories
- Confetti on sharing memory

## PROMPT-16 — Live Streaming
*(Full spec PROMPT-43 v4.0)*
- Emoji rain: dynamic DOM insertion, CSS upward float animation
- "LIVE" badge with pulsing red dot
- WebRTC MediaRecorder for basic streaming

## PROMPT-17 — Audio Rooms (Spaces-Style)
*(Full spec PROMPT-52 v4.0)*
- Active speaker: yellow animated ring around speaking avatar
- Raise hand: hand icon bounces in, queue list shows
- WebRTC audio only

## PROMPT-18 — Creator Studio & Analytics
*(Full spec PROMPT-51 + PROMPT-59 v4.0)*
- All Recharts charts with yellow color + entrance animation
- Metric cards count up from 0 on mount (GSAP)
- PDF export button with jsPDF

## PROMPT-19 — Wallet, Coins & Economy
*(Full spec PROMPT-24 v4.0 + D sections)*
- 3D coin (Three.js) on wallet page
- Coin earn animation: "+N 🪙" floats up from action, fades
- Daily reward claim: coin drop animation (GSAP MotionPath)

## PROMPT-20 — Final QA, Accessibility & Lighthouse
*(Full spec PROMPT-48 + PROMPT-55 + PROMPT-60 v4.0)*
- WCAG 2.1 AA compliance check
- All keyboard navigation tested
- Lighthouse target: ≥80 Performance, ≥90 Accessibility, ≥90 Best Practices, ≥90 SEO
- Seed data script
- Portfolio landing page complete

---

---

# EXTRA PAGES

Create these additional pages (linked from footer and left sidebar):

## `/about-mindbook`
*(Implemented in PROMPT-08.B above)*

## `/why-mindbook`
*(Implemented in PROMPT-08.C above)*

## `/privacy-policy`
Standard privacy policy page with:
- What data we collect
- How we use it
- Your rights (GDPR)
- Contact information (Farman Ullah Ansari)
- Styled with proper typography, table of contents sidebar

## `/terms-of-service`
Standard TOS page with same styling.

## `/community-guidelines`
- What's allowed, what's not
- Reporting process
- Enforcement policy
- Illustrated with MindBook-branded icons (Lottie animations)

## `/help-center`
- Search bar
- FAQ sections: Account / Privacy / Messaging / Videos / Billing / Safety
- Each FAQ uses accordion (Framer Motion height animation)
- Contact Support form at bottom

## `/meet-the-creator`
- Beautiful single-page profile of Farman Ullah Ansari
- Professional headshot placeholder
- Title: "Full Stack Software Engineer"
- Bio, skills stack, what this project demonstrates
- Portfolio / LinkedIn / GitHub CTAs
- "Download Resume" button (jsPDF generated from profile data)

---

# ALL PAGES COMPLETE LIST

| Route | Page |
|-------|------|
| `/` | Landing (logged out) or Feed (logged in) |
| `/feed` | News Feed |
| `/login` | Login |
| `/register` | Signup |
| `/forgot-password` | Forgot Password |
| `/reset-password/:token` | Reset Password |
| `/profile/:id` | User Profile |
| `/profile/:id/about` | About tab |
| `/profile/:id/friends` | Friends tab |
| `/profile/:id/photos` | Photos tab |
| `/profile/:id/videos` | Videos tab |
| `/profile/:id/reels` | Reels tab |
| `/profile/:id/portfolio` | Portfolio tab |
| `/messages` | Messenger |
| `/messages/:id` | Chat Window |
| `/calls` | Call History |
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
| `/watch` | Video Hub Home |
| `/watch/trending` | Trending Videos |
| `/watch/mindbook` | MindBook Videos |
| `/watch/youtube` | YouTube Videos |
| `/watch/subscriptions` | Subscriptions |
| `/watch/history` | Watch History |
| `/watch/saved` | Watch Later |
| `/watch/video/:id` | Native Video Player |
| `/watch/yt/:youtubeId` | YouTube Player |
| `/watch/live` | Live Streams |
| `/channel/:userId` | User Channel |
| `/events` | Events |
| `/events/:id` | Event Detail |
| `/events/create` | Create Event |
| `/marketplace` | Marketplace |
| `/marketplace/:id` | Listing Detail |
| `/marketplace/sell` | Create Listing |
| `/marketplace/mine` | My Listings |
| `/fundraisers` | Fundraisers |
| `/fundraisers/:id` | Fundraiser Detail |
| `/memories` | Memories |
| `/archive` | Archive |
| `/articles` | Articles Hub |
| `/articles/new` | Write Article |
| `/articles/:id` | Read Article |
| `/jobs` | Job Board |
| `/jobs/:id` | Job Detail |
| `/jobs/applications` | My Applications |
| `/network` | Professional Network |
| `/audio-rooms` | Audio Rooms |
| `/gaming` | Gaming Hub |
| `/wallet` | Wallet & Coins |
| `/wallet/store` | Coin Store |
| `/your-time` | Wellness Dashboard |
| `/mindbot` | AI Chatbot |
| `/notifications` | Notifications |
| `/my-reports` | My Reports |
| `/creator-studio` | Creator Studio |
| `/creator-studio/analytics` | Creator Analytics |
| `/settings` | Settings |
| `/settings/account` | Account |
| `/settings/security` | Security & Login |
| `/settings/privacy` | Privacy |
| `/settings/notifications` | Notifications |
| `/settings/profile` | Profile |
| `/settings/appearance` | Appearance |
| `/settings/accessibility` | Accessibility |
| `/settings/data` | Data & Privacy |
| `/settings/help` | Help & Support |
| `/security` | Login & Security |
| `/download-your-data` | Data Export |
| `/admin` | Admin Dashboard |
| `/admin/register` | Admin Registration |
| `/admin/users` | User Management |
| `/admin/content` | Content Moderation |
| `/admin/reports` | Report Queue |
| `/admin/announcements` | Announcements |
| `/admin/logs` | System Logs |
| `/admin/security` | Security Tools |
| `/search` | Search Results |
| `/hashtag/:tag` | Hashtag Feed |
| `/landing` | Marketing Landing |
| `/about-mindbook` | About Page |
| `/why-mindbook` | Why I Built This |
| `/meet-the-creator` | Creator Profile |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/community-guidelines` | Guidelines |
| `/help-center` | Help Center |
| `/404` | Not Found |

---

# Final Notes for Antigravity Agent

## The Non-Negotiable Rules

1. 🟡 **Brand color `#F7B928` is the default — you have permission to refine the palette but maintain yellow as the primary action color.**
2. 📝 **`save_progress.md` before anything else.** Create it if it doesn't exist.
3. 🔄 **Read `save_progress.md` before every sub-prompt.** Never redo completed work.
4. 💾 **Save after every step.** No exceptions.
5. 🚫 **Never delete features.** Fix broken ones.
6. 🚫 **Never hardcode API keys.**
7. 📱 **Test every component at 375px, 768px, 1280px, 1440px.**
8. 🌙 **Verify dark mode on every component.**
9. 🎭 **Every interaction must be animated.**
10. ⚡ **Performance matters: React.memo, useCallback, useMemo, virtual lists.**
11. 🔗 **Developer links must appear on the site:**
    - Portfolio: `https://farmanullah1.github.io/My-Portfolio`
    - LinkedIn: `https://www.linkedin.com/in/farmanullah-ansari/`
    - GitHub: `https://github.com/farmanullah1`

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | React 18, Vite |
| Routing | React Router v6 |
| State | Zustand |
| Styling | CSS Modules + CSS Variables (NO Tailwind) |
| Animation | Framer Motion + GSAP + React Spring |
| 3D | Three.js (@react-three/fiber + drei) |
| Smooth Scroll | Lenis |
| Gestures | @use-gesture/react |
| Real-time | Socket.IO |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Upload | Multer + Sharp |
| AI | Anthropic Claude API |
| YouTube | YouTube Data API v3 |
| GIFs | Giphy API |
| Maps | Leaflet.js + OpenStreetMap |
| WebRTC | Native + Socket.IO signaling |
| PWA | Workbox |
| Charts | Recharts |
| Rich Text | TipTap |
| DnD | @dnd-kit/core |
| Virtual Lists | react-window |
| PDF | jsPDF |
| Confetti | canvas-confetti |
| Lottie | lottie-react |
| i18n | react-i18next |

---

*MindBook Agent Playbook — Version 6.0 ULTIMATE EDITION | 2026*
*Created by: Farman Ullah Ansari | Full Stack Software Engineer*
*Portfolio: farmanullah1.github.io/My-Portfolio*
*Progress Tracking: save_progress.md — append after every step, no exceptions.*