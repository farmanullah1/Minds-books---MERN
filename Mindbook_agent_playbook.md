# MindBook – Antigravity Agent Prompt Playbook v7.0 — MAXIMUM DETAIL EDITION

> **Project:** MindBook — Portfolio-grade, next-generation social media platform
> **Developer:** Farmanullah Ansari | Full Stack Software Engineer
> **Portfolio:** https://farmanullah1.github.io/My-Portfolio
> **LinkedIn:** https://www.linkedin.com/in/farmanullah-ansari/
> **GitHub:** https://github.com/farmanullah1
>
> **Design Freedom:** Agent has FULL PERMISSION to evolve or reimagine the color palette, typography, logo, spacing, and visual language — as long as the result is more stunning, more modern, and more premium than the current design. Yellow `#F7B928` is the default brand anchor but can be refined into a richer palette.
>
> **Goal:** Build a platform so polished, so feature-complete, and so beautifully animated that it earns a place as the centerpiece of a world-class software engineering portfolio.

---

## MASTER EXECUTION PROTOCOL

Every agent execution — without exception — must follow this exact sequence for every single sub-prompt:

```
╔═══════════════════════════════════════════════════════════════╗
║  PRE-FLIGHT (before any coding)                               ║
║  1. Open save_progress.md                                     ║
║  2. Find this sub-prompt in the log                           ║
║  3. If NOT logged → proceed to IMPLEMENT                      ║
║  4. If logged as "Completed" → run VERIFY step               ║
╠═══════════════════════════════════════════════════════════════╣
║  VERIFY (if already logged as complete)                       ║
║  a. Open the relevant files in the codebase                   ║
║  b. Run the feature in the browser                            ║
║  c. Check: Does it render? Does it animate? Is it responsive? ║
║  d. Check: Any console errors? Any visual bugs?               ║
║  e. If ALL checks pass → mark VERIFIED in log, SKIP to NEXT  ║
║  f. If any check fails → go to FIX step                      ║
╠═══════════════════════════════════════════════════════════════╣
║  FIX (if broken or incomplete)                                ║
║  a. Identify exact root cause (not symptoms)                  ║
║  b. Fix ONLY that specific issue                              ║
║  c. Do NOT recreate files that already work                   ║
║  d. Re-run VERIFY after fix                                   ║
╠═══════════════════════════════════════════════════════════════╣
║  IMPLEMENT (new functionality)                                ║
║  a. Write backend first (model → route → controller)         ║
║  b. Test backend with Postman or curl                        ║
║  c. Write frontend (service call → component → styles)       ║
║  d. Wire state management                                     ║
║  e. Test happy path                                           ║
║  f. Test error paths                                          ║
╠═══════════════════════════════════════════════════════════════╣
║  ANIMATE (required on every UI component)                     ║
║  a. Add entrance animation (Framer Motion / React Spring)     ║
║  b. Add hover interactions (CSS transitions / Framer)         ║
║  c. Add micro-interactions (button clicks, form feedback)     ║
║  d. Add loading skeleton                                      ║
║  e. Add empty state                                           ║
║  f. Add error state                                           ║
╠═══════════════════════════════════════════════════════════════╣
║  QUALITY GATE (before marking complete)                       ║
║  □ No console.error or console.warn in browser               ║
║  □ No failed network requests (check Network tab)            ║
║  □ Renders correctly at 375px (mobile)                       ║
║  □ Renders correctly at 768px (tablet)                       ║
║  □ Renders correctly at 1280px (laptop)                      ║
║  □ Renders correctly at 1440px (desktop)                     ║
║  □ Dark mode applied and correct                              ║
║  □ Light mode applied and correct                             ║
║  □ Keyboard navigation works                                  ║
║  □ Loading skeleton shown during fetch                        ║
║  □ Empty state shown when no data                             ║
║  □ Error state shown on API failure                           ║
╠═══════════════════════════════════════════════════════════════╣
║  SAVE (append to save_progress.md)                            ║
║  • Timestamp (ISO 8601)                                       ║
║  • Sub-prompt ID and name                                     ║
║  • Status: Completed / Partially Complete / Blocked          ║
║  • Every file modified (path + what changed)                  ║
║  • Brief summary of what was built                            ║
║  • Animations added                                           ║
║  • Tests passed / failed                                      ║
║  • Blockers if any                                            ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## save_progress.md — Required Format

```markdown
# MindBook — Agent Progress Log
> This file is auto-maintained. Do not edit manually.
> Stack: MERN | Agent: Antigravity | Brand: #F7B928
> Developer: Farmanullah Ansari
> Email :farmanullahansari999@gmail.com

---

## [2026-01-20T09:15:32Z] — PROMPT-01.A: Full Project Audit
**Status:** Completed
**Duration:** ~18 minutes

**Files Read:**
- frontend/src/App.jsx ✓
- backend/server.js ✓
- [all 47 source files checked]

**Files Modified:**
- frontend/src/App.jsx — Fixed broken AuthContext import
- backend/routes/index.js — Registered missing /api/posts route
- frontend/src/components/Navbar.jsx — Fixed responsive overflow

**Bugs Found & Fixed:**
1. Missing route registration for /api/posts → Fixed in routes/index.js
2. AuthContext not exported correctly → Fixed in context/AuthContext.jsx
3. Navbar overflows at 375px → Fixed with overflow-x:hidden

**Animations Added:**
- Navbar entrance: slides down 300ms ease-out on mount

**Tests Passed:**
✅ 375px mobile — renders correctly
✅ 768px tablet — renders correctly
✅ 1280px laptop — renders correctly
✅ Dark mode — all components themed
✅ No console errors

**Notes:** Backend required restart after route fix. MongoDB connection confirmed.

---
```

---

## GLOBAL DESIGN SYSTEM

### Complete Design Tokens

```css
/* =========================================================
   MINDBOOK DESIGN TOKENS — globals.css
   Agent: Install Inter font from Google Fonts.
   Apply this file as the FIRST import in main.jsx.
   Every component MUST use these variables — no hardcoded values.
   ========================================================= */

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400&display=swap');

:root {
  /* ── BRAND COLORS ─────────────────────────────────────── */
  --brand:              #F7B928;   /* Primary yellow */
  --brand-hover:        #E4A11B;   /* Darker on hover */
  --brand-active:       #C98A10;   /* Pressed state */
  --brand-light:        rgba(247, 185, 40, 0.12);
  --brand-lighter:      rgba(247, 185, 40, 0.06);
  --brand-glow-sm:      0 0 0 3px rgba(247, 185, 40, 0.30);
  --brand-glow-md:      0 0 0 4px rgba(247, 185, 40, 0.40);
  --brand-shadow:       0 4px 24px rgba(247, 185, 40, 0.28);
  --brand-shadow-lg:    0 8px 40px rgba(247, 185, 40, 0.35);
  --brand-gradient:     linear-gradient(135deg, #F7B928 0%, #FFD700 50%, #F59E0B 100%);
  --brand-gradient-v:   linear-gradient(180deg, #FFD700 0%, #F7B928 100%);
  --brand-text-on:      #ffffff;   /* White text on brand bg */

  /* ── SURFACE BACKGROUNDS ─────────────────────────────── */
  --bg-html:            #f0f2f5;   /* Page body background */
  --bg-card:            #ffffff;   /* Card/panel background */
  --bg-card-hover:      #f7f8fa;   /* Card on hover */
  --bg-input:           #f0f2f5;   /* Input fields */
  --bg-input-hover:     #e4e6eb;   /* Input on hover */
  --bg-navbar:          rgba(255, 255, 255, 0.92); /* Frosted glass */
  --bg-sidebar:         #ffffff;
  --bg-modal:           #ffffff;
  --bg-dropdown:        #ffffff;
  --bg-tooltip:         #1c1e21;
  --bg-overlay:         rgba(0, 0, 0, 0.60);
  --bg-overlay-light:   rgba(0, 0, 0, 0.25);
  --bg-skeleton-base:   #e4e6eb;
  --bg-skeleton-shine:  #f0f2f5;

  /* ── TEXT COLORS ─────────────────────────────────────── */
  --text-primary:       #050505;   /* Headings, important text */
  --text-secondary:     #65676b;   /* Subtext, labels */
  --text-tertiary:      #8a8d91;   /* Placeholder, muted */
  --text-disabled:      #bcc0c4;   /* Disabled state */
  --text-inverse:       #ffffff;   /* Text on dark bg */
  --text-on-brand:      #ffffff;   /* Text on yellow bg */
  --text-link:          #1a6ed8;   /* Hyperlinks */
  --text-link-hover:    #1558b0;   /* Link hover */
  --text-danger:        #f02849;   /* Error messages */
  --text-success:       #1a7f37;   /* Success messages */
  --text-warning:       #9a6700;   /* Warning messages */

  /* ── BORDER COLORS ───────────────────────────────────── */
  --border:             #e4e6eb;   /* Default borders */
  --border-strong:      #ccd0d5;   /* Emphasized borders */
  --border-light:       #f0f2f5;   /* Subtle dividers */
  --border-focus:       #F7B928;   /* Input focus ring */
  --border-error:       #f02849;   /* Error state */
  --border-success:     #45bd62;   /* Success state */

  /* ── STATUS COLORS ───────────────────────────────────── */
  --online:             #31a24c;   /* Online indicator */
  --offline:            #b0b3b8;   /* Offline indicator */
  --away:               #f7b928;   /* Away/idle */
  --busy:               #f02849;   /* Do not disturb */
  --error-bg:           #fff0f3;
  --error-border:       #f02849;
  --success-bg:         #f0fff4;
  --success-border:     #45bd62;
  --warning-bg:         #fffbe6;
  --warning-border:     #f7b928;
  --info-bg:            #f0f4ff;
  --info-border:        #1877f2;

  /* ── REACTION COLORS ─────────────────────────────────── */
  --react-like:         #F7B928;   /* 👍 */
  --react-love:         #f33e58;   /* ❤️ */
  --react-haha:         #f7b928;   /* 😂 */
  --react-wow:          #f7b928;   /* 😮 */
  --react-sad:          #f7b928;   /* 😢 */
  --react-angry:        #e9710f;   /* 😡 */

  /* ── SHADOW SYSTEM ───────────────────────────────────── */
  --shadow-xs:          0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm:          0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md:          0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg:          0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-xl:          0 20px 25px rgba(0, 0, 0, 0.08), 0 10px 10px rgba(0, 0, 0, 0.03);
  --shadow-2xl:         0 25px 50px rgba(0, 0, 0, 0.12);
  --shadow-card:        0 1px 2px rgba(0, 0, 0, 0.10);
  --shadow-card-hover:  0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-navbar:      0 1px 0 rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-modal:       0 8px 30px rgba(0, 0, 0, 0.20), 0 2px 8px rgba(0, 0, 0, 0.10);
  --shadow-dropdown:    0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.08);
  --shadow-input:       inset 0 1px 3px rgba(0, 0, 0, 0.06);

  /* ── BORDER RADIUS ───────────────────────────────────── */
  --r-2xs:              2px;
  --r-xs:               4px;
  --r-sm:               8px;
  --r-md:               12px;
  --r-lg:               16px;
  --r-xl:               20px;
  --r-2xl:              24px;
  --r-3xl:              32px;
  --r-full:             9999px;

  /* ── SPACING SCALE ───────────────────────────────────── */
  --sp-1:               4px;
  --sp-2:               8px;
  --sp-3:               12px;
  --sp-4:               16px;
  --sp-5:               20px;
  --sp-6:               24px;
  --sp-7:               28px;
  --sp-8:               32px;
  --sp-10:              40px;
  --sp-12:              48px;
  --sp-14:              56px;
  --sp-16:              64px;
  --sp-20:              80px;
  --sp-24:              96px;

  /* ── TYPOGRAPHY ──────────────────────────────────────── */
  --font:               'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono:          'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  --fs-2xs:             10px;
  --fs-xs:              11px;
  --fs-sm:              12px;
  --fs-base:            14px;
  --fs-md:              15px;
  --fs-lg:              16px;
  --fs-xl:              18px;
  --fs-2xl:             20px;
  --fs-3xl:             24px;
  --fs-4xl:             28px;
  --fs-5xl:             32px;
  --fs-6xl:             40px;
  --fs-7xl:             48px;
  --fs-8xl:             60px;

  --fw-regular:         400;
  --fw-medium:          500;
  --fw-semibold:        600;
  --fw-bold:            700;
  --fw-extrabold:       800;
  --fw-black:           900;

  --lh-tight:           1.20;
  --lh-snug:            1.35;
  --lh-normal:          1.50;
  --lh-relaxed:         1.65;
  --lh-loose:           2.00;

  /* ── TRANSITIONS & EASING ────────────────────────────── */
  --ease-linear:        linear;
  --ease-in:            cubic-bezier(0.4, 0, 1, 1);
  --ease-out:           cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1);
  --ease-overshoot:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth:        cubic-bezier(0.22, 1, 0.36, 1);
  --ease-bounce:        cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic:       cubic-bezier(0.68, -0.6, 0.32, 1.6);

  --dur-instant:        80ms;
  --dur-fast:           150ms;
  --dur-base:           250ms;
  --dur-slow:           350ms;
  --dur-slower:         500ms;
  --dur-slowest:        700ms;

  --t-fast:             var(--dur-fast) var(--ease-smooth);
  --t-base:             var(--dur-base) var(--ease-smooth);
  --t-slow:             var(--dur-slow) var(--ease-smooth);
  --t-spring:           var(--dur-slow) var(--ease-overshoot);
  --t-bounce:           var(--dur-slower) var(--ease-bounce);

  /* ── Z-INDEX SCALE ───────────────────────────────────── */
  --z-below:            -1;
  --z-base:              1;
  --z-raised:           10;
  --z-dropdown:         100;
  --z-sticky:           200;
  --z-navbar:           300;
  --z-drawer:           400;
  --z-modal:            500;
  --z-popover:          600;
  --z-toast:            700;
  --z-tooltip:          800;
  --z-cursor:           900;
  --z-top:              9999;

  /* ── LAYOUT DIMENSIONS ───────────────────────────────── */
  --navbar-height:      60px;
  --navbar-height-mob:  56px;
  --sidebar-left:       280px;
  --sidebar-left-sm:    60px;   /* Collapsed on tablet */
  --sidebar-right:      320px;
  --feed-max-width:     680px;
  --page-max-width:     1400px;
  --bottom-nav-h:       56px;
  --bottom-nav-safe:    calc(56px + env(safe-area-inset-bottom, 0px));

  /* ── BREAKPOINTS (for JS use via CSS custom props) ─── */
  --bp-xs:              480px;
  --bp-sm:              640px;
  --bp-md:              768px;
  --bp-lg:              1024px;
  --bp-xl:              1280px;
  --bp-2xl:             1440px;
  --bp-3xl:             1600px;
}

/* ── DARK MODE OVERRIDES ────────────────────────────────── */
body.dark {
  --bg-html:            #18191a;
  --bg-card:            #242526;
  --bg-card-hover:      #3a3b3c;
  --bg-input:           #3a3b3c;
  --bg-input-hover:     #4a4b4c;
  --bg-navbar:          rgba(36, 37, 38, 0.92);
  --bg-sidebar:         #242526;
  --bg-modal:           #242526;
  --bg-dropdown:        #3a3b3c;
  --bg-skeleton-base:   #3a3b3c;
  --bg-skeleton-shine:  #4a4b4c;

  --text-primary:       #e4e6eb;
  --text-secondary:     #b0b3b8;
  --text-tertiary:      #8a8d91;
  --text-disabled:      #606770;

  --border:             #3e4042;
  --border-strong:      #56585b;
  --border-light:       #303133;

  --shadow-card:        0 1px 2px rgba(0, 0, 0, 0.40);
  --shadow-card-hover:  0 4px 12px rgba(0, 0, 0, 0.55);
  --shadow-navbar:      0 1px 0 rgba(0, 0, 0, 0.30), 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-modal:       0 8px 30px rgba(0, 0, 0, 0.60);
  --shadow-dropdown:    0 4px 20px rgba(0, 0, 0, 0.50);
}

/* ── HIGH CONTRAST MODE ─────────────────────────────────── */
@media (prefers-contrast: high), body.high-contrast {
  --border:             #000000;
  --text-secondary:     #000000;
  --bg-input:           #ffffff;
  --brand:              #c8900a;
}

/* ── REDUCED MOTION ─────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ── GLOBAL RESETS ──────────────────────────────────────── */
*, *::before, *::after  { box-sizing: border-box; margin: 0; padding: 0; }
html                    { font-size: 15px; scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
html[data-fontsize=sm]  { font-size: 13px; }
html[data-fontsize=lg]  { font-size: 17px; }
html[data-fontsize=xl]  { font-size: 19px; }
body                    { font-family: var(--font); font-size: var(--fs-md); line-height: var(--lh-normal); color: var(--text-primary); background: var(--bg-html); overflow-x: hidden; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
img, video, svg         { display: block; max-width: 100%; height: auto; }
a                       { color: var(--text-link); text-decoration: none; }
a:hover                 { color: var(--text-link-hover); }
button                  { font-family: inherit; cursor: pointer; border: none; background: none; }
input, textarea, select { font-family: inherit; }
:focus-visible          { outline: 3px solid var(--brand); outline-offset: 3px; border-radius: var(--r-xs); }

/* ── SCROLLBAR HIDING ───────────────────────────────────── */
.no-scrollbar           { scrollbar-width: none; -ms-overflow-style: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* ── SKELETON SHIMMER ───────────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -800px 0; }
  100% { background-position:  800px 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    var(--bg-skeleton-base)  25%,
    var(--bg-skeleton-shine) 50%,
    var(--bg-skeleton-base)  75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: var(--r-sm);
}

/* ── STANDARD BUTTON ────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  padding: 8px 16px;
  border-radius: var(--r-full);
  font-size: var(--fs-md);
  font-weight: var(--fw-semibold);
  line-height: 1;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition:
    background var(--t-fast),
    transform   var(--t-spring),
    box-shadow  var(--t-fast),
    border-color var(--t-fast),
    color var(--t-fast);
  user-select: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}
.btn:hover   { transform: scale(1.03); }
.btn:active  { transform: scale(0.97); }
.btn-primary { background: var(--brand); color: var(--brand-text-on); }
.btn-primary:hover { background: var(--brand-hover); box-shadow: var(--brand-shadow); }
.btn-secondary { background: var(--bg-input); color: var(--text-primary); }
.btn-secondary:hover { background: var(--bg-input-hover); }
.btn-ghost { background: transparent; color: var(--text-primary); }
.btn-ghost:hover { background: var(--bg-input); }
.btn-danger { background: var(--error-bg); color: var(--text-danger); border-color: var(--error-border); }
.btn-danger:hover { background: var(--text-danger); color: #fff; }
.btn-sm { padding: 6px 12px; font-size: var(--fs-sm); }
.btn-lg { padding: 12px 24px; font-size: var(--fs-lg); }
.btn-icon { padding: 8px; border-radius: var(--r-full); }
.btn[disabled] { opacity: 0.5; cursor: not-allowed; transform: none !important; }
```

---

## ANIMATIONS MODULE

```javascript
/* =========================================================
   src/animations/variants.js
   Framer Motion animation variants used across all components.
   Import these instead of defining animations inline.
   ========================================================= */

// ── PAGE TRANSITIONS ─────────────────────────────────────
export const pageVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0, y: -12, filter: 'blur(4px)',
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
  }
};

// ── MODAL ─────────────────────────────────────────────────
export const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.20 } },
  exit:    { opacity: 0, transition: { duration: 0.16 } }
};
export const modalContentVariants = {
  initial: { opacity: 0, scale: 0.88, y: 28 },
  animate: { opacity: 1, scale: 1,    y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
  exit:    { opacity: 0, scale: 0.92, y: 16, transition: { duration: 0.20 } }
};
export const bottomSheetVariants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 30 } },
  exit:    { opacity: 0, y: '100%', transition: { duration: 0.22 } }
};

// ── DROPDOWN ──────────────────────────────────────────────
export const dropdownVariants = {
  initial: { opacity: 0, scale: 0.90, y: -8 },
  animate: { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, scale: 0.92, y: -6, transition: { duration: 0.12 } }
};

// ── SLIDE VARIANTS ────────────────────────────────────────
export const slideUp    = { initial: { opacity:0, y:24 }, animate: { opacity:1, y:0, transition:{ duration:0.35, ease:[0.22,1,0.36,1] } } };
export const slideDown  = { initial: { opacity:0, y:-16 }, animate: { opacity:1, y:0, transition:{ duration:0.30, ease:[0.22,1,0.36,1] } } };
export const slideRight = { initial: { opacity:0, x:-20 }, animate: { opacity:1, x:0, transition:{ duration:0.30, ease:[0.22,1,0.36,1] } } };
export const slideLeft  = { initial: { opacity:0, x:20 },  animate: { opacity:1, x:0, transition:{ duration:0.30, ease:[0.22,1,0.36,1] } } };
export const fadeIn     = { initial: { opacity:0 }, animate: { opacity:1, transition:{ duration:0.25 } } };

// ── POP IN (for reaction pickers, badges, tooltips) ───────
export const popIn = {
  initial: { opacity:0, scale:0.3 },
  animate: { opacity:1, scale:1, transition:{ type:'spring', stiffness:350, damping:20 } },
  exit:    { opacity:0, scale:0.3, transition:{ duration:0.12 } }
};

// ── STAGGER CONTAINER ─────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0) => ({
  animate: { transition: { staggerChildren, delayChildren } }
});

// ── LIST ITEM ─────────────────────────────────────────────
export const listItem = {
  initial: { opacity:0, y:12, scale:0.98 },
  animate: { opacity:1, y:0, scale:1, transition:{ duration:0.28, ease:[0.22,1,0.36,1] } }
};

// ── CARD HOVER ────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0, boxShadow: 'var(--shadow-card)' },
  hover: { y: -4, boxShadow: 'var(--shadow-card-hover)', transition: { duration: 0.20 } }
};

// ── TOAST ─────────────────────────────────────────────────
export const toastVariants = {
  initial: { opacity:0, x:120, scale:0.85 },
  animate: { opacity:1, x:0,   scale:1, transition:{ type:'spring', stiffness:300, damping:28 } },
  exit:    { opacity:0, x:120, scale:0.85, transition:{ duration:0.22 } }
};

// ── REACTION PICKER EMOJI ─────────────────────────────────
export const emojiVariants = {
  initial: { opacity:0, scale:0.3, y:10 },
  animate: (i) => ({
    opacity:1, scale:1, y:0,
    transition:{ type:'spring', stiffness:400, damping:20, delay: i * 0.04 }
  }),
  hover:   { scale:1.45, y:-4, transition:{ type:'spring', stiffness:400, damping:18 } }
};

// ── NUMBER COUNTER (Framer Motion useAnimate) ──────────────
// Usage: animate counter from 0 to target value
// import { useAnimate } from 'framer-motion';
// const [scope, animate] = useAnimate();
// animate(scope.current, { innerHTML: targetValue }, { duration: 1.5, ease: 'easeOut' });
```

---

## NPM PACKAGES MANIFEST

```bash
# ── FRONTEND (run inside frontend/) ──────────────────────
# Core
npm install react-router-dom@6 axios zustand

# Animation
npm install framer-motion @react-spring/web gsap @gsap/react

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

# Masonry Layout
npm install react-masonry-css

# Intersection Observer
npm install react-intersection-observer

# Lottie Animations
npm install lottie-react

# Image Crop
npm install react-easy-crop

# Emoji Picker
npm install emoji-picker-react

# Rich Text Editor
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-character-count @tiptap/extension-code-block-lowlight lowlight

# i18n
npm install react-i18next i18next

# Charts
npm install recharts

# Date utilities
npm install date-fns

# QR Code
npm install qrcode.react

# PDF Generation
npm install jspdf jspdf-autotable

# Virtual List
npm install react-window react-window-infinite-loader

# Drag and Drop
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Leaflet Maps
npm install leaflet react-leaflet

# Socket.IO Client
npm install socket.io-client

# Icons
npm install lucide-react

# ── BACKEND (run inside backend/) ───────────────────────
npm install express mongoose dotenv cors helmet express-rate-limit morgan compression

# Auth
npm install jsonwebtoken bcryptjs

# File Upload & Processing
npm install multer sharp fluent-ffmpeg

# Email
npm install nodemailer

# Socket.IO
npm install socket.io

# Validation
npm install express-validator joi

# OTP/2FA
npm install speakeasy qrcode

# Cron jobs
npm install node-cron

# Google APIs (YouTube)
npm install googleapis

# WebPush
npm install web-push

# UUID
npm install uuid

# HTML to PDF (for data export)
npm install puppeteer-core
```

---

---

# PROMPT-01 — Project Audit, Architecture & Global Systems

**Trigger:** `Run PROMPT-01` *(Execute sub-prompts A → B → C → D → E in order)*

---

## PROMPT-01.A — Full Project Audit & Structure Setup

**What this sub-prompt does:** Audits every file, fixes structural issues, and ensures the project scaffold matches the spec.

### Step 1: Run this audit checklist

```
FRONTEND AUDIT:
□ src/main.jsx exists and renders <App />
□ src/App.jsx has React Router setup with all routes
□ src/styles/globals.css exists and is imported in main.jsx
□ src/animations/variants.js exists
□ src/store/ has authStore.js, uiStore.js, notifStore.js
□ src/context/ has SocketContext.jsx, CallContext.jsx
□ src/hooks/ has useAuth.js, useSocket.js, useDebounce.js, useThrottle.js,
             useInfiniteScroll.js, useScrollReveal.js, useMediaQuery.js
□ src/services/api.js exists with axios instance configured
□ src/services/socket.js exists with Socket.IO client
□ src/layouts/AppLayout.jsx exists (navbar + grid + bottom nav)
□ src/layouts/AuthLayout.jsx exists (no sidebar)
□ src/components/ui/ has Button, Input, Modal, Toast, Avatar, Skeleton components
□ public/favicon.svg exists (yellow M logo)
□ public/manifest.json exists (PWA manifest)

BACKEND AUDIT:
□ server.js exists and starts on PORT from .env
□ config/db.js connects to MongoDB
□ middleware/auth.js verifies JWT
□ middleware/adminOnly.js checks role === 'admin'
□ middleware/errorHandler.js is registered as last middleware
□ middleware/rateLimiter.js is imported and applied to auth routes
□ All models exist: User, Post, Comment, Story, Conversation, Message,
  Group, GroupPost, Notification, Report, Announcement, Video, Reel,
  MarketplaceListing, Event, Fundraiser, Job, Article, Wallet, CallLog
□ All route files are registered in server.js
□ /uploads/ folder exists with subfolders:
  profile-pics/, cover-photos/, posts/, stories/, messages/,
  videos/, thumbnails/, audio/, documents/, defaults/
□ .env.example exists in project root
□ .gitignore includes node_modules, .env, uploads/

ROOT AUDIT:
□ save_progress.md exists (create if not)
□ README.md exists
□ .env exists with all required keys
□ package.json in root (optional: concurrently for running both servers)
```

### Step 2: Create missing files

Create any file listed above that doesn't exist. Use the minimal valid implementation (stub with TODO comment is fine for complex files — the detailed implementation comes in later prompts).

### Step 3: Fix import errors

```bash
# Run in frontend/ to catch import errors:
npx vite build 2>&1 | head -50

# Run in backend/ to check for syntax errors:
node --check server.js
```

Fix every error reported.

### Step 4: Verify servers start

```bash
# Terminal 1:
cd backend && npm run dev
# Should see: "Server running on port 5000" and "MongoDB connected"

# Terminal 2:
cd frontend && npm run dev
# Should see: "VITE ready" with local URL
```

Fix any startup errors.

### Step 5: Create save_progress.md

```markdown
# MindBook — Agent Progress Log
> Stack: MERN | Developer: Farmanullah Ansari
> Portfolio: https://farmanullah1.github.io/My-Portfolio
> LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/
> GitHub: https://github.com/farmanullah1

---

## [TIMESTAMP] — PROMPT-01.A: Full Project Audit
**Status:** Completed
**Files Reviewed:** [N] files
**Bugs Fixed:** [N] bugs
**Summary:** [brief description]
---
```

*Save Progress. Move to PROMPT-01.B.*

---

## PROMPT-01.B — Universal App Layout Shell

**What this sub-prompt does:** Creates the `AppLayout` that wraps every authenticated page. This ensures the navbar, sidebars, and bottom nav are consistent everywhere.

### File: `frontend/src/layouts/AppLayout.jsx`

```jsx
import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from '../components/Navbar/Navbar';
import LeftSidebar from '../components/Sidebar/LeftSidebar';
import RightSidebar from '../components/Sidebar/RightSidebar';
import BottomNav from '../components/BottomNav/BottomNav';
import TopLoadingBar from '../components/ui/TopLoadingBar';
import CustomCursor from '../components/ui/CustomCursor';
import ToastContainer from '../components/ui/ToastContainer';
import MindBotWidget from '../components/MindBot/MindBotWidget';
import useMediaQuery from '../hooks/useMediaQuery';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const location = useLocation();
  const lenisRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ── Lenis smooth scroll init
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Determine which routes should hide sidebars
  const isFullScreen = ['/reels', '/watch/'].some(p => location.pathname.startsWith(p));
  const showRightSidebar = isDesktop && !isFullScreen && ['/', '/feed'].includes(location.pathname);

  return (
    <div className={styles.shell}>
      {/* Fixed top elements */}
      <TopLoadingBar />
      <Navbar />
      {!isMobile && <CustomCursor />}

      {/* Main layout grid */}
      <div
        className={`
          ${styles.grid}
          ${isFullScreen ? styles.fullscreen : ''}
          ${showRightSidebar ? styles.threeCol : styles.twoCol}
        `}
      >
        {/* Left sidebar — hidden on mobile */}
        {!isMobile && !isFullScreen && (
          <aside className={`${styles.sidebarLeft} no-scrollbar`} aria-label="Left navigation">
            <LeftSidebar />
          </aside>
        )}

        {/* Center content — animated route transitions */}
        <main className={styles.feed} id="main-content">
          <AnimatePresence mode="wait" initial={false}>
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>

        {/* Right sidebar — only on desktop and select routes */}
        {showRightSidebar && (
          <aside className={`${styles.sidebarRight} no-scrollbar`} aria-label="Right sidebar">
            <RightSidebar />
          </aside>
        )}
      </div>

      {/* Mobile bottom navigation */}
      {isMobile && <BottomNav />}

      {/* Global overlays */}
      <ToastContainer />
      <MindBotWidget />
    </div>
  );
}
```

### File: `frontend/src/layouts/AppLayout.module.css`

```css
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── GRID LAYOUTS ────────────────────────────────────────── */
.grid {
  display: grid;
  gap: var(--sp-4);
  max-width: var(--page-max-width);
  width: 100%;
  margin: 0 auto;
  padding: calc(var(--navbar-height) + var(--sp-4)) var(--sp-4) var(--sp-4);
  flex: 1;
  align-items: start;
}

.threeCol {
  grid-template-columns: var(--sidebar-left) 1fr var(--sidebar-right);
  grid-template-areas: "left center right";
}

.twoCol {
  grid-template-columns: var(--sidebar-left) 1fr;
  grid-template-areas: "left center";
}

.fullscreen {
  grid-template-columns: 1fr;
  grid-template-areas: "center";
  padding: var(--navbar-height) 0 0;
  max-width: 100%;
  gap: 0;
}

/* ── SIDEBAR COLUMNS ─────────────────────────────────────── */
.sidebarLeft {
  grid-area: left;
  position: sticky;
  top: calc(var(--navbar-height) + var(--sp-4));
  height: calc(100vh - var(--navbar-height) - var(--sp-8));
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebarRight {
  grid-area: right;
  position: sticky;
  top: calc(var(--navbar-height) + var(--sp-4));
  height: calc(100vh - var(--navbar-height) - var(--sp-8));
  overflow-y: auto;
  overflow-x: hidden;
}

/* ── MAIN FEED ───────────────────────────────────────────── */
.feed {
  grid-area: center;
  min-width: 0;           /* Critical: prevents flex/grid overflow */
  overflow-x: hidden;
  /* Max width for center feed */
  max-width: min(var(--feed-max-width), 100%);
  margin: 0 auto;
  width: 100%;
}

/* ── RESPONSIVE ──────────────────────────────────────────── */
@media (max-width: 1279px) {
  .threeCol {
    grid-template-columns: var(--sidebar-left) 1fr;
    grid-template-areas: "left center";
  }
}

@media (max-width: 1023px) {
  .threeCol, .twoCol {
    grid-template-columns: var(--sidebar-left-sm) 1fr;
    grid-template-areas: "left center";
  }
}

@media (max-width: 767px) {
  .threeCol, .twoCol {
    grid-template-columns: 1fr;
    grid-template-areas: "center";
    padding-bottom: calc(var(--bottom-nav-h) + var(--sp-4));
    padding-left: var(--sp-3);
    padding-right: var(--sp-3);
  }
  .feed { max-width: 100%; }
}
```

### File: `frontend/src/layouts/AuthLayout.jsx`

```jsx
// Used for /login, /register, /forgot-password, /reset-password
// No sidebar, no bottom nav. Just navbar (optional) + centered content.
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ToastContainer from '../components/ui/ToastContainer';
import styles from './AuthLayout.module.css';

export default function AuthLayout() {
  const location = useLocation();
  return (
    <div className={styles.shell}>
      {/* Animated background blobs */}
      <div className={styles.blob1} aria-hidden />
      <div className={styles.blob2} aria-hidden />
      <div className={styles.blob3} aria-hidden />

      <main className={styles.content}>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <ToastContainer />
    </div>
  );
}
```

### File: `frontend/src/layouts/AuthLayout.module.css`

```css
.shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-html);
  position: relative;
  overflow: hidden;
}

/* ── ANIMATED GRADIENT BLOBS ─────────────────────────────── */
.blob1, .blob2, .blob3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.10;
  pointer-events: none;
  z-index: var(--z-below);
}
.blob1 { width: 560px; height: 560px; background: #F7B928; top: -120px; left: -100px; animation: blobDrift 9s ease-in-out infinite alternate; }
.blob2 { width: 480px; height: 480px; background: #FFD700; top: 200px; right: -80px; animation: blobDrift 7s ease-in-out infinite alternate-reverse; }
.blob3 { width: 400px; height: 400px; background: #FFEC8B; bottom: -60px; left: 35%; animation: blobDrift 11s ease-in-out infinite alternate; animation-delay: -4s; }

@keyframes blobDrift {
  0%   { transform: translate(0px, 0px)   scale(1.00); }
  33%  { transform: translate(24px, -18px) scale(1.06); }
  66%  { transform: translate(-16px, 20px) scale(0.94); }
  100% { transform: translate(12px, -8px)  scale(1.03); }
}

.content {
  width: 100%;
  max-width: 480px;
  padding: var(--sp-6) var(--sp-4);
  position: relative;
  z-index: 1;
}

@media (max-width: 480px) {
  .content { padding: var(--sp-4) var(--sp-3); }
}
```

*Save Progress. Move to PROMPT-01.C.*

---

## PROMPT-01.C — Global Component Library (UI Primitives)

**What this sub-prompt does:** Creates every shared UI component needed across the site.

### Component: `Button`

```jsx
/* frontend/src/components/ui/Button.jsx */
import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', loading = false, disabled = false,
    children, className = '', icon, iconRight, onClick, type = 'button', ...rest },
  ref
) {
  const btnRef = ref || useRef(null);

  // Ripple effect on click
  const handleClick = (e) => {
    if (disabled || loading) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; width:${size}px; height:${size}px; border-radius:50%;
      background:rgba(255,255,255,0.3); pointer-events:none;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      animation: ripple 0.5s ease-out forwards;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
    onClick?.(e);
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled || loading}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      onClick={handleClick}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-label="Loading" />
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
});

export default Button;
```

### Component: `Input`

```jsx
/* frontend/src/components/ui/Input.jsx */
import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { label, error, hint, type = 'text', className = '', required = false, ...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ''} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          type={inputType}
          className={styles.input}
          aria-invalid={!!error}
          aria-describedby={error ? `${rest.id}-error` : hint ? `${rest.id}-hint` : undefined}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p id={`${rest.id}-error`} className={styles.error} role="alert">{error}</p>}
      {hint && !error && <p id={`${rest.id}-hint`} className={styles.hint}>{hint}</p>}
    </div>
  );
});

export default Input;
```

### File: `frontend/src/components/ui/Input.module.css`

```css
.wrapper { display: flex; flex-direction: column; gap: var(--sp-1); }
.label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-secondary); }
.required { color: var(--text-danger); margin-left: 2px; }

.inputWrapper { position: relative; }

.input {
  width: 100%;
  padding: 10px 14px;
  background: var(--bg-input);
  border: 1.5px solid var(--border);
  border-radius: var(--r-md);
  font-size: var(--fs-md);
  color: var(--text-primary);
  transition: border-color var(--t-fast), box-shadow var(--t-fast), background var(--t-fast);
  outline: none;
}
.input::placeholder { color: var(--text-tertiary); }
.input:hover:not(:disabled) { background: var(--bg-input-hover); border-color: var(--border-strong); }
.input:focus {
  border-color: var(--border-focus);
  box-shadow: var(--brand-glow-sm);
  background: var(--bg-card);
}
.input:disabled { opacity: 0.5; cursor: not-allowed; }
.hasError .input { border-color: var(--border-error); }
.hasError .input:focus { box-shadow: 0 0 0 3px rgba(240, 40, 73, 0.20); }

.passwordToggle {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-tertiary); padding: var(--sp-1); border-radius: var(--r-xs);
  transition: color var(--t-fast);
}
.passwordToggle:hover { color: var(--text-primary); }

.error { font-size: var(--fs-sm); color: var(--text-danger); display: flex; align-items: center; gap: 4px; }
.hint  { font-size: var(--fs-sm); color: var(--text-tertiary); }
```

### Component: `Modal`

```jsx
/* frontend/src/components/ui/Modal.jsx */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalBackdropVariants, modalContentVariants } from '../../animations/variants';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, title, children, size = 'md', noCloseBtn = false }) {
  const firstFocusableRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstFocusableRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className={styles.portal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={modalBackdropVariants}
            initial="initial" animate="animate" exit="exit"
            onClick={onClose}
          />

          {/* Content */}
          <div className={styles.wrapper}>
            <motion.div
              className={`${styles.container} ${styles[size]}`}
              variants={modalContentVariants}
              initial="initial" animate="animate" exit="exit"
            >
              {/* Header */}
              {(title || !noCloseBtn) && (
                <div className={styles.header}>
                  <h2 id="modal-title" className={styles.title}>{title}</h2>
                  {!noCloseBtn && (
                    <button
                      className={styles.closeBtn}
                      onClick={onClose}
                      ref={firstFocusableRef}
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className={styles.body}>{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

### File: `frontend/src/components/ui/Modal.module.css`

```css
.portal   { position: fixed; inset: 0; z-index: var(--z-modal); }
.backdrop { position: absolute; inset: 0; background: var(--bg-overlay); backdrop-filter: blur(4px); }
.wrapper  { position: relative; z-index: 1; height: 100%; display: flex; align-items: center; justify-content: center; padding: var(--sp-4); overflow-y: auto; }

.container {
  background: var(--bg-modal);
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-modal);
  width: 100%;
  max-height: calc(100vh - 32px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.sm { max-width: 400px; }
.md { max-width: 520px; }
.lg { max-width: 680px; }
.xl { max-width: 900px; }
.full { max-width: 100%; height: 100vh; border-radius: 0; }

.header {
  display: flex; align-items: center; justify-content: center;
  padding: var(--sp-4) var(--sp-6);
  border-bottom: 1px solid var(--border);
  position: relative;
}
.title { font-size: var(--fs-xl); font-weight: var(--fw-bold); text-align: center; }
.closeBtn {
  position: absolute; right: var(--sp-4); top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px; border-radius: var(--r-full);
  background: var(--bg-input); color: var(--text-primary);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--t-fast), transform var(--t-fast);
}
.closeBtn:hover  { background: var(--bg-input-hover); }
.closeBtn:active { transform: translateY(-50%) scale(0.92); }
.body { overflow-y: auto; flex: 1; }
```

### Component: `Avatar`

```jsx
/* frontend/src/components/ui/Avatar.jsx */
import { useState } from 'react';
import styles from './Avatar.module.css';

const SIZE_MAP = { 20:20, 24:24, 32:32, 36:36, 40:40, 48:48, 56:56, 60:60, 80:80, 96:96, 120:120, 168:168 };

export default function Avatar({ src, alt = 'User avatar', size = 40, online, away, verified, className = '', onClick, ring = false }) {
  const [error, setError] = useState(false);
  const px = SIZE_MAP[size] || size;
  const initials = (alt || '?').charAt(0).toUpperCase();

  return (
    <div
      className={`${styles.wrapper} ${ring ? styles.ring : ''} ${onClick ? styles.clickable : ''} ${className}`}
      style={{ width: px, height: px }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          onError={() => setError(true)}
          loading="lazy"
          width={px}
          height={px}
        />
      ) : (
        <div
          className={styles.fallback}
          style={{ fontSize: px * 0.4 }}
          aria-label={alt}
        >
          {initials}
        </div>
      )}

      {/* Online status dot */}
      {online !== undefined && (
        <span
          className={`${styles.dot} ${online ? styles.online : away ? styles.away : styles.offline}`}
          aria-label={online ? 'Online' : away ? 'Away' : 'Offline'}
        />
      )}

      {/* Verified ring */}
      {verified && <span className={styles.verifiedRing} aria-label="Verified" />}
    </div>
  );
}
```

### File: `frontend/src/components/ui/Avatar.module.css`

```css
.wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--r-full);
  overflow: visible; /* needed for dot */
  transition: transform var(--t-fast);
}
.wrapper.clickable { cursor: pointer; }
.wrapper.clickable:hover { transform: scale(1.06); }
.wrapper.ring { box-shadow: 0 0 0 3px var(--bg-html), 0 0 0 5px var(--brand); }

.img {
  width: 100%;
  height: 100%;
  border-radius: var(--r-full);
  object-fit: cover;
  display: block;
  background: var(--bg-input);
}

.fallback {
  width: 100%;
  height: 100%;
  border-radius: var(--r-full);
  background: var(--brand-light);
  color: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--fw-bold);
  user-select: none;
}

/* ── STATUS DOT ──────────────────────────────────────────── */
.dot {
  position: absolute;
  bottom: 1px;
  right: 1px;
  width: 22%;
  height: 22%;
  min-width: 8px;
  min-height: 8px;
  border-radius: var(--r-full);
  border: 2px solid var(--bg-html);
}
.online  { background: var(--online); }
.offline { background: var(--offline); }
.away    { background: var(--away); }

/* Pulse animation for online */
.online::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: var(--r-full);
  background: var(--online);
  animation: pulse-dot 2.4s ease-in-out infinite;
  opacity: 0;
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1);   opacity: 0; }
  50%       { transform: scale(1.8); opacity: 0.3; }
}

/* ── VERIFIED RING ───────────────────────────────────────── */
.verifiedRing {
  position: absolute;
  inset: -3px;
  border-radius: var(--r-full);
  border: 2.5px solid var(--brand);
  animation: verified-spin 4s linear infinite;
  pointer-events: none;
}
@keyframes verified-spin {
  to { transform: rotate(360deg); }
}
```

### Component: Skeleton

```jsx
/* frontend/src/components/ui/Skeleton.jsx */
import styles from './Skeleton.module.css';

// Generic skeleton
export function Skeleton({ width = '100%', height = 16, borderRadius, className = '', style = {} }) {
  return (
    <span
      className={`skeleton ${styles.block} ${className}`}
      style={{ width, height, borderRadius: borderRadius || 'var(--r-sm)', ...style }}
      aria-hidden="true"
    />
  );
}

// Post card skeleton
export function SkeletonPost() {
  return (
    <div className={styles.post} aria-label="Loading post" aria-busy="true">
      <div className={styles.postHeader}>
        <span className={`skeleton ${styles.circle}`} style={{ width:40, height:40 }} />
        <div className={styles.postMeta}>
          <Skeleton width="40%" height={14} />
          <Skeleton width="25%" height={11} style={{ marginTop:4 }} />
        </div>
      </div>
      <Skeleton width="90%" height={14} style={{ marginTop:12 }} />
      <Skeleton width="75%" height={14} style={{ marginTop:6 }} />
      <Skeleton width="100%" height={220} borderRadius="var(--r-lg)" style={{ marginTop:12 }} />
      <div className={styles.postActions}>
        <Skeleton width={64} height={32} borderRadius="var(--r-full)" />
        <Skeleton width={64} height={32} borderRadius="var(--r-full)" />
        <Skeleton width={64} height={32} borderRadius="var(--r-full)" />
      </div>
    </div>
  );
}

// Chat list item skeleton
export function SkeletonChat() {
  return (
    <div className={styles.chat} aria-busy="true">
      <span className={`skeleton ${styles.circle}`} style={{ width:50, height:50 }} />
      <div style={{ flex:1 }}>
        <Skeleton width="55%" height={14} />
        <Skeleton width="80%" height={12} style={{ marginTop:5 }} />
      </div>
      <Skeleton width={32} height={11} />
    </div>
  );
}

// Video card skeleton
export function SkeletonVideoCard() {
  return (
    <div className={styles.video} aria-busy="true">
      <Skeleton width="100%" height={0} style={{ paddingBottom:'56.25%', height:'auto' }} borderRadius="var(--r-md)" />
      <div className={styles.videoMeta}>
        <span className={`skeleton ${styles.circle}`} style={{ width:36, height:36 }} />
        <div style={{ flex:1 }}>
          <Skeleton width="90%" height={14} />
          <Skeleton width="60%" height={12} style={{ marginTop:4 }} />
          <Skeleton width="40%" height={11} style={{ marginTop:4 }} />
        </div>
      </div>
    </div>
  );
}

// Story circle skeleton
export function SkeletonStory() {
  return (
    <div className={styles.story} aria-busy="true">
      <span className={`skeleton ${styles.circle}`} style={{ width:62, height:62 }} />
      <Skeleton width={50} height={10} borderRadius="var(--r-full)" style={{ marginTop:4 }} />
    </div>
  );
}
```

### Toast System

```jsx
/* frontend/src/components/ui/ToastContainer.jsx */
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { toastVariants } from '../../animations/variants';
import styles from './Toast.module.css';

const ICONS = {
  success: <CheckCircle size={18} />,
  error:   <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info:    <Info size={18} />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useUiStore();

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${styles.toast} ${styles[toast.type || 'default']}`}
            role="alert"
          >
            {/* Icon */}
            <span className={styles.icon}>{ICONS[toast.type]}</span>

            {/* Message */}
            <div className={styles.content}>
              {toast.title && <p className={styles.title}>{toast.title}</p>}
              <p className={styles.message}>{toast.message}</p>
            </div>

            {/* Action */}
            {toast.action && (
              <button className={styles.action} onClick={() => { toast.action.onClick(); removeToast(toast.id); }}>
                {toast.action.label}
              </button>
            )}

            {/* Close */}
            <button className={styles.close} onClick={() => removeToast(toast.id)} aria-label="Dismiss">
              <X size={14} />
            </button>

            {/* Auto-dismiss progress bar */}
            {toast.duration !== Infinity && (
              <div
                className={styles.progress}
                style={{ animationDuration: `${toast.duration || 4000}ms` }}
                onAnimationEnd={() => removeToast(toast.id)}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
```

### Zustand Stores

```javascript
/* frontend/src/store/authStore.js */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:  null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      updateUser: (updates) => set(state => ({ user: { ...state.user, ...updates } })),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      getToken: () => get().token,
    }),
    {
      name: 'mb-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

/* frontend/src/store/uiStore.js */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let toastId = 0;

export const useUiStore = create(
  persist(
    (set, get) => ({
      // Theme
      theme: 'system', // 'light' | 'dark' | 'system'
      setTheme: (theme) => {
        set({ theme });
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.body.classList.toggle('dark', isDark);
      },

      // Font size
      fontSize: 'default', // 'small' | 'default' | 'large' | 'xlarge'
      setFontSize: (size) => {
        set({ fontSize: size });
        document.documentElement.setAttribute('data-fontsize', size);
      },

      // Sidebar
      leftSidebarOpen:  true,
      rightSidebarOpen: true,
      mobileSidebarOpen: false,
      toggleMobileSidebar: () => set(s => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),

      // Toasts
      toasts: [],
      addToast: ({ message, title, type = 'default', duration = 4000, action }) => {
        const id = ++toastId;
        set(s => ({
          toasts: [{ id, message, title, type, duration, action }, ...s.toasts].slice(0, 5)
        }));
        if (duration !== Infinity) setTimeout(() => get().removeToast(id), duration + 300);
        return id;
      },
      removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),

      // Modals
      activeModal: null,
      modalData: null,
      openModal:  (name, data = null) => set({ activeModal: name, modalData: data }),
      closeModal: ()                   => set({ activeModal: null, modalData: null }),

      // Loading bar
      isNavigating: false,
      setNavigating: (val) => set({ isNavigating: val }),
    }),
    { name: 'mb-ui', partialize: (s) => ({ theme: s.theme, fontSize: s.fontSize }) }
  )
);
```

### API Service

```javascript
/* frontend/src/services/api.js */
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── AXIOS INSTANCE ────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ── REQUEST INTERCEPTOR — attach JWT ──────────────────────
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR — handle 401 ────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    // Return normalized error
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject({ message, status: error.response?.status, data: error.response?.data });
  }
);

// ── DEDUPLICATION (prevent identical simultaneous requests) ──
const pending = new Map();
function dedupeRequest(key, requestFn) {
  if (pending.has(key)) return pending.get(key);
  const p = requestFn().finally(() => pending.delete(key));
  pending.set(key, p);
  return p;
}

// ── AUTH ENDPOINTS ────────────────────────────────────────
export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login:    (data) => api.post('/auth/login', data),
  me:       ()     => dedupeRequest('me', () => api.get('/auth/me')),
  logout:   ()     => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

// ── USERS ENDPOINTS ───────────────────────────────────────
export const usersApi = {
  getById:   (id)    => dedupeRequest(`user-${id}`, () => api.get(`/users/${id}`)),
  update:    (data)  => api.put('/users/profile', data),
  uploadProfilePic: (formData) => api.post('/users/upload-profile-pic', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  uploadCoverPhoto: (formData) => api.post('/users/upload-cover-photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateFromUrl: (type, url) => api.put('/users/update-photo-url', { type, url }),
  getMutualFriends: (id) => api.get(`/users/${id}/mutual-friends`),
  getSuggestions: (page=1) => api.get(`/users/suggestions?page=${page}`),
  search:    (q)     => api.get(`/users/search?q=${encodeURIComponent(q)}`),
  sendFriendRequest:   (id) => api.post(`/users/${id}/friend-request`),
  acceptFriendRequest: (id) => api.put(`/users/${id}/friend-request/accept`),
  declineFriendRequest:(id) => api.delete(`/users/${id}/friend-request`),
  cancelFriendRequest: (id) => api.delete(`/users/${id}/friend-request/cancel`),
  unfriend:  (id) => api.delete(`/users/${id}/unfriend`),
  follow:    (id) => api.post(`/users/${id}/follow`),
  unfollow:  (id) => api.delete(`/users/${id}/follow`),
  block:     (id) => api.post(`/users/${id}/block`),
  unblock:   (id) => api.delete(`/users/${id}/block`),
  getSettings: () => api.get('/users/settings'),
  updateSettings: (section, data) => api.put(`/users/settings/${section}`, data),
  deleteAccount: () => api.delete('/users/account'),
};

// ── POSTS ENDPOINTS ───────────────────────────────────────
export const postsApi = {
  getFeed:   (page=1, limit=10) => api.get(`/posts/feed?page=${page}&limit=${limit}`),
  getById:   (id)  => api.get(`/posts/${id}`),
  create:    (data) => api.post('/posts', data),
  update:    (id, data) => api.put(`/posts/${id}`, data),
  delete:    (id)  => api.delete(`/posts/${id}`),
  react:     (id, reaction) => api.post(`/posts/${id}/react`, { reaction }),
  unreact:   (id)  => api.delete(`/posts/${id}/react`),
  getReactions: (id) => api.get(`/posts/${id}/reactions`),
  comment:   (id, text) => api.post(`/posts/${id}/comments`, { text }),
  deleteComment: (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`),
  likeComment: (postId, commentId) => api.post(`/posts/${postId}/comments/${commentId}/like`),
  reply:     (postId, commentId, text) => api.post(`/posts/${postId}/comments/${commentId}/replies`, { text }),
  share:     (id, data) => api.post(`/posts/${id}/share`, data),
  save:      (id)  => api.post(`/posts/${id}/save`),
  unsave:    (id)  => api.delete(`/posts/${id}/save`),
  report:    (id, reason, detail) => api.post(`/posts/${id}/report`, { reason, detail }),
  uploadMedia: (formData, onProgress) => api.post('/posts/upload-media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => onProgress?.(Math.round(e.loaded * 100 / e.total))
  }),
  getLinkPreview: (url) => api.get(`/posts/link-preview?url=${encodeURIComponent(url)}`),
};

export default api;
```

*Save Progress. Move to PROMPT-01.D.*

---

## PROMPT-01.D — Navbar (Pixel Perfect)

**What this sub-prompt does:** Builds the universal top navbar exactly matching the spec.

### File: `frontend/src/components/Navbar/Navbar.jsx`

```jsx
import { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Video, ShoppingBag, Users, Gamepad2, Bell, MessageCircle, Plus, ChevronDown, Search, X, LogOut, Settings, HelpCircle, Sun, Moon, Monitor } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useNotifStore } from '../../store/notifStore';
import { dropdownVariants, slideDown } from '../../animations/variants';
import styles from './Navbar.module.css';

// Center navigation tabs (mirrors Facebook exactly)
const NAV_TABS = [
  { path: '/',          icon: Home,        label: 'Home',        exact: true },
  { path: '/watch',     icon: Video,       label: 'Watch' },
  { path: '/marketplace',icon: ShoppingBag,label: 'Marketplace' },
  { path: '/groups',    icon: Users,       label: 'Groups' },
  { path: '/gaming',    icon: Gamepad2,    label: 'Gaming' },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useUiStore();
  const { unreadCount: notifCount } = useNotifStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Scroll detection for glass effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [searchOpen]);

  // Active tab detection
  const isActive = (tab) =>
    tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path);

  // Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.inner}>

        {/* ── LEFT: Logo + Search ─────────────────────────────── */}
        <div className={styles.left}>
          <Link to="/" className={styles.logo} aria-label="MindBook Home">
            {/* SVG Yellow 'M' Logo */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="40" height="40" rx="12" fill="#F7B928"/>
              <path d="M8 30V14l12 9 12-9v16h-5V20.8l-7 5.25-7-5.25V30H8z" fill="white"/>
            </svg>
            <span className={styles.logoText}>MindBook</span>
          </Link>

          {/* Search bar */}
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.form
                key="search-open"
                className={styles.searchForm}
                initial={{ width: 200, opacity: 0 }}
                animate={{ width: 380, opacity: 1 }}
                exit={{ width: 200, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSearch}
              >
                <Search size={16} className={styles.searchIcon} aria-hidden />
                <input
                  ref={searchInputRef}
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search MindBook..."
                  aria-label="Search"
                />
                <button type="button" className={styles.searchClose} onClick={() => { setSearchOpen(false); setSearchQuery(''); }} aria-label="Close search">
                  <X size={16} />
                </button>
              </motion.form>
            ) : (
              <motion.button
                key="search-closed"
                className={styles.searchTrigger}
                onClick={() => setSearchOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Open search"
              >
                <Search size={18} aria-hidden />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── CENTER: Navigation Tabs ──────────────────────────── */}
        <nav className={styles.center} aria-label="Main navigation">
          {NAV_TABS.map(tab => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`${styles.tab} ${isActive(tab) ? styles.activeTab : ''}`}
              aria-current={isActive(tab) ? 'page' : undefined}
              aria-label={tab.label}
              title={tab.label}
            >
              <tab.icon
                size={24}
                strokeWidth={isActive(tab) ? 2.5 : 1.8}
                color={isActive(tab) ? 'var(--brand)' : 'var(--text-secondary)'}
              />
              {/* Active underline bar */}
              {isActive(tab) && (
                <motion.span
                  className={styles.activeBar}
                  layoutId="navbar-active-bar"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ── RIGHT: Action Icons ──────────────────────────────── */}
        <div className={styles.right}>
          {/* Create Button */}
          <motion.button
            className={styles.iconBtn}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => useUiStore.getState().openModal('create-post')}
            aria-label="Create post"
          >
            <Plus size={20} />
          </motion.button>

          {/* Messenger */}
          <motion.div className={styles.iconBtnWrapper} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
            <Link to="/messages" className={styles.iconBtn} aria-label={`Messages`}>
              <MessageCircle size={20} />
            </Link>
          </motion.div>

          {/* Notifications */}
          <motion.button
            className={`${styles.iconBtn} ${styles.bellBtn}`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate('/notifications')}
            aria-label={`Notifications${notifCount > 0 ? `, ${notifCount} unread` : ''}`}
          >
            <Bell
              size={20}
              className={notifCount > 0 ? styles.bellActive : ''}
            />
            {notifCount > 0 && (
              <motion.span
                className={styles.badge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                aria-hidden
              >
                {notifCount > 99 ? '99+' : notifCount}
              </motion.span>
            )}
          </motion.button>

          {/* Account Dropdown */}
          <div className={styles.accountWrapper}>
            <motion.button
              className={styles.accountBtn}
              onClick={() => setAccountOpen(v => !v)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-expanded={accountOpen}
              aria-haspopup="true"
              aria-label="Account menu"
            >
              <Avatar size={36} src={user?.profilePicture} alt={user?.name} />
              <ChevronDown size={14} className={accountOpen ? styles.chevronUp : ''} />
            </motion.button>

            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  className={styles.dropdown}
                  variants={dropdownVariants}
                  initial="initial" animate="animate" exit="exit"
                  role="menu"
                  aria-label="Account options"
                >
                  {/* Profile link */}
                  <Link to={`/profile/${user?._id}`} className={styles.dropdownProfile} role="menuitem" onClick={() => setAccountOpen(false)}>
                    <Avatar size={48} src={user?.profilePicture} alt={user?.name} />
                    <div>
                      <p className={styles.dropdownName}>{user?.name}</p>
                      <p className={styles.dropdownSub}>See your profile</p>
                    </div>
                  </Link>

                  <div className={styles.dropdownDivider} />

                  {/* Theme switcher */}
                  <div className={styles.themeRow}>
                    <span>Display</span>
                    <div className={styles.themeButtons}>
                      {[['light', <Sun size={14}/>], ['system', <Monitor size={14}/>], ['dark', <Moon size={14}/>]].map(([t, icon]) => (
                        <button
                          key={t}
                          className={`${styles.themeBtn} ${theme === t ? styles.themeBtnActive : ''}`}
                          onClick={() => setTheme(t)}
                          aria-label={`${t} theme`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.dropdownDivider} />

                  <Link to="/settings" className={styles.dropdownItem} role="menuitem" onClick={() => setAccountOpen(false)}>
                    <Settings size={18} /> Settings & Privacy
                  </Link>
                  <Link to="/help-center" className={styles.dropdownItem} role="menuitem" onClick={() => setAccountOpen(false)}>
                    <HelpCircle size={18} /> Help & Support
                  </Link>
                  <button className={`${styles.dropdownItem} ${styles.logout}`} role="menuitem" onClick={handleLogout}>
                    <LogOut size={18} /> Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### File: `frontend/src/components/Navbar/Navbar.module.css`

```css
/* ── NAVBAR SHELL ────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--navbar-height);
  background: var(--bg-navbar);
  z-index: var(--z-navbar);
  transition: box-shadow var(--t-base), backdrop-filter var(--t-base);
}
.navbar.scrolled {
  box-shadow: var(--shadow-navbar);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.inner {
  max-width: var(--page-max-width);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--sp-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
}

/* ── LEFT SIDE ───────────────────────────────────────────── */
.left { display: flex; align-items: center; gap: var(--sp-2); flex-shrink: 0; }

.logo { display: flex; align-items: center; gap: var(--sp-2); text-decoration: none; }
.logoText { font-size: var(--fs-xl); font-weight: var(--fw-black); color: var(--brand); letter-spacing: -0.5px; }
@media (max-width: 1024px) { .logoText { display: none; } }

/* Search */
.searchTrigger {
  width: 40px; height: 40px; border-radius: var(--r-full);
  background: var(--bg-input); color: var(--text-secondary);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--t-fast);
}
.searchTrigger:hover { background: var(--bg-input-hover); color: var(--text-primary); }

.searchForm {
  display: flex; align-items: center;
  background: var(--bg-input); border-radius: var(--r-full);
  padding: 0 var(--sp-3); gap: var(--sp-2); overflow: hidden;
  border: 1.5px solid var(--border);
  transition: border-color var(--t-fast);
}
.searchForm:focus-within { border-color: var(--border-focus); box-shadow: var(--brand-glow-sm); }
.searchIcon { color: var(--text-tertiary); flex-shrink: 0; }
.searchInput { flex: 1; background: none; border: none; outline: none; font-size: var(--fs-md); color: var(--text-primary); padding: 9px 0; }
.searchClose { color: var(--text-tertiary); padding: var(--sp-1); border-radius: var(--r-full); }
.searchClose:hover { color: var(--text-primary); background: var(--bg-input-hover); }

/* ── CENTER TABS ─────────────────────────────────────────── */
.center {
  display: flex; align-items: center;
  height: 100%;
  gap: var(--sp-1);
}
@media (max-width: 767px) { .center { display: none; } }

.tab {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  width: 112px; height: 100%;
  border-radius: var(--r-md);
  text-decoration: none;
  transition: background var(--t-fast);
  color: var(--text-secondary);
}
.tab:hover { background: var(--bg-input); }
.activeTab { color: var(--brand); }

.activeBar {
  position: absolute;
  bottom: -1px;
  left: 50%; transform: translateX(-50%);
  width: 40%;
  height: 3px;
  background: var(--brand);
  border-radius: 2px 2px 0 0;
}

@media (max-width: 1024px) { .tab { width: 72px; } }

/* ── RIGHT SIDE ──────────────────────────────────────────── */
.right { display: flex; align-items: center; gap: var(--sp-2); flex-shrink: 0; }

.iconBtn {
  width: 40px; height: 40px; border-radius: var(--r-full);
  background: var(--bg-input); color: var(--text-primary);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--t-fast), color var(--t-fast);
  position: relative; cursor: pointer;
  text-decoration: none;
}
.iconBtn:hover { background: var(--bg-input-hover); }
.iconBtnWrapper { position: relative; }

.bellActive { animation: bellSwing 0.5s ease-in-out; }
@keyframes bellSwing {
  0%,100% { transform: rotate(0deg); }
  20%  { transform: rotate(12deg); }
  40%  { transform: rotate(-10deg); }
  60%  { transform: rotate(8deg); }
  80%  { transform: rotate(-6deg); }
}

.badge {
  position: absolute; top: -2px; right: -2px;
  min-width: 18px; height: 18px; padding: 0 4px;
  background: var(--error-border); color: white;
  border-radius: var(--r-full); font-size: var(--fs-xs);
  font-weight: var(--fw-bold); display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--bg-html);
}

/* Account */
.accountWrapper { position: relative; }
.accountBtn { display: flex; align-items: center; gap: var(--sp-1); background: none; cursor: pointer; }
.chevronUp { transform: rotate(180deg); transition: transform var(--t-fast); }

/* Dropdown */
.dropdown {
  position: absolute; top: calc(100% + 8px); right: 0;
  width: 320px; background: var(--bg-dropdown);
  border-radius: var(--r-2xl); box-shadow: var(--shadow-dropdown);
  border: 1px solid var(--border); overflow: hidden;
  transform-origin: top right;
}

.dropdownProfile {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-4); text-decoration: none; color: inherit;
  transition: background var(--t-fast);
}
.dropdownProfile:hover { background: var(--bg-card-hover); }
.dropdownName  { font-weight: var(--fw-bold); font-size: var(--fs-lg); }
.dropdownSub   { font-size: var(--fs-sm); color: var(--text-link); margin-top: 2px; }

.dropdownDivider { height: 1px; background: var(--border); margin: var(--sp-2) 0; }

.themeRow {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-2) var(--sp-4);
  font-size: var(--fs-md); font-weight: var(--fw-medium);
}
.themeButtons { display: flex; gap: var(--sp-1); }
.themeBtn {
  width: 32px; height: 32px; border-radius: var(--r-sm);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary); transition: all var(--t-fast);
}
.themeBtn:hover { background: var(--bg-input); color: var(--text-primary); }
.themeBtnActive { background: var(--brand-light); color: var(--brand); }

.dropdownItem {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4); width: 100%;
  font-size: var(--fs-md); color: var(--text-primary);
  text-decoration: none; transition: background var(--t-fast);
  cursor: pointer;
}
.dropdownItem:hover { background: var(--bg-card-hover); }
.logout { color: var(--text-danger); }
.logout:hover { background: var(--error-bg); }
```

*Save Progress. Move to PROMPT-01.E.*

---

## PROMPT-01.E — Mobile Bottom Navigation & Custom Cursor

**Bottom Navigation (`/components/BottomNav/BottomNav.jsx`):**

```jsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Users, Plus, Video, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNotifStore } from '../../store/notifStore';
import { useUiStore } from '../../store/uiStore';
import styles from './BottomNav.module.css';

const TABS = [
  { path: '/',             icon: Home,  label: 'Home',     exact: true },
  { path: '/friends',      icon: Users, label: 'Friends' },
  { path: null,            icon: Plus,  label: 'Create',   special: true },
  { path: '/watch',        icon: Video, label: 'Watch' },
  { path: '/notifications',icon: Bell,  label: 'Notifs' },
];

export default function BottomNav() {
  const location = useLocation();
  const { unreadCount } = useNotifStore();
  const { openModal } = useUiStore();

  const isActive = (tab) => tab.exact ? location.pathname === tab.path : location.pathname.startsWith(tab.path);

  return (
    <nav className={styles.nav} aria-label="Mobile navigation">
      {TABS.map((tab, i) => {
        if (tab.special) {
          return (
            <button key="create" className={styles.createBtn}
              onClick={() => openModal('create-post')}
              aria-label="Create post"
            >
              <motion.span
                className={styles.createInner}
                whileTap={{ scale: 0.90 }}
                whileHover={{ scale: 1.08 }}
              >
                <Plus size={24} color="white" />
              </motion.span>
            </button>
          );
        }
        return (
          <Link key={tab.path} to={tab.path} className={`${styles.tab} ${isActive(tab) ? styles.active : ''}`} aria-label={tab.label}>
            <motion.span
              className={styles.tabIcon}
              animate={{ y: isActive(tab) ? -2 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <tab.icon size={22} strokeWidth={isActive(tab) ? 2.5 : 1.8} />
              {tab.path === '/notifications' && unreadCount > 0 && (
                <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
              )}
            </motion.span>
            {isActive(tab) && (
              <motion.span
                className={styles.dot}
                layoutId="bottom-nav-dot"
                transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
```

```css
/* BottomNav.module.css */
.nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: var(--bottom-nav-safe);
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  z-index: var(--z-navbar);
}
.tab {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  height: 56px; text-decoration: none;
  color: var(--text-secondary); position: relative;
  gap: 2px;
}
.tab.active { color: var(--brand); }
.tabIcon { position: relative; }
.dot {
  position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; border-radius: var(--r-full); background: var(--brand);
}
.badge {
  position: absolute; top: -4px; right: -8px;
  background: var(--error-border); color: white;
  font-size: 9px; font-weight: var(--fw-bold); min-width: 16px;
  height: 16px; border-radius: var(--r-full); display: flex;
  align-items: center; justify-content: center; padding: 0 3px;
  border: 2px solid var(--bg-card);
}
.createBtn { flex: 1; display: flex; align-items: center; justify-content: center; background: none; }
.createInner {
  width: 48px; height: 48px; border-radius: var(--r-full);
  background: var(--brand-gradient);
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--brand-shadow); margin-bottom: 4px;
}
```

**Custom Cursor (`/components/ui/CustomCursor.jsx`):**

```jsx
import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

// Only renders on pointer:fine (desktop) devices
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const ringPos = useRef({ x: 0, y: 0 });
  const dotPos  = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const LERP = 0.12; // Ring lag factor (lower = more lag)

    // Animate ring with lerp
    const animate = () => {
      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * LERP;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e) => {
      dotPos.current.x = e.clientX;
      dotPos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isLink = el?.closest('a, button, [role="button"], [tabindex]');
      const isInput = el?.closest('input, textarea, [contenteditable]');
      setIsHovering(!!isLink && !isInput);
      setIsText(!!isInput);
    };

    const onMouseDown = () => dotRef.current && (dotRef.current.style.transform += ' scale(0.7)');
    const onMouseUp   = () => { /* reset handled by mousemove */ };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      {/* Yellow dot — snaps instantly */}
      <div
        ref={dotRef}
        className={styles.dot}
        aria-hidden="true"
      />
      {/* Ring — trails behind */}
      <div
        ref={ringRef}
        className={`
          ${styles.ring}
          ${isHovering ? styles.ringHover : ''}
          ${isText ? styles.ringText : ''}
        `}
        aria-hidden="true"
      />
    </>
  );
}
```

```css
/* CustomCursor.module.css */
/* Hide on touch devices */
@media (pointer: coarse) { .dot, .ring { display: none !important; } }
/* Hide system cursor site-wide when custom cursor is active */
@media (pointer: fine) { * { cursor: none !important; } }

.dot {
  position: fixed; top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--brand); border-radius: var(--r-full);
  pointer-events: none; z-index: var(--z-cursor);
  will-change: transform;
  transition: width 0.15s, height 0.15s;
}

.ring {
  position: fixed; top: 0; left: 0;
  width: 32px; height: 32px;
  border: 2px solid rgba(247, 185, 40, 0.55);
  border-radius: var(--r-full);
  pointer-events: none; z-index: calc(var(--z-cursor) - 1);
  will-change: transform;
  transition: width 0.2s, height 0.2s, border-color 0.2s, border-radius 0.2s;
}

.ring.ringHover {
  width: 52px; height: 52px;
  border-color: rgba(247, 185, 40, 0.80);
  background: rgba(247, 185, 40, 0.06);
}

.ring.ringText {
  width: 4px; height: 28px;
  border-radius: 2px;
  border-color: var(--brand);
  background: rgba(247, 185, 40, 0.15);
}
```

*Save Progress. PROMPT-01 complete. Move to PROMPT-02.*

---

# PROMPT-02 — Authentication System

**Trigger:** `Run PROMPT-02` *(Execute A → B → C → D → E in order)*

---

## PROMPT-02.A — Backend Auth Routes & Models

**What this sub-prompt does:** Creates the complete backend authentication system.

### File: `backend/models/User.js`

*(Full User schema — see PROMPT-04 in v6.0 for the complete schema. Minimum required fields for auth:)*

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // ── CORE IDENTITY ──────────────────────────────────────
  firstName:  { type: String, trim: true },
  lastName:   { type: String, trim: true },
  name:       { type: String, required: true, trim: true },
  username:   { type: String, unique: true, sparse: true, lowercase: true, trim: true, minlength: 3, maxlength: 30 },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String, required: true, minlength: 8 },
  role:       { type: String, enum: ['user', 'moderator', 'admin'], default: 'user' },

  // ── PROFILE MEDIA ───────────────────────────────────────
  profilePicture: { type: String, default: '/uploads/defaults/avatar.png' },
  coverPhoto:     { type: String, default: '/uploads/defaults/cover.jpg' },

  // ── OPTIONAL PROFILE INFO ──────────────────────────────
  bio:        { type: String, maxlength: 150 },
  phone:      { type: String, trim: true },
  dateOfBirth:{ type: Date },
  gender:     { type: String, enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Custom', ''] },
  genderCustom: String,
  location:   { city: String, country: String, coordinates: { lat: Number, lng: Number } },
  website:    { type: String, trim: true },
  pronouns:   String,

  // ── SOCIAL GRAPH ────────────────────────────────────────
  friends:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: {
    sent:     [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, sentAt: Date }],
    received: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, receivedAt: Date }],
  },
  followers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  closeFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  mutedUsers:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // ── PROFESSIONAL ────────────────────────────────────────
  work: [{
    title: String, company: String, companyLogo: String, description: String,
    location: String, startYear: Number, startMonth: Number,
    endYear: Number, endMonth: Number, isCurrent: Boolean, skills: [String]
  }],
  education: [{
    school: String, degree: String, field: String, description: String,
    startYear: Number, endYear: Number, isCurrent: Boolean
  }],
  skills: [{ name: String, endorsedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }],
  openToWork: { type: Boolean, default: false },
  links: {
    portfolio: String, github: String, linkedin: String,
    instagram: String, twitter: String, behance: String,
    medium: String, youtube: String, website: String
  },

  // ── CONTENT ─────────────────────────────────────────────
  savedPosts:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  pinnedPost:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },

  // ── ECONOMY ─────────────────────────────────────────────
  coins:            { type: Number, default: 0 },
  totalCoinsEarned: { type: Number, default: 0 },
  badges:     [{ name: String, icon: String, earnedAt: Date }],

  // ── ACCOUNT STATUS ──────────────────────────────────────
  isVerified:     { type: Boolean, default: false },
  isActive:       { type: Boolean, default: true },
  isSuspended:    { type: Boolean, default: false },
  suspendedUntil: Date,
  lastActive:     Date,
  onlineStatus:   { type: String, enum: ['online', 'away', 'offline', 'dnd'], default: 'offline' },

  // ── SECURITY ────────────────────────────────────────────
  passwordResetToken:   String,
  passwordResetExpires: Date,
  twoFactorEnabled:  { type: Boolean, default: false },
  twoFactorSecret:   String,
  backupCodes:       [String],
  loginHistory: [{
    ip: String, device: String, browser: String,
    location: String, at: { type: Date, default: Date.now }, success: Boolean
  }],

  // ── NOTIFICATIONS / SETTINGS ────────────────────────────
  notificationSettings: {
    messages:        { type: Boolean, default: true },
    friendRequests:  { type: Boolean, default: true },
    postLikes:       { type: Boolean, default: true },
    postComments:    { type: Boolean, default: true },
    storyReplies:    { type: Boolean, default: true },
    groupInvites:    { type: Boolean, default: true },
    birthdays:       { type: Boolean, default: true },
    memories:        { type: Boolean, default: true },
    emailNotifs:     { type: Boolean, default: true },
    pushNotifs:      { type: Boolean, default: true },
  },
  privacySettings: {
    whoCanSeeMyPosts:    { type: String, default: 'friends' },
    whoCanSeeMyFriends:  { type: String, default: 'friends' },
    whoCanSeeMyBirthday: { type: String, default: 'friends' },
    whoCanSendRequests:  { type: String, default: 'everyone' },
    whoCanMessage:       { type: String, default: 'friends' },
  },
  theme:     { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  fontSize:  { type: String, enum: ['small', 'default', 'large', 'xlarge'], default: 'default' },

  // ── WATCH / VIDEO ────────────────────────────────────────
  watchHistory: [{ videoId: String, source: String, watchedAt: Date, progress: Number }],
  watchLater:   [{ videoId: String, source: String, addedAt: Date }],
  subscribedYtChannels: [{
    channelId: String, channelTitle: String,
    channelThumbnail: String, followedAt: Date
  }],

}, { timestamps: true });

// ── INDEXES ──────────────────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ name: 'text', bio: 'text' });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastActive: -1 });
userSchema.index({ isActive: 1, isSuspended: 1 });
userSchema.index({ 'location.city': 1, 'location.country': 1 });

// ── HOOKS ─────────────────────────────────────────────────────
// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
  next();
});

// Auto-generate name from first + last
userSchema.pre('save', function(next) {
  if ((this.isModified('firstName') || this.isModified('lastName')) && !this.isModified('name')) {
    if (this.firstName || this.lastName) {
      this.name = [this.firstName, this.lastName].filter(Boolean).join(' ');
    }
  }
  next();
});

// ── METHODS ──────────────────────────────────────────────────
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  delete obj.twoFactorSecret;
  delete obj.backupCodes;
  delete obj.loginHistory;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
```

### File: `backend/controllers/authController.js`

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const { validationResult } = require('express-validator');

// ── HELPER: generate JWT ──────────────────────────────────────
const generateToken = (userId) => jwt.sign(
  { id: userId },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

// ── REGISTER ──────────────────────────────────────────────────
exports.register = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { name, email, password, phone, username, dateOfBirth, gender } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Check username uniqueness if provided
    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(409).json({ success: false, message: 'This username is already taken.' });
      }
    }

    // Create user
    const userData = { name, email, password };
    if (phone) userData.phone = phone;
    if (username) userData.username = username.toLowerCase();
    if (dateOfBirth) userData.dateOfBirth = dateOfBirth;
    if (gender) userData.gender = gender;

    // Handle profile picture (upload happens separately, this is just a URL or default)
    if (req.body.profilePictureUrl) {
      userData.profilePicture = req.body.profilePictureUrl;
    }

    const user = await User.create(userData);
    const token = generateToken(user._id);

    // Log login
    user.loginHistory.push({ ip: req.ip, at: new Date(), success: true });
    user.lastActive = new Date();
    user.onlineStatus = 'online';
    await user.save();

    // Send welcome email (async, don't block response)
    sendEmail({
      to: email,
      subject: 'Welcome to MindBook! 🎉',
      template: 'welcome',
      data: { name: user.name }
    }).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    next(error);
  }
};

// ── LOGIN ─────────────────────────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }

    const { emailOrUsername, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername.toLowerCase() },
        { username: emailOrUsername.toLowerCase() }
      ]
    });

    if (!user) {
      // Log failed attempt
      return res.status(401).json({ success: false, message: 'Incorrect email or password.' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.loginHistory.push({ ip: req.ip, at: new Date(), success: false });
      await user.save();
      return res.status(401).json({ success: false, message: 'Incorrect email or password.' });
    }

    // Check suspension
    if (user.isSuspended) {
      const until = user.suspendedUntil;
      if (!until || until > new Date()) {
        const msg = until
          ? `Your account is suspended until ${until.toLocaleDateString()}.`
          : 'Your account has been permanently suspended.';
        return res.status(403).json({ success: false, message: msg });
      }
      // Suspension expired
      user.isSuspended = false;
      user.suspendedUntil = null;
    }

    // Update login history and status
    user.loginHistory = [...(user.loginHistory || []).slice(-49), { ip: req.ip, at: new Date(), success: true }];
    user.lastActive = new Date();
    user.onlineStatus = 'online';
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    next(error);
  }
};

// ── GET CURRENT USER ──────────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('friends', 'name profilePicture onlineStatus lastActive')
      .lean();

    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    // Remove sensitive fields manually since lean() skips methods
    delete user.password;
    delete user.twoFactorSecret;
    delete user.passwordResetToken;
    delete user.backupCodes;

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// ── FORGOT PASSWORD ───────────────────────────────────────────
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always return 200 (security: don't reveal if email exists)
    if (!user) {
      return res.json({ success: true, message: 'If that email exists, a reset link was sent.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    // Send email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Reset your MindBook password',
      template: 'password-reset',
      data: { name: user.name, resetUrl }
    });

    res.json({ success: true, message: 'If that email exists, a reset link was sent.' });
  } catch (error) {
    next(error);
  }
};

// ── RESET PASSWORD ────────────────────────────────────────────
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Token is invalid or has expired.' });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const newToken = generateToken(user._id);
    res.json({ success: true, message: 'Password reset successfully!', token: newToken });
  } catch (error) {
    next(error);
  }
};
```

### File: `backend/routes/authRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// ── VALIDATION RULES ──────────────────────────────────────────
const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 60 }).withMessage('Name must be 2–60 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/\d/).withMessage('Password must contain a number'),
  body('username').optional().isAlphanumeric().isLength({ min: 3, max: 30 }).withMessage('Username must be 3–30 alphanumeric characters'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
];

const loginRules = [
  body('emailOrUsername').trim().notEmpty().withMessage('Email or username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// ── ROUTES ────────────────────────────────────────────────────
router.post('/register', authLimiter, registerRules, authController.register);
router.post('/login', authLimiter, loginRules, authController.login);
router.get('/me', authMiddleware, authController.getMe);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/reset-password/:token', authLimiter, authController.resetPassword);

module.exports = router;
```

*Save Progress. Move to PROMPT-02.B.*

---

## PROMPT-02.B — Login Page (Full Implementation)

**File: `frontend/src/pages/Login/LoginPage.jsx`**

```jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, slideUp } from '../../animations/variants';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { authApi } from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Logo3D from '../../components/3d/Logo3D';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const { addToast } = useUiStore();

  const [form, setForm] = useState({ emailOrUsername: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  // ── VALIDATE ─────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.emailOrUsername.trim()) errs.emailOrUsername = 'Email or username is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  // ── SUBMIT ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setErrors({});

    try {
      const { token, user } = await authApi.login({
        emailOrUsername: form.emailOrUsername.trim(),
        password: form.password
      });
      setAuth(user, token);
      addToast({ type: 'success', message: `Welcome back, ${user.name.split(' ')[0]}! 👋` });
      navigate(from, { replace: true });
    } catch (err) {
      setErrors({ submit: err.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Left: 3D scene — hidden on mobile */}
      <div className={styles.heroSide} aria-hidden="true">
        <Logo3D />
        <div className={styles.heroText}>
          <h1>Connect with friends.</h1>
          <h1>Share your world.</h1>
          <h1>Belong to MindBook.</h1>
        </div>
      </div>

      {/* Right: Login form */}
      <div className={styles.formSide}>
        <motion.div
          className={styles.card}
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          {/* Logo */}
          <div className={styles.logoRow}>
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#F7B928"/>
              <path d="M8 30V14l12 9 12-9v16h-5V20.8l-7 5.25-7-5.25V30H8z" fill="white"/>
            </svg>
            <span className={styles.logoText}>MindBook</span>
          </div>
          <p className={styles.tagline}>Connect with friends and the world around you.</p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <motion.div variants={slideUp}>
              <Input
                id="emailOrUsername"
                label="Email or username"
                type="text"
                value={form.emailOrUsername}
                onChange={e => setForm(f => ({ ...f, emailOrUsername: e.target.value }))}
                error={errors.emailOrUsername}
                autoComplete="username"
                autoFocus
              />
            </motion.div>

            <motion.div variants={slideUp} style={{ marginTop: 'var(--sp-3)' }}>
              <Input
                id="password"
                label="Password"
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                error={errors.password}
                autoComplete="current-password"
              />
            </motion.div>

            {/* Remember me + Forgot */}
            <div className={styles.row}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={e => setForm(f => ({ ...f, rememberMe: e.target.checked }))}
                  className={styles.checkbox}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>

            {/* Error */}
            {errors.submit && (
              <motion.p
                className={styles.submitError}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                role="alert"
              >
                {errors.submit}
              </motion.p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className={styles.submitBtn}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          {/* Divider */}
          <div className={styles.divider}><span>or</span></div>

          {/* Signup link */}
          <p className={styles.signupRow}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.signupLink}>Create new account</Link>
          </p>

          {/* Footer */}
          <p className={styles.footer}>
            <Link to="/about-mindbook">About</Link> ·{' '}
            <Link to="/privacy-policy">Privacy</Link> ·{' '}
            <Link to="/terms-of-service">Terms</Link> ·{' '}
            <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noopener noreferrer">Portfolio</a>
          </p>
          <p className={styles.copyright}>© 2026 MindBook · Created by Farmanullah Ansari</p>
        </motion.div>
      </div>
    </div>
  );
}
```

### File: `frontend/src/pages/Login/LoginPage.module.css`

```css
.container {
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  background: var(--bg-html);
}

/* ── LEFT HERO ───────────────────────────────────────────────── */
.heroSide {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--sp-12) var(--sp-8);
  gap: var(--sp-8);
}
.heroText h1 {
  font-size: var(--fs-5xl);
  font-weight: var(--fw-black);
  color: var(--text-primary);
  line-height: var(--lh-tight);
  letter-spacing: -1px;
}
@media (max-width: 900px) { .heroSide { display: none; } }

/* ── FORM SIDE ───────────────────────────────────────────────── */
.formSide {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-8) var(--sp-6);
  min-height: 100vh;
}

.card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border-radius: var(--r-2xl);
  padding: var(--sp-8) var(--sp-8);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border);
}
@media (max-width: 480px) {
  .card { padding: var(--sp-6) var(--sp-5); border-radius: var(--r-xl); }
}

.logoRow { display: flex; align-items: center; gap: var(--sp-3); margin-bottom: var(--sp-2); }
.logoText { font-size: var(--fs-3xl); font-weight: var(--fw-black); color: var(--brand); }
.tagline { color: var(--text-secondary); font-size: var(--fs-base); margin-bottom: var(--sp-6); }

.form { display: flex; flex-direction: column; gap: 0; }

.row {
  display: flex; align-items: center;
  justify-content: space-between;
  margin: var(--sp-3) 0;
}
.checkboxLabel {
  display: flex; align-items: center; gap: var(--sp-2);
  font-size: var(--fs-sm); color: var(--text-secondary); cursor: pointer;
  user-select: none;
}
.checkbox {
  width: 16px; height: 16px; border-radius: var(--r-xs);
  accent-color: var(--brand); cursor: pointer;
}
.forgotLink { font-size: var(--fs-sm); color: var(--text-link); font-weight: var(--fw-medium); }
.forgotLink:hover { color: var(--text-link-hover); text-decoration: underline; }

.submitError {
  background: var(--error-bg); border: 1px solid var(--error-border);
  border-radius: var(--r-sm); padding: var(--sp-3) var(--sp-4);
  color: var(--text-danger); font-size: var(--fs-sm);
  margin-bottom: var(--sp-3);
}
.submitBtn { width: 100%; margin-top: var(--sp-3); }

.divider {
  display: flex; align-items: center; gap: var(--sp-3);
  margin: var(--sp-5) 0; color: var(--text-tertiary); font-size: var(--fs-sm);
}
.divider::before, .divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

.signupRow { text-align: center; font-size: var(--fs-md); color: var(--text-secondary); }
.signupLink { color: var(--brand); font-weight: var(--fw-semibold); }
.signupLink:hover { text-decoration: underline; }

.footer {
  text-align: center; font-size: var(--fs-xs);
  color: var(--text-tertiary); margin-top: var(--sp-6);
}
.footer a { color: var(--text-tertiary); }
.footer a:hover { color: var(--text-secondary); text-decoration: underline; }
.copyright {
  text-align: center; font-size: var(--fs-xs);
  color: var(--text-tertiary); margin-top: var(--sp-1);
}
```

*Save Progress. Move to PROMPT-02.C.*

---

## PROMPT-02.C — Signup Page (Full Implementation)

**File: `frontend/src/pages/Register/RegisterPage.jsx`**

```jsx
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Camera, Link as LinkIcon, User, Calendar, Phone } from 'lucide-react';
import { pageVariants, staggerContainer, listItem } from '../../animations/variants';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { authApi } from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PasswordStrengthMeter from '../../components/ui/PasswordStrengthMeter';
import ProfilePicModal from '../../components/Profile/ProfilePicModal';
import styles from './RegisterPage.module.css';

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say', 'Custom'];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { addToast } = useUiStore();

  // ── FORM STATE ───────────────────────────────────────────────
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    // Optional
    username: '', phone: '', dateOfBirth: '',
    gender: '', genderCustom: '',
    profilePicture: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [picModalOpen, setPicModalOpen] = useState(false);
  const [picPreview, setPicPreview] = useState(null);

  // ── HELPERS ──────────────────────────────────────────────────
  const set = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const getPasswordStrength = (p) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8)  score++;
    if (p.length >= 12) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score; // 0-5
  };

  // ── VALIDATION ───────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Full name is required (min 2 chars)';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(form.password)) errs.password = 'Password must contain an uppercase letter';
    else if (!/\d/.test(form.password)) errs.password = 'Password must contain a number';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (form.username && (form.username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(form.username))) {
      errs.username = 'Username must be 3+ characters, letters/numbers/underscores only';
    }
    return errs;
  };

  // ── SUBMIT ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };
      if (form.username)       payload.username = form.username;
      if (form.phone)          payload.phone = form.phone;
      if (form.dateOfBirth)    payload.dateOfBirth = form.dateOfBirth;
      if (form.gender)         payload.gender = form.gender;
      if (form.genderCustom)   payload.genderCustom = form.genderCustom;
      if (form.profilePicture) payload.profilePictureUrl = form.profilePicture;

      const { token, user } = await authApi.register(payload);
      setAuth(user, token);
      addToast({ type: 'success', title: 'Welcome to MindBook! 🎉', message: `Account created for ${user.name.split(' ')[0]}` });
      navigate('/');
    } catch (err) {
      const msg = err.message || 'Registration failed. Please try again.';
      if (msg.toLowerCase().includes('email')) setErrors({ email: msg });
      else if (msg.toLowerCase().includes('username')) setErrors({ username: msg });
      else setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  const strengthScore = getPasswordStrength(form.password);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <div className={styles.header}>
          <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="12" fill="#F7B928"/>
            <path d="M8 30V14l12 9 12-9v16h-5V20.8l-7 5.25-7-5.25V30H8z" fill="white"/>
          </svg>
          <div>
            <h1 className={styles.title}>Join MindBook</h1>
            <p className={styles.subtitle}>Free forever. Connect with the world.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <motion.div
            className={styles.fields}
            variants={staggerContainer(0.06)}
            initial="initial"
            animate="animate"
          >
            {/* ── MANDATORY FIELDS ───────────────────────────── */}
            <motion.div variants={listItem}>
              <Input
                id="name" label="Full Name" required
                value={form.name} onChange={set('name')} error={errors.name}
                placeholder="Your full name"
                autoComplete="name" autoFocus
              />
            </motion.div>

            <motion.div variants={listItem}>
              <Input
                id="email" label="Email address" type="email" required
                value={form.email} onChange={set('email')} error={errors.email}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </motion.div>

            <motion.div variants={listItem}>
              <Input
                id="password" label="Password" type="password" required
                value={form.password} onChange={set('password')} error={errors.password}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                autoComplete="new-password"
                hint="Use at least 8 characters including uppercase letters and numbers."
              />
              {form.password && <PasswordStrengthMeter score={strengthScore} />}
            </motion.div>

            <motion.div variants={listItem}>
              <Input
                id="confirmPassword" label="Confirm Password" type="password" required
                value={form.confirmPassword} onChange={set('confirmPassword')} error={errors.confirmPassword}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
            </motion.div>

            {/* ── OPTIONAL FIELDS ACCORDION ─────────────────── */}
            <motion.div variants={listItem}>
              <button
                type="button"
                className={styles.optionalToggle}
                onClick={() => setShowOptional(v => !v)}
                aria-expanded={showOptional}
              >
                <span>Add more details (optional)</span>
                <motion.span
                  animate={{ rotate: showOptional ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>
            </motion.div>

            <AnimatePresence>
              {showOptional && (
                <motion.div
                  className={styles.optionalFields}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.35, ease: [0.22,1,0.36,1] }, opacity: { duration: 0.25, delay: 0.1 } } }}
                  exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.25 }, opacity: { duration: 0.15 } } }}
                >
                  {/* Profile Picture */}
                  <div className={styles.picRow}>
                    <button
                      type="button"
                      className={styles.picBtn}
                      onClick={() => setPicModalOpen(true)}
                      aria-label="Set profile picture"
                    >
                      {picPreview ? (
                        <img src={picPreview} alt="Preview" className={styles.picPreview} />
                      ) : (
                        <div className={styles.picPlaceholder}>
                          <Camera size={24} />
                        </div>
                      )}
                      <span className={styles.picLabel}>
                        {picPreview ? 'Change photo' : 'Add profile photo'}
                      </span>
                    </button>
                  </div>

                  {/* Username */}
                  <Input
                    id="username" label="Username"
                    value={form.username} onChange={set('username')} error={errors.username}
                    placeholder="yourname (letters, numbers, underscores)"
                    hint="Others can find you by your username."
                  />

                  {/* Phone */}
                  <Input
                    id="phone" label="Phone number" type="tel"
                    value={form.phone} onChange={set('phone')} error={errors.phone}
                    placeholder="+1 555 000 0000"
                    autoComplete="tel"
                    hint="Used for account security. Never shared publicly."
                  />

                  {/* Date of Birth */}
                  <Input
                    id="dateOfBirth" label="Date of birth" type="date"
                    value={form.dateOfBirth} onChange={set('dateOfBirth')}
                    hint="Won't be shown publicly unless you choose."
                    max={new Date(new Date().setFullYear(new Date().getFullYear()-13)).toISOString().split('T')[0]}
                  />

                  {/* Gender */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Gender</label>
                    <div className={styles.genderOptions}>
                      {GENDER_OPTIONS.map(opt => (
                        <button
                          key={opt} type="button"
                          className={`${styles.genderBtn} ${form.gender === opt ? styles.genderActive : ''}`}
                          onClick={() => setForm(f => ({ ...f, gender: f.gender === opt ? '' : opt }))}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <AnimatePresence>
                      {form.gender === 'Custom' && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}>
                          <Input
                            id="genderCustom" label="Your gender"
                            value={form.genderCustom} onChange={set('genderCustom')}
                            placeholder="Describe your gender identity"
                            style={{ marginTop: 'var(--sp-2)' }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── LEGAL TEXT ────────────────────────────────── */}
            <motion.div variants={listItem} className={styles.legal}>
              <p>People who use our service may have uploaded your contact information to MindBook.</p>
              <p style={{ marginTop: 'var(--sp-2)' }}>By clicking Submit, you agree to create an account and to MindBook's <Link to="/terms-of-service">Terms</Link>, <Link to="/privacy-policy">Privacy Policy</Link>, and <Link to="#">Cookies Policy</Link>.</p>
              <p style={{ marginTop: 'var(--sp-2)' }}>The Privacy Policy describes the ways we can use the information we collect when you create an account.</p>
            </motion.div>

            {/* ── GLOBAL ERROR ─────────────────────────────── */}
            {errors.submit && (
              <motion.p className={styles.submitError} initial={{ opacity:0 }} animate={{ opacity:1 }} role="alert">
                {errors.submit}
              </motion.p>
            )}

            {/* ── SUBMIT BUTTON ─────────────────────────────── */}
            <motion.div variants={listItem}>
              <Button type="submit" variant="primary" size="lg" loading={loading} className={styles.submitBtn}>
                {loading ? 'Creating account...' : 'Submit'}
              </Button>
            </motion.div>

            {/* ── LOGIN LINK ────────────────────────────────── */}
            <motion.p variants={listItem} className={styles.loginRow}>
              Already have an account? <Link to="/login" className={styles.loginLink}>Log in</Link>
            </motion.p>
          </motion.div>
        </form>

        {/* Developer credit */}
        <p className={styles.credit}>
          Created by{' '}
          <a href="https://farmanullah1.github.io/My-Portfolio" target="_blank" rel="noopener noreferrer">
            Farmanullah Ansari
          </a>
        </p>
      </motion.div>

      {/* Profile pic modal */}
      <ProfilePicModal
        open={picModalOpen}
        onClose={() => setPicModalOpen(false)}
        onSave={(url, preview) => {
          setForm(f => ({ ...f, profilePicture: url }));
          setPicPreview(preview);
          setPicModalOpen(false);
        }}
        mode="signup" // In signup mode: no backend upload yet, just stores url/blob
      />
    </div>
  );
}
```

*Save Progress. Move to PROMPT-02.D.*

---

## PROMPT-02.D — Password Strength Meter Component

```jsx
/* frontend/src/components/ui/PasswordStrengthMeter.jsx */
import { motion } from 'framer-motion';
import styles from './PasswordStrengthMeter.module.css';

const LEVELS = [
  { label: 'Very weak', color: '#f02849' },
  { label: 'Weak',      color: '#f02849' },
  { label: 'Fair',      color: '#f59e0b' },
  { label: 'Good',      color: '#f7b928' },
  { label: 'Strong',    color: '#45bd62' },
  { label: 'Very strong', color: '#1a7f37' },
];

const REQUIREMENTS = [
  { test: p => p.length >= 8,        label: 'At least 8 characters' },
  { test: p => /[A-Z]/.test(p),      label: 'One uppercase letter' },
  { test: p => /[a-z]/.test(p),      label: 'One lowercase letter' },
  { test: p => /\d/.test(p),         label: 'One number' },
  { test: p => /[^A-Za-z0-9]/.test(p), label: 'One special character' },
];

export default function PasswordStrengthMeter({ score = 0, password = '' }) {
  const level = LEVELS[Math.min(score, 5)];

  return (
    <div className={styles.wrapper} aria-label={`Password strength: ${level.label}`}>
      {/* Segments */}
      <div className={styles.segments}>
        {[1,2,3,4,5].map(i => (
          <div key={i} className={styles.segmentTrack}>
            <motion.div
              className={styles.segmentFill}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: score >= i ? 1 : 0 }}
              style={{ backgroundColor: score >= i ? level.color : 'transparent' }}
              transition={{ duration: 0.3, ease: [0.22,1,0.36,1], delay: i * 0.04 }}
            />
          </div>
        ))}
      </div>
      {/* Label */}
      <span className={styles.label} style={{ color: level.color }}>{level.label}</span>

      {/* Requirements list */}
      {password && (
        <ul className={styles.requirements} aria-label="Password requirements">
          {REQUIREMENTS.map(({ test, label }) => {
            const met = test(password);
            return (
              <li key={label} className={`${styles.req} ${met ? styles.met : ''}`} aria-checked={met} role="checkbox">
                <span className={styles.reqDot} />
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
```

```css
/* PasswordStrengthMeter.module.css */
.wrapper { margin-top: var(--sp-2); }
.segments { display: flex; gap: 4px; margin-bottom: 4px; }
.segmentTrack {
  flex: 1; height: 4px; border-radius: 2px;
  background: var(--border); overflow: hidden;
}
.segmentFill {
  height: 100%; border-radius: 2px;
  transform-origin: left center;
  transition: background-color 0.3s;
}
.label { font-size: var(--fs-xs); font-weight: var(--fw-medium); }
.requirements { list-style: none; margin-top: var(--sp-2); display: flex; flex-wrap: wrap; gap: 4px 16px; }
.req { display: flex; align-items: center; gap: 5px; font-size: var(--fs-xs); color: var(--text-tertiary); transition: color var(--t-fast); }
.req.met { color: var(--text-success); }
.reqDot {
  width: 7px; height: 7px; border-radius: var(--r-full);
  background: var(--border); transition: background var(--t-fast);
  flex-shrink: 0;
}
.met .reqDot { background: var(--success-border); }
```

*Save Progress. Move to PROMPT-02.E.*

---

## PROMPT-02.E — Admin Registration & Middleware

### File: `backend/middleware/adminOnly.js`

```javascript
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Administrator access required.' });
  }
  next();
};

module.exports = adminOnly;
```

### Admin Register Endpoint (add to authController.js)

```javascript
exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, adminSecretKey } = req.body;

    // Verify admin secret key
    if (!adminSecretKey || adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      // Don't reveal that the key was wrong specifically (security)
      return res.status(403).json({ success: false, message: 'Admin registration is restricted.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }

    const user = await User.create({
      name, email, password,
      role: 'admin',
      isVerified: true,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Admin account created.',
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    next(error);
  }
};
```

### `.env` addition
```env
# Admin secret key — required for /admin/register
ADMIN_SECRET_KEY=your-very-long-random-admin-secret-key-here-min-32-chars
```

### Rate Limiter Middleware

```javascript
/* backend/middleware/rateLimiter.js */
const rateLimit = require('express-rate-limit');

// Strict limiter for auth routes (login/register)
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please wait 15 minutes before trying again.' },
  skipSuccessfulRequests: true,
});

// Standard API limiter
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Rate limit exceeded. Please slow down.' },
});

// AI / expensive operations limiter
exports.aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { success: false, message: 'AI request limit reached. Please try again in an hour.' },
});

// Upload limiter (media)
exports.uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  keyGenerator: (req) => req.user?.id || req.ip,
  message: { success: false, message: 'Upload limit reached. Please wait a moment.' },
});
```

### Error Handler Middleware

```javascript
/* backend/middleware/errorHandler.js */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal server error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') { statusCode = 401; message = 'Invalid token.'; }
  if (err.name === 'TokenExpiredError') { statusCode = 401; message = 'Token expired.'; }

  // Multer file size
  if (err.code === 'LIMIT_FILE_SIZE') { statusCode = 413; message = 'File too large.'; }

  // Log in development only
  if (process.env.NODE_ENV === 'development') console.error('Error:', err);

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
```

*Save Progress. PROMPT-02 complete. Move to PROMPT-03.*

---

# PROMPT-03 — Profile Photo Update System

**Trigger:** `Run PROMPT-03` *(This is a critical feature — implement with full detail)*

---

## PROMPT-03.A — Backend Upload Routes

### File: `backend/middleware/upload.js`

```javascript
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// ── ENSURE UPLOAD DIRECTORIES EXIST ──────────────────────────
const dirs = [
  'uploads/profile-pics', 'uploads/cover-photos',
  'uploads/posts', 'uploads/stories', 'uploads/messages',
  'uploads/videos', 'uploads/thumbnails', 'uploads/audio',
  'uploads/documents', 'uploads/defaults'
];
dirs.forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

// ── STORAGE (save to disk) ────────────────────────────────────
const createStorage = (subfolder) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, `uploads/${subfolder}`),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${req.user.id}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  }
});

// ── FILE FILTERS ──────────────────────────────────────────────
const imageFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed (JPG, PNG, GIF, WEBP)'), false);
};

const videoFilter = (req, file, cb) => {
  const allowed = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only video files are allowed (MP4, MOV, AVI, WEBM)'), false);
};

const documentFilter = (req, file, cb) => {
  const allowed = [
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain', 'application/zip', 'application/x-rar-compressed'
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('File type not supported'), false);
};

const mediaFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg','image/png','image/gif','image/webp',
    'video/mp4','video/quicktime','video/webm',
    'audio/mpeg','audio/mp4','audio/ogg','audio/webm','audio/wav',
    'application/pdf','application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('File type not supported for messages'), false);
};

// ── CONFIGURED MULTER INSTANCES ───────────────────────────────
exports.uploadProfilePic = multer({
  storage: createStorage('profile-pics'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB
}).single('profilePicture');

exports.uploadCoverPhoto = multer({
  storage: createStorage('cover-photos'),
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
}).single('coverPhoto');

exports.uploadPostMedia = multer({
  storage: createStorage('posts'),
  fileFilter: (req, file, cb) => { imageFilter(req, file, (err, ok) => { if (ok) cb(null, true); else videoFilter(req, file, cb); }); },
  limits: { fileSize: 50 * 1024 * 1024, files: 4 } // 50MB, max 4 files
}).array('media', 4);

exports.uploadMessageMedia = multer({
  storage: createStorage('messages'),
  fileFilter: mediaFilter,
  limits: { fileSize: 50 * 1024 * 1024 }
}).single('file');

exports.uploadStoryMedia = multer({
  storage: createStorage('stories'),
  fileFilter: (req, file, cb) => { imageFilter(req, file, (err, ok) => { if (ok) cb(null, true); else videoFilter(req, file, cb); }); },
  limits: { fileSize: 50 * 1024 * 1024 }
}).single('media');

exports.uploadVideo = multer({
  storage: createStorage('videos'),
  fileFilter: videoFilter,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB for videos
}).single('video');

// ── SHARP PROCESSORS ─────────────────────────────────────────
exports.processProfilePic = async (filePath, outputPath) => {
  await sharp(filePath)
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(outputPath);
};

exports.processCoverPhoto = async (filePath, outputPath) => {
  await sharp(filePath)
    .resize(1640, 624, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(outputPath);
};

exports.generateThumbnail = async (filePath, outputPath, size = 300) => {
  await sharp(filePath)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .webp({ quality: 80 })
    .toFile(outputPath);
};
```

### File: `backend/controllers/userPhotoController.js`

```javascript
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const User = require('../models/User');
const { processProfilePic, processCoverPhoto } = require('../middleware/upload');

// ── UPLOAD PROFILE PICTURE (from file) ───────────────────────
exports.uploadProfilePic = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const inputPath = req.file.path;
    const outputFilename = `processed-${req.file.filename.replace(path.extname(req.file.filename), '.webp')}`;
    const outputPath = path.join('uploads/profile-pics', outputFilename);

    // Process with sharp
    await processProfilePic(inputPath, outputPath);

    // Delete original (keep processed)
    fs.unlinkSync(inputPath);

    const picUrl = `/uploads/profile-pics/${outputFilename}`;

    // Update user in DB
    await User.findByIdAndUpdate(req.user.id, { profilePicture: picUrl });

    res.json({ success: true, profilePicture: picUrl });
  } catch (err) {
    next(err);
  }
};

// ── UPLOAD COVER PHOTO (from file) ───────────────────────────
exports.uploadCoverPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const inputPath = req.file.path;
    const outputFilename = `processed-${req.file.filename.replace(path.extname(req.file.filename), '.webp')}`;
    const outputPath = path.join('uploads/cover-photos', outputFilename);

    await processCoverPhoto(inputPath, outputPath);
    fs.unlinkSync(inputPath);

    const coverUrl = `/uploads/cover-photos/${outputFilename}`;
    await User.findByIdAndUpdate(req.user.id, { coverPhoto: coverUrl });

    res.json({ success: true, coverPhoto: coverUrl });
  } catch (err) {
    next(err);
  }
};

// ── UPDATE PHOTO FROM URL ─────────────────────────────────────
// Users can paste a URL to instantly set their photo
exports.updatePhotoFromUrl = async (req, res, next) => {
  try {
    const { type, url } = req.body; // type: 'profile' | 'cover'
    if (!['profile', 'cover'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid type.' });
    }
    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ success: false, message: 'Valid URL required.' });
    }

    // Fetch image via backend proxy to avoid CORS issues
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: { 'Accept': 'image/*' }
    });

    const contentType = response.headers['content-type'];
    if (!contentType?.startsWith('image/')) {
      return res.status(400).json({ success: false, message: 'URL must point to an image.' });
    }

    // Save to disk
    const ext = '.webp';
    const filename = `url-${req.user.id}-${Date.now()}${ext}`;
    const folder = type === 'profile' ? 'profile-pics' : 'cover-photos';
    const outputPath = path.join(`uploads/${folder}`, filename);

    const buffer = Buffer.from(response.data);
    if (type === 'profile') {
      await require('sharp')(buffer).resize(400, 400, { fit: 'cover' }).webp({ quality: 85 }).toFile(outputPath);
    } else {
      await require('sharp')(buffer).resize(1640, 624, { fit: 'cover' }).webp({ quality: 85 }).toFile(outputPath);
    }

    const savedUrl = `/uploads/${folder}/${filename}`;
    const updateField = type === 'profile' ? { profilePicture: savedUrl } : { coverPhoto: savedUrl };
    await User.findByIdAndUpdate(req.user.id, updateField);

    res.json({ success: true, [type === 'profile' ? 'profilePicture' : 'coverPhoto']: savedUrl });
  } catch (err) {
    if (err.response || err.code === 'ECONNREFUSED') {
      return res.status(400).json({ success: false, message: 'Could not load image from that URL.' });
    }
    next(err);
  }
};
```

*Save Progress. Move to PROMPT-03.B.*

---

## PROMPT-03.B — Profile Picture Update Modal (Frontend)

```jsx
/* frontend/src/components/Profile/ProfilePicModal.jsx */
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import { Upload, Link as LinkIcon, Minus, Plus, RotateCcw, RotateCw } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { usersApi } from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import styles from './ProfilePicModal.module.css';

// ── Helper: crop image to a blob ──────────────────────────────
async function getCroppedBlob(imageSrc, croppedAreaPixels, rotation = 0) {
  const img = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const { width, height } = croppedAreaPixels;
  canvas.width = width;
  canvas.height = height;

  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-width / 2, -height / 2);
  ctx.drawImage(img, croppedAreaPixels.x, croppedAreaPixels.y, width, height, 0, 0, width, height);

  return new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 0.92));
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = url;
  });
}

export default function ProfilePicModal({ open, onClose, onSave, type = 'profile', mode = 'upload' }) {
  const { updateUser } = useAuthStore();
  const { addToast } = useUiStore();

  const [tab, setTab] = useState('upload');  // 'upload' | 'url'
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedArea, setCroppedArea] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [urlPreview, setUrlPreview] = useState(null);
  const [urlError, setUrlError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const isProfile = type === 'profile';
  const aspectRatio = isProfile ? 1 : 820 / 312;

  // ── File select ───────────────────────────────────────────────
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast({ type: 'error', message: 'Please select an image file.' });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      addToast({ type: 'error', message: 'Image must be under 10MB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImageSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ── URL preview ───────────────────────────────────────────────
  const handleUrlPreview = () => {
    setUrlError('');
    if (!urlInput.startsWith('http')) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    setUrlPreview(urlInput);
  };

  // ── Crop complete ─────────────────────────────────────────────
  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedArea(areaPixels);
  }, []);

  // ── Save from file ────────────────────────────────────────────
  const handleSaveFile = async () => {
    if (!imageSrc || !croppedArea) return;
    setUploading(true);
    setProgress(0);

    try {
      const croppedBlob = await getCroppedBlob(imageSrc, croppedArea, rotation);
      const formData = new FormData();
      formData.append(isProfile ? 'profilePicture' : 'coverPhoto', croppedBlob, 'photo.webp');

      const uploadFn = isProfile ? usersApi.uploadProfilePic : usersApi.uploadCoverPhoto;

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(p => p < 90 ? p + 10 : p);
      }, 100);

      const result = await uploadFn(formData);
      clearInterval(progressInterval);
      setProgress(100);

      const url = isProfile ? result.profilePicture : result.coverPhoto;
      updateUser(isProfile ? { profilePicture: url } : { coverPhoto: url });

      addToast({ type: 'success', message: `${isProfile ? 'Profile picture' : 'Cover photo'} updated!` });
      onSave?.(url, URL.createObjectURL(croppedBlob));
      handleClose();
    } catch (err) {
      addToast({ type: 'error', message: err.message || 'Upload failed. Try again.' });
    } finally {
      setUploading(false);
    }
  };

  // ── Save from URL ─────────────────────────────────────────────
  const handleSaveUrl = async () => {
    if (!urlInput) return;
    setUploading(true);
    try {
      const result = await usersApi.updateFromUrl(isProfile ? 'profile' : 'cover', urlInput);
      const url = isProfile ? result.profilePicture : result.coverPhoto;
      updateUser(isProfile ? { profilePicture: url } : { coverPhoto: url });
      addToast({ type: 'success', message: 'Photo updated!' });
      onSave?.(url, urlInput);
      handleClose();
    } catch (err) {
      setUrlError(err.message || 'Could not load that image URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setImageSrc(null); setCrop({ x:0,y:0 }); setZoom(1);
    setRotation(0); setUrlInput(''); setUrlPreview(null);
    setUrlError(''); setProgress(0); setUploading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isProfile ? 'Update Profile Picture' : 'Update Cover Photo'}
      size="md"
    >
      <div className={styles.content}>
        {/* ── TABS ─────────────────────────────────────────────── */}
        <div className={styles.tabs} role="tablist">
          {[['upload', <Upload size={15}/>, 'Upload File'], ['url', <LinkIcon size={15}/>, 'From URL']].map(([id, icon, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
              onClick={() => setTab(id)}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* ── UPLOAD TAB ───────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {tab === 'upload' && (
            <motion.div key="upload" initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:10}}>
              {!imageSrc ? (
                /* Drop zone */
                <div
                  className={styles.dropZone}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) { const inp = fileInputRef.current; const dt = new DataTransfer(); dt.items.add(f); inp.files = dt.files; onFileChange({ target: inp }); } }}
                  role="button"
                  tabIndex={0}
                  aria-label="Click or drag to upload image"
                  onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <Upload size={32} className={styles.dropIcon} />
                  <p className={styles.dropTitle}>Click to upload or drag & drop</p>
                  <p className={styles.dropSub}>JPG, PNG, GIF, WEBP · Max 10MB</p>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className={styles.hiddenInput} />
                </div>
              ) : (
                /* Cropper */
                <div className={styles.cropContainer}>
                  <div className={styles.cropArea}>
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      rotation={rotation}
                      aspect={aspectRatio}
                      cropShape={isProfile ? 'round' : 'rect'}
                      showGrid={!isProfile}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  {/* Controls */}
                  <div className={styles.controls}>
                    <label className={styles.controlLabel}>
                      <Minus size={14} onClick={() => setZoom(z => Math.max(1, z - 0.1))} className={styles.controlBtn} />
                      <input type="range" min={1} max={3} step={0.01} value={zoom}
                        onChange={e => setZoom(Number(e.target.value))} className={styles.slider} aria-label="Zoom" />
                      <Plus size={14} onClick={() => setZoom(z => Math.min(3, z + 0.1))} className={styles.controlBtn} />
                      <span className={styles.controlLabelText}>Zoom</span>
                    </label>
                    <div className={styles.rotateRow}>
                      <button className={styles.rotateBtn} onClick={() => setRotation(r => r - 90)} aria-label="Rotate left">
                        <RotateCcw size={16} />
                      </button>
                      <button className={styles.rotateBtn} onClick={() => setRotation(r => r + 90)} aria-label="Rotate right">
                        <RotateCw size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Upload progress */}
                  {uploading && (
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressBar}>
                        <motion.div
                          className={styles.progressFill}
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      </div>
                      <span className={styles.progressText}>{progress}%</span>
                    </div>
                  )}

                  <Button className={styles.changeBtn} variant="ghost" onClick={() => { setImageSrc(null); setZoom(1); setRotation(0); }}>
                    Choose different image
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {/* ── URL TAB ─────────────────────────────────────────── */}
          {tab === 'url' && (
            <motion.div key="url" initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} className={styles.urlTab}>
              <p className={styles.urlHint}>Paste the URL of any publicly accessible image.</p>
              <div className={styles.urlRow}>
                <input
                  type="url"
                  className={styles.urlInput}
                  value={urlInput}
                  onChange={e => { setUrlInput(e.target.value); setUrlError(''); setUrlPreview(null); }}
                  placeholder="https://example.com/photo.jpg"
                  onKeyDown={e => e.key === 'Enter' && handleUrlPreview()}
                />
                <Button variant="secondary" onClick={handleUrlPreview} disabled={!urlInput}>
                  Preview
                </Button>
              </div>
              {urlError && <p className={styles.urlError} role="alert">{urlError}</p>}
              {urlPreview && (
                <motion.div className={styles.urlPreviewWrapper} initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}}>
                  <img
                    src={urlPreview}
                    alt="Preview"
                    className={`${styles.urlPreviewImg} ${isProfile ? styles.round : ''}`}
                    onError={() => { setUrlError('Could not load image from that URL.'); setUrlPreview(null); }}
                  />
                  <p className={styles.urlPreviewOk}>✓ Image loaded successfully</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      <div className={styles.footer}>
        <Button variant="secondary" onClick={handleClose} disabled={uploading}>Cancel</Button>
        <Button
          variant="primary"
          loading={uploading}
          onClick={tab === 'upload' ? handleSaveFile : handleSaveUrl}
          disabled={(tab === 'upload' && !imageSrc) || (tab === 'url' && (!urlPreview || !!urlError))}
        >
          Save Photo
        </Button>
      </div>
    </Modal>
  );
}
```

*Save Progress. PROMPT-03 continues in PROMPT-03.C through 03.G (profile header, tabs, edit modal, etc.)*

---

# DEVELOPER LINKS — REQUIRED LOCATIONS

These links MUST appear in these specific locations across the site:

```
1. Left sidebar footer (every page):
   "Created by Farmanullah Ansari"
   [🌐 Portfolio] [LinkedIn] [GitHub]

2. Site footer:
   "© 2026 MindBook · Created by Farmanullah Ansari"
   [Portfolio] · [LinkedIn] · [GitHub]

3. /about-mindbook hero section:
   Full showcase with styled link cards

4. /meet-the-creator page:
   Full professional page with all links + resume

5. /why-mindbook page:
   Footer CTA section

6. Demo admin user profile (Portfolio tab):
   All links displayed prominently

LINKS:
  Portfolio: https://farmanullah1.github.io/My-Portfolio
  LinkedIn:  https://www.linkedin.com/in/farmanullah-ansari/
  GitHub:    https://github.com/farmanullah1
```

---

# FINAL CHECKLIST FOR EVERY COMPLETED PROMPT

```
□ Every component renders without console errors
□ Every component has loading skeleton
□ Every component has empty state with Lottie animation
□ Every component has error state with retry button
□ All API calls handle errors (try/catch, user-facing toast)
□ Every interactive element has hover animation
□ Every modal has spring entrance animation
□ Every list has stagger fade-in
□ Page transitions apply on route changes
□ Responsive at 375px, 768px, 1280px, 1440px
□ Dark mode correct on every component
□ Keyboard navigation works
□ Focus rings visible (3px yellow outline)
□ Images have alt text
□ Buttons have aria-label if icon-only
□ save_progress.md updated with this prompt's completion
```

---

*MindBook Agent Playbook — Version 7.0 MAXIMUM DETAIL EDITION | 2026*
*Developer: Farmanullah Ansari | Full Stack Software Engineer*
*Portfolio: https://farmanullah1.github.io/My-Portfolio*
*LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/*
*GitHub: https://github.com/farmanullah1*
*Rule: Save to save_progress.md after every single step. No exceptions.*

# MindBook – Agent Playbook v7.0 — CONTINUATION (PROMPT-04 → PROMPT-20)

> **This file continues directly from v7.0 Part 1.**
> **Execute every sub-prompt in order. Never skip. Always save to `save_progress.md`.**
>
> Developer: Farmanullah Ansari
> Portfolio: https://farmanullah1.github.io/My-Portfolio
> LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/
> GitHub: https://github.com/farmanullah1

---

# PROMPT-04 — Complete Messaging & WebRTC System

**Trigger:** `Run PROMPT-04`
**Goal:** A messaging experience that rivals and surpasses Facebook Messenger in every dimension — real-time delivery, rich media, voice calls, video calls, group chats, and beautiful animations.

---

## PROMPT-04.A — Database Models (Conversation & Message)

### File: `backend/models/Conversation.js`

```javascript
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const conversationSchema = new Schema({
  // ── PARTICIPANTS ─────────────────────────────────────────
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],

  // ── GROUP CHAT FIELDS (only when isGroup: true) ──────────
  isGroup:          { type: Boolean, default: false },
  groupName:        { type: String, trim: true, maxlength: 60 },
  groupIcon:        String,  // URL or emoji character
  groupDescription: { type: String, maxlength: 300 },
  groupAdmin:       { type: Schema.Types.ObjectId, ref: 'User' },
  groupModerators:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
  groupMembers:     [{ type: Schema.Types.ObjectId, ref: 'User' }],

  // ── LAST MESSAGE REFERENCE ───────────────────────────────
  lastMessage:      { type: Schema.Types.ObjectId, ref: 'Message' },
  lastMessageTime:  { type: Date, default: Date.now },
  lastMessagePreview: String,  // cached text for list display

  // ── MESSAGE REQUESTS ─────────────────────────────────────
  // 'pending' = non-friend sent first message, awaiting acceptance
  // 'accepted' = normal conversation
  // 'declined' = declined by recipient
  messageRequestStatus: {
    type: String, enum: ['pending', 'accepted', 'declined'],
    default: 'accepted'
  },
  messageRequestSentAt: Date,

  // ── PINNED MESSAGES (up to 3) ────────────────────────────
  pinnedMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],

  // ── PER-PARTICIPANT SETTINGS ─────────────────────────────
  // Stores muted, archived, nickname, theme per user
  participantSettings: [{
    user:     { type: Schema.Types.ObjectId, ref: 'User' },
    muted:    { type: Boolean, default: false },
    mutedUntil: Date,
    archived: { type: Boolean, default: false },
    nickname: String,
    theme:    { type: String, default: 'default' },
    unreadCount: { type: Number, default: 0 },
  }],

  // ── DISAPPEARING MESSAGES ────────────────────────────────
  disappearingMessages: {
    enabled:  { type: Boolean, default: false },
    duration: { type: Number, default: 86400 }, // seconds (1 day)
    enabledBy: { type: Schema.Types.ObjectId, ref: 'User' },
    enabledAt: Date,
  },

  // ── CALL HISTORY ─────────────────────────────────────────
  callLogs: [{
    type:       { type: String, enum: ['audio', 'video'] },
    initiator:  { type: Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    duration:   Number,  // seconds
    startedAt:  Date,
    endedAt:    Date,
    status:     { type: String, enum: ['completed', 'missed', 'declined', 'failed'] },
  }],

}, { timestamps: true });

// Indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageTime: -1 });
conversationSchema.index({ 'participantSettings.user': 1 });
conversationSchema.index({ messageRequestStatus: 1 });

module.exports = model('Conversation', conversationSchema);
```

### File: `backend/models/Message.js`

```javascript
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  // ── CORE ─────────────────────────────────────────────────
  conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true, index: true },
  sender:       { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // ── CONTENT ──────────────────────────────────────────────
  text:         { type: String, maxlength: 10000 },

  // ── MEDIA ────────────────────────────────────────────────
  mediaUrl:     String,
  mediaType: {
    type: String,
    enum: ['image', 'video', 'audio', 'voice', 'document', 'gif', 'sticker', 'location']
  },
  mediaMetadata: {
    fileName:    String,
    fileSize:    Number,    // bytes
    mimeType:    String,
    width:       Number,    // pixels (images/videos)
    height:      Number,    // pixels (images/videos)
    duration:    Number,    // seconds (audio/video)
    thumbnailUrl: String,   // for videos
    pages:       Number,    // for PDFs
  },

  // ── LINK PREVIEW ─────────────────────────────────────────
  linkPreview: {
    url:         String,
    title:       String,
    description: String,
    image:       String,
    domain:      String,
  },

  // ── LOCATION ─────────────────────────────────────────────
  location: {
    lat:      Number,
    lng:      Number,
    name:     String,
    address:  String,
    mapImageUrl: String,
  },

  // ── THREAD (reply) ────────────────────────────────────────
  repliedTo: { type: Schema.Types.ObjectId, ref: 'Message' },
  repliedToPreview: {  // cached for display without extra DB query
    text:     String,
    mediaType: String,
    senderName: String,
  },

  // ── FORWARDED ────────────────────────────────────────────
  isForwarded: { type: Boolean, default: false },
  forwardedFrom: { type: Schema.Types.ObjectId, ref: 'Message' },

  // ── REACTIONS ────────────────────────────────────────────
  reactions: [{
    user:  { type: Schema.Types.ObjectId, ref: 'User' },
    emoji: String,
    reactedAt: { type: Date, default: Date.now },
  }],

  // ── DELIVERY & READ STATUS ────────────────────────────────
  readBy: [{
    user:   { type: Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now },
  }],
  deliveredTo: [{
    user:       { type: Schema.Types.ObjectId, ref: 'User' },
    deliveredAt:{ type: Date, default: Date.now },
  }],

  // ── DELETION ─────────────────────────────────────────────
  isDeleted:  { type: Boolean, default: false },
  deletedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // "delete for me"
  deletedAt:  Date,

  // ── EDIT ─────────────────────────────────────────────────
  isEdited: { type: Boolean, default: false },
  editedAt: Date,
  originalText: String,

  // ── PINNED ───────────────────────────────────────────────
  isPinned: { type: Boolean, default: false },
  pinnedAt: Date,
  pinnedBy: { type: Schema.Types.ObjectId, ref: 'User' },

  // ── SYSTEM MESSAGE ────────────────────────────────────────
  // e.g., "User joined the group", "Name changed to X"
  isSystem: { type: Boolean, default: false },
  systemAction: String,  // 'group_created' | 'member_added' | 'member_removed' | 'name_changed' | etc.

  // ── DISAPPEARING ─────────────────────────────────────────
  expiresAt: Date,  // null = no expiry; set when disappearing messages enabled

  sentAt:      { type: Date, default: Date.now },
}, {
  timestamps: { createdAt: 'sentAt', updatedAt: false },
});

// Indexes
messageSchema.index({ conversation: 1, sentAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ isDeleted: 1 });
messageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });  // TTL for disappearing messages
messageSchema.index({ 'reactions.user': 1 });

module.exports = model('Message', messageSchema);
```

*Save Progress after models.*

---

## PROMPT-04.B — Socket.IO Server Setup

### File: `backend/sockets/index.js`

```javascript
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Maps to track connected users and their sockets
const userSocketMap = new Map();  // userId → Set of socketIds
const socketUserMap = new Map();  // socketId → userId

module.exports = function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // ── AUTH MIDDLEWARE ─────────────────────────────────────────
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
      if (!token) return next(new Error('Authentication required'));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('name profilePicture onlineStatus').lean();
      if (!user) return next(new Error('User not found'));

      socket.userId = decoded.id;
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  // ── CONNECTION ──────────────────────────────────────────────
  io.on('connection', async (socket) => {
    const userId = socket.userId;
    console.log(`[Socket] ${socket.user.name} connected (${socket.id})`);

    // Track this socket
    if (!userSocketMap.has(userId)) userSocketMap.set(userId, new Set());
    userSocketMap.get(userId).add(socket.id);
    socketUserMap.set(socket.id, userId);

    // Update online status in DB
    await User.findByIdAndUpdate(userId, {
      onlineStatus: 'online',
      lastActive: new Date()
    });

    // Join personal room (for receiving events)
    socket.join(`user:${userId}`);

    // Notify friends that user is online
    const user = await User.findById(userId).select('friends').lean();
    if (user?.friends) {
      user.friends.forEach(friendId => {
        io.to(`user:${friendId}`).emit('friend-online', { userId, status: 'online' });
      });
    }

    // ── JOIN CONVERSATION ─────────────────────────────────────
    socket.on('join-conversation', async ({ conversationId }) => {
      try {
        const conv = await Conversation.findById(conversationId);
        if (!conv) return;
        const isParticipant = conv.participants.some(p => p.toString() === userId);
        if (!isParticipant) return;

        socket.join(`conv:${conversationId}`);

        // Mark all messages as read
        await Message.updateMany(
          { conversation: conversationId, sender: { $ne: userId }, 'readBy.user': { $ne: userId } },
          { $push: { readBy: { user: userId, readAt: new Date() } } }
        );

        // Reset unread count for this user in this conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          $set: { 'participantSettings.$[elem].unreadCount': 0 }
        }, { arrayFilters: [{ 'elem.user': userId }] });

        // Notify others in conversation that messages are read
        socket.to(`conv:${conversationId}`).emit('messages-read', {
          conversationId,
          readBy: userId,
          readAt: new Date(),
        });
      } catch (err) { console.error('[Socket] join-conversation error:', err.message); }
    });

    // ── LEAVE CONVERSATION ────────────────────────────────────
    socket.on('leave-conversation', ({ conversationId }) => {
      socket.leave(`conv:${conversationId}`);
    });

    // ── SEND MESSAGE ──────────────────────────────────────────
    socket.on('send-message', async (data, callback) => {
      try {
        const {
          conversationId, text, mediaUrl, mediaType, mediaMetadata,
          linkPreview, location, repliedToId, isForwarded, sticker,
        } = data;

        // Verify participant
        const conv = await Conversation.findById(conversationId).lean();
        if (!conv) return callback?.({ error: 'Conversation not found' });
        const isParticipant = conv.participants.some(p => p.toString() === userId);
        if (!isParticipant) return callback?.({ error: 'Not a participant' });

        // Build message
        const messageData = {
          conversation: conversationId,
          sender: userId,
        };
        if (text?.trim()) messageData.text = text.trim();
        if (mediaUrl)    messageData.mediaUrl = mediaUrl;
        if (mediaType)   messageData.mediaType = mediaType;
        if (mediaMetadata) messageData.mediaMetadata = mediaMetadata;
        if (linkPreview) messageData.linkPreview = linkPreview;
        if (location)    messageData.location = location;
        if (repliedToId) {
          const replied = await Message.findById(repliedToId).select('text mediaType sender').lean();
          messageData.repliedTo = repliedToId;
          if (replied) {
            const senderName = await User.findById(replied.sender).select('name').lean();
            messageData.repliedToPreview = {
              text: replied.text || '',
              mediaType: replied.mediaType || null,
              senderName: senderName?.name || 'Unknown',
            };
          }
        }
        if (isForwarded) messageData.isForwarded = true;

        // Save to DB
        const message = await Message.create(messageData);
        const populatedMsg = await Message.findById(message._id)
          .populate('sender', 'name profilePicture')
          .populate('repliedTo', 'text mediaType sender')
          .lean();

        // Update conversation last message
        const preview = text?.trim() || (mediaType ? `[${mediaType}]` : '[Message]');
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message._id,
          lastMessageTime: new Date(),
          lastMessagePreview: preview,
          // Increment unread count for all participants except sender
          $inc: { 'participantSettings.$[notSender].unreadCount': 1 }
        }, {
          arrayFilters: [{ 'notSender.user': { $ne: userId } }],
          new: true,
        });

        // Emit to ALL participants in conversation room
        io.to(`conv:${conversationId}`).emit('receive-message', populatedMsg);

        // Also notify participants who aren't in the conversation room
        conv.participants.forEach(pId => {
          if (pId.toString() !== userId) {
            io.to(`user:${pId}`).emit('new-message-notification', {
              conversationId,
              message: populatedMsg,
              preview,
            });
          }
        });

        // Acknowledge back to sender
        callback?.({ success: true, message: populatedMsg });
      } catch (err) {
        console.error('[Socket] send-message error:', err);
        callback?.({ error: err.message });
      }
    });

    // ── TYPING INDICATOR ──────────────────────────────────────
    const typingTimeouts = new Map();

    socket.on('typing-start', ({ conversationId }) => {
      socket.to(`conv:${conversationId}`).emit('user-typing', {
        conversationId, userId, userName: socket.user.name
      });
      // Auto-stop typing after 5 seconds of no keystrokes
      const key = `${userId}-${conversationId}`;
      if (typingTimeouts.has(key)) clearTimeout(typingTimeouts.get(key));
      typingTimeouts.set(key, setTimeout(() => {
        socket.to(`conv:${conversationId}`).emit('user-stopped-typing', { conversationId, userId });
        typingTimeouts.delete(key);
      }, 5000));
    });

    socket.on('typing-stop', ({ conversationId }) => {
      const key = `${userId}-${conversationId}`;
      if (typingTimeouts.has(key)) { clearTimeout(typingTimeouts.get(key)); typingTimeouts.delete(key); }
      socket.to(`conv:${conversationId}`).emit('user-stopped-typing', { conversationId, userId });
    });

    // ── MESSAGE REACTION ──────────────────────────────────────
    socket.on('react-message', async ({ messageId, conversationId, emoji }, callback) => {
      try {
        const message = await Message.findById(messageId);
        if (!message) return callback?.({ error: 'Message not found' });

        const existingIdx = message.reactions.findIndex(r => r.user.toString() === userId);
        if (existingIdx >= 0) {
          if (message.reactions[existingIdx].emoji === emoji) {
            message.reactions.splice(existingIdx, 1); // Remove if same emoji (toggle)
          } else {
            message.reactions[existingIdx].emoji = emoji; // Change reaction
          }
        } else {
          message.reactions.push({ user: userId, emoji, reactedAt: new Date() });
        }
        await message.save();

        io.to(`conv:${conversationId}`).emit('message-reaction-updated', {
          messageId, reactions: message.reactions
        });
        callback?.({ success: true });
      } catch (err) { callback?.({ error: err.message }); }
    });

    // ── DELETE MESSAGE ────────────────────────────────────────
    socket.on('delete-message', async ({ messageId, conversationId, deleteForEveryone }, callback) => {
      try {
        const message = await Message.findById(messageId);
        if (!message) return callback?.({ error: 'Not found' });
        if (message.sender.toString() !== userId && !deleteForEveryone) {
          // Delete for me only
          await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedFor: userId } });
          callback?.({ success: true });
          return;
        }
        // Delete for everyone (only within 10 minutes)
        const tenMins = 10 * 60 * 1000;
        if (deleteForEveryone && (Date.now() - new Date(message.sentAt).getTime() > tenMins)) {
          return callback?.({ error: 'Can only delete for everyone within 10 minutes' });
        }
        await Message.findByIdAndUpdate(messageId, {
          isDeleted: true, deletedAt: new Date(), text: null, mediaUrl: null,
        });
        io.to(`conv:${conversationId}`).emit('message-deleted', { messageId, conversationId });
        callback?.({ success: true });
      } catch (err) { callback?.({ error: err.message }); }
    });

    // ── EDIT MESSAGE ──────────────────────────────────────────
    socket.on('edit-message', async ({ messageId, conversationId, newText }, callback) => {
      try {
        const message = await Message.findById(messageId);
        if (!message) return callback?.({ error: 'Not found' });
        if (message.sender.toString() !== userId) return callback?.({ error: 'Not your message' });
        const fiveMins = 5 * 60 * 1000;
        if (Date.now() - new Date(message.sentAt).getTime() > fiveMins) {
          return callback?.({ error: 'Can only edit within 5 minutes' });
        }
        message.originalText = message.originalText || message.text;
        message.text = newText.trim();
        message.isEdited = true;
        message.editedAt = new Date();
        await message.save();
        io.to(`conv:${conversationId}`).emit('message-edited', {
          messageId, newText: message.text, editedAt: message.editedAt
        });
        callback?.({ success: true });
      } catch (err) { callback?.({ error: err.message }); }
    });

    // ── PIN MESSAGE ───────────────────────────────────────────
    socket.on('pin-message', async ({ messageId, conversationId }, callback) => {
      try {
        const conv = await Conversation.findById(conversationId);
        if (!conv) return callback?.({ error: 'Not found' });
        if (conv.pinnedMessages.length >= 3) return callback?.({ error: 'Max 3 pinned messages allowed' });
        if (conv.pinnedMessages.includes(messageId)) return callback?.({ error: 'Already pinned' });

        await Conversation.findByIdAndUpdate(conversationId, { $push: { pinnedMessages: messageId } });
        await Message.findByIdAndUpdate(messageId, { isPinned: true, pinnedAt: new Date(), pinnedBy: userId });

        io.to(`conv:${conversationId}`).emit('message-pinned', { messageId, conversationId, pinnedBy: userId });
        callback?.({ success: true });
      } catch (err) { callback?.({ error: err.message }); }
    });

    // ── VOICE/VIDEO CALL SIGNALING ────────────────────────────
    socket.on('call-offer', ({ toUserId, offer, type }) => {
      io.to(`user:${toUserId}`).emit('call-incoming', {
        from: userId,
        fromName: socket.user.name,
        fromAvatar: socket.user.profilePicture,
        offer, type,
      });
    });

    socket.on('call-answer', ({ toUserId, answer }) => {
      io.to(`user:${toUserId}`).emit('call-answered', { from: userId, answer });
    });

    socket.on('ice-candidate', ({ toUserId, candidate }) => {
      io.to(`user:${toUserId}`).emit('ice-candidate', { from: userId, candidate });
    });

    socket.on('call-ended', ({ toUserId, conversationId, duration }) => {
      io.to(`user:${toUserId}`).emit('call-ended', { from: userId, duration });
      // Log call in conversation
      if (conversationId && duration) {
        Conversation.findByIdAndUpdate(conversationId, {
          $push: {
            callLogs: {
              type: 'audio', initiator: userId,
              participants: [userId, toUserId],
              duration, startedAt: new Date(Date.now() - duration * 1000),
              endedAt: new Date(), status: 'completed'
            }
          }
        }).catch(console.error);
      }
    });

    socket.on('call-declined', ({ toUserId }) => {
      io.to(`user:${toUserId}`).emit('call-declined', { from: userId });
    });

    socket.on('call-busy', ({ toUserId }) => {
      io.to(`user:${toUserId}`).emit('call-busy', { from: userId });
    });

    // ── NOTIFICATION ──────────────────────────────────────────
    socket.on('mark-notification-read', async ({ notificationId }) => {
      const Notification = require('../models/Notification');
      await Notification.findByIdAndUpdate(notificationId, { isRead: true }).catch(() => {});
    });

    // ── DISCONNECT ────────────────────────────────────────────
    socket.on('disconnect', async (reason) => {
      console.log(`[Socket] ${socket.user.name} disconnected (${reason})`);

      // Remove this socket from tracking
      userSocketMap.get(userId)?.delete(socket.id);
      socketUserMap.delete(socket.id);

      // Only update DB if NO other sockets from this user are connected
      if (!userSocketMap.get(userId)?.size) {
        userSocketMap.delete(userId);
        const lastActive = new Date();
        await User.findByIdAndUpdate(userId, {
          onlineStatus: 'offline',
          lastActive,
        }).catch(() => {});

        // Notify friends that user is offline
        const user = await User.findById(userId).select('friends').lean().catch(() => null);
        if (user?.friends) {
          user.friends.forEach(friendId => {
            io.to(`user:${friendId}`).emit('friend-online', {
              userId, status: 'offline', lastActive,
            });
          });
        }
      }
    });

    // ── ERROR HANDLER ─────────────────────────────────────────
    socket.on('error', (err) => {
      console.error(`[Socket] Error for ${socket.user?.name}:`, err.message);
    });
  });

  return io;
};
```

### Update `backend/server.js` to initialize Socket.IO

```javascript
// At the top of server.js
const http = require('http');
const initSocket = require('./sockets/index');

// After creating express app:
const server = http.createServer(app);
const io = initSocket(server);

// Make io available in request context
app.set('io', io);

// Change app.listen to server.listen:
server.listen(PORT, () => console.log(`Server + Socket.IO running on port ${PORT}`));
```

*Save Progress.*

---

## PROMPT-04.C — Messaging REST API Routes

### File: `backend/controllers/messageController.js`

```javascript
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const mongoose = require('mongoose');

// ── GET CONVERSATION LIST ─────────────────────────────────────
exports.getConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
      // Exclude conversations where this user has "declined" request
      $or: [
        { messageRequestStatus: 'accepted' },
        { messageRequestStatus: { $exists: false } },
        { sender: userId }  // user can always see their own pending requests
      ]
    })
    .populate('participants', 'name profilePicture onlineStatus lastActive')
    .populate('lastMessage', 'text mediaType sentAt sender isDeleted')
    .sort({ lastMessageTime: -1 })
    .limit(50)
    .lean();

    // Add per-user settings (muted, archived, unread count)
    const enriched = conversations.map(conv => {
      const settings = conv.participantSettings?.find(s => s.user?.toString() === userId) || {};
      return {
        ...conv,
        isMuted: settings.muted || false,
        isArchived: settings.archived || false,
        unreadCount: settings.unreadCount || 0,
        nickname: settings.nickname || null,
        theme: settings.theme || 'default',
      };
    });

    res.json({ success: true, conversations: enriched });
  } catch (err) { next(err); }
};

// ── GET OR CREATE DM CONVERSATION ────────────────────────────
exports.getOrCreateConversation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { userId: otherUserId } = req.params;

    if (userId === otherUserId) {
      return res.status(400).json({ success: false, message: 'Cannot message yourself' });
    }

    // Check if conversation already exists
    let conv = await Conversation.findOne({
      isGroup: false,
      participants: { $all: [userId, otherUserId], $size: 2 },
    }).populate('participants', 'name profilePicture onlineStatus lastActive');

    if (conv) return res.json({ success: true, conversation: conv });

    // Check if users are friends (determines messageRequestStatus)
    const currentUser = await User.findById(userId).select('friends blockedUsers').lean();
    const areFriends = currentUser.friends?.some(f => f.toString() === otherUserId);
    const isBlocked = currentUser.blockedUsers?.some(b => b.toString() === otherUserId);

    if (isBlocked) {
      return res.status(403).json({ success: false, message: 'You cannot message this user.' });
    }

    // Create new conversation
    conv = await Conversation.create({
      participants: [userId, otherUserId],
      isGroup: false,
      messageRequestStatus: areFriends ? 'accepted' : 'pending',
      messageRequestSentAt: areFriends ? undefined : new Date(),
      participantSettings: [
        { user: userId, unreadCount: 0 },
        { user: otherUserId, unreadCount: 0 },
      ],
    });

    await conv.populate('participants', 'name profilePicture onlineStatus lastActive');

    res.status(201).json({ success: true, conversation: conv, isNew: true });
  } catch (err) { next(err); }
};

// ── GET MESSAGES ──────────────────────────────────────────────
exports.getMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;
    const { before, limit = 30 } = req.query;

    // Verify participant
    const conv = await Conversation.findById(conversationId).lean();
    if (!conv) return res.status(404).json({ success: false, message: 'Conversation not found' });
    if (!conv.participants.some(p => p.toString() === userId)) {
      return res.status(403).json({ success: false, message: 'Not a participant' });
    }

    // Build query
    const query = {
      conversation: conversationId,
      deletedFor: { $nin: [userId] },
    };
    if (before) query.sentAt = { $lt: new Date(before) };

    const messages = await Message.find(query)
      .sort({ sentAt: -1 })
      .limit(parseInt(limit))
      .populate('sender', 'name profilePicture')
      .populate('repliedTo', 'text mediaType sender')
      .lean();

    // Return in chronological order (reverse for cursor pagination)
    messages.reverse();

    res.json({
      success: true,
      messages,
      hasMore: messages.length === parseInt(limit),
    });
  } catch (err) { next(err); }
};

// ── UPLOAD MESSAGE MEDIA ──────────────────────────────────────
exports.uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const mime = req.file.mimetype;
    let mediaType = 'document';
    if (mime.startsWith('image/')) mediaType = 'image';
    else if (mime.startsWith('video/')) mediaType = 'video';
    else if (mime.startsWith('audio/')) {
      mediaType = mime.includes('webm') || mime.includes('ogg') ? 'voice' : 'audio';
    }

    const mediaUrl = `/uploads/messages/${req.file.filename}`;

    let thumbnailUrl = null;
    // Generate thumbnail for videos
    if (mediaType === 'video') {
      try {
        const ffmpeg = require('fluent-ffmpeg');
        const thumbFilename = `thumb-${req.file.filename}.webp`;
        const thumbPath = `uploads/thumbnails/${thumbFilename}`;
        await new Promise((resolve, reject) => {
          ffmpeg(req.file.path)
            .screenshots({ count: 1, folder: 'uploads/thumbnails', filename: thumbFilename, size: '320x?' })
            .on('end', resolve)
            .on('error', reject);
        });
        thumbnailUrl = `/uploads/thumbnails/${thumbFilename}`;
      } catch (e) { /* ffmpeg not available or video processing failed */ }
    }

    const metadata = {
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: mime,
    };
    if (thumbnailUrl) metadata.thumbnailUrl = thumbnailUrl;

    res.json({ success: true, mediaUrl, mediaType, metadata, thumbnailUrl });
  } catch (err) { next(err); }
};

// ── ACCEPT MESSAGE REQUEST ────────────────────────────────────
exports.acceptRequest = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const conv = await Conversation.findByIdAndUpdate(
      conversationId,
      { messageRequestStatus: 'accepted' },
      { new: true }
    );
    // Notify requester via socket
    const io = req.app.get('io');
    conv.participants.forEach(pId => {
      if (pId.toString() !== req.user.id) {
        io.to(`user:${pId}`).emit('message-request-accepted', { conversationId });
      }
    });
    res.json({ success: true, conversation: conv });
  } catch (err) { next(err); }
};

// ── GET MESSAGE REQUESTS ──────────────────────────────────────
exports.getMessageRequests = async (req, res, next) => {
  try {
    const requests = await Conversation.find({
      participants: req.user.id,
      messageRequestStatus: 'pending',
    })
    .populate('participants', 'name profilePicture')
    .populate('lastMessage', 'text mediaType sentAt')
    .sort({ messageRequestSentAt: -1 })
    .lean();
    res.json({ success: true, requests });
  } catch (err) { next(err); }
};

// ── MUTE CONVERSATION ─────────────────────────────────────────
exports.muteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { muted, mutedUntil } = req.body;
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: {
        'participantSettings.$[elem].muted': muted,
        'participantSettings.$[elem].mutedUntil': mutedUntil,
      }
    }, { arrayFilters: [{ 'elem.user': req.user.id }] });
    res.json({ success: true });
  } catch (err) { next(err); }
};

// ── ARCHIVE CONVERSATION ──────────────────────────────────────
exports.archiveConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { archived } = req.body;
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: { 'participantSettings.$[elem].archived': archived }
    }, { arrayFilters: [{ 'elem.user': req.user.id }] });
    res.json({ success: true });
  } catch (err) { next(err); }
};

// ── CREATE GROUP CHAT ─────────────────────────────────────────
exports.createGroupChat = async (req, res, next) => {
  try {
    const { name, memberIds, icon } = req.body;
    const userId = req.user.id;

    if (!name?.trim()) return res.status(400).json({ success: false, message: 'Group name required' });
    if (!memberIds?.length || memberIds.length < 2) {
      return res.status(400).json({ success: false, message: 'At least 2 members required' });
    }

    const allParticipants = [userId, ...memberIds.filter(id => id !== userId)];
    if (allParticipants.length > 50) {
      return res.status(400).json({ success: false, message: 'Maximum 50 members in a group' });
    }

    const conv = await Conversation.create({
      participants: allParticipants,
      isGroup: true,
      groupName: name.trim(),
      groupIcon: icon || null,
      groupAdmin: userId,
      groupMembers: allParticipants,
      lastMessagePreview: 'Group created',
      lastMessageTime: new Date(),
      participantSettings: allParticipants.map(id => ({ user: id, unreadCount: 0 })),
    });

    // System message: "Group created by [Name]"
    const creator = await User.findById(userId).select('name').lean();
    await Message.create({
      conversation: conv._id,
      sender: userId,
      isSystem: true,
      systemAction: 'group_created',
      text: `${creator.name} created the group "${name.trim()}"`,
    });

    await conv.populate('participants', 'name profilePicture onlineStatus');

    // Notify all members via socket
    const io = req.app.get('io');
    allParticipants.forEach(pId => {
      io.to(`user:${pId}`).emit('group-created', { conversation: conv });
    });

    res.status(201).json({ success: true, conversation: conv });
  } catch (err) { next(err); }
};
```

### File: `backend/routes/messageRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { uploadMessageMedia } = require('../middleware/upload');
const { uploadLimiter } = require('../middleware/rateLimiter');
const ctrl = require('../controllers/messageController');

router.use(auth);

router.get('/conversations',                   ctrl.getConversations);
router.get('/conversations/requests',          ctrl.getMessageRequests);
router.get('/conversations/with/:userId',      ctrl.getOrCreateConversation);
router.post('/conversations/group',            ctrl.createGroupChat);
router.get('/conversations/:conversationId/messages', ctrl.getMessages);
router.post('/conversations/:conversationId/accept',  ctrl.acceptRequest);
router.post('/conversations/:conversationId/mute',    ctrl.muteConversation);
router.post('/conversations/:conversationId/archive', ctrl.archiveConversation);
router.post('/upload', uploadLimiter, uploadMessageMedia, ctrl.uploadMedia);

module.exports = router;
```

*Save Progress.*

---

## PROMPT-04.D — Chat List UI Component

### File: `frontend/src/pages/Messages/MessagesPage.jsx`

```jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import ConversationList from '../../components/Messaging/ConversationList';
import ChatWindow from '../../components/Messaging/ChatWindow';
import ActiveNowRow from '../../components/Messaging/ActiveNowRow';
import MessageRequests from '../../components/Messaging/MessageRequests';
import NewGroupModal from '../../components/Messaging/NewGroupModal';
import useMediaQuery from '../../hooks/useMediaQuery';
import { pageVariants } from '../../animations/variants';
import { SkeletonChat } from '../../components/ui/Skeleton';
import styles from './MessagesPage.module.css';

export default function MessagesPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const { user } = useAuthStore();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const [showRequests, setShowRequests] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // Load conversations
  useEffect(() => {
    const load = async () => {
      try {
        const [{ conversations }, { requests }] = await Promise.all([
          api.get('/messages/conversations'),
          api.get('/messages/conversations/requests'),
        ]);
        setConversations(conversations);
        setRequestCount(requests.length);
      } catch (e) {
        console.error('Failed to load conversations', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Socket: update conversation list on new message
  useEffect(() => {
    if (!socket) return;

    const onNewMsg = ({ conversationId, message, preview }) => {
      setConversations(prev => {
        const exists = prev.findIndex(c => c._id === conversationId);
        if (exists >= 0) {
          const updated = [...prev];
          updated[exists] = {
            ...updated[exists],
            lastMessagePreview: preview,
            lastMessageTime: message.sentAt,
            unreadCount: message.sender._id !== user._id
              ? (updated[exists].unreadCount || 0) + 1
              : updated[exists].unreadCount,
          };
          // Move to top
          updated.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
          return updated;
        }
        return prev;
      });
    };

    const onFriendOnline = ({ userId, status, lastActive }) => {
      setOnlineFriends(prev => {
        if (status === 'online') return [...new Set([...prev, userId])];
        return prev.filter(id => id !== userId);
      });
      setConversations(prev => prev.map(c => ({
        ...c,
        participants: c.participants.map(p =>
          p._id === userId ? { ...p, onlineStatus: status, lastActive } : p
        ),
      })));
    };

    socket.on('new-message-notification', onNewMsg);
    socket.on('friend-online', onFriendOnline);
    return () => {
      socket.off('new-message-notification', onNewMsg);
      socket.off('friend-online', onFriendOnline);
    };
  }, [socket, user]);

  // Filter conversations by search
  const filtered = conversations.filter(c => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    if (c.isGroup) return c.groupName?.toLowerCase().includes(q);
    const other = c.participants.find(p => p._id !== user._id);
    return other?.name?.toLowerCase().includes(q);
  });

  // Determine whether to show list or chat on mobile
  const showList = !isMobile || !conversationId;
  const showChat = !isMobile || !!conversationId;

  return (
    <motion.div className={styles.container} {...pageVariants}>
      {/* ── LEFT PANEL: Conversation List ──────────────────── */}
      <AnimatePresence>
        {showList && (
          <motion.aside
            className={styles.leftPanel}
            initial={isMobile ? { x: -360 } : false}
            animate={{ x: 0 }}
            exit={isMobile ? { x: -360 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className={styles.panelHeader}>
              <h1 className={styles.panelTitle}>Messages</h1>
              <div className={styles.panelActions}>
                <button
                  className={styles.headerBtn}
                  onClick={() => setShowGroupModal(true)}
                  title="New group"
                >
                  <Edit size={18} />
                </button>
                <button
                  className={styles.headerBtn}
                  onClick={() => setShowGroupModal(true)}
                  title="New conversation"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search in Messenger..."
                aria-label="Search conversations"
              />
            </div>

            {/* Message Requests Banner */}
            {requestCount > 0 && (
              <motion.button
                className={styles.requestsBanner}
                onClick={() => setShowRequests(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className={styles.requestsBadge}>{requestCount}</span>
                <span>Message requests</span>
              </motion.button>
            )}

            {/* Active Now Row */}
            <ActiveNowRow friends={conversations
              .flatMap(c => c.participants.filter(p => p._id !== user._id && p.onlineStatus === 'online'))
              .slice(0, 10)
            } />

            {/* Conversation List */}
            <div className={styles.listWrapper}>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => <SkeletonChat key={i} />)
              ) : filtered.length === 0 ? (
                <div className={styles.emptyList}>
                  <p>{search ? 'No conversations match your search.' : 'No conversations yet. Start one!'}</p>
                </div>
              ) : (
                <ConversationList
                  conversations={filtered}
                  activeId={conversationId}
                  currentUserId={user._id}
                  onSelect={id => navigate(`/messages/${id}`)}
                />
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── CENTER/RIGHT PANEL: Chat Window ────────────────── */}
      {showChat && (
        <div className={styles.chatPanel}>
          {conversationId ? (
            <ChatWindow
              key={conversationId}
              conversationId={conversationId}
              currentUser={user}
              onConversationUpdate={(update) => {
                setConversations(prev => prev.map(c =>
                  c._id === conversationId ? { ...c, ...update } : c
                ));
              }}
              onBack={() => navigate('/messages')}
              isMobile={isMobile}
            />
          ) : (
            /* Empty state — no conversation selected */
            <div className={styles.emptyChatState}>
              <div className={styles.emptyChatIcon}>💬</div>
              <h2>Your Messages</h2>
              <p>Send private messages to friends</p>
              <button className="btn btn-primary" onClick={() => setShowGroupModal(true)}>
                Send new message
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── MODALS ─────────────────────────────────────────── */}
      <MessageRequests open={showRequests} onClose={() => setShowRequests(false)} />
      <NewGroupModal open={showGroupModal} onClose={() => setShowGroupModal(false)} onCreated={conv => {
        setConversations(prev => [conv, ...prev]);
        navigate(`/messages/${conv._id}`);
        setShowGroupModal(false);
      }} />
    </motion.div>
  );
}
```

### File: `frontend/src/pages/Messages/MessagesPage.module.css`

```css
.container {
  display: flex;
  height: calc(100vh - var(--navbar-height));
  margin-top: var(--navbar-height);
  background: var(--bg-card);
  border-radius: var(--r-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  /* Override the AppLayout feed max-width for messages */
  max-width: 100%;
}

/* ── LEFT PANEL ──────────────────────────────────────────── */
.leftPanel {
  width: 360px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-card);
}
@media (max-width: 1100px) { .leftPanel { width: 300px; } }
@media (max-width: 767px) { .leftPanel { width: 100%; border-right: none; } }

.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-4) var(--sp-4) var(--sp-2);
}
.panelTitle { font-size: var(--fs-3xl); font-weight: var(--fw-black); }
.panelActions { display: flex; gap: var(--sp-1); }
.headerBtn {
  width: 36px; height: 36px; border-radius: var(--r-full);
  background: var(--bg-input); color: var(--text-primary);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--t-fast), transform var(--t-fast);
}
.headerBtn:hover { background: var(--bg-input-hover); transform: scale(1.06); }

.searchWrapper {
  position: relative;
  padding: var(--sp-2) var(--sp-4);
}
.searchIcon {
  position: absolute;
  left: calc(var(--sp-4) + 12px);
  top: 50%; transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
}
.searchInput {
  width: 100%;
  background: var(--bg-input);
  border: none; outline: none;
  border-radius: var(--r-full);
  padding: 8px 14px 8px 36px;
  font-size: var(--fs-md);
  color: var(--text-primary);
  transition: background var(--t-fast);
}
.searchInput:focus { background: var(--bg-input-hover); }
.searchInput::placeholder { color: var(--text-tertiary); }

.requestsBanner {
  margin: 0 var(--sp-3) var(--sp-2);
  padding: var(--sp-3) var(--sp-4);
  background: var(--brand-light);
  border-radius: var(--r-md);
  display: flex; align-items: center; gap: var(--sp-3);
  font-weight: var(--fw-semibold); color: var(--brand-hover);
  border: 1px solid rgba(247,185,40,0.25);
  cursor: pointer; transition: background var(--t-fast);
}
.requestsBanner:hover { background: rgba(247,185,40,0.18); }
.requestsBadge {
  background: var(--brand); color: white;
  width: 22px; height: 22px; border-radius: var(--r-full);
  font-size: var(--fs-xs); font-weight: var(--fw-bold);
  display: flex; align-items: center; justify-content: center;
}

.listWrapper { flex: 1; overflow-y: auto; padding: var(--sp-2) 0; }
.emptyList { padding: var(--sp-8) var(--sp-6); text-align: center; color: var(--text-tertiary); }

/* ── CHAT PANEL ──────────────────────────────────────────── */
.chatPanel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.emptyChatState {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: var(--sp-4);
  color: var(--text-secondary);
}
.emptyChatIcon { font-size: 64px; opacity: 0.4; }
.emptyChatState h2 { font-size: var(--fs-3xl); font-weight: var(--fw-bold); color: var(--text-primary); }
```

*Save Progress.*

---

## PROMPT-04.E — Conversation List Item Component

### File: `frontend/src/components/Messaging/ConversationList.jsx`

```jsx
import { motion } from 'framer-motion';
import { staggerContainer, listItem } from '../../animations/variants';
import ConversationItem from './ConversationItem';

export default function ConversationList({ conversations, activeId, currentUserId, onSelect }) {
  return (
    <motion.ul
      variants={staggerContainer(0.04)}
      initial="initial"
      animate="animate"
      style={{ listStyle: 'none', padding: 0 }}
    >
      {conversations.map(conv => (
        <motion.li key={conv._id} variants={listItem}>
          <ConversationItem
            conversation={conv}
            currentUserId={currentUserId}
            isActive={conv._id === activeId}
            onClick={() => onSelect(conv._id)}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### File: `frontend/src/components/Messaging/ConversationItem.jsx`

```jsx
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { BellOff, Archive } from 'lucide-react';
import Avatar from '../ui/Avatar';
import styles from './ConversationItem.module.css';

function formatPreview(conv, currentUserId) {
  if (!conv.lastMessage) return 'No messages yet';
  const msg = conv.lastMessagePreview || '';
  const isSent = conv.lastMessage?.sender?._id === currentUserId || conv.lastMessage?.sender === currentUserId;
  if (isSent) return `You: ${msg}`;
  return msg;
}

export default function ConversationItem({ conversation: conv, currentUserId, isActive, onClick }) {
  const other = useMemo(() =>
    conv.isGroup ? null : conv.participants.find(p => p._id !== currentUserId),
    [conv, currentUserId]
  );

  const name = conv.isGroup ? conv.groupName : other?.name;
  const avatar = conv.isGroup ? null : other?.profilePicture;
  const isOnline = other?.onlineStatus === 'online';
  const unread = conv.unreadCount > 0;
  const preview = formatPreview(conv, currentUserId);
  const time = conv.lastMessageTime
    ? formatDistanceToNow(new Date(conv.lastMessageTime), { addSuffix: false })
        .replace('about ', '').replace(' ago', '').replace('less than a minute', 'now')
    : '';

  return (
    <motion.button
      className={`${styles.item} ${isActive ? styles.active : ''} ${unread ? styles.unread : ''}`}
      onClick={onClick}
      whileHover={{ backgroundColor: isActive ? undefined : 'var(--bg-card-hover)' }}
      whileTap={{ scale: 0.99 }}
      role="option"
      aria-selected={isActive}
    >
      {/* Avatar */}
      <div className={styles.avatarWrapper}>
        {conv.isGroup ? (
          <div className={styles.groupIcon}>
            {conv.groupIcon && conv.groupIcon.length <= 2
              ? <span className={styles.groupEmoji}>{conv.groupIcon}</span>
              : <img src={conv.groupIcon || '/uploads/defaults/group.png'} alt={name} className={styles.groupImg} />
            }
          </div>
        ) : (
          <Avatar
            size={50}
            src={avatar}
            alt={name}
            online={isOnline}
          />
        )}
        {conv.isMuted && <BellOff size={12} className={styles.mutedIcon} />}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={`${styles.name} ${unread ? styles.nameBold : ''}`}>{name}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.bottom}>
          <span className={`${styles.preview} ${unread ? styles.previewBold : ''}`}>
            {preview.length > 38 ? preview.slice(0, 38) + '…' : preview}
          </span>
          {unread && (
            <motion.span
              className={styles.badge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {conv.unreadCount > 99 ? '99+' : conv.unreadCount}
            </motion.span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
```

### File: `frontend/src/components/Messaging/ConversationItem.module.css`

```css
.item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--r-md);
  cursor: pointer;
  text-align: left;
  transition: background var(--t-fast);
  position: relative;
  background: transparent;
}
.item.active { background: var(--brand-light); }
.item.active:hover { background: var(--brand-light) !important; }

.avatarWrapper { position: relative; flex-shrink: 0; }
.groupIcon {
  width: 50px; height: 50px; border-radius: var(--r-full);
  background: var(--brand-light); display: flex; align-items: center; justify-content: center;
}
.groupEmoji { font-size: 22px; }
.groupImg { width: 50px; height: 50px; border-radius: var(--r-full); object-fit: cover; }
.mutedIcon {
  position: absolute; bottom: 0; right: 0;
  background: var(--bg-input); border-radius: var(--r-full); padding: 2px;
  color: var(--text-tertiary);
}

.content { flex: 1; min-width: 0; }
.top { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); }
.name { font-size: var(--fs-base); color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nameBold { font-weight: var(--fw-bold); }
.time { font-size: var(--fs-xs); color: var(--text-tertiary); flex-shrink: 0; white-space: nowrap; }
.bottom { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-2); margin-top: 2px; }
.preview { font-size: var(--fs-sm); color: var(--text-secondary); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; flex: 1; }
.previewBold { font-weight: var(--fw-semibold); color: var(--text-primary); }
.badge {
  background: var(--brand); color: white;
  min-width: 20px; height: 20px; border-radius: var(--r-full);
  font-size: var(--fs-xs); font-weight: var(--fw-bold);
  display: flex; align-items: center; justify-content: center;
  padding: 0 5px; flex-shrink: 0;
}
```

*Save Progress.*

---

## PROMPT-04.F — Voice & Video Call UI (WebRTC)

### File: `frontend/src/components/Messaging/CallWindow.jsx`

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Monitor, Maximize2, Minimize2, UserPlus } from 'lucide-react';
import Avatar from '../ui/Avatar';
import styles from './CallWindow.module.css';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

// ── AUDIO CALL WINDOW ─────────────────────────────────────────
export function AudioCallWindow({ callee, socket, onEnd, offer, isIncoming }) {
  const [status, setStatus] = useState(isIncoming ? 'ringing' : 'calling');
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [duration, setDuration] = useState(0);
  const [durationInterval, setDurationInterval] = useState(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);

  // Format duration as HH:MM:SS
  const formatDuration = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
      : `${m}:${String(sec).padStart(2,'0')}`;
  };

  const startTimer = useCallback(() => {
    setStatus('connected');
    const interval = setInterval(() => setDuration(d => d + 1), 1000);
    setDurationInterval(interval);
  }, []);

  // Setup WebRTC on mount
  useEffect(() => {
    const setup = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = stream;

        const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        pcRef.current = pc;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = ({ candidate }) => {
          if (candidate) socket.emit('ice-candidate', { toUserId: callee._id, candidate });
        };

        pc.ontrack = (event) => {
          const audio = document.getElementById('remote-audio');
          if (audio) audio.srcObject = event.streams[0];
        };

        if (isIncoming && offer) {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
        } else {
          const offerDesc = await pc.createOffer();
          await pc.setLocalDescription(offerDesc);
          socket.emit('call-offer', { toUserId: callee._id, offer: offerDesc, type: 'audio' });
        }
      } catch (err) {
        console.error('WebRTC setup failed:', err);
        setStatus('failed');
      }
    };
    setup();

    // Socket event handlers
    const onAnswered = async ({ answer }) => {
      try {
        await pcRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
        startTimer();
      } catch (e) { console.error(e); }
    };
    const onIce = async ({ candidate }) => {
      try { await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate)); } catch (e) {}
    };
    const onEnded = () => handleEnd();
    const onDeclined = () => { setStatus('declined'); setTimeout(handleEnd, 2000); };

    socket.on('call-answered', onAnswered);
    socket.on('ice-candidate', onIce);
    socket.on('call-ended', onEnded);
    socket.on('call-declined', onDeclined);

    return () => {
      socket.off('call-answered', onAnswered);
      socket.off('ice-candidate', onIce);
      socket.off('call-ended', onEnded);
      socket.off('call-declined', onDeclined);
      cleanup();
    };
  }, []);

  const acceptCall = async () => {
    try {
      const answer = await pcRef.current?.createAnswer();
      await pcRef.current?.setLocalDescription(answer);
      socket.emit('call-answer', { toUserId: callee._id, answer });
      startTimer();
    } catch (e) { console.error('Accept call error:', e); }
  };

  const handleEnd = useCallback(() => {
    socket.emit('call-ended', { toUserId: callee._id, duration });
    clearInterval(durationInterval);
    cleanup();
    onEnd(duration);
  }, [duration, durationInterval]);

  const cleanup = () => {
    localStreamRef.current?.getTracks().forEach(t => t.stop());
    pcRef.current?.close();
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(t => { t.enabled = muted; });
      setMuted(m => !m);
    }
  };

  return (
    <motion.div
      className={styles.audioCallWindow}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      {/* Hidden audio element for remote stream */}
      <audio id="remote-audio" autoPlay playsInline />

      {/* Background blur */}
      <div className={styles.callBg} style={{ backgroundImage: `url(${callee.profilePicture})` }} />
      <div className={styles.callBgOverlay} />

      {/* Content */}
      <div className={styles.callContent}>
        {/* Pulse ring while connecting/ringing */}
        <div className={styles.avatarContainer}>
          {(status === 'calling' || status === 'ringing') && (
            <>
              <motion.div className={styles.pulseRing}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div className={styles.pulseRing}
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
            </>
          )}
          <Avatar size={120} src={callee.profilePicture} alt={callee.name} />
        </div>

        <h2 className={styles.calleeName}>{callee.name}</h2>
        <p className={styles.callStatus}>
          {status === 'calling'   && 'Calling...'}
          {status === 'ringing'   && 'Incoming call...'}
          {status === 'connected' && formatDuration(duration)}
          {status === 'declined'  && 'Call declined'}
          {status === 'failed'    && 'Call failed'}
        </p>

        {/* Controls */}
        <div className={styles.callControls}>
          {/* Ringing: accept/decline */}
          {status === 'ringing' && isIncoming ? (
            <>
              <CallBtn icon={PhoneOff} color="danger" label="Decline" onClick={() => { socket.emit('call-declined', { toUserId: callee._id }); handleEnd(); }} />
              <CallBtn icon={Phone} color="success" label="Accept" onClick={acceptCall} />
            </>
          ) : (
            <>
              <CallBtn icon={muted ? MicOff : Mic} label={muted ? 'Unmute' : 'Mute'} onClick={toggleMute} active={muted} />
              <CallBtn icon={PhoneOff} color="danger" label="End" onClick={handleEnd} large />
              <CallBtn icon={speaker ? Volume2 : VolumeX} label="Speaker" onClick={() => setSpeaker(s => !s)} active={!speaker} />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── VIDEO CALL WINDOW ─────────────────────────────────────────
export function VideoCallWindow({ callee, socket, onEnd, offer, isIncoming }) {
  const [status, setStatus] = useState(isIncoming ? 'ringing' : 'calling');
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideControlsTimerRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    const setup = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      pcRef.current = pc;
      stream.getTracks().forEach(t => pc.addTrack(t, stream));
      pc.ontrack = e => { if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0]; };
      pc.onicecandidate = ({ candidate }) => { if (candidate) socket.emit('ice-candidate', { toUserId: callee._id, candidate }); };

      if (!isIncoming) {
        const o = await pc.createOffer();
        await pc.setLocalDescription(o);
        socket.emit('call-offer', { toUserId: callee._id, offer: o, type: 'video' });
      } else if (offer) {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
      }
    };
    setup().catch(console.error);

    socket.on('call-answered', async ({ answer }) => {
      await pcRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
      setStatus('connected');
      const i = setInterval(() => setDuration(d => d + 1), 1000);
      return () => clearInterval(i);
    });
    socket.on('ice-candidate', async ({ candidate }) => {
      try { await pcRef.current?.addIceCandidate(new RTCIceCandidate(candidate)); } catch(e){}
    });
    socket.on('call-ended', () => handleEnd());

    resetHideTimer();
    return () => {
      clearTimeout(hideControlsTimerRef.current);
      localStreamRef.current?.getTracks().forEach(t => t.stop());
      pcRef.current?.close();
    };
  }, []);

  const handleEnd = () => {
    socket.emit('call-ended', { toUserId: callee._id, duration });
    onEnd(duration);
  };

  const acceptCall = async () => {
    const a = await pcRef.current?.createAnswer();
    await pcRef.current?.setLocalDescription(a);
    socket.emit('call-answer', { toUserId: callee._id, answer: a });
    setStatus('connected');
  };

  const toggleCamera = () => {
    localStreamRef.current?.getVideoTracks().forEach(t => { t.enabled = cameraOff; });
    setCameraOff(c => !c);
  };
  const toggleMic = () => {
    localStreamRef.current?.getAudioTracks().forEach(t => { t.enabled = muted; });
    setMuted(m => !m);
  };

  return (
    <div className={styles.videoCallWindow} onMouseMove={resetHideTimer} onClick={resetHideTimer}>
      {/* Remote video */}
      <video ref={remoteVideoRef} autoPlay playsInline className={styles.remoteVideo} />

      {/* No video placeholder */}
      {status !== 'connected' && (
        <div className={styles.videoPlaceholder}>
          <Avatar size={120} src={callee.profilePicture} alt={callee.name} />
          <p className={styles.videoStatus}>
            {status === 'calling' ? 'Calling...' : 'Incoming video call...'}
          </p>
        </div>
      )}

      {/* Self video (PiP) */}
      <motion.div
        className={styles.selfVideoPip}
        drag dragConstraints={{ left: -300, right: 0, top: -500, bottom: 0 }}
        dragMomentum={false}
      >
        {cameraOff ? (
          <div className={styles.camOffPip}><Avatar size={60} src={callee.profilePicture} /></div>
        ) : (
          <video ref={localVideoRef} autoPlay playsInline muted className={styles.selfVideo} />
        )}
      </motion.div>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className={styles.videoControls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {status === 'ringing' && isIncoming ? (
              <>
                <CallBtn icon={PhoneOff} color="danger" label="Decline" onClick={() => { socket.emit('call-declined', { toUserId: callee._id }); handleEnd(); }} />
                <CallBtn icon={Video} color="success" label="Accept" onClick={acceptCall} />
              </>
            ) : (
              <>
                <CallBtn icon={muted ? MicOff : Mic}      label={muted ? 'Unmute' : 'Mute'}             onClick={toggleMic}    active={muted} />
                <CallBtn icon={cameraOff ? VideoOff : Video} label={cameraOff ? 'Start camera' : 'Stop camera'} onClick={toggleCamera} active={cameraOff} />
                <CallBtn icon={Monitor}                   label="Share screen"                            onClick={() => {}} />
                <CallBtn icon={PhoneOff} color="danger" label="End" onClick={handleEnd} large />
                <CallBtn icon={isFullscreen ? Minimize2 : Maximize2} label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} onClick={() => { setIsFullscreen(f => !f); }} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── INCOMING CALL MODAL ───────────────────────────────────────
export function IncomingCallModal({ caller, type, onAccept, onDecline, onMessage }) {
  return (
    <motion.div
      className={styles.incomingCallModal}
      initial={{ scale: 0.8, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className={styles.incomingContent}>
        <Avatar size={72} src={caller.profilePicture} alt={caller.name} />
        <div>
          <p className={styles.incomingName}>{caller.name}</p>
          <p className={styles.incomingType}>MindBook {type === 'video' ? 'Video' : 'Voice'} Call</p>
        </div>
      </div>
      <div className={styles.incomingActions}>
        <button className={`${styles.callAction} ${styles.declineAction}`} onClick={onDecline}>
          <PhoneOff size={22} />
          <span>Decline</span>
        </button>
        {onMessage && (
          <button className={`${styles.callAction} ${styles.messageAction}`} onClick={onMessage}>
            Message
          </button>
        )}
        <button className={`${styles.callAction} ${styles.acceptAction}`} onClick={onAccept}>
          {type === 'video' ? <Video size={22} /> : <Phone size={22} />}
          <span>Accept</span>
        </button>
      </div>
    </motion.div>
  );
}

// ── SHARED CALL BUTTON ────────────────────────────────────────
function CallBtn({ icon: Icon, color, label, onClick, active, large }) {
  return (
    <motion.button
      className={`${styles.callBtn} ${color === 'danger' ? styles.dangerBtn : color === 'success' ? styles.successBtn : styles.defaultBtn} ${active ? styles.activeMuted : ''} ${large ? styles.largeBtn : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      title={label}
    >
      <Icon size={large ? 22 : 18} />
      {large && <span className={styles.btnLabel}>{label}</span>}
    </motion.button>
  );
}
```

### File: `frontend/src/components/Messaging/CallWindow.module.css`

```css
/* ── AUDIO CALL ─────────────────────────────────────────────── */
.audioCallWindow {
  position: fixed; inset: 0; z-index: var(--z-modal);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.callBg {
  position: absolute; inset: -20px;
  background-size: cover; background-position: center;
  filter: blur(30px); scale: 1.1;
}
.callBgOverlay { position: absolute; inset: 0; background: rgba(0,0,0,0.65); }
.callContent {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: var(--sp-5); padding: var(--sp-10);
  color: white;
}
.avatarContainer { position: relative; display: flex; align-items: center; justify-content: center; }
.pulseRing {
  position: absolute;
  width: 130px; height: 130px;
  border: 3px solid rgba(255,255,255,0.4);
  border-radius: var(--r-full);
}
.calleeName { font-size: var(--fs-4xl); font-weight: var(--fw-bold); }
.callStatus { font-size: var(--fs-xl); opacity: 0.85; font-weight: var(--fw-medium); }

.callControls { display: flex; gap: var(--sp-6); align-items: center; margin-top: var(--sp-6); }
.callBtn {
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-1);
  width: 60px; height: 60px; border-radius: var(--r-full);
  font-size: var(--fs-sm);
}
.largeBtn { width: 72px; height: 72px; }
.defaultBtn { background: rgba(255,255,255,0.15); color: white; }
.defaultBtn:hover { background: rgba(255,255,255,0.25); }
.dangerBtn { background: var(--error-border); color: white; }
.dangerBtn:hover { background: #c71f3a; }
.successBtn { background: var(--online); color: white; }
.successBtn:hover { background: #267a3c; }
.activeMuted { background: rgba(255,255,255,0.3) !important; }
.btnLabel { font-size: 10px; white-space: nowrap; }

/* ── VIDEO CALL ─────────────────────────────────────────────── */
.videoCallWindow {
  position: fixed; inset: 0; z-index: var(--z-modal);
  background: #000; overflow: hidden;
}
.remoteVideo { width: 100%; height: 100%; object-fit: cover; }
.videoPlaceholder {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: var(--sp-5);
  color: white; background: #1a1a2e;
}
.videoStatus { font-size: var(--fs-xl); opacity: 0.8; }

.selfVideoPip {
  position: absolute; bottom: 120px; right: 20px;
  width: 120px; height: 160px; border-radius: var(--r-lg);
  overflow: hidden; border: 2px solid rgba(255,255,255,0.3);
  cursor: grab; z-index: 10;
}
.selfVideoPip:active { cursor: grabbing; }
.selfVideo { width: 100%; height: 100%; object-fit: cover; }
.camOffPip { width: 100%; height: 100%; background: #2a2a2a; display: flex; align-items: center; justify-content: center; }

.videoControls {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: var(--sp-6);
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  display: flex; align-items: center; justify-content: center; gap: var(--sp-5);
}

/* ── INCOMING CALL MODAL ────────────────────────────────────── */
.incomingCallModal {
  position: fixed; top: var(--sp-5); right: var(--sp-5);
  z-index: var(--z-toast);
  background: var(--bg-card);
  border-radius: var(--r-2xl);
  box-shadow: var(--shadow-2xl);
  padding: var(--sp-5);
  width: 320px;
  border: 1px solid var(--border);
}
.incomingContent { display: flex; align-items: center; gap: var(--sp-4); margin-bottom: var(--sp-5); }
.incomingName { font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--text-primary); }
.incomingType { font-size: var(--fs-sm); color: var(--text-secondary); margin-top: 2px; }
.incomingActions { display: flex; align-items: center; justify-content: space-around; }
.callAction {
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-1);
  width: 64px; height: 64px; border-radius: var(--r-full);
  font-size: var(--fs-xs); font-weight: var(--fw-medium);
  transition: all var(--t-fast);
}
.declineAction { background: var(--error-bg); color: var(--text-danger); }
.declineAction:hover { background: var(--text-danger); color: white; }
.acceptAction { background: var(--success-bg); color: var(--online); }
.acceptAction:hover { background: var(--online); color: white; }
.messageAction { background: var(--bg-input); color: var(--text-secondary); font-size: var(--fs-xs); width: auto; height: auto; padding: var(--sp-2) var(--sp-4); }
```

*Save Progress after call system.*

---

# PROMPT-05 — Unified Video Hub with YouTube

*(Full implementation — see PROMPT-04 in v6.0 for API details)*

## PROMPT-05.A — SourceBadge Component

```jsx
/* frontend/src/components/VideoHub/SourceBadge.jsx */
import styles from './SourceBadge.module.css';

const MindBookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="12" fill="#F7B928"/>
    <path d="M8 30V14l12 9 12-9v16h-5V20.8l-7 5.25-7-5.25V30H8z" fill="white"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="14" height="10" viewBox="0 0 24 17" fill="none">
    <rect width="24" height="17" rx="4" fill="#FF0000"/>
    <polygon points="10,5 17,8.5 10,12" fill="white"/>
  </svg>
);

const SOURCE_CONFIG = {
  mindbook: { label: 'MindBook', Icon: MindBookIcon, colorVar: '#F7B928', bg: 'rgba(247,185,40,0.15)' },
  youtube:  { label: 'YouTube',  Icon: YouTubeIcon,  colorVar: '#FF0000', bg: 'rgba(255,0,0,0.12)' },
};

export default function SourceBadge({ source, size = 'sm', className = '' }) {
  const config = SOURCE_CONFIG[source];
  if (!config) return null;

  const { label, Icon, colorVar, bg } = config;
  const isLarge = size === 'lg';

  return (
    <span
      className={`${styles.badge} ${isLarge ? styles.large : ''} ${className}`}
      style={{ background: bg, borderColor: `${colorVar}33` }}
      title={`From ${label}`}
      aria-label={`Source: ${label}`}
    >
      <Icon />
      {isLarge && <span className={styles.label} style={{ color: colorVar }}>{label}</span>}
    </span>
  );
}
```

```css
/* SourceBadge.module.css */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 7px; border-radius: var(--r-full);
  border: 1px solid transparent; font-size: var(--fs-xs);
  font-weight: var(--fw-semibold); line-height: 1;
  white-space: nowrap; backdrop-filter: blur(4px);
}
.large { padding: 5px 10px; }
.label { font-size: var(--fs-sm); }
```

---

## PROMPT-05.B — VideoCard Component

```jsx
/* frontend/src/components/VideoHub/VideoCard.jsx */
import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, MoreVertical, Radio } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Tilt from 'react-parallax-tilt';
import Avatar from '../ui/Avatar';
import SourceBadge from './SourceBadge';
import { usersApi } from '../../services/api';
import { useUiStore } from '../../store/uiStore';
import styles from './VideoCard.module.css';

function formatViews(n) {
  if (!n) return '0 views';
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n/1_000).toFixed(1)}K views`;
  return `${n} views`;
}
function formatDuration(sec) {
  if (!sec) return '';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`;
}

export default function VideoCard({ video, showChannel = true, horizontal = false }) {
  const navigate = useNavigate();
  const { addToast } = useUiStore();
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const previewRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const playerPath = video.source === 'youtube'
    ? `/watch/yt/${video.youtubeId}`
    : `/watch/video/${video._id}`;

  // Start preview after 800ms hover
  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    hoverTimerRef.current = setTimeout(() => {
      if (previewRef.current && video.previewUrl) {
        previewRef.current.play().catch(() => {});
        setPreviewPlaying(true);
      }
    }, 800);
  }, [video.previewUrl]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setPreviewPlaying(false);
    clearTimeout(hoverTimerRef.current);
    if (previewRef.current) {
      previewRef.current.pause();
      previewRef.current.currentTime = 0;
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await usersApi.saveToWatchLater(video._id || video.youtubeId, video.source);
      setSaved(s => !s);
      addToast({ type: 'success', message: saved ? 'Removed from Watch Later' : 'Saved to Watch Later' });
    } catch (err) {
      addToast({ type: 'error', message: 'Failed to save video' });
    }
  };

  const channelName = video.source === 'youtube' ? video.channelTitle : video.uploader?.name;
  const channelAvatar = video.source === 'mindbook' ? video.uploader?.profilePicture : null;
  const publishedAt = video.publishedAt || video.createdAt;

  return (
    <Tilt
      tiltMaxAngleX={horizontal ? 0 : 3}
      tiltMaxAngleY={horizontal ? 0 : 3}
      glareEnable={!horizontal}
      glareMaxOpacity={0.04}
      scale={1.01}
      transitionSpeed={400}
      className={styles.tiltWrapper}
    >
      <motion.article
        className={`${styles.card} ${horizontal ? styles.horizontal : ''}`}
        whileHover={{ y: horizontal ? 0 : -3 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── THUMBNAIL ─────────────────────────────────────── */}
        <Link to={playerPath} className={styles.thumbnailLink}>
          <div className={styles.thumbnail}>
            {/* Main thumbnail */}
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className={`${styles.thumbImg} ${previewPlaying ? styles.thumbHidden : ''}`}
              loading="lazy"
              width={320}
              height={180}
            />

            {/* Preview video (muted, starts on hover) */}
            {video.previewUrl && (
              <video
                ref={previewRef}
                className={`${styles.previewVideo} ${previewPlaying ? styles.previewVisible : ''}`}
                src={video.previewUrl}
                muted loop playsInline
              />
            )}

            {/* Source badge — ALWAYS visible */}
            <SourceBadge source={video.source} className={styles.sourceBadge} />

            {/* Duration */}
            {video.duration && (
              <span className={styles.duration}>{formatDuration(video.duration)}</span>
            )}

            {/* LIVE badge */}
            {video.isLive && (
              <span className={styles.liveBadge}>
                <Radio size={10} /> LIVE
              </span>
            )}

            {/* Watch progress bar */}
            {video.watchProgress > 0 && (
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${video.watchProgress}%` }} />
              </div>
            )}

            {/* Save to Watch Later — appears on hover */}
            <motion.button
              className={styles.saveBtn}
              onClick={handleSave}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
              transition={{ duration: 0.15 }}
              aria-label={saved ? 'Remove from Watch Later' : 'Save to Watch Later'}
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </motion.button>
          </div>
        </Link>

        {/* ── INFO ──────────────────────────────────────────── */}
        <div className={styles.info}>
          {showChannel && (
            <button
              className={styles.channelAvatar}
              onClick={() => video.source === 'mindbook'
                ? navigate(`/channel/${video.uploader?._id}`)
                : navigate(`/watch/youtube?channel=${video.channelId}`)
              }
              aria-label={`View ${channelName}'s channel`}
            >
              {channelAvatar
                ? <Avatar size={36} src={channelAvatar} alt={channelName} />
                : <div className={styles.ytChannelIcon}>
                    {channelName?.charAt(0).toUpperCase()}
                  </div>
              }
            </button>
          )}

          <div className={styles.meta}>
            <Link to={playerPath} className={styles.titleLink}>
              <h3 className={styles.title}>{video.title}</h3>
            </Link>
            <div className={styles.metaRow}>
              <span className={styles.channelName}>{channelName}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.views}>{formatViews(video.viewCount)}</span>
              <span className={styles.dot}>·</span>
              {publishedAt && <span className={styles.time}>{formatDistanceToNow(new Date(publishedAt), { addSuffix: true })}</span>}
            </div>
            {/* Source label (visible below meta) */}
            <SourceBadge source={video.source} className={styles.sourceLabel} />
          </div>

          <button className={styles.moreBtn} aria-label="More options">
            <MoreVertical size={16} />
          </button>
        </div>
      </motion.article>
    </Tilt>
  );
}
```

```css
/* VideoCard.module.css */
.tiltWrapper { display: block; }

.card { background: var(--bg-card); border-radius: var(--r-lg); overflow: hidden; display: flex; flex-direction: column; }
.horizontal { flex-direction: row; }

/* ── THUMBNAIL ─────────────────────────────────────────────── */
.thumbnailLink { display: block; text-decoration: none; }
.thumbnail { position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden; background: var(--bg-input); }
.horizontal .thumbnail { padding-bottom: 0; width: 168px; min-height: 94px; flex-shrink: 0; }

.thumbImg, .previewVideo {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.4s ease;
}
.thumbHidden { opacity: 0; }
.previewVideo { opacity: 0; }
.previewVisible { opacity: 1; }
.card:hover .thumbImg:not(.thumbHidden) { transform: scale(1.04); }

.sourceBadge { position: absolute; top: var(--sp-2); right: var(--sp-2); }
.duration {
  position: absolute; bottom: var(--sp-2); right: var(--sp-2);
  background: rgba(0,0,0,0.8); color: white;
  font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  padding: 2px 5px; border-radius: var(--r-xs);
}
.liveBadge {
  position: absolute; top: var(--sp-2); left: var(--sp-2);
  background: var(--error-border); color: white;
  font-size: var(--fs-xs); font-weight: var(--fw-bold);
  padding: 2px 7px; border-radius: var(--r-full);
  display: flex; align-items: center; gap: 3px;
  animation: live-pulse 2s ease-in-out infinite;
}
@keyframes live-pulse { 50% { opacity: 0.7; } }
.progressBar {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; background: rgba(255,255,255,0.2);
}
.progressFill { height: 100%; background: var(--brand); }
.saveBtn {
  position: absolute; top: var(--sp-2); right: var(--sp-2);
  width: 32px; height: 32px; border-radius: var(--r-full);
  background: rgba(0,0,0,0.7); color: white;
  display: flex; align-items: center; justify-content: center;
}

/* ── INFO ──────────────────────────────────────────────────── */
.info { display: flex; gap: var(--sp-3); padding: var(--sp-3); align-items: flex-start; }
.channelAvatar { flex-shrink: 0; background: none; }
.ytChannelIcon {
  width: 36px; height: 36px; border-radius: var(--r-full);
  background: var(--brand-light); color: var(--brand);
  display: flex; align-items: center; justify-content: center;
  font-weight: var(--fw-bold); font-size: var(--fs-lg);
}

.meta { flex: 1; min-width: 0; }
.titleLink { text-decoration: none; }
.title {
  font-size: var(--fs-base); font-weight: var(--fw-semibold);
  color: var(--text-primary); line-height: var(--lh-snug);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  margin-bottom: var(--sp-1);
}
.metaRow { display: flex; align-items: center; flex-wrap: wrap; gap: 2px; }
.channelName { font-size: var(--fs-sm); color: var(--text-secondary); }
.channelName:hover { color: var(--text-primary); }
.dot { color: var(--text-tertiary); font-size: var(--fs-xs); }
.views, .time { font-size: var(--fs-sm); color: var(--text-secondary); }
.sourceLabel { margin-top: var(--sp-1); }
.moreBtn {
  flex-shrink: 0; width: 32px; height: 32px; border-radius: var(--r-full);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary); opacity: 0;
  transition: opacity var(--t-fast), background var(--t-fast);
}
.card:hover .moreBtn { opacity: 1; }
.moreBtn:hover { background: var(--bg-input); color: var(--text-primary); }
```

*Save Progress.*

---

# PROMPT-06 — News Feed Deep Dive

## PROMPT-06.A — Post Card (Full Implementation)

```jsx
/* frontend/src/components/Feed/PostCard.jsx */
import { useState, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { formatDistanceToNow } from 'date-fns';
import { Globe, Users, Lock, MoreHorizontal, MessageCircle, Share2, Bookmark, BookmarkCheck, Flag, UserMinus, BellOff, Copy, ExternalLink, Trash2, Edit3, Pin, X, Heart, Laugh, Angry, Frown, Zap } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import Avatar from '../ui/Avatar';
import ImageGrid from './ImageGrid';
import CommentSection from './CommentSection';
import ReactionPicker from './ReactionPicker';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { postsApi } from '../../services/api';
import styles from './PostCard.module.css';

const PRIVACY_ICONS = {
  public: { Icon: Globe, label: 'Public' },
  friends: { Icon: Users, label: 'Friends' },
  private: { Icon: Lock, label: 'Only me' },
};

const REACTIONS = [
  { key: 'like',  emoji: '👍', label: 'Like',  color: '#F7B928' },
  { key: 'love',  emoji: '❤️', label: 'Love',  color: '#f33e58' },
  { key: 'haha',  emoji: '😂', label: 'Haha',  color: '#f7b928' },
  { key: 'wow',   emoji: '😮', label: 'Wow',   color: '#f7b928' },
  { key: 'sad',   emoji: '😢', label: 'Sad',   color: '#f7b928' },
  { key: 'angry', emoji: '😡', label: 'Angry', color: '#e9710f' },
];

const PostCard = memo(function PostCard({ post: initialPost, onDelete }) {
  const { user } = useAuthStore();
  const { addToast, openModal } = useUiStore();
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);
  const [showComments, setShowComments] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [textExpanded, setTextExpanded] = useState(false);
  const pickerTimerRef = useRef(null);

  const isOwn = post.user._id === user?._id || post.user === user?._id;
  const userReaction = post.reactions?.find(r => r.user === user?._id || r.user?._id === user?._id);
  const privacyConfig = PRIVACY_ICONS[post.privacy] || PRIVACY_ICONS.public;
  const PrivacyIcon = privacyConfig.Icon;

  // Scroll-reveal animation
  const [revealRef, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const revealStyle = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px) scale(1)' : 'translateY(24px) scale(0.98)',
    config: { tension: 180, friction: 22 },
  });

  // ── REACT TO POST ──────────────────────────────────────────
  const handleReact = async (reactionKey) => {
    setShowReactionPicker(false);
    const prev = userReaction?.reaction;
    const isRemove = prev === reactionKey;

    // Optimistic update
    setPost(p => {
      const filtered = (p.reactions || []).filter(r => r.user !== user._id && r.user?._id !== user._id);
      return {
        ...p,
        reactions: isRemove ? filtered : [...filtered, { user: user._id, reaction: reactionKey }],
      };
    });

    try {
      if (isRemove) await postsApi.unreact(post._id);
      else await postsApi.react(post._id, reactionKey);
    } catch (err) {
      // Revert
      setPost(initialPost);
      addToast({ type: 'error', message: 'Failed to react. Try again.' });
    }
  };

  // ── SAVE POST ──────────────────────────────────────────────
  const handleSave = async () => {
    setSaved(s => !s);
    try {
      if (saved) await postsApi.unsave(post._id);
      else await postsApi.save(post._id);
      addToast({ type: 'success', message: saved ? 'Removed from Saved' : 'Post saved! View in your Saved.' });
    } catch { setSaved(s => !s); }
  };

  // ── DELETE POST ────────────────────────────────────────────
  const handleDelete = async () => {
    setMenuOpen(false);
    try {
      await postsApi.delete(post._id);
      addToast({ type: 'success', message: 'Post deleted.' });
      onDelete?.(post._id);
    } catch { addToast({ type: 'error', message: 'Failed to delete post.' }); }
  };

  // ── SHARE POST ─────────────────────────────────────────────
  const handleShare = () => {
    openModal('share-post', { post });
  };

  // Reaction picker hover logic
  const startPickerTimer = () => {
    pickerTimerRef.current = setTimeout(() => setShowReactionPicker(true), 500);
  };
  const cancelPickerTimer = () => {
    clearTimeout(pickerTimerRef.current);
  };

  // Text truncation
  const TEXT_LIMIT = 280;
  const longText = post.content && post.content.length > TEXT_LIMIT;
  const displayText = !longText || textExpanded ? post.content : post.content.slice(0, TEXT_LIMIT) + '…';

  // Reaction summary
  const reactionCounts = (post.reactions || []).reduce((acc, r) => {
    acc[r.reaction] = (acc[r.reaction] || 0) + 1;
    return acc;
  }, {});
  const topReactions = Object.entries(reactionCounts)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 3)
    .map(([key]) => REACTIONS.find(r => r.key === key));
  const totalReactions = (post.reactions || []).length;

  const currentReaction = REACTIONS.find(r => r.key === userReaction?.reaction);

  return (
    <animated.div ref={revealRef} style={revealStyle}>
      <Tilt
        tiltMaxAngleX={2} tiltMaxAngleY={2}
        glareEnable glareMaxOpacity={0.03}
        scale={1.005} transitionSpeed={600}
        className={styles.tiltWrapper}
      >
        <article className={styles.card} aria-label={`Post by ${post.user.name}`}>

          {/* ── HEADER ──────────────────────────────────────── */}
          <div className={styles.header}>
            <Link to={`/profile/${post.user._id || post.user}`} className={styles.avatarLink}>
              <Avatar
                size={40}
                src={post.user.profilePicture}
                alt={post.user.name}
                online={post.user.onlineStatus === 'online'}
              />
            </Link>

            <div className={styles.headerMeta}>
              <div className={styles.headerTop}>
                <Link to={`/profile/${post.user._id || post.user}`} className={styles.authorName}>
                  {post.user.name}
                </Link>
                {post.taggedFriends?.length > 0 && (
                  <span className={styles.withText}>
                    {' '}is with{' '}
                    <Link to={`/profile/${post.taggedFriends[0]._id}`}>{post.taggedFriends[0].name}</Link>
                    {post.taggedFriends.length > 1 && ` and ${post.taggedFriends.length - 1} others`}
                  </span>
                )}
                {post.feeling && (
                  <span className={styles.feeling}> — feeling {post.feeling.emoji} {post.feeling.label}</span>
                )}
              </div>
              <div className={styles.headerBottom}>
                <Link to={`/posts/${post._id}`} className={styles.timestamp} title={new Date(post.createdAt).toLocaleString()}>
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </Link>
                <span className={styles.dot}>·</span>
                <PrivacyIcon size={12} className={styles.privacyIcon} aria-label={privacyConfig.label} />
                {post.location && (
                  <><span className={styles.dot}>·</span><span className={styles.location}>📍 {post.location.name}</span></>
                )}
              </div>
            </div>

            {/* ── OPTIONS MENU ─────────────────────────────── */}
            <div className={styles.menuWrapper}>
              <motion.button
                className={styles.menuBtn}
                onClick={() => setMenuOpen(m => !m)}
                whileHover={{ scale: 1.1, background: 'var(--bg-input)' }}
                whileTap={{ scale: 0.9 }}
                aria-label="Post options"
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <MoreHorizontal size={18} />
              </motion.button>
              <AnimatePresence>
                {menuOpen && (
                  <>
                    <div className={styles.menuBackdrop} onClick={() => setMenuOpen(false)} />
                    <motion.ul
                      className={styles.menu}
                      initial={{ opacity:0, scale:0.88, y:-8 }}
                      animate={{ opacity:1, scale:1, y:0, transition:{ duration:0.16, ease:[0.22,1,0.36,1] } }}
                      exit={{ opacity:0, scale:0.92, y:-6, transition:{ duration:0.12 } }}
                      role="menu"
                    >
                      {isOwn ? [
                        { icon: Edit3,   label: 'Edit post',           action: () => openModal('edit-post', { post }) },
                        { icon: Pin,     label: 'Pin to profile',      action: () => {} },
                        { icon: BellOff, label: 'Turn off notifications', action: () => {} },
                        { icon: Copy,    label: 'Copy link',           action: () => { navigator.clipboard.writeText(`${window.location.origin}/posts/${post._id}`); addToast({ type:'success', message:'Link copied!' }); setMenuOpen(false); } },
                        { icon: Trash2,  label: 'Delete post',         action: handleDelete, danger: true },
                      ] : [
                        { icon: Bookmark,   label: saved ? 'Unsave post' : 'Save post', action: handleSave },
                        { icon: UserMinus,  label: `Unfollow ${post.user.name}`,         action: () => {} },
                        { icon: BellOff,    label: 'Hide post',                           action: () => {} },
                        { icon: ExternalLink, label: 'Copy link',                         action: () => { navigator.clipboard.writeText(`${window.location.origin}/posts/${post._id}`); addToast({ type:'success', message:'Link copied!' }); setMenuOpen(false); } },
                        { icon: Flag,       label: 'Report post',                         action: () => { setMenuOpen(false); openModal('report', { entityType: 'post', entityId: post._id }); }, danger: true },
                      ]].map(({ icon: Icon, label, action, danger }) => (
                        <motion.li key={label} role="menuitem">
                          <button
                            className={`${styles.menuItem} ${danger ? styles.menuItemDanger : ''}`}
                            onClick={() => { action(); setMenuOpen(false); }}
                          >
                            <Icon size={16} /> {label}
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── CONTENT ─────────────────────────────────────── */}
          {post.content && (
            <div className={styles.content}>
              <p className={styles.text}>{displayText}</p>
              {longText && (
                <button className={styles.seeMore} onClick={() => setTextExpanded(e => !e)}>
                  {textExpanded ? 'See less' : 'See more'}
                </button>
              )}
            </div>
          )}

          {/* ── BACKGROUND COLOR POST ───────────────────────── */}
          {post.backgroundColor && (
            <div className={styles.colorPost} style={{ background: post.backgroundColor }}>
              <p className={styles.colorText}>{post.content}</p>
            </div>
          )}

          {/* ── MEDIA GRID ──────────────────────────────────── */}
          {post.images?.length > 0 && <ImageGrid images={post.images} />}
          {post.videoUrl && (
            <video src={post.videoUrl} controls className={styles.video} />
          )}

          {/* ── YOUTUBE EMBED ────────────────────────────────── */}
          {post.youtubeId && (
            <div className={styles.youtubeWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.youtubeEmbed}
                title="YouTube video"
              />
              <SourceBadge source="youtube" size="sm" className={styles.ytBadge} />
            </div>
          )}

          {/* ── POLL ────────────────────────────────────────── */}
          {post.poll && <PollWidget poll={post.poll} postId={post._id} />}

          {/* ── LINK PREVIEW ────────────────────────────────── */}
          {post.linkPreview && (
            <a href={post.linkPreview.url} target="_blank" rel="noopener noreferrer" className={styles.linkPreview}>
              {post.linkPreview.image && <img src={post.linkPreview.image} alt="" className={styles.linkImg} />}
              <div className={styles.linkMeta}>
                <p className={styles.linkDomain}>{post.linkPreview.domain}</p>
                <p className={styles.linkTitle}>{post.linkPreview.title}</p>
                {post.linkPreview.description && <p className={styles.linkDesc}>{post.linkPreview.description}</p>}
              </div>
            </a>
          )}

          {/* ── REACTION SUMMARY ────────────────────────────── */}
          {totalReactions > 0 && (
            <div className={styles.reactionSummary}>
              <button className={styles.reactionEmojis} onClick={() => openModal('reactions', { postId: post._id })} aria-label={`${totalReactions} reactions`}>
                {topReactions.map(r => r && <span key={r.key}>{r.emoji}</span>)}
                <span className={styles.reactionCount}>{totalReactions}</span>
              </button>
              <div className={styles.commentShareCount}>
                {post.comments?.length > 0 && (
                  <button className={styles.countBtn} onClick={() => setShowComments(s => !s)}>
                    {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                  </button>
                )}
                {post.shares > 0 && <span className={styles.countBtn}>{post.shares} shares</span>}
              </div>
            </div>
          )}

          {/* ── DIVIDER ─────────────────────────────────────── */}
          <div className={styles.divider} />

          {/* ── ACTION BUTTONS ──────────────────────────────── */}
          <div className={styles.actions}>
            {/* Like / Reaction button */}
            <div
              className={styles.reactionWrapper}
              onMouseEnter={startPickerTimer}
              onMouseLeave={() => { cancelPickerTimer(); setTimeout(() => setShowReactionPicker(false), 300); }}
            >
              <motion.button
                className={`${styles.actionBtn} ${userReaction ? styles.reacted : ''}`}
                style={{ color: userReaction ? currentReaction?.color : undefined }}
                onClick={() => handleReact('like')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.92 }}
                aria-label={userReaction ? `Remove ${currentReaction?.label} reaction` : 'Like'}
              >
                {userReaction ? (
                  <span className={styles.reactionEmoji}>{currentReaction?.emoji}</span>
                ) : (
                  <Heart size={20} />
                )}
                <span>{currentReaction?.label || 'Like'}</span>
              </motion.button>

              {/* Reaction picker popup */}
              <AnimatePresence>
                {showReactionPicker && (
                  <ReactionPicker
                    reactions={REACTIONS}
                    onReact={handleReact}
                    onClose={() => setShowReactionPicker(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Comment button */}
            <motion.button
              className={styles.actionBtn}
              onClick={() => setShowComments(s => !s)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Comment"
            >
              <MessageCircle size={20} />
              <span>Comment</span>
            </motion.button>

            {/* Share button */}
            <motion.button
              className={styles.actionBtn}
              onClick={handleShare}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Share"
            >
              <Share2 size={20} />
              <span>Share</span>
            </motion.button>

            {/* Save button */}
            <motion.button
              className={`${styles.actionBtn} ${saved ? styles.saved : ''}`}
              onClick={handleSave}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              aria-label={saved ? 'Unsave' : 'Save'}
            >
              {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
              <span>{saved ? 'Saved' : 'Save'}</span>
            </motion.button>
          </div>

          {/* ── COMMENTS SECTION ────────────────────────────── */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.3 }, opacity: { duration: 0.2, delay: 0.1 } } }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.25 } }}
              >
                <CommentSection postId={post._id} initialComments={post.comments || []} currentUser={user} />
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      </Tilt>
    </animated.div>
  );
});

export default PostCard;
```

*Save Progress after PostCard.*

---

## PROMPT-06.B — Reaction Picker Component

```jsx
/* frontend/src/components/Feed/ReactionPicker.jsx */
import { motion } from 'framer-motion';
import styles from './ReactionPicker.module.css';

export default function ReactionPicker({ reactions, onReact, onClose }) {
  return (
    <motion.div
      className={styles.picker}
      initial={{ scale: 0.6, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
      exit={{ scale: 0.6, opacity: 0, y: 8, transition: { duration: 0.12 } }}
      role="toolbar" aria-label="Reactions"
      onMouseEnter={e => e.stopPropagation()}
    >
      {reactions.map((r, i) => (
        <motion.button
          key={r.key}
          className={styles.emoji}
          onClick={() => onReact(r.key)}
          initial={{ scale: 0.4, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 20, delay: i * 0.04 } }}
          whileHover={{ scale: 1.45, y: -8, transition: { type: 'spring', stiffness: 500, damping: 18 } }}
          whileTap={{ scale: 0.9 }}
          aria-label={r.label}
          title={r.label}
        >
          <span className={styles.emojiChar}>{r.emoji}</span>
          <span className={styles.tooltip}>{r.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
```

```css
/* ReactionPicker.module.css */
.picker {
  position: absolute; bottom: calc(100% + 8px); left: 0;
  display: flex; align-items: center; gap: var(--sp-1);
  padding: var(--sp-2) var(--sp-3);
  background: var(--bg-card);
  border-radius: var(--r-full);
  box-shadow: var(--shadow-dropdown);
  border: 1px solid var(--border);
  z-index: var(--z-popover);
  transform-origin: bottom left;
}
.emoji {
  position: relative; display: flex; align-items: center;
  justify-content: center; cursor: pointer; background: none;
}
.emojiChar { font-size: 28px; line-height: 1; display: block; }
.tooltip {
  position: absolute; bottom: calc(100% + 4px); left: 50%; transform: translateX(-50%);
  background: var(--bg-tooltip); color: white; font-size: var(--fs-xs);
  font-weight: var(--fw-medium); padding: 3px 8px; border-radius: var(--r-full);
  white-space: nowrap; pointer-events: none; opacity: 0;
  transition: opacity 0.15s;
}
.emoji:hover .tooltip { opacity: 1; }
```

*Save Progress.*

---

# PROMPT-07 — Groups Deep Dive

## PROMPT-07.A — Groups Home Page

```jsx
/* frontend/src/pages/Groups/GroupsPage.jsx */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Users, TrendingUp, BookOpen } from 'lucide-react';
import { pageVariants, staggerContainer, listItem } from '../../animations/variants';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { animated } from '@react-spring/web';
import api from '../../services/api';
import GroupCard from '../../components/Groups/GroupCard';
import CreateGroupModal from '../../components/Groups/CreateGroupModal';
import HorizontalScrollRow from '../../components/ui/HorizontalScrollRow';
import { SkeletonGroupCard } from '../../components/ui/Skeleton';
import styles from './GroupsPage.module.css';

export default function GroupsPage() {
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [invites, setInvites] = useState([]);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'discover' | 'invites'

  const { ref: heroRef, style: heroStyle } = useScrollReveal({ direction: 'up', delay: 100 });

  useEffect(() => {
    const load = async () => {
      try {
        const [groupsRes, suggestRes, inviteRes] = await Promise.all([
          api.get('/groups/mine'),
          api.get('/groups/suggested?limit=10'),
          api.get('/groups/invites'),
        ]);
        setMyGroups(groupsRes.groups);
        setSuggested(suggestRes.groups);
        setInvites(inviteRes.invites);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <motion.div className={styles.page} {...pageVariants}>
      {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Groups</h2>
          <button className={styles.createBtn} onClick={() => setShowCreate(true)} aria-label="Create group">
            <Plus size={18} />
          </button>
        </div>

        <div className={styles.sidebarSearch}>
          <Search size={14} className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search groups..." />
        </div>

        <nav className={styles.sidebarNav}>
          {[
            { id: 'feed',     icon: BookOpen,   label: 'Your feed' },
            { id: 'discover', icon: TrendingUp,  label: 'Discover' },
            { id: 'invites',  icon: Users,       label: `Invites${invites.length ? ` (${invites.length})` : ''}` },
          ].map(tab => (
            <button
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
              {tab.id === 'invites' && invites.length > 0 && (
                <span className={styles.inviteBadge}>{invites.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.myGroupsList}>
          <p className={styles.groupsListTitle}>Groups you manage</p>
          {myGroups.filter(g => g.isAdmin).map(group => (
            <Link key={group._id} to={`/groups/${group._id}`} className={styles.myGroupItem}>
              <img src={group.coverPhoto || '/uploads/defaults/group.jpg'} alt={group.name} className={styles.myGroupThumb} />
              <span className={styles.myGroupName}>{group.name}</span>
              {group.newPostCount > 0 && (
                <span className={styles.myGroupBadge}>{group.newPostCount}</span>
              )}
            </Link>
          ))}
          <p className={styles.groupsListTitle} style={{ marginTop: 'var(--sp-4)' }}>Groups you've joined</p>
          {myGroups.filter(g => !g.isAdmin).map(group => (
            <Link key={group._id} to={`/groups/${group._id}`} className={styles.myGroupItem}>
              <img src={group.coverPhoto || '/uploads/defaults/group.jpg'} alt={group.name} className={styles.myGroupThumb} />
              <span className={styles.myGroupName}>{group.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <main className={styles.main}>
        {activeTab === 'feed' && (
          <>
            {/* Suggested groups horizontal scroll */}
            <section className={styles.section}>
              <HorizontalScrollRow title="Suggested for you" seeAllLink="/groups/discover">
                {loading
                  ? Array.from({length:5}).map((_,i) => <div key={i} style={{width:200}}><SkeletonGroupCard /></div>)
                  : suggested.map(g => <GroupCard key={g._id} group={g} compact />)
                }
              </HorizontalScrollRow>
            </section>

            {/* Activity feed */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Recent activity</h3>
              {/* Group posts feed would be rendered here */}
            </section>
          </>
        )}

        {activeTab === 'discover' && (
          <DiscoverGroups />
        )}

        {activeTab === 'invites' && (
          <GroupInvites invites={invites} onAction={(id, action) => {
            setInvites(prev => prev.filter(i => i._id !== id));
            if (action === 'accept') setMyGroups(prev => [...prev, /* group data */]);
          }} />
        )}
      </main>

      <CreateGroupModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={group => { setMyGroups(prev => [group, ...prev]); navigate(`/groups/${group._id}`); }}
      />
    </motion.div>
  );
}
```

*Save Progress.*

---

# PROMPT-08 — Portfolio & Personal Branding

## PROMPT-08.A — Developer Links Component

```jsx
/* frontend/src/components/ui/DeveloperLinks.jsx */
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import styles from './DeveloperLinks.module.css';

const links = [
  {
    label: 'Portfolio',
    url: 'https://farmanullah1.github.io/My-Portfolio',
    icon: '🌐',
    color: '#F7B928',
    bg: 'rgba(247,185,40,0.1)',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/farmanullah-ansari/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/farmanullah1',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#333333',
    bg: 'rgba(51,51,51,0.08)',
  },
];

// Compact version for sidebars/footers
export function DeveloperLinksCompact() {
  return (
    <div className={styles.compact}>
      <p className={styles.compactBy}>Created by <strong>Farmanullah Ansari</strong></p>
      <div className={styles.compactLinks}>
        {links.map(link => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.compactLink}
            style={{ color: link.color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={link.label}
            aria-label={link.label}
          >
            {typeof link.icon === 'string' ? link.icon : link.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// Full version for profile / about pages
export function DeveloperLinksFull() {
  return (
    <div className={styles.full}>
      <h3 className={styles.fullTitle}>Find me online</h3>
      <div className={styles.fullLinks}>
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fullLink}
            style={{ background: link.bg, borderColor: `${link.color}33` }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.35 } }}
            whileHover={{ scale: 1.03, y: -2, boxShadow: `0 8px 20px ${link.color}20` }}
            whileTap={{ scale: 0.97 }}
          >
            <span className={styles.fullIcon}>{link.icon}</span>
            <div>
              <p className={styles.fullLabel} style={{ color: link.color }}>{link.label}</p>
              <p className={styles.fullUrl}>{link.url.replace('https://', '')}</p>
            </div>
            <ExternalLink size={14} className={styles.external} style={{ color: link.color }} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default { DeveloperLinksCompact, DeveloperLinksFull };
```

```css
/* DeveloperLinks.module.css */
/* Compact */
.compact { padding: var(--sp-4); border-top: 1px solid var(--border); }
.compactBy { font-size: var(--fs-xs); color: var(--text-tertiary); margin-bottom: var(--sp-2); }
.compactLinks { display: flex; gap: var(--sp-3); }
.compactLink { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: var(--r-full); background: var(--bg-input); transition: background var(--t-fast); }
.compactLink:hover { background: var(--bg-input-hover); }

/* Full */
.full { padding: var(--sp-6) 0; }
.fullTitle { font-size: var(--fs-lg); font-weight: var(--fw-bold); margin-bottom: var(--sp-4); }
.fullLinks { display: flex; flex-direction: column; gap: var(--sp-3); }
.fullLink { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-4); border-radius: var(--r-lg); border: 1px solid transparent; text-decoration: none; transition: all var(--t-fast); }
.fullIcon { font-size: 20px; flex-shrink: 0; display: flex; align-items: center; }
.fullLabel { font-size: var(--fs-md); font-weight: var(--fw-semibold); }
.fullUrl { font-size: var(--fs-xs); color: var(--text-tertiary); margin-top: 2px; word-break: break-all; }
.external { margin-left: auto; flex-shrink: 0; opacity: 0.6; }
```

---

## PROMPT-08.B — About MindBook Page

```jsx
/* frontend/src/pages/About/AboutMindBook.jsx */
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { animated } from '@react-spring/web';
import { DeveloperLinksFull } from '../../components/ui/DeveloperLinks';
import { pageVariants } from '../../animations/variants';
import styles from './AboutMindBook.module.css';

// Tech stack items with color
const TECH_STACK = [
  { name: 'MongoDB',    color: '#47A248', desc: 'Scalable NoSQL database for storing all platform data' },
  { name: 'Express.js', color: '#000000', desc: 'Fast, minimalist backend framework' },
  { name: 'React 18',   color: '#61DAFB', desc: 'Modern UI library with concurrent rendering' },
  { name: 'Node.js',    color: '#339933', desc: 'JavaScript runtime for scalable server-side apps' },
  { name: 'Socket.IO',  color: '#010101', desc: 'Real-time bidirectional event-based communication' },
  { name: 'WebRTC',     color: '#F7B928', desc: 'Peer-to-peer voice and video calling' },
  { name: 'YouTube API',color: '#FF0000', desc: 'Integrated video content from YouTube' },
  { name: 'Claude AI',  color: '#CC785C', desc: 'AI-powered chatbot and content features' },
];

const FEATURES = [
  { emoji: '💬', title: 'Real-Time Messaging', desc: 'Full-featured chat with media sharing, voice messages, and WebRTC calls' },
  { emoji: '📺', title: 'Unified Video Hub', desc: 'Watch MindBook uploads and YouTube videos in one beautiful interface' },
  { emoji: '🤖', title: 'AI Integration', desc: 'MindBot powered by Claude AI for writing assistance and support' },
  { emoji: '👥', title: 'Social Graph', desc: 'Friends, followers, groups, events, and stories — all Facebook-style' },
  { emoji: '📊', title: 'Creator Tools', desc: 'Analytics dashboard, monetization, and professional networking' },
  { emoji: '🛡️', title: 'Admin System', desc: 'Complete moderation tools, user management, and site analytics' },
];

function TechBall({ name, color, position }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh position={position}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
    </Float>
  );
}

export default function AboutMindBook() {
  // Scroll reveal hooks
  const hero = useScrollReveal({ direction: 'up', delay: 0 });
  const featuresRef = useScrollReveal({ direction: 'up', delay: 100 });
  const techRef = useScrollReveal({ direction: 'up', delay: 50 });
  const ctaRef = useScrollReveal({ direction: 'up', delay: 50 });

  return (
    <motion.div className={styles.page} {...pageVariants}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* 3D Canvas */}
        <div className={styles.heroCanvas} aria-hidden="true">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} color="#F7B928" intensity={2.5} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
              {/* 3D M logo */}
              <mesh>
                <boxGeometry args={[2.4, 2, 0.3]} />
                <meshStandardMaterial color="#F7B928" metalness={0.8} roughness={0.2} />
              </mesh>
            </Float>
            {/* Surrounding tech balls */}
            {TECH_STACK.slice(0,6).map((tech, i) => {
              const angle = (i / 6) * Math.PI * 2;
              return (
                <TechBall
                  key={tech.name}
                  name={tech.name}
                  color={tech.color === '#000000' ? '#555555' : tech.color}
                  position={[Math.cos(angle) * 2.8, Math.sin(angle) * 2.2, 0]}
                />
              );
            })}
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>
        </div>

        <animated.div ref={hero.ref} style={hero.style} className={styles.heroContent}>
          <div className={styles.heroBadge}>Full Stack Engineering Showcase</div>
          <h1 className={styles.heroTitle}>
            The Social Platform<br />
            <span className={styles.heroTitleBrand}>Reimagined.</span>
          </h1>
          <p className={styles.heroSub}>
            MindBook is a portfolio-grade, full-featured social media platform built from scratch
            by <strong>Farmanullah Ansari</strong>, Full Stack Software Engineer.
            It combines the best of Facebook, Instagram, LinkedIn, YouTube, and Netflix
            into a single, beautifully engineered platform.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/" className="btn btn-primary btn-lg">Explore MindBook</Link>
            <a href="https://github.com/farmanullah1" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              View on GitHub ↗
            </a>
          </div>
        </animated.div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────── */}
      <section className={styles.section}>
        <animated.div ref={featuresRef.ref} style={featuresRef.style}>
          <h2 className={styles.sectionTitle}>What MindBook Does</h2>
          <p className={styles.sectionSub}>Every feature you'd expect from a world-class social platform, and more.</p>
        </animated.div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: i * 0.06, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-card-hover)' }}
            >
              <span className={styles.featureEmoji}>{f.emoji}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────── */}
      <section className={`${styles.section} ${styles.techSection}`}>
        <animated.div ref={techRef.ref} style={techRef.style}>
          <h2 className={styles.sectionTitle}>Built With</h2>
          <p className={styles.sectionSub}>Enterprise-grade technology stack chosen for scalability and performance.</p>
        </animated.div>
        <div className={styles.techGrid}>
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              className={styles.techCard}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <div className={styles.techDot} style={{ background: tech.color === '#000000' ? '#555' : tech.color }} />
              <div>
                <p className={styles.techName}>{tech.name}</p>
                <p className={styles.techDesc}>{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DEVELOPER LINKS ──────────────────────────────── */}
      <section className={styles.section}>
        <animated.div ref={ctaRef.ref} style={ctaRef.style}>
          <h2 className={styles.sectionTitle}>Meet the Developer</h2>
          <p className={styles.sectionSub}>
            MindBook was built solo by <strong>Farmanullah Ansari</strong>, a Full Stack Software Engineer
            passionate about creating world-class digital experiences.
          </p>
        </animated.div>
        <div className={styles.devSection}>
          <DeveloperLinksFull />
          <div className={styles.devCtas}>
            <Link to="/why-mindbook" className="btn btn-secondary">Why I Built This →</Link>
            <Link to="/meet-the-creator" className="btn btn-secondary">Meet the Creator →</Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
```

*Save Progress.*

---

# PROMPT-09 — Stories System (Horizontal Scroll + Viewer)

## PROMPT-09.A — Story Tray Component

```jsx
/* frontend/src/components/Stories/StoryTray.jsx */
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar';
import { useAuthStore } from '../../store/authStore';
import StoryViewer from './StoryViewer';
import api from '../../services/api';
import styles from './StoryTray.module.css';

// SVG animated ring around story avatar
function StoryRing({ seen, closeFriend, size = 66 }) {
  const circumference = 2 * Math.PI * ((size - 6) / 2);
  const ringColor = closeFriend ? '#45bd62' : seen ? '#e4e6eb' : 'url(#storyGrad)';

  return (
    <svg width={size} height={size} className={styles.ring}>
      <defs>
        <linearGradient id="storyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7B928" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#F7B928" />
        </linearGradient>
      </defs>
      <circle
        cx={size/2} cy={size/2} r={(size-6)/2}
        fill="none"
        stroke={ringColor}
        strokeWidth={seen ? 2.5 : 3}
        strokeDasharray={circumference}
        strokeDashoffset={0}
        transform={`rotate(-90, ${size/2}, ${size/2})`}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function StoryTray() {
  const { user } = useAuthStore();
  const scrollRef = useRef(null);
  const [stories, setStories] = useState([]);  // Array of { user, stories, allSeen }
  const [viewingIndex, setViewingIndex] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    api.get('/stories/feed').then(r => setStories(r.stories)).catch(console.error);
  }, []);

  const updateScrollBtns = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) { el.addEventListener('scroll', updateScrollBtns, { passive: true }); updateScrollBtns(); }
    return () => el?.removeEventListener('scroll', updateScrollBtns);
  }, [stories]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrapper}>
      {/* Left arrow */}
      <AnimatePresence>
        {canScrollLeft && (
          <motion.button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={() => scroll(-1)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
            aria-label="Scroll stories left"
          >
            <ChevronLeft size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Story tray */}
      <div className={`${styles.tray} no-scrollbar`} ref={scrollRef}>

        {/* Add your story — first item */}
        <motion.div
          className={styles.addStory}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Link to="/stories/create" className={styles.addStoryInner}>
            <div className={styles.addAvatar}>
              <Avatar size={56} src={user?.profilePicture} alt={user?.name} />
              <span className={styles.addIcon}><Plus size={16} /></span>
            </div>
            <span className={styles.storyLabel}>Add story</span>
          </Link>
        </motion.div>

        {/* Friend stories */}
        {stories.map((storyGroup, idx) => {
          const storyUser = storyGroup.user;
          const allSeen = storyGroup.allSeen;

          return (
            <motion.button
              key={storyUser._id}
              className={styles.storyItem}
              onClick={() => setViewingIndex(idx)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22, delay: idx * 0.04 } }}
              aria-label={`View ${storyUser.name}'s story`}
            >
              <div className={styles.storyAvatarWrapper}>
                <StoryRing seen={allSeen} closeFriend={storyGroup.closeFriend} />
                <Avatar
                  size={52}
                  src={storyUser.profilePicture}
                  alt={storyUser.name}
                  className={styles.storyAvatar}
                />
              </div>
              <span className={`${styles.storyLabel} ${allSeen ? styles.seen : ''}`}>
                {storyUser.name.split(' ')[0]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Right arrow */}
      <AnimatePresence>
        {canScrollRight && (
          <motion.button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={() => scroll(1)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
            aria-label="Scroll stories right"
          >
            <ChevronRight size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {viewingIndex !== null && (
          <StoryViewer
            storyGroups={stories}
            initialGroupIndex={viewingIndex}
            onClose={() => setViewingIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

```css
/* StoryTray.module.css */
.wrapper { position: relative; overflow: hidden; }
.tray {
  display: flex; gap: var(--sp-3);
  overflow-x: auto; padding: var(--sp-4) var(--sp-4);
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

/* ── STORY ITEM ─────────────────────────────────────────────── */
.storyItem, .addStory {
  display: flex; flex-direction: column; align-items: center;
  gap: var(--sp-1); flex-shrink: 0; scroll-snap-align: start;
  background: none; cursor: pointer;
}
.storyAvatarWrapper { position: relative; display: flex; align-items: center; justify-content: center; }
.ring { position: absolute; inset: 0; }
.storyAvatar { z-index: 1; }
.storyLabel { font-size: var(--fs-xs); font-weight: var(--fw-medium); color: var(--text-primary); max-width: 66px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.seen .storyLabel, .storyLabel.seen { color: var(--text-tertiary); }

/* ── ADD STORY ──────────────────────────────────────────────── */
.addStory { cursor: pointer; }
.addStoryInner { display: flex; flex-direction: column; align-items: center; gap: var(--sp-1); text-decoration: none; color: inherit; }
.addAvatar { position: relative; }
.addIcon {
  position: absolute; bottom: -2px; right: -2px;
  width: 22px; height: 22px; border-radius: var(--r-full);
  background: var(--brand); color: white; border: 2.5px solid var(--bg-card);
  display: flex; align-items: center; justify-content: center;
}

/* ── SCROLL ARROWS ──────────────────────────────────────────── */
.arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px; border-radius: var(--r-full);
  background: var(--bg-card); box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  z-index: var(--z-raised); color: var(--text-primary);
}
.arrowLeft  { left: 8px; }
.arrowRight { right: 8px; }
```

*Save Progress.*

---

# PROMPT-10 — Admin Dashboard

## PROMPT-10.A — Admin Dashboard Metric Cards

```jsx
/* frontend/src/pages/Admin/AdminDashboard.jsx */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Users, FileText, Flag, HardDrive, Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { pageVariants, staggerContainer, listItem } from '../../animations/variants';
import api from '../../services/api';
import styles from './AdminDashboard.module.css';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      innerText: 0,
      duration: 1.5,
      ease: 'power2.out',
      snap: { innerText: 1 },
      onUpdate() {
        ref.current.innerText = Math.round(this.targets()[0].innerText).toLocaleString() + suffix;
      }
    });
  }, [value, suffix]);

  return <span ref={ref}>{(value || 0).toLocaleString()}{suffix}</span>;
}

// Metric card
function MetricCard({ title, value, subtitle, icon: Icon, iconColor, iconBg, trend, trendValue, suffix = '' }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'var(--online)' : trend === 'down' ? 'var(--text-danger)' : 'var(--text-tertiary)';

  return (
    <motion.div
      className={styles.metricCard}
      whileHover={{ y: -3, boxShadow: 'var(--shadow-card-hover)' }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.metricHeader}>
        <div className={styles.metricIcon} style={{ background: iconBg, color: iconColor }}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={styles.trend} style={{ color: trendColor }}>
            <TrendIcon size={14} /> {trendValue}
          </span>
        )}
      </div>
      <div className={styles.metricValue}>
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className={styles.metricTitle}>{title}</p>
      {subtitle && <p className={styles.metricSub}>{subtitle}</p>}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [userGrowth, setUserGrowth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/admin/dashboard-stats'),
      api.get('/admin/analytics/user-growth?days=30'),
    ]).then(([statsRes, growthRes]) => {
      setStats(statsRes.stats);
      setUserGrowth(growthRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const METRICS = stats ? [
    { title: 'Total Users',      value: stats.totalUsers,     subtitle: 'All registered accounts', icon: Users,    iconColor: '#1877f2', iconBg: '#f0f4ff', trend: 'up',   trendValue: `+${stats.newUsersThisWeek} this week` },
    { title: 'Active Today',     value: stats.activeToday,    subtitle: 'Logged in within 24h',    icon: Activity, iconColor: '#45bd62', iconBg: '#f0fff4', trend: 'up',   trendValue: `${stats.activeTodayVsYesterday}%` },
    { title: 'Total Posts',      value: stats.totalPosts,     subtitle: 'All content published',   icon: FileText, iconColor: '#f7b928', iconBg: '#fffbe6', trend: null,   trendValue: null },
    { title: 'Pending Reports',  value: stats.pendingReports, subtitle: 'Awaiting review',         icon: Flag,     iconColor: stats.pendingReports > 0 ? '#f02849' : '#45bd62', iconBg: stats.pendingReports > 0 ? '#fff0f3' : '#f0fff4', trend: stats.pendingReports > 0 ? 'up' : null, trendValue: stats.pendingReports > 0 ? 'Needs attention' : null },
    { title: 'Storage Used',     value: Math.round(stats.storageUsedMB), subtitle: 'Uploads & media',    icon: HardDrive, iconColor: '#8b5cf6', iconBg: '#f5f3ff', suffix: ' MB', trend: null },
    { title: 'New This Week',    value: stats.newUsersThisWeek, subtitle: 'Signups last 7 days', icon: TrendingUp, iconColor: '#06b6d4', iconBg: '#ecfeff', trend: 'up', trendValue: 'Growing' },
  ] : [];

  return (
    <motion.div className={styles.page} {...pageVariants}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <div className={styles.quickActions}>
          <button className="btn btn-secondary btn-sm">Export Data</button>
          <button className="btn btn-primary btn-sm">Create Announcement</button>
        </div>
      </div>

      {/* Metric cards */}
      <motion.div
        className={styles.metricsGrid}
        variants={staggerContainer(0.08)}
        initial="initial"
        animate="animate"
      >
        {METRICS.map(m => (
          <motion.div key={m.title} variants={listItem}>
            <MetricCard {...m} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        {/* User growth line chart */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>User Growth (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
              <Tooltip
                contentStyle={{ background: 'var(--bg-dropdown)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}
                labelStyle={{ color: 'var(--text-primary)', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="count" stroke="var(--brand)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: 'var(--brand)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content type donut */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Content by Type</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats?.contentByType || []} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value">
                {(stats?.contentByType || []).map((entry, idx) => (
                  <Cell key={entry.name} fill={['#F7B928','#1877f2','#45bd62','#f02849','#8b5cf6'][idx % 5]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
```

*Save Progress.*

---

# PROMPT-11 through PROMPT-20 — Implementation Summary

Each of the following prompts must be implemented with the same level of detail shown above. Follow the Master Execution Loop for every sub-prompt.

## PROMPT-11 — AI MindBot (`/mindbot`, floating widget)
**Sub-prompts:**
- 11.A: Backend proxy route (`POST /api/mindbot/chat`) with Claude API, rate limiting, conversation history
- 11.B: Floating widget UI (`MindBotWidget.jsx`) — spring expand/collapse, chat bubbles, typing indicator
- 11.C: Voice input (Web Speech API)
- 11.D: Post writing assistant integration (in `CreatePost.jsx`)
- 11.E: Smart reply suggestions (in `ChatWindow.jsx` message input)
- 11.F: Mood check-in (`/your-time` page)

## PROMPT-12 — Notifications System
**Sub-prompts:**
- 12.A: Notification model + Socket.IO server-side emission (from all relevant controllers)
- 12.B: Notification bell dropdown component
- 12.C: `/notifications` full page with filters (All/Unread/Mentions/Friend Requests)
- 12.D: Desktop push notifications (Web Push API + VAPID keys)
- 12.E: Notification grouping logic

## PROMPT-13 — Marketplace
**Sub-prompts:**
- 13.A: MarketplaceListing model + CRUD API
- 13.B: `/marketplace` home page with category grid (horizontal scroll)
- 13.C: Listing card + hover animations
- 13.D: Listing detail page + offer flow
- 13.E: My Listings management page

## PROMPT-14 — Events System
**Sub-prompts:**
- 14.A: Event model + CRUD API + RSVP API
- 14.B: Events home page with calendar view
- 14.C: Event card component (with RSVP animation)
- 14.D: Event detail page (Leaflet.js map for in-person events)
- 14.E: Create Event modal/page

## PROMPT-15 — LinkedIn Professional Features
**Sub-prompts:**
- 15.A: Skills endorsement system (API + UI + "+1" float animation)
- 15.B: Work timeline animation on profile About tab
- 15.C: Job Board (`/jobs`) — listings, filters, apply
- 15.D: Application tracker (kanban with @dnd-kit)
- 15.E: `/network` page with professional suggestions

## PROMPT-16 — Reels
**Sub-prompts:**
- 16.A: Reel model + upload API + feed API
- 16.B: `/reels` vertical feed (scroll snap, auto-play, double-tap like)
- 16.C: Reel creator (trim, caption, filters)
- 16.D: Reels preview row on home feed

## PROMPT-17 — Live Streaming & Audio Rooms
**Sub-prompts:**
- 17.A: Live stream go-live UI (MediaRecorder API)
- 17.B: Live viewer UI (emoji rain animation)
- 17.C: Audio Rooms (`/audio-rooms`) — WebRTC audio-only
- 17.D: Active speaker detection (yellow ring animation)

## PROMPT-18 — Creator Studio & Analytics
**Sub-prompts:**
- 18.A: Analytics data collection (track views, engagement on all content)
- 18.B: `/creator-studio` overview dashboard
- 18.C: Analytics charts (Recharts, yellow color scheme, GSAP counter animation)
- 18.D: Video manager + scheduled posts
- 18.E: PDF/CSV export

## PROMPT-19 — Wallet & Economy
**Sub-prompts:**
- 19.A: Wallet model + coin transaction system
- 19.B: Coin earning triggers (login, post, comment, invite)
- 19.C: `/wallet` page with 3D coin animation (Three.js)
- 19.D: Coin store (`/wallet/store`)
- 19.E: Creator monetization (tips, super likes)

## PROMPT-20 — Final QA, Portfolio Polish & Launch Readiness
**Sub-prompts:**
- 20.A: Seed data script (`backend/scripts/seed.js`) — creates demo users, posts, groups, etc.
- 20.B: Landing page (`/landing`) — 3D hero, feature showcase, CTA
- 20.C: Lighthouse audit (Performance ≥80, Accessibility ≥90, SEO ≥90)
- 20.D: Error boundaries on all pages
- 20.E: Developer links verified in all required locations
- 20.F: All console.error/warn removed from production builds
- 20.G: `README.md` final update with all features, setup guide, demo instructions
- 20.H: Final `save_progress.md` entry — completion log

---

## FINAL QUALITY CHECKLIST (Run Before Every Sub-prompt Completion)

```bash
# Run in terminal to check for common issues:

# 1. Check for console errors
# → Open browser DevTools → Console tab → verify 0 errors

# 2. Check API health
curl http://localhost:5000/api/health

# 3. Check MongoDB connection
# → Should see "MongoDB connected" in backend terminal

# 4. Test responsive layout
# → Chrome DevTools → Toggle Device Toolbar → test at:
#    375px (iPhone SE), 768px (iPad), 1280px (laptop), 1440px (desktop)

# 5. Verify dark mode
# → Click dark mode toggle → check every visible component

# 6. Check accessibility
npx axe http://localhost:5173 --exit

# 7. Build check (no TypeScript errors, all imports resolve)
cd frontend && npm run build
```

---

## save_progress.md — Example Final Entry

```markdown
## [2026-06-01T23:59:00Z] — PROMPT-20.H: Final Completion
**Status:** Completed ✅

**Project Summary:**
MindBook v7.0 is complete and ready for portfolio showcase.

**Total Stats:**
- Pages implemented: 65+
- React components: 200+
- API endpoints: 120+
- MongoDB models: 22
- Socket.IO events: 35+
- Animations: 100+

**Key Features Delivered:**
✅ Real-time messaging (text, media, voice, video)
✅ Voice & video calls (WebRTC)
✅ YouTube + MindBook unified video hub with source badges
✅ AI MindBot (Claude API)
✅ Full admin system with moderation
✅ Stories (create, view, react, reply)
✅ Reels vertical feed
✅ Marketplace, Events, Fundraisers
✅ LinkedIn-style professional features
✅ Live streaming
✅ Audio rooms
✅ Creator Studio + Analytics
✅ Wallet & coins economy
✅ Facebook-parity news feed
✅ 3D animations (Three.js on auth, 404, about pages)
✅ Physics animations (React Spring, Framer Motion)
✅ Horizontal scroll rows across the site
✅ Dark mode on every component
✅ Mobile responsive at all breakpoints
✅ Developer links (Portfolio, LinkedIn, GitHub) throughout the site

**Developer:** Farmanullah Ansari
**Portfolio:** https://farmanullah1.github.io/My-Portfolio
**LinkedIn:** https://www.linkedin.com/in/farmanullah-ansari/
**GitHub:** https://github.com/farmanullah1
---
```

---

*MindBook Agent Playbook v7.0 — Part 2 (PROMPT-04 through PROMPT-20)*
*Developer: Farmanullah Ansari | Full Stack Software Engineer*
*Portfolio: https://farmanullah1.github.io/My-Portfolio*
*LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/*
*GitHub: https://github.com/farmanullah1*
*Rule: Append to save_progress.md after every completed sub-prompt.*

# MindBook – Agent Playbook v7.0 — PART 3: Complete Component Implementations

> **Continues from Part 1 and Part 2. Every component here is production-ready code.**
> **Execute every sub-prompt in order. Save to `save_progress.md` after each.**
>
> Developer: Farmanullah Ansari
> Portfolio: https://farmanullah1.github.io/My-Portfolio
> LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/
> GitHub: https://github.com/farmanullah1

---

# COMPLETE LEFT SIDEBAR COMPONENT

## File: `frontend/src/components/Sidebar/LeftSidebar.jsx`

```jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, User, Users, Video, ShoppingBag, Calendar, Gamepad2,
  Newspaper, Briefcase, BookOpen, Music, Package, Heart, Clock,
  Bookmark, Settings, Moon, Sun, ExternalLink, ChevronDown, ChevronUp,
  Bell
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useNotifStore } from '../../store/notifStore';
import Avatar from '../ui/Avatar';
import { DeveloperLinksCompact } from '../ui/DeveloperLinks';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from './LeftSidebar.module.css';

const NAV_ITEMS = [
  { path: '/',             icon: Home,       label: 'Home',        exact: true },
  { path: '/profile',      icon: User,       label: 'Profile' },
  { path: '/friends',      icon: Users,      label: 'Friends',     badge: 'friendRequests' },
  { path: '/messages',     icon: Bell,       label: 'Messages',    badge: 'messages' },
  { path: '/watch',        icon: Video,      label: 'Watch' },
  { path: '/marketplace',  icon: ShoppingBag,label: 'Marketplace' },
  { path: '/events',       icon: Calendar,   label: 'Events' },
  { path: '/gaming',       icon: Gamepad2,   label: 'Gaming' },
  { path: '/groups',       icon: Users,      label: 'Groups' },
  { path: '/jobs',         icon: Briefcase,  label: 'Jobs' },
  { path: '/articles',     icon: BookOpen,   label: 'Articles' },
  { path: '/audio-rooms',  icon: Music,      label: 'Audio Rooms' },
  { path: '/fundraisers',  icon: Heart,      label: 'Fundraisers' },
  { path: '/memories',     icon: Clock,      label: 'Memories' },
  { path: '/saved',        icon: Bookmark,   label: 'Saved' },
];

export default function LeftSidebar() {
  const location = useLocation();
  const { user } = useAuthStore();
  const { theme, setTheme } = useUiStore();
  const { friendRequestCount, messageCount } = useNotifStore();
  const isCompact = useMediaQuery('(max-width: 1023px)');
  const [showMore, setShowMore] = useState(false);

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const getBadge = (badge) => {
    if (badge === 'friendRequests') return friendRequestCount;
    if (badge === 'messages') return messageCount;
    return 0;
  };

  const visibleItems = showMore ? NAV_ITEMS : NAV_ITEMS.slice(0, 8);

  return (
    <nav className={`${styles.sidebar} ${isCompact ? styles.compact : ''}`} aria-label="Left sidebar navigation">

      {/* ── USER PROFILE LINK ─────────────────────────────── */}
      <Link to={`/profile/${user?._id}`} className={styles.profileLink}>
        <Avatar
          size={isCompact ? 40 : 36}
          src={user?.profilePicture}
          alt={user?.name}
          online
        />
        {!isCompact && (
          <div className={styles.profileText}>
            <span className={styles.profileName}>{user?.name}</span>
            {user?.openToWork && <span className={styles.openToWork}>Open to work</span>}
          </div>
        )}
      </Link>

      <div className={styles.divider} />

      {/* ── NAVIGATION ───────────────────────────────────── */}
      <ul className={styles.navList} role="list">
        {visibleItems.map((item, i) => {
          const active = isActive(item);
          const badge = item.badge ? getBadge(item.badge) : 0;

          return (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.path}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                aria-current={active ? 'page' : undefined}
                title={isCompact ? item.label : undefined}
              >
                <div className={styles.iconWrapper}>
                  <item.icon
                    size={20}
                    strokeWidth={active ? 2.5 : 1.8}
                    color={active ? 'var(--brand)' : 'var(--text-secondary)'}
                  />
                  {badge > 0 && (
                    <motion.span
                      className={styles.navBadge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {badge > 9 ? '9+' : badge}
                    </motion.span>
                  )}
                </div>
                {!isCompact && (
                  <span className={`${styles.navLabel} ${active ? styles.navLabelActive : ''}`}>
                    {item.label}
                  </span>
                )}
                {active && !isCompact && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="left-nav-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}

        {/* See more / less toggle */}
        {!isCompact && (
          <li>
            <button
              className={styles.navItem}
              onClick={() => setShowMore(s => !s)}
              aria-expanded={showMore}
            >
              <div className={styles.iconWrapper}>
                <div className={styles.moreIcon}>
                  {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              <span className={styles.navLabel}>{showMore ? 'See less' : 'See more'}</span>
            </button>
          </li>
        )}
      </ul>

      <div className={styles.divider} />

      {/* ── YOUR GROUPS SHORTCUTS ─────────────────────────── */}
      {!isCompact && user?.recentGroups?.length > 0 && (
        <div className={styles.shortcuts}>
          <p className={styles.shortcutsTitle}>Your shortcuts</p>
          {user.recentGroups.slice(0, 5).map(group => (
            <Link key={group._id} to={`/groups/${group._id}`} className={styles.shortcutItem}>
              <img
                src={group.coverPhoto || '/uploads/defaults/group-thumb.jpg'}
                alt={group.name}
                className={styles.shortcutThumb}
              />
              <span className={styles.shortcutName}>{group.name}</span>
              {group.newPostCount > 0 && (
                <span className={styles.shortcutBadge}>{group.newPostCount}</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* ── BOTTOM SECTION ───────────────────────────────── */}
      <div className={styles.bottom}>
        {!isCompact && (
          <>
            {/* Settings link */}
            <Link to="/settings" className={styles.bottomItem}>
              <Settings size={16} />
              <span>Settings</span>
            </Link>

            {/* Dark mode toggle */}
            <button
              className={styles.bottomItem}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>

            <div className={styles.divider} />

            {/* Developer links */}
            <DeveloperLinksCompact />

            {/* Footer links */}
            <div className={styles.footerLinks}>
              <Link to="/privacy-policy">Privacy</Link>
              <span>·</span>
              <Link to="/terms-of-service">Terms</Link>
              <span>·</span>
              <Link to="/about-mindbook">About</Link>
            </div>
            <p className={styles.copyright}>© 2026 MindBook</p>
          </>
        )}
      </div>
    </nav>
  );
}
```

## File: `frontend/src/components/Sidebar/LeftSidebar.module.css`

```css
.sidebar {
  display: flex;
  flex-direction: column;
  padding: var(--sp-3) var(--sp-2);
  background: var(--bg-sidebar);
  border-radius: var(--r-lg);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.compact { padding: var(--sp-3) var(--sp-1); align-items: center; }

/* ── PROFILE LINK ─────────────────────────────────────────── */
.profileLink {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-2) var(--sp-2);
  border-radius: var(--r-md); text-decoration: none; color: inherit;
  transition: background var(--t-fast); flex-shrink: 0;
}
.profileLink:hover { background: var(--bg-input); }
.profileText { flex: 1; min-width: 0; }
.profileName {
  font-size: var(--fs-md); font-weight: var(--fw-semibold);
  color: var(--text-primary); display: block;
  overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}
.openToWork {
  font-size: var(--fs-xs); color: var(--online);
  font-weight: var(--fw-medium); margin-top: 1px; display: block;
}

/* ── DIVIDER ──────────────────────────────────────────────── */
.divider { height: 1px; background: var(--border); margin: var(--sp-2) 0; }

/* ── NAV LIST ────────────────────────────────────────────── */
.navList { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }

.navItem {
  display: flex; align-items: center; gap: var(--sp-3);
  padding: var(--sp-2) var(--sp-2); border-radius: var(--r-md);
  text-decoration: none; color: inherit; cursor: pointer;
  transition: background var(--t-fast); width: 100%;
  position: relative; overflow: hidden;
}
.navItem:hover { background: var(--bg-input); }
.navItemActive { background: var(--brand-light) !important; }

.iconWrapper { position: relative; flex-shrink: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
.navBadge {
  position: absolute; top: -4px; right: -6px;
  background: var(--error-border); color: white;
  min-width: 16px; height: 16px; border-radius: var(--r-full);
  font-size: 9px; font-weight: var(--fw-bold);
  display: flex; align-items: center; justify-content: center; padding: 0 3px;
}

.navLabel { font-size: var(--fs-base); color: var(--text-secondary); font-weight: var(--fw-medium); flex: 1; transition: color var(--t-fast); white-space: nowrap; }
.navLabelActive { color: var(--brand); font-weight: var(--fw-semibold); }
.activeIndicator { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 24px; background: var(--brand); border-radius: 2px 0 0 2px; }

.moreIcon { width: 24px; height: 24px; border-radius: var(--r-full); background: var(--bg-input); display: flex; align-items: center; justify-content: center; color: var(--text-primary); }

/* ── SHORTCUTS ───────────────────────────────────────────── */
.shortcuts { margin-bottom: var(--sp-3); }
.shortcutsTitle { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-secondary); padding: 0 var(--sp-2) var(--sp-2); }
.shortcutItem { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-2); border-radius: var(--r-md); text-decoration: none; color: inherit; transition: background var(--t-fast); }
.shortcutItem:hover { background: var(--bg-input); }
.shortcutThumb { width: 36px; height: 36px; border-radius: var(--r-sm); object-fit: cover; flex-shrink: 0; }
.shortcutName { flex: 1; font-size: var(--fs-base); color: var(--text-primary); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.shortcutBadge { background: var(--brand); color: white; min-width: 18px; height: 18px; border-radius: var(--r-full); font-size: var(--fs-xs); font-weight: var(--fw-bold); display: flex; align-items: center; justify-content: center; padding: 0 4px; }

/* ── BOTTOM ──────────────────────────────────────────────── */
.bottom { margin-top: auto; }
.bottomItem { display: flex; align-items: center; gap: var(--sp-2); padding: var(--sp-2) var(--sp-2); border-radius: var(--r-md); width: 100%; font-size: var(--fs-sm); color: var(--text-secondary); cursor: pointer; transition: background var(--t-fast); text-decoration: none; background: none; }
.bottomItem:hover { background: var(--bg-input); color: var(--text-primary); }
.footerLinks { display: flex; flex-wrap: wrap; gap: 4px 6px; padding: 0 var(--sp-2); margin-top: var(--sp-2); }
.footerLinks a { font-size: var(--fs-xs); color: var(--text-tertiary); }
.footerLinks a:hover { text-decoration: underline; }
.footerLinks span { font-size: var(--fs-xs); color: var(--text-tertiary); }
.copyright { font-size: var(--fs-xs); color: var(--text-tertiary); padding: 0 var(--sp-2); margin-top: var(--sp-1); }
```

---

# COMPLETE RIGHT SIDEBAR COMPONENT

## File: `frontend/src/components/Sidebar/RightSidebar.jsx`

```jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';
import api from '../../services/api';
import { staggerContainer, listItem } from '../../animations/variants';
import styles from './RightSidebar.module.css';

export default function RightSidebar() {
  const { user } = useAuthStore();
  const [suggestions, setSuggestions] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [onlineContacts, setOnlineContacts] = useState([]);
  const [contactSearch, setContactSearch] = useState('');
  const [loadingSugg, setLoadingSugg] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/users/suggestions?limit=5'),
      api.get('/users/birthdays'),
      api.get('/users/online-friends'),
    ]).then(([sugg, bday, contacts]) => {
      setSuggestions(sugg.users || []);
      setBirthdays(bday.birthdays || []);
      setOnlineContacts(contacts.users || []);
    }).catch(console.error)
      .finally(() => setLoadingSugg(false));
  }, []);

  const filteredContacts = onlineContacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase())
  );

  const handleAddFriend = async (userId) => {
    try {
      await api.post(`/users/${userId}/friend-request`);
      setSuggestions(prev => prev.map(s => s._id === userId ? { ...s, requestSent: true } : s));
    } catch (e) {}
  };

  const handleDismissSuggestion = (userId) => {
    setSuggestions(prev => prev.filter(s => s._id !== userId));
  };

  return (
    <aside className={styles.sidebar}>

      {/* ── SPONSORED ───────────────────────────────────── */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Sponsored</p>
        <div className={styles.sponsoredCard}>
          <div className={styles.sponsoredImg} />
          <div>
            <p className={styles.sponsoredTitle}>MindBook Premium</p>
            <p className={styles.sponsoredSub}>mindbook.app</p>
          </div>
        </div>
      </div>

      {/* ── BIRTHDAYS ───────────────────────────────────── */}
      {birthdays.length > 0 && (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Birthdays</p>
          {birthdays.map(person => (
            <div key={person._id} className={styles.birthdayCard}>
              <span className={styles.birthdayEmoji}>🎂</span>
              <p className={styles.birthdayText}>
                <strong>{person.name.split(' ')[0]}'s</strong> birthday is today.
              </p>
              <Link to={`/messages?user=${person._id}`}>
                <Button variant="secondary" size="sm">Send wishes</Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* ── FRIEND SUGGESTIONS ──────────────────────────── */}
      {suggestions.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>People you may know</p>
            <Link to="/friends/suggestions" className={styles.seeAll}>See all</Link>
          </div>
          <motion.ul
            variants={staggerContainer(0.07)}
            initial="initial"
            animate="animate"
            style={{ listStyle: 'none', padding: 0 }}
          >
            {suggestions.map(person => (
              <motion.li key={person._id} variants={listItem}>
                <div className={styles.suggestionCard}>
                  <Avatar size={40} src={person.profilePicture} alt={person.name} />
                  <div className={styles.suggestionInfo}>
                    <Link to={`/profile/${person._id}`} className={styles.suggestionName}>
                      {person.name}
                    </Link>
                    {person.mutualFriends > 0 && (
                      <p className={styles.suggestionMutual}>
                        {person.mutualFriends} mutual {person.mutualFriends === 1 ? 'friend' : 'friends'}
                      </p>
                    )}
                  </div>
                  <div className={styles.suggestionActions}>
                    {person.requestSent ? (
                      <span className={styles.pendingLabel}>Pending</span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleAddFriend(person._id)}
                      >
                        Add
                      </Button>
                    )}
                    <button
                      className={styles.dismissBtn}
                      onClick={() => handleDismissSuggestion(person._id)}
                      aria-label={`Dismiss ${person.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}

      {/* ── CONTACTS (ONLINE FRIENDS) ───────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <p className={styles.sectionLabel}>Contacts</p>
          <button className={styles.searchContactsBtn} aria-label="Search contacts">
            <Search size={14} />
          </button>
        </div>

        <div className={styles.contactSearch}>
          <input
            className={styles.contactSearchInput}
            value={contactSearch}
            onChange={e => setContactSearch(e.target.value)}
            placeholder="Search contacts..."
            aria-label="Search contacts"
          />
        </div>

        <ul className={styles.contactList} role="list">
          {filteredContacts.map(contact => {
            const isOnline = contact.onlineStatus === 'online';
            const isAway = contact.onlineStatus === 'away';
            return (
              <li key={contact._id}>
                <Link
                  to={`/messages?user=${contact._id}`}
                  className={styles.contactItem}
                >
                  <Avatar
                    size={36}
                    src={contact.profilePicture}
                    alt={contact.name}
                    online={isOnline}
                    away={isAway}
                  />
                  <div className={styles.contactInfo}>
                    <span className={styles.contactName}>{contact.name}</span>
                    <span className={`${styles.contactStatus} ${isOnline ? styles.statusOnline : ''}`}>
                      {isOnline ? 'Active now' : `Active ${contact.lastActiveText || 'recently'}`}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
          {filteredContacts.length === 0 && contactSearch && (
            <li className={styles.noContacts}>No contacts found</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
```

## File: `frontend/src/components/Sidebar/RightSidebar.module.css`

```css
.sidebar { display: flex; flex-direction: column; gap: 0; }
.section { padding: var(--sp-4) var(--sp-3); border-bottom: 1px solid var(--border); }
.section:last-child { border-bottom: none; }

.sectionHeader { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-3); }
.sectionLabel { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
.seeAll { font-size: var(--fs-sm); color: var(--text-link); font-weight: var(--fw-medium); }
.seeAll:hover { text-decoration: underline; }

/* Sponsored */
.sponsoredCard { display: flex; gap: var(--sp-3); align-items: center; padding: var(--sp-2) 0; }
.sponsoredImg { width: 80px; height: 80px; border-radius: var(--r-sm); background: var(--brand-light); flex-shrink: 0; }
.sponsoredTitle { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-primary); }
.sponsoredSub { font-size: var(--fs-xs); color: var(--text-secondary); margin-top: 2px; }

/* Birthday */
.birthdayCard { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) 0; }
.birthdayEmoji { font-size: 28px; flex-shrink: 0; }
.birthdayText { flex: 1; font-size: var(--fs-sm); color: var(--text-secondary); line-height: var(--lh-snug); }

/* Suggestion */
.suggestionCard { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) 0; }
.suggestionInfo { flex: 1; min-width: 0; }
.suggestionName { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-primary); text-decoration: none; display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.suggestionName:hover { text-decoration: underline; }
.suggestionMutual { font-size: var(--fs-xs); color: var(--text-tertiary); margin-top: 2px; }
.suggestionActions { display: flex; align-items: center; gap: var(--sp-1); flex-shrink: 0; }
.pendingLabel { font-size: var(--fs-xs); color: var(--text-tertiary); white-space: nowrap; }
.dismissBtn { width: 24px; height: 24px; border-radius: var(--r-full); color: var(--text-tertiary); display: flex; align-items: center; justify-content: center; font-size: var(--fs-xs); transition: background var(--t-fast); }
.dismissBtn:hover { background: var(--bg-input); color: var(--text-primary); }

/* Contacts */
.searchContactsBtn { color: var(--text-tertiary); display: flex; align-items: center; justify-content: center; }
.contactSearch { margin-bottom: var(--sp-2); }
.contactSearchInput { width: 100%; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--r-full); padding: 6px 12px; font-size: var(--fs-sm); color: var(--text-primary); outline: none; transition: border-color var(--t-fast); }
.contactSearchInput:focus { border-color: var(--border-focus); }
.contactList { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.contactItem { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-2) var(--sp-1); border-radius: var(--r-md); text-decoration: none; color: inherit; transition: background var(--t-fast); }
.contactItem:hover { background: var(--bg-input); }
.contactInfo { flex: 1; min-width: 0; }
.contactName { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-primary); display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.contactStatus { font-size: var(--fs-xs); color: var(--text-tertiary); display: block; margin-top: 1px; }
.statusOnline { color: var(--online); }
.noContacts { font-size: var(--fs-sm); color: var(--text-tertiary); padding: var(--sp-3) 0; text-align: center; }
```

---

# COMPLETE HORIZONTAL SCROLL ROW COMPONENT

## File: `frontend/src/components/ui/HorizontalScrollRow.jsx`

```jsx
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HorizontalScrollRow.module.css';

export default function HorizontalScrollRow({
  title,
  seeAllLink,
  children,
  itemWidth = 220,
  gap = 12,
  className = '',
}) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    // ResizeObserver to update when content changes
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    updateArrows();
    return () => { el.removeEventListener('scroll', updateArrows); ro.disconnect(); };
  }, [updateArrows, children]);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = (itemWidth + gap) * 3;
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  // Mouse drag to scroll
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = '';
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* Header row */}
      {(title || seeAllLink) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {seeAllLink && (
            <Link to={seeAllLink} className={styles.seeAll}>See all</Link>
          )}
        </div>
      )}

      {/* Scroll container */}
      <div className={styles.scrollWrapper}>
        {/* Left gradient mask */}
        <AnimatePresence>
          {canLeft && (
            <motion.div
              className={`${styles.gradientMask} ${styles.gradientLeft}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Right gradient mask */}
        <AnimatePresence>
          {canRight && (
            <motion.div
              className={`${styles.gradientMask} ${styles.gradientRight}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Arrow buttons */}
        <AnimatePresence>
          {canLeft && (
            <motion.button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => scrollBy(-1)}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {canRight && (
            <motion.button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => scrollBy(1)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className={`${styles.scrollContainer} no-scrollbar`}
          style={{ gap }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          role="list"
          aria-label={title || 'Horizontal scroll list'}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

## File: `frontend/src/components/ui/HorizontalScrollRow.module.css`

```css
.wrapper { display: flex; flex-direction: column; gap: var(--sp-3); }
.header { display: flex; align-items: center; justify-content: space-between; padding: 0 var(--sp-1); }
.title { font-size: var(--fs-lg); font-weight: var(--fw-bold); color: var(--text-primary); }
.seeAll { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-link); }
.seeAll:hover { text-decoration: underline; }

.scrollWrapper { position: relative; overflow: hidden; }

.scrollContainer {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: var(--sp-2) var(--sp-2) var(--sp-3);
  cursor: grab;
}
.scrollContainer:active { cursor: grabbing; }
.scrollContainer > * { scroll-snap-align: start; flex-shrink: 0; }

/* Gradient edge masks */
.gradientMask {
  position: absolute; top: 0; bottom: 0; width: 60px;
  z-index: var(--z-raised); pointer-events: none;
}
.gradientLeft  { left: 0;  background: linear-gradient(to right, var(--bg-card), transparent); }
.gradientRight { right: 0; background: linear-gradient(to left,  var(--bg-card), transparent); }

/* Arrow buttons */
.arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  z-index: calc(var(--z-raised) + 1);
  width: 40px; height: 40px; border-radius: var(--r-full);
  background: var(--bg-card); box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-primary);
  transition: background var(--t-fast), box-shadow var(--t-fast);
}
.arrow:hover { background: var(--bg-input); box-shadow: var(--shadow-lg); }
.arrowLeft  { left: 6px; }
.arrowRight { right: 6px; }
```

---

# COMPLETE IMAGE GRID COMPONENT

## File: `frontend/src/components/Feed/ImageGrid.jsx`

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from 'lucide-react';
import styles from './ImageGrid.module.css';

// Lightbox component
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); };

  // Keyboard navigation
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length);
    if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length);
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      className={styles.lightbox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      role="dialog"
      aria-label="Image viewer"
      aria-modal="true"
    >
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        <X size={24} />
      </button>

      <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`Image ${idx + 1} of ${images.length}`}
            className={styles.lightboxImg}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button className={`${styles.lightboxNav} ${styles.navPrev}`} onClick={prev} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
            <button className={`${styles.lightboxNav} ${styles.navNext}`} onClick={next} aria-label="Next image">
              <ChevronRight size={28} />
            </button>
            <div className={styles.lightboxCounter}>{idx + 1} / {images.length}</div>
          </>
        )}

        <a
          href={images[idx]}
          download
          className={styles.downloadBtn}
          onClick={e => e.stopPropagation()}
          aria-label="Download image"
        >
          <Download size={18} />
        </a>
      </div>
    </motion.div>
  );
}

export default function ImageGrid({ images = [] }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  if (!images.length) return null;

  const count = images.length;

  // Grid layouts per image count
  const gridClass =
    count === 1 ? styles.grid1 :
    count === 2 ? styles.grid2 :
    count === 3 ? styles.grid3 :
    count === 4 ? styles.grid4 : styles.grid5plus;

  const displayImages = images.slice(0, count >= 5 ? 4 : count);
  const remaining = count - 4;

  return (
    <>
      <div className={`${styles.grid} ${gridClass}`} role="list" aria-label={`${count} images`}>
        {displayImages.map((src, i) => (
          <motion.button
            key={i}
            className={`${styles.imageItem} ${i === 3 && remaining > 0 ? styles.hasOverlay : ''}`}
            onClick={() => setLightboxIdx(i)}
            whileHover={{ filter: 'brightness(0.94)' }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View image ${i + 1}`}
            role="listitem"
          >
            <img
              src={src}
              alt=""
              className={styles.image}
              loading="lazy"
            />
            {i === 3 && remaining > 0 && (
              <div className={styles.overlay}>
                <ZoomIn size={28} className={styles.overlayIcon} />
                <span className={styles.overlayCount}>+{remaining} more</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={images}
            startIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

## File: `frontend/src/components/Feed/ImageGrid.module.css`

```css
.grid { display: grid; gap: 2px; border-radius: var(--r-lg); overflow: hidden; }

/* 1 image — full width */
.grid1 { grid-template-columns: 1fr; }
.grid1 .imageItem { max-height: 500px; }

/* 2 images — side by side */
.grid2 { grid-template-columns: 1fr 1fr; max-height: 300px; }

/* 3 images — left full + right 2 stacked */
.grid3 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; max-height: 400px; }
.grid3 .imageItem:first-child { grid-row: 1 / 3; }

/* 4 images — 2×2 */
.grid4 { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; max-height: 400px; }

/* 5+ images — 2×2 + overlay on last */
.grid5plus { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; max-height: 400px; }

/* ── IMAGE ITEM ─────────────────────────────────────────────── */
.imageItem {
  position: relative; overflow: hidden;
  background: var(--bg-input); cursor: zoom-in;
  display: block; padding: 0;
}
.image { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease; }
.imageItem:hover .image { transform: scale(1.04); }

/* Overlay for +N more */
.overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: var(--sp-2);
  color: white;
}
.overlayIcon { opacity: 0.9; }
.overlayCount { font-size: var(--fs-2xl); font-weight: var(--fw-bold); }

/* ── LIGHTBOX ───────────────────────────────────────────────── */
.lightbox {
  position: fixed; inset: 0; z-index: var(--z-modal);
  background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  outline: none;
}
.lightboxClose {
  position: absolute; top: var(--sp-5); right: var(--sp-5);
  width: 44px; height: 44px; border-radius: var(--r-full);
  background: rgba(255,255,255,0.15); color: white;
  display: flex; align-items: center; justify-content: center;
  z-index: 10; transition: background var(--t-fast);
}
.lightboxClose:hover { background: rgba(255,255,255,0.25); }
.lightboxContent { position: relative; max-width: 90vw; max-height: 90vh; display: flex; align-items: center; justify-content: center; }
.lightboxImg { max-width: 90vw; max-height: 88vh; object-fit: contain; border-radius: var(--r-md); }
.lightboxNav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 48px; height: 48px; border-radius: var(--r-full);
  background: rgba(255,255,255,0.15); color: white;
  display: flex; align-items: center; justify-content: center;
  transition: background var(--t-fast);
}
.lightboxNav:hover { background: rgba(255,255,255,0.30); }
.navPrev { left: -60px; }
.navNext { right: -60px; }
@media (max-width: 768px) { .navPrev { left: var(--sp-2); } .navNext { right: var(--sp-2); } }
.lightboxCounter { position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: var(--fs-sm); }
.downloadBtn { position: absolute; bottom: -40px; right: 0; color: rgba(255,255,255,0.7); width: 36px; height: 36px; border-radius: var(--r-full); background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; transition: background var(--t-fast); }
.downloadBtn:hover { background: rgba(255,255,255,0.25); color: white; }
```

---

# COMPLETE COMMENT SECTION COMPONENT

## File: `frontend/src/components/Feed/CommentSection.jsx`

```jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Reply, MoreHorizontal, Smile, Image as ImageIcon } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { postsApi } from '../../services/api';
import { useUiStore } from '../../store/uiStore';
import { staggerContainer, listItem } from '../../animations/variants';
import styles from './CommentSection.module.css';

// Single comment component (recursive for replies)
function Comment({ comment, postId, currentUser, onDelete, depth = 0 }) {
  const { addToast } = useUiStore();
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  const [replies, setReplies] = useState(comment.replies || []);
  const [submittingReply, setSubmittingReply] = useState(false);
  const replyInputRef = useRef(null);

  const isOwn = comment.user?._id === currentUser?._id;

  const handleLike = async () => {
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
    try { await postsApi.likeComment(postId, comment._id); }
    catch { setLiked(l => !l); setLikeCount(c => liked ? c + 1 : c - 1); }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || submittingReply) return;
    setSubmittingReply(true);
    try {
      const { comment: newReply } = await postsApi.reply(postId, comment._id, replyText.trim());
      setReplies(r => [...r, newReply]);
      setReplyText('');
      setIsReplying(false);
      setShowReplies(true);
      addToast({ type: 'success', message: 'Reply posted!' });
    } catch {
      addToast({ type: 'error', message: 'Failed to post reply' });
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDelete = async () => {
    try {
      await postsApi.deleteComment(postId, comment._id);
      onDelete(comment._id);
    } catch {
      addToast({ type: 'error', message: 'Failed to delete comment' });
    }
  };

  return (
    <motion.div
      className={`${styles.commentWrapper} ${depth > 0 ? styles.replyWrapper : ''}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Avatar
        size={depth === 0 ? 32 : 28}
        src={comment.user?.profilePicture}
        alt={comment.user?.name}
      />
      <div className={styles.commentContent}>
        {/* Bubble */}
        <div className={styles.commentBubble}>
          <Link to={`/profile/${comment.user?._id}`} className={styles.commentAuthor}>
            {comment.user?.name}
          </Link>
          <p className={styles.commentText}>{comment.text}</p>

          {/* Like count on bubble */}
          {likeCount > 0 && (
            <motion.span
              className={styles.bubbleLike}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ❤️ {likeCount}
            </motion.span>
          )}
        </div>

        {/* Action row */}
        <div className={styles.commentActions}>
          <span className={styles.commentTime}>
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
          <button
            className={`${styles.commentActionBtn} ${liked ? styles.liked : ''}`}
            onClick={handleLike}
          >
            Like{liked && ' ❤️'}
          </button>
          {depth === 0 && (
            <button
              className={styles.commentActionBtn}
              onClick={() => {
                setIsReplying(r => !r);
                setTimeout(() => replyInputRef.current?.focus(), 50);
              }}
            >
              Reply
            </button>
          )}
          {isOwn && (
            <button className={styles.commentActionBtn} onClick={handleDelete}>Delete</button>
          )}
        </div>

        {/* Nested reply input */}
        <AnimatePresence>
          {isReplying && (
            <motion.form
              className={styles.replyForm}
              onSubmit={handleReply}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Avatar size={26} src={currentUser?.profilePicture} alt={currentUser?.name} />
              <div className={styles.replyInputWrapper}>
                <input
                  ref={replyInputRef}
                  className={styles.replyInput}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={`Reply to ${comment.user?.name?.split(' ')[0]}...`}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleReply(e); }}
                  maxLength={2000}
                />
                {replyText.trim() && (
                  <button type="submit" className={styles.replySubmit} disabled={submittingReply}>
                    ↵
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Show replies toggle */}
        {replies.length > 0 && (
          <button
            className={styles.showReplies}
            onClick={() => setShowReplies(s => !s)}
          >
            <div className={styles.showRepliesLine} />
            {showReplies ? `Hide ${replies.length} replies` : `View ${replies.length} ${replies.length === 1 ? 'reply' : 'replies'}`}
          </button>
        )}

        {/* Replies list */}
        <AnimatePresence>
          {showReplies && (
            <motion.div
              className={styles.repliesList}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {replies.map(reply => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  currentUser={currentUser}
                  onDelete={(id) => setReplies(r => r.filter(r => r._id !== id))}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function CommentSection({ postId, initialComments = [], currentUser }) {
  const { addToast } = useUiStore();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const { comment } = await postsApi.comment(postId, text.trim());
      setComments(prev => [...prev, comment]);
      setText('');
    } catch {
      addToast({ type: 'error', message: 'Failed to post comment.' });
    } finally {
      setSubmitting(false);
    }
  };

  const visibleComments = comments.slice(-visibleCount);
  const hasMore = comments.length > visibleCount;

  return (
    <div className={styles.section}>
      {/* Load more comments */}
      {hasMore && (
        <button
          className={styles.loadMore}
          onClick={() => setVisibleCount(c => c + 10)}
        >
          View {Math.min(comments.length - visibleCount, 10)} more comments
        </button>
      )}

      {/* Comments list */}
      <motion.div
        className={styles.commentsList}
        variants={staggerContainer(0.05)}
        initial="initial"
        animate="animate"
      >
        {visibleComments.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={postId}
            currentUser={currentUser}
            onDelete={(id) => setComments(prev => prev.filter(c => c._id !== id))}
          />
        ))}
      </motion.div>

      {/* Comment input */}
      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <Avatar size={32} src={currentUser?.profilePicture} alt={currentUser?.name} />
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            className={styles.input}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write a comment..."
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e); }}
            maxLength={2000}
            aria-label="Write a comment"
          />
          <div className={styles.inputActions}>
            <button type="button" className={styles.inputAction} aria-label="Add emoji">
              <Smile size={16} />
            </button>
            <button type="button" className={styles.inputAction} aria-label="Add image">
              <ImageIcon size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
```

## File: `frontend/src/components/Feed/CommentSection.module.css`

```css
.section { padding: 0 var(--sp-4) var(--sp-4); }
.loadMore { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-secondary); padding: var(--sp-2) 0; cursor: pointer; }
.loadMore:hover { color: var(--text-primary); }
.commentsList { display: flex; flex-direction: column; gap: var(--sp-3); }

/* ── COMMENT ITEM ────────────────────────────────────────────── */
.commentWrapper { display: flex; gap: var(--sp-2); align-items: flex-start; }
.replyWrapper { margin-left: 44px; }

.commentContent { flex: 1; min-width: 0; }
.commentBubble { background: var(--bg-input); border-radius: 0 var(--r-xl) var(--r-xl) var(--r-xl); padding: var(--sp-2) var(--sp-3); display: inline-block; max-width: 100%; position: relative; }
.commentAuthor { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-primary); text-decoration: none; display: block; margin-bottom: 2px; }
.commentAuthor:hover { text-decoration: underline; }
.commentText { font-size: var(--fs-sm); color: var(--text-primary); line-height: var(--lh-snug); word-break: break-word; }
.bubbleLike { position: absolute; bottom: -10px; right: var(--sp-2); background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-full); padding: 2px 6px; font-size: var(--fs-xs); white-space: nowrap; box-shadow: var(--shadow-xs); }

.commentActions { display: flex; align-items: center; gap: var(--sp-3); margin-top: var(--sp-1); padding-left: var(--sp-2); }
.commentTime { font-size: var(--fs-xs); color: var(--text-tertiary); }
.commentActionBtn { font-size: var(--fs-xs); font-weight: var(--fw-semibold); color: var(--text-secondary); cursor: pointer; transition: color var(--t-fast); background: none; }
.commentActionBtn:hover { color: var(--text-primary); }
.commentActionBtn.liked { color: var(--error-border); }

/* Reply form */
.replyForm { display: flex; gap: var(--sp-2); align-items: center; margin-top: var(--sp-2); }
.replyInputWrapper { flex: 1; position: relative; }
.replyInput { width: 100%; background: var(--bg-input); border: none; border-radius: var(--r-full); padding: 6px 36px 6px 12px; font-size: var(--fs-sm); color: var(--text-primary); outline: none; }
.replyInput:focus { box-shadow: var(--brand-glow-sm); }
.replySubmit { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: var(--brand); font-size: var(--fs-base); font-weight: var(--fw-bold); background: none; }

/* Show replies */
.showReplies { display: flex; align-items: center; gap: var(--sp-2); font-size: var(--fs-xs); font-weight: var(--fw-semibold); color: var(--text-secondary); cursor: pointer; margin-top: var(--sp-1); padding-left: var(--sp-2); }
.showReplies:hover { color: var(--text-primary); }
.showRepliesLine { height: 1px; width: 24px; background: var(--border); }
.repliesList { margin-top: var(--sp-2); display: flex; flex-direction: column; gap: var(--sp-2); overflow: hidden; }

/* Comment input */
.inputRow { display: flex; gap: var(--sp-2); align-items: center; margin-top: var(--sp-4); }
.inputWrapper { flex: 1; position: relative; }
.input { width: 100%; background: var(--bg-input); border: none; border-radius: var(--r-full); padding: 9px 80px 9px 16px; font-size: var(--fs-md); color: var(--text-primary); outline: none; transition: background var(--t-fast); }
.input:focus { background: var(--bg-input-hover); }
.input::placeholder { color: var(--text-tertiary); }
.inputActions { position: absolute; right: var(--sp-3); top: 50%; transform: translateY(-50%); display: flex; gap: var(--sp-2); }
.inputAction { color: var(--text-tertiary); transition: color var(--t-fast); }
.inputAction:hover { color: var(--brand); }
```

---

# COMPLETE SETTINGS PAGES

## File: `frontend/src/pages/Settings/SettingsPage.jsx`

```jsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Shield, Lock, Bell, Eye, Palette,
  Accessibility, Database, HelpCircle, BadgeDollarSign,
  ChevronRight, LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { pageVariants } from '../../animations/variants';
import styles from './SettingsPage.module.css';

const SETTINGS_SECTIONS = [
  { path: '/settings/account',      icon: User,          label: 'Account',              desc: 'Personal info, username, contact' },
  { path: '/settings/security',     icon: Shield,        label: 'Security & Login',     desc: 'Password, 2FA, active sessions' },
  { path: '/settings/privacy',      icon: Lock,          label: 'Privacy',              desc: 'Who can see your information' },
  { path: '/settings/notifications',icon: Bell,          label: 'Notifications',        desc: 'Push, email, and in-app alerts' },
  { path: '/settings/profile',      icon: User,          label: 'Profile',              desc: 'Photos, bio, links, work, education' },
  { path: '/settings/appearance',   icon: Palette,       label: 'Appearance',           desc: 'Theme, font size, animations' },
  { path: '/settings/accessibility',icon: Accessibility, label: 'Accessibility',        desc: 'Screen readers, high contrast, i18n' },
  { path: '/settings/data',         icon: Database,      label: 'Data & Privacy',       desc: 'Download data, activity log' },
  { path: '/settings/help',         icon: HelpCircle,    label: 'Help & Support',       desc: 'FAQ, contact, community guidelines' },
  { path: '/settings/ads',          icon: BadgeDollarSign, label: 'Ads Preferences',   desc: 'MindBook is ad-free' },
];

export default function SettingsPage() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <motion.div className={styles.page} {...pageVariants}>
      <div className={styles.layout}>
        {/* ── SIDEBAR ──────────────────────────────────── */}
        <aside className={styles.sidebar} aria-label="Settings navigation">
          <h1 className={styles.title}>Settings</h1>

          <nav className={styles.nav}>
            {SETTINGS_SECTIONS.map(section => (
              <NavLink
                key={section.path}
                to={section.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
              >
                <div className={styles.navIcon}>
                  <section.icon size={18} />
                </div>
                <div className={styles.navText}>
                  <span className={styles.navLabel}>{section.label}</span>
                  <span className={styles.navDesc}>{section.desc}</span>
                </div>
                <ChevronRight size={14} className={styles.navArrow} />
              </NavLink>
            ))}

            <div className={styles.navDivider} />

            <button className={`${styles.navItem} ${styles.logoutItem}`} onClick={handleLogout}>
              <div className={styles.navIcon}><LogOut size={18} /></div>
              <span className={styles.navLabel}>Log Out</span>
            </button>
          </nav>
        </aside>

        {/* ── CONTENT PANEL ────────────────────────────── */}
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </motion.div>
  );
}
```

## File: `frontend/src/pages/Settings/SettingsAppearance.jsx`

```jsx
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useUiStore } from '../../store/uiStore';
import { pageVariants } from '../../animations/variants';
import styles from './SettingsSection.module.css';

const THEMES = [
  { id: 'light',  icon: Sun,     label: 'Light',         desc: 'Always use light mode' },
  { id: 'dark',   icon: Moon,    label: 'Dark',          desc: 'Always use dark mode' },
  { id: 'system', icon: Monitor, label: 'System default', desc: 'Match your device settings' },
];

const FONT_SIZES = [
  { id: 'small',   label: 'Small',       size: 13 },
  { id: 'default', label: 'Default',     size: 15 },
  { id: 'large',   label: 'Large',       size: 17 },
  { id: 'xlarge',  label: 'Extra Large', size: 19 },
];

const ANIMATION_MODES = [
  { id: 'full',    label: 'Full animations',    desc: 'All motion effects enabled' },
  { id: 'reduced', label: 'Reduced motion',     desc: 'Simpler transitions, no physics' },
  { id: 'none',    label: 'No animations',      desc: 'Instant transitions everywhere' },
];

export default function SettingsAppearance() {
  const { theme, setTheme, fontSize, setFontSize, animationsEnabled, setAnimations } = useUiStore();

  return (
    <motion.div className={styles.section} {...pageVariants}>
      <h2 className={styles.sectionTitle}>Appearance</h2>
      <p className={styles.sectionDesc}>Customize how MindBook looks and feels.</p>

      {/* Theme */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Theme</h3>
        <div className={styles.themeGrid}>
          {THEMES.map(t => (
            <motion.button
              key={t.id}
              className={`${styles.themeCard} ${theme === t.id ? styles.themeActive : ''}`}
              onClick={() => setTheme(t.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.themeIconWrapper}>
                <t.icon size={22} />
              </div>
              <span className={styles.themeLabel}>{t.label}</span>
              <span className={styles.themeDesc}>{t.desc}</span>
              {theme === t.id && (
                <motion.div
                  className={styles.themeCheck}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Check size={12} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Font Size</h3>
        <p className={styles.groupDesc}>Adjust the size of text across MindBook.</p>
        <div className={styles.fontSizeRow}>
          {FONT_SIZES.map(f => (
            <motion.button
              key={f.id}
              className={`${styles.fontBtn} ${fontSize === f.id ? styles.fontBtnActive : ''}`}
              onClick={() => setFontSize(f.id)}
              style={{ fontSize: f.size }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Aa
              <span className={styles.fontBtnLabel}>{f.label}</span>
            </motion.button>
          ))}
        </div>
        <div className={styles.fontPreview}>
          <p style={{ fontSize: FONT_SIZES.find(f => f.id === fontSize)?.size }}>
            Preview: The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      </div>

      {/* Animations */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Animations & Motion</h3>
        <div className={styles.radioList}>
          {ANIMATION_MODES.map(mode => (
            <label key={mode.id} className={styles.radioItem}>
              <input
                type="radio"
                name="animations"
                value={mode.id}
                checked={animationsEnabled === mode.id}
                onChange={() => setAnimations(mode.id)}
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioLabel}>{mode.label}</span>
                <span className={styles.radioDesc}>{mode.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Compact mode */}
      <div className={styles.group}>
        <div className={styles.toggleRow}>
          <div>
            <h3 className={styles.groupTitle}>Compact Mode</h3>
            <p className={styles.groupDesc}>Reduce whitespace in the feed and sidebars for a denser layout.</p>
          </div>
          <ToggleSwitch checked={false} onChange={() => {}} />
        </div>
      </div>
    </motion.div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <motion.button
      className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <motion.div
        className={styles.toggleThumb}
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </motion.button>
  );
}
```

## File: `frontend/src/pages/Settings/SettingsPrivacy.jsx`

```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { usersApi } from '../../services/api';
import { useUiStore } from '../../store/uiStore';
import { pageVariants } from '../../animations/variants';
import styles from './SettingsSection.module.css';

const PRIVACY_OPTIONS = ['Public', 'Friends', 'Friends of friends', 'Only me'];
const MESSAGE_OPTIONS = ['Everyone', 'Friends', 'No one'];
const REQUEST_OPTIONS = ['Everyone', 'Friends of friends', 'No one'];

export default function SettingsPrivacy() {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useUiStore();
  const [settings, setSettings] = useState(user?.privacySettings || {
    whoCanSeeMyPosts: 'friends',
    whoCanSeeMyFriends: 'friends',
    whoCanSeeMyBirthday: 'friends',
    whoCanSendRequests: 'everyone',
    whoCanMessage: 'friends',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    setSaving(true);
    try {
      await usersApi.updateSettings('privacy', { [key]: value });
      updateUser({ privacySettings: newSettings });
      addToast({ type: 'success', message: 'Privacy setting updated.' });
    } catch {
      addToast({ type: 'error', message: 'Failed to save.' });
      setSettings(settings);
    } finally {
      setSaving(false);
    }
  };

  const privacyRows = [
    { key: 'whoCanSeeMyPosts',    label: 'Who can see your posts?',          options: PRIVACY_OPTIONS },
    { key: 'whoCanSeeMyFriends',  label: 'Who can see your friends list?',   options: PRIVACY_OPTIONS },
    { key: 'whoCanSeeMyBirthday', label: 'Who can see your birthday?',       options: PRIVACY_OPTIONS },
    { key: 'whoCanSendRequests',  label: 'Who can send you friend requests?', options: REQUEST_OPTIONS },
    { key: 'whoCanMessage',       label: 'Who can send you messages?',        options: MESSAGE_OPTIONS },
  ];

  return (
    <motion.div className={styles.section} {...pageVariants}>
      <h2 className={styles.sectionTitle}>Privacy Settings</h2>
      <p className={styles.sectionDesc}>Control who can see your information and interact with you.</p>

      <div className={styles.group}>
        {privacyRows.map(row => (
          <div key={row.key} className={styles.privacyRow}>
            <label className={styles.privacyLabel}>{row.label}</label>
            <select
              className={styles.select}
              value={settings[row.key] || 'friends'}
              onChange={e => handleChange(row.key, e.target.value.toLowerCase())}
              disabled={saving}
            >
              {row.options.map(opt => (
                <option key={opt} value={opt.toLowerCase().replace(/ /g, '_')}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Blocked users */}
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Blocked Users</h3>
        <p className={styles.groupDesc}>
          You have {user?.blockedUsers?.length || 0} blocked users.{' '}
          <a href="/settings/blocked" className={styles.link}>Manage blocked list →</a>
        </p>
      </div>

      {/* Search indexing */}
      <div className={styles.group}>
        <div className={styles.toggleRow}>
          <div>
            <h3 className={styles.groupTitle}>Search Engine Indexing</h3>
            <p className={styles.groupDesc}>Allow search engines like Google to link to your MindBook profile.</p>
          </div>
          <select
            className={styles.select}
            value={settings.searchEngineIndexing ? 'yes' : 'no'}
            onChange={e => handleChange('searchEngineIndexing', e.target.value === 'yes')}
          >
            <option value="yes">Yes, allow indexing</option>
            <option value="no">No, don't index</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
```

## File: `frontend/src/pages/Settings/SettingsSection.module.css` (shared)

```css
.section { max-width: 640px; }
.sectionTitle { font-size: var(--fs-3xl); font-weight: var(--fw-black); margin-bottom: var(--sp-2); }
.sectionDesc { color: var(--text-secondary); margin-bottom: var(--sp-8); }

.group { background: var(--bg-card); border-radius: var(--r-xl); padding: var(--sp-6); margin-bottom: var(--sp-6); border: 1px solid var(--border); }
.groupTitle { font-size: var(--fs-lg); font-weight: var(--fw-bold); margin-bottom: var(--sp-2); }
.groupDesc { font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: var(--sp-4); line-height: var(--lh-relaxed); }

/* Privacy select rows */
.privacyRow { display: flex; align-items: center; justify-content: space-between; padding: var(--sp-3) 0; border-bottom: 1px solid var(--border); }
.privacyRow:last-child { border-bottom: none; padding-bottom: 0; }
.privacyLabel { font-size: var(--fs-md); color: var(--text-primary); }
.select { background: var(--bg-input); border: 1.5px solid var(--border); border-radius: var(--r-md); padding: 6px 10px; font-size: var(--fs-sm); color: var(--text-primary); outline: none; cursor: pointer; transition: border-color var(--t-fast); }
.select:focus { border-color: var(--border-focus); }

/* Toggle row */
.toggleRow { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4); }
.toggle { width: 44px; height: 26px; border-radius: var(--r-full); background: var(--border); position: relative; flex-shrink: 0; transition: background var(--t-base); }
.toggleOn { background: var(--brand); }
.toggleThumb { position: absolute; top: 3px; width: 20px; height: 20px; border-radius: var(--r-full); background: white; box-shadow: var(--shadow-sm); }

/* Theme cards */
.themeGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-3); }
.themeCard { padding: var(--sp-4); border-radius: var(--r-lg); border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; gap: var(--sp-2); cursor: pointer; transition: border-color var(--t-fast), background var(--t-fast); position: relative; }
.themeCard:hover { border-color: var(--brand-hover); background: var(--brand-lighter); }
.themeActive { border-color: var(--brand) !important; background: var(--brand-light) !important; }
.themeIconWrapper { width: 48px; height: 48px; border-radius: var(--r-full); background: var(--bg-input); display: flex; align-items: center; justify-content: center; }
.themeLabel { font-weight: var(--fw-semibold); font-size: var(--fs-sm); }
.themeDesc { font-size: var(--fs-xs); color: var(--text-tertiary); text-align: center; }
.themeCheck { position: absolute; top: var(--sp-2); right: var(--sp-2); width: 20px; height: 20px; border-radius: var(--r-full); background: var(--brand); color: white; display: flex; align-items: center; justify-content: center; }

/* Font size buttons */
.fontSizeRow { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.fontBtn { padding: var(--sp-3) var(--sp-5); border-radius: var(--r-lg); border: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; gap: var(--sp-1); cursor: pointer; transition: all var(--t-fast); color: var(--text-primary); }
.fontBtn:hover { border-color: var(--brand-hover); }
.fontBtnActive { border-color: var(--brand); background: var(--brand-light); }
.fontBtnLabel { font-size: var(--fs-xs); color: var(--text-secondary); font-size: 11px; }
.fontPreview { margin-top: var(--sp-4); padding: var(--sp-4); background: var(--bg-input); border-radius: var(--r-md); color: var(--text-primary); transition: font-size var(--t-base); }

/* Radio list */
.radioList { display: flex; flex-direction: column; gap: var(--sp-3); }
.radioItem { display: flex; align-items: center; gap: var(--sp-4); padding: var(--sp-4); border-radius: var(--r-lg); border: 2px solid var(--border); cursor: pointer; transition: border-color var(--t-fast); }
.radioItem:has(.radioInput:checked) { border-color: var(--brand); background: var(--brand-light); }
.radioInput { width: 18px; height: 18px; accent-color: var(--brand); flex-shrink: 0; }
.radioContent { flex: 1; }
.radioLabel { font-weight: var(--fw-semibold); display: block; }
.radioDesc { font-size: var(--fs-sm); color: var(--text-secondary); margin-top: 2px; }

/* Misc */
.link { color: var(--text-link); font-weight: var(--fw-medium); }
.link:hover { text-decoration: underline; }
```

---

# COMPLETE SEARCH PAGE

## File: `frontend/src/pages/Search/SearchPage.jsx`

```jsx
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, Users as GroupIcon, Video, Hash, Search } from 'lucide-react';
import { pageVariants, staggerContainer, listItem } from '../../animations/variants';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import { SkeletonPost } from '../../components/ui/Skeleton';
import api from '../../services/api';
import styles from './SearchPage.module.css';

const TABS = [
  { id: 'all',     label: 'All',     icon: Search },
  { id: 'people',  label: 'People',  icon: Users },
  { id: 'posts',   label: 'Posts',   icon: FileText },
  { id: 'groups',  label: 'Groups',  icon: GroupIcon },
  { id: 'videos',  label: 'Videos',  icon: Video },
  { id: 'hashtags',label: 'Hashtags',icon: Hash },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('all');
  const [results, setResults] = useState({ people: [], posts: [], groups: [], videos: [], hashtags: [] });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    setPage(1);
    api.get(`/search?q=${encodeURIComponent(query)}&type=${activeTab}&page=1&limit=20`)
      .then(r => {
        setResults(r.results || {});
        setHasMore(r.hasMore || false);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query, activeTab]);

  return (
    <motion.div className={styles.page} {...pageVariants}>
      {/* Search header */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Search results for <span className={styles.query}>"{query}"</span>
        </h1>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className={styles.content}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonPost key={i} />)
        ) : !query.trim() ? (
          <div className={styles.empty}>
            <Search size={48} className={styles.emptyIcon} />
            <p>Enter a search query to find people, posts, groups, and more.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer(0.05)}
              initial="initial"
              animate="animate"
              className={styles.resultsList}
            >
              {/* PEOPLE */}
              {(activeTab === 'all' || activeTab === 'people') && results.people?.length > 0 && (
                <section className={styles.section}>
                  {activeTab === 'all' && (
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>People</h2>
                      <Link to={`/search?q=${query}&type=people`} className={styles.seeAll}>See all</Link>
                    </div>
                  )}
                  {(activeTab === 'all' ? results.people.slice(0, 3) : results.people).map(person => (
                    <motion.div key={person._id} variants={listItem} className={styles.personCard}>
                      <Link to={`/profile/${person._id}`} className={styles.personLink}>
                        <Avatar size={56} src={person.profilePicture} alt={person.name} />
                        <div className={styles.personInfo}>
                          <p className={styles.personName}>{person.name}</p>
                          {person.mutualFriends > 0 && (
                            <p className={styles.personMutual}>{person.mutualFriends} mutual friends</p>
                          )}
                          {person.bio && <p className={styles.personBio}>{person.bio}</p>}
                        </div>
                      </Link>
                      <div className={styles.personActions}>
                        <Button variant="primary" size="sm">Add Friend</Button>
                        <Button variant="secondary" size="sm">Message</Button>
                      </div>
                    </motion.div>
                  ))}
                </section>
              )}

              {/* GROUPS */}
              {(activeTab === 'all' || activeTab === 'groups') && results.groups?.length > 0 && (
                <section className={styles.section}>
                  {activeTab === 'all' && (
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>Groups</h2>
                      <Link to={`/search?q=${query}&type=groups`} className={styles.seeAll}>See all</Link>
                    </div>
                  )}
                  <div className={styles.groupsGrid}>
                    {(activeTab === 'all' ? results.groups.slice(0, 3) : results.groups).map(group => (
                      <motion.div key={group._id} variants={listItem} className={styles.groupCard}>
                        <img
                          src={group.coverPhoto || '/uploads/defaults/group-thumb.jpg'}
                          alt={group.name}
                          className={styles.groupCover}
                        />
                        <div className={styles.groupInfo}>
                          <p className={styles.groupName}>{group.name}</p>
                          <p className={styles.groupMeta}>{group.privacy} · {group.memberCount?.toLocaleString()} members</p>
                          {group.description && <p className={styles.groupDesc}>{group.description.slice(0, 80)}…</p>}
                          <Button variant="primary" size="sm" style={{ marginTop: 'var(--sp-3)' }}>Join Group</Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* POSTS */}
              {(activeTab === 'all' || activeTab === 'posts') && results.posts?.length > 0 && (
                <section className={styles.section}>
                  {activeTab === 'all' && (
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>Posts</h2>
                    </div>
                  )}
                  {results.posts.slice(0, activeTab === 'all' ? 5 : undefined).map(post => (
                    <motion.div key={post._id} variants={listItem} className={styles.postResult}>
                      <Avatar size={40} src={post.user?.profilePicture} alt={post.user?.name} />
                      <div>
                        <p className={styles.postAuthor}>{post.user?.name}</p>
                        <p className={styles.postText}>{post.content?.slice(0, 200)}</p>
                      </div>
                    </motion.div>
                  ))}
                </section>
              )}

              {/* HASHTAGS */}
              {(activeTab === 'all' || activeTab === 'hashtags') && results.hashtags?.length > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>Hashtags</h2>
                  <div className={styles.hashtagList}>
                    {results.hashtags.map(tag => (
                      <motion.div key={tag.tag} variants={listItem}>
                        <Link to={`/hashtag/${tag.tag}`} className={styles.hashtagItem}>
                          <span className={styles.hashtagSymbol}>#</span>
                          <div>
                            <p className={styles.hashtagName}>{tag.tag}</p>
                            <p className={styles.hashtagCount}>{tag.postCount?.toLocaleString()} posts</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* EMPTY STATE */}
              {!loading && Object.values(results).every(arr => !arr?.length) && (
                <div className={styles.empty}>
                  <Search size={48} className={styles.emptyIcon} />
                  <h3>No results for "{query}"</h3>
                  <p>Try checking your spelling, or searching for something else.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
```

## File: `frontend/src/pages/Search/SearchPage.module.css`

```css
.page { max-width: 680px; margin: 0 auto; }
.header { background: var(--bg-card); border-radius: var(--r-xl); padding: var(--sp-5) var(--sp-6); margin-bottom: var(--sp-4); border: 1px solid var(--border); }
.title { font-size: var(--fs-2xl); font-weight: var(--fw-bold); margin-bottom: var(--sp-4); }
.query { color: var(--brand); }

.tabs { display: flex; gap: var(--sp-1); flex-wrap: wrap; }
.tab { display: flex; align-items: center; gap: var(--sp-2); padding: 8px 14px; border-radius: var(--r-full); font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-secondary); transition: all var(--t-fast); cursor: pointer; background: none; border: 1.5px solid transparent; }
.tab:hover { background: var(--bg-input); color: var(--text-primary); }
.tabActive { background: var(--brand-light); color: var(--brand); border-color: rgba(247,185,40,0.3); }

.content { display: flex; flex-direction: column; gap: var(--sp-4); }
.resultsList { display: flex; flex-direction: column; gap: var(--sp-4); }

.section { background: var(--bg-card); border-radius: var(--r-xl); padding: var(--sp-5); border: 1px solid var(--border); }
.sectionHeader { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-4); }
.sectionTitle { font-size: var(--fs-xl); font-weight: var(--fw-bold); }
.seeAll { font-size: var(--fs-sm); color: var(--text-link); font-weight: var(--fw-medium); }
.seeAll:hover { text-decoration: underline; }

/* People */
.personCard { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4); padding: var(--sp-3) 0; border-bottom: 1px solid var(--border); }
.personCard:last-child { border-bottom: none; padding-bottom: 0; }
.personLink { display: flex; align-items: center; gap: var(--sp-3); text-decoration: none; color: inherit; flex: 1; min-width: 0; }
.personInfo { flex: 1; min-width: 0; }
.personName { font-weight: var(--fw-semibold); color: var(--text-primary); }
.personMutual { font-size: var(--fs-sm); color: var(--text-secondary); }
.personBio { font-size: var(--fs-sm); color: var(--text-secondary); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.personActions { display: flex; gap: var(--sp-2); flex-shrink: 0; }

/* Groups */
.groupsGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--sp-4); }
.groupCard { border: 1px solid var(--border); border-radius: var(--r-lg); overflow: hidden; }
.groupCover { width: 100%; height: 100px; object-fit: cover; }
.groupInfo { padding: var(--sp-3); }
.groupName { font-weight: var(--fw-semibold); color: var(--text-primary); }
.groupMeta { font-size: var(--fs-xs); color: var(--text-tertiary); margin-top: 2px; }
.groupDesc { font-size: var(--fs-sm); color: var(--text-secondary); margin-top: var(--sp-2); }

/* Posts */
.postResult { display: flex; gap: var(--sp-3); align-items: flex-start; padding: var(--sp-3) 0; border-bottom: 1px solid var(--border); }
.postResult:last-child { border-bottom: none; }
.postAuthor { font-weight: var(--fw-semibold); font-size: var(--fs-sm); color: var(--text-primary); margin-bottom: 4px; }
.postText { font-size: var(--fs-sm); color: var(--text-secondary); line-height: var(--lh-snug); }

/* Hashtags */
.hashtagList { display: flex; flex-direction: column; gap: var(--sp-2); }
.hashtagItem { display: flex; align-items: center; gap: var(--sp-3); padding: var(--sp-3); border-radius: var(--r-md); text-decoration: none; color: inherit; transition: background var(--t-fast); }
.hashtagItem:hover { background: var(--bg-input); }
.hashtagSymbol { font-size: var(--fs-3xl); font-weight: var(--fw-black); color: var(--brand); width: 48px; text-align: center; }
.hashtagName { font-weight: var(--fw-semibold); color: var(--text-primary); }
.hashtagCount { font-size: var(--fs-sm); color: var(--text-secondary); }

/* Empty */
.empty { text-align: center; padding: var(--sp-16) var(--sp-8); color: var(--text-secondary); display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
.emptyIcon { opacity: 0.3; }
.empty h3 { font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--text-primary); }
```

---

# COMPLETE BACKEND — POSTS CONTROLLER & FEED

## File: `backend/controllers/postController.js`

```javascript
const Post = require('../models/Post');
const User = require('../models/User');
const Notification = require('../models/Notification');

// ── GET PERSONALIZED FEED ─────────────────────────────────────
exports.getFeed = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.user.id;

    const currentUser = await User.findById(userId).select('friends following savedPosts').lean();
    const socialGraph = [...(currentUser.friends || []), ...(currentUser.following || []), userId];

    // Fetch posts from social graph
    const posts = await Post.find({
      $or: [
        { user: { $in: socialGraph } },
        { privacy: 'public' }
      ],
      isDeleted: { $ne: true }
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit) + 1) // fetch one extra to check hasMore
    .populate('user', 'name profilePicture isVerified onlineStatus')
    .populate('taggedFriends', 'name _id')
    .lean();

    const hasMore = posts.length > limit;
    const result = posts.slice(0, limit);

    // Add isSaved flag and user reaction
    const enriched = result.map(post => ({
      ...post,
      isSaved: currentUser.savedPosts?.some(id => id.toString() === post._id.toString()),
      userReaction: post.reactions?.find(r => r.user?.toString() === userId),
    }));

    res.json({ success: true, posts: enriched, hasMore, page: parseInt(page) });
  } catch (err) { next(err); }
};

// ── CREATE POST ───────────────────────────────────────────────
exports.createPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      content, privacy = 'friends', images, videoUrl,
      youtubeId, backgroundColor, feeling, location,
      taggedFriends, linkPreview, poll
    } = req.body;

    if (!content?.trim() && !images?.length && !videoUrl && !youtubeId) {
      return res.status(400).json({ success: false, message: 'Post must have content, image, or video.' });
    }

    const postData = {
      user: userId,
      privacy,
    };
    if (content?.trim()) postData.content = content.trim();
    if (images?.length) postData.images = images;
    if (videoUrl) postData.videoUrl = videoUrl;
    if (youtubeId) postData.youtubeId = youtubeId;
    if (backgroundColor) postData.backgroundColor = backgroundColor;
    if (feeling?.emoji) postData.feeling = feeling;
    if (location?.name) postData.location = location;
    if (taggedFriends?.length) postData.taggedFriends = taggedFriends;
    if (linkPreview?.url) postData.linkPreview = linkPreview;
    if (poll?.question) postData.poll = { ...poll, votes: [] };

    const post = await Post.create(postData);
    const populated = await Post.findById(post._id)
      .populate('user', 'name profilePicture isVerified')
      .populate('taggedFriends', 'name _id')
      .lean();

    // Award coins for posting
    await User.findByIdAndUpdate(userId, { $inc: { coins: 2 } });

    // Notify tagged friends
    if (taggedFriends?.length) {
      const notifPromises = taggedFriends.map(friendId =>
        Notification.create({
          recipient: friendId,
          sender: userId,
          type: 'tag',
          entityType: 'post',
          entityId: post._id,
          message: 'tagged you in a post',
          actionUrl: `/posts/${post._id}`
        })
      );
      await Promise.all(notifPromises);

      // Emit notifications via Socket.IO
      const io = req.app.get('io');
      taggedFriends.forEach(fId => {
        io?.to(`user:${fId}`).emit('notification', { type: 'tag' });
      });
    }

    res.status(201).json({ success: true, post: populated });
  } catch (err) { next(err); }
};

// ── REACT TO POST ─────────────────────────────────────────────
exports.reactToPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reaction } = req.body;
    const userId = req.user.id;

    const validReactions = ['like', 'love', 'haha', 'wow', 'sad', 'angry'];
    if (!validReactions.includes(reaction)) {
      return res.status(400).json({ success: false, message: 'Invalid reaction type.' });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    const existingIdx = post.reactions.findIndex(r => r.user.toString() === userId);

    let isNew = false;
    if (existingIdx >= 0) {
      post.reactions[existingIdx].reaction = reaction;
    } else {
      post.reactions.push({ user: userId, reaction });
      isNew = true;
    }
    await post.save();

    // Notify post owner (only on new reaction, not own post)
    if (isNew && post.user.toString() !== userId) {
      await Notification.create({
        recipient: post.user,
        sender: userId,
        type: 'reaction',
        entityType: 'post',
        entityId: post._id,
        message: `reacted ${reaction === 'like' ? '👍' : reaction === 'love' ? '❤️' : '😮'} to your post`,
        actionUrl: `/posts/${post._id}`
      });
      const io = req.app.get('io');
      io?.to(`user:${post.user}`).emit('notification', { type: 'reaction', postId: id });
    }

    res.json({ success: true, reactions: post.reactions });
  } catch (err) { next(err); }
};

// ── GET LINK PREVIEW ──────────────────────────────────────────
exports.getLinkPreview = async (req, res, next) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ success: false, message: 'URL required' });

    const axios = require('axios');
    const cheerio = require('cheerio');

    const response = await axios.get(url, {
      timeout: 8000,
      headers: { 'User-Agent': 'MindBookBot/1.0' }
    });

    const $ = cheerio.load(response.data);
    const getMeta = (name) =>
      $(`meta[property="${name}"]`).attr('content') ||
      $(`meta[name="${name}"]`).attr('content') || '';

    const preview = {
      url,
      title: getMeta('og:title') || $('title').text() || '',
      description: getMeta('og:description') || getMeta('description') || '',
      image: getMeta('og:image') || '',
      domain: new URL(url).hostname.replace('www.', ''),
    };

    res.json({ success: true, preview });
  } catch (err) {
    res.json({ success: false, preview: null });
  }
};
```

---

# COMPLETE NOTIFICATION MODEL & CONTROLLER

## File: `backend/models/Notification.js`

```javascript
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
  recipient:   { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sender:      { type: Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum: ['reaction', 'comment', 'tag', 'friend_request', 'friend_accept', 'message',
           'group_invite', 'group_post', 'story_react', 'story_reply', 'birthday',
           'memory', 'event', 'job_match', 'mention', 'coin_earned', 'system',
           'new_follower', 'video_comment', 'report_update'],
    required: true,
  },
  entityType:  { type: String, enum: ['post', 'comment', 'story', 'group', 'event', 'user', 'video', 'message', 'reel'] },
  entityId:    { type: Schema.Types.ObjectId },
  message:     { type: String, required: true, maxlength: 300 },
  isRead:      { type: Boolean, default: false, index: true },
  actionUrl:   String,
  icon:        String,
  metadata:    Schema.Types.Mixed,
}, { timestamps: true });

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ createdAt: -1 });

module.exports = model('Notification', notificationSchema);
```

## File: `backend/controllers/notificationController.js`

```javascript
const Notification = require('../models/Notification');

exports.getNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, filter = 'all' } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.user.id;

    const query = { recipient: userId };
    if (filter === 'unread') query.isRead = false;
    if (filter === 'mentions') query.type = 'mention';
    if (filter === 'requests') query.type = 'friend_request';

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit) + 1)
        .populate('sender', 'name profilePicture')
        .lean(),
      Notification.countDocuments(query),
      Notification.countDocuments({ recipient: userId, isRead: false }),
    ]);

    const hasMore = notifications.length > limit;

    // Group similar notifications (e.g., 5 people liked your post)
    const grouped = groupNotifications(notifications.slice(0, limit));

    res.json({ success: true, notifications: grouped, hasMore, total, unreadCount });
  } catch (err) { next(err); }
};

exports.getUnreadCount = async (req, res, next) => {
  try {
    const count = await Notification.countDocuments({ recipient: req.user.id, isRead: false });
    res.json({ success: true, count });
  } catch (err) { next(err); }
};

exports.markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Notification.findOneAndUpdate({ _id: id, recipient: req.user.id }, { isRead: true });
    res.json({ success: true });
  } catch (err) { next(err); }
};

exports.markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ recipient: req.user.id, isRead: false }, { isRead: true });
    res.json({ success: true });
  } catch (err) { next(err); }
};

exports.deleteNotification = async (req, res, next) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, recipient: req.user.id });
    res.json({ success: true });
  } catch (err) { next(err); }
};

exports.clearAll = async (req, res, next) => {
  try {
    await Notification.deleteMany({ recipient: req.user.id });
    res.json({ success: true });
  } catch (err) { next(err); }
};

// ── HELPER: group similar notifications ───────────────────────
function groupNotifications(notifications) {
  const groups = new Map();

  for (const notif of notifications) {
    const key = `${notif.type}-${notif.entityId}`;
    if (!groups.has(key)) {
      groups.set(key, { ...notif, senders: [notif.sender], count: 1 });
    } else {
      const existing = groups.get(key);
      if (!existing.senders.find(s => s?._id?.toString() === notif.sender?._id?.toString())) {
        existing.senders.push(notif.sender);
        existing.count++;
      }
      // Update message to grouped form
      if (existing.count === 2) {
        existing.message = `${existing.senders[0]?.name} and 1 other ${notif.message}`;
      } else if (existing.count > 2) {
        existing.message = `${existing.senders[0]?.name} and ${existing.count - 1} others ${notif.message}`;
      }
    }
  }

  return Array.from(groups.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
```

---

# COMPLETE BACKEND — MAIN SERVER FILE

## File: `backend/server.js`

```javascript
require('dotenv').config();
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const initSocket = require('./sockets');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();
const server = http.createServer(app);

// ── DATABASE ───────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});

// ── MIDDLEWARE ─────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));
app.use(compression({ level: 6 }));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ── STATIC FILES ───────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── HEALTH CHECK ───────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
  });
});

// ── RATE LIMITING ──────────────────────────────────────────────
app.use('/api', apiLimiter);

// ── ROUTES ─────────────────────────────────────────────────────
app.use('/api/auth',           require('./routes/authRoutes'));
app.use('/api/users',          require('./routes/userRoutes'));
app.use('/api/posts',          require('./routes/postRoutes'));
app.use('/api/messages',       require('./routes/messageRoutes'));
app.use('/api/groups',         require('./routes/groupRoutes'));
app.use('/api/stories',        require('./routes/storyRoutes'));
app.use('/api/notifications',  require('./routes/notificationRoutes'));
app.use('/api/search',         require('./routes/searchRoutes'));
app.use('/api/events',         require('./routes/eventRoutes'));
app.use('/api/marketplace',    require('./routes/marketplaceRoutes'));
app.use('/api/fundraisers',    require('./routes/fundraiserRoutes'));
app.use('/api/jobs',           require('./routes/jobRoutes'));
app.use('/api/articles',       require('./routes/articleRoutes'));
app.use('/api/videos',         require('./routes/videoRoutes'));
app.use('/api/reels',          require('./routes/reelRoutes'));
app.use('/api/youtube',        require('./routes/youtubeRoutes'));
app.use('/api/watch',          require('./routes/watchRoutes'));
app.use('/api/admin',          require('./routes/adminRoutes'));
app.use('/api/ai',             require('./routes/aiRoutes'));
app.use('/api/mindbot',        require('./routes/mindbotRoutes'));
app.use('/api/wallet',         require('./routes/walletRoutes'));
app.use('/api/analytics',      require('./routes/analyticsRoutes'));
app.use('/api/reports',        require('./routes/reportRoutes'));

// ── 404 HANDLER ────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── ERROR HANDLER ──────────────────────────────────────────────
app.use(errorHandler);

// ── SOCKET.IO ──────────────────────────────────────────────────
const io = initSocket(server);
app.set('io', io);

// ── START SERVER ───────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 MindBook server running on http://localhost:${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 Admin email: ${process.env.ADMIN_EMAIL}`);
});

// ── GRACEFUL SHUTDOWN ──────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close();
    process.exit(0);
  });
});

module.exports = app;
```

---

# COMPLETE REACT ROUTER SETUP

## File: `frontend/src/App.jsx`

```jsx
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import { useUiStore } from './store/uiStore';
import { SocketProvider } from './context/SocketContext';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import FullScreenLayout from './layouts/FullScreenLayout';

// ── EAGER IMPORTS (critical path) ────────────────────────────
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

// ── LAZY IMPORTS (code splitting) ─────────────────────────────
const HomePage       = lazy(() => import('./pages/Home/HomePage'));
const ProfilePage    = lazy(() => import('./pages/Profile/ProfilePage'));
const MessagesPage   = lazy(() => import('./pages/Messages/MessagesPage'));
const FriendsPage    = lazy(() => import('./pages/Friends/FriendsPage'));
const GroupsPage     = lazy(() => import('./pages/Groups/GroupsPage'));
const GroupDetailPage= lazy(() => import('./pages/Groups/GroupDetailPage'));
const VideoHubPage   = lazy(() => import('./pages/VideoHub/VideoHubPage'));
const VideoPage      = lazy(() => import('./pages/VideoHub/VideoPage'));
const YouTubeVideoPage=lazy(() => import('./pages/VideoHub/YouTubeVideoPage'));
const ReelsPage      = lazy(() => import('./pages/Reels/ReelsPage'));
const ExplorePage    = lazy(() => import('./pages/Explore/ExplorePage'));
const SearchPage     = lazy(() => import('./pages/Search/SearchPage'));
const EventsPage     = lazy(() => import('./pages/Events/EventsPage'));
const MarketplacePage= lazy(() => import('./pages/Marketplace/MarketplacePage'));
const FundraisersPage= lazy(() => import('./pages/Fundraisers/FundraisersPage'));
const MemoriesPage   = lazy(() => import('./pages/Memories/MemoriesPage'));
const JobsPage       = lazy(() => import('./pages/Jobs/JobsPage'));
const ArticlesPage   = lazy(() => import('./pages/Articles/ArticlesPage'));
const AudioRoomsPage = lazy(() => import('./pages/AudioRooms/AudioRoomsPage'));
const GamingPage     = lazy(() => import('./pages/Gaming/GamingPage'));
const WalletPage     = lazy(() => import('./pages/Wallet/WalletPage'));
const NotificationsPage= lazy(() => import('./pages/Notifications/NotificationsPage'));
const MindBotPage    = lazy(() => import('./pages/MindBot/MindBotPage'));
const YourTimePage   = lazy(() => import('./pages/Wellness/YourTimePage'));
const SettingsPage   = lazy(() => import('./pages/Settings/SettingsPage'));
const SettingsAccount= lazy(() => import('./pages/Settings/SettingsAccount'));
const SettingsSecurity=lazy(() => import('./pages/Settings/SettingsSecurity'));
const SettingsPrivacy= lazy(() => import('./pages/Settings/SettingsPrivacy'));
const SettingsNotifs = lazy(() => import('./pages/Settings/SettingsNotifications'));
const SettingsProfile= lazy(() => import('./pages/Settings/SettingsProfile'));
const SettingsAppearance=lazy(() => import('./pages/Settings/SettingsAppearance'));
const SettingsAccess = lazy(() => import('./pages/Settings/SettingsAccessibility'));
const SettingsData   = lazy(() => import('./pages/Settings/SettingsData'));
const SettingsHelp   = lazy(() => import('./pages/Settings/SettingsHelp'));
const SettingsAds    = lazy(() => import('./pages/Settings/SettingsAds'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminUsers     = lazy(() => import('./pages/Admin/AdminUsers'));
const AdminReports   = lazy(() => import('./pages/Admin/AdminReports'));
const AdminLogs      = lazy(() => import('./pages/Admin/AdminLogs'));
const CreatorStudio  = lazy(() => import('./pages/CreatorStudio/CreatorStudio'));
const LandingPage    = lazy(() => import('./pages/Landing/LandingPage'));
const AboutMindBook  = lazy(() => import('./pages/About/AboutMindBook'));
const WhyMindBook    = lazy(() => import('./pages/About/WhyMindBook'));
const MeetCreator    = lazy(() => import('./pages/About/MeetCreator'));
const PrivacyPolicy  = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/Legal/TermsOfService'));
const HelpCenter     = lazy(() => import('./pages/HelpCenter/HelpCenter'));
const NotFoundPage   = lazy(() => import('./pages/NotFound/NotFoundPage'));
const HashtagPage    = lazy(() => import('./pages/Hashtag/HashtagPage'));
const DownloadData   = lazy(() => import('./pages/Settings/DownloadData'));
const MyReports      = lazy(() => import('./pages/Reports/MyReports'));
const NetworkPage    = lazy(() => import('./pages/Network/NetworkPage'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword  = lazy(() => import('./pages/Auth/ResetPassword'));
const AdminRegister  = lazy(() => import('./pages/Admin/AdminRegister'));

// ── LOADING FALLBACK ──────────────────────────────────────────
import { SkeletonPost } from './components/ui/Skeleton';
const PageLoader = () => (
  <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
    {Array.from({length:3}).map((_,i) => <SkeletonPost key={i} />)}
  </div>
);

// ── PROTECTED ROUTE ───────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

// ── PUBLIC ROUTE (redirect if authenticated) ──────────────────
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

// ── APP INNER (has access to router context) ──────────────────
function AppInner() {
  const location = useLocation();
  const { theme, fontSize } = useUiStore();

  // Apply theme and font size on mount and change
  useEffect(() => {
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-fontsize', fontSize || 'default');
  }, [theme, fontSize]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>

          {/* ── PUBLIC ROUTES ────────────────────────────── */}
          <Route element={<PublicRoute><AuthLayout /></PublicRoute>}>
            <Route path="/login"            element={<LoginPage />} />
            <Route path="/register"         element={<RegisterPage />} />
            <Route path="/forgot-password"  element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>

          {/* Admin register (separate) */}
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Landing page (public) */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/about-mindbook" element={<AboutMindBook />} />
          <Route path="/why-mindbook" element={<WhyMindBook />} />
          <Route path="/meet-the-creator" element={<MeetCreator />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/help-center" element={<HelpCenter />} />

          {/* ── PROTECTED ROUTES ─────────────────────────── */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/"                     element={<HomePage />} />
            <Route path="/feed"                 element={<HomePage />} />
            <Route path="/profile/:id"          element={<ProfilePage />} />
            <Route path="/profile/:id/:tab"     element={<ProfilePage />} />
            <Route path="/friends"              element={<FriendsPage />} />
            <Route path="/friends/:tab"         element={<FriendsPage />} />
            <Route path="/groups"               element={<GroupsPage />} />
            <Route path="/groups/discover"      element={<GroupsPage tab="discover" />} />
            <Route path="/groups/:id"           element={<GroupDetailPage />} />
            <Route path="/groups/:id/:tab"      element={<GroupDetailPage />} />
            <Route path="/watch"                element={<VideoHubPage />} />
            <Route path="/watch/:section"       element={<VideoHubPage />} />
            <Route path="/watch/video/:id"      element={<VideoPage />} />
            <Route path="/watch/yt/:youtubeId"  element={<YouTubeVideoPage />} />
            <Route path="/channel/:userId"      element={<ProfilePage channelMode />} />
            <Route path="/reels"                element={<ReelsPage />} />
            <Route path="/explore"              element={<ExplorePage />} />
            <Route path="/search"               element={<SearchPage />} />
            <Route path="/hashtag/:tag"         element={<HashtagPage />} />
            <Route path="/messages"             element={<MessagesPage />} />
            <Route path="/messages/:conversationId" element={<MessagesPage />} />
            <Route path="/events"               element={<EventsPage />} />
            <Route path="/events/:id"           element={<EventsPage detail />} />
            <Route path="/marketplace"          element={<MarketplacePage />} />
            <Route path="/marketplace/:id"      element={<MarketplacePage detail />} />
            <Route path="/fundraisers"          element={<FundraisersPage />} />
            <Route path="/fundraisers/:id"      element={<FundraisersPage detail />} />
            <Route path="/memories"             element={<MemoriesPage />} />
            <Route path="/jobs"                 element={<JobsPage />} />
            <Route path="/jobs/:id"             element={<JobsPage detail />} />
            <Route path="/jobs/applications"    element={<JobsPage applications />} />
            <Route path="/articles"             element={<ArticlesPage />} />
            <Route path="/articles/:id"         element={<ArticlesPage detail />} />
            <Route path="/audio-rooms"          element={<AudioRoomsPage />} />
            <Route path="/gaming"               element={<GamingPage />} />
            <Route path="/wallet"               element={<WalletPage />} />
            <Route path="/wallet/store"         element={<WalletPage store />} />
            <Route path="/notifications"        element={<NotificationsPage />} />
            <Route path="/mindbot"              element={<MindBotPage />} />
            <Route path="/your-time"            element={<YourTimePage />} />
            <Route path="/network"              element={<NetworkPage />} />
            <Route path="/my-reports"           element={<MyReports />} />
            <Route path="/creator-studio"       element={<CreatorStudio />} />
            <Route path="/creator-studio/:tab"  element={<CreatorStudio />} />
            <Route path="/download-your-data"   element={<DownloadData />} />

            {/* Settings (nested) */}
            <Route path="/settings" element={<SettingsPage />}>
              <Route index element={<Navigate to="/settings/account" replace />} />
              <Route path="account"       element={<SettingsAccount />} />
              <Route path="security"      element={<SettingsSecurity />} />
              <Route path="privacy"       element={<SettingsPrivacy />} />
              <Route path="notifications" element={<SettingsNotifs />} />
              <Route path="profile"       element={<SettingsProfile />} />
              <Route path="appearance"    element={<SettingsAppearance />} />
              <Route path="accessibility" element={<SettingsAccess />} />
              <Route path="data"          element={<SettingsData />} />
              <Route path="help"          element={<SettingsHelp />} />
              <Route path="ads"           element={<SettingsAds />} />
            </Route>
          </Route>

          {/* ── ADMIN ROUTES ─────────────────────────────── */}
          <Route element={<AdminRoute><AppLayout /></AdminRoute>}>
            <Route path="/admin"              element={<AdminDashboard />} />
            <Route path="/admin/users"        element={<AdminUsers />} />
            <Route path="/admin/reports"      element={<AdminReports />} />
            <Route path="/admin/logs"         element={<AdminLogs />} />
          </Route>

          {/* ── REELS (full-screen) ──────────────────────── */}
          <Route element={<ProtectedRoute><FullScreenLayout /></ProtectedRoute>}>
            <Route path="/reels/create" element={<ReelsPage create />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <SocketProvider enabled={isAuthenticated}>
        <AppInner />
      </SocketProvider>
    </BrowserRouter>
  );
}
```

---

# FRONTEND VITE CONFIGURATION

## File: `frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@services': path.resolve(__dirname, './src/services'),
      '@animations': path.resolve(__dirname, './src/animations'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },

  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor':   ['react', 'react-dom', 'react-router-dom'],
          'animation':      ['framer-motion', '@react-spring/web'],
          'three':          ['three', '@react-three/fiber', '@react-three/drei'],
          'charts':         ['recharts'],
          'editor':         ['@tiptap/react', '@tiptap/starter-kit'],
          'ui-utils':       ['date-fns', 'lucide-react', 'zustand'],
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'react', 'react-dom', 'react-router-dom',
      'framer-motion', '@react-spring/web',
      'zustand', 'axios', 'socket.io-client',
      'lucide-react', 'date-fns',
    ],
  },
});
```

---

# FINAL MANIFEST & PWA SETUP

## File: `frontend/public/manifest.json`

```json
{
  "name": "MindBook",
  "short_name": "MindBook",
  "description": "Connect with friends and the world around you. A next-generation social platform.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f0f2f5",
  "theme_color": "#F7B928",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/icons/icon-72x72.png",   "sizes": "72x72",   "type": "image/png" },
    { "src": "/icons/icon-96x96.png",   "sizes": "96x96",   "type": "image/png" },
    { "src": "/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "shortcuts": [
    { "name": "Home Feed",  "url": "/",         "icons": [{ "src": "/icons/shortcut-home.png", "sizes": "96x96" }] },
    { "name": "Messages",   "url": "/messages", "icons": [{ "src": "/icons/shortcut-msg.png",  "sizes": "96x96" }] },
    { "name": "Watch",      "url": "/watch",    "icons": [{ "src": "/icons/shortcut-watch.png","sizes": "96x96" }] }
  ],
  "categories": ["social", "entertainment"],
  "lang": "en",
  "scope": "/"
}
```

---

# FINAL SAVE_PROGRESS.MD STRUCTURE

After completing ALL prompts, the final entry in `save_progress.md` should read:

```markdown
## [FINAL TIMESTAMP] — ALL PROMPTS COMPLETE: MindBook v7.0
**Status:** ✅ Fully Completed

**Total Implementation:**
- 65+ Pages (routes)
- 200+ React components
- 120+ API endpoints  
- 22 MongoDB models
- 35+ Socket.IO events
- 100+ CSS module files
- Full WebRTC voice/video calling
- YouTube API integration with source badges
- AI MindBot (Claude API)
- Complete admin dashboard
- Full animation system (Framer Motion + React Spring + GSAP + Three.js)
- Dark/light mode on every component
- Responsive at 375px, 768px, 1280px, 1440px
- PWA manifest + service worker

**Developer Links Placed In:**
✅ Left sidebar footer
✅ Site footer  
✅ /about-mindbook hero
✅ /meet-the-creator
✅ /why-mindbook
✅ Demo account profile

**Portfolio:** https://farmanullah1.github.io/My-Portfolio
**LinkedIn:** https://www.linkedin.com/in/farmanullah-ansari/
**GitHub:** https://github.com/farmanullah1

**Quality Scores (Lighthouse):**
- Performance:    ≥80 ✅
- Accessibility:  ≥90 ✅
- Best Practices: ≥90 ✅
- SEO:            ≥90 ✅

**MindBook is ready for portfolio showcase. 🎉**
---
```

---

*MindBook Agent Playbook v7.0 — Part 3 (Complete Components, Settings, Search, Backend, App Router)*
*Developer: Farmanullah Ansari | Full Stack Software Engineer*
*Portfolio: https://farmanullah1.github.io/My-Portfolio*
*LinkedIn: https://www.linkedin.com/in/farmanullah-ansari/*
*GitHub: https://github.com/farmanullah1*
*Every step → save to save_progress.md*