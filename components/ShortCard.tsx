'use client';

import { useState } from 'react';

/**
 * One Short in the music row: a cover of our own until it is pressed, then
 * YouTube's player, already playing.
 *
 * The covers YouTube would show were made one at a time and do not match
 * (a title card on one, dots or a subtitle on others). So every card shows a
 * plain frame from inside its clip instead, with the song name set the same
 * way on each.
 *
 * `frame` picks which of YouTube's automatic frames to use: 'oar1', 'oar2'
 * or 'oar3', taken a quarter, half and three quarters of the way in.
 */
export const ShortCard = ({
  id,
  title,
  frame = 'oar2',
}: {
  id: string;
  title: string;
  frame?: 'oar1' | 'oar2' | 'oar3';
}) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className='h-full w-full'
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
        title={`${title} — live loop by Jefri`}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      />
    );
  }

  return (
    <button
      type='button'
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className='group relative block h-full w-full text-left'
    >
      {/* A plain <img>: the frame comes from YouTube's image server, and the
          row loads them lazily as it scrolls into view. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/${frame}.jpg`}
        alt=''
        loading='lazy'
        className='absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
      />
      {/* Darkens the foot of the frame so the name reads on any footage. */}
      <span
        aria-hidden='true'
        className='absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent'
      />
      <span className='absolute inset-x-5 bottom-5 flex items-end justify-between gap-3'>
        <span className='type-display text-[2.25rem] uppercase leading-[0.9] text-white'>
          {title}
        </span>
        <span
          aria-hidden='true'
          className='flex h-12 w-12 shrink-0 items-center justify-center bg-essence text-black transition-transform group-hover:scale-110'
        >
          <svg viewBox='0 0 24 24' className='ml-0.5 h-5 w-5' fill='currentColor'>
            <path d='M7 4.5v15l13-7.5z' />
          </svg>
        </span>
      </span>
    </button>
  );
};
