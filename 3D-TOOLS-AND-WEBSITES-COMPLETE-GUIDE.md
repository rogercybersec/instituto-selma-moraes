# Complete Guide: Every Tool, Website & Reference Used to Build the Selma 3D Globe & Landing Page

This document is a FULL briefing for any Claude instance. It explains every tool, what it does, how it was used, and how to use it for TrustedMate or any future project.

---

## 1. SPLINE — 3D Design Tool (Beyond Just Globes)

**What it is:** Spline (spline.design) is a browser-based 3D design tool that lets you create interactive 3D scenes, objects, animations, and effects — then embed them directly in websites.

**What it can do:**
- Create 3D objects (globes, logos, characters, abstract shapes, product mockups)
- Add realistic materials (glass, metal, plastic, glow, gradients)
- Build interactive scenes (mouse hover effects, click animations, scroll-triggered 3D)
- Export as embeddable React component or iframe
- Create 3D text, particles, morphing shapes, floating elements
- Real-time lighting and shadows
- Physics simulations (gravity, collisions, spring)

**How to use in a project:**
```bash
# React integration
npm install @splinetool/react-spline
```
```jsx
import Spline from '@splinetool/react-spline';
<Spline scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
```
```html
<!-- Or simple iframe embed (no npm needed) -->
<iframe src="https://my.spline.design/YOUR-SCENE-ID/" width="100%" height="500"></iframe>
```

**Why it matters for TrustedMate:** You can create premium 3D hero effects (floating houses, interactive property cards, 3D map pins, animated logos) without writing Three.js code manually. Spline is the design tool; Three.js is the code-level tool. Use Spline for visual 3D design, Three.js when you need full programmatic control.

**GitHub:** https://github.com/splinetool/react-spline

---

## 2. THREE.JS r128 — Programmatic 3D Engine

**What it is:** The most popular JavaScript 3D library. Runs WebGL in the browser. Used when you need full code control over 3D scenes.

**What we built with it (Selma globe):**
- Earth sphere with NASA texture mapped on it
- NR-1 text rendered on canvas and wrapped around the sphere
- Wireframe overlay (teal icosahedron)
- Inner glow core + atmosphere glow (BackSide rendering)
- Counter-rotating torus rings
- 2 golden shields orbiting with sinusoidal wobble
- 50 particle points orbiting at radius 1.7
- Mouse-interactive rotation (lerped toward cursor)
- Custom lighting (ambient + directional + point light)

**CDN (no npm needed):**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

**Key references used:**
- https://threejs.org/examples/ — Official examples gallery (100+ demos of what's possible)
- https://threejs-journey.com/lessons/particles — Bruno Simon's particle system tutorial
- https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js/ — Scroll-reactive 3D with Three.js
- https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/ — VFX.js for easy WebGL effects
- https://tympanus.net/codrops/tag/webgl/ — Full WebGL effects collection
- https://github.com/lbebber/HeatDistortionEffect — Heat distortion shader effect

**For TrustedMate:** Use Three.js when you need: custom globe with Australia map, interactive 3D property cards, particle backgrounds, shader effects. Use Spline when you want to DESIGN 3D visually first.

---

## 3. 21st.dev — Premium UI Components Library

**What it is:** A community library of premium, production-ready UI components built with React/Next.js + Tailwind + Framer Motion. You browse components, copy the code, and integrate into your project.

**CRITICAL:** These are NOT full templates — they are INDIVIDUAL components. The technique (from Nate Herk) is to pick components from DIFFERENT sources and combine them for a unique look.

**Components we browsed/used for Selma:**

### Hero Sections (the main landing area):
- https://21st.dev/community/components/minhxthanh/animated-web3-landing-page — **Animated Web3 hero** with particle effects, gradient backgrounds, floating elements. THIS was the primary inspiration for the immersive hero with gradient orbs and mouse-following effects.
- https://21st.dev/community/components/minhxthanh/digital-serenity-animated-landing-page — **Digital Serenity** hero with calm animations, glassmorphism cards. Inspired the glass stat card.
- https://21st.dev/community/components/Codehagen/hero — Clean hero layout with badge + headline + CTA
- https://21st.dev/community/components/meschacirung/hero-section-5 — Hero with 3D perspective elements
- https://21st.dev/community/components/uniquesonu/animated-hero-section-ui — Animated hero with word-by-word text reveal (we used this technique)
- https://21st.dev/community/components/prebuiltui/hero-section — Prebuilt hero with stats
- https://21st.dev/community/components/reuno-ui/hero-section — Reuno hero with gradient accents
- https://21st.dev/community/components/thanh/hero-landing-page/default — Hero with floating decorative elements

### Full Landing Pages:
- https://21st.dev/community/components/designali-in/landing-page — Full landing page structure (sections, spacing, flow)
- https://21st.dev/community/components/m.umairwaheedansari/landing-page — Landing with card-based sections

### Section-Specific Searches:
- https://21st.dev/s/hero — Hero section search
- https://21st.dev/s/interactive — Interactive component search
- https://21st.dev/s/testimonial — Testimonial/social proof patterns
- https://21st.dev/s/pricing-section — Pricing section patterns
- https://21st.dev/s/cta — CTA section patterns
- https://21st.dev/s/landing-page-banner — Banner patterns

### Templates:
- https://21st.dev/agents/docs/templates — Template documentation
- https://21st.dev/templates — Full template gallery

**How to use 21st.dev:**
1. Go to the component URL
2. Click "View Code" or "Copy"
3. The code is React + Tailwind + Framer Motion
4. Adapt the code to your project (change colors, text, layout)
5. Mix components from different authors for uniqueness

