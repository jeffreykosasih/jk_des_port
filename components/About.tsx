import type { CSSProperties } from 'react';
import { FaMicrosoft } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import { Reveal } from '@/components/Reveal';
import { joinsAt } from '@/components/motion';

/* The proof behind the paragraph above it: each certificate opens on
   Coursera and takes its issuer's colour on hover. */
const CERTIFICATES = [
  {
    label: 'Google UX Design',
    name: 'Google UX Design Professional Certificate',
    href: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/7JLH4S8ORLWP',
    Icon: SiGoogle,
    brand: '#4285f4',
  },
  {
    label: 'Microsoft UX Design',
    name: 'Microsoft UX Design Professional Certificate',
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/B300T348WFDU',
    Icon: FaMicrosoft,
    brand: '#0078d4',
  },
];

export const About = () => {
  return (
    <section id='about' className='tone-vermilion scroll-mt-16 px-6 py-24'>
      {/* On arrival the title rises in first, then each paragraph comes into
          focus a beat after the one before. */}
      <Reveal className='mx-auto grid max-w-7xl gap-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center'>
        <div className='max-w-[70ch] space-y-5 text-lg leading-[1.6] text-text-primary'>
          <p className='reveal-focus' style={joinsAt(200)}>
            Born in Indonesia, now designing in Melbourne. I studied IT at the
            University of Ciputra and Kaplan Business School, and along the way
            found design and chose to go deeper.
          </p>
          <p className='reveal-focus' style={joinsAt(320)}>
            The Apple Developer Academy turned my path from IT towards design.
            It also taught me to work with designers, engineers and the
            business every day.
          </p>
          <div className='reveal-focus space-y-4' style={joinsAt(440)}>
            <p>
              I don’t have work experience yet, but I’ve built projects left
              and right and earned UX design certificates from Google and
              Microsoft. I hope what I’ve built leads me somewhere.
            </p>
            <ul aria-label='Certificates' className='flex flex-wrap gap-3'>
              {CERTIFICATES.map(({ label, name, href, Icon, brand }) => (
                <li key={name}>
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`${name} (opens in a new tab)`}
                    title={name}
                    style={{ '--brand': brand } as CSSProperties}
                    className='inline-flex items-center gap-2.5 rounded-control bg-text-primary px-4 py-2.5 text-base font-bold text-primary transition-all duration-200 hover:-translate-y-1 hover:bg-[var(--brand)] hover:text-white focus-visible:-translate-y-1 focus-visible:bg-[var(--brand)] focus-visible:text-white'
                  >
                    <Icon aria-hidden className='size-[18px]' />
                    {label}
                    <span aria-hidden='true'>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p
            className='reveal-focus type-aside text-[1.5rem] leading-[1.35]'
            style={joinsAt(560)}
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
