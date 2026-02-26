/**
 * Schema — JSON-LD structured data component.
 *
 * Usage:
 *   <Schema type="organization" />          ← all pages (default)
 *   <Schema type="website" />               ← home page
 *   <Schema type="article" article={...} /> ← blog detail pages
 */
import siteConfig from "../config/site.config";

const BASE_ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MedicalOrganization"],
  name: siteConfig.name,
  url: siteConfig.url,
  logo: siteConfig.organization.logo,
  description: siteConfig.description,
  telephone: siteConfig.author.phone,
  email: siteConfig.author.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.youtube,
  ],
  medicalSpecialty: "Oncology",
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/blogs?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function Schema({ type = "organization", article }) {
  let schema;

  switch (type) {
    case "website":
      schema = WEBSITE_SCHEMA;
      break;
    case "article":
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article?.title || "",
        description: article?.description || article?.title || "",
        image:
          article?.image ||
          "https://savemedha.com/assets/background-D-oyg95a.jpg",
        author: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: siteConfig.organization.logo,
          },
        },
        datePublished: article?.datePublished || "",
        dateModified: article?.dateModified || article?.datePublished || "",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": article?.url || siteConfig.url,
        },
      };
      break;
    default:
      schema = BASE_ORGANIZATION;
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
