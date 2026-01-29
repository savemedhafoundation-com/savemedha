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
