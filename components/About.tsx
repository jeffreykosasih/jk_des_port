export const About = () => {
  return (
    <section id='about' className='px-6 py-24'>
      <div className='mx-auto grid max-w-7xl gap-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center'>
        <div className='max-w-[70ch] space-y-5 text-lg leading-[1.6] text-text-primary'>
          <p>
            Born in Indonesia, now designing in Australia. The CS degree and the
            Product Owner year are why I can work with developers and PMs
            without a translator.
          </p>
          <p>
            <span className='font-bold'>Fun fact:</span> I also make music live
            on the spot using a loop station.
          </p>
        </div>

        <h2 className='text-right text-[clamp(3rem,7vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-text-primary'>
          About
        </h2>
      </div>
    </section>
  );
};
