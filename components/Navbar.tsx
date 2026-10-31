'use client';

import { useCallback, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { PROJECTS } from '@/lib/data';
import { PillNav } from '@/components/PillNav';
import { LogoMark } from '@/components/LogoMark';

/* `.dark` on <html> is the CREAM theme here (see globals.css), so "dark" in
   the class and in localStorage means cream. The class is the one source of
   truth: app/layout.tsx restores the saved choice before first paint, and
   the toggle below only reads and flips it. */
const THEME_KEY = 'theme';

const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
};
const readIsCream = () => document.documentElement.classList.contains('dark');
const readIsCreamOnServer = () => false;

const ThemeToggle = ({
  isCream,
  onToggle,
}: {
  isCream: boolean;
  onToggle: () => void;
}) => (
  <button
    type='button'
    onClick={onToggle}
    className='fixed bottom-6 right-6 z-[60] inline-flex h-16 w-16 items-center justify-center rounded-full bg-text-primary text-primary shadow-lg transition-all hover:scale-105 hover:bg-accent hover:text-accent-ink'
    // Names the theme it switches to; the old label named the opposite one.
    aria-label={isCream ? 'Switch to dark theme' : 'Switch to light theme'}
  >
    {isCream ? (
      <Moon className='h-7 w-7' fill='currentColor' />
    ) : (
      <Sun className='h-7 w-7' fill='currentColor' />
    )}
  </button>
);

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
      className='inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-transparent shadow-2xl drop-shadow-2xl transition-all duration-200 hover:scale-105 md:h-28 md:w-28'
      aria-label={isHome ? 'Back to top' : 'Jeffrey Ko home'}
    >
      <LogoMark className='h-24 w-24 md:h-28 md:w-28' />
    </Link>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const isCream = useSyncExternalStore(
    subscribeToTheme,
    readIsCream,
    readIsCreamOnServer,
  );
  const isTransitioning = useRef(false);
  const activeSlug = pathname.match(/^\/pj\/([^/]+)/)?.[1] ?? null;
  const activeProject = PROJECTS.find((project) => project.slug === activeSlug);

  /* The class has to flip inside the view transition's callback, so the API
     can snapshot the before and after frames. Flipping it directly is
     synchronous; the toggle's icon follows through the store above. The
     choice is saved, so the next visit opens in the same theme. */
  const toggleTheme = useCallback(() => {
    const commit = () => {
      const next = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', next);
      try {
        window.localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
      } catch {
        // Storage blocked (private mode): the theme still switches.
      }
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof document.startViewTransition !== 'function') {
      commit();
      return;
    }

    // A second toggle mid-flight aborts the first, whose promises then reject.
    // Skip the animation while one is running and just commit the change.
    if (isTransitioning.current) {
      commit();
      return;
    }

    isTransitioning.current = true;
    const transition = document.startViewTransition(commit);
    // All three promises reject independently when a transition is skipped or
    // aborted. Any one left unhandled surfaces as an uncaught
    // InvalidStateError, so each needs its own catch.
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    transition.finished
      .catch(() => {})
      .finally(() => {
        isTransitioning.current = false;
      });
  }, []);

  /* The nav is fixed and lives outside ProjectView, so without this it kept
     the site palette while `.project-surface` painted the project colour
     behind it — a gold pill and charcoal shell floating on a navy page.
     Carrying data-project here re-points the same tokens the rest of the
     page already uses. No attribute off a project route, so the home page
     falls back to the site palette untouched. */
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
      <ThemeToggle isCream={isCream} onToggle={toggleTheme} />
    </div>
  );
};
