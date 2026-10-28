import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    // Old numbering as published on jeffreyko.com. Every one of these was
    // indexed, so each keeps a permanent redirect to its named slug rather
    // than dropping the visitor on the home page.
    const remaps: Record<string, string> = {
      '01': '/pj/revo-fitness',
      '02': '/pj/idriver',
      '03': '/pj/port-jeffrey',
      '04': '/pj/katsu-seiba',
      '05': '/pj/rooted',
      '06': '/pj/fruitea',
      '07': '/pj/peter-parking',
      '08': '/pj/sigma',
    };

    return Object.entries(remaps).flatMap(([id, destination]) => [
      { source: `/pj${id}`, destination, permanent: true },
      { source: `/cs${id}`, destination, permanent: true },
    ]);
  },
};

export default nextConfig;
