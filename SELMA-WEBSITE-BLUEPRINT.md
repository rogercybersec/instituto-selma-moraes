# 🏗️ Building selmamoraes.com.br — A Complete Blueprint

> **From zero to production.** Every step explained as if you've never written a line of code.
> Built by a senior engineer, written for a 12-year-old beginner.

---

## 📋 Table of Contents

1. [What We're Building](#1-what-were-building)
2. [Tools You Need](#2-tools-you-need)
3. [Project Structure](#3-project-structure)
4. [The HTML Skeleton](#4-the-html-skeleton)
5. [CSS — Making It Beautiful](#5-css--making-it-beautiful)
6. [The Hero Section — First Impression](#6-the-hero-section--first-impression)
7. [Ghost Video Effect](#7-ghost-video-effect)
8. [The 3D Globe (Three.js)](#8-the-3d-globe-threejs)
9. [Responsive Design — Phones & Tablets](#9-responsive-design--phones--tablets)
10. [The Glass Card Effect](#10-the-glass-card-effect)
11. [Navigation — Fixed Header](#11-navigation--fixed-header)
12. [Floating Action Button (FAB)](#12-floating-action-button-fab)
13. [Animations & Scroll Effects](#13-animations--scroll-effects)
14. [Forms & Lead Capture](#14-forms--lead-capture)
15. [Deployment to Vercel](#15-deployment-to-vercel)
16. [Domain & DNS Setup](#16-domain--dns-setup)
17. [Security Headers](#17-security-headers)
18. [Performance Optimization](#18-performance-optimization)
19. [Mistakes We Made & How We Fixed Them](#19-mistakes-we-made--how-we-fixed-them)
20. [The Complete File Map](#20-the-complete-file-map)

---

## 1. What We're Building

A professional corporate website for a psychologist specializing in Brazilian labor law (NR-1). It needs to:

- Look premium (think Apple, Linear, Stripe quality)
- Load fast (under 4 seconds)
- Work on phones, tablets, and desktops
- Have a ghost video background effect
- Have a 3D spinning globe
- Capture leads through forms
- Be secure (all security headers)
- Be deployed on Vercel with a custom domain

**Languages used:**
- **HTML** — the structure (like the skeleton of a building)
- **CSS** — the styling (like paint, furniture, and decoration)
- **JavaScript** — the behavior (like electricity, plumbing, elevators)

**Why not React/Next.js?** This is a static marketing site. A single HTML file loads faster, costs nothing to host, needs no build step, and is simpler to maintain. Senior engineers pick the simplest tool that works. Overengineering is a junior mistake.

---

## 2. Tools You Need

```
What to install (one time):
├── A code editor     → VS Code (free, download from code.visualstudio.com)
├── A terminal        → Already on your Mac (press Cmd+Space, type "Terminal")
├── Node.js           → Download from nodejs.org (we need this for Vercel CLI)
├── Vercel CLI        → Run: npm install -g vercel
└── A browser         → Chrome or Safari (you already have this)
```

**Why Vercel?** Free hosting for static sites. Auto-HTTPS. Global CDN (your site loads fast everywhere). Custom domains. Zero configuration.

---

## 3. Project Structure

A senior engineer organizes files predictably. Anyone on the team should find anything in 5 seconds.

```
instituto-selma-moraes/
├── deploy-testing/          ← PRODUCTION (what visitors see)
│   ├── index.html           ← Homepage (everything in ONE file)
│   ├── cotacao.html          ← Proposal/quote generator
│   ├── diagnostico.html      ← Assessment form
│   ├── painel-selma.html     ← Admin dashboard (private)
│   ├── checklist-nr1.html    ← Lead magnet PDF
│   ├── guia-calendly.html    ← Calendly tutorial
│   ├── vercel.json           ← Vercel config (rewrites, headers, redirects)
│   ├── selma-v30.mp4         ← Ghost video (1.8MB)
│   ├── selma-photo.png       ← About section photo
│   ├── earth-texture.jpg     ← 3D globe texture
│   ├── logo-sm-*.png         ← Logo variants (header, footer, favicon, etc.)
│   ├── manifest.webmanifest  ← PWA manifest
│   └── blog/                 ← SEO blog posts
│       ├── index.html
│       ├── nr1-o-que-mudou-2026.html
│       ├── frprt-explicado.html
│       └── multa-nr1-2026.html
│
├── staging/                 ← TEST ENVIRONMENT (for experiments)
│   ├── (same structure)
│   └── (deployed to selma-test.vercel.app)
│
└── SELMA-WEBSITE-BLUEPRINT.md  ← This file!
```

**Why "deploy-testing" name?** Historical — it started as a test. Now it IS production. The name stuck. In a real company, you'd name it `production/` or just have one directory.

**Why everything in one HTML file?** For a marketing site, inline CSS/JS means:
- One HTTP request (fast)
- No build step needed
- No FOUC (Flash of Unstyled Content)
- Easy to deploy (just upload the file)

---

## 4. The HTML Skeleton

Every HTML file starts the same way. Think of it like the foundation of a house.

```html
<!DOCTYPE html>
<!-- This tells the browser: "This is modern HTML5" -->

<html lang="pt-BR">
<!-- lang="pt-BR" = Portuguese (Brazil). Search engines use this. -->

<head>
  <meta charset="UTF-8">
  <!-- UTF-8 = supports all characters (accents like ç, ã, é) -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- THIS IS CRITICAL. Without it, phones show a tiny desktop version.
       With it, phones show the mobile version. Never forget this line. -->

  <title>Instituto Selma Moraes | Psicologia Corporativa NR-1</title>
  <!-- This appears in the browser tab and Google search results -->

  <meta name="description" content="Adequação à NR-1...">
  <!-- Google shows this under your title in search results. Max ~155 chars. -->

  <!-- Fonts from Google (free, fast, professional) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <!-- Inter = clean body text (like Apple uses)
       Playfair Display = elegant headings (serif, like a newspaper) -->

  <!-- Three.js for the 3D globe -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <style>
    /* ALL CSS goes here, inline in the <head>. Not in a separate file.
       For a single-page marketing site, this is faster. */
  </style>
</head>

<body>
  <!-- nav, sections, footer, scripts — all here -->
</body>
</html>
```

**Why `preconnect`?** When your browser sees a Google Font link, it needs to:
1. Look up the IP address (DNS)
2. Connect to the server (TCP)
3. Secure the connection (TLS)
4. THEN download the font

`preconnect` does steps 1-3 early, so step 4 is instant. Saves ~300ms.

---

## 5. CSS — Making It Beautiful

### CSS Variables (Design Tokens)

First, define your brand colors once. Then use them everywhere.

```css
:root {
  --bg:       #FFFFFF;          /* White background */
  --text:     #1E293B;          /* Dark navy text */
  --teal:     #0D9488;          /* Primary brand color (corporate, trust) */
  --gold:     #D4A853;          /* Accent (warmth, premium) */
  --radius:   16px;             /* Border radius for cards */
  --radius-xl: 24px;            /* Larger radius for hero cards */
}
```

**Why variables?** If the client says "change the green to blue", you change ONE line, not 47 lines scattered across the file.

### The Reset

Browsers add default spacing to elements. We remove it for consistency.

```css
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border-box = width includes padding and border.
     Without this, a 300px box with 20px padding becomes 340px.
     With this, it stays 300px. ALWAYS use this. */
}

html {
  scroll-behavior: smooth;
  /* When someone clicks a #link, the page scrolls smoothly
     instead of jumping instantly */
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text);
  line-height: 1.7;
  /* line-height 1.7 = readable spacing between lines.
     1.0 = lines touching. 2.0 = double-spaced. 1.7 is the sweet spot. */
}
```

---

## 6. The Hero Section — First Impression

The hero is the first thing visitors see. It must be stunning and load fast.

### The Layout Strategy

```
┌─────────────────────────────────────────────────────┐
│  [Logo]  O Problema  Método  Serviços  [Agendar]    │  ← Fixed nav
├─────────────────────────────────────────────────────┤
│                                                       │
│  ● NR-1 EM VIGOR — FISCALIZAÇÕES ATIVAS              │
│                                                       │
│  O prazo acabou.               ░░░░░░░░░░░░░░░░░░░░ │
│  A fiscalização da             ░░ GHOST VIDEO ░░░░░░ │
│  NR-1 começou.                 ░░ OF SELMA ░░░░░░░░ │
│                                ░░ (right side) ░░░░ │
│  [Adequar PGR] [Agendar 30m]  ░░░░░░░░░░░░░░░░░░░░ │
│  [Conhecer o Método →]         ░░░░░░░░░░░░░░░░░░░░ │
│                                                       │
│  ┌─────────────────────┐                              │
│  │ O CUSTO DE NÃO AGIR │                              │
│  │ 546 mil afastados    │                              │
│  │ +15,6% aumento       │                              │
│  │ R$67 mil multa       │                              │
│  └─────────────────────┘                              │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### The CSS

```css
.hero {
  position: relative;       /* So children with position:absolute stay inside */
  min-height: 110vh;        /* 110% of screen height — generous space */
  display: flex;            /* Flexbox for easy centering */
  align-items: flex-start;  /* Content starts from top, not centered vertically */
  background: #FFFFFF;
  overflow: hidden;         /* Hide anything that goes outside the box */
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr;   /* Single column — text on left */
  max-width: 58%;               /* Only use 58% of width — leave room for video */
  margin: 0 auto 0 0;           /* Push to the left (no auto on right) */
  padding: 200px 32px 160px;
  padding-left: max(32px, 5vw); /* At least 32px, but 5% of viewport on big screens */
  position: relative;
  z-index: 5;                   /* Above the video (z-index: 1) */
}
```

**Why `max()` for padding?** On a 4K monitor, `32px` looks tiny. `5vw` on 2560px = 128px. The `max()` function picks whichever is larger. This is called "fluid spacing."

---

## 7. Ghost Video Effect

This is the signature effect — Selma appears as a subtle ghost on the right side, blended with the white background.

### The Video Element

```html
<video id="heroVideo" autoplay muted loop playsinline
  style="position:absolute; top:5%; right:0; width:50%; height:95%;
         object-fit:cover; object-position:center 15%;
         pointer-events:none; z-index:1;
         opacity:0.30;
         filter:grayscale(0.15) contrast(1.4) brightness(1.05) saturate(0.65);
         mix-blend-mode:multiply;
         -webkit-mask-image: ...;
         mask-composite: intersect;">
  <source src="selma-v30.mp4" type="video/mp4">
</video>
```

Let's break down every single property:

| Property | What it does | Why we use it |
|----------|-------------|---------------|
| `autoplay` | Video plays automatically | No user interaction needed |
| `muted` | No sound | Required for autoplay (browsers block unmuted autoplay) |
| `loop` | Repeats forever | Continuous background effect |
| `playsinline` | Plays in place on iPhone | Without this, iPhone goes fullscreen |
| `position:absolute` | Taken out of normal flow | Overlays on top of hero |
| `top:5%; right:0` | Positioned right side | Leaves left side for text |
| `width:50%; height:95%` | Covers right half | Full right-side coverage |
| `object-fit:cover` | Video fills the space | Like `background-size:cover` for images |
| `object-position:center 15%` | Focus point slightly up | Shows Selma's face, not her feet |
| `pointer-events:none` | Can't click the video | Text/buttons underneath stay clickable |
| `z-index:1` | Behind text (z-index:5) | Ghost effect — text reads clearly |
| `opacity:0.30` | 30% visible | Subtle ghost, not overwhelming |
| `mix-blend-mode:multiply` | Blends with white bg | White parts of video become transparent |

### The Filter Stack

```css
filter: grayscale(0.15) contrast(1.4) brightness(1.05) saturate(0.65);
```

- `grayscale(0.15)` — Slightly desaturate (less colorful = less distracting)
- `contrast(1.4)` — Boost contrast (Selma's silhouette pops more)
- `brightness(1.05)` — Slightly brighter (compensate for opacity darkening)
- `saturate(0.65)` — Further reduce color intensity

### The Mask (Feathered Edges)

This is the most advanced part. We make the video fade at all edges so it blends seamlessly.

```css
/* Two gradient masks that combine: */
-webkit-mask-image:
  /* Vertical: fade top and bottom */
  linear-gradient(to bottom, transparent 0%, black 8%, black 85%, transparent 100%),
  /* Horizontal: fade left edge */
  linear-gradient(to right, transparent 0%, black 30%, black 94%, transparent 100%);

/* How the two masks combine: */
-webkit-mask-composite: source-in;
mask-composite: intersect;
```

Think of it like two stencils layered on top of each other. Only where BOTH stencils have a hole does the video show through.

### The Opacity Pulse (JavaScript)

When Selma points at the NR-1 globe in the video (~2.8-4.6 seconds of the 5-second loop), we increase opacity to emphasize it:

```javascript
(function(){
  var v = document.getElementById('heroVideo');
  if (!v) return;
  v.play().catch(function(){});

  var BASE_OP = 0.30, PEAK_OP = 0.58;   // Normal vs emphasized
  var POINT_START = 2.8, POINT_END = 4.6; // When she points

  v.style.transition = 'opacity 0.8s ease-in-out'; // Smooth change

  v.addEventListener('timeupdate', function(){
    var t = v.currentTime;
    if (t >= POINT_START && t <= POINT_END) {
      if (v.style.opacity != PEAK_OP) v.style.opacity = PEAK_OP;
    } else {
      if (v.style.opacity != BASE_OP) v.style.opacity = BASE_OP;
    }
  });
})();
```

**Why `timeupdate` and not `requestAnimationFrame`?** The `timeupdate` event fires ~4 times/second, which is enough for a smooth 0.8s transition. Using `requestAnimationFrame` (60fps) would waste CPU for no visual benefit.

**Why `!= PEAK_OP` check?** Without it, we'd set `style.opacity` 4 times per second even when it's already at the right value. This avoids unnecessary DOM writes.

---

## 8. The 3D Globe (Three.js)

Three.js creates 3D graphics in the browser using WebGL.

### Concept

```
Scene (the stage)
├── Camera (your eyes — looking at the stage)
├── Lights (so you can see things)
│   ├── Ambient light (soft everywhere)
│   └── Directional light (like the sun)
├── Globe (a sphere with Earth texture)
│   ├── Earth texture (painted on the sphere)
│   └── "NR-1" text (painted using a Canvas)
├── Torus ring (the green circle around the globe)
├── Orbiting shields (small objects orbiting)
└── Renderer (draws it all into a <canvas>)
```

### Basic Setup

```javascript
const container = document.getElementById('hero3d');
if (!container || typeof THREE === 'undefined') return;

// 1. Create the scene (empty stage)
const scene = new THREE.Scene();

// 2. Create the camera (your viewpoint)
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
// 50 = field of view (degrees). Lower = more zoomed in
// 1 = aspect ratio (square, since our container is square)
// 0.1, 100 = near/far clipping planes

camera.position.z = 4; // Step back 4 units to see the globe

// 3. Create the renderer (draws pixels)
const renderer = new THREE.WebGLRenderer({
  alpha: true,      // Transparent background (sees through to webpage)
  antialias: true   // Smooth edges (no jagged lines)
});
renderer.setSize(380, 380);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// devicePixelRatio = 2 on Retina displays. Cap at 2 for performance.

container.appendChild(renderer.domElement);
// This adds a <canvas> element inside our container div

// 4. Animation loop (runs 60 times per second)
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.003;  // Slowly rotate the globe
  renderer.render(scene, camera);
}
animate();
```

---

## 9. Responsive Design — Phones & Tablets

"Responsive" means the site adapts to any screen size. We use CSS `@media` queries.

```css
/* Tablets and small laptops (960px and below) */
@media (max-width: 960px) {
  .hero-content {
    max-width: 100% !important;    /* Use full width */
    padding: 180px 24px 80px !important;
  }
  .hero-card-wrapper {
    max-width: 100% !important;    /* Card spans full width */
  }
  /* Video becomes a subtle footer overlay on mobile */
  #heroVideo {
    width: 100% !important;
    height: 60% !important;
    top: auto !important;
    bottom: 0 !important;
    opacity: 0.18 !important;      /* Even more subtle on mobile */
  }
}

/* Phones (600px and below) */
@media (max-width: 600px) {
  .hero h1 { font-size: 2.25rem; }  /* Smaller heading */
  .hero-actions { flex-direction: column; }  /* Stack buttons vertically */
  .btn-glow, .btn-ghost { width: 100%; }    /* Full-width buttons */
}
```

**The Rule:** Design desktop first, then add `@media (max-width: X)` to override for smaller screens. This is called "desktop-first" responsive design.

**Why `!important`?** The inline styles on the video element have highest specificity. Only `!important` can override inline styles from a stylesheet. This is one of the few legitimate uses of `!important`.

---

## 10. The Glass Card Effect

The "O custo de não agir" card uses glassmorphism — a frosted glass look.

```css
.glass-card {
  background: #FFFFFF;
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  /* What's behind the card gets blurred — like frosted glass */

  border: 1px solid #E5E7EB;
  border-radius: var(--radius-xl);  /* 24px rounded corners */
  padding: 44px;
  position: relative;
  overflow: hidden;
}

/* Subtle gradient line at the top */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(15, 118, 110, 0.2), transparent);
}
```

**Why `::before`?** It creates a decorative element without adding HTML. The top gradient line adds a subtle premium touch — you see this on Linear and Stripe cards.

---

## 11. Navigation — Fixed Header

```css
nav {
  position: fixed;    /* Stays at the top when scrolling */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;      /* Above everything else */
  padding: 10px 0;
  background: #FFFFFF;
  border-bottom: 1px solid #F1F5F9;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* When user scrolls down, nav gets a frosted glass effect */
nav.scrolled {
  padding: 6px 0;     /* Slightly smaller */
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24px) saturate(180%);
}
```

The JavaScript to toggle the `.scrolled` class:

```javascript
window.addEventListener('scroll', function() {
  var nav = document.querySelector('nav');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });
// { passive: true } = tells the browser this won't call preventDefault()
// = browser can optimize scroll performance
```

---

## 12. Floating Action Button (FAB)

The "Agendar 30 min" button floats at bottom-right. We hide it during the hero and show it after scrolling.

```css
#fab-calendly {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9998;
  /* Hidden by default */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

#fab-calendly.fab-visible {
  opacity: 1;
  pointer-events: auto;
}
```

```javascript
(function(){
  var fab = document.getElementById('fab-calendly');
  var hero = document.getElementById('hero');
  if (!fab || !hero) return;

  function check(){
    // getBoundingClientRect().bottom = distance from top of viewport to bottom of hero
    // When bottom <= 0, hero is completely scrolled out of view
    if (hero.getBoundingClientRect().bottom <= 0) {
      fab.classList.add('fab-visible');
    } else {
      fab.classList.remove('fab-visible');
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  check(); // Run once on load
})();
```

---

## 13. Animations & Scroll Effects

### Scroll Reveal (elements appear as you scroll)

```javascript
// IntersectionObserver watches elements and fires when they enter the viewport
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, { threshold: 0.15 }); // Trigger when 15% visible

// Apply to all elements with class "sr" (scroll-reveal)
document.querySelectorAll('.sr').forEach(function(el) {
  observer.observe(el);
});
```

```css
.sr {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.sr.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for sequential appearance */
.sr-d1 { transition-delay: 0.1s; }
.sr-d2 { transition-delay: 0.2s; }
.sr-d3 { transition-delay: 0.3s; }
```

---

## 14. Forms & Lead Capture

The assessment form (`/avaliacao`) uses a resilient multi-fallback strategy:

```
User submits form
    │
    ├─→ 1. Save to localStorage (never lose the lead)
    │
    ├─→ 2. Try FormSubmit.co AJAX (timeout 8s)
    │       ├─ Success → Show confirmation
    │       └─ Fail → Try step 3
    │
    ├─→ 3. Try FormSubmit.co iframe POST (bypasses CORS)
    │       ├─ Success → Show confirmation
    │       └─ Fail → Show manual options
    │
    └─→ 4. Show WhatsApp + mailto buttons
            (always shown regardless — user can always reach Selma)
```

**Why this chain?** FormSubmit.co went down for 14+ hours once. If we relied on it alone, we'd lose every lead during that outage. The localStorage backup + WhatsApp + mailto ensure zero data loss.

---

## 15. Deployment to Vercel

### First time setup

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to your project
cd ~/projects/instituto-selma-moraes/deploy-testing

# 3. Link to a Vercel project
vercel link --project instituto-selma-moraes-testing-version --yes

# 4. Deploy to production
vercel --prod --yes
```

### The `vercel.json` Configuration

```json
{
  "buildCommand": "",          // No build step — pure static files
  "outputDirectory": ".",      // Serve files from this directory
  "framework": null,           // Not a framework project

  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "selmamoraes.com.br" }],
      "destination": "https://www.selmamoraes.com.br/:path*",
      "permanent": true
    }
    // Redirects non-www to www (SEO best practice — one canonical URL)
  ],

  "rewrites": [
    // Clean URLs: /cotacao serves cotacao.html
    { "source": "/cotacao", "destination": "/cotacao.html" },
    { "source": "/avaliacao", "destination": "/diagnostico.html" },

    // Static files bypass the catch-all
    { "source": "/:path*.:ext(png|jpg|mp4|webm|js|css)", "destination": "/:path*.:ext" },

    // Everything else → index.html (SPA-like fallback)
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**CRITICAL LESSON:** The catch-all `/(.*) → /index.html` intercepts ALL requests, including `.mp4` video files. That's why we add the static file extension pattern BEFORE the catch-all. Without it, your video returns HTML instead of video data. We learned this the hard way.

---

## 16. Domain & DNS Setup

```
Vercel Dashboard → Project → Settings → Domains
    │
    ├─→ Add: selmamoraes.com.br
    ├─→ Add: www.selmamoraes.com.br
    │
    └─→ Vercel gives you DNS records to add at your registrar:
        Type: A     Name: @    Value: 76.76.21.21
        Type: CNAME Name: www  Value: cname.vercel-dns.com
```

Vercel handles HTTPS certificates automatically (Let's Encrypt).

---

## 17. Security Headers

Every response from our server includes these headers:

```json
{
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; ...",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=63072000",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy": "same-origin"
}
```

| Header | What it prevents |
|--------|-----------------|
| CSP | XSS attacks (injecting scripts) |
| X-Content-Type-Options | MIME sniffing attacks |
| X-Frame-Options: DENY | Clickjacking (embedding in iframes) |
| HSTS | Downgrade attacks (forcing HTTP) |
| Referrer-Policy | Leaking URLs to third parties |
| Permissions-Policy | Preventing camera/mic access |
| COOP | Cross-origin window attacks |

---

## 18. Performance Optimization

### Current Metrics (2026-05-26)

| Metric | Value | What it means |
|--------|-------|---------------|
| First Paint | 2.3s | When user first sees content |
| DOM Ready | 2.5s | When page is interactive |
| Full Load | 4.0s | Everything including video |
| Total Size | 2.8MB | Mostly the video (1.8MB) |

### What makes it fast

1. **Single HTML file** — one request, no waterfalls
2. **Inline CSS** — no render-blocking stylesheet
3. **Font preconnect** — DNS/TLS done early
4. **Video streams** — browser starts playing before fully downloaded
5. **Vercel CDN** — served from edge servers worldwide
6. **`must-revalidate` cache** — always fresh, instant on revisit

---

## 19. Mistakes We Made & How We Fixed Them

### Mistake 1: Vercel catch-all eating video files

**Symptom:** Video showed as blank. `curl` returned HTML instead of video.
**Root cause:** `{ "source": "/(.*)", "destination": "/index.html" }` catches everything — including `.mp4`.
**Fix:** Added extension pattern BEFORE the catch-all:
```json
{ "source": "/:path*.:ext(png|jpg|mp4|webm|js|css)", "destination": "/:path*.:ext" }
```
**Lesson:** Vercel rewrites are processed in order. First match wins. Always put specific rules before general ones.

### Mistake 2: CDN serving cached broken response

**Symptom:** Fixed the vercel.json but video still returned HTML.
**Root cause:** Vercel's CDN cached the broken response for ~43 hours.
**Fix:** Renamed video from `selma-hero.mp4` to `selma-v30.mp4`. New URL = no cached response.
**Lesson:** When fixing CDN issues, rename the file to bust cache instantly.

### Mistake 3: Glass card covering the ghost video

**Symptom:** "O custo de não agir" card was in the right column, covering Selma's face.
**Root cause:** The hero grid was 2 columns (`1.1fr 0.9fr`). The card was the second grid item (right column).
**Fix:** Moved the card HTML inside the `hero-text` div, changed grid to single column, card now sits below the text on the left.
**Lesson:** When restructuring a layout, think about which parent container each element belongs to.

### Mistake 4: Video too faint initially

**Symptom:** Roger said "Too faint — make Selma more visible."
**Root cause:** Initial opacity was 0.12 (basically invisible).
**Fix:** Increased to 0.30 with reduced grayscale. Added opacity pulse (0.30 → 0.58) when Selma points at globe.
**Lesson:** Ghost effects need real-browser testing, not code guessing. Always use the headless browser to verify.

### Mistake 5: Opening visible browser windows on Roger's machine

**Symptom:** Puppeteer opened Chrome windows that interfered with Roger's work.
**Fix:** Always use `headless: 'new'` in Puppeteer config. Never `headless: false`.
**Lesson:** When automating browser tasks on a user's machine, always run headless unless explicitly asked otherwise.

### Mistake 6: Stale deployment URL confusion

**Symptom:** Roger kept looking at an old URL (`lp1qpa80w`) that never updated.
**Root cause:** Vercel deployment URLs are immutable snapshots. They never change.
**Fix:** Always use the alias URL (`selma-test.vercel.app`) and update it after every deploy with `vercel alias set`.
**Lesson:** Explain to stakeholders that deployment URLs are frozen. Use aliases for "latest."

---

## 20. The Complete File Map

```
deploy-testing/index.html
├── <head>
│   ├── Meta tags (charset, viewport, SEO)
│   ├── Font imports (Inter, Playfair Display)
│   ├── Three.js CDN
│   └── <style> (ALL CSS — ~2500 lines)
│       ├── CSS Variables
│       ├── Reset
│       ├── Nav styles
│       ├── Hero styles
│       ├── Section styles (Pain, Method, Proof, About, CTA, FAQ)
│       ├── Card styles (glass, pain, method)
│       ├── Button styles (glow, ghost, calendly)
│       ├── Animation keyframes
│       └── @media responsive breakpoints (960px, 768px, 600px)
│
├── <body>
│   ├── <nav> (fixed header with logo + links + CTAs)
│   ├── <section.hero> (video + text + card)
│   ├── <div.countdown-bar> (NR-1 deadline countdown)
│   ├── <div.trust-bar> (industry logos marquee)
│   ├── <section#problema> (pain points + 3D globe)
│   ├── <section#metodo> (4-step methodology timeline)
│   ├── <section#servicos> (service cards)
│   ├── <section#resultados> (proof/testimonials)
│   ├── <section#selma> (about Selma + photo)
│   ├── <section#cta> (final call to action)
│   ├── <section#faq> (accordion FAQ)
│   ├── <footer> (links + logo + legal)
│   ├── <script> (ALL JavaScript — ~1500 lines)
│   │   ├── Service Worker registration
│   │   ├── Nav scroll effect
│   │   ├── Countdown timer
│   │   ├── Counter animations
│   │   ├── Scroll reveal (IntersectionObserver)
│   │   ├── FAQ accordion
│   │   ├── Tilt 3D card effect
│   │   ├── Hero video opacity pulse
│   │   ├── Three.js 3D globe
│   │   └── FAB scroll visibility
│   ├── <a#fab-calendly> (floating action button)
│   └── <style> (FAB-specific styles)
│
└── End
```

---

## 🎓 Key Principles for Junior Developers

1. **Ship, then polish.** A live ugly site beats a perfect localhost.
2. **Simplest tool that works.** One HTML file > React + Webpack + Tailwind for a marketing page.
3. **Test on real devices.** Headless browser ≠ real browser. Open it on your phone.
4. **Cache busting:** When something looks wrong after deploy, rename the file.
5. **Security from day one.** Add headers before launch, not after a breach.
6. **Version control everything.** Git commit after every meaningful change.
7. **Read the error message.** 90% of bugs tell you exactly what's wrong.
8. **Ask "what breaks?"** before "what's cool?" Reliability > features.

---

*Built for selmamoraes.com.br — May 2026*
*Documented by Claude Code for Roger's engineering reference*
