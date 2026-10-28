'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';

export const iconControlClassName =
  'inline-flex items-center justify-center text-text-primary transition-all hover:scale-110 hover:text-accent';

type PillItem = {
  id: string;
  label: ReactNode;
  title?: string;
  href?: string;
  onClick?: () => void;
};

type PillNavProps = {
  items: PillItem[];
  activeId: string;
  'aria-label': string;
  orientation?: 'horizontal' | 'vertical' | 'grid';
  className?: string;
};

const shellClassName =
  'rounded-xl bg-primary/90 p-2 shadow-lg backdrop-blur-xl';

export const PillNav = ({
  items,
  activeId,
  'aria-label': ariaLabel,
  orientation = 'horizontal',
  className,
}: PillNavProps) => {
  const isVertical = orientation === 'vertical';
  // `grid` lays the eight projects out four per row (01–04 / 05–08), a
  // compact block about the height of the logo it sits beside.
  const isGrid = orientation === 'grid';

  return (
    <nav aria-label={ariaLabel} className={className}>
      <div
        className={`${shellClassName} gap-1.5 ${
          isGrid
            ? 'grid grid-cols-4'
            : isVertical
              ? 'flex flex-col'
              : 'flex max-w-full flex-wrap items-center justify-center md:flex-nowrap'
        }`}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          const itemClassName = `relative rounded-lg text-sm font-bold transition-colors duration-200 ${
            isVertical || isGrid
              ? 'inline-flex h-9 w-9 items-center justify-center md:h-10 md:w-10'
              : 'px-3 py-2 md:px-4'
          } ${
            // Hover previews the same accent as the current item, so every
            // project page highlights in its own colour, not its text colour.
            isActive
              ? 'bg-accent text-accent-ink'
              : 'text-text-muted hover:bg-accent hover:text-accent-ink'
          }`;

          const content = <span className='relative z-10'>{item.label}</span>;

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.title}
                aria-label={
                  item.title
                    ? `${item.title}${isActive ? ' (current)' : ''}`
                    : undefined
                }
                aria-current={isActive ? 'page' : undefined}
                className={itemClassName}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type='button'
              title={item.title}
              onClick={item.onClick}
              className={itemClassName}
            >
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
