/**
 * ping-google.mjs
 *
 * Notifies Google that the sitemap has been updated.
 * Run after deploying: node scripts/ping-google.mjs
 */

const SITEMAP_URL = "https://savemedha.com/sitemap.xml";
const PING_URL = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

async function ping() {
  console.log(`Pinging Google with sitemap: ${SITEMAP_URL}`);
  try {
    const res = await fetch(PING_URL);
    if (res.ok) {
      console.log(`Done — HTTP ${res.status}`);
    } else {
      console.error(`Ping failed — HTTP ${res.status}`);
      process.exit(1);
    }
  } catch (err) {
    console.error("Ping error:", err.message);
    process.exit(1);
  }
}

ping();
