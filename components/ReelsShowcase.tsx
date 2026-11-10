'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The reels in the row, left to right — newest first.
 *
 * `code` is the part of a reel's link after /reel/:
 * instagram.com/reel/DbuI2ncT7c7/ → 'DbuI2ncT7c7'. `title` is what a screen
 * reader announces for that reel. Four fill the row on a laptop; a fifth makes
 * the row scroll sideways rather than squeezing the others.
 */
const REELS = [
  { code: 'DbuI2ncT7c7', title: 'In The Summer' },
  { code: 'DaSElNiTMlB', title: 'Take a Pic' },
  { code: 'DZwPhBmzQJa', title: 'Cuddle Puddle' },
  { code: 'DY_MfB6zLtd', title: 'Silly Room' },
];

const ReelEmbed = ({ code, title }: (typeof REELS)[number]) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  /* Once it has drawn, the embed posts its real height to the page — the same
     message Instagram's embed.js sizes its iframes from. It only takes over
     when it disagrees with the shape reserved below, which would mean
     Instagram changed its layout or this reel is not the usual shape. */
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      if (event.origin !== 'https://www.instagram.com') return;
      if (typeof event.data !== 'string') return;

      try {
        const message: { type?: string; details?: { height?: unknown } } =
          JSON.parse(event.data);
        const measured = message?.details?.height;
        if (message?.type !== 'MEASURE' || typeof measured !== 'number') return;
        if (measured > 0 && Math.abs(measured - frame.offsetHeight) > 1) {
          setHeight(measured);
        }
      } catch {
        // Not one of the embed's JSON messages.
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <li className='min-w-70 max-w-80 flex-1 snap-start first:ml-auto last:mr-auto'>
      {/* Reserve the shape the embed is known to take at any width: a 4:5 video
          frame plus 208px of Instagram's own header and footer. The row then
          holds its height while the embeds load, instead of jumping. */}
      <div
        className='relative overflow-hidden rounded-2xl bg-text-primary/10 shadow-xl'
        style={height ? { height } : { paddingBottom: 'calc(125% + 208px)' }}
      >
        <iframe
          ref={frameRef}
          className='absolute inset-0 h-full w-full'
          src={`https://www.instagram.com/reel/${code}/embed`}
          title={`${title} — live loop by Jefri`}
          // The row is near the bottom of the page and each embed is heavy;
          // don't make every visitor download four of them up front.
          loading='lazy'
          scrolling='no'
          allowFullScreen
        />
      </div>
    </li>
  );
};

export const ReelsShowcase = () => {
  return (
    <section className='px-6 pb-10 pt-20'>
      <div className='mb-10 px-6 text-center'>
        <p className='text-sm font-bold uppercase tracking-[0.35em] text-text-muted'>
          Beyond design
        </p>
        <p className='mx-auto mt-3 max-w-[70ch] text-lg leading-[1.6] text-text-primary'>
          Live looping music I make on the spot.
        </p>
      </div>

      <div className='mx-auto max-w-7xl'>
        {/* One row at every width. The cards share it down to 280px each, the
            narrowest Instagram's header stays tidy; below that the row scrolls
            sideways inside itself, so the page never does. -mx-6/px-6 lets it
            scroll out to the screen edge, and pb-10 leaves room for the card
            shadows, which a scroll container would otherwise clip. */}
        <ul className='-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-10 [scrollbar-color:var(--site-highlight)_transparent] [scrollbar-width:thin]'>
          {REELS.map((reel) => (
            <ReelEmbed key={reel.code} {...reel} />
          ))}
        </ul>
      </div>
    </section>
  );
};
