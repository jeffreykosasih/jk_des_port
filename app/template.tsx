'use client';

import { usePathname } from 'next/navigation';

/**
 * A template remounts on every navigation, so keying this wrapper on the path
 * restarts the fade for each route — first load, entering a case study, and
 * moving between case studies all get the same entrance.
 *
 * Opacity only, no transform. A transformed ancestor becomes the containing
 * block for its fixed-position descendants, so translating this wrapper would
 * move the project page's fixed back-to-top button mid-fade. Opacity leaves
 * fixed positioning alone.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className='page-enter'>
      {children}
    </div>
  );
}
