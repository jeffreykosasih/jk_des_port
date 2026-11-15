import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bricolage_Grotesque, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { IntroCover } from '@/components/IntroCover';
import { Navbar } from '@/components/Navbar';

/**
 * The site's two voices (see "Two voices" in globals.css).
 *
 * Bricolage Grotesque is the site face. It is loaded as a variable font with
 * its width axis, so the same file sets body text at normal width and the
 * display type narrow and heavy, with its optical-size axis so small and large
 * settings each get the cut drawn for them. Instrument Serif, a narrow serif,
 * is the aside voice.
 */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  axes: ['opsz', 'wdth'],
});

const serif = Instrument_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: '400',
});

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
        url: '/og-image.jpg?v=2',
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
    images: ['/og-image.jpg?v=2'],
  },
  alternates: { canonical: '/' },
  // Icons come from app/favicon.ico, app/icon.png and app/apple-icon.png.
  // Next links them with a hash of each file's contents, so a new icon
  // reaches browsers that cached the old one without a manual ?v= bump.
};

// Only on a reload: drop any #section, go to the top, and for a moment after
// the page loads undo the browser's own scroll restore, until the visitor
// scrolls themselves. scrollRestoration is left alone, so Back still returns
// people to where they were.
const RELOAD_TO_TOP = `(function(){try{var n=performance.getEntriesByType('navigation')[0];if(!n||n.type!=='reload')return;if(location.hash)history.replaceState(null,'',location.pathname+location.search);var done=false,top=function(){if(!done&&window.scrollY!==0)window.scrollTo({top:0,left:0,behavior:'instant'})},stop=function(){done=true;removeEventListener('scroll',top)};['wheel','touchstart','keydown','pointerdown'].forEach(function(t){addEventListener(t,stop,{once:true,passive:true})});addEventListener('scroll',top,{passive:true});top();addEventListener('load',function(){top();setTimeout(stop,1500)})}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <head>
        {/* A refresh starts at the top, so the intro and the scroll reveals
            play again instead of the browser dropping the visitor back
            mid-page. Only reloads: a shared link to /#work still lands on
            Work. Runs before first paint so there is no jump. */}
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
      </head>
      <body
        className={`${bricolage.variable} ${serif.variable} antialiased text-text-primary font-normal`}
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
