/**
 * Seo — React 19 native document-metadata component.
 *
 * React 19 automatically hoists <title>, <meta>, and <link> tags into <head>.
 * No library needed.
 *
 * Usage:
 *   <Seo title="Page Title" description="..." path="/about-us" />
 */
import siteConfig from "../config/site.config";

const OG_IMAGE_DEFAULT = "https://savemedha.com/assets/background-D-oyg95a.jpg";
const KEYWORDS_DEFAULT = siteConfig.keywords.join(", ");

export function Seo({ title, description, path = "", image, type = "website", keywords }) {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Natural Immunotherapy Cancer Treatment Kolkata`;
  const pageDesc = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;
  const pageImage = image || OG_IMAGE_DEFAULT;
  const pageKeywords = keywords || KEYWORDS_DEFAULT;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteConfig.author.name} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
    </>
  );
}
