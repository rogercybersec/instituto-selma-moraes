# Selma Website → TrustedMate: Complete 3D Globe & Design Transfer

## LIVE REFERENCE
- **Live site:** https://instituto-selma-moraes-testing-vers.vercel.app
- **Local file:** ~/projects/instituto-selma-moraes/selma_test_1778313927.html
- **Serve locally:** `cd ~/projects/instituto-selma-moraes && python3 -m http.server 8080`

## WHAT WAS BUILT
A single-page landing page with an immersive 3D rotating globe (NASA earth texture + NR-1 text + orbiting golden shields + particle system + wireframe + torus rings), interactive hero effects, countdown timer, glassmorphism cards, scroll-reveal animations, and a professional color system.

---

## 3D GLOBE — FULL IMPLEMENTATION (Three.js r128)

### CDN
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

### Scene Setup
```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 100);
camera.position.z = 4;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(container.offsetWidth, container.offsetHeight);
```

### Earth Sphere (radius 0.85)
```javascript
const earthGeo = new THREE.SphereGeometry(0.85, 64, 64);
const img = new Image();
// CRITICAL: Do NOT set crossOrigin = 'anonymous' for file:// protocol
img.src = 'earth-texture.jpg';
img.onload = () => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width; canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  earthMesh.material.map = texture;
  earthMesh.material.needsUpdate = true;
};
const earthMat = new THREE.MeshPhongMaterial({
  color: 0x1a3d5c, shininess: 25, transparent: true, opacity: 0.95
});
const earthMesh = new THREE.Mesh(earthGeo, earthMat);
scene.add(earthMesh);
```

### NR-1 Text Sphere (radius 0.86)
- Canvas 1024x512, drawn at 3 positions [170, 512, 854] (120 degrees apart)
- Font: N and -1 use bold 130px Inter | R uses 900 130px Playfair Display (serif)
- Color: luminous gold rgba(212,175,40,0.95) with shadow blur 40
- Stroke: rgba(160,125,15,0.8) width 3
- Mapped onto SphereGeometry(0.86, 64, 64) with MeshBasicMaterial transparent

### Wireframe Overlay (radius 0.87)
```javascript
const wireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.87, 2));
const wireMat = new THREE.LineBasicMaterial({ color: 0x2A9D8F, transparent: true, opacity: 0.12 });
const wireframe = new THREE.LineSegments(wireGeo, wireMat);
```

### Inner Glow Core (radius 0.4)
- SphereGeometry(0.4, 32, 32), MeshBasicMaterial color 0x2A9D8F, opacity 0.25

### Atmosphere Glow (radius 0.92)
- SphereGeometry(0.92, 32, 32), MeshBasicMaterial color 0x2A9D8F, opacity 0.10, side: THREE.BackSide

### Torus Rings (counter-rotating)
- Outer: TorusGeometry(1.3, 0.008, 16, 100), color 0x2A9D8F, opacity 0.35, rotation.x = PI/2.5
- Inner: TorusGeometry(1.15, 0.005, 16, 80), color 0x4CAF50, opacity 0.2, rotation.x = PI/3

### Golden Shields (2x, orbiting)
- Custom THREE.Shape (pointed bottom, curved top)
- ExtrudeGeometry with bevel (depth 0.08, bevel 0.04)
- Scaled 0.22
- MeshPhongMaterial: color 0xD4A853, shininess 120, specular 0xFFD700, emissive 0x4A3000
- Orbit radius 2.2, sinusoidal Y wobble: Math.sin(time * 0.5) * 0.3

### Particles (50 points, orbiting at radius 1.7)
- BufferGeometry with random spherical positions
- PointsMaterial: color 0x52C7B8, size 0.03, opacity 0.8

### Lighting
- AmbientLight(0x445566, 0.4)
- DirectionalLight(0xfff5e0, 0.8) at position(5, 3, 5)
- PointLight(0x2A9D8F, 0.3, 10) at position(-3, 2, 4)

### Mouse Interaction
- mousemove lerps globe rotation toward cursor
- Auto-rotate: earthMesh.rotation.y += 0.003

---

## HERO INTERACTIVE EFFECTS (CSS + Canvas 2D)

### Hero Canvas Particle Wave (#heroCanvas)
- Separate 2D canvas behind globe with animated particle grid

