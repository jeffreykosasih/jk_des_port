import Image from 'next/image';
import Link from 'next/link';
import { LetterByLetter, joinsAt } from '@/components/motion';

const DESIGN_RESUME = '/Jeffrey-Ko-Design-Resume.pdf';

const NAME = 'Jeffrey Ko';

const pillBase =
  'intro-fade whitespace-nowrap rounded-control px-4 py-2.5 transition-all hover:-translate-y-1 lg:px-4 xl:px-5 xl:py-3';
const pillClass = `${pillBase} bg-text-primary text-primary hover:bg-accent hover:text-accent-ink`;
/* The resume is the one thing this page most wants opened, so it alone wears
   the accent at rest; the section links only take it on hover. */
const resumePillClass = `${pillBase} bg-accent text-accent-ink hover:bg-text-primary hover:text-primary`;

export const Hero = () => {
  return (
    <section
      id='home'
      className='intro tone-violet min-h-screen overflow-hidden'
    >
      <div className='grid min-h-screen md:grid-cols-[minmax(0,1fr)_minmax(300px,40vw)]'>
        <div className='flex flex-col justify-between px-6 pb-12 pt-32 md:px-10 md:pt-40 lg:px-12 xl:px-16'>
          <div className='py-10'>
            {/* The padding gives the serif's descenders room inside the
                window the line rises into. */}
            <p className='type-aside -mx-1 mb-4 overflow-hidden px-1 pb-1.5 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] text-accent'>
              <span className='intro-line'>UX/UI designer</span>
            </p>
            <h1
              aria-label={NAME}
              className='type-display max-w-4xl text-[17vw] uppercase leading-[0.82] tracking-[-0.03em] text-text-primary sm:text-[13vw] md:text-[7.5rem] lg:text-[9.5rem] xl:text-[11rem]'
            >
              {/* Delays count from when the curtain clears the name. */}
              <LetterByLetter text={NAME} startMs={60} stepMs={40} />
            </h1>
          </div>

          <div className='mt-12 flex flex-col gap-8 md:max-w-5xl'>
            {/* lg:flex-wrap: four links and the sentence only fit side by side
                from about 1440px. Without the wrap the links ran on under the
                photo and hid the resume link on laptop-width screens. */}
            <div className='flex flex-col gap-8 lg:flex-row lg:flex-wrap lg:items-center lg:gap-8 xl:gap-12'>
              <p
                className='intro-fade text-lg leading-[1.6] text-text-primary lg:min-w-[19rem] lg:max-w-[40ch] lg:flex-1'
                style={joinsAt(520)}
              >
                I design products that are easy to use and I sit with
                engineering without a translator.
              </p>

              <nav
                aria-label='Quick links'
                className='flex flex-wrap items-center gap-2.5 text-base font-bold sm:ml-auto lg:shrink-0 lg:flex-nowrap lg:text-sm xl:text-base'
              >
                {[
                  { label: 'Work', href: '#work' },
                  { label: 'About', href: '#about' },
                  { label: 'Connect', href: '#contact' },
                ].map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={pillClass}
                    style={joinsAt(640 + index * 60)}
                  >
                    {item.label}
                  </Link>
                ))}
                {/* The design resume is one click from the top, not three. */}
                <a
                  href={DESIGN_RESUME}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Resume (PDF, opens in a new tab)'
                  className={resumePillClass}
                  style={joinsAt(820)}
                >
                  Resume ↗
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className='relative min-h-[70vh] overflow-hidden md:min-h-screen'>
          <Image
            src='/profile-portrait.jpg'
            alt='Profile picture of Jeffrey Ko'
            fill
            sizes='(min-width: 768px) 40vw, 100vw'
            priority
            className='intro-portrait object-cover object-center'
          />
        </div>
      </div>
    </section>
  );
};