---

## 4. EARTH TEXTURE SOURCES — For Globe Mapping

**What we used:** NASA's Scientific Visualization Studio earth texture (2048x1024 JPEG, 463KB)

**Sources (all free or reference):**
- https://svs.gsfc.nasa.gov/3615/ — **NASA SVS (USED)** — High-res Earth textures, public domain. Best quality, free.
- https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg — Solar System Scope — 2K day map, CC license
- https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg — Night lights map (for cool dark-mode globe effect)
- https://planetpixelemporium.com/earth8081.html — Planet Pixel Emporium — Multiple resolutions and map types
- https://www.istockphoto.com/illustrations/earth-texture-map — iStock (paid) — Premium quality
- https://www.vecteezy.com/free-vector/earth-texture-map — Vecteezy (free with attribution)
- https://stock.adobe.com/search?k=earth+map+texture — Adobe Stock (paid)

**For TrustedMate:** Replace the earth texture with an Australia-focused map, stylized property texture, or the night lights map (premium look on dark backgrounds).

**CRITICAL loading note:**
```javascript
const img = new Image();
// Do NOT set crossOrigin = 'anonymous' for file:// protocol — blocks loading
// Only set it for https:// (production)
img.src = 'earth-texture.jpg';
```

---

## 5. 3D WEBSITE INSPIRATION GALLERIES

- https://codedesign.ai/website-templates/3d-website-templates — AI-generated 3D website templates
- https://www.lapa.ninja/category/3d-websites/ — Lapa.ninja 3D website gallery (curated, real sites)
- https://www.entheosweb.com/ideas/creative-modern-3d-animated-website-templates/ — Creative 3D animated templates
- https://elements.envato.com/web-templates/3d — Envato Elements 3D templates (paid, high quality)
- https://www.templatemonster.com/3d-landing-page-templates/ — Template Monster 3D landing pages
- https://www.victorflow.com/blog/best-3d-framer-templates — Best 3D Framer templates
- https://www.3dlogolab.io/ — 3D logo generator

**How to use:** Browse BEFORE starting. Pick 2-3 sites. Clone with `monolith` as reference. Build your own version.

---

## 6. WEBGL & SHADER EFFECTS

- https://tympanus.net/codrops/tag/webgl/ — **Codrops WebGL collection** — #1 source for creative WebGL effects
- https://tympanus.net/codrops/2025/01/20/vfx-js-webgl-effects-made-easy/ — **VFX.js** — One-line distortion, blur, glitch effects
- https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js/ — Scroll-driven 3D gallery
- https://github.com/lbebber/HeatDistortionEffect — Heat distortion shader

---

## 7. COLOR PSYCHOLOGY & DESIGN TOOLS

- https://github.com/adobe/leonardo — **Adobe Leonardo** — Contrast-based color generator by Nate Baldwin
- https://natebaldw.in/ — Nate Baldwin's site
- https://medium.com/@NateBaldwin/leonardo-an-open-source-contrast-based-color-generator-92d61b6521d2 — How Leonardo works
- https://www.go-globe.com/color-psychology-of-web-design-infographic/ — Color psychology infographic
- https://github.com/erikuus/good-ui — Good UI patterns

---

## 8. DESIGN INSPIRATION SITES (Nate Herk Method)

- **21st.dev** — Individual UI components. Copy code directly.
- **Dribbble** (dribbble.com) — Design mockups, color schemes, layouts
- **Godly** (godly.website) — Curated BEST website designs
- **Awwwards** (awwwards.com) — Award-winning websites
- **Mobbin** (mobbin.com) — Mobile app design patterns

---

## 9. WEBSITE CLONING TOOLS

```bash
monolith https://example.com -o reference.html   # Clone full page
single-file https://example.com reference.html    # Alternative for JS-heavy sites
open reference.html                                # View
```

**Anti-plagiarism (MANDATORY):** Change colors, fonts, copy, images, section order, add unique elements, run /design-review.

---

## 10. SKILLS TO RUN (in order)

| Order | Skill | What it does |
|-------|-------|-------------|
| 1 | `/design-trends-2026` | 2025-2026 trends: glassmorphism, spring animations, bento grids |
| 2 | `/ui-components` | Enterprise patterns at CrowdStrike/Apple quality |
| 3 | `/ui-masters` | Kevin Powell CSS, Josh Comeau animations, Refactoring UI |
| 4 | `/web-clone-builder` | Full 5-hack process from Nate Herk |
| 5 | `/color-psychology` | 5 experts: Baldwin, Kennedy, Schoger, Friedman, Verou |
| 6 | `/design-review` | Compare against Linear, Notion, Apple, Stripe |
| 7 | `/seo-marketing-masters` | Patel, Dean, Postma, Levels, Hormozi |
| 8 | `/ship-and-sell` | Monetization, pricing, launch |

---

## 11. WHAT WAS BUILT (final result)

**Live:** https://instituto-selma-moraes-testing-vers.vercel.app
**Source:** ~/projects/instituto-selma-moraes/selma_test_1778313927.html (~2075 lines, single file, no build tools)

---

## HOW TO USE THIS FOR TRUSTEDMATE

1. Open the live Selma site — study every section, scroll, hover, click
2. Read the source code (single HTML file)
3. Browse 21st.dev for property/real estate hero components
4. Use Spline to design 3D hero elements (houses, map pins, Australia outline)
5. Use Three.js for programmatic 3D (interactive globe, data viz)
6. Run all 8 skills before writing code
7. Clone competitor sites with monolith (Flatmates, Domain, Airbnb)
8. Screenshot loop to compare quality
9. Follow anti-plagiarism protocol
