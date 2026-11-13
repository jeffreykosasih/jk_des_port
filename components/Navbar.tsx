'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROJECTS } from '@/lib/data';
import { PillNav } from '@/components/PillNav';
import { LogoMark } from '@/components/LogoMark';

const LogoButton = ({ isHome }: { isHome: boolean }) => {
  // Already home: this is a "back to the top" control, not a navigation, so
  // scroll rather than re-running the route fade on the page you are on.
  // Anywhere else it stays a real link and the template handles the fade.
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    // Drop the #work / #about / #contact fragment so the URL matches where
    // the visitor now is, without adding a history entry.
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <Link
      href='/'
      onClick={handleClick}
      className='inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-control bg-transparent shadow-2xl drop-shadow-2xl transition-all duration-200 hover:scale-105 md:h-28 md:w-28'
      aria-label={isHome ? 'Back to top' : 'Jeffrey Ko home'}
    >
      <LogoMark className='h-24 w-24 md:h-28 md:w-28' />
    </Link>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const activeSlug = pathname.match(/^\/pj\/([^/]+)/)?.[1] ?? null;
  const activeProject = PROJECTS.find((project) => project.slug === activeSlug);

  /* The nav is fixed and lives outside ProjectView, so without this it kept
     the site palette while `.project-surface` painted the project colour
     behind it. Carrying data-project here re-points the same tokens the rest
     of the page already uses. No attribute off a project route, so the home
     page falls back to the site palette untouched. */
  return (
    <div data-project={activeProject?.slug}>
      {/* One fixed row: the project pager sits beside the logo, centred on it. */}
      <div className='fixed top-6 left-6 z-[60] flex items-center gap-3'>
        <LogoButton isHome={pathname === '/'} />
        {activeProject ? (
          <PillNav
            aria-label='Jump to project'
            orientation='grid'
            activeId={activeProject.slug}
            items={PROJECTS.map((project) => ({
              id: project.slug,
              label: project.id,
              title: project.title,
              href: `/pj/${project.slug}`,
            }))}
          />
        ) : null}
      </div>
    </div>
  );
};
