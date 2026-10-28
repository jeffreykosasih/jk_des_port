export const YoutubeShowcase = () => {
  return (
    <section className='px-6 py-20'>
      <div className='mb-10 px-6 text-center'>
        <p className='text-sm font-bold uppercase tracking-[0.35em] text-text-muted'>
          Beyond design
        </p>
        <p className='mx-auto mt-3 max-w-[70ch] text-lg leading-[1.6] text-text-primary'>
          Live looping music I make on the spot.
        </p>
      </div>

      <div className='mx-auto max-w-3xl'>
        <div className='aspect-video overflow-hidden rounded-2xl bg-text-primary/10 shadow-xl'>
          <iframe
            className='h-full w-full'
            src='https://www.youtube.com/embed/42I_fxcanxo'
            title='In The Summer — live loop by Jefri'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};
