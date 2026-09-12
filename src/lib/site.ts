// Central site configuration used across metadata, sitemap, and structured data.
// Update SITE_URL when the site moves to its final domain (e.g. https://handpanweddings.com).

export const SITE_URL = "https://craig-handpan-weddings.lovable.app";
export const BRAND_NAME = "Handpan Weddings";
export const BRAND_TAGLINE = "Live handpan music for soulful weddings";
export const COVERAGE_AREAS = "London, Surrey, Sussex, Kent, Essex";
export const CONTACT_EMAIL = "craig@handpanweddings.com";
export const INSTAGRAM_URL = "https://instagram.com/handpanweddings";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Build an absolute URL for a path on this site. */
export function url(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
