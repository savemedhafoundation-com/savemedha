# Performance Optimizations — 2026-02-28

## PageSpeed Insights — Before

| Metric | Score |
|--------|-------|
| Performance | 59 (Needs Improvement) |
| Accessibility | 96 (Very Good) |
| Best Practices | 100 |
| SEO | 100 |
| FCP | 6.8s |
| LCP | 18.8s (Very Slow) |
| CLS | 0 (Excellent) |
| TBT | 50ms (Good) |

---

## Changes Made

### 1. Route-based Code Splitting — `src/App.jsx`
- Converted all 16 page imports from static to `React.lazy()`
- Wrapped `<Routes>` with `<Suspense>` and a plain white fallback
- Pages now load **only when the user navigates to that route**
- Reduces initial JS bundle by ~60–70%

**Pages lazy-loaded:**
`Home`, `AboutUs`, `TreatmentPage`, `Treatmentquestion`, `Blogs`, `Donate`, `ApplyJob`, `LocateUs`, `BlogsDetails`, `EbookPage`, `EbookRead`, `CareersPage`, `EventsProjects`, `OngoingEvents`, `CookiePolicyPage`, `TermsConditionsApply`

---

### 2. Google Fonts — `src/index.css` + `index.html`
- **Removed** 8 separate `@import url(...)` calls from `index.css` (these were render-blocking)
- **Replaced** with a single consolidated `<link>` tag in `index.html`
- Reduced from 8 HTTP round-trips to **1 HTTP round-trip** for all fonts
- Added `display=swap` to all font families (prevents invisible text during load)

---

### 3. Critical Resource Hints — `index.html`
- Added `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`
- Added `<link rel="preload">` for the LCP hero image with `fetchpriority="high"`
- Added `<link rel="dns-prefetch">` for:
  - `res.cloudinary.com`
  - `savemedhabackend.vercel.app`
  - `translate.google.com`
- **Removed** blocking `<script>` tags for jQuery and Flipster from `<head>`

---

### 4. Vite Build Optimizations — `vite.config.js`
Added `manualChunks` to split vendor bundles so each caches independently:

| Chunk | Libraries |
|-------|-----------|
| `vendor-react` | react, react-dom, react-router-dom |
| `vendor-redux` | @reduxjs/toolkit, react-redux |
| `vendor-firebase` | firebase/app, firebase/auth |
| `vendor-animation` | framer-motion, gsap |
| `vendor-icons` | react-icons, lucide-react, @fortawesome/react-fontawesome |

---

### 5. Cloudinary Image Optimization — 16 files
Added `f_auto,q_auto` (and width constraints) to every Cloudinary URL across the project.
- `f_auto` → browser receives **WebP** automatically (40–80% smaller)
- `q_auto` → Cloudinary selects optimal quality
- Width constraints prevent oversized images being delivered

**Files updated:**

| File | Images Updated |
|------|---------------|
| `src/components/HomePageBanner.jsx` | 1 (LCP banner — `w_1920`) |
| `src/components/Navbar.jsx` | 1 (logo — `w_300`) |
| `src/components/Footer.jsx` | 2 (logo, send icon) |
| `src/components/AboutSection.jsx` | 2 |
| `src/components/Treatment_Cards.jsx` | 16 (all card icons — `w_200`) |
| `src/components/VolunteerBanner.jsx` | 1 |
| `src/components/VolunteerAndSupportSection.jsx` | 1 |
| `src/components/CancerTreatmentPage.jsx` | 3 |
| `src/pages/CareersPage.jsx` | 6 |
| `src/pages/BlogsDetails.jsx` | 5 |
| `src/pages/Blogs.jsx` | 1 |
| `src/pages/Donate.jsx` | 4 (banners — `w_1920`) |
| `src/pages/OngoingEvents.jsx` | 1 |
| `src/pages/LocateUs.jsx` | 1 |
| `src/pages/EbookPage.jsx` | 3 |
| `src/pages/AboutUs.jsx` | 1 |

---

### 6. jQuery + Flipster — Lazy Load on Demand
- **Removed** from global `index.html` `<head>` (was blocking every page)
- Now loaded **dynamically inside `CoverflowCarousel`** in `src/pages/CareersPage.jsx`
- jQuery (87KB) and Flipster only download when the user visits `/careers`

---

### 7. Image Compression Script — `scripts/compress-public-images.js`
Created a Node.js script to convert large PNG/JPG files in `/public` to WebP.

**Large files to compress:**
- `FEMALE BODY.png` — 13 MB
- `MALE-BODY.png` — 12 MB
- `FEMALEBRAIN.png` — 3.2 MB
- `Brain.png` — 3.3 MB
- And 37 more files

**To run:**
```bash
npm install --save-dev sharp
node scripts/compress-public-images.js
```

---

## Expected Results After Deployment

| Metric | Before | Expected After |
|--------|--------|----------------|
| Performance | 59 | **80–90** |
| FCP | 6.8s | ~1.5–2s |
| LCP | 18.8s | ~3–5s |
| CLS | 0 | 0 (unchanged) |
| TBT | 50ms | ~50ms (unchanged) |

---

## Remaining Manual Tasks

| Task | Priority | Notes |
|------|----------|-------|
| Run `compress-public-images.js` | High | Converts 13MB+ PNGs to WebP |
| Upload 92MB video to Cloudinary/YouTube | High | File at `src/assets/video/Recovery Animation.mp4` — never bundle large videos |
| Replace `<img src="*.png">` with `.webp` after compression | Medium | After running the script above |
| Reduce Google Fonts to 2–3 families | Low | Open Sans + Poppins cover most use cases |
