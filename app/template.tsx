'use client';

import { usePathname } from 'next/navigation';

/**
 * A template remounts on every navigation, so keying this wrapper on the path
 * restarts the fade for each route — first load, entering a case study, and
 * moving between case studies all get the same entrance.
 *
 * Opacity only, no transform. A transformed ancestor becomes the containing
 * block for its fixed-position descendants, and ProjectView's
 * `.project-surface` is fixed — translating this wrapper would re-anchor the
 * project background to the wrapper's full height mid-fade, then snap it back.
 * Opacity creates a stacking context but leaves fixed positioning alone, so
 * the surface stays pinned to the viewport throughout.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className='page-enter'>
      {children}
    </div>
  );
}
