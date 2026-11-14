'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Mail, User } from 'lucide-react';

/* Each button wears its section's own colour, so it says where it leads.
   Hovered or focused, it lifts and turns black with a coloured icon. */
const LINKS = [
  { label: 'Work', href: '#work', icon: Briefcase, tone: '#ffb81f' },
  { label: 'About', href: '#about', icon: User, tone: '#ff5a3d' },
  { label: 'Connect', href: '#contact', icon: Mail, tone: '#8a6bff' },
];

/**
 * A small dock of section links in the bottom-right corner of the home page.
 * It stays hidden while the hero (which has its own links) is on screen, then
 * shows as three small squares in the sections' colours once the visitor
 * scrolls past it.
 */
export const SectionDock = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

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
          {LINKS.map(({ label, href, icon: Icon, tone }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              style={{ '--tone': tone } as React.CSSProperties}
              className='flex h-12 w-12 items-center justify-center bg-[var(--tone)] text-black transition duration-200 hover:-translate-y-1 hover:bg-black hover:text-[var(--tone)] focus-visible:-translate-y-1 focus-visible:bg-black focus-visible:text-[var(--tone)]'
            >
              <Icon className='h-6 w-6' strokeWidth={2} aria-hidden='true' />
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
