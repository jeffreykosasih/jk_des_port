'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS, MORE_PROJECTS } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { joinsAt } from '@/components/motion';

export const WorkGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id='work' className='tone-marigold py-20 md:py-28'>
      {/* On arrival the title rises into place, each featured row follows a
          beat apart, and a cover lifts off the card deck. */}
      <Reveal>
      <h2 className='type-display overflow-hidden px-6 pb-10 pt-10 text-center text-[clamp(4rem,10vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.02em] text-essence md:pb-20 md:pt-16'>
        <span className='reveal-line'>Work</span>
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
                className='group overflow-hidden border-b border-highlight first:border-t'
              >
                <div className='reveal-line' style={joinsAt(150 + index * 90)}>
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

        </ul>

        {/* A deck of the four project cards, one in each project's colour,
            squared up and centred. The hovered project sits in front; the
            other three wait behind it, each a step higher and a step
            narrower, so only an even band of each shows. Every card stays
            mounted and only moves, so hovering another project glides it to
            the front while the rest shuffle back a place. */}
        <div className='reveal-focus hidden md:block' style={joinsAt(250)}>
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
          {/* Every blurb sits in the same grid cell and only the active one
              shows, so the cell is always as tall as the longest blurb and
              switching projects never moves the content below. */}
          <div className='mt-10 grid max-w-[60ch]'>
            {FEATURED_PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <p
                  key={project.slug}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 text-lg leading-[1.6] text-text-primary transition-[opacity,transform] duration-400 ease-out ${
                    isActive ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
                  }`}
                >
                  {project.blurb}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      </Reveal>

      {/* Everything else, sorted into apps and websites, so the four case
          studies above keep the section's weight. */}
      <Reveal className='mx-auto mt-20 max-w-[1400px] px-6 sm:px-8 md:mt-28 md:px-16'>
        <h3 className='type-display overflow-hidden text-[clamp(2rem,4vw,3rem)] uppercase leading-none tracking-[-0.01em] text-text-primary'>
          <span className='reveal-line'>More work</span>
        </h3>
        <div className='mt-8 grid gap-12 md:grid-cols-2 md:gap-16'>
          {MORE_PROJECTS.map((group, groupIndex) => (
            <div key={group.category}>
              <h4 className='flex items-baseline justify-between border-b border-highlight pb-3 text-sm font-bold uppercase tracking-[0.2em] text-text-muted'>
                {group.label}
                <span aria-hidden='true'>{String(group.projects.length).padStart(2, '0')}</span>
              </h4>
              <ul>
                {group.projects.map((project, index) => (
                  <li key={project.slug} className='overflow-hidden border-b border-highlight'>
                    <div className='reveal-line' style={joinsAt(120 + groupIndex * 60 + index * 90)}>
                    <Link
                      href={`/pj/${project.slug}`}
                      className='group flex items-center gap-4 py-4 md:gap-5'
                    >
                      <span className='relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-control border border-highlight bg-black/10 sm:w-28'>
                        {project.workImage ? (
                          <Image
                            src={project.workImage}
                            alt=''
                            fill
                            sizes='112px'
                            className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                          />
                        ) : null}
                      </span>
                      <span className='flex min-w-0 flex-1 flex-col gap-1'>
                        <span className='type-display text-[1.75rem] uppercase leading-none tracking-[-0.01em] text-text-primary transition-colors group-hover:text-accent'>
                          {project.title}
                        </span>
                        <span className='type-aside text-base leading-tight text-text-muted'>
                          {project.kind}
                        </span>
                      </span>
                      {/* The tilted arrow marks a site you can visit live;
                          case studies without one go without. */}
                      {project.externalUrl ? (
                        <>
                          <span className='sr-only'>(live website)</span>
                          <ArrowUpRight
                            aria-hidden='true'
                            className='h-5 w-5 shrink-0 text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
                          />
                        </>
                      ) : null}
                    </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};
