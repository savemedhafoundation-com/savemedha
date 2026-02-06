# Today's Work (2026-01-29)

- Blog details ads: reduced ad container height and switched ad images to `object-contain` so the full image shows without cropping.
- Blog details ads: added two new rotating ad images (5.jpg, 6.jpg).
- Events & Projects: built the page layout to match the provided design and added routing/navigation entries.
- Events & Projects: added fading background banner rotation (3 images) and a fading 4-image slider for the event box.
- Blogs & Blog details: applied Poppins/Sen font changes across hero, headings, subheadings, buttons, and content typography.
- E-Book page: applied Poppins/Sen/Roboto font rules for hero, headings, subheadings, research cards, and buttons.
- Treatment page: updated hero, highlight text, buttons, and queries section fonts to match requested families.
- Home page: applied Old Standard TT for hero heading, Poppins for headings/buttons, and Sen for subheadings.

## Files touched

- `src/pages/BlogsDetails.jsx`
- `src/pages/Blogs.jsx`
- `src/pages/EventsProjects.jsx`
- `src/pages/EbookPage.jsx`
- `src/pages/TreatmentPage.jsx`
- `src/pages/Home.jsx`
- `src/components/HomePageBanner.jsx`
- `src/components/TreatmentBanner.jsx`
- `src/components/AboutSection.jsx`
- `src/components/TestimonialsSection.jsx`
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `src/App.jsx`
- `src/index.css`
- `tailwind.config.js`

# Today's Work (2026-02-03)

- Blog details: added YouTube embed support via a reusable component + URL utility.
- Blog details: allow `Youtubevideo` placeholder in blog HTML to inject the YouTube iframe.
- Blog details ads: fixed ad container layout and added image fallback on load errors.
- Blog details ads: updated Cloudinary ad image URLs to the `savemedha` account.
- Blog content renderer: added YouTube auto-embed handling for links inside content.

## Files touched

- `src/pages/BlogsDetails.jsx`
- `src/components/BlogYoutubeEmbed.jsx`
- `src/utils/youtube.js`
- `src/components/BlogContentRenderer.jsx`

# Today's Work (2026-01-28)

- Blogs details sidebar: hide the entire Resources card once ads are triggered, and show the rotating ad image block instead in `src/pages/BlogsDetails.jsx`.

## Files touched

- `src/pages/BlogsDetails.jsx`

# Today's Work (2026-01-27)

- Fixed blog details fetch base URL so blog detail loads from the backend.
- Updated share links to use frontend `/blogs/share/:id` URLs and added an app-level redirect for share routes.
- Added a serverless share handler that injects OG/Twitter tags with the blog image and rewired the share rewrite.
- Implemented blog like support using `POST /api/blogs/:id/like` with optimistic UI updates.
- Restored list bullets and numbering styling inside rich blog content.

## Files touched

- `src/pages/BlogsDetails.jsx`
- `src/pages/Blogs.jsx`
- `src/App.jsx`
- `api/blogs/share/[id].js`
- `vercel.json`
- `src/index.css`

# Today's Work (2026-02-05)

- Swapped multiple local images to Cloudinary URLs across About, Home banner, Treatment cards, Careers, Locate Us, Ebook, Blogs, Blog details, Ongoing Events, Navbar/Footer, and Cancer Treatment page assets.
- Removed unused image assets from `src/assets` and verified no unused images remained.
- Added cookie consent system: `CookieBanner`, `CookiePolicyPage`, and styles, wired into `App.jsx` with `/cookie-policy` route.
- Updated cookie banner behavior: accept persists via `localStorage`, reject hides for the current session and reappears after refresh.
- Donate banner: removed arrow buttons and added auto-advance slide interval.
- Footer copyright updated to 2026.

## Files touched

- `src/components/AboutSection.jsx`
- `src/components/HomePageBanner.jsx`
- `src/components/Treatment_Cards.jsx`
- `src/pages/CareersPage.jsx`
- `src/pages/LocateUs.jsx`
- `src/pages/EbookPage.jsx`
- `src/pages/Blogs.jsx`
- `src/pages/BlogsDetails.jsx`
- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `src/pages/OngoingEvents.jsx`
- `src/components/CancerTreatmentPage.jsx`
- `src/pages/Donate.jsx`
- `src/components/CookieBanner.jsx`
- `src/pages/CookiePolicyPage.jsx`
- `src/styles/cookieConsent.css`
- `src/App.jsx`
