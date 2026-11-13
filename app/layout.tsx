import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  Anton,
  Archivo,
  Baloo_2,
  Barlow_Condensed,
  Bodoni_Moda,
  Bricolage_Grotesque,
  Fraunces,
  JetBrains_Mono,
  Outfit,
  Shippori_Mincho,
} from 'next/font/google';
import './globals.css';
import { IntroCover } from '@/components/IntroCover';
import { Navbar } from '@/components/Navbar';

/**
 * The site's two voices (see "Two voices" in globals.css).
 *
 * Bricolage Grotesque is the site face. It is loaded as a variable font with
 * its width axis, so the same file sets body text at normal width and the
 * display type narrow and heavy. Bodoni Moda, italic only, is the aside voice.
 * Both carry their optical-size axis, so small and large settings each get
 * the cut drawn for them.
 */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
});

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  style: 'italic',
  axes: ['opsz'],
});

/**
 * Display faces that give each project page its own voice.
 *
 * Each loader has to be its own module-scope const — next/font resolves these
 * at build time by static analysis, so it cannot see calls made inside an
 * array literal, an object, or a function.
 *
 * `preload: false` on purpose: only one of these is ever used per route, so
 * preloading all four would add four font preloads to every page, including
 * the home page, which uses none of them. They load on demand when a project
 * page's --project-font resolves to one.
 */
const barlowCondensed = Barlow_Condensed({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['600', '700'],
  preload: false,
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  preload: false,
});

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['700', '800'],
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: false,
});

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
  preload: false,
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['600', '700', '900'],
  preload: false,
});

const shipporiMincho = Shippori_Mincho({
  variable: '--font-mincho',
  subsets: ['latin'],
  weight: ['700', '800'],
  preload: false,
});

const baloo2 = Baloo_2({
  variable: '--font-baloo',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  preload: false,
});

const projectFontVariables = [
  barlowCondensed,
  outfit,
  archivo,
  jetbrainsMono,
  anton,
  fraunces,
  shipporiMincho,
  baloo2,
]
  .map((font) => font.variable)
  .join(' ');

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jeffreyko.com'),
  title: {
    default: 'Jeffrey Ko — UX/UI Designer',
    template: '%s — Jeffrey Ko',
  },
  description:
    'UX/UI designer in Melbourne. I design products that are easy to use and I sit with engineering without a translator.',
  openGraph: {
    title: 'Jeffrey Ko — UX/UI Designer',
    description:
      'UX/UI designer in Melbourne. I design products that are easy to use and I sit with engineering without a translator.',
    url: 'https://www.jeffreyko.com',
    siteName: 'Jeffrey Ko',
    type: 'website',
    // 1200×630, the size LinkedIn and Slack crop to. The tall portrait it
    // replaces came out as a cropped strip of trees.
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jeffrey Ko, UX/UI designer in Melbourne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeffrey Ko — UX/UI Designer',
    description:
      'UX/UI designer in Melbourne. I design products that are easy to use and I sit with engineering without a translator.',
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: '/' },
  icons: {
    icon: [
      {
        url: '/favicon.ico?v=6',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        url: '/icon.png?v=6',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
    shortcut: '/favicon.ico?v=6',
    apple: '/icon.png?v=6',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body
        className={`${bricolage.variable} ${bodoni.variable} ${projectFontVariables} antialiased text-text-primary font-normal`}
      >
        <IntroCover />
        <Navbar />
        <main>{children}</main>
        <footer className='type-aside px-6 py-8 text-center text-base text-text-muted'>
          Designed and coded by Jeffrey Ko
        </footer>
      </body>
    </html>
  );
}
