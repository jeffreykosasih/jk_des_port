import type { MetadataRoute } from 'next';

/** Served at /robots.txt: everything is public, and the sitemap is listed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.jeffreyko.com/sitemap.xml',
  };
}
