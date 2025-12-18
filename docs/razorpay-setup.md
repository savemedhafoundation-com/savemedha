# Razorpay setup

This project uses Razorpay Checkout on the client and Vercel Serverless Functions to create/verify orders securely.

## 1) Environment variables

Create a `save/.env` (or set these in Vercel Project Settings → Environment Variables):

- `VITE_RAZORPAY_KEY_ID` (publishable key id; used in the browser)
- `RAZORPAY_KEY_ID` (server-side)
- `RAZORPAY_KEY_SECRET` (server-side, secret)

See `save/.env.example` for the exact names.

## 2) Endpoints

- `POST /api/razorpay/create-order` → creates an order using your secret key
- `POST /api/razorpay/verify` → verifies the signature after payment success

## 3) Local development

The `/api/*` endpoints are Vercel Functions. For local testing, `npm run dev` also serves these endpoints via Vite middleware (using the same handlers in `save/api/razorpay/*`).

## Notes

- Never put `RAZORPAY_KEY_SECRET` in the frontend (`VITE_*`) variables.
