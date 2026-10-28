import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section id='home' className='min-h-screen overflow-hidden'>
      <div className='grid min-h-screen md:grid-cols-[minmax(0,1fr)_minmax(300px,40vw)]'>
        <div className='flex flex-col justify-between px-6 pb-12 pt-32 md:px-10 md:pt-40 lg:px-12 xl:px-16'>
          <div className='py-10'>
            <p className='mb-6 text-sm font-bold uppercase tracking-[0.35em] text-text-muted'>
              UX/UI Designer
            </p>
            <h1 className='max-w-4xl text-[13vw] font-bold uppercase leading-[0.82] tracking-[-0.05em] text-text-primary sm:text-[10vw] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem]'>
              Jeffrey Ko
            </h1>
          </div>

          <div className='mt-12 flex flex-col gap-8 md:max-w-5xl'>
            <div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-8 xl:gap-12'>
              <p className='text-lg leading-[1.6] text-text-primary lg:min-w-[19rem] lg:max-w-[40ch] lg:flex-1'>
                Computer Science degree. A year as Product Owner. I design
                products that are easy to use — and I sit with engineering
                without a translator.
              </p>

              <nav
                aria-label='Section navigation'
                className='flex flex-nowrap items-center gap-2.5 text-base font-bold sm:ml-auto lg:shrink-0 lg:text-sm xl:text-base'
              >
                {[
                  { label: 'Work', href: '#work' },
                  { label: 'About', href: '#about' },
                  { label: 'Connect', href: '#contact' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='whitespace-nowrap rounded-2xl bg-text-primary px-4 py-2.5 text-primary transition-all hover:-translate-y-1 hover:bg-accent hover:text-accent-ink lg:px-4 xl:px-5 xl:py-3'
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className='relative min-h-[70vh] md:min-h-screen'>
          <Image
            src='/profile-portrait.jpg'
            alt='Profile picture of Jeffrey Ko'
            fill
            sizes='(min-width: 768px) 40vw, 100vw'
            priority
            className='object-cover object-center'
          />
        </div>
      </div>
    </section>
  );
};
