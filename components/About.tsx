import { Reveal } from '@/components/Reveal';
import { joinsAt } from '@/components/motion';

export const About = () => {
  return (
    <section id='about' className='tone-vermilion scroll-mt-16 px-6 py-24'>
      {/* On arrival the title rises in first, then each paragraph comes into
          focus a beat after the one before. */}
      <Reveal className='mx-auto grid max-w-7xl gap-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center'>
        <div className='max-w-[70ch] space-y-5 text-lg leading-[1.6] text-text-primary'>
          <p className='reveal-focus' style={joinsAt(200)}>
            Born in Indonesia, now designing in Melbourne. I studied IT at the
            University of Ciputra and finished a Master of IT at Kaplan
            Business School.
          </p>
          <p className='reveal-focus' style={joinsAt(320)}>
            At the Apple Developer Academy I was product manager and iOS
            developer on Readdy, a team app that helps people with dyslexia
            read. Then I was a Product Owner at Bank Central Asia, working with
            designers, engineers and the business every day. That is why I can
            work with developers and PMs without a translator.
          </p>
          <p
            className='reveal-focus type-aside text-[1.5rem] leading-[1.35]'
            style={joinsAt(440)}
          >
            Fun fact: I also make music live on the spot using a loop station.
          </p>
        </div>

        <h2 className='type-display overflow-hidden text-right text-[clamp(4rem,10vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.02em] text-essence'>
          <span className='reveal-line'>About</span>
        </h2>
      </Reveal>
    </section>
  );
};
