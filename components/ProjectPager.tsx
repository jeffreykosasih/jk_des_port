import Link from 'next/link';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import { PROJECTS } from '@/lib/data';

const buttonClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-control text-text-muted transition-colors duration-200 hover:bg-accent hover:text-accent-ink md:h-10 md:w-10';

/**
 * Sits beside the logo on a project page: previous project, back to all work,
 * next project. Three controls instead of a number for every project, so it
 * stays the same size however many case studies there are. Each control takes
 * the project's colour on hover.
 */
export const ProjectPager = ({ activeSlug }: { activeSlug: string }) => {
  const index = PROJECTS.findIndex((project) => project.slug === activeSlug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <nav aria-label='Projects'>
      <div className='flex items-center gap-1.5 rounded-control bg-primary/90 p-2 shadow-lg backdrop-blur-xl'>
        <Link
          href={`/pj/${prev.slug}`}
          title={`Previous: ${prev.title}`}
          aria-label={`Previous project: ${prev.title}`}
          className={buttonClass}
        >
          <ArrowLeft className='h-5 w-5' aria-hidden='true' />
        </Link>
        <Link href='/#work' title='All work' aria-label='All work' className={buttonClass}>
          <LayoutGrid className='h-5 w-5' aria-hidden='true' />
        </Link>
        <Link
          href={`/pj/${next.slug}`}
          title={`Next: ${next.title}`}
          aria-label={`Next project: ${next.title}`}
          className={buttonClass}
        >
          <ArrowRight className='h-5 w-5' aria-hidden='true' />
        </Link>
      </div>
    </nav>
  );
};
