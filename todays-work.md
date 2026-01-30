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
