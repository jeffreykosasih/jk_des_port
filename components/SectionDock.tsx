'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Mail, User } from 'lucide-react';
import { LogoMark } from '@/components/LogoMark';

/* Each button wears its section's own colour, so it says where it leads.
   Hovered or focused, it lifts and turns black with a coloured icon. */
const LINKS = [
  { label: 'Work', href: '#work', icon: Briefcase, tone: '#ffb81f' },
  { label: 'About', href: '#about', icon: User, tone: '#ff5a3d' },
  { label: 'Connect', href: '#contact', icon: Mail, tone: '#8a6bff' },
];

/**
 * True once the visitor has scrolled past most of the hero. The dock and the
 * corner logo share it, so the logo leaves the corner at the same moment it
 * joins the dock, and is back in the corner near the top of the page.
 */
export const usePastHero = (enabled = true) => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const update = () => setPast(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [enabled]);

  return enabled && past;
};

/** Back to the top, and drop any #section fragment from the address. */
export const scrollToTop = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname);
  }
};

const buttonClass =
  'flex h-12 w-12 items-center justify-center transition duration-200 hover:-translate-y-1 focus-visible:-translate-y-1';

/**
 * A small dock in the bottom-right corner of the home page: the logo (back to
 * the top) and the three sections. It stays hidden while the hero, which has
 * its own links and the logo in the corner, is on screen.
 */
export const SectionDock = () => {
  const visible = usePastHero();

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label='Jump to section'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className='fixed bottom-6 right-6 z-[60] flex gap-1.5'
        >
          <a
            href='#home'
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
            aria-label='Back to top'
            title='Back to top'
            className={`${buttonClass} overflow-hidden shadow-lg`}
          >
            <LogoMark className='h-12 w-12' />
          </a>
          {LINKS.map(({ label, href, icon: Icon, tone }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              style={{ '--tone': tone } as React.CSSProperties}
              className={`${buttonClass} bg-[var(--tone)] text-black hover:bg-black hover:text-[var(--tone)] focus-visible:bg-black focus-visible:text-[var(--tone)]`}
            >
              <Icon className='h-6 w-6' strokeWidth={2} aria-hidden='true' />
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