### Mouse-Following Gradient
```css
.mouse-gradient {
  width: 500px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(42, 157, 143, 0.08), transparent 70%);
  transition: left 0.6s ease-out, top 0.6s ease-out;
}
```

### Floating Elements, Click Ripple, Gradient Orbs
- 5 floating dots with staggered float animation
- Corner accents with teal borders
- Click ripple: scale(0)->scale(4), opacity 0.5->0
- 3 gradient orbs (600px, 400px, 300px) with blur(80px) and gradientOrb animation

---

## CSS ANIMATIONS LIBRARY (all self-contained)

fadeInUp, wordReveal, shimmer, float, pulseRing, gridPulse, marquee, ripple, gradientOrb, borderGlow, spin3d, counterUp

---

## 3D CSS EFFECTS (no Three.js needed)

- Card tilt: perspective(1000px) + translateZ layers
- Section entrance: perspective(800px) rotateX(8deg) translateY(60px)
- Method cards hover: perspective(600px) rotateY(-5deg) rotateX(3deg) scale(1.02)
- CTA button: conic-gradient glow ring with spin3d animation

---

## COLOR SYSTEM (Final — Roger-approved)

| Section | Background | Text | Accent |
|---------|-----------|------|--------|
| Nav | #FFFFFF + 1px #F1F5F9 border | #374151 | hover #0D9488 |
| Hero | #FFFFFF | #111827 | #0D9488 buttons |
| Alt sections | #F8FAFC | #4B5563 | — |
| Cards | #FFFFFF + 1px #E5E7EB | #374151 | shadow 0 4px 12px rgba(0,0,0,0.05) |
| FAQ open | #F0FDFA + 4px left #0D9488 | #374151 | — |
| Footer | #0F172A + 1px top #1E293B | #F1F5F9 | links #0D9488 |
| Trust bar | #0F172A | rgba(255,255,255,0.7) | icons #2DD4BF |
| Countdown | gradient(#991B1B, #DC2626, #EF4444) | #FFFFFF | — |
| Buttons | gradient(#0D9488, #115E59) | #FFFFFF | hover gradient(#2DD4BF, #0D9488) |

---

## ICONS — Lucide Inline SVGs
All emojis replaced with inline SVGs. Styling: stroke: currentColor; stroke-width: 1.5; fill: none;

Trust bar: Factory, HardHat, Truck, HeartPulse, ShoppingBag, Briefcase, UtensilsCrossed, Landmark, GraduationCap, Scale
Pain: Zap, CircleDollarSign, RefreshCw
Credentials: GraduationCap, Brain, Building, Zap, Heart
CTA: ClipboardCheck

---

## SCROLL REVEAL SYSTEM
IntersectionObserver at threshold 0.15. Classes: .sr (fade up), .sr-scale (scale in), .sr-3d (perspective rotate). Delays: .sr-d1 through .sr-d5.

---

## SKILLS USED
1. /web-clone-builder — 21st.dev template inspiration
2. /ui-masters — Kevin Powell, Josh Comeau, Refactoring UI
3. /design-trends-2026 — glassmorphism, spring animations, 3D
4. /ui-components — premium card patterns
5. /color-psychology — Baldwin, Kennedy, Schoger, Friedman, Verou
6. /design-review — compared against Linear, Notion, Apple, Figma, Vercel, Stripe
7. /seo-marketing-masters — Patel, Dean, Postma, Levels, Hormozi
8. /ship-and-sell — monetization strategy

---

## FOR TRUSTEDMATE: HOW TO ADAPT
- Replace earth-texture.jpg with Australia map or property-themed texture
- Change NR-1 text to TrustedMate branding
- Swap teal palette to TrustedMate brand colors
- Keep same Three.js structure, just swap textures/colors
- All CSS animations are self-contained and reusable
- Single HTML file, no build tools needed

## KEY FILES
- ~/projects/instituto-selma-moraes/selma_test_1778313927.html — COMPLETE code (~2075 lines)
- ~/projects/instituto-selma-moraes/earth-texture.jpg — NASA texture (463KB)

## PAPERCLIP TICKETS
- INV-24: NR-1 Globe & Page Corrected (backlog)
- INV-22: TrustMeMate map search + reviews (todo)
- INV-12: TrustMeMate real-time chat (done)
- INV-5: TrustMeMate listing search (done)
- INV-15: TrustMeMate rent payment (done)
