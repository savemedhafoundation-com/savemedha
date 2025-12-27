# Work Log

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
