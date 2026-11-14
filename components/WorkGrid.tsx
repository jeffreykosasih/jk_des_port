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

  return (
    <section id='work' className='tone-marigold py-20 md:py-28'>
      <h2 className='type-display px-6 pb-10 pt-10 text-center text-[clamp(4rem,10vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.02em] text-essence md:pb-20 md:pt-16'>
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
                    <div className='flex min-w-0 flex-col gap-1'>
                      <h3
                        className={`type-display text-[2.5rem] uppercase leading-none tracking-[-0.01em] ${
                          isActive ? 'text-text-primary' : 'text-text-muted'
                        }`}
                      >
                        {project.title}
                      </h3>
                      {/* Concept or real build, readable before anyone clicks. */}
                      <p className='type-aside text-lg leading-tight text-text-muted'>
                        {project.kind}
                      </p>
                    </div>
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
                  <div className='relative aspect-video w-full overflow-hidden rounded-frame border border-highlight bg-black/10 shadow-xl'>
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
                <div className='mb-6 mt-4 max-w-[70ch] space-y-2 text-base leading-[1.6] text-text-primary md:hidden'>
                  <p>{project.blurb}</p>
                  <p className='type-aside text-[1.375rem] leading-snug text-accent'>
                    {project.outcome}
                  </p>
                </div>
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
                {showAlsoBuilt
                  ? 'Show fewer'
                  : `${SECONDARY_PROJECTS.length} more projects`}
              </span>
            </button>
          </li>
        </ul>

        {/* A deck of the four project cards, one in each project's colour,
            squared up and centred. The hovered project sits in front; the
            other three wait behind it, each a step higher and a step
            narrower, so only an even band of each shows. Every card stays
            mounted and only moves, so hovering another project glides it to
            the front while the rest shuffle back a place. */}
        <div className='hidden md:block'>
          <div className='grid px-4 pt-20 lg:px-8'>
            {FEATURED_PROJECTS.map((project, index) => {
              // 0 is the front card, 3 the one furthest back.
              const depth =
                (index - activeIndex + FEATURED_PROJECTS.length) %
                FEATURED_PROJECTS.length;
              const isFront = depth === 0;

              return (
                <motion.div
                  key={project.slug}
                  data-project={project.slug}
                  aria-hidden={!isFront}
                  className='col-start-1 row-start-1'
                  style={{
                    zIndex: FEATURED_PROJECTS.length - depth,
                    transformOrigin: '50% 0%',
                    pointerEvents: isFront ? 'auto' : 'none',
                  }}
                  initial={false}
                  animate={{ y: -depth * 18, scale: 1 - depth * 0.06 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 24 }}
                  whileHover={isFront ? { y: -6 } : undefined}
                >
                  <Link
                    href={`/pj/${project.slug}`}
                    aria-label={`${project.title} project`}
                    tabIndex={isFront ? undefined : -1}
                    className='group block bg-[var(--pj-dark)] p-4 text-center text-black shadow-2xl lg:p-5'
                  >
                    <div className='relative aspect-video w-full overflow-hidden bg-black'>
                      {project.workImage ? (
                        <Image
                          src={project.workImage}
                          alt={`${project.title} preview`}
                          fill
                          sizes='(min-width: 768px) 45vw, 100vw'
                          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
                          priority={index === 0}
                        />
                      ) : null}
                    </div>
                    <p className='type-aside pt-4 text-[1.5rem] leading-tight lg:pt-5'>
                      {project.outcome}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence mode='wait'>
            <motion.p
              key={activeProject.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='mt-10 max-w-[60ch] text-lg leading-[1.6] text-text-primary'
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
              <h3 className='type-display text-xl uppercase tracking-[-0.01em] text-text-primary'>
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
                    <span className='type-aside text-base text-text-muted'>
                      {' '}
                      · {project.kind}
                    </span>
                    <span className='block text-text-muted'>
                      {project.blurb}
                    </span>
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
