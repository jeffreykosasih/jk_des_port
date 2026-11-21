import type { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';

const SITE = 'https://www.jeffreyko.com';

/** Served at /sitemap.xml so search engines find every case study. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: 'monthly', priority: 1 },
    ...PROJECTS.map((project) => ({
      url: `${SITE}/pj/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
