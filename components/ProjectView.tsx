'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS, STAGES, Stage } from '@/lib/data';
import { Reveal } from '@/components/Reveal';
import { LetterByLetter, joinsAt } from '@/components/motion';
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
          className='absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-essence text-black transition-transform hover:scale-110'
        >
          <Play className='ml-1 h-7 w-7' fill='currentColor' />
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

  // Which picture each stage's slider is showing.
  const [activeImageByStage, setActiveImageByStage] = useState<
    Partial<Record<Stage, number>>
  >({});

  const showImage = (stage: Stage, index: number) =>
    setActiveImageByStage((prev) => ({ ...prev, [stage]: index }));

  // Steps a stage's slider by `delta`, wrapping at either end.
  const stepImage = (stage: Stage, total: number, delta: number) =>
    setActiveImageByStage((prev) => ({
      ...prev,
      [stage]: ((prev[stage] ?? 0) + delta + total) % total,
    }));

  const heroTitle = currentProject.title;

  /* The hero plays on arrival and each stage as it scrolls into view. The
     name flips in letter by letter like a departure board, where the home
     page's rises; the stages come into focus (see globals.css). */
  return (
    <div data-project={currentProject.slug}>
      {/* Hero: white, the project's own colour on the name. */}
      <section className='intro tone-pj-light px-5 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40'>
        <div className='mx-auto w-full max-w-5xl'>
          <Link
            href='/#work'
            className='intro-fade type-aside inline-flex items-center gap-2 text-lg text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline'
          >
            <ArrowLeft className='h-4 w-4' aria-hidden='true' />
            Back to work
          </Link>

          <p
            className='intro-fade type-aside mt-12 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] text-accent'
            style={joinsAt(40)}
          >
            {currentProject.kind}
          </p>
          <h1
            aria-label={heroTitle}
            className='type-display mt-2 text-[clamp(4rem,13vw,10rem)] uppercase leading-[0.85] tracking-[-0.02em] text-essence'
          >
            <LetterByLetter
              text={heroTitle}
              startMs={80}
              stepMs={45}
              variant='flip'
            />
          </h1>
          <p
            className='intro-fade mt-8 max-w-[40ch] text-[1.5rem] font-bold leading-[1.3] text-text-primary md:text-[2rem]'
            style={joinsAt(420)}
          >
            {currentProject.outcome}
          </p>
          {/* Spelled out, so nobody has to discover that the title was a link. */}
          {currentProject.externalUrl ? (
            <a
              href={currentProject.externalUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${heroTitle}: visit live site (opens in a new tab)`}
              className='intro-fade mt-8 inline-flex items-center gap-1.5 rounded-control bg-accent px-4 py-2.5 text-base font-bold text-accent-ink transition-all hover:-translate-y-1 hover:bg-text-primary hover:text-primary'
              style={joinsAt(520)}
            >
              Visit live site
              <ArrowUpRight className='h-4 w-4' strokeWidth={2.5} aria-hidden='true' />
            </a>
          ) : null}
        </div>
      </section>

      {/* Stages: black and white in turn, starting black under the white
          hero, each in the project's colour for its surface. */}
      {projectStages.map((stage, stageIndex) => {
        const stageNumber = String(stageIndex + 1).padStart(2, '0');
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
        const tone = stageIndex % 2 === 0 ? 'tone-pj-dark' : 'tone-pj-light';

        return (
          <section
            key={stage}
            id={`${currentProject.slug}-${stage.toLowerCase()}`}
            className={`${tone} scroll-mt-0 px-5 py-20 sm:px-6 md:py-28`}
          >
            <Reveal className='mx-auto w-full max-w-5xl'>
              <div className='grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-16'>
                <h2 className='reveal-focus'>
                  <span className='type-aside block text-2xl text-accent'>
                    {stageNumber}
                  </span>
                  <span className='type-display block text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.9] tracking-[-0.01em] text-essence'>
                    {stage}
                  </span>
                </h2>
                <p
                  className='reveal-focus max-w-[48ch] text-lg leading-[1.5] text-text-primary md:pt-10 md:text-[1.625rem]'
                  style={joinsAt(120)}
                >
                  {stageContent.content}
                </p>
              </div>

              {stageContent.video ? (
                <div
                  className='reveal-wipe relative mt-12 aspect-video w-full overflow-hidden rounded-frame bg-black/10 md:mt-16'
                  style={joinsAt(240)}
                >
                  <StageVideo src={stageContent.video} poster={stageContent.image} />
                </div>
              ) : hasImage ? (
                <div
                  className='reveal-wipe relative mt-12 aspect-video w-full overflow-hidden rounded-frame bg-black/10 md:mt-16'
                  style={joinsAt(240)}
                >
                  <AnimatePresence mode='wait'>
                    <motion.div
                      key={`${stage}-${visibleImage}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className='absolute inset-0'
                    >
                      <Image
                        src={visibleImage}
                        alt={`${currentProject.title}, ${stage.toLowerCase()}: image ${activeImageIndex + 1} of ${stageImages.length}`}
                        fill
                        sizes='(min-width: 1024px) 1024px, 100vw'
                        className={
                          stageContent.imageFit === 'contain'
                            ? 'object-contain bg-[#070a12]'
                            : 'object-cover'
                        }
                        priority={stageIndex === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {isSlider && (
                    <>
                      <button
                        type='button'
                        onClick={() => stepImage(stage, stageImages.length, -1)}
                        className='absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-accent text-accent-ink transition-colors hover:bg-text-primary hover:text-primary'
                        aria-label={`Previous ${stage} image`}
                      >
                        <ChevronLeft className='h-6 w-6' />
                      </button>
                      <button
                        type='button'
                        onClick={() => stepImage(stage, stageImages.length, 1)}
                        className='absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-accent text-accent-ink transition-colors hover:bg-text-primary hover:text-primary'
                        aria-label={`Next ${stage} image`}
                      >
                        <ChevronRight className='h-6 w-6' />
                      </button>
                      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2'>
                        {stageImages.map((_, index) => (
                          <button
                            key={`${stage}-dot-${index}`}
                            type='button'
                            onClick={() => showImage(stage, index)}
                            className={`h-2.5 w-6 transition-colors ${
                              activeImageIndex === index
                                ? 'bg-essence'
                                : 'bg-white/60 hover:bg-white'
                            }`}
                            aria-label={`Go to ${stage} image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </Reveal>
          </section>
        );
      })}

      <div className='tone-pj-dark px-5 pb-6 sm:px-6'>
        {currentProject.credit ? (
          <p className='type-aside mx-auto max-w-5xl pt-8 text-base text-text-muted'>
            {currentProject.credit}
          </p>
        ) : null}

        <button
          type='button'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center bg-accent text-accent-ink transition-transform hover:-translate-y-1'
          aria-label='Back to top'
        >
          <ArrowUp className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
};
