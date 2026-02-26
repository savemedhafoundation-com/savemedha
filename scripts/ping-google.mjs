/**
 * ping-google.mjs
 *
 * Google deprecated the /ping endpoint in January 2024.
 * Sitemaps must now be submitted manually through Google Search Console:
 *
 *   https://search.google.com/search-console/sitemaps
 *
 * This script validates the sitemap is publicly reachable instead.
 * Run after deploying: node scripts/ping-google.mjs
 */

const SITEMAP_URL = "https://savemedha.com/sitemap.xml";

async function checkSitemap() {
  console.log(`Checking sitemap is reachable: ${SITEMAP_URL}`);
  try {
    const res = await fetch(SITEMAP_URL);
    if (res.ok) {
      const text = await res.text();
      const urlCount = (text.match(/<loc>/g) || []).length;
      console.log(`Sitemap OK — HTTP ${res.status} — ${urlCount} URLs found`);
      console.log(
        "\nNext step: Submit your sitemap in Google Search Console:\n" +
        "  https://search.google.com/search-console/sitemaps\n" +
        `  Sitemap URL: ${SITEMAP_URL}`
      );
    } else {
      console.error(`Sitemap not reachable — HTTP ${res.status}`);
      process.exit(1);
    }
  } catch (err) {
    console.error("Error reaching sitemap:", err.message);
    process.exit(1);
  }
}

checkSitemap();
