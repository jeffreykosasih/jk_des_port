'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS, SECONDARY_PROJECTS } from '@/lib/data';

export const WorkGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAlsoBuilt, setShowAlsoBuilt] = useState(false);
  const activeProject = FEATURED_PROJECTS[activeIndex] ?? FEATURED_PROJECTS[0];
  const activeImage = activeProject.workImage;

  return (
    <section id='work' className='py-20 md:py-28'>
      <h2 className='px-6 pb-10 pt-10 text-center text-[clamp(3rem,7vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-text-primary md:pb-20 md:pt-16'>
        Work
      </h2>

      <div className='mx-auto grid max-w-[1400px] gap-10 px-6 sm:px-8 md:grid-cols-2 md:items-start md:gap-16 md:px-16'>
        <ul className='flex flex-col'>
          {FEATURED_PROJECTS.map((project, index) => {
            const isActive = index === activeIndex;
            const image = project.workImage;

            return (
              <li
                key={project.slug}
                onMouseEnter={() => setActiveIndex(index)}
                className='group border-b border-highlight first:border-t'
              >
                <div className='flex items-center gap-4 py-5 md:py-6'>
                  <Link
                    href={`/pj/${project.slug}`}
                    onFocus={() => setActiveIndex(index)}
                    aria-label={`${project.title} project`}
                    className='flex flex-1 items-baseline gap-4 md:gap-6'
                  >
                    <span
                      className={`text-lg font-bold uppercase tracking-tight ${
                        isActive ? 'text-accent' : 'text-text-muted'
                      }`}
                    >
                      {project.id}
                    </span>
                    <h3
                      className={`text-xl font-bold uppercase tracking-tight ${
                        isActive ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      {project.title}
                    </h3>
                  </Link>

                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      title='Visit live site'
                      aria-label={`${project.title} — visit live site`}
                      className={`shrink-0 hover:text-accent ${
                        isActive ? 'text-accent' : 'text-text-muted'
                      }`}
                    >
                      <ArrowUpRight className='h-6 w-6 md:h-7 md:w-7' />
                    </a>
                  ) : null}
                </div>

                <Link
                  href={`/pj/${project.slug}`}
                  aria-hidden='true'
                  tabIndex={-1}
                  className='mt-4 block md:hidden'
                >
                  <div className='relative aspect-video w-full overflow-hidden rounded-xl border border-highlight bg-black/10 shadow-xl'>
                    {image ? (
                      <Image
                        src={image}
                        alt={`${project.title} preview`}
                        fill
                        sizes='100vw'
                        className='object-cover'
                      />
                    ) : null}
                  </div>
                </Link>
                <p className='mb-6 mt-4 max-w-[70ch] text-base leading-[1.6] text-text-primary md:hidden'>
                  {project.blurb}
                </p>
              </li>
            );
          })}

          {/* Ellipsis disclosure — the smaller builds stay folded away until
              asked for, so the four case studies keep the section's weight. */}
          <li className='border-b border-highlight'>
            <button
              type='button'
              onClick={() => setShowAlsoBuilt((open) => !open)}
              aria-expanded={showAlsoBuilt}
              aria-controls='also-built'
              className='flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-6'
            >
              <span className='text-base font-bold leading-none text-text-muted'>
                {showAlsoBuilt ? '\u2013' : '\u22ef'}
              </span>
              <span className='text-sm font-bold uppercase tracking-[0.2em] text-text-muted transition-colors hover:text-text-primary'>
                {showAlsoBuilt ? 'Less' : 'More'}
              </span>
            </button>
          </li>
        </ul>

        <div className='hidden md:sticky md:top-32 md:block'>
          <Link
            href={`/pj/${activeProject.slug}`}
            aria-label={`${activeProject.title} project`}
            className='block'
          >
            <div className='relative aspect-video w-full overflow-hidden rounded-2xl border border-highlight bg-black/10 shadow-2xl'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className='absolute inset-0'
                >
                  {activeImage ? (
                    <Image
                      src={activeImage}
                      alt={`${activeProject.title} preview`}
                      fill
                      sizes='(min-width: 768px) 45vw, 100vw'
                      className='object-cover'
                      priority
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </Link>
          <AnimatePresence mode='wait'>
            <motion.p
              key={activeProject.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='mt-8 max-w-[70ch] text-lg leading-[1.6] text-text-primary'
            >
              {activeProject.blurb}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showAlsoBuilt && (
          <motion.div
            id='also-built'
            key='also-built'
            initial={{ opacity: 0, y: 24, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 24, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className='overflow-hidden'
          >
            <div className='mx-auto mt-16 max-w-[70ch] px-6 sm:px-8 md:px-16'>
              <h3 className='text-lg font-bold uppercase tracking-tight text-text-primary'>
                Also built
              </h3>
              <ul className='mt-6 space-y-4'>
                {SECONDARY_PROJECTS.map((project, index) => (
                  <motion.li
                    key={project.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Staggered so the list resolves upward rather than
                    // arriving as one block.
                    transition={{
                      duration: 0.4,
                      delay: 0.12 + index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className='text-base leading-[1.6] text-text-primary'
                  >
                    <Link
                      href={`/pj/${project.slug}`}
                      className='font-bold text-accent underline-offset-4 hover:underline'
                    >
                      {project.title}
                    </Link>
                    <span className='text-text-muted'> — {project.blurb}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
