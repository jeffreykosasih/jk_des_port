'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, LayoutGrid, X } from 'lucide-react';
import { PROJECTS } from '@/lib/data';

const buttonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-control text-text-muted transition-colors duration-200 hover:bg-accent hover:text-accent-ink md:h-10 md:w-10';

/**
 * Sits beside the logo on a project page: previous project, every project,
 * next project. The middle button opens the full list in place, animated in
 * row by row, and the list goes away again as soon as it has done its job:
 * a project is picked, the visitor clicks elsewhere, or presses Escape.
 */
export const ProjectPager = ({ activeSlug }: { activeSlug: string }) => {
  const index = PROJECTS.findIndex((project) => project.slug === activeSlug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const reduced = useReducedMotion();

  // Moving to another project closes the list.
  const [shownFor, setShownFor] = useState(activeSlug);
  if (shownFor !== activeSlug) {
    setShownFor(activeSlug);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const rise = reduced ? 0 : -10;

  return (
    <nav aria-label='Projects' ref={rootRef} className='relative'>
      <div className='flex items-center gap-1.5 rounded-control bg-primary/90 p-2 shadow-lg backdrop-blur-xl'>
        <Link
          href={`/pj/${prev.slug}`}
          title={`Previous: ${prev.title}`}
          aria-label={`Previous project: ${prev.title}`}
          className={buttonClass}
        >
          <ArrowLeft className='h-5 w-5' aria-hidden='true' />
        </Link>
        <button
          ref={toggleRef}
          type='button'
          onClick={() => setOpen((value) => !value)}
          title={open ? 'Close project list' : 'All projects'}
          aria-label={open ? 'Close project list' : 'All projects'}
          aria-expanded={open}
          aria-controls={listId}
          className={`${buttonClass} ${open ? 'bg-accent text-accent-ink' : ''}`}
        >
          {open ? (
            <X className='h-5 w-5' aria-hidden='true' />
          ) : (
            <LayoutGrid className='h-5 w-5' aria-hidden='true' />
          )}
        </button>
        <Link
          href={`/pj/${next.slug}`}
          title={`Next: ${next.title}`}
          aria-label={`Next project: ${next.title}`}
          className={buttonClass}
        >
          <ArrowRight className='h-5 w-5' aria-hidden='true' />
        </Link>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={listId}
            key='project-list'
            initial={{ opacity: 0, y: rise, clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' }}
            exit={{ opacity: 0, y: rise, clipPath: reduced ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
            transition={{ duration: reduced ? 0.12 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className='absolute left-0 top-full mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-control bg-primary/95 p-2 shadow-2xl backdrop-blur-xl'
          >
            <ol className='flex flex-col'>
              {PROJECTS.map((project, i) => {
                const current = project.slug === activeSlug;
                return (
                  <motion.li
                    key={project.slug}
                    data-project={project.slug}
                    initial={{ opacity: 0, x: reduced ? 0 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : 0.06 + i * 0.03, duration: 0.24, ease: 'easeOut' }}
                  >
                    <Link
                      href={`/pj/${project.slug}`}
                      onClick={() => setOpen(false)}
                      aria-current={current ? 'page' : undefined}
                      className={`group flex items-center gap-3 rounded-control px-3 py-2.5 transition-colors duration-200 hover:bg-text-primary/10 ${current ? 'bg-text-primary/10' : ''}`}
                    >
                      <span
                        aria-hidden='true'
                        className='h-2.5 w-2.5 shrink-0 bg-[var(--pj-dark)] transition-transform duration-200 group-hover:scale-125'
                      />
                      <span className='min-w-0 flex-1'>
                        <span className='block truncate font-bold text-text-primary group-hover:text-[var(--pj-dark)]'>
                          {project.title}
                        </span>
                        <span className='block truncate text-sm text-text-muted'>{project.kind}</span>
                      </span>
                      {current ? (
                        <span className='shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--pj-dark)]'>
                          Here
                        </span>
                      ) : null}
                    </Link>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};
