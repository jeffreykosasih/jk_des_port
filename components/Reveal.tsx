'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Plays a section's entrance the first time it scrolls into view. The motion
 * is CSS (see "Scroll reveals" in globals.css); this only says when.
 *
 * It marks the wrapper `data-reveal='armed'`, which holds the pieces in their
 * starting pose, then `data-reveal='in'` once the section is on screen, which
 * lets them go. The attribute is set straight on the element rather than
 * through state: nothing else on the page needs to know, and it keeps the
 * server-rendered markup free of anything hidden.
 */
export const Reveal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    // Already on screen or above it (a reload part-way down the page, a link
    // to a later section): leave it be rather than hide it and replay it
    // under the reader's eyes.
    if (section.getBoundingClientRect().top < window.innerHeight) return;

    section.dataset.reveal = 'armed';

    // Wait until the section is properly into the viewport, not just a
    // sliver at the bottom edge.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.reveal = 'in';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
