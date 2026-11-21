'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROJECTS } from '@/lib/data';
import { ProjectPager } from '@/components/ProjectPager';
import { LogoMark } from '@/components/LogoMark';
import { scrollToTop, usePastHero } from '@/components/SectionDock';

const LogoButton = ({ isHome }: { isHome: boolean }) => {
  // Already home: this is a "back to the top" control, not a navigation, so
  // scroll rather than re-running the route fade on the page you are on.
  // Anywhere else it stays a real link and the template handles the fade.
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    event.preventDefault();
    scrollToTop();
  };

  return (
    <Link
      href='/'
      onClick={handleClick}
      className='inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-control bg-transparent shadow-2xl drop-shadow-2xl transition-all duration-200 hover:scale-105 md:h-28 md:w-28'
      aria-label={isHome ? 'Back to top' : 'Jeffrey Ko home'}
    >
      <LogoMark className='h-14 w-14 md:h-28 md:w-28' />
    </Link>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const activeSlug = pathname.match(/^\/pj\/([^/]+)/)?.[1] ?? null;
  const activeProject = PROJECTS.find((project) => project.slug === activeSlug);
  const isHome = pathname === '/';
  // On the home page the logo moves into the bottom-right dock once the
  // visitor scrolls past the hero, and comes back here near the top.
  const logoInDock = usePastHero(isHome);

  /* The nav is fixed and lives outside ProjectView, so it carries
     data-project itself: that gives the project pager the project's colour.
     No attribute off a project route, so the home page keeps the site
     palette. */
  return (
    <div data-project={activeProject?.slug}>
      {/* One fixed row: the project pager sits beside the logo, centred on it. */}
      <div className='fixed top-4 left-4 z-[60] md:top-6 md:left-6 flex items-center gap-3'>
        <div
          aria-hidden={logoInDock || undefined}
          inert={logoInDock || undefined}
          className={`transition-[opacity,transform] duration-300 ease-out ${
            logoInDock ? 'pointer-events-none -translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <LogoButton isHome={isHome} />
        </div>
        {activeProject ? (
          <ProjectPager activeSlug={activeProject.slug} />
        ) : null}
      </div>
    </div>
  );
};
