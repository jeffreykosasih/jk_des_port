import Link from 'next/link';
import { PROJECTS } from '@/lib/data';

/**
 * The grid of project numbers that sits beside the logo on a project page,
 * four to a row. The current project is filled with the project's colour;
 * the others take it on hover.
 */
export const ProjectPager = ({ activeSlug }: { activeSlug: string }) => (
  <nav aria-label='Jump to project'>
    <div className='grid grid-cols-4 gap-1.5 rounded-control bg-primary/90 p-2 shadow-lg backdrop-blur-xl'>
      {PROJECTS.map((project) => {
        const isActive = project.slug === activeSlug;

        return (
          <Link
            key={project.slug}
            href={`/pj/${project.slug}`}
            title={project.title}
            aria-label={`${project.title}${isActive ? ' (current)' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-control text-sm font-bold transition-colors duration-200 md:h-10 md:w-10 ${
              isActive
                ? 'bg-accent text-accent-ink'
                : 'text-text-muted hover:bg-accent hover:text-accent-ink'
            }`}
          >
            {project.id}
          </Link>
        );
      })}
    </div>
  </nav>
);
