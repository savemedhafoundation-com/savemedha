# Work Log

## 2025-12-30

- Home hero banner:
  - Mobile: made the banner full-bleed and used `src/assets/Photo/mobilebanner.png` as the background (desktop unchanged) via `src/components/HeroSection.jsx` + `src/components/HomePageBanner.jsx`.
  - Desktop: zoomed/shifted the People banner to reduce the large left white area in `src/components/HomePageBanner.jsx`.

- Patient success story:
  - Mobile: removed the GSAP 3D carousel and replaced it with a normal swipe/scroll slider (scroll-snap + smooth scroll); desktop GSAP carousel remains in `src/components/PatientStories.jsx`.

- Healthcare videos section:
  - Mobile: redesigned “BROWSE OUR LATEST VIDEOS ON / HEALTHCARE & WELLNESS” to match the provided mobile reference (stacked cards + “Load More Videos”) in `src/components/CancerTreatmentPage.jsx`.
  - Mobile: reduced vertical spacing between “Patient Success Story” and the videos section in `src/components/HeroSection.jsx` + `src/components/CancerTreatmentPage.jsx`.

- Body map (Home):
  - Fixed mobile right-side white padding by stretching the layout on small screens in `src/components/HeroSection.jsx`.

- About section:
  - Mobile-only: nudged the green frame image to the right in `src/components/AboutSection.jsx`.

- Volunteer banner:
  - Mobile-only: redesigned the layout to match the provided screenshot (JOIN US header with animation, collage, bottom background + CTA) while keeping desktop unchanged in `src/components/VolunteerBanner.jsx`.
  - Mobile-only: added the chevron/clip-path bottom shape + background blend overlay for `VolunteerBg` in `src/components/VolunteerBanner.jsx`.

- Build:
  - Ran `npm run build` successfully (Vite; chunk-size warning only).

## 2025-12-29

- Body Map section (Home):
  - Added top-right decorative overlay image `src/assets/Photo/Group 9291.png` in both `src/components/BodyMap.jsx` and `src/components/FemaleBodyMap.jsx` (absolute `right-0 -top-24`, `z-20`, `md+` only).
  - Updated wrappers to allow the decoration to overlap outside the green card (use `relative` + `overflow-visible` + z-index layering).
  - Increased visible body area so legs fit better inside the green card by tuning the SVG sizing and bottom spacing in `src/components/BodyMap.css` / `src/components/FemaleBodyMap.css`.
  - Restored/kept the “Treatment Categories” accordion card positioning/layering in the Body Map area in `src/components/HeroSection.jsx`.
  - Updated Body Map heading copy and styling to match reference (“EXPLORE THE BODY MAP” with `#74C425`, plus helper lines) in `src/components/HeroSection.jsx`.

- Treatment cards (mobile-only):
  - Updated the card design to match the provided mobile reference (image fills width, green rounded footer overlap, 2-line title, pill “LEARN MORE”) in `src/components/Treatment_Cards.jsx`.
  - Increased the mobile “LEARN MORE” button height/padding without changing desktop.
  - Added mobile-only “LOAD MORE” behavior (shows 6 cards initially; desktop still shows all).

- Cancer Treatment page (“OUR GOAL” CTA card):
  - Split into separate mobile/desktop layouts to keep desktop unchanged while matching the mobile reference in `src/components/CancerTreatmentPage.jsx`.
  - Desktop: kept horizontal layout, ensured the title stays on one line (`whitespace-nowrap`), and “melted” `BackgroundImg` behind the content with a left→right white fade overlay.
  - Mobile: used `BackgroundImg` as the card background with a top fade, placed ribbon top-right, and used the requested green blob border-radius (`50% 50% 0% 100% / 46% 43% 57% 54%`) on the gradient shape behind the doctor image.

- Volunteer banner:
  - Made the section background full-bleed on desktop to remove side white gaps using negative margins/width calc in `src/components/VolunteerBanner.jsx`.
  - Added/used background asset `src/assets/Photo/Group.png`.

- About section (mobile-only typography):
  - Updated the “About / Our Foundation” copy and applied the requested mobile typography (Poppins, 19px, `leading-[1]`, justify, specific bold/regular spans) while keeping desktop styling unchanged via `sm:` overrides in `src/components/AboutSection.jsx`.

