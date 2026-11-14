import { Reveal } from '@/components/Reveal';
import { ShortCard } from '@/components/ShortCard';
import { joinsAt } from '@/components/motion';

/**
 * The clips in the row, left to right.
 *
 * `id` is the end of a YouTube Shorts link:
 * youtube.com/shorts/6nVGH-dI_oQ → '6nVGH-dI_oQ'. `title` is what a screen
 * reader announces for that clip. Up to four fit across on a laptop; a fifth
 * makes the row scroll sideways rather than squeezing the others.
 */
const CLIPS = [
  { id: '6nVGH-dI_oQ', title: 'Bisa' },
  // YouTube's own frames of Aqua and Lala all carry a title, dots or a
  // subtitle, so these two use stills taken from a clean moment instead.
  { id: 'FiLmzJQYyS8', title: 'Aqua', cover: '/shorts/aqua.jpg' },
  { id: 'v8TviL3pqnk', title: 'Lala', cover: '/shorts/lala.jpg' },
  { id: 'vEcsTJFBWik', title: 'In The Summer' },
];

export const ReelsShowcase = () => {
  return (
    <section className='tone-red px-6 pb-10 pt-20'>
      {/* The intro's two moves again, on arrival: the two lines rise into
          place, then a cover lifts off each clip in turn. */}
      <Reveal>
        <div className='mb-10 px-6 text-center'>
          {/* The padding gives the italic's descenders room inside the
              window the line rises into. */}
          <p className='type-aside overflow-hidden pb-1.5 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] text-accent'>
            <span className='reveal-line'>Beyond design</span>
          </p>
          <p className='mx-auto mt-3 max-w-[70ch] overflow-hidden text-lg leading-[1.6] text-text-primary'>
            <span className='reveal-line' style={joinsAt(80)}>
              Live looping music I make on the spot.
            </span>
          </p>
        </div>

        <div className='mx-auto max-w-7xl'>
          {/* One row at every width. The cards share it down to 280px each;
              below that the row scrolls sideways inside itself, so the page
              never does. -mx-6/px-6 lets it scroll out to the screen edge,
              and pb-10 leaves room for the card shadows, which a scroll
              container would otherwise clip. */}
          <ul className='-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-10 [scrollbar-color:var(--site-highlight)_transparent] [scrollbar-width:thin]'>
            {CLIPS.map((clip, index) => (
              <li
                key={clip.id}
                className='min-w-70 max-w-80 flex-1 snap-start first:ml-auto last:mr-auto'
              >
                <div className='relative aspect-[9/16] overflow-hidden rounded-frame bg-text-primary/10 shadow-xl'>
                  {/* YouTube's player loads only when a card is pressed. */}
                  <ShortCard
                    id={clip.id}
                    title={clip.title}
                    cover={'cover' in clip ? clip.cover : undefined}
                  />
                  <span
                    aria-hidden='true'
                    className='reveal-cover'
                    style={joinsAt(160 + index * 90)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
};
