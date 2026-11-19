import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMicrosoft } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import { LetterByLetter, joinsAt } from '@/components/motion';

const DESIGN_RESUME = '/Jeffrey-Ko-Design-Resume.pdf';

const NAME = 'Jeffrey Ko';

/* Proof sits beside the job title it backs up: one small tile per issuer,
   wearing that issuer's colour only on hover. */
const CERTIFICATES = [
  {
    name: 'Google UX Design Professional Certificate',
    href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/7JLH4S8ORLWP',
    Icon: SiGoogle,
    brand: '#4285f4',
  },
  {
    name: 'Microsoft UX Design Professional Certificate',
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/B300T348WFDU',
    Icon: FaMicrosoft,
    brand: '#0078d4',
  },
];

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
            <div className='mb-4 flex flex-wrap items-center gap-x-4 gap-y-2'>
              <p className='type-aside -mx-1 overflow-hidden px-1 pb-1.5 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] text-accent'>
                <span className='intro-line'>UX/UI designer</span>
              </p>
              <ul aria-label='Certificates' className='flex items-center gap-2'>
                {CERTIFICATES.map(({ name, href, Icon, brand }, index) => (
                  <li key={name}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${name} (opens in a new tab)`}
                      title={name}
                      className='intro-fade flex size-10 items-center justify-center rounded-control bg-text-primary text-primary transition-all hover:-translate-y-1 hover:bg-[var(--brand)] hover:text-white'
                      style={{ ...joinsAt(420 + index * 60), '--brand': brand } as CSSProperties}
                    >
                      <Icon aria-hidden className='size-[18px]' />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