- Assets / housekeeping:
  - Added new image assets: `src/assets/Photo/Group 9291.png` (Body Map decoration) and `src/assets/Photo/Group.png` (Volunteer banner background).
  - Updated `src/assets/video/Recovery Animation.mp4` content (ensure Git LFS is enabled before committing due to file size).
  - Ran `npm run build` successfully (Vite); noted the chunk-size warning only.
  - Many files show as modified due to line-ending/formatting changes (LF ↔ CRLF); functional UI changes are mainly in the files listed above.

## 2025-12-27

- Contact banner: added configurable overlay support to `HeroBanner` and applied the green gradient overlay in `ContactUsBanner`.
- Locate Us: added `Rectangle 265.png` as the query form section background with a `bg-black/40` dimming layer on top.
- Footer (mobile): redesigned the mobile-only footer layout to match the provided design (logo + quote, newsletter card, 2-column links, social icons, terms + copyright).
- Home page: removed border/shadow styling across Home sections (About, Patient Stories, Testimonials, Videos, Volunteer banner) and added `showShadows={false}` to disable Hero banner shadows on Home.
- Vercel build fixes: fixed case-sensitive asset imports causing Rollup resolve errors:
  - `TestimonialsSection.jsx`: `licenceLogo (2).png` → `licencelogo (2).png`
  - `ContactUsBanner.jsx`: `contactUsBanner.png` → `Contactusbanner.png`

## 2025-12-26

- Locate Us: updated the clinic cards `clip-path` polygon shape (added bottom notch points: `64% 100%`, `46% 76%`, `29% 100%`).
- Locate Us: widened the clinic centers section container to `w-full max-w-[1440px]`.
- ContactGetInTouchSection: matched wrapper width to `w-full max-w-[1440px]`.
- Locate Us: added the "headset support" image above the right-side contact info panel in the form section.

## 2025-12-25

- Navbar: added mobile language picker dialog; reuses the existing Google Translate dropdown by moving `#google_translate_element` between desktop and mobile mounts.
- Locate Us: improved mobile responsiveness for header/underline, grids/cards, form layout, and buttons (prevents mobile layout shift from hover/scale effects).
- Donate: adjusted donate hero banner height to be mobile-friendly; made `supportCauseImage` height responsive on small screens.
- Treatment banner: removed fixed text widths and tuned title/subtitle sizing so the banner copy wraps properly on mobile.

## 2025-12-24

- Fixed "CONTACT US" CTA so it navigates to `/contact-us` without landing on a scrolled section (passes `onNavigate` into `CancerTreatmentPage` and scrolls to top on click).
- Refactored "LATEST VIDEOS ON HEALTHCARE & WELLNESS" to remove all hardcoded/YouTube API logic and fetch from `GET /api/healthcare-wellness-videos` via Axios (with response normalization).
- Updated testimonials licence block: changed label to "CERTIFIED BY" and moved the text outside the image container.
- Added E-Books pages:
  - `/ebook` listing with pagination (40 demo books)
  - `/ebook/read/:slug` reader (iframe PDF) + download links
  - Updated navbar/footer links and route mapping
- Added Careers page at `/careers` with NGO-appropriate, mobile-first layout, and wired navbar/footer navigation.

## 2025-12-23

- Added reusable `NaturalImmunotherapyButton` component with branded green gradient and default icon, and wired it into cancer, kidney, heart, nerve, SMA, and other treatment pages plus TreatmentDetail CTA.
- Expanded kidney detail data with `KIDNEY_NIT_CAUSES` for all kidney conditions to drive condition-specific NIT insight sections and FAQs on `KidneyLearnMore.jsx`.
- Refined Kidney learn-more page: fixed navigation key typo, added NIT video section/accordion powered by per-condition causes, enabled FAQs for all kidney conditions, and ensured "Natural Immunotherapy" text highlights (`#5b1e13`) in section titles.
- Set NIT video to autoplay, adjusted stripe offset styling, and cleaned duplicate/typo blocks in Kidney learn-more layout.
- Synced symptom rendering to new image folders (e.g., Alport, MCD) and aligned Minimal Change Disease/Alport Syndrome content updates.
- Treatment banner: removed local `<video>` fallback (YouTube embed only) and set banner video to `https://youtu.be/CXAnc1qbAsY`.
- Volunteer banner: fixed CTA button hover/cursor (z-index) and added "Become Our Volunteer" popup form (name + phone).
- Global translation: integrated Google Translate widget (en/hi/bn/ar), loads once globally, mounts in navbar, and prevents translating form inputs/placeholders/user-entered content.
- Styling: matched the translate dropdown size/appearance to the existing navbar action buttons and hid the Google top banner via CSS (no attribution scripts removed).
