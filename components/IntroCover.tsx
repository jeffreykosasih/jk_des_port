'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * The signal-blue curtain the home page opens behind. The motion itself is
 * CSS (globals.css); this only decides whether the curtain is in the page.
 *
 * It lives in the root layout rather than in the page for two reasons. The
 * page sits inside app/template.tsx, whose fade makes a stacking context the
 * curtain could not rise out of to cover the fixed nav. And a layout mounts
 * once per visit, so the curtain plays on arrival and not again every time
 * the visitor comes back from a project.
 */
export const IntroCover = () => {
  const pathname = usePathname();
  const coverRef = useRef<HTMLDivElement>(null);
  // Decided once, by the page the visit lands on.
  const [playing, setPlaying] = useState(pathname === '/');

  /* The hero times itself off the curtain being in the page (see .intro in
     globals.css), so the curtain has to outstay the whole sequence: taking it
     out early would cut the wait from under letters still on their way up.
     Waiting on the animations themselves, rather than on a timer set to
     match them, keeps the two from drifting apart. */
  useEffect(() => {
    if (!playing) return;

    const pieces = [coverRef.current, document.querySelector('.intro')];
    const running = pieces.flatMap(
      (piece) => piece?.getAnimations({ subtree: true }) ?? [],
    );

    let stale = false;
    // allSettled: an animation cut short by leaving the page rejects, and
    // that is as much "over" as one that finished.
    Promise.allSettled(running.map((animation) => animation.finished)).then(
      () => {
        if (!stale) setPlaying(false);
      },
    );
    return () => {
      stale = true;
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <div ref={coverRef} className='intro-cover' aria-hidden='true'>
      <span className='intro-cover__band intro-cover__band--top' />
      <span className='intro-cover__band intro-cover__band--bottom' />
    </div>
  );
};
