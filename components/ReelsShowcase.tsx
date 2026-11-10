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
  { id: 'FiLmzJQYyS8', title: 'Aqua' },
  { id: 'v8TviL3pqnk', title: 'Lala' },
  { id: 'vEcsTJFBWik', title: 'In The Summer' },
];

export const ReelsShowcase = () => {
  return (
    <section className='px-6 pb-10 pt-20'>
      <div className='mb-10 px-6 text-center'>
        <p className='text-sm font-bold uppercase tracking-[0.35em] text-text-muted'>
          Beyond design
        </p>
        <p className='mx-auto mt-3 max-w-[70ch] text-lg leading-[1.6] text-text-primary'>
          Live looping music I make on the spot.
        </p>
      </div>

      <div className='mx-auto max-w-7xl'>
        {/* One row at every width. The cards share it down to 280px each;
            below that the row scrolls sideways inside itself, so the page
            never does. -mx-6/px-6 lets it scroll out to the screen edge, and
            pb-10 leaves room for the card shadows, which a scroll container
            would otherwise clip. */}
        <ul className='-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-10 [scrollbar-color:var(--site-highlight)_transparent] [scrollbar-width:thin]'>
          {CLIPS.map((clip) => (
            <li
              key={clip.id}
              className='min-w-70 max-w-80 flex-1 snap-start first:ml-auto last:mr-auto'
            >
              <div className='aspect-[9/16] overflow-hidden rounded-2xl bg-text-primary/10 shadow-xl'>
                <iframe
                  className='h-full w-full'
                  src={`https://www.youtube.com/embed/${clip.id}`}
                  title={`${clip.title} — live loop by Jefri`}
                  // The row is near the bottom of the page and each player is
                  // heavy; don't make every visitor download them up front.
                  loading='lazy'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
