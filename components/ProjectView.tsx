'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS, STAGES, Stage } from '@/lib/data';
import { PillNav, iconControlClassName } from '@/components/PillNav';
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
} from 'lucide-react';

interface ProjectViewProps {
  slug: string;
}

const StageVideo = ({ src, poster }: { src: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload='metadata'
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className='absolute inset-0 h-full w-full cursor-pointer object-cover'
      />
      {!isPlaying && (
        <button
          type='button'
          onClick={togglePlayback}
          aria-label='Play video'
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-primary ${iconControlClassName}`}
        >
          <Play className='h-10 w-10 md:h-14 md:w-14' fill='currentColor' />
        </button>
      )}
    </>
  );
};

export const ProjectView = ({ slug }: ProjectViewProps) => {
  const currentProject =
    PROJECTS.find((project) => project.slug === slug) ?? PROJECTS[0];

  // Thin entries (Fruitea) define only some stages — render what exists
  // rather than four headings with empty bodies.
  const projectStages = useMemo(
    () => STAGES.filter((stage) => currentProject.stages[stage]),
    [currentProject],
  );

  const [activeStage, setActiveStage] = useState<Stage>(
    projectStages[0] ?? 'Problem',
  );
  const [activeImageByStage, setActiveImageByStage] = useState<
    Partial<Record<Stage, number>>
  >({});
  const stageIds = useMemo(
    () =>
      Object.fromEntries(
        projectStages.map((stage) => [
          stage,
          `${currentProject.slug}-${stage.toLowerCase()}`,
        ]),
      ) as Record<Stage, string>,
    [currentProject.slug, projectStages],
  );

  useEffect(() => {
    const sections = projectStages
      .map((stage) => document.getElementById(stageIds[stage]))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          const matchedStage = projectStages.find(
            (stage) => stageIds[stage] === visibleEntries[0].target.id,
          );
          if (matchedStage) setActiveStage(matchedStage);
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [stageIds, projectStages]);

  const jumpToStage = (stage: Stage) => {
    document
      .getElementById(stageIds[stage])
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const heroTitle = currentProject.title;
  const heroTitleWords = heroTitle.split(' ');
  const heroTitleLead = heroTitleWords.slice(0, -1).join(' ');
  const heroTitleLast = heroTitleWords[heroTitleWords.length - 1];

  const goToNextImage = (stage: Stage, totalImages: number) => {
    setActiveImageByStage((prev) => ({
      ...prev,
      [stage]: ((prev[stage] ?? 0) + 1) % totalImages,
    }));
  };

  const goToPrevImage = (stage: Stage, totalImages: number) => {
    setActiveImageByStage((prev) => ({
      ...prev,
      [stage]: ((prev[stage] ?? 0) - 1 + totalImages) % totalImages,
    }));
  };

  const titleNode = currentProject.externalUrl ? (
    <>
      {heroTitleLead ? `${heroTitleLead} ` : ''}
      <span className='relative inline-block whitespace-nowrap pr-[0.55em]'>
        {heroTitleLast}
        <ArrowUpRight
          className='absolute right-0 top-0 h-[0.38em] w-[0.38em] -translate-y-[0.04em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1'
          strokeWidth={2.5}
        />
      </span>
    </>
  ) : (
    heroTitle
  );

  const titleClassName =
    'font-project text-center text-2xl font-bold uppercase leading-[1.1] text-text-primary';

  // Each project's face needs its own optical sizing and tracking; both come
  // from the palette so the values live beside the colours they ship with.
  const titleStyle = {
    fontSize: 'calc(var(--text-2xl) * var(--project-display-scale, 1))',
    letterSpacing: 'var(--project-display-tracking, -0.02em)',
  };

  return (
    <section
      data-project={currentProject.slug}
      className='relative flex min-h-screen flex-col overflow-hidden px-5 py-28 sm:px-6 md:py-32'
    >
      {/* Fixed so the project colour reaches the shared nav and footer too. */}
      <div className='project-surface' aria-hidden='true' />
      <div className='relative z-10 mx-auto flex w-full max-w-7xl grow flex-col'>
        <div className='mx-auto mb-8 w-full max-w-5xl'>
          <Link
            href='/#work'
            className='inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Work
          </Link>
        </div>

        <div className='mx-auto mb-16 w-full max-w-4xl text-center md:mb-24'>
          <p className='mb-4 text-sm font-bold uppercase tracking-[0.35em] text-text-muted'>
            Project {currentProject.id}
          </p>
          {currentProject.externalUrl ? (
            <a
              href={currentProject.externalUrl}
              target='_blank'
              rel='noopener noreferrer'
              title='Visit live site'
              aria-label={`${heroTitle} — visit live site`}
              className='group'
            >
              <h1
                style={titleStyle}
                className={`${titleClassName} transition-colors group-hover:text-accent`}
              >
                {titleNode}
              </h1>
            </a>
          ) : (
            <h1 style={titleStyle} className={titleClassName}>
              {titleNode}
            </h1>
          )}
          <p className='mx-auto mt-6 max-w-[60ch] text-lg font-bold leading-[1.5] text-text-primary'>
            {currentProject.outcome}
          </p>
        </div>

        <div className='mx-auto mb-28 flex w-full max-w-5xl grow flex-col gap-24 md:gap-32'>
          {projectStages.map((stage) => {
            const stageNumber = String(projectStages.indexOf(stage) + 1).padStart(
              2,
              '0',
            );
            const stageContent = currentProject.stages[stage]!;
            const stageImages =
              stageContent.images && stageContent.images.length > 0
                ? stageContent.images
                : stageContent.image
                  ? [stageContent.image]
                  : [];
            const hasImage = stageImages.length > 0;
            const activeImageIndex = activeImageByStage[stage] ?? 0;
            const visibleImage = stageImages[activeImageIndex] ?? stageImages[0];
            const isSlider = stageImages.length > 1;

            return (
              <article
                key={stage}
                id={stageIds[stage]}
                className='scroll-mt-32 space-y-6'
              >
                <div className='flex items-center gap-4'>
                  <span className='text-sm font-bold uppercase tracking-[0.35em] text-text-muted'>
                    {stageNumber}
                  </span>
                  <span className='h-px flex-1 bg-highlight' />
                </div>

                <h2
                  style={{ letterSpacing: 'var(--project-heading-tracking, -0.02em)' }}
                  className='font-project text-xl font-bold uppercase text-text-primary'
                >
                  {stage}
                </h2>

                <p className='max-w-[68ch] text-base leading-[1.6] text-text-primary md:text-lg'>
                  {stageContent.content}
                </p>

                {stageContent.video ? (
                  <div className='relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-highlight bg-black/10 shadow-2xl'>
                    <StageVideo src={stageContent.video} poster={stageContent.image} />
                  </div>
                ) : hasImage ? (
                  <div className='relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-highlight bg-black/10 shadow-2xl'>
                    <AnimatePresence mode='wait'>
                      <motion.div
                        key={`${stage}-${visibleImage}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className='absolute inset-0'
                      >
                        <Image
                          src={visibleImage}
                          alt={`${stage} visual ${activeImageIndex + 1}`}
                          fill
                          sizes='(min-width: 1024px) 1024px, 100vw'
                          className={
                            stageContent.imageFit === 'contain'
                              ? 'object-contain bg-[#070a12]'
                              : 'object-cover'
                          }
                          priority={stage === 'Problem'}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {isSlider && (
                      <>
                        <button
                          type='button'
                          onClick={() => goToPrevImage(stage, stageImages.length)}
                          className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-8 ${iconControlClassName}`}
                          aria-label={`Previous ${stage} image`}
                        >
                          <ChevronLeft className='h-6 w-6 md:h-8 md:w-8' />
                        </button>
                        <button
                          type='button'
                          onClick={() => goToNextImage(stage, stageImages.length)}
                          className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 md:right-8 ${iconControlClassName}`}
                          aria-label={`Next ${stage} image`}
                        >
                          <ChevronRight className='h-6 w-6 md:h-8 md:w-8' />
                        </button>
                        <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2'>
                          {stageImages.map((_, index) => (
                            <button
                              key={`${stage}-dot-${index}`}
                              type='button'
                              onClick={() =>
                                setActiveImageByStage((prev) => ({
                                  ...prev,
                                  [stage]: index,
                                }))
                              }
                              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                activeImageIndex === index
                                  ? 'bg-accent'
                                  : 'bg-text-primary/40 hover:bg-text-primary/70'
                              }`}
                              aria-label={`Go to ${stage} image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        {/* Section capsule hidden for now — drop the `hidden` to bring it back. */}
        <div className='pointer-events-none fixed bottom-5 left-4 right-24 z-50 hidden justify-center md:bottom-12 md:left-0 md:right-0'>
          <PillNav
            aria-label='Case study sections'
            activeId={activeStage}
            className='pointer-events-auto'
            items={projectStages.map((stage) => ({
              id: stage,
              label: stage,
              onClick: () => jumpToStage(stage),
            }))}
          />
        </div>

        {currentProject.credit ? (
          <p className='mt-auto pb-8 text-center text-sm text-text-muted'>
            {currentProject.credit}
          </p>
        ) : null}

        <button
          type='button'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-28 right-6 z-50 ${iconControlClassName}`}
          aria-label='Back to top'
        >
          <ArrowUp className='h-6 w-6 md:h-8 md:w-8' />
        </button>
      </div>
    </section>
  );
};
